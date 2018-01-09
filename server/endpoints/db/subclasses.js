const constants = require('../../config/constants')
const subclasses = require('../../json/subclasses.json');

function getAll(req, res, next) {
  res.status(constants.http_ok)
    .json({
      content: subclasses
    });
}

function getSpecific(req, res, next) {
  const id = req.params.id;
  let selected = null;

  subclasses.forEach(ele => {
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
        message: 'Subclass not found'
      });
  }
}

module.exports = {
  getAll,
  getSpecific
}
