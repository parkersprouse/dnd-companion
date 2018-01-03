const constants = require('../../config/constants')
const subraces = require('../../json/subraces.json');

function getAll(req, res, next) {
  res.status(constants.http_ok)
    .json({
      content: subraces
    });
}

function getSingle(req, res, next) {
  const id = req.params.id;
  let selected = null;

  subraces.forEach(ele => {
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
        message: 'Subrace not found'
      });
  }
}

module.exports = {
  getAll,
  getSingle
}
