const constants = require('../../config/constants')
const starting_equipment = require('../../json/starting-equipment.json');
const _ = require('lodash');

function getAll(req, res, next) {
  res.status(constants.http_ok)
    .json({
      content: starting_equipment
    });
}

function getSpecific(req, res, next) {
  let selected = _.filter(starting_equipment, req.body);

  if (selected.length > 0) {
    res.status(constants.http_ok)
      .json({
        content: selected
      });
  }
  else {
    res.status(constants.http_not_found)
      .json({
        message: 'Starting Equipment not found'
      });
  }
}

module.exports = {
  getAll,
  getSpecific
}
