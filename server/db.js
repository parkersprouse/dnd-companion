// eslint-disable-next-line
'use strict';

//const bluebird = require('bluebird');

// var options = {
//   promiseLib: bluebird // Switch our db promises to use bluebird instead of ES6 Promises
// };

// var pgp = require('pg-promise')(options);
// var db = pgp(config.dbConfig);

const config = require('./config');
const Sequelize = require('sequelize');

const sequelize = new Sequelize({
  database: config.dbConfig.database,
  username: config.dbConfig.user,
  password: config.dbConfig.password,
  host: config.dbConfig.host,
  port: config.dbConfig.port,
  ssl: config.dbConfig.ssl,
  dialect: 'postgres',
  dialectOptions: {
    ssl: config.dbConfig.ssl
  }
});

module.exports = {
  db: sequelize,
  Sequelize: Sequelize
};
