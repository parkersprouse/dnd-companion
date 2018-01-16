const constants = require('../../config/constants')
const features = require('../../json/features.json');
const _ = require('lodash');

function getAll(req, res, next) {
  res.status(constants.http_ok)
    .json({
      content: features
    });
}

function getSpecific(req, res, next) {
  let selected = _.filter(features, req.body);

  if (selected.length > 0) {
    res.status(constants.http_ok)
      .json({
        content: selected
      });
  }
  else {
    res.status(constants.http_not_found)
      .json({
        message: 'Feature not found'
      });
  }
}

module.exports = {
  getAll,
  getSpecific
}
