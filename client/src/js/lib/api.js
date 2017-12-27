const axios = require('axios');
const constants = require('./constants');

function performGet(endpoint, callback) {
  axios.get(endpoint)
  .then(function (response) {
    callback(response.status === constants.http_ok, response.data);
  })
  .catch(function (error) {
    callback(false, error.response.data);
  });
}

function performPost(endpoint, data, callback) {
  axios.post(endpoint, data)
  .then(function (response) {
    callback(response.status === constants.http_ok, response.data);
  })
  .catch(function (error) {
    callback(false, error.response.data);
  });
}

function performDelete(endpoint, callback) {
  axios.delete(endpoint)
  .then(function (response) {
    callback(response.status === constants.http_ok ||
             response.status === constants.http_no_content, response.data);
  })
  .catch(function (error) {
    callback(false, error.response.data);
  });
}

function performPut(endpoint, data, callback) {
  axios.put(endpoint, data)
  .then(function (response) {
    callback(response.status === constants.http_ok, response.data);
  })
  .catch(function (error) {
    callback(false, error.response.data);
  });
}

function performPatch(endpoint, data, callback) {
  axios.patch(endpoint, data)
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
  }

}
