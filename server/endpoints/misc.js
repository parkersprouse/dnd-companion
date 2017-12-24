const config = require('../config');
const constants = require('../config/constants');
const jwt = require('jsonwebtoken');
const Users = require('../models/users');

// private functions

function failedToVerifyToken(res) {
  res.status(constants.http_bad_request)
    .json({
      status: 'failure',
      message: 'Failed to decode jwt'
    });
}

// public functions

function verifyAuthToken(req, res, next) {
  try {
    const decoded = jwt.verify(req.body.token, config.jwtSecret);
    Users.findOne({ where: { email: { $iLike: decoded.email } } })
      .then((data) => {
        if (!data) failedToVerifyToken(res);
        else {
          if (decoded.hash === data.pw_hash) {
            res.status(constants.http_ok)
              .json({
                status: 'success',
                content: decoded,
                message: 'Successfully decoded jwt'
              });
          }
          else failedToVerifyToken(res);
        }
      })
      .catch((err) => {
        failedToVerifyToken(res);
      });
  }
  catch(err) {
    failedToVerifyToken(res);
  }
}

module.exports = {
  verifyAuthToken: verifyAuthToken
}
