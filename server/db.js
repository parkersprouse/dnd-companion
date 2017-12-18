// eslint-disable-next-line
'use strict';

const bluebird = require('bluebird');
const config = require('./config');

var options = {
  promiseLib: bluebird // Switch our db promises to use bluebird instead of ES6 Promises
};

var pgp = require('pg-promise')(options);
var db = pgp(config.dbConfig);

module.exports = {
  db: db,
  pgp: pgp
}
