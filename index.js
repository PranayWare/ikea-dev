const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

mongoose.connect('mongodb://mongo:27017/testdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.get('/', (req, res) => {
  res.send('🚀  CI/CD is working! Hello from updated Docker container!');
});

app.listen(port, () => {
  console.log(`App running at http://localhost:${port}`);
});
