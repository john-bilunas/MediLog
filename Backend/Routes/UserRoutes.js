const express = require('express');
const router = express.Router();
const userController = require('../Controllers/UserController');
const authMiddleware = require('../Middleware/AuthMiddleware');



/* 
    -Get all users from the data base (possibly add a field in the users collection to allow for public/private profiles)
    -input: none
    -output: an array of all users without their profile and patients fields
*/

router.get('/all',authMiddleware.validateJWT, userController.getAllUsers, (req,res) => {
//adding verifyJWT to ensure that the user is logged in
});

/*
    -This is to retrieve all information other than password for the logged in user. The _id will be taken from the JWT, so there is no need to make this parametized.
    -input: none
    -output: all user information other than password.
*/
router.get('/', authMiddleware.validateJWT, userController.getUserInfo, (req,res) => {

});

/*
    -Updating any information for a user that is NOT.. 
        -password
        -patient information (this should be done through the PUT /patients route)
        -medication information (this should be done through the PUT /medication route)
        - _id, __v
    - input: an object with any field names, and values that you would like to change to from...
    {
        firstname,
        lastname,
        username,
        email,
        phone
    }
    - output: all user information other than password.
*/
router.put('/', authMiddleware.validateJWT, userController.updateUserInfo, userController.getUserInfo,(req,res) => {

});

/*
    This will delete the user from the database.
    Before this route can be complete, we need to delete all of the medications, and then the patients
    -input: nothing
    -output: success message

*/

//delete a user
router.delete('/',authMiddleware.validateJWT,userController.deleteUser, (req,res) => {


});



module.exports = router;