const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

mongoose.connect('mongodb://mongo:27017/testdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.get('/', (req, res) => {
  res.send('🚀 Auto-deploy CI/CD GitHub Actions!');
});

app.listen(port, () => {
  console.log(`App running at http://localhost:${port}`);
});
// test line
