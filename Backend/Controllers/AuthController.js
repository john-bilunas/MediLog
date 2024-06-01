require('dotenv').config();
const bcrypt = require('bcrypt');
const authController = {};
const User = require('../Models/UserModel');



authController.signup = async(req, res, next) => {

    try{
        const {firstname,lastname,password,username,patients,email,phone} = req.body;
        //create hashed password using bcrypts hash function
        const hash = await bcrypt.hash(password, 11);

        

        //create user in database with information in the body (and password will be hashed)
        const userInfo = await User.create({firstname,lastname,password: hash,username,patients,email,phone});
        // console.log(userInfo)
        //save _id and username to res.locals for the jwt
        res.locals._id = userInfo._id;
        res.locals.username = username;
        
        return next();
    }catch(err){
        console.error('Error creating a new user', err);
        next(err);
    }
}

//middleware to log in the user
authController.login  = async(req, res, next) => {
    try{
        const {password,username} = req.body;
        //find user in the database and get hashed password
        const userInfo = await User.findOne({username});
        // console.log('User info: ', userInfo)
        
        //save _id and username to res.locals for the jwt
        res.locals._id = userInfo._id;
        res.locals.username = userInfo.username;
        
        //use bcrypt's compare function to check if the password matches the database
        const isPassword = await bcrypt.compare(password, userInfo.password);
        //
        if(isPassword){
            return next();
        }else{
           const error = new Error('Invalid login credentials.');
           error.statusCode = 401;
           throw error;
           return;
        }
    }catch(err){
        console.error('Error authenticating user', err);
        next(err);
    }

}




module.exports = authController;