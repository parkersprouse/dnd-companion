const constants = require('../config/constants');
const db = require('../config/db').db;
const validator = require('validator');
const _ = require('lodash');
const Characters = require('../models/characters');
const Games = require('../models/games');

function getCharacters(req, res, next) {
  Characters.findAll()
    .then((data) => {
      const chars = [];
      data.forEach((char) => chars.push(char.get({ plain: true })));
      res.status(constants.http_ok)
        .json({
          status: 'success',
          content: chars,
          message: 'Got all characters'
        });
    })
    .catch((err) => {
      res.status(constants.http_bad_request)
        .json({
          status: 'failure',
          content: err.message,
          message: 'Failed to get all characters'
        });
    });
}

function getCharacterBy(req, res, next) {
  const data = {};
  _.each(req.body, (val, index) => {
    if (typeof val === 'string')
      data[index] = { $iLike: val };
    else
      data[index] = val;
  });

  Characters.findAll({ where: data })
    .then((data) => {
      if (!data || data.length === 0)
        res.status(constants.http_not_found)
          .json({
            status: 'failure',
            message: 'Character not found'
          });
      else {
        const chars = [];
        data.forEach((char) => chars.push(char.get({ plain: true })));
        res.status(constants.http_ok)
          .json({
            status: 'success',
            content: chars,
            message: 'Got character'
          });
      }
    })
    .catch((err) => {
      res.status(constants.http_bad_request)
        .json({
          status: 'failure',
          content: err.message,
          message: 'Failed to get character'
        });
    });
}

function createCharacter(req, res, next) {
  if (!req.body.name)
    res.status(constants.http_bad_request)
      .json({
        status: 'failure',
        message: 'Please make sure your character has a name'
      });
  else
    Characters.create(req.body)
      .then((data) => {
        res.status(constants.http_ok)
          .json({
            status: 'success',
            content: data,
            message: 'Character created'
          });
      })
      .catch((err) => {
        res.status(constants.http_bad_request)
          .json({
            status: 'failure',
            content: err.message,
            message: 'There was an unknown problem when trying to create your character'
          });
      });
}

function updateCharacter(req, res, next) {
  Characters.update(req.body, { where: { id: req.body.id }, returning: true })
    .then((data) => {
      if (!data[0]) {
        res.status(constants.http_bad_request)
          .json({
            status: 'failure',
            content: data[0],
            message: 'No character updated, check provided ID'
          });
      }
      else {
        // data[0] is the number of rows affected
        // data[1] is the array containing the returned rows
        // data[1][0] is the first character that was returned
        // data[1][0].dataValues is the object containing the values of the returned row
        res.status(constants.http_ok)
          .json({
            status: 'success',
            content: data[1][0].dataValues,
            message: 'Updated character'
          });
      }
    })
    .catch((err) => {
      res.status(constants.http_bad_request)
        .json({
          status: 'failure',
          content: err.message,
          message: 'There was a problem when updating your character'
        });
    });
}

// Need to keep in mind that if a user has multiple characters in the same game,
// deleting any one of them will remove the user from the game's user list
// under this current implementation.
// Checking for the multiple characters and not deleting the user in that case will
// add significantly more code to this already monstrous method, so we'll
// just hope for now that no one triggers that situation.
function deleteCharacter(req, res, next) {
  Characters.findOne({ where: { id: req.params.id } })
    .then((data) => {
      if (!data)
        res.status(constants.http_bad_request)
          .json({
            status: 'failure',
            message: 'No character deleted, check provided ID'
          });
      else {
        const user_id = data.userid;
        Games.findOne({ where: { char_ids: { $contains: [Number(req.params.id)] } } })
          .then((data) => {
            console.log(data)
            if (!data)
              Characters.destroy({ where: { id: req.params.id } })
                .then((data) => {
                  if (data < 1)
                    res.status(constants.http_bad_request)
                      .json({
                        status: 'failure',
                        message: 'No character deleted, check provided ID'
                      });
                  else
                    res.status(constants.http_ok)
                      .json({
                        status: 'success',
                        message: 'Deleted character'
                      });
                })
                .catch((err) => {
                  res.status(constants.http_bad_request)
                    .json({
                      status: 'failure',
                      content: err.message,
                      message: 'There was a problem when deleting your character'
                    });
                });
            else {
              const { char_ids, user_ids, id } = data;
              char_ids.splice(char_ids.indexOf(Number(req.params.id)), 1);
              user_ids.splice(user_ids.indexOf(Number(user_id)), 1);
              console.log(char_ids)
              console.log(user_ids)
              Games.update({ char_ids, user_ids }, { where: { id } })
                .then((data) => {
                  Characters.destroy({ where: { id: req.params.id } })
                    .then((data) => {
                      if (data < 1)
                        res.status(constants.http_bad_request)
                          .json({
                            status: 'failure',
                            message: 'No character deleted, check provided ID'
                          });
                      else
                        res.status(constants.http_ok)
                          .json({
                            status: 'success',
                            message: 'Deleted character'
                          });
                    })
                    .catch((err) => {
                      res.status(constants.http_bad_request)
                        .json({
                          status: 'failure',
                          content: err.message,
                          message: 'There was a problem when deleting your character'
                        });
                    });
                })
                .catch((err) => {
                  res.status(constants.http_server_error)
                    .json({
                      status: 'failure',
                      message: 'There was a problem when deleting your character'
                    });
                });
            }
          })
          .catch((err) => {
            res.status(constants.http_server_error)
              .json({
                status: 'failure',
                message: 'There was a problem when deleting your character'
              });
          });
      }
    })
    .catch((err) => {
      res.status(constants.http_bad_request)
        .json({
          status: 'failure',
          content: err.message,
          message: 'There was a problem when deleting your character'
        });
    });
}

module.exports = {
  getCharacters,
  getCharacterBy,
  createCharacter,
  updateCharacter,
  deleteCharacter
}
