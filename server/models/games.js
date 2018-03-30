const { db, Sequelize } = require('../config/db');
const Users = require('./users');

const attributes = {
  id:           { type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, unique: true, primaryKey: true },
  code:         { type: Sequelize.TEXT, allowNull: false, unique: true },
  name:         { type: Sequelize.TEXT, allowNull: false },
  description:  { type: Sequelize.TEXT },
  char_ids:     { type: Sequelize.ARRAY(Sequelize.INTEGER), allowNull: false },
  user_ids:     { type: Sequelize.ARRAY(Sequelize.INTEGER), allowNull: false },
  owner_id:     {
                  type: Sequelize.INTEGER, allowNull: false,
                  references: {
                    model: Users,
                    key: 'id',
                    deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
                  }
                }
};

const table_config = {
  timestamps:      false,
  freezeTableName: true,
  underscored:     true
};

const Games = db.define('games', attributes, table_config);

module.exports = Games;
