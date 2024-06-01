const express = require('express');
const router = express.Router();
const authMiddleware = require('../Middleware/AuthMiddleware');
const authController = require('../Controllers/AuthController');

/*
this is the most that should be sent to the db
body{
    firstname,
    lastname,
    password,
    username,
    patients,
    email,
    phone
}

*/

router.post('/', authController.signup, authMiddleware.signJWT, (req, res) => {
    

})

module.exports = router;