'use strict';

const express = require('express');
const errorHandler = require('./src/error-handlers/500');

const PORT = process.env.PORT || 3002;
const notFound = require('./src/error-handlers/404');
const app = express();
const logger = require('./src/middleware/logger.js');
const validator = require('./src/middleware/validator');
const router = require (`./routes/onlystrains.js`);


app.use(express.json());
app.use(logger);
app.use(router);
app.get('/', (req, res) => {

  const message = `Welcome to my server`;

  res.status(200).send(message);
});

app.get('/person', validator, (req, res) => {
  // if (!req.query.personName){
  //   next();
  //   return;
  // }
  const name = {name: req.query.name} ;

  res.status(200).json(name);
});



function start() {
  app.listen (PORT, () => console.log(`Listening on port: ${PORT}`));
}

app.use('*', notFound);
app.use(errorHandler);

module.exports = { start, app };


