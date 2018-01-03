const constants = require('../../config/constants')
const damage_types = require('../../json/damage-types.json');

function getAll(req, res, next) {
  res.status(constants.http_ok)
    .json({
      content: damage_types
    });
}

function getSingle(req, res, next) {
  const id = req.params.id;
  let selected = null;

  damage_types.forEach(ele => {
    if (ele.index == id || ele.name.toLowerCase().replace(/ /g, '_') == id.toLowerCase()) selected = ele;
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
        message: 'Damage Type not found'
      });
  }
}

module.exports = {
  getAll,
  getSingle
}
