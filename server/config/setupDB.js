const Users = require('../models/users');

function setup() {
  // the { force: true } option drops the tables, then re-creates them
  // .drop() and .sync() can be used independently if desired
  Users.sync({ force: true })
}

module.exports = setup;
