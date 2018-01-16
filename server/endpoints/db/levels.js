const constants = require('../../config/constants')
const levels = require('../../json/levels.json');
const _ = require('lodash');

function getAll(req, res, next) {
  res.status(constants.http_ok)
    .json({
      content: levels
    });
}

function getSpecific(req, res, next) {
  let selected = _.filter(levels, req.body);

  if (selected.length > 0) {
    res.status(constants.http_ok)
      .json({
        content: selected
      });
  }
  else {
    res.status(constants.http_not_found)
      .json({
        message: 'Level not found'
      });
  }
}

module.exports = {
  getAll,
  getSpecific
}
