const bcrypt = require('bcrypt-nodejs');
const config = require('../config');
const constants = require('../constants');
const db = require('../db').db;
const jwt = require('jsonwebtoken');
const utils = require('../utils.js');
const validator = require('validator');











// // eslint-disable-next-line
// 'use strict';
//
// const bcrypt = require('bcrypt-nodejs');
// const config = require('../config');
// const constants = require('../constants');
// const db = require('../db').db;
// const jwt = require('jsonwebtoken');
// const utils = require('../utils.js');
// const validator = require('validator');
//
//
// // public functions
//
// function login(req, res, next) {
//   const username = req.body.username;
//   const password = req.body.password;
//
//   if (validator.isEmpty(username) || validator.isEmpty(password)) {
//     res.status(constants.http_bad_request)
//       .json({
//         status: 'failure',
//         content: {
//           usernameState: validator.isEmpty(username) ? false : true,
//           passwordState: validator.isEmpty(password) ? false : true
//         },
//         message: 'Please make sure all required fields are filled out'
//       });
//   }
//   else {
//     db.one('select * from users where lower(username) = lower($1)', username)
//       .then(function(data) {
//         const match = bcrypt.compareSync(password, data.pw_hash);
//         if (match) {
//           const payload = utils.generateJwtPayload(data);
//           const token = jwt.sign(payload, config.jwtSecret);
//           res.cookie('token', token, { maxAge: 1000 * 60 * 60 * 24 * 7, httpOnly: false });
//           res.status(constants.http_ok)
//             .json({
//               status: 'success',
//               content: token,
//               message: 'Successfully logged in'
//             });
//         } else {
//           res.status(constants.http_unauthorized)
//             .json({
//               status: 'failure',
//               content: data,
//               message: 'Your username or password was incorrect'
//             });
//         }
//       })
//       .catch(function(err) {
//         if (err instanceof constants.db_query_result_error && err.code === constants.db_err_no_result) {
//           res.status(constants.http_unauthorized)
//             .json({
//               status: 'failure',
//               content: err,
//               message: 'Your username or password was incorrect'
//             });
//         }
//         else {
//           res.status(constants.http_server_error)
//             .json({
//               status: 'failure',
//               content: err,
//               message: 'There was an unknown problem when attempting to log you in'
//             });
//         }
//       });
//   }
// }
//
// function register(req, res, next) {
//   const email = req.body.email;
//   const username = req.body.username;
//   const password = req.body.password;
//   const confirmpassword = req.body.confirmpassword;
//   const name = req.body.name;
//
//   if (validator.isEmpty(email) || validator.isEmpty(username) || validator.isEmpty(password) || validator.isEmpty(confirmpassword)) {
//     res.status(constants.http_bad_request)
//       .json({
//         status: 'failure',
//         content: {
//           emailState: validator.isEmpty(email) ? false : true,
//           usernameState: validator.isEmpty(username) ? false : true,
//           passwordState: validator.isEmpty(password) ? false : true,
//           confirmPasswordState: validator.isEmpty(confirmpassword) ? false : true
//         },
//         message: 'Please make sure all required fields are filled out'
//       });
//   }
//   else if (!validator.isEmail(email)) {
//     res.status(constants.http_bad_request)
//       .json({
//         status: 'failure',
//         content: {
//           emailState: false,
//           usernameState: true,
//           passwordState: true,
//           confirmPasswordState: true
//         },
//         message: 'Please make sure your email is valid'
//       });
//   }
//   else if (password.length < 6) {
//     res.status(constants.http_bad_request)
//       .json({
//         status: 'failure',
//         content: {
//           emailState: true,
//           usernameState: true,
//           passwordState: false,
//           confirmPasswordState: true
//         },
//         message: 'Password should be at least 6 characters long'
//       });
//   }
//   else if (password !== confirmpassword) {
//     res.status(constants.http_bad_request)
//       .json({
//         status: 'failure',
//         content: {
//           emailState: true,
//           usernameState: true,
//           passwordState: false,
//           confirmPasswordState: false
//         },
//         message: 'Your passwords did not match'
//       });
//   }
//   else {
//     const salt = bcrypt.genSaltSync();
//     const pw_hash = bcrypt.hashSync(password, salt);
//     const data = {
//       email: email,
//       username: username,
//       pw_hash: pw_hash,
//       name: name
//     };
//
//     let query = 'insert into users ' +
//                 '(email, username, pw_hash, name) ' +
//                 'values(${email}, ${username}, ${pw_hash}, ${name}) ' +
//                 'returning id';
//     db.one(query, data)
//       .then(function (data) {
//         res.status(constants.http_ok)
//           .json({
//             status: 'success',
//             message: 'Registration Successful'
//           });
//       })
//       .catch(function (err) {
//         const content = {
//           emailState: true,
//           usernameState: true,
//           passwordState: true,
//           confirmPasswordState: true
//         };
//         let message = 'There was an unknown problem when creating your account';
//
//         if (err.code === constants.db_err_duplicate) {
//           if (err.constraint.indexOf('username') > -1) {
//             message = 'An account with that username already exists';
//             content.usernameState = false;
//           }
//           else if (err.constraint.indexOf('email') > -1) {
//             message = 'An account with that e-mail address already exists';
//             content.emailState = false;
//           }
//         }
//
//         console.log(message)
//
//         res.status(constants.http_bad_request)
//           .json({
//             status: 'failure',
//             content: content,
//             message: message
//           });
//       });
//   }
// }
//
// module.exports = {
//   login: login,
//   register: register
// }
