const bcrypt = require('bcrypt-nodejs');
const config = require('../config');
const constants = require('../config/constants');
const jwt = require('jsonwebtoken');
const utils = require('../utils.js');
const validator = require('validator');
const Users = require('../models/users');

function getUserBy(req, res, next) {
  const data = {};
  _.each(req.body, (val, index) => {
    if (typeof val === 'string')
      data[index] = { $iLike: val };
    else
      data[index] = val;
  });

  Users.findOne({ where: data })
    .then((data) => {
      if (!data)
        res.status(constants.http_not_found)
          .json({
            status: 'failure',
            message: 'User not found'
          });
      else
        res.status(constants.http_ok)
          .json({
            status: 'success',
            content: data.get({ plain: true }),
            message: 'Got user'
          });
    })
    .catch((err) => {
      res.status(constants.http_bad_request)
        .json({
          status: 'failure',
          content: err.message,
          message: 'Failed to get user'
        });
    });
}

function getUsers(req, res, next) {
  Users.findAll()
    .then((data) => {
      const users = [];
      data.forEach((usr) => users.push(usr.get({ plain: true })));
      res.status(constants.http_ok)
        .json({
          status: 'success',
          content: users,
          message: 'Got all users'
        });
    })
    .catch((err) => {
      res.status(constants.http_bad_request)
        .json({
          status: 'failure',
          content: err.message,
          message: 'Failed to get all users'
        });
    });
}

function resetPassword(req, res, next) {
  if (!req.body.pass || !req.body.confirm_pass) {
    res.status(constants.http_bad_request)
      .json({
        status: 'failure',
        message: 'Please make sure both fields are filled out'
      });
  }
  else if (req.body.pass !== req.body.confirm_pass) {
    res.status(constants.http_bad_request)
      .json({
        status: 'failure',
        message: "Passwords did not match"
      });
  }
  else {
    const salt = bcrypt.genSaltSync();
    const pw_hash = bcrypt.hashSync(req.body.pass, salt);

    Users.update({ pw_hash, pw_reset_key: null }, { where: { pw_reset_key: req.body.reset_key }, returning: true })
      .then((data) => {
        if (!data[0]) {
          res.status(constants.http_bad_request)
            .json({
              status: 'failure',
              message: 'There was an unexpected error when attempting to update your password'
            });
        }
        else {
          res.status(constants.http_ok)
            .json({
              status: 'success',
              message: 'Success'
            });
        }
      })
      .catch((err) => {
        res.status(constants.http_bad_request)
          .json({
            status: 'failure',
            content: err.message,
            message: 'There was an unexpected error when attempting to update your password'
          });
      });
  }
}

function updateUser(req, res, next) {
  if (!req.body.curpw) {
    res.status(constants.http_bad_request)
      .json({
        status: 'failure',
        content: null,
        cur_pw_msg: 'Current password is required'
      });
  }
  else if (!bcrypt.compareSync(req.body.curpw, req.body.curpwhash)) {
    res.status(constants.http_bad_request)
      .json({
        status: 'failure',
        content: null,
        cur_pw_msg: 'Current password is incorrect'
      });
  }
  else if (!req.body.username) {
    res.status(constants.http_bad_request)
      .json({
        status: 'failure',
        content: null,
        message: 'Please make sure your username is filled out'
      });
  }
  else if (!validator.isEmail(req.body.email)) {
    res.status(constants.http_bad_request)
      .json({
        status: 'failure',
        content: null,
        message: 'Please make sure your email is valid'
      });
  }
  else {
    Users.update({ username: req.body.username, email: req.body.email, name: req.body.name }, { where: { id: req.body.id }, returning: true })
      .then((data) => {
        if (!data[0]) {
          res.status(constants.http_bad_request)
            .json({
              status: 'failure',
              content: data[0],
              message: 'No user updated, check provided ID'
            });
        }
        else {
          // data[0] is the number of rows affected
          // data[1] is the array containing the returned rows
          // data[1][0] is the first user that was returned
          // data[1][0].dataValues is the object containing the values of the returned row
          const payload = utils.generateJwtPayload(data[1][0].dataValues);
          const token = jwt.sign(payload, config.jwt_secret);
          res.status(constants.http_ok)
            .json({
              status: 'success',
              content: {
                data: data[1][0].dataValues,
                token: token
              },
              message: 'Updated user'
            });
        }
      })
      .catch((err) => {
        let message = 'There was an unknown problem when updating your account';
        if (err.name === constants.db_err_duplicate) {
          if (err.errors[0].path === 'username' || err.errors[0].path === 'lower(username)')
            message = 'That username is already in use';
          else if (err.errors[0].path === 'email' || err.errors[0].path === 'lower(email)')
            message = 'That e-mail address is already in use';
        }
        res.status(constants.http_bad_request)
          .json({
            status: 'failure',
            content: err.message,
            message: message
          });
      });
  }
}

function updateUserPassword(req, res, next) {
  if (!req.body.curpw) {
    res.status(constants.http_bad_request)
      .json({
        status: 'failure',
        content: null,
        cur_pw_msg: 'Current password is required'
      });
  }
  else if (!bcrypt.compareSync(req.body.curpw, req.body.curpwhash)) {
    res.status(constants.http_bad_request)
      .json({
        status: 'failure',
        content: null,
        cur_pw_msg: 'Current password is incorrect'
      });
  }
  else if (!req.body.password) {
    res.status(constants.http_bad_request)
      .json({
        status: 'failure',
        content: null,
        message: 'New password cannot be empty'
      });
  }
  else if (!req.body.confirm_password || req.body.password !== req.body.confirm_password) {
    res.status(constants.http_bad_request)
      .json({
        status: 'failure',
        content: null,
        message: 'Passwords did not match'
      });
  }
  else {
    const salt = bcrypt.genSaltSync();
    const pw_hash = bcrypt.hashSync(req.body.password, salt);

    Users.update({ pw_hash }, { where: { id: req.body.id }, returning: true })
      .then((data) => {
        if (!data[0]) {
          res.status(constants.http_bad_request)
            .json({
              status: 'failure',
              content: data[0],
              message: 'No user updated, check provided ID'
            });
        }
        else {
          // data[0] is the number of rows affected
          // data[1] is the array containing the returned rows
          // data[1][0] is the first user that was returned
          // data[1][0].dataValues is the object containing the values of the returned row
          const payload = utils.generateJwtPayload(data[1][0].dataValues);
          const token = jwt.sign(payload, config.jwt_secret);
          res.status(constants.http_ok)
            .json({
              status: 'success',
              content: {
                data: data[1][0].dataValues,
                token: token
              },
              message: 'Updated user'
            });
        }
      })
      .catch((err) => {
        res.status(constants.http_bad_request)
          .json({
            status: 'failure',
            content: err.message,
            message: 'There was a problem when updating your password'
          });
      });
  }
}

module.exports = {
  getUsers,
  getUserBy,
  resetPassword,
  updateUser,
  updateUserPassword
}
