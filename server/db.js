// eslint-disable-next-line
'use strict';

const bluebird = require('bluebird');
const config = require('./config');

var options = {
  promiseLib: bluebird // Switch our db promises to use bluebird instead of ES6 Promises
};

var pgp = require('pg-promise')(options);
var db = pgp(config.dbConfig);

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

sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = {
  db: db,
  pgp: pgp
}
