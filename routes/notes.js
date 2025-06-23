const express = require('express');
const router = express.Router();
const Note = require('../models/Note');
const authenticateToken = require('../middleware/auth');

// Create a note
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { title, content } = req.body;
    const newNote = new Note({ userId: req.user.id, title, content });
    await newNote.save();
    res.status(201).json(newNote);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all notes for user
router.get('/', authenticateToken, async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.user.id });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update note by ID
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const updated = await Note.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: 'Note not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete note
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const deleted = await Note.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });
    if (!deleted) return res.status(404).json({ message: 'Note not found' });
    res.json({ message: 'Note deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
