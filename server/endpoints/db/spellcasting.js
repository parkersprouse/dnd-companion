const constants = require('../../config/constants')
const spellcasting = require('../../json/spellcasting.json');
const _ = require('lodash');

function getAll(req, res, next) {
  res.status(constants.http_ok)
    .json({
      content: spellcasting
    });
}

function getSpecific(req, res, next) {
  let selected = _.filter(spellcasting, req.body);

  if (selected.length > 0) {
    res.status(constants.http_ok)
      .json({
        content: selected
      });
  }
  else {
    res.status(constants.http_not_found)
      .json({
        message: 'Spellcasting not found'
      });
  }
}

module.exports = {
  getAll,
  getSpecific
}
