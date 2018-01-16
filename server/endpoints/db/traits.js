const constants = require('../../config/constants')
const traits = require('../../json/traits.json');
const _ = require('lodash');

function getAll(req, res, next) {
  res.status(constants.http_ok)
    .json({
      content: traits
    });
}

function getSpecific(req, res, next) {
  let selected = _.filter(traits, req.body);

  if (selected.length > 0) {
    res.status(constants.http_ok)
      .json({
        content: selected
      });
  }
  else {
    res.status(constants.http_not_found)
      .json({
        message: 'Trait not found'
      });
  }
}

module.exports = {
  getAll,
  getSpecific
}
