const constants = require('../../config/constants')
const monsters = require('../../json/monsters.json');
const _ = require('lodash');

function getAll(req, res, next) {
  res.status(constants.http_ok)
    .json({
      content: monsters
    });
}

function getSpecific(req, res, next) {
  let selected = _.filter(monsters, req.body);

  if (selected.length > 0) {
    res.status(constants.http_ok)
      .json({
        content: selected
      });
  }
  else {
    res.status(constants.http_not_found)
      .json({
        message: 'Monster not found'
      });
  }
}

module.exports = {
  getAll,
  getSpecific
}
