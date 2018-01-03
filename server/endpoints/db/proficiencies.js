const constants = require('../../config/constants')
const proficiencies = require('../../json/proficiencies.json');

function getAll(req, res, next) {
  res.status(constants.http_ok)
    .json({
      content: proficiencies
    });
}

function getSingle(req, res, next) {
  const id = req.params.id;
  let selected = null;

  proficiencies.forEach(ele => {
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
        message: 'Proficiency not found'
      });
  }
}

module.exports = {
  getAll,
  getSingle
}
