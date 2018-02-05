/* eslint-disable no-unused-vars */

const axios = require('axios');
const constants = require('./constants');

function performGet(endpoint, callback) {
  axios.get(constants.server + endpoint)
  .then(function (response) {
    callback(response.status === constants.http_ok, response.data);
  })
  .catch(function (error) {
    callback(false, error.response.data);
  });
}

function performPost(endpoint, data, callback) {
  axios.post(constants.server + endpoint, data)
  .then(function (response) {
    callback(response.status === constants.http_ok, response.data);
  })
  .catch(function (error) {
    callback(false, error.response.data);
  });
}

function performDelete(endpoint, callback) {
  axios.delete(constants.server + endpoint)
  .then(function (response) {
    callback(response.status === constants.http_ok ||
             response.status === constants.http_no_content, response.data);
  })
  .catch(function (error) {
    callback(false, error.response.data);
  });
}

function performPut(endpoint, data, callback) {
  axios.put(constants.server + endpoint, data)
  .then(function (response) {
    callback(response.status === constants.http_ok, response.data);
  })
  .catch(function (error) {
    callback(false, error.response.data);
  });
}

function performPatch(endpoint, data, callback) {
  axios.patch(constants.server + endpoint, data)
  .then(function (response) {
    callback(response.status === constants.http_ok, response.data);
  })
  .catch(function (error) {
    callback(false, error.response.data);
  });
}

module.exports = {

  register: function(data, callback) {
    performPost('/api/auth/register', data, callback);
  },

  login: function(data, callback) {
    performPost('/api/auth/login', data, callback);
  },

  getUsers: function(callback) {
    performGet('/api/users', callback);
  },

  getUserBy: function(data, callback) {
    performPost('/api/users', data, callback);
  },

  updateUser: function(data, callback) {
    performPatch('/api/users/update', data, callback);
  },

  updateUserPassword: function(data, callback) {
    performPatch('/api/users/updatepw', data, callback);
  },

  verifyAuthToken: function(token, callback) {
    performPost('/api/misc/verifyauthtoken', { token: token }, callback);
  },

  getAllCharacters: function(callback) {
    performGet('/api/characters', callback);
  },

  getUsersCharacters: function(userid, callback) {
    performPost('/api/characters', { userid: userid }, callback);
  },

  getCharacter: function(data, callback) {
    performPost('/api/characters', data, callback);
  },

  createCharacter: function(data, callback) {
    performPost('/api/characters/new', data, callback);
  },

  updateCharacter: function(data, callback) {
    performPatch('/api/characters/update', data, callback);
  },

  deleteCharacter: function(id, callback) {
    performDelete('/api/characters/delete/' + id, callback);
  },

  // DnD Data
  getAbilityScores: function(callback) {
    performGet('/api/db/ability_scores', callback);
  },

  getClasses: function(callback) {
    performGet('/api/db/classes', callback);
  },

  getEquipment: function(callback) {
    performGet('/api/db/equipment', callback);
  },

  getLanguages: function(callback) {
    performGet('/api/db/languages', callback);
  },

  getProficiencies: function(callback) {
    performGet('/api/db/proficiencies', callback);
  },

  getRaces: function(callback) {
    performGet('/api/db/races', callback);
  },

  getSubraces: function(callback) {
    performGet('/api/db/subraces', callback);
  },

  filterSubraces: function(data, callback) {
    performPost('/api/db/subraces', data, callback);
  },

  getSpells: function(callback) {
    performGet('/api/db/spells', callback);
  }

}
