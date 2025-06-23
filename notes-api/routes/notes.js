const express = require('express');
const router = express.Router();
const Note = require('../models/Note');
const authMiddleware = require('../middleware/auth');
const { authenticateToken } = require('../middleware/auth');

router.use(authMiddleware);

// GET all notes
router.get('/', authenticateToken, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id }); // Fetch only current user's notes
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new note
router.post('/', authenticateToken, async (req, res) => {
  const { title, content } = req.body;

  try {
    const note = new Note({
      title,
      content,
      user: req.user.id  // 👈 Add user ID here
    });

    await note.save();
    res.status(201).json(note);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update a note
router.put('/:id', authenticateToken, async (req, res) => {
  const { title, content } = req.body;

  try {
    // Find the note by ID
    const note = await Note.findById(req.params.id);

    // If no note or it's not owned by the user
    if (!note) return res.status(404).json({ message: 'Note not found' });
    if (note.user.toString() !== req.user.id)
      return res.status(403).json({ message: 'Not allowed to edit this note' });

    // Update the fields
    note.title = title || note.title;
    note.content = content || note.content;

    await note.save();
    res.json(note);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

