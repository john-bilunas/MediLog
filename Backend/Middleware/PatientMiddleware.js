const User = require('../Models/UserModel');
const Patient = require('../Models/PatientModel');
const patientMiddleware = {};


//input: body{ patientId}, req.user from validation
patientMiddleware.verifyPatientOfUser = async (req, res, next) => {

    try{

        //pull patientId off of body
        const {patientId} = req.body;

        //get user id
        const userId = req.user._id;
        if(!userId){
            const error = new Error('User cannot be found');
            error.statusCode = 404;
        }
        //get user mongoose doc
        const user = await User.findById(userId);

        //check if the patientId exists in the users patients array
        if(user.patients.includes(patientId)){
            //grant access to altering patient document
            return next()
        }else{
            const error = new Error('You do not have access to alter patient data.');
            error.statusCode = 404;
            throw error;
        }
    }catch(err){
        next(err)
    }


}

module.exports = patientMiddleware;