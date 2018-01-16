const constants = require('../../config/constants')
const spells = require('../../json/spells.json');
const _ = require('lodash');

function getAll(req, res, next) {
  res.status(constants.http_ok)
    .json({
      content: spells
    });
}

function getSpecific(req, res, next) {
  let selected = _.filter(spells, req.body);

  if (selected.length > 0) {
    res.status(constants.http_ok)
      .json({
        content: selected
      });
  }
  else {
    res.status(constants.http_not_found)
      .json({
        message: 'Spell not found'
      });
  }
}

module.exports = {
  getAll,
  getSpecific
}
