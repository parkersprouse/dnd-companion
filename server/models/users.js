const { db, Sequelize } = require('../db');

const attributes = {
  id:       { type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, unique: true, primaryKey: true },
  email:    { type: Sequelize.TEXT, allowNull: false, unique: true },
  username: { type: Sequelize.TEXT, allowNull: false, unique: true },
  name:     { type: Sequelize.TEXT, allowNull: true },
  pw_hash:  { type: Sequelize.TEXT, allowNull: false }
};

const tableSettings = {
  timestamps: false,
  freezeTableName: true,
  underscore: true
};

const Users = db.define('users', attributes, tableSettings);

module.exports = Users;
