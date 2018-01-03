const constants = require('../../config/constants')
const equipment = require('../../json/equipment.json');

function getAll(req, res, next) {
  res.status(constants.http_ok)
    .json({
      content: equipment
    });
}

function getSingle(req, res, next) {
  const id = req.params.id;
  let selected = null;

  equipment.forEach(ele => {
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
        message: 'Equipment not found'
      });
  }
}

module.exports = {
  getAll,
  getSingle
}
