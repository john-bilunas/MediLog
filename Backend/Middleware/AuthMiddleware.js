require('dotenv').config();
const jwt = require('jsonwebtoken');
const authMiddleware = {};
const {User} = require('../config/db');

//Once the user has been authenticated, set the JWT
authMiddleware.setJWT = (req, res, next) => {

    

}




authMiddleware.signJWT = (req, res, next) => {

    try{
        const user = {
            _id: res.locals._id,
            username: res.locals.username
         }

         //sign the jwt
         const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '24h'});
         res.json({ accessToken:accessToken });


    }catch(err){

    }
}

authMiddleware.validateJWT = (req, res, next) => {

    //get the authorizations header
    const authorizationHeader = req.headers['authorization'];
    //if there is an authorization header, get the token from it (this removes the word bearer)
    const token = authorizationHeader && authorizationHeader.split(' ')[1];

    if(token === null) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err) return res.sendStatus(403);
        req.user = user;
        next();
    })
    try{



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