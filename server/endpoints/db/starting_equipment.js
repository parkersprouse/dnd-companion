const constants = require('../../config/constants')
const starting_equipment = require('../../json/starting-equipment.json');

function getAll(req, res, next) {
  res.status(constants.http_ok)
    .json({
      content: starting_equipment
    });
}

function getSingle(req, res, next) {
  const id = req.params.id;
  let selected = null;

  starting_equipment.forEach(ele => {
    if (ele.index == id || ele.class.name.toLowerCase().replace(/ /g, '_') == id.toLowerCase()) selected = ele;
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
        message: 'Starting Equipment not found'
      });
  }
}

module.exports = {
  getAll,
  getSingle
}
