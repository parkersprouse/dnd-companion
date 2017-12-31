/*
 * Running this function will drop and re-create all of the tables on the database.
 */

const Users = require('../models/users');
const Characters = require('../models/characters');

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// I feel dirty doing a forced "wait" between calls,
// but these calls are async and the order they complete
// cannot be guaranteed, which obviously casuses problems
// when it comes to schema dependecies.
// So for now we do this because it gets the job done.
async function setup() {
  Characters.drop();
  await sleep(1000);
  Users.drop();
  await sleep(1000);

  Users.sync();
  await sleep(1000);
  Characters.sync();
}

module.exports = setup;
