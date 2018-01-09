const constants = require('../../config/constants')
const equipment_categories = require('../../json/equipment-categories.json');
const _ = require('lodash');

function getAll(req, res, next) {
  res.status(constants.http_ok)
    .json({
      content: equipment_categories
    });
}

function getSpecific(req, res, next) {
  let selected = _.filter(equipment_categories, req.body);

  if (selected.length > 0) {
    res.status(constants.http_ok)
      .json({
        content: selected
      });
  }
  else {
    res.status(constants.http_not_found)
      .json({
        message: 'Equipment Category not found'
      });
  }
}

module.exports = {
  getAll,
  getSpecific
}
