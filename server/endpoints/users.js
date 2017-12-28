const bcrypt = require('bcrypt-nodejs');
const config = require('../config');
const constants = require('../config/constants');
const db = require('../config/db').db;
const jwt = require('jsonwebtoken');
const utils = require('../utils.js');
const validator = require('validator');
const Users = require('../models/users');

function getUserBy(req, res, next) {
  const attr = Object.keys(req.body)[0];
  const value = attr === 'id' ? req.body[attr] : { $iLike: req.body[attr] };
  Users.findOne({ where: { [attr]: value } })
    .then((data) => {
      res.status(constants.http_ok)
        .json({
          status: 'success',
          content: data.get({ plain: true }),
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

function updateUser(req, res, next) {
  if (!validator.isEmail(req.body.email)) {
    res.status(constants.http_bad_request)
      .json({
        status: 'failure',
        content: null,
        message: 'Please make sure your email is valid'
      });
  }
  else {
    Users.update(req.body, { where: { id: req.body.id }})
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
          // UPDATE TOKEN
          const payload = utils.generateJwtPayload(data);
          const token = jwt.sign(payload, config.jwtSecret);
          res.cookie('token', token, { maxAge: 1000 * 60 * 60 * 24 * 7, httpOnly: false });
          res.status(constants.http_ok)
            .json({
              status: 'success',
              content: data[0],
              message: 'Updated user'
            });
        }
      })
      .catch((err) => {
        let message = 'There was an unknown problem when updating your account';
        if (err.name === constants.db_err_duplicate) {
          if (err.errors[0].path === 'username')
            message = 'That username is already in use';
          else if (err.errors[0].path === 'email')
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

module.exports = {
  getUsers,
  getUserBy,
  updateUser
}





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
// // private functions
//
// function getUserBy(dataType, param, res, next) {
//   let query = 'select * from users where ' + dataType + ' = $1';
//
//   // we should use the lowercase index to search for email addresses
//   // but don't want to use it when searching for IDs, so for now we
//   // separate the queries like this.
//   // yes, it looks weird, but it could look much weirder if I attempted
//   // to generalize it.
//   if (dataType === 'email')
//     query = 'select * from users where lower(email) = lower($1)';
//
//   db.one(query, param)
//     .then(function (data) {
//       res.status(constants.http_ok)
//         .json({
//           status: 'success',
//           content: data,
//           message: 'Found user'
//         });
//     })
//     .catch(function (err) {
//       if (err instanceof constants.db_query_result_error &&
//           err.code === constants.db_err_no_result) {
//         res.status(constants.http_no_content)
//           .json({
//             status: 'failure',
//             content: err,
//             message: 'User not found'
//           });
//       }
//       else {
//         res.status(constants.http_server_error)
//           .json({
//             status: 'failure',
//             content: err,
//             message: 'There was an unknown problem when attempting to find the user'
//           });
//       }
//     });
// }
//
//
// // public functions
//
// function getUsers(req, res, next) {
//   db.any('select * from users')
//     .then(function (data) {
//       res.status(constants.http_ok)
//         .json({
//           status: 'success',
//           content: data,
//           message: 'Returned all users'
//         });
//     })
//     .catch(function (err) {
//       res.status(constants.http_server_error)
//         .json({
//           status: 'failure',
//           content: err,
//           message: 'There was an unexpected error when trying to get all users'
//         });
//     });
// }
//
// function getUserByID(req, res, next) {
//   getUserBy('id', parseInt(req.params.id, 10), res, next);
// }
//
// function getUserByEmail(req, res, next) {
//   getUserBy('email', req.params.email, res, next);
// }
//
// function updateUser(req, res, next) {
//   const currentPassword = req.body.currentPassword;
//   const email = req.body.email;
//
//   const currentPasswordEmpty = validator.isEmpty(currentPassword);
//   const emailEmpty = validator.isEmpty(email);
//
//   if (emailEmpty || currentPasswordEmpty) {
//     res.status(constants.http_bad_request)
//       .json({
//         status: 'failure',
//         content: {
//           emailState: !emailEmpty,
//           currentPasswordState: !currentPasswordEmpty
//         },
//         messages: {
//           emailErr: emailEmpty ? 'Please make sure your email is filled out' : null,
//           verifyErr: currentPasswordEmpty ? 'Please make sure your current password is filled out' : null
//         }
//       });
//   }
//   else if (!validator.isEmail(email)) {
//     res.status(constants.http_bad_request)
//       .json({
//         status: 'failure',
//         content: {
//           emailState: false,
//           currentPasswordState: true
//         },
//         messages: {
//           emailErr: 'Please make sure your email is valid',
//           verifyErr: null
//         }
//       });
//   }
//   else {
//     db.one('select * from users where id = $1', req.body.id)
//       .then(function(data) {
//         const match = bcrypt.compareSync(currentPassword, data.pw_hash);
//
//         if (match) {
//           let query = 'update users set email = ${email} where id = ${id} returning *';
//           db.one(query, { email: email, id: req.body.id })
//             .then(function (data) {
//               // after updating, we have to re-create the auth token cookie with the new data
//               const payload = utils.generateJwtPayload(data);
//               const token = jwt.sign(payload, config.jwtSecret);
//               res.cookie('token', token, { maxAge: 1000 * 60 * 60 * 24 * 7, httpOnly: false });
//               res.status(constants.http_ok)
//                 .json({
//                   status: 'success'
//                 });
//             })
//             .catch(function (err) {
//               let msg = 'There was an unknown problem when updating your profile';
//
//               if (err.code === constants.db_err_duplicate)
//                 msg = 'That email address is already in use';
//
//               res.status(constants.http_bad_request)
//                 .json({
//                   status: 'failure',
//                   content: {
//                     emailState: false,
//                     currentPasswordState: true
//                   },
//                   messages: {
//                     emailErr: msg,
//                     verifyErr: null
//                   }
//                 });
//             });
//         }
//         else {
//           res.status(constants.http_bad_request)
//             .json({
//               status: 'failure',
//               content: {
//                 emailState: true,
//                 currentPasswordState: false
//               },
//               messages: {
//                 emailErr: null,
//                 verifyErr: 'Your current password was incorrect'
//               }
//             });
//         }
//       })
//       .catch(function (err) {
//         res.status(constants.http_bad_request)
//           .json({
//             status: 'failure',
//             content: {
//               emailState: true,
//               currentPasswordState: true
//             },
//             messages: {
//               emailErr: 'There was an unknown problem when updating your profile',
//               verifyErr: null
//             }
//           });
//       });
//   }
// }
//
// function updateUserPassword(req, res, next) {
//   const currentPassword = req.body.currentPassword;
//   const newPassword = req.body.newPassword;
//   const newPasswordConfirm = req.body.newPasswordConfirm;
//
//   const currentPasswordEmpty = validator.isEmpty(currentPassword);
//   const newPasswordEmpty = validator.isEmpty(newPassword);
//   const newPasswordConfirmEmpty = validator.isEmpty(newPasswordConfirm);
//
//   if (currentPasswordEmpty || newPasswordEmpty || newPasswordConfirmEmpty) {
//     res.status(constants.http_bad_request)
//       .json({
//         status: 'failure',
//         content: {
//           newPasswordState: !newPasswordEmpty,
//           newPasswordConfirmState: !newPasswordConfirmEmpty,
//           currentPasswordState: !currentPasswordEmpty
//         },
//         messages: {
//           passwordErr: newPasswordEmpty || newPasswordConfirmEmpty ? 'Please make sure both fields are filled out' : null,
//           verifyErr: currentPasswordEmpty ? 'Please make sure your current password is filled out' : null
//         }
//       });
//   }
//   else if (newPassword.length < 6) {
//     res.status(constants.http_bad_request)
//       .json({
//         status: 'failure',
//         content: {
//           newPasswordState: false,
//           newPasswordConfirmState: true,
//           currentPasswordState: true
//         },
//         messages: {
//           passwordErr: 'Password should be at least 6 characters long',
//           verifyErr: null
//         }
//       });
//   }
//   else if (newPassword !== newPasswordConfirm) {
//     res.status(constants.http_bad_request)
//       .json({
//         status: 'failure',
//         content: {
//           newPasswordState: false,
//           newPasswordConfirmState: false,
//           currentPasswordState: true
//         },
//         messages: {
//           passwordErr: 'Your passwords did not match',
//           verifyErr: null
//         }
//       });
//   }
//   else {
//     db.one('select * from users where id = $1', req.body.id)
//       .then(function(data) {
//         const match = bcrypt.compareSync(currentPassword, data.pw_hash);
//
//         if (match) {
//           const salt = bcrypt.genSaltSync();
//           const pw_hash = bcrypt.hashSync(newPassword, salt);
//
//           let query = 'update users set pw_hash = ${pw_hash} where id = ${id} returning *';
//           db.one(query, { pw_hash: pw_hash, id: req.body.id })
//             .then(function (data) {
//               const payload = utils.generateJwtPayload(data);
//               const token = jwt.sign(payload, config.jwtSecret);
//               res.cookie('token', token, { maxAge: 1000 * 60 * 60 * 24 * 7, httpOnly: false });
//               res.status(constants.http_ok)
//                 .json({
//                   status: 'success'
//                 });
//             })
//             .catch(function (err) {
//               res.status(constants.http_bad_request)
//                 .json({
//                   status: 'failure',
//                   content: {
//                     newPasswordState: true,
//                     newPasswordConfirmState: true,
//                     currentPasswordState: true
//                   },
//                   messages: {
//                     passwordErr: 'There was an unknown problem when updating your password',
//                     verifyErr: null
//                   }
//                 });
//             });
//         }
//         else {
//           res.status(constants.http_bad_request)
//             .json({
//               status: 'failure',
//               content: {
//                 newPasswordState: true,
//                 newPasswordConfirmState: true,
//                 currentPasswordState: false
//               },
//               messages: {
//                 passwordErr: null,
//                 verifyErr: 'Your current password was incorrect'
//               }
//             });
//         }
//       })
//       .catch(function (err) {
//         res.status(constants.http_bad_request)
//           .json({
//             status: 'failure',
//             content: {
//               newPasswordState: true,
//               newPasswordConfirmState: true,
//               currentPasswordState: true
//             },
//             messages: {
//               passwordErr: 'There was an unknown problem when updating your password',
//               verifyErr: null
//             }
//           });
//       });
//   }
// }
//
// module.exports = {
//   getUsers: getUsers,
//   getUserByID: getUserByID,
//   getUserByEmail: getUserByEmail,
//   updateUser: updateUser,
//   updateUserPassword: updateUserPassword
// }
