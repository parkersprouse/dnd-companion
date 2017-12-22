const { db, Sequelize } = require('../db');

const attributes = {
  id:       { type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, unique: true, primaryKey: true },
  email:    { type: Sequelize.TEXT, allowNull: false, unique: true },
  username: { type: Sequelize.TEXT, allowNull: false, unique: true },
  name:     { type: Sequelize.TEXT },
  pw_hash:  { type: Sequelize.TEXT, allowNull: false }
};

const tableSettings = {
  timestamps:      false,
  freezeTableName: true,
  underscored:     true,
  indexes: [{
    name: 'users_lowercase_email',
    method: 'BTREE',
    unique: true,
    fields: [db.fn('LOWER', db.col('email'))]
  },
  {
    name: 'users_lowercase_username',
    method: 'BTREE',
    unique: true,
    fields: [db.fn('LOWER', db.col('username'))]
  }]
};

const Users = db.define('users', attributes, tableSettings);

module.exports = Users;
