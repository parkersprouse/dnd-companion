// eslint-disable-next-line
'use strict';

const router = require('express').Router();

const auth = require('./endpoints/auth');
const misc = require('./endpoints/misc');
const recipes = require('./endpoints/characters');
const users = require('./endpoints/users');

// auth endpoints
router.post('/auth/login', auth.login);
router.post('/auth/register', auth.register);

// misc endpoints
router.post('/misc/verifyauthtoken', misc.verifyAuthToken);

// user endpoints
router.get('/users', users.getUsers);
router.post('/users', users.getUserBy);
router.patch('/users/update', users.updateUser);
// router.patch('/users/updatepw', users.updateUserPassword);

// 5e database endpoints
const ability_scores = require('./endpoints/db/ability-scores');
router.get('/db/ability_scores', ability_scores.getAll);
router.get('/db/ability_scores/:id', ability_scores.getSingle);

const classes = require('./endpoints/db/classes');
router.get('/db/classes', classes.getAll);
router.get('/db/classes/:id', classes.getSingle);

const conditions = require('./endpoints/db/conditions');
router.get('/db/conditions', conditions.getAll);
router.get('/db/conditions/:id', conditions.getSingle);

const damage_types = require('./endpoints/db/damage_types');
router.get('/db/damage_types', damage_types.getAll);
router.get('/db/damage_types/:id', damage_types.getSingle);

const equipment_categories = require('./endpoints/db/equipment_categories');
router.get('/db/equipment_categories', equipment_categories.getAll);
router.get('/db/equipment_categories/:id', equipment_categories.getSingle);

const equipment = require('./endpoints/db/equipment');
router.get('/db/equipment', equipment.getAll);
router.get('/db/equipment/:id', equipment.getSingle);

const features = require('./endpoints/db/features');
router.get('/db/features', features.getAll);
router.get('/db/features/:id', features.getSingle);

const languages = require('./endpoints/db/languages');
router.get('/db/languages', languages.getAll);
router.get('/db/languages/:id', languages.getSingle);

const levels = require('./endpoints/db/levels');
router.get('/db/levels', levels.getAll);
router.get('/db/levels/:id', levels.getSingle);

const magic_schools = require('./endpoints/db/magic_schools');
router.get('/db/magic_schools', magic_schools.getAll);
router.get('/db/magic_schools/:id', magic_schools.getSingle);

const monsters = require('./endpoints/db/monsters');
router.get('/db/monsters', monsters.getAll);
router.get('/db/monsters/:id', monsters.getSingle);

const proficiencies = require('./endpoints/db/proficiencies');
router.get('/db/proficiencies', proficiencies.getAll);
router.get('/db/proficiencies/:id', proficiencies.getSingle);

const races = require('./endpoints/db/races');
router.get('/db/races', races.getAll);
router.get('/db/races/:id', races.getSingle);

const skills = require('./endpoints/db/skills');
router.get('/db/skills', skills.getAll);
router.get('/db/skills/:id', skills.getSingle);

const spellcasting = require('./endpoints/db/spellcasting');
router.get('/db/spellcasting', spellcasting.getAll);
router.get('/db/spellcasting/:id', spellcasting.getSingle);

const spells = require('./endpoints/db/spells');
router.get('/db/spells', spells.getAll);
router.get('/db/spells/:id', spells.getSingle);

const starting_equipment = require('./endpoints/db/starting_equipment');
router.get('/db/starting_equipment', starting_equipment.getAll);
router.get('/db/starting_equipment/:id', starting_equipment.getSingle);

const subclasses = require('./endpoints/db/subclasses');
router.get('/db/subclasses', subclasses.getAll);
router.get('/db/subclasses/:id', subclasses.getSingle);

const subraces = require('./endpoints/db/subraces');
router.get('/db/subraces', subraces.getAll);
router.get('/db/subraces/:id', subraces.getSingle);

const traits = require('./endpoints/db/traits');
router.get('/db/traits', traits.getAll);
router.get('/db/traits/:id', traits.getSingle);

const weapon_properties = require('./endpoints/db/weapon_properties');
router.get('/db/weapon_properties', weapon_properties.getAll);
router.get('/db/weapon_properties/:id', weapon_properties.getSingle);


//require('./config/setup')();
// const mailer = require('./config/mailer');
// mailer({
//   subject: "Hello",
//   content: "How is this working?",
//   addresses: ['parker@parkersprouse.me']
// }, (success) => { console.log(success) });

module.exports = router;
