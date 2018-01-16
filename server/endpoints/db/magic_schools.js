const constants = require('../../config/constants')
const magic_schools = require('../../json/magic-schools.json');
const _ = require('lodash');

function getAll(req, res, next) {
  res.status(constants.http_ok)
    .json({
      content: magic_schools
    });
}

function getSpecific(req, res, next) {
  let selected = _.filter(magic_schools, req.body);

  if (selected.length > 0) {
    res.status(constants.http_ok)
      .json({
        content: selected
      });
  }
  else {
    res.status(constants.http_not_found)
      .json({
        message: 'Magic School not found'
      });
  }
}

module.exports = {
  getAll,
  getSpecific
}
