const constants = require('../../config/constants')
const damage_types = require('../../json/damage-types.json');
const _ = require('lodash');

function getAll(req, res, next) {
  res.status(constants.http_ok)
    .json({
      content: damage_types
    });
}

function getSpecific(req, res, next) {
  let selected = _.filter(damage_types, req.body);

  if (selected.length > 0) {
    res.status(constants.http_ok)
      .json({
        content: selected
      });
  }
  else {
    res.status(constants.http_not_found)
      .json({
        message: 'Damage Type not found'
      });
  }
}

module.exports = {
  getAll,
  getSpecific
}
