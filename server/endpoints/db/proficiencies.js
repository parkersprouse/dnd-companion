const constants = require('../../config/constants')
const proficiencies = require('../../json/proficiencies.json');
const _ = require('lodash');

function getAll(req, res, next) {
  res.status(constants.http_ok)
    .json({
      content: proficiencies
    });
}

function getSpecific(req, res, next) {
  let selected = _.filter(proficiencies, req.body);

  if (selected.length > 0) {
    res.status(constants.http_ok)
      .json({
        content: selected
      });
  }
  else {
    res.status(constants.http_not_found)
      .json({
        message: 'Proficiency not found'
      });
  }
}

module.exports = {
  getAll,
  getSpecific
}
