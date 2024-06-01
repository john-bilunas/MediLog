const express = require('express');
const router = express.Router();
const userController = require('../Controllers/UserController');
const authMiddleware = require('../Middleware/AuthMiddleware');



//get one user
router.get('/all', (req,res) => {

});

/*
This is to retrieve all information other than password for the logged in user. The _id will be taken from the JWT, so there is no need to make this parametized.

input: nothing
output: all user information other than password.

*/
router.get('/', authMiddleware.validateJWT, userController.getUserInfo, (req,res) => {

});



//update a user (overwrite)
router.put('/:userId', (req,res) => {

});


//delete a user
router.delete('/:userId', (req,res) => {

});



module.exports = router;