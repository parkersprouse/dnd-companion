const constants = require('../config/constants');
const validator = require('validator');
const _ = require('lodash');
const Messages = require('../models/messages');

function getMessages(req, res, next) {
  Messages.findAll()
    .then((data) => {
      const messages = [];
      data.forEach((m) => messages.push(m.get({ plain: true })));
      res.status(constants.http_ok)
        .json({
          status: 'success',
          content: messages,
          message: 'Got all messages'
        });
    })
    .catch((err) => {
      res.status(constants.http_bad_request)
        .json({
          status: 'failure',
          content: err.message,
          message: 'Failed to get all messages'
        });
    });
}

function getMessageBy(req, res, next) {
  Messages.findAll({ where: req.body })
    .then((data) => {
      if (!data || data.length === 0)
        res.status(constants.http_not_found)
          .json({
            status: 'failure',
            message: 'Message not found'
          });
      else {
        const messages = [];
        data.forEach((m) => messages.push(m.get({ plain: true })));
        res.status(constants.http_ok)
          .json({
            status: 'success',
            content: messages,
            message: 'Got message'
          });
      }
    })
    .catch((err) => {
      res.status(constants.http_bad_request)
        .json({
          status: 'failure',
          content: err.message,
          message: 'Failed to get message'
        });
    });
}

function getUsersMessages(req, res, next) {
  Messages.findAll()
    .then((data) => {
      const messages = [];
      data.forEach((m) => {
        const message = m.get({ plain: true });
        if (message.receiver_ids.indexOf(Number(req.params.user_id)) > -1 ||
            message.sender_id === Number(req.params.user_id))
          messages.push(message);
      });
      res.status(constants.http_ok)
        .json({
          status: 'success',
          content: _.sortBy(messages, 'created_at'),
          message: 'Got all messages'
        });
    })
    .catch((err) => {
      res.status(constants.http_bad_request)
        .json({
          status: 'failure',
          content: err.message,
          message: "Failed to get user's messages"
        });
    });
}

function createMessage(req, res, next) {
  Messages.create(req.body)
    .then((data) => {
      res.status(constants.http_ok)
        .json({
          status: 'success',
          content: data,
          message: 'Message created'
        });
    })
    .catch((err) => {
      res.status(constants.http_bad_request)
        .json({
          status: 'failure',
          content: err.message,
          message: 'There was an unknown problem when trying to create your message'
        });
    });
}

module.exports = {
  getMessages,
  getMessageBy,
  getUsersMessages,
  createMessage
}
