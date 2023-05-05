'use strict';

const express = require('express');
const errorHandler = require('./error-handlers/500');

const PORT = process.env.PORT || 3002;
const notFound = require('./error-handlers/404');
const app = express();
const logger = require('../src/middleware/LOGGER.JS');
const validator = require('./middleware/validator');
const router = require(`../routes/onlystrains.js`);

app.use(express.json());
app.use(logger);
app.use(router);

app.get('/', (req, res) => {
  const message = `Welcome to my server`;
  res.status(200).send(message);
});

// Route for getting a person by name
app.get('/person', validator, (req, res) => {
  const name = { name: req.query.name };
  res.status(200).json(name);
});

// Route for creating new user
app.post('/sign-up', async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    // TODO: Implement functionality for creating a new user

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    next(error);
  }
});

// 404 error handler
app.use('*', notFound);

// 500 error handler
app.use(errorHandler);

// Start the server
function start() {
  app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
}

module.exports = { start, app };
