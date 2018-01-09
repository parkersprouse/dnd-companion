const constants = require('../../config/constants')
const languages = require('../../json/languages.json');
const _ = require('lodash');

function getAll(req, res, next) {
  res.status(constants.http_ok)
    .json({
      content: languages
    });
}

function getSpecific(req, res, next) {
  let selected = _.filter(languages, req.body);

  if (selected.length > 0) {
    res.status(constants.http_ok)
      .json({
        content: selected
      });
  }
  else {
    res.status(constants.http_not_found)
      .json({
        message: 'Language not found'
      });
  }
}

module.exports = {
  getAll,
  getSpecific
}
