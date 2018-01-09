const constants = require('../../config/constants')
const races = require('../../json/races.json');
const _ = require('lodash');

function getAll(req, res, next) {
  res.status(constants.http_ok)
    .json({
      content: races
    });
}

function getSpecific(req, res, next) {
  let selected = _.filter(races, req.body);

  if (selected.length > 0) {
    res.status(constants.http_ok)
      .json({
        content: selected
      });
  }
  else {
    res.status(constants.http_not_found)
      .json({
        message: 'Race not found'
      });
  }
}

module.exports = {
  getAll,
  getSpecific
}
