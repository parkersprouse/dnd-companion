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

/*
// characters endpoints
router.get('/recipe/:id', recipes.getRecipe);
router.get('/recipe/user/:id', recipes.getUserRecipes);
router.get('/recipe/user/:id/:page/:amount', recipes.getPaginatedUserRecipes);
router.post('/recipe/add', recipes.addRecipe);
router.patch('/recipe/update', recipes.updateRecipe);
router.post('/recipe/search', recipes.searchRecipes);
router.delete('/recipe/delete/:id', recipes.deleteRecipe);
*/

//require('./config/setup')();
// const mailer = require('./config/mailer');
// mailer({
//   subject: "Hello",
//   content: "How is this working?",
//   addresses: ['parker@parkersprouse.me']
// }, (success) => { console.log(success) });

module.exports = router;
