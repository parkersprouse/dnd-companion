const constants = require('../../config/constants')
const ability_scores = require('../../json/ability-scores.json');
const _ = require('lodash');

function getAll(req, res, next) {
  res.status(constants.http_ok)
    .json({
      content: ability_scores
    });
}

function getSpecific(req, res, next) {
  let selected = _.filter(ability_scores, req.body);

  if (selected.length > 0) {
    res.status(constants.http_ok)
      .json({
        content: selected
      });
  }
  else {
    res.status(constants.http_not_found)
      .json({
        message: 'Ability score not found'
      });
  }
}

module.exports = {
  getAll,
  getSpecific
}
