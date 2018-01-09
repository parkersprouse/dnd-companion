const constants = require('../../config/constants')
const levels = require('../../json/levels.json');

function getAll(req, res, next) {
  res.status(constants.http_ok)
    .json({
      content: levels
    });
}

function getSpecific(req, res, next) {
  const id = req.params.id;
  let selected = null;

  levels.forEach(ele => {
    if (ele.index == id || ele.level == id) selected = ele;
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
        message: 'Level not found'
      });
  }
}

module.exports = {
  getAll,
  getSpecific
}
