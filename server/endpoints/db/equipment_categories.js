const constants = require('../../config/constants')
const equipment_categories = require('../../json/equipment-categories.json');

function getAll(req, res, next) {
  res.status(constants.http_ok)
    .json({
      content: equipment_categories
    });
}

function getSpecific(req, res, next) {
  const id = req.params.id;
  let selected = null;

  equipment_categories.forEach(ele => {
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
        message: 'Equipment Category not found'
      });
  }
}

module.exports = {
  getAll,
  getSpecific
}
