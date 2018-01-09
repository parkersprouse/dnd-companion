const constants = require('../../config/constants')
const weapon_properties = require('../../json/weapon-properties.json');
const _ = require('lodash');

function getAll(req, res, next) {
  res.status(constants.http_ok)
    .json({
      content: weapon_properties
    });
}

function getSpecific(req, res, next) {
  let selected = _.filter(weapon_properties, req.body);

  if (selected.length > 0) {
    res.status(constants.http_ok)
      .json({
        content: selected
      });
  }
  else {
    res.status(constants.http_not_found)
      .json({
        message: 'Weapon Property not found'
      });
  }
}

module.exports = {
  getAll,
  getSpecific
}
