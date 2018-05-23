'use strict';

const express = require('express');
const logger = require('morgan');
const { PORT } = require('./config');
const notesRouter = require('./router/notes.router');

// Create an Express application
const app = express();

// Log all requests
app.use(logger('common'));

// Create a static webserver
app.use(express.static('public'));

// use notes router
app.use('/api', notesRouter);

// Catch-all 404
app.use(function (req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// Catch-all Error handler
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err
  });
});


app.listen(PORT, function () {
  console.info(`Server listening on ${this.address().port}`);
}).on('error', err => {
  console.error(err);
});
