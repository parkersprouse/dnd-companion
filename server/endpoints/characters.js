const constants = require('../config/constants');
const db = require('../config/db').db;
const validator = require('validator');
const _ = require('lodash');
const Characters = require('../models/characters');

function getCharacters(req, res, next) {
  Characters.findAll()
    .then((data) => {
      const chars = [];
      data.forEach((char) => chars.push(char.get({ plain: true })));
      res.status(constants.http_ok)
        .json({
          status: 'success',
          content: chars,
          message: 'Got all characters'
        });
    })
    .catch((err) => {
      res.status(constants.http_bad_request)
        .json({
          status: 'failure',
          content: err.message,
          message: 'Failed to get all characters'
        });
    });
}

function getCharacterBy(req, res, next) {
  const attr = Object.keys(req.body)[0];
  const value = typeof req.body[attr] === 'number' ? req.body[attr] : { $iLike: req.body[attr] };
  Characters.findAll({ where: { [attr]: value } })
    .then((data) => {
      if (!data || data.length === 0)
        res.status(constants.http_not_found)
          .json({
            status: 'failure',
            message: 'Character not found'
          });
      else {
        const chars = [];
        data.forEach((char) => chars.push(char.get({ plain: true })));
        res.status(constants.http_ok)
          .json({
            status: 'success',
            content: chars,
            message: 'Got character'
          });
      }
    })
    .catch((err) => {
      res.status(constants.http_bad_request)
        .json({
          status: 'failure',
          content: err.message,
          message: 'Failed to get character'
        });
    });
}

function createCharacter(req, res, next) {
  if (!req.body.name)
    res.status(constants.http_bad_request)
      .json({
        status: 'failure',
        message: 'Please make sure your character has a name'
      });
  else
    Characters.create(req.body)
      .then((data) => {
        res.status(constants.http_ok)
          .json({
            status: 'success',
            content: data,
            message: 'Character created'
          });
      })
      .catch((err) => {
        res.status(constants.http_bad_request)
          .json({
            status: 'failure',
            content: err.message,
            message: 'There was an unknown problem when trying to create your character'
          });
      });
}

function updateCharacter(req, res, next) {
  Characters.update(req.body, { where: { id: req.body.id }, returning: true })
    .then((data) => {
      if (!data[0]) {
        res.status(constants.http_bad_request)
          .json({
            status: 'failure',
            content: data[0],
            message: 'No character updated, check provided ID'
          });
      }
      else {
        // data[0] is the number of rows affected
        // data[1] is the array containing the returned rows
        // data[1][0] is the first character that was returned
        // data[1][0].dataValues is the object containing the values of the returned row
        res.status(constants.http_ok)
          .json({
            status: 'success',
            content: data[1][0].dataValues,
            message: 'Updated character'
          });
      }
    })
    .catch((err) => {
      res.status(constants.http_bad_request)
        .json({
          status: 'failure',
          content: err.message,
          message: 'There was a problem when updating your character'
        });
    });
}

function deleteCharacter(req, res, next) {
  Characters.destroy({ where: { id: req.params.id } })
    .then((data) => {
      if (data < 1) {
        res.status(constants.http_bad_request)
          .json({
            status: 'failure',
            message: 'No character deleted, check provided ID'
          });
      }
      else {
        res.status(constants.http_ok)
          .json({
            status: 'success',
            message: 'Deleted character'
          });
      }
    })
    .catch((err) => {
      res.status(constants.http_bad_request)
        .json({
          status: 'failure',
          content: err.message,
          message: 'There was a problem when deleting your character'
        });
    });
}

module.exports = {
  getCharacters,
  getCharacterBy,
  createCharacter,
  updateCharacter,
  deleteCharacter
}


