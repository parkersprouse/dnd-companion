const constants = require('../../config/constants')
const classes = require('../../json/classes.json');

function getAll(req, res, next) {
  res.status(constants.http_ok)
    .json({
      content: classes
    });
}

function getSpecific(req, res, next) {
  const id = req.params.id;
  let selected = null;

  classes.forEach(ele => {
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
        message: 'Class not found'
      });
  }
}

module.exports = {
  getAll,
  getSpecific
}
