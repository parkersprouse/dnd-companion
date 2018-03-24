const jwt = require('jsonwebtoken');

const config = require('../config');
const constants = require('../config/constants');
const mailer = require('../config/mailer');
const Users = require('../models/users');

// private functions

function failedToVerifyToken(res) {
  res.status(constants.http_bad_request)
    .json({
      status: 'failure',
      message: 'Failed to decode jwt'
    });
}

function userIsCorrect(decoded, data) {
  return (decoded.pw_hash === data.pw_hash) &&
         (decoded.email === data.email) &&
         (decoded.username === data.username)
}

// public functions

function sendRecoveryEmail(req, res, next) {
  Users.findOne({ where: { email: { $iLike: req.body.email } } })
    .then((data) => {
      if (!data)
      res.status(constants.http_ok)
        .json({
          status: 'success',
          message: 'Success'
        });
      else {
        const user = data.get({ plain: true });
        mailer({
          subject: "DnD Companion App Account Recovery",
          content: "A request was made to recover the account information associated with \
                    this e-mail address.<br /><br />Your username is: <b>" + user.username + "</b>.\
                    <br /><br />To reset your password, <a href='http://dnd.parkersprouse.me/account-recovery?key=test'>click here</a>.",
          addresses: [req.body.email]
        }, (success) => {
          res.status(constants.http_ok)
            .json({
              status: 'success',
              message: 'Success'
            });
        });
      }
    })
    .catch((err) => {
      res.status(constants.http_bad_request)
        .json({
          status: 'failure',
          content: err.message,
          message: 'There was an unexpected error when attempting to send the e-mail'
        });
    });
}

function verifyAuthToken(req, res, next) {
  try {
    const decoded = jwt.verify(req.body.token, config.jwt_secret);
    Users.findOne({ where: { id: decoded.id } })
      .then((data) => {
        if (!data) failedToVerifyToken(res);
        else {
          if (userIsCorrect(decoded, data)) {
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
  verifyAuthToken,
  sendRecoveryEmail
}
