'use strict';

// Load array of notes
const data = require('./db/notes');

console.log('Hello Noteful!');

// INSERT EXPRESS APP CODE HERE...

const express = require('express');

const app = express();

const { PORT } = require('./config');

const { logger } = require('./middleware/logger');

// ADD STATIC SERVER HERE

app.use(express.static('public'));

app.use(logger);


app.get('/boom', (req, res, next) => {
  throw new Error('Boom!!');
});


app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  res.status(404).json({ message: 'Not Found' });
});


app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err
  });
});


app.get('/api/notes/', (req, res) => {

  // retrieve the searchTerm from the query-string on the req.query object.
  const searchTerm = req.query.searchTerm;

  if(searchTerm) {
    // search the array to find the proper results
    const itemFound = data.filter(itm => itm.title.includes(searchTerm));
    res.json(itemFound);
  } else {
    // return the unfiltered list
    res.json(data);}
});


app.get('/api/notes/:id', (req, res) => {
  const foundItem = data.find(item => item.id === Number(req.params.id));
  res.json(foundItem);
});


app.listen(PORT, function () {
  console.info(`Server listening on ${this.address().port}`);
}).on('error', err => {
  console.error(err);
});


