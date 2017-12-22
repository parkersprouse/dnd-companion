// eslint-disable-next-line
'use strict';

const router = require('express').Router();

//const auth = require('./endpoints/auth');
//const misc = require('./endpoints/misc');
//const recipes = require('./endpoints/recipes');
//const users = require('./endpoints/users');

// auth endpoints
//router.post('/auth/login', auth.login);
//router.post('/auth/register', auth.register);

// misc endpoints
//router.post('/misc/verifyauthtoken', misc.verifyAuthToken);

/*
// recipe endpoints
router.get('/recipe/:id', recipes.getRecipe);
router.get('/recipe/user/:id', recipes.getUserRecipes);
router.get('/recipe/user/:id/:page/:amount', recipes.getPaginatedUserRecipes);
router.post('/recipe/add', recipes.addRecipe);
router.patch('/recipe/update', recipes.updateRecipe);
router.post('/recipe/search', recipes.searchRecipes);
router.delete('/recipe/delete/:id', recipes.deleteRecipe);

// user endpoints
router.get('/users', users.getUsers);
router.get('/users/id/:id', users.getUserByID);
router.get('/users/email/:email/', users.getUserByEmail);
router.patch('/users/update', users.updateUser);
router.patch('/users/updatepw', users.updateUserPassword);
*/

const Users = require('./models/users');
//Users.sync({ force: true })
// Users.findOne({ where: { username: {$iLike: 'PSPROUSE'} } })
//   .then(user => {
//     console.log(user);
//   }).catch(error => {
//     console.log(error);
//   });
// Users.create({ username: 'PSPROUSE', email: 'parker.sprouse2@gmail.com', pw_hash: 'asd' })
//   .then(user => {
//     console.log(user);
//   })
//   .catch(error => {
//     console.log('err')
//     console.log(error);
//   });

module.exports = router;
