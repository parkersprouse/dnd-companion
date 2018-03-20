const constants = require('../../config/constants')
const trinkets = require('../../json/trinkets.json');
const _ = require('lodash');

function getAll(req, res, next) {
  res.status(constants.http_ok)
    .json({
      content: trinkets
    });
}

function getSpecific(req, res, next) {
  let selected = _.filter(trinkets, req.body);

  if (selected.length > 0) {
    res.status(constants.http_ok)
      .json({
        content: selected
      });
  }
  else {
    res.status(constants.http_not_found)
      .json({
        message: 'Trinket not found'
      });
  }
}

module.exports = {
  getAll,
  getSpecific
}
