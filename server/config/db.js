// eslint-disable-next-line
'use strict';

const config = require('./index');
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
