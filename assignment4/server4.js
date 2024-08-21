const express = require('express');
const path = require('path');
const app = express();
const port = 3000;


app.use((req, res, next) => {
  const requestTime = new Date().toLocaleString();
  console.log(`[${requestTime}] ${req.method} request for '${req.url}'`);
  next();
});


app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.send('Welcome to the Home Page! ');
});


app.get('/about', (req, res) => {
  res.send('Welcome to the About Page!');
});


app.get('/greet', (req, res) => {
  const name = req.query.name || 'Guest';
  res.send(`Hello, ${name}! Welcome to our unique Express server.`);
});


app.post('/submit', (req, res) => {
  const { name, message } = req.body;
  if (name && message) {
    res.json({ status: 'success', data: { name, message } });
  } else {
    res.status(400).json({ status: 'error', message: 'Name and message are required' });
  }
});


app.get('/time', (req, res) => {
  const currentTime = new Date().toLocaleTimeString();
  res.send(`Current server time is: ${currentTime}`);
});

app.use((req, res, next) => {
  res.status(404).send("Oops! That route doesn't exist. Please check your URL.");
});

app.listen(port, () => {
  console.log(`Unique Express server is running on http://localhost:${port}`);
});