// const constants = require('../constants');
// const db = require('../db').db;
// const validator = require('validator');
// const _ = require('lodash');
//
//
// // private functions
//
// function addOrUpdateRecipe(func, req, res, next) {
//   const title = req.body.title;
//   const description = req.body.description || null;
//   const prepTime = req.body.prepTime || null;
//   const cookTime = req.body.cookTime || null;
//   const servingSize = req.body.servingSize || null;
//   const ingredients = req.body.ingredients;
//   const steps = req.body.steps;
//   const id = req.body.id;
//   const private = req.body.private;
//   const notes = req.body.notes || null;
//   const date = req.body.date;
//
//   let titleEmpty = !title || validator.isEmpty(title);
//   let ingredientsEmpty = !ingredients || _.isEmpty(ingredients);
//   let stepsEmpty = !steps || _.isEmpty(steps);
//
//   let stepsState = [];
//   let ingredientsState = [];
//
//   for (let i = 0; i < steps.length; i++) {
//     if (!steps[i] || validator.isEmpty(steps[i]) || validator.blacklist(steps[i], "\n ").length < 1) {
//       stepsState.push(false);
//       stepsEmpty = true;
//     }
//     else {
//       stepsState.push(true);
//     }
//   }
//
//   for (var i in ingredients) {
//     if (ingredients.hasOwnProperty(i)) {
//       const ing = ingredients[i];
//       const nameEmpty = !ing.name || validator.isEmpty(ing.name) || validator.blacklist(ing.name, "\n ").length < 1;
//       const measurementEmpty = !ing.measurement || validator.isEmpty(ing.measurement);
//       const amountEmpty = !ing.amount || validator.isEmpty(ing.amount) || validator.blacklist(ing.amount, "\n ").length < 1;
//       if (nameEmpty || measurementEmpty || amountEmpty) {
//         ingredientsState.push({
//           name: !nameEmpty,
//           measurement: !measurementEmpty,
//           amount: !amountEmpty
//         });
//         ingredientsEmpty = true;
//       }
//       else {
//         ingredientsState.push({name: true, measurement: true, amount: true});
//       }
//     }
//   }
//
//   if (titleEmpty || ingredientsEmpty || stepsEmpty) {
//     res.status(constants.http_bad_request)
//       .json({
//         status: 'failure',
//         content: {
//           titleState: !titleEmpty,
//           ingredientsState: ingredientsState,
//           stepsState: stepsState
//         },
//         message: 'Please make sure all required fields are filled out'
//       });
//   }
//   else {
//     const data = {
//       title: title,
//       description: description,
//       prepTime: prepTime,
//       cookTime: cookTime,
//       servingSize: servingSize,
//       ingredients: ingredients,
//       steps: steps,
//       id: id,
//       private: private,
//       notes: notes,
//       date: date
//     };
//
//     let query = 'insert into recipes ' +
//                 '(title, description, ingredients, steps, user_id, private, notes, date, prep_time, cook_time, serving_size) ' +
//                 'values (${title}, ${description}, ${ingredients}, ${steps}, ${id}, ${private}, ${notes}, ${date}, ${prepTime}, ${cookTime}, ${servingSize}) ' +
//                 'returning *';
//
//     if (func === 'update') {
//       query = 'update recipes set ' +
//               'title = ${title}, description = ${description}, ingredients = ${ingredients}, ' +
//               'steps = ${steps}, private = ${private}, notes = ${notes}, prep_time = ${prepTime}, ' +
//               'cook_time = ${cookTime}, serving_size = ${servingSize} where id = ${id} returning *';
//     }
//
//     db.one(query, data)
//       .then(function (data) {
//         res.status(constants.http_ok)
//           .json({
//             status: 'success',
//             content: data
//           });
//       })
//       .catch(function (err) {
//         console.log(err);
//         res.status(constants.http_bad_request)
//           .json({
//             status: 'failure',
//             content: {
//               titleState: true,
//               ingredientsState: true,
//               stepsState: true,
//               err: err
//             },
//             message: 'There was an unknown problem when attempting to ' + func + ' the recipe'
//           });
//       });
//   }
// }
//
//
// // public functions
//
// function getRecipe(req, res, next) {
//   db.one('select * from recipes where id = $1', req.params.id)
//     .then(function (data) {
//       res.status(constants.http_ok)
//         .json({
//           status: 'success',
//           content: data,
//           message: 'Found recipe'
//         });
//     })
//     .catch(function (err) {
//       if (err instanceof constants.db_query_result_error &&
//           err.code === constants.db_err_no_result) {
//         res.status(constants.http_no_content)
//           .json({
//             status: 'failure',
//             content: err,
//             message: 'Recipe not found'
//           });
//       }
//       else {
//         res.status(constants.http_server_error)
//           .json({
//             status: 'failure',
//             content: err,
//             message: 'There was an unknown problem when attempting to find the recipe'
//           });
//       }
//     });
// }
//
// function getUserRecipes(req, res, next) {
//   db.many('select * from recipes where user_id = $1', req.params.id)
//     .then(function (data) {
//       res.status(constants.http_ok)
//         .json({
//           status: 'success',
//           content: data,
//           message: 'Found recipes'
//         });
//     })
//     .catch(function (err) {
//       if (err instanceof constants.db_query_result_error &&
//           err.code === constants.db_err_no_result) {
//         res.status(constants.http_no_content)
//           .json({
//             status: 'failure',
//             content: err,
//             message: 'Recipes not found'
//           });
//       }
//       else {
//         res.status(constants.http_server_error)
//           .json({
//             status: 'failure',
//             content: err,
//             message: 'There was an unknown problem when attempting to find the recipes'
//           });
//       }
//     });
// }
//
// function getPaginatedUserRecipes(req, res, next) {
//   const data = {
//     id: req.params.id,
//     amount: req.params.amount
//   };
//   data.offset = (req.params.page - 1) * req.params.amount;
//
//   db.many('select * from recipes where user_id = ${id} order by id desc limit ${amount} offset ${offset}', data)
//     .then(function (data) {
//       res.status(constants.http_ok)
//         .json({
//           status: 'success',
//           content: data,
//           message: 'Found recipes'
//         });
//     })
//     .catch(function (err) {
//       if (err instanceof constants.db_query_result_error &&
//           err.code === constants.db_err_no_result) {
//         res.status(constants.http_no_content)
//           .json({
//             status: 'failure',
//             content: err,
//             message: 'Recipes not found'
//           });
//       }
//       else {
//         res.status(constants.http_server_error)
//           .json({
//             status: 'failure',
//             content: err,
//             message: 'There was an unknown problem when attempting to find the recipes'
//           });
//       }
//     });
// }
//
// function addRecipe(req, res, next) {
//   addOrUpdateRecipe('add', req, res, next);
// }
//
// function updateRecipe(req, res, next) {
//   addOrUpdateRecipe('update', req, res, next);
// }
//
// function searchRecipes(req, res, next) {
//   const queries = req.body.query.split(' ');
//   let searchQuery = "";
//   if (queries.length > 1) {
//     queries.forEach(function(string) {
//       searchQuery += "(title ilike '%" + string + "%' or description ilike '%" + string + "%') and ";
//     });
//     searchQuery = searchQuery.slice(0, -5);
//   }
//   else {
//     searchQuery = "(title ilike '%" + queries[0] + "%' or description ilike '%" + queries[0] + "%')";
//   }
//
//   let finalQuery = "select * from recipes where user_id = " + req.body.userid + " and " + searchQuery + " order by id";
//   if (req.body.paginate) {
//     const offset = (req.body.page - 1) * req.body.amount;
//     finalQuery += " limit " + req.body.amount + " offset " + offset;
//   }
//   db.many(finalQuery, {})
//     .then(function (data) {
//       res.status(constants.http_ok)
//         .json({
//           status: 'success',
//           content: data,
//           message: 'Found recipes'
//         });
//     })
//     .catch(function (err) {
//       console.log(err)
//       if (err instanceof constants.db_query_result_error &&
//           err.code === constants.db_err_no_result) {
//         res.status(constants.http_no_content)
//           .json({
//             status: 'failure',
//             content: err,
//             message: 'Recipes not found'
//           });
//       }
//       else {
//         res.status(constants.http_server_error)
//           .json({
//             status: 'failure',
//             content: err,
//             message: 'There was an unknown problem when attempting to find the recipes'
//           });
//       }
//     });
// }
//
// function deleteRecipe(req, res, next) {
//   db.none('delete from recipes where id = $1', req.params.id)
//     .then(function () {
//       res.status(constants.http_ok)
//         .json({
//           status: 'success',
//           message: 'Recipe deleted'
//         });
//     })
//     .catch(function (err) {
//       res.status(constants.http_server_error)
//         .json({
//           status: 'failure',
//           content: err,
//           message: 'There was an unknown problem when attempting to delete the recipe'
//         });
//     });
// }
//
// module.exports = {
//   getRecipe: getRecipe,
//   getUserRecipes: getUserRecipes,
//   getPaginatedUserRecipes: getPaginatedUserRecipes,
//   addRecipe: addRecipe,
//   updateRecipe: updateRecipe,
//   searchRecipes: searchRecipes,
//   deleteRecipe: deleteRecipe
// }
