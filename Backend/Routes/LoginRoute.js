const express = require('express');
const router = express.Router();
const authMiddleware = require('../Middleware/AuthMiddleware');
const authController = require('../Controllers/AuthController');
/*
body{
    username
    password
}

*/

router.post('/', authController.login, authMiddleware.signJWT,(req, res) => {


})
router.post('/verifyJWT',authMiddleware.validateJWT, (req,res) => {

    res.statusCode(200).json({"valid": true})
} );
module.exports = router;