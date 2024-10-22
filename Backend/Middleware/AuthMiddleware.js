require('dotenv').config();
const jwt = require('jsonwebtoken');
const authMiddleware = {};
const {User} = require('../config/db');






authMiddleware.signJWT = (req, res, next) => {

    try{
        const user = {
            _id: res.locals._id,
            username: res.locals.username
         }

         //sign the jwt
         const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)//, { expiresIn: '24h'}); // temporarily remove this while testing
         res.json({ accessToken:accessToken, name: res.locals.name, username: res.locals.username, id: res.locals._id });


    }catch(err){

    }
}

authMiddleware.validateJWT = (req, res, next) => {

   
    try{
 //get the authorizations header
    const authorizationHeader = req.headers['authorization'];
    console.log('authorizationHeader', authorizationHeader)
    //if there is an authorization header, get the token from it (this removes the word bearer)
    const token = authorizationHeader && authorizationHeader.split(' ')[1];
        console.log('authorizationHeader', authorizationHeader)
    if(token === null) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err) return res.sendStatus(403);
        req.user = user;
        next();
    })


    }catch(err){
        console.error(err)
        next(err);

    }
}


//Global Error Handler
authMiddleware.globalErrorHandler = (err, req, res, next) => {
    console.error(err);

    const statusCode = err.statusCode || 500;
    const errorMessage = err.message || 'Internal Server Error';
  
    res.status(statusCode).json({
      error: true,
      message: errorMessage
    });
}
    


module.exports = authMiddleware;