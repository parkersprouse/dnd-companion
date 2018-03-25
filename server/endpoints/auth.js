const bcrypt = require('bcrypt-nodejs');
const config = require('../config');
const constants = require('../config/constants');
const jwt = require('jsonwebtoken');
const utils = require('../utils.js');
const validator = require('validator');
const Users = require('../models/users');

function login(req, res, next) {
  const username = req.body.username;
  const password = req.body.password;
  const usernameEmpty = validator.isEmpty(username);
  const passwordEmpty = validator.isEmpty(password);

  if (usernameEmpty || passwordEmpty) {
    res.status(constants.http_bad_request)
      .json({
        status: 'failure',
        content: {
          usernameState: !usernameEmpty,
          passwordState: !passwordEmpty
        },
        message: 'Please make sure all required fields are filled out'
      });
  }
  else {
    Users.findOne({ where: { username: { $iLike: username } } })
      .then((data) => {
        if (!data) {
          res.status(constants.http_bad_request)
            .json({
              status: 'failure',
              content: {
                usernameState: false,
                passwordState: false
              },
              message: 'Your username or password was incorrect'
            });
        }
        else {
          const match = bcrypt.compareSync(password, data.pw_hash);
          if (match) {
            const payload = utils.generateJwtPayload(data);
            const token = jwt.sign(payload, config.jwt_secret);
            res.status(constants.http_ok)
              .json({
                status: 'success',
                content: token,
                message: 'Successfully logged in'
              });
          }
          else {
            res.status(constants.http_bad_request)
              .json({
                status: 'failure',
                content: {
                  usernameState: false,
                  passwordState: false
                },
                message: 'Your username or password was incorrect'
              });
          }
        }
      })
      .catch((err) => {
        res.status(constants.http_server_error)
          .json({
            status: 'failure',
            content: {
              usernameState: false,
              passwordState: false
            },
            message: 'There was an unknown problem when attempting to log you in'
          });
      });
  }
}

function register(req, res, next) {
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  const name = req.body.name;

  const emailEmpty = validator.isEmpty(email);
  const usernameEmpty = validator.isEmpty(username);
  const passwordEmpty = validator.isEmpty(password);
  const confirmPasswordEmpty = validator.isEmpty(confirmPassword);
  if (emailEmpty || usernameEmpty || passwordEmpty || confirmPasswordEmpty) {
    res.status(constants.http_bad_request)
      .json({
        status: 'failure',
        content: {
          emailState: !emailEmpty,
          usernameState: !usernameEmpty,
          passwordState: !passwordEmpty,
          confirmPasswordState: !confirmPasswordEmpty
        },
        message: 'Please make sure all required fields are filled out'
      });
  }
  else if (!validator.isEmail(email)) {
    res.status(constants.http_bad_request)
      .json({
        status: 'failure',
        content: {
          emailState: false,
          usernameState: true,
          passwordState: true,
          confirmPasswordState: true
        },
        message: 'Please make sure your email is valid'
      });
  }
  else if (password.length < 6) {
    res.status(constants.http_bad_request)
      .json({
        status: 'failure',
        content: {
          emailState: true,
          usernameState: true,
          passwordState: false,
          confirmPasswordState: true
        },
        message: 'Password should be at least 6 characters long'
      });
  }
  else if (password !== confirmPassword) {
    res.status(constants.http_bad_request)
      .json({
        status: 'failure',
        content: {
          emailState: true,
          usernameState: true,
          passwordState: false,
          confirmPasswordState: false
        },
        message: 'Your passwords did not match'
      });
  }
  else {
    const salt = bcrypt.genSaltSync();
    const pw_hash = bcrypt.hashSync(password, salt);

    Users.create({ username: username, email: email, pw_hash: pw_hash, name: name })
      .then(function (data) {
        res.status(constants.http_ok)
          .json({
            status: 'success',
            message: 'Registration Successful'
          });
      })
      .catch(function (err) {
        const content = {
          emailState: true,
          usernameState: true,
          passwordState: true,
          confirmPasswordState: true
        };
        let message = 'There was an unknown problem when creating your account';

        if (err.name === constants.db_err_duplicate) {
          if (err.errors[0].path === 'username') {
            message = 'An account with that username already exists';
            content.usernameState = false;
          }
          else if (err.errors[0].path === 'email') {
            message = 'An account with that e-mail address already exists';
            content.emailState = false;
          }
        }
        res.status(constants.http_bad_request)
          .json({
            status: 'failure',
            content: content,
            message: message
          });
      });
  }
}

module.exports = {
  login: login,
  register: register
}
