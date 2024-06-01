

const User = require('../Models/UserModel');



const userController = {};

userController.getUserInfo = async (req, res, next) => {

    try{
        const {_id} = req.user;

        const userInfo = await findById(_id);
        if(!userInfo){
            const error = new Error('Error getting user information');
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json(userInfo);
    }catch(err){
        next(err)
    }

}



module.exports = userController;