const api = require('./api');
const Cookies = require('universal-cookie');
const constants = require('./constants');

const cookies = new Cookies();

module.exports = {

  isLoggedIn: function(callback) {
    const token = cookies.get('token');
    if (!!token) {
      api.verifyAuthToken(token, (success, response) => {
        if (!success) cookies.remove('token');
        callback(success);
      });
    }
    else {
      callback(false);
    }
  },

  logout: function() {
    cookies.remove('token');
  },

  getCurrentUserInfo: function(callback) {
    const token = cookies.get('token');
    if (!!token) {
      api.verifyAuthToken(token, (success, response) => {
        if (success)
          callback(true, response.content);
        else
          callback(false);
      });
    }
    else {
      callback(false);
    }
  },

  isMobile: function() {
    return (typeof window.orientation !== 'undefined') || (navigator.userAgent.indexOf('IEMobile') !== -1) || (window.innerWidth <= 992);
  }

}
