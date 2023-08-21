const express = require('express');
const bodyParser = require('body-parser');

const mongoPractice = require('./mongo');

const app = express();

app.use(bodyParser.json());

app.post('/products', mongoPractice.createProduct);

// Add a handler function for the GET /products endpoint
app.get('/products', (req, res) => {
  // Handle the logic for fetching and sending products here
  // For example:
  res.json({ message: 'GET /products endpoint works' });
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
