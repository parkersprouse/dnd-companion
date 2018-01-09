const constants = require('../../config/constants')
const ability_scores = require('../../json/ability-scores.json');

function getAll(req, res, next) {
  res.status(constants.http_ok)
    .json({
      content: ability_scores
    });
}

function getSpecific(req, res, next) {
  const id = req.params.id;
  let selected = null;

  ability_scores.forEach(ele => {
    if (ele.index == id || ele.name.toLowerCase() == id.substring(0, 3).toLowerCase()) selected = ele;
  });

  if (!!selected) {
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
