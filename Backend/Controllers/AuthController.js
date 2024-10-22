require('dotenv').config();
const bcrypt = require('bcrypt');
const authController = {};
const User = require('../Models/UserModel');


//going to want to make sure that email and username are indexed for signups?
authController.signup = async(req, res, next) => {

    try{
        const {firstname,lastname,password,email,phone} = req.body;
        let {username} = req.body
        //create hashed password using bcrypts hash function
        const hash = await bcrypt.hash(password, 11);
        username = username.toLowerCase();
        
        //check if username  and email address already exists in users
        const userExists = await User.findOne({username: username});
        if(userExists !== null){
            // res.status(409).json({ message: 'Username is in use. Please choose another one.' });
            const error = new Error('Username is in use. Please choose another one.');
            error.statusCode = 409;
            throw error;
            return;
        }

        const emailInUse = await User.findOne({email: email});
        if(emailInUse !== null){
            // res.status(409).json({ message: 'Email address is in use. Please choose another one.' });
            const error = new Error('Email address is in use. Please choose another one.');
            error.statusCode = 409;
            throw error;
            return;
        }

        //create user in database with information in the body (and password will be hashed)
        const userInfo = await User.create({firstname,lastname,password: hash,username: username,email,phone});
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

        const loginErrorMessage = 'Invalid login credentials.';
        const {password} = req.body;
        let{username} = req.body;
        username = username.toLowerCase();
        //find user in the database and get hashed password
        const userInfo = await User.findOne({username}).exec();
        console.log(password,username)
        if(!userInfo){
            const error = new Error(loginErrorMessage);
            error.statusCode = 401;
            throw error;
        }
        //save _id and username to res.locals for the jwt
        res.locals._id = userInfo._id;
        res.locals.username = userInfo.username;
        res.locals.name = userInfo.firstname + " " + userInfo.lastname;
        
        //use bcrypt's compare function to check if the password matches the database
        const isPassword = await bcrypt.compare(password, userInfo.password);
        //
        if(!userInfo || isPassword){
            return next();
        }else{
           const error = new Error(loginErrorMessage);
           error.statusCode = 401;
           throw error;
           return;

        }
    }catch(err){
        next(err);
    }

}





module.exports = authController;