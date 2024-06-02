

const User = require('../Models/UserModel');



const userController = {};

//return all user information (besides password) to the user
userController.getUserInfo = async (req, res, next) => {

    try{
        const {_id} = req.user;

        const userInfo = await User.findById(_id).populate(
            {
                path: 'patients',
                populate: {
                    path: 'medications'
                }
            }).select('-password').exec();
        if(!userInfo){
            const error = new Error('Error getting user informatio.');
            error.statusCode = 404;
            throw error;
        }



        res.status(200).json(userInfo);
    }catch(err){
        next(err)
    }

}

userController.updateUserInfo = async (req, res, next) => {

    //use to validate properties sent by client
    const validProperties = {
        firstname: true, 
        lastname: true,
        username: true,
        email: true,
        phone: true
    }

    try{
        const {_id} = req.user;
        // get mongoose document for user
        const userInfo = await User.findById(_id);
        // error handling if user doesn't exist
        if(!userInfo){
            const error = new Error("User doesn't exist");
            error.statusCode = 400;
            throw error;
        }
        //if key is valid, change the property in the mongoose doc
        for(const [key, value] of Object.entries(req.body)){
            if(validProperties[key] === true){
                userInfo[key] = value;
            }
        }
        //save the doc.
        await userInfo.save();
        next()
    }catch(err){
        next(err)
    }
    






}


userController.getAllUsers = async (req, res, next) => {

    try{
        //maybe add a field named public to each user if they would like to be searchable?

        //do not return any sensitive information
        const usersInfo = await User.find().select('-password -patients').exec();
        if(!usersInfo){
            const error = new Error('Error getting users information.');
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json(usersInfo);
    }catch(err){
        next(err)
    }

}



module.exports = userController;