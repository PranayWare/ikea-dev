require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const notesRouter = require('./routes/notes');
const authRouter = require('./routes/auth');
const userRoutes = require('./routes/users');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/notes', notesRouter);
app.use('/', authRouter); // Enables /login
app.use('/auth', authRouter);
app.use('/', userRoutes); // or app.use('/auth', userRoutes) if you want to namespace it

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error('MongoDB connection error:', err));
