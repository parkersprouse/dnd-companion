const constants = require('../../config/constants')
const equipment = require('../../json/equipment.json');
const _ = require('lodash');

function getAll(req, res, next) {
  res.status(constants.http_ok)
    .json({
      content: equipment
    });
}

function getSpecific(req, res, next) {
  let selected = _.filter(equipment, req.body);

  if (selected.length > 0) {
    res.status(constants.http_ok)
      .json({
        content: selected
      });
  }
  else {
    res.status(constants.http_not_found)
      .json({
        message: 'Equipment not found'
      });
  }
}

module.exports = {
  getAll,
  getSpecific
}
