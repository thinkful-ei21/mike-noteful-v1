'use strict';

const express = require('express');

const router = express.Router();

const app = express();


// Load array of notes
const data = require('../db/notes');// Simple In-Memory Database
const simDB = require('../db/simDB'); 
const notes = simDB.initialize(data);


router.get('/api/notes/', (req, res) => {

  // retrieve the searchTerm from the query-string on the req.query object.
  const searchTerm = req.query.searchTerm;

  notes.filter(searchTerm, (err, list) => {
    if (err) {
      return next(err); // goes to error handler
    }
    res.json(list); // responds with filtered array
  });

});


router.put('/api/notes/:id', (req, res, next) => {
  const id = req.params.id;

  /***** Never trust users - validate input *****/
  const updateObj = {};
  const updateFields = ['title', 'content'];

  updateFields.forEach(field => {
    if (field in req.body) {
      updateObj[field] = req.body[field];
    }
  });
  
  if (!updateObj.title) {
    const err = new Error('Missing `title` in request body');
    err.status = 400;
    return next(err);
  }

  notes.update(id, updateObj, (err, item) => {
    if (err) {
      return next(err);
    }
    if (item) {
      res.json(item);
    } else {
      next();
    }
  });
});


router.get('/api/notes/:id', (req, res, next) => {

  const foundItem = req.params.id;

  notes.find(foundItem, (err, list) => {
    if (err) {
      return next(err); // goes to error handler
    }
    res.json(list); // responds with filtered array
  });

});



module.exports = router;