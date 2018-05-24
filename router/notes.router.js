'use strict';

const express = require('express');

const router = express.Router();

const app = express();


// Load array of notes
const data = require('../db/notes');// Simple In-Memory Database
const simDB = require('../db/simDB'); 
const notes = simDB.initialize(data);


router.get('/notes/', (req, res) => {

  // retrieve the searchTerm from the query-string on the req.query object.
  const searchTerm = req.query.searchTerm;

  notes.filter(searchTerm)
    .then(searchTerm => {
      if(searchTerm) {
        res.json(searchTerm);
      } else {
        next();
      }
    })
    .catch(err => {
      next(err);
    });
    
});


router.put('/notes/:id', (req, res, next) => {
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

  notes.update(id, updateObj)
    .then(item => {
      if(item) {
        res.json(item);
      } else {
        next();
      }
    })
    .catch(err => {
      next(err);
    });
});


// get note by id
router.get('/notes/:id', (req, res, next) => {

  const item = req.params.id;

  notes.find(item)
    .then(item => {
      if(item) {
        res.json(item);
      } else {
        next();
      }
    })
    .catch(err => {
      next(err);
    });
  
});

// delete a note
router.delete('/notes/:id', (req, res, next) => {
  const noteId = req.params.id;
  const message = 'No Content';
  notes.delete(noteId) 
    .then(item => {
      if(item === null) {
        res.status(404).end();
      } else {
        res.status(204).send(message).end();
      }
      res.json(item);
    })
    .catch(err => {
      next(err)
    }); 
});


// Post (insert) a note
router.post('/notes', (req, res, next) => {
  const { title, content } = req.body;
  console.log(title, content, req.body);
  const newItem = { title, content };
  /***** Never trust users - validate input *****/
  if (!newItem.title) {
    const err = new Error('Missing `title` in request body');
    err.status = 400;
    return next(err);
  }

  notes.create(newItem)
    .then(item => {
      if(item) {
        res.location(`http://${req.headers.host}/notes/${item.id}`).status(201).json(item);
      } else {
        next();
      }
    })
    .catch(err => {
      next(err)
    });
});

// (err, item) => {
//   if (err) {
//     return next(err);
//   }
//   if (item) {
//     res.location(`http://${req.headers.host}/notes/${item.id}`).status(201).json(item);
//   } else {
//     next();
//   }

module.exports = router;