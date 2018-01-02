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


//require('./config/setup')();
// const mailer = require('./config/mailer');
// mailer({
//   subject: "Hello",
//   content: "How is this working?",
//   addresses: ['parker@parkersprouse.me']
// }, (success) => { console.log(success) });

module.exports = router;
