'use strict';

// Load array of notes
const data = require('./db/notes');

console.log('Hello Noteful!');

// INSERT EXPRESS APP CODE HERE...

const express = require('express');

const app = express();

// ADD STATIC SERVER HERE
app.use(express.static('public'));

app.listen(8080, function () {
  console.info(`Server listening on ${this.address().port}`);
}).on('error', err => {
  console.error(err);
});


app.get('/api/notes/:searchTerm', (req, res) => {
  // retrieve the searchTerm from the query-string on the req.query object.
  const searchTerm = req.query.searchTerm;
  // search the array to find the proper results
  const itemFound = data.filter(itm => itm.title.includes(searchTerm));
  // return the filtered list
  res.json(itemFound);
});


app.get('/api/notes/:id', (req, res) => {
  const foundItem = data.find(item => item.id == req.params.id);
  res.json(foundItem);
});