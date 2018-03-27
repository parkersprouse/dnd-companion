const { db, Sequelize } = require('../config/db');
const Users = require('./users');

const attributes = {
  id:                { type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, unique: true, primaryKey: true },
  name:              { type: Sequelize.TEXT, allowNull: false },
  subrace:           { type: Sequelize.TEXT },
  level:             { type: Sequelize.TEXT, defaultValue: '1' },
  experience:        { type: Sequelize.TEXT, defaultValue: '0' },
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
  ability_scores:    { type: Sequelize.JSON }, // { 'charisma': { level: 13, modifier: 1 } }
  passive_wisdom:    { type: Sequelize.TEXT }, // passive perception
  proficiency_bonus: { type: Sequelize.TEXT },
  inspiration:       { type: Sequelize.TEXT },
  armor_class:       { type: Sequelize.TEXT },
  speed:             { type: Sequelize.TEXT },
  initiative:        { type: Sequelize.TEXT },
  max_hp:            { type: Sequelize.TEXT },
  current_hp:        { type: Sequelize.TEXT },
  temp_hp:           { type: Sequelize.TEXT },
  hit_dice:          { type: Sequelize.TEXT },
  death_saves:       { type: Sequelize.JSON }, // { success: 0, failed: 2 }
  attunements:       { type: Sequelize.JSON }, // { amount: 1, items: ['Item'] }
  equipment:         { type: Sequelize.ARRAY(Sequelize.JSON) }, // array of equipment objects -- [{ name: 'Lantern', amount: 1 }]
  weapons:           { type: Sequelize.ARRAY(Sequelize.JSON) }, // array of weapon objects -- [{ name: 'Sword', amount: 1 }]
  armor:             { type: Sequelize.ARRAY(Sequelize.JSON) }, // array of armor objects -- [{ name: 'Breastplate', amount: 1 }]
  notes:             { type: Sequelize.TEXT }, // 'Character Notes'
  features:          { type: Sequelize.TEXT }, // 'Features & Traits'
  personality:       { type: Sequelize.TEXT }, // 'Personality Traits'
  ideals:            { type: Sequelize.TEXT }, // 'Ideals'
  bonds:             { type: Sequelize.TEXT }, // 'Bonds'
  flaws:             { type: Sequelize.TEXT }, // 'Flaws'
  languages:         { type: Sequelize.ARRAY(Sequelize.TEXT) }, // array of language names -- allows for custom
  allies:            { type: Sequelize.TEXT }, // Allies & Organizations
  treasure:          { type: Sequelize.TEXT }, // Treasure
  backstory:         { type: Sequelize.TEXT }, // Character Backstory
  more_features:     { type: Sequelize.TEXT }, // Additional Features & Traits
  platinum:          { type: Sequelize.TEXT },
  gold:              { type: Sequelize.TEXT },
  electrum:          { type: Sequelize.TEXT },
  silver:            { type: Sequelize.TEXT },
  copper:            { type: Sequelize.TEXT },
  proficiencies:     { type: Sequelize.ARRAY(Sequelize.TEXT) }, // array of proficiency names -- allows for custom
  spells:            { type: Sequelize.ARRAY(Sequelize.JSON) }, // [{ id: 1, spells: [{ id: 3, prepared: true }], slots: 3, slots_used: 1 }]
  spell_class:       { type: Sequelize.TEXT }, // 'Spellcasting Class'
  spell_ability:     { type: Sequelize.TEXT }, // 'Spellcasting Ability'
  spell_save_dc:     { type: Sequelize.TEXT },
  spell_atk_bonus:   { type: Sequelize.TEXT },
  userid:            {
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

const Characters = db.define('characters', attributes, table_config);

module.exports = Characters;
