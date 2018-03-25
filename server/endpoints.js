// eslint-disable-next-line
'use strict';

const router = require('express').Router();

const auth = require('./endpoints/auth');
const misc = require('./endpoints/misc');
const characters = require('./endpoints/characters');
const users = require('./endpoints/users');

// auth endpoints
router.post('/auth/login', auth.login);
router.post('/auth/register', auth.register);

// misc endpoints
router.post('/misc/verifyauthtoken', misc.verifyAuthToken);
router.post('/misc/verifyresetkey', misc.verifyResetKey);
router.post('/misc/sendrecoveryemail', misc.sendRecoveryEmail);

// user endpoints
router.get('/users', users.getUsers);
router.post('/users', users.getUserBy);
router.patch('/users/update', users.updateUser);
router.patch('/users/updatepw', users.updateUserPassword);

// characters endpoints
router.get('/characters', characters.getCharacters);
router.post('/characters', characters.getCharacterBy);
router.post('/characters/new', characters.createCharacter);
router.patch('/characters/update', characters.updateCharacter);
router.delete('/characters/delete/:id', characters.deleteCharacter);

// 5e database endpoints
const ability_scores = require('./endpoints/db/ability_scores');
router.get('/db/ability_scores', ability_scores.getAll);
router.post('/db/ability_scores', ability_scores.getSpecific);

const classes = require('./endpoints/db/classes');
router.get('/db/classes', classes.getAll);
router.post('/db/classes', classes.getSpecific);

const conditions = require('./endpoints/db/conditions');
router.get('/db/conditions', conditions.getAll);
router.post('/db/conditions', conditions.getSpecific);

const damage_types = require('./endpoints/db/damage_types');
router.get('/db/damage_types', damage_types.getAll);
router.post('/db/damage_types', damage_types.getSpecific);

const equipment_categories = require('./endpoints/db/equipment_categories');
router.get('/db/equipment_categories', equipment_categories.getAll);
router.post('/db/equipment_categories', equipment_categories.getSpecific);

const equipment = require('./endpoints/db/equipment');
router.get('/db/equipment', equipment.getAll);
router.post('/db/equipment', equipment.getSpecific);

const features = require('./endpoints/db/features');
router.get('/db/features', features.getAll);
router.post('/db/features', features.getSpecific);

const languages = require('./endpoints/db/languages');
router.get('/db/languages', languages.getAll);
router.post('/db/languages', languages.getSpecific);

const levels = require('./endpoints/db/levels');
router.get('/db/levels', levels.getAll);
router.post('/db/levels', levels.getSpecific);

const magic_schools = require('./endpoints/db/magic_schools');
router.get('/db/magic_schools', magic_schools.getAll);
router.post('/db/magic_schools', magic_schools.getSpecific);

const monsters = require('./endpoints/db/monsters');
router.get('/db/monsters', monsters.getAll);
router.post('/db/monsters', monsters.getSpecific);

const proficiencies = require('./endpoints/db/proficiencies');
router.get('/db/proficiencies', proficiencies.getAll);
router.post('/db/proficiencies', proficiencies.getSpecific);

const races = require('./endpoints/db/races');
router.get('/db/races', races.getAll);
router.post('/db/races', races.getSpecific);

const skills = require('./endpoints/db/skills');
router.get('/db/skills', skills.getAll);
router.post('/db/skills', skills.getSpecific);

const spellcasting = require('./endpoints/db/spellcasting');
router.get('/db/spellcasting', spellcasting.getAll);
router.post('/db/spellcasting', spellcasting.getSpecific);

const spells = require('./endpoints/db/spells');
router.get('/db/spells', spells.getAll);
router.post('/db/spells', spells.getSpecific);

const starting_equipment = require('./endpoints/db/starting_equipment');
router.get('/db/starting_equipment', starting_equipment.getAll);
router.post('/db/starting_equipment', starting_equipment.getSpecific);

const subclasses = require('./endpoints/db/subclasses');
router.get('/db/subclasses', subclasses.getAll);
router.post('/db/subclasses', subclasses.getSpecific);

const subraces = require('./endpoints/db/subraces');
router.get('/db/subraces', subraces.getAll);
router.post('/db/subraces', subraces.getSpecific);

const traits = require('./endpoints/db/traits');
router.get('/db/traits', traits.getAll);
router.post('/db/traits', traits.getSpecific);

const trinkets = require('./endpoints/db/trinkets');
router.get('/db/trinkets', trinkets.getAll);
router.post('/db/trinkets', trinkets.getSpecific);

const weapon_properties = require('./endpoints/db/weapon_properties');
router.get('/db/weapon_properties', weapon_properties.getAll);
router.post('/db/weapon_properties', weapon_properties.getSpecific);


//require('./config/setup')();
// const mailer = require('./config/mailer');
// mailer({
//   subject: "Hello",
//   content: "How is this working?",
//   addresses: ['parker@parkersprouse.me']
// }, (success) => { console.log(success) });

module.exports = router;
