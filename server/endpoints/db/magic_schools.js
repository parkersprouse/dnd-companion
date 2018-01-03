const constants = require('../../config/constants')
const magic_schools = require('../../json/magic-schools.json');

function getAll(req, res, next) {
  res.status(constants.http_ok)
    .json({
      content: magic_schools
    });
}

function getSingle(req, res, next) {
  const id = req.params.id;
  let selected = null;

  magic_schools.forEach(ele => {
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
        message: 'Magic School not found'
      });
  }
}

module.exports = {
  getAll,
  getSingle
}
