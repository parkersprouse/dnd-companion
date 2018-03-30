const constants = require('../config/constants');
const db = require('../config/db').db;
const validator = require('validator');
const _ = require('lodash');
const Games = require('../models/games');

function getGames(req, res, next) {
  Games.findAll()
    .then((data) => {
      const games = [];
      data.forEach((game) => games.push(game.get({ plain: true })));
      res.status(constants.http_ok)
        .json({
          status: 'success',
          content: games,
          message: 'Got all games'
        });
    })
    .catch((err) => {
      res.status(constants.http_bad_request)
        .json({
          status: 'failure',
          content: err.message,
          message: 'Failed to get all games'
        });
    });
}

function getGameBy(req, res, next) {
  Games.findAll({ where: req.body })
    .then((data) => {
      if (!data || data.length === 0)
        res.status(constants.http_not_found)
          .json({
            status: 'failure',
            message: 'Game not found'
          });
      else {
        const games = [];
        data.forEach((game) => games.push(game.get({ plain: true })));
        res.status(constants.http_ok)
          .json({
            status: 'success',
            content: games,
            message: 'Got game'
          });
      }
    })
    .catch((err) => {
      res.status(constants.http_bad_request)
        .json({
          status: 'failure',
          content: err.message,
          message: 'Failed to get game'
        });
    });
}

// It's important to note that this does not get the games that the user owns,
// but instead gets games that the user has a character in
function getUsersGames(req, res, next) {
  Games.findAll()
    .then((data) => {
      const games = [];
      data.forEach((g) => {
        const game = g.get({ plain: true });
        if (game.user_ids.indexOf(Number(req.params.user_id)) > -1)
          games.push(game);
      });
      res.status(constants.http_ok)
        .json({
          status: 'success',
          content: games,
          message: 'Got all games'
        });
    })
    .catch((err) => {
      res.status(constants.http_bad_request)
        .json({
          status: 'failure',
          content: err.message,
          message: 'Failed to get user\'s games'
        });
    });
}

function createGame(req, res, next) {
  if (!req.body.name)
    res.status(constants.http_bad_request)
      .json({
        status: 'failure',
        message: 'Please make sure your game has a name'
      });
  else
    Games.create(req.body)
      .then((data) => {
        res.status(constants.http_ok)
          .json({
            status: 'success',
            content: data,
            message: 'Game created'
          });
      })
      .catch((err) => {
        res.status(constants.http_bad_request)
          .json({
            status: 'failure',
            content: err.message,
            message: 'There was an unknown problem when trying to create your game'
          });
      });
}

function updateGame(req, res, next) {
  Games.update(req.body, { where: { id: req.body.id }, returning: true })
    .then((data) => {
      if (!data[0]) {
        res.status(constants.http_bad_request)
          .json({
            status: 'failure',
            content: data[0],
            message: 'No game updated, check provided ID'
          });
      }
      else {
        // data[0] is the number of rows affected
        // data[1] is the array containing the returned rows
        // data[1][0] is the first game that was returned
        // data[1][0].dataValues is the object containing the values of the returned row
        res.status(constants.http_ok)
          .json({
            status: 'success',
            content: data[1][0].dataValues,
            message: 'Updated game'
          });
      }
    })
    .catch((err) => {
      res.status(constants.http_bad_request)
        .json({
          status: 'failure',
          content: err.message,
          message: 'There was a problem when updating your game'
        });
    });
}

function deleteGame(req, res, next) {
  Games.destroy({ where: { id: req.params.id } })
    .then((data) => {
      if (data < 1) {
        res.status(constants.http_bad_request)
          .json({
            status: 'failure',
            message: 'No game deleted, check provided ID'
          });
      }
      else {
        res.status(constants.http_ok)
          .json({
            status: 'success',
            message: 'Deleted game'
          });
      }
    })
    .catch((err) => {
      res.status(constants.http_bad_request)
        .json({
          status: 'failure',
          content: err.message,
          message: 'There was a problem when deleting your game'
        });
    });
}

module.exports = {
  getGames,
  getGameBy,
  getUsersGames,
  createGame,
  updateGame,
  deleteGame
}
