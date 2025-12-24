// const express = require('express');
// const app = express();

// app.get('/', (req, res) => {
//   res.send('Hello World');
// });

// module.exports = app;

require('dotenv').config();
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send(process.env.MESSAGE);
});

module.exports = app;
