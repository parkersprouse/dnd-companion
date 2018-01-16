const constants = require('../../config/constants')
const subclasses = require('../../json/subclasses.json');
const _ = require('lodash');

function getAll(req, res, next) {
  res.status(constants.http_ok)
    .json({
      content: subclasses
    });
}

function getSpecific(req, res, next) {
  let selected = _.filter(subclasses, req.body);

  if (selected.length > 0) {
    res.status(constants.http_ok)
      .json({
        content: selected
      });
  }
  else {
    res.status(constants.http_not_found)
      .json({
        message: 'Subclass not found'
      });
  }
}

module.exports = {
  getAll,
  getSpecific
}
