'use strict';

const Model = require('./model.js');
const schema = require('./users-schema.js');

class Users extends Model {
  constructor() {
    super(schema);
  }

  /**
   * takes creds, returns result of calling authenticate function from ./users-schema.js
   * @param  {object} creds
   * @returns  {object} 
   */
  authenticate(creds) {
    return this.schema.authenticate(creds);
  }
}

module.exports = Users;
