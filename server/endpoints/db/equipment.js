const constants = require('../../config/constants')
const equipment = require('../../json/equipment.json');
const _ = require('lodash');

function getAll(req, res, next) {
  res.status(constants.http_ok)
    .json({
      content: equipment
    });
}

function getSpecific(req, res, next) {
  let selected = _.filter(equipment, req.body);
  // equipment.forEach(ele => {
  //   let match = true;
  //   attrs.forEach(attr => {
  //     if (typeof ele[attr] === 'undefined') {
  //       match = false;
  //       return;
  //     }
  //
  //     if (typeof req.body[attr] === 'string')
  //       match = match && req.body[attr].toLowerCase() == ele[attr].toLowerCase();
  //     else
  //       match = match && req.body[attr] == ele[attr];
  //   });
  //   if (match) selected.push(ele);
  // });

  if (selected.length > 0) {
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
  getSpecific
}
