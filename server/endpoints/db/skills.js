const constants = require('../../config/constants')
const skills = require('../../json/skills.json');
const _ = require('lodash');

function getAll(req, res, next) {
  res.status(constants.http_ok)
    .json({
      content: skills
    });
}

function getSpecific(req, res, next) {
  let selected = _.filter(skills, req.body);

  if (selected.length > 0) {
    res.status(constants.http_ok)
      .json({
        content: selected
      });
  }
  else {
    res.status(constants.http_not_found)
      .json({
        message: 'Skill not found'
      });
  }
}

module.exports = {
  getAll,
  getSpecific
}
