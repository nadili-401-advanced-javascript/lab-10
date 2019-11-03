'use strict';

const express = require('express');
const router = express.Router();

const Users = require('../models/users-model.js');
const users = new Users();

/**
 * Cretes new user document in mongo db
 * @param  {} req
 * @param  {} res
 * @param  {} next 
 */
const create = async (req, res, next) => {
  let user = await users.create(req.body);
  req.user = user && user._id ? user : null;

  next();
};
/**
 *  authenticate user
 * @param  {} req
 * @param  {} res
 * @param  {} next
 */

const authenticate = async (req, res, next) => {
  let user = await users.authenticate(req.body);
 req.user = user && user._id ? user : null;

  next();
};

const setToken = (req, res, next) => {
  if (req.user) {
    let token = req.user.generateToken();

    // sending token to client as respons 
    res.set('token', token);

    // storing token in clients cookie
    res.cookie('token', token);

    res.send('Successfully authenticated and logged in');
  } else res.send('Unable to authenticate and log in');
};

/**
 * @rout POST 
 */
router.post('/signup', create, setToken);

/**
 * @rout POST /signin
 */
router.post('/signin', authenticate, setToken);

module.exports = router;
