

const User = require('../Models/UserModel');



const userController = {};

userController.getUserInfo = async (req, res, next) => {

    try{
        const {_id} = req.user;

        const userInfo = await User.findById(_id).populate(
            {
                path: 'patients',
                populate: {
                    path: 'medications'
                }
            });
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



module.exports = userController;