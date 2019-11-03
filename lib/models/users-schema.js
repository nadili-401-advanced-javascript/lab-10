// 'use strict';

// // == EXTERNAL RESOURCES ===============================================

// const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');

// // == DEFINE THE USER SCHEMA =============================================

// // Mongoos schema for users documents 
// const users = mongoose.Schema({
//   username: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   email: { type: String },
//   role: {
//     type: String,
//     required: true,
//     default: 'user',
//     enum: ['admin', 'editor', 'user']
//   }
// });

// /**
//  * @param  {} 'password'
//  * before save to users check if password was modified. 
//  * Hash password with bcrypt if modified. 
//  */

// users.pre('save', async function() {
//   if (this.isModified('password')) {
//     this.password = await bcrypt.hash(this.password, 10);
//   }
// });

// /**
//  * Takes user's creds, looks for creds.username match in database, 
//  * if found calls comparePassword() 
//  * @param  {object} creds
//  * @param  {creds.username}
//  * @param  {creds.password}
//  * @returns true if auth is successful, false if not 
//  */
// users.statics.authenticate = async function(creds) {
//   let query = { username: creds.username };

//   let user = await this.findOne(query);
//   let isValid = await user.comparePasswords(creds.password);
// };

// /**
//  * Compares password passed into the funciton with this user password.
//  * If passwords are equel - returns user object, if not - null
//  * @param  {} password
//  * @returns {object} || NULL
//  */
// users.methods.comparePassword = async function(password) {
//   let hashedPassword = this.password;
//   let valid = await bcrypt.compare(password, hashedPassword);
//   return valid;
// };

// /**
//  * Generates token based on user id and secret from .env if awailable or uses 'this-is-my-secret' string as secret 
//  * @param  {this._id}
//  * @param  token
//  */

// users.methods.generateToken = () => {
//   let tokenData = { id: this._id };
//   return jwt.sign(tokenData, process.env.JWT_SECRET);
// };

// module.exports = mongoose.model('users', users);


'use strict';

// == EXTERNAL RESOURCES ===============================================

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// == DEFINE THE USER SCHEMA =============================================

// TODO Comment
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

// TODO JSDocs Comment
users.pre('save', async function() {
  // TODO README Question
  // What does .isModified do and why do we use it?
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
});

// TODO JSDocs Comment
// TODO Convert this function into using async/await
users.statics.authenticate = function(creds) {
  let query = { username: creds.username };

  return this.findOne(query)
    .then(user => user && user.comparePassword(creds.password))
    .catch(console.error);
};

// TODO JSDocs Comment
// TODO Convert this function into using async/await
users.methods.comparePassword = function(password) {
  return bcrypt
    .compare(password, this.password)
    .then(valid => (valid ? this : null));
};

// TODO JSDocs Comment
users.methods.generateToken = function() {
  let tokenData = { id: this._id };
  return jwt.sign(tokenData, process.env.JWT_SECRET);
};

module.exports = mongoose.model('users', users);
