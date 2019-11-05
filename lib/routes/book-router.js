'use strict';

const express = require('express');
const router = express.Router();
const Users = require('../models/users-model');
let user = new Users();


let books = [
  { title: 'Brave New World', auth: ['admin'] },
  { title: 'Hamlet', auth: ['admin', 'editor'] },
  { title: 'Alice in Wonderland', auth: ['admin', 'editor', 'user'] }
];

// TODO Swagger Comments
// TODO Edit code (see lab README)
router.get('/books', async (req, res, next) => {

  let library = {
    count: books.length,
    results: books
  };
  let validUser = await user.authenticate(req.body);
  
  if(!validUser) {
    res.status(403).send('This is Restricted Section!!!');
  } else {res.status(200).json(library);}
  
});

// TODO Swagger Comments
// TODO Edit code (see lab README)
router.get('/books/:indx', (req, res, next) => {
  if (req.params.indx < books.length) {
    let book = books[req.params.indx];
    res.status(200).json(book);
  } else {
    res.send('Book not Found');
  }
});

module.exports = router;
