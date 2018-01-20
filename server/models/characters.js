const { db, Sequelize } = require('../config/db');
const Users = require('./users');

const attributes = {
  id:                { type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, unique: true, primaryKey: true },
  name:              { type: Sequelize.TEXT, allowNull: false },
  subrace:           { type: Sequelize.TEXT },
  level:             { type: Sequelize.TEXT, defaultValue: 1 },
  experience:        { type: Sequelize.TEXT, defaultValue: 0 },
  alignment:         { type: Sequelize.TEXT },
  race:              { type: Sequelize.TEXT }, // race name -- allows for custom
  backstory:         { type: Sequelize.TEXT },
  hair_color:        { type: Sequelize.TEXT },
  skin_color:        { type: Sequelize.TEXT },
  eye_color:         { type: Sequelize.TEXT },
  height:            { type: Sequelize.TEXT },
  age:               { type: Sequelize.TEXT },
  weight:            { type: Sequelize.TEXT },
  background:        { type: Sequelize.TEXT },
  class:             { type: Sequelize.TEXT }, // class name -- allows for custom
  ability_scores:    { type: Sequelize.JSON }, // {"charisma": {level: 13, modifier: 1}}
  passive_wisdom:    { type: Sequelize.INTEGER }, // passive perception
  proficiency_bonus: { type: Sequelize.INTEGER },
  inspiration:       { type: Sequelize.INTEGER },
  armor_class:       { type: Sequelize.INTEGER },
  speed:             { type: Sequelize.INTEGER },
  initiative:        { type: Sequelize.INTEGER },
  max_hp:            { type: Sequelize.INTEGER },
  current_hp:        { type: Sequelize.INTEGER },
  temp_hp:           { type: Sequelize.INTEGER },
  hit_dice:          { type: Sequelize.TEXT },
  death_saves:       { type: Sequelize.JSON }, // {success: 0, failed: 2}
  equipment:         { type: Sequelize.ARRAY(Sequelize.JSON) }, // array of equipment objects -- [{name: "Lantern", "amount": 1}]
  weapons:           { type: Sequelize.ARRAY(Sequelize.JSON) }, // array of weapon objects -- [{name: "Sword", "amount": 1}]
  armor:             { type: Sequelize.ARRAY(Sequelize.JSON) }, // array of armor objects -- [{name: "Breastplate", "amount": 1}]
  notes:             { type: Sequelize.TEXT }, // "Character Notes"
  features:          { type: Sequelize.TEXT }, // "Features & Traits"
  personality:       { type: Sequelize.TEXT }, // "Personality Traits"
  ideals:            { type: Sequelize.TEXT }, // "Ideals"
  bonds:             { type: Sequelize.TEXT }, // "Bonds"
  flaws:             { type: Sequelize.TEXT }, // "Flaws"
  languages:         { type: Sequelize.ARRAY(Sequelize.TEXT) }, // array of language names -- allows for custom
  platinum:          { type: Sequelize.INTEGER },
  gold:              { type: Sequelize.INTEGER },
  electrum:          { type: Sequelize.INTEGER },
  silver:            { type: Sequelize.INTEGER },
  copper:            { type: Sequelize.INTEGER },
  proficiencies:     { type: Sequelize.ARRAY(Sequelize.TEXT) }, // array of proficiency names -- allows for custom
  spells:            { type: Sequelize.ARRAY(Sequelize.INTEGER) }, // array of spell IDs
  spell_slots:       { type: Sequelize.JSON }, // {"1": {amount: 3, used: 2}}
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
