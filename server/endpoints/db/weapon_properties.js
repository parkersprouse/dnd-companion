const constants = require('../../config/constants')
const weapon_properties = require('../../json/weapon-properties.json');

function getAll(req, res, next) {
  res.status(constants.http_ok)
    .json({
      content: weapon_properties
    });
}

function getSpecific(req, res, next) {
  const id = req.params.id;
  let selected = null;

  weapon_properties.forEach(ele => {
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
        message: 'Weapon Property not found'
      });
  }
}

module.exports = {
  getAll,
  getSpecific
}
