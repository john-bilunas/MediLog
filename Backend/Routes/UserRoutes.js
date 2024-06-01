const express = require('express');
const router = express.Router();
const userController = require('../Controllers/UserController');
const authMiddleware = require('../Middleware/AuthMiddleware');


//get all users
router.get('/', authMiddleware.validateJWT, userController.getUserInfo, (req,res) => {

});

//get one user
router.get('/:userId', (req,res) => {

});

//create a user
router.put('/', (req,res) => {

});

//update a user (overwrite)
router.put('/:userId', (req,res) => {

});

//update a user (certain properties)
router.patch('/:userId', (req,res) => {

});

//delete a user
router.delete('/:userId', (req,res) => {

});



module.exports = router;