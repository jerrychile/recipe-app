const express = require('express');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');


const router = express.Router();

router.route('/signup').post(authController.signUp); // creates new user
router.route('/login').post(authController.login); // creates new user
router.route('/logout').get(authController.logout);


router.route('/')
.get(userController.getAllUsers)
.post(userController.createUser);

module.exports = router;