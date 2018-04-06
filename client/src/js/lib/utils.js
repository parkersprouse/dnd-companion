/* eslint-disable no-unused-vars */

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
    window.location.href = '/';
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
  },

  /**
   * This is a helper method that checks whether a provided value is null or
   * undefined and returns a backup value if so, otherwise returns the provided
   * value if not.
   */
  valueify: function(value, backup) {
    if (value === null || value === undefined || typeof value === 'undefined')
      return backup;
    return value;
  }

}
