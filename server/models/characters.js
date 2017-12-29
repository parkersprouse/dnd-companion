const { db, Sequelize } = require('../config/db');
const Users = require('./Users');

const attributes = {
  id:                { type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, unique: true, primaryKey: true },
  name:              { type: Sequelize.TEXT, allowNull: false },
  level:             { type: Sequelize.INTEGER, allowNull: false, defaultValue: 1 },
  experience:        { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 },
  alignment:         { type: Sequelize.TEXT, allowNull: false },
  race:              { type: Sequelize.INTEGER, allowNull: false }, // race ID
  backstory:         { type: Sequelize.TEXT },
  hair_color:        { type: Sequelize.TEXT },
  skin_color:        { type: Sequelize.TEXT },
  eye_color:         { type: Sequelize.TEXT },
  height:            { type: Sequelize.TEXT },
  age:               { type: Sequelize.TEXT },
  weight:            { type: Sequelize.TEXT },
  background:        { type: Sequelize.TEXT, allowNull: false },
  class:             { type: Sequelize.INTEGER, allowNull: false }, // class ID
  ability_scores:    { type: Sequelize.JSON, allowNull: false }, //
  passive_wisdom:    { type: Sequelize.INTEGER },
  proficiency_bonus: { type: Sequelize.INTEGER, allowNull: false },
  inspiration:       { type: Sequelize.INTEGER },
  armor_class:       { type: Sequelize.INTEGER, allowNull: false },
  speed:             { type: Sequelize.INTEGER, allowNull: false },
  initiative:        { type: Sequelize.INTEGER },
  max_hp:            { type: Sequelize.INTEGER, allowNull: false },
  current_hp:        { type: Sequelize.INTEGER },
  temp_hp:           { type: Sequelize.INTEGER },
  hit_dice:          { type: Sequelize.TEXT },
  death_saves:       { type: Sequelize.JSON }, // {success: 0, failed: 2}
  equipment:         { type: Sequelize.ARRAY(Sequelize.JSON) }, // array of equipment IDs and amounts -- [{"id": 123, "amount": 1}]
  weapons:           { type: Sequelize.ARRAY(Sequelize.JSON) }, // array of weapon IDs and amounts -- [{"id": 123, "amount": 1}]
  armor:             { type: Sequelize.ARRAY(Sequelize.JSON) }, // array of armor IDs and amounts -- [{"id": 123, "amount": 1}]
  special_equipment: { type: Sequelize.ARRAY(Sequelize.JSON) }, // array of special equipment -- [{"name": "my special thing", "amount": 1, "desc": "it does this" }]
  special_weapons:   { type: Sequelize.ARRAY(Sequelize.JSON) }, // array of special weapons -- [{"name": "my special thing", "amount": 1, "desc": "it does this" }]
  special_armor:     { type: Sequelize.ARRAY(Sequelize.JSON) }, // array of special armor -- [{"name": "my special thing", "amount": 1, "desc": "it does this" }]
  notes:             { type: Sequelize.TEXT }, // "Character Notes"
  features:          { type: Sequelize.TEXT }, // "Features & Traits"
  personality:       { type: Sequelize.TEXT }, // "Personality Traits"
  ideals:            { type: Sequelize.TEXT }, // "Ideals"
  bonds:             { type: Sequelize.TEXT }, // "Bonds"
  flaws:             { type: Sequelize.TEXT }, // "Flaws"
  languages:         { type: Sequelize.ARRAY(Sequelize.INTEGER) }, // array of language IDs
  platinum:          { type: Sequelize.INTEGER },
  gold:              { type: Sequelize.INTEGER },
  electrum:          { type: Sequelize.INTEGER },
  silver:            { type: Sequelize.INTEGER },
  copper:            { type: Sequelize.INTEGER },
  proficiencies:     { type: Sequelize.ARRAY(Sequelize.INTEGER) }, // array of proficiency IDs
  spells:            { type: Sequelize.ARRAY(Sequelize.INTEGER) }, // array of spell IDs
  spell_slots:       { type: Sequelize.ARRAY(Sequelize.JSON) }, // array of spell slots -- [{level: 1, amount: 3, used: 2}]
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
