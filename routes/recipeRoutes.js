const express = require('express');
const recipeController = require('./../controllers/recipeController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.route('/')
.get(authController.protect, recipeController.getAllRecipes)
.post(authController.protect, recipeController.createRecipe);

router.route('/:id')
.get(recipeController.getRecipe)
.delete(recipeController.deleteRecipe)
.patch(recipeController.updateRecipe);

module.exports = router;
