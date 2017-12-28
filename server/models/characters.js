const { db, Sequelize } = require('../config/db');
const Users = require('./Users');

const attributes = {
  id:                { type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, unique: true, primaryKey: true },
  name:              { type: Sequelize.TEXT, allowNull: false },
  level:             { type: Sequelize.INTEGER, allowNull: false, defaultValue: 1 },
  experience:        { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 },
  alignment:         { type: Sequelize.TEXT, allowNull: false },
  race:              { type: Sequelize.INTEGER, allowNull: false }, // race ID
  background:        { type: Sequelize.TEXT, allowNull: false },
  class:             { type: Sequelize.INTEGER, allowNull: false }, // class ID
  proficiency_bonus: {},
  inspiration:       {},
  armor_class:       {},
  speed:             {},
  max_hp:            {},
  current_hp:        {},
  temp_hp:           {},
  hit_dice:          {},
  equipment:         { type: Sequelize.ARRAY(Sequelize.INTEGER), allowNull: false }, // array of equipment IDs
  notes:             {},
  traits:            {},
  personality:       {},
  ideals:            {},
  bonds:             {},
  flaws:             {},
  platinum:          {},
  gold:              {},
  electrum:          {},
  silver:            {},
  copper:            {},
  proficiencies:     { type: Sequelize.ARRAY(Sequelize.INTEGER), allowNull: false }, // array of proficiency IDs

  userid:            {
                       type: Sequelize.INTEGER, allowNull: false,
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
