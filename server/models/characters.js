const { db, Sequelize } = require('../config/db');
const Users = require('./Users');

const attributes = {
  id:         { type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, unique: true, primaryKey: true },
  name:       { type: Sequelize.TEXT, allowNull: false },
  level:      { type: Sequelize.INTEGER, allowNull: false, defaultValue: 1 },
  experience: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 },
  userid:     { type: Sequelize.INTEGER, allowNull: false,
                references: {
                  model: Users,
                  key: 'id',
                  deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
                }
              }
};

const tableSettings = {
  timestamps:      false,
  freezeTableName: true,
  underscored:     true
};

const Characters = db.define('characters', attributes, tableSettings);

module.exports = Characters;
