/*
 * Running this function will drop and re-create all of the tables on the database.
 */

const Users = require('../models/users');
const Characters = require('../models/characters');

// ORDER MATTERS HERE
function setup() {
  Characters.drop();
  Users.drop();

  Users.sync();
  Characters.sync();
}

module.exports = setup;
