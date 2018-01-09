const constants = require('../../config/constants')
const classes = require('../../json/classes.json');
const _ = require('lodash');

function getAll(req, res, next) {
  res.status(constants.http_ok)
    .json({
      content: classes
    });
}

function getSpecific(req, res, next) {
  let selected = _.filter(classes, req.body);

  if (selected.length > 0) {
    res.status(constants.http_ok)
      .json({
        content: selected
      });
  }
  else {
    res.status(constants.http_not_found)
      .json({
        message: 'Class not found'
      });
  }
}

module.exports = {
  getAll,
  getSpecific
}
