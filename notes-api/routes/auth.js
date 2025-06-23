const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Replace this with a real user check from database in production
const dummyUser = {
  username: 'pranayware',
  password: 'password123' // You can change this
};

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Basic check
  if (username === dummyUser.username && password === dummyUser.password) {
    const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return res.json({ token });
  }

  res.status(401).json({ message: 'Invalid credentials' });
});

module.exports = router;

