const config = require('../config');
const constants = require('../constants');
const db = require('../db').db;
const jwt = require('jsonwebtoken');


// public functions

function verifyAuthToken(req, res, next) {
  try {
    const decoded = jwt.verify(req.body.token, config.jwtSecret);

    db.one('select * from users where lower(email) = lower($1)', decoded.email)
      .then(function (data) {
        if (decoded.hash === data.pw_hash) {
          res.status(constants.http_ok)
            .json({
              status: 'success',
              content: decoded,
              message: 'Successfully decoded jwt'
            });
        }
        else {
          res.status(constants.http_bad_request)
            .json({
              status: 'failure',
              message: 'Failed to decode jwt'
            });
        }
      })
      .catch(function (err) {
        res.status(constants.http_bad_request)
          .json({
            status: 'failure',
            message: 'Failed to decode jwt'
          });
      });
  }
  catch(err) {
    res.status(constants.http_bad_request)
      .json({
        status: 'failure',
        message: 'Failed to decode jwt'
      });
  }
}

module.exports = {
  verifyAuthToken: verifyAuthToken
}