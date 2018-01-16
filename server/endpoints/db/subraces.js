const constants = require('../../config/constants')
const subraces = require('../../json/subraces.json');
const _ = require('lodash');

function getAll(req, res, next) {
  res.status(constants.http_ok)
    .json({
      content: subraces
    });
}

function getSpecific(req, res, next) {
  let selected = _.filter(subraces, req.body);

  if (selected.length > 0) {
    res.status(constants.http_ok)
      .json({
        content: selected
      });
  }
  else {
    res.status(constants.http_not_found)
      .json({
        message: 'Subrace not found'
      });
  }
}

module.exports = {
  getAll,
  getSpecific
}
