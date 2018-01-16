const constants = require('../../config/constants')
const conditions = require('../../json/conditions.json');
const _ = require('lodash');

function getAll(req, res, next) {
  res.status(constants.http_ok)
    .json({
      content: conditions
    });
}

function getSpecific(req, res, next) {
  let selected = _.filter(conditions, req.body);

  if (selected.length > 0) {
    res.status(constants.http_ok)
      .json({
        content: selected
      });
  }
  else {
    res.status(constants.http_not_found)
      .json({
        message: 'Condition not found'
      });
  }
}

module.exports = {
  getAll,
  getSpecific
}
