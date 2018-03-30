/*
 * Running this function will drop and re-create all of the tables on the database.
 */

const Characters = require('../models/characters');
const Games = require('../models/games');
const Messages = require('../models/messages');
const Users = require('../models/users');

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// I feel dirty doing a forced "wait" between calls,
// but these calls are async and the order they complete
// cannot be guaranteed, which obviously casuses problems
// when it comes to schema dependecies.
// So for now we do this because it gets the job done.
async function setup() {
  // DROP ALL TABLES
  //Characters.drop();
  //await sleep(1000);
  //Users.drop();
  //await sleep(1000);
  //Games.drop();
  //await sleep(1000);
  //Messages.drop();
  //await sleep(1000);

  // CREATE ALL TABLES
  //Users.sync();
  //await sleep(1000);
  //Characters.sync();
  //await sleep(1000);
  //Games.sync();
  //await sleep(1000);
  //Messages.sync();
}

module.exports = setup;
