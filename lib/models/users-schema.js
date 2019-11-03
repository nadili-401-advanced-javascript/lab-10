'use strict';

// == EXTERNAL RESOURCES ===============================================

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// == DEFINE THE USER SCHEMA =============================================

// Mongoos schema for users documents 
const users = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String },
  role: {
    type: String,
    required: true,
    default: 'user',
    enum: ['admin', 'editor', 'user']
  }
});

/**
 * @param  {} 'password'
 * before save to users check if password was modified. 
 * Hash password with bcrypt if modified. 
 */

users.pre('save', async function() {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
});

/**
 * Takes user's creds, looks for creds.username match in database, 
 * if found calls comparePassword() 
 * @param  {object} creds
 * @param  {creds.username}
 * @param  {creds.password}
 * @return true if auth is successful, false if not 
 */
users.statics.authenticate = async (creds) => {
  let query = { username: creds.username };
  let user = this.findOne(query);
  return user && user.comparePassword(creds.password);
};

/**
 * Compares password passed into the funciton with this user password.
 * If passwords are equel - returns user object, if not - null
 * @param  {} password
 * @returns {object} || NULL
 */
users.methods.comparePassword = async (password) => {
  let pass = await bcrypt.compare(password, this.password);
  return pass ? this : null;
};

/**
 * Generates token based on user id and secret from .env if awailable or uses 'this-is-my-secret' string as secret 
 * @param  {this._id}
 * @param  token
 */

users.methods.generateToken = () => {
  let tokenData = { id: this._id };
  return jwt.sign(tokenData, process.env.SECRET || 'this-is-my-secret');
};

module.exports = mongoose.model('users', users);
