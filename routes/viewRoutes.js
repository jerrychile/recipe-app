const express = require('express');
const viewsController = require('../controllers/viewsController');
const authController = require('../controllers/authController');

const router = express.Router();

router.get('/',(req,res)=>{
    res.status(200).render('base', {
        user: 'Ash',
        recipe: 'Pizza'
    });
});

router.get('/getallrecipes', viewsController.getAllRecipes);
router.get('/recipe/:id', authController.protect, viewsController.getRecipe);
router.get('/login', viewsController.getLoginForm);
router.get('/register', viewsController.getRegisterForm);
router.get('/myrecipes', viewsController.getMyRecipes);
router.get('/createrecipe',viewsController.createRecipe);
router.get('/allrecipes/:id', viewsController.allRecipes);

module.exports = router;