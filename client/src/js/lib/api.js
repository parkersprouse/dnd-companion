/* eslint-disable no-unused-vars */

const axios = require('axios');
const constants = require('./constants');

function get(endpoint, callback) {
  axios.get(constants.server + endpoint)
  .then((response) => {
    callback(response.status === constants.http_ok, response.data);
  })
  .catch((error) => {
    callback(false, error.response.data);
  });
}

function post(endpoint, data, callback) {
  axios.post(constants.server + endpoint, data)
  .then((response) => {
    callback(response.status === constants.http_ok, response.data);
  })
  .catch((error) => {
    callback(false, error.response.data);
  });
}

function doDelete(endpoint, callback) {
  axios.delete(constants.server + endpoint)
  .then((response) => {
    callback(response.status === constants.http_ok ||
             response.status === constants.http_no_content, response.data);
  })
  .catch((error) => {
    callback(false, error.response.data);
  });
}

function put(endpoint, data, callback) {
  axios.put(constants.server + endpoint, data)
  .then((response) => {
    callback(response.status === constants.http_ok, response.data);
  })
  .catch((error) => {
    callback(false, error.response.data);
  });
}

function patch(endpoint, data, callback) {
  axios.patch(constants.server + endpoint, data)
  .then((response) => {
    callback(response.status === constants.http_ok, response.data);
  })
  .catch((error) => {
    callback(false, error.response.data);
  });
}

module.exports = {

  // User Data

  register: function(data, callback) {
    post('/api/auth/register', data, callback);
  },

  login: function(data, callback) {
    post('/api/auth/login', data, callback);
  },

  getUsers: function(callback) {
    get('/api/users', callback);
  },

  getUserBy: function(data, callback) {
    post('/api/users', data, callback);
  },

  updateUser: function(data, callback) {
    patch('/api/users/update', data, callback);
  },

  updateUserPassword: function(data, callback) {
    patch('/api/users/updatepw', data, callback);
  },

  verifyAuthToken: function(token, callback) {
    post('/api/misc/verifyauthtoken', { token }, callback);
  },

  sendRecoveryEmail: function(email, callback) {
    post('/api/misc/sendrecoveryemail', { email }, callback);
  },

  verifyResetKey: function(key, callback) {
    post('/api/misc/verifyresetkey', { key }, callback);
  },

  resetUserPassword: function(data, callback) {
    patch('/api/users/resetpassword', data, callback);
  },

  // Character Data

  getAllCharacters: function(callback) {
    get('/api/characters', callback);
  },

  getUsersCharacters: function(userid, callback) {
    post('/api/characters', { userid: userid }, callback);
  },

  getCharacter: function(data, callback) {
    post('/api/characters', data, callback);
  },

  createCharacter: function(data, callback) {
    post('/api/characters/new', data, callback);
  },

  updateCharacter: function(data, callback) {
    patch('/api/characters/update', data, callback);
  },

  deleteCharacter: function(id, callback) {
    doDelete('/api/characters/delete/' + id, callback);
  },

  // Game Data

  getAllGames: function(callback) {
    get('/api/games', callback);
  },

  getUsersGames: function(userid, callback) {
    get('/api/games/' + userid, callback);
  },

  getGame: function(data, callback) {
    post('/api/games', data, callback);
  },

  createGame: function(data, callback) {
    post('/api/games/new', data, callback);
  },

  updateGame: function(data, callback) {
    patch('/api/games/update', data, callback);
  },

  deleteGame: function(id, callback) {
    doDelete('/api/games/delete/' + id, callback);
  },

  // Message Data

  getMessages: function(callback) {
    get('/api/messages', callback);
  },

  getMessagesToUser: function(userid, callback) {
    get('/api/messages/' + userid, callback);
  },

  getMessage: function(data, callback) {
    post('/api/messages', data, callback);
  },

  createMessage: function(data, callback) {
    post('/api/messages/new', data, callback);
  },

  // DnD Data

  getAbilityScores: function(callback) {
    get('/api/db/ability_scores', callback);
  },

  getClasses: function(callback) {
    get('/api/db/classes', callback);
  },

  getEquipment: function(callback) {
    get('/api/db/equipment', callback);
  },

  getLanguages: function(callback) {
    get('/api/db/languages', callback);
  },

  getProficiencies: function(callback) {
    get('/api/db/proficiencies', callback);
  },

  getRaces: function(callback) {
    get('/api/db/races', callback);
  },

  getSubraces: function(callback) {
    get('/api/db/subraces', callback);
  },

  filterSubraces: function(data, callback) {
    post('/api/db/subraces', data, callback);
  },

  getSpells: function(callback) {
    get('/api/db/spells', callback);
  },

  getTrinkets: function(callback) {
    get('/api/db/trinkets', callback);
  }

}
