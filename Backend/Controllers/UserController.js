
const mongoose = require('mongoose');
const User = require('../Models/UserModel');
const Patient = require('../Models/PatientModel');
const Medication = require('../Models/MedicationModel')



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

userController.deleteUser = async (req, res, next) => {

    //create a session and start a transaction
    // const session =  await mongoose.startSession();
    // session.startTransaction();

    try{

        //get user
        const userInfo = await User.findById(req.user._id).populate({
            path: 'patients',
            populate: {
                path: 'medications'
            }
        }).exec();
        if(!userInfo){
            const error = new Error('User not found');
            error.statusCode = (400);
            throw error;
        }
        //iterate through all patients
        const patientSet = new Set();
        const medicationSet = new Set();
        userInfo.patients.map((el) => {
            patientSet.add(el._id.toString());
            // console.log(el.medications)
            if(el.medications){
               for(let i = 0; i < el.medications.length; i++){
                medicationSet.add(el.medications[i]._id.toString());
            } 
            }
            
        });
        
        patientsArray = [...patientSet];
        medicationsArray = [...medicationSet];

        console.log(patientsArray)
        console.log(medicationsArray)

        const deletedMeds = await Medication.deleteMany({ "_id": {"$in": medicationsArray}});
        const deletedPatients = await Patient.deleteMany({ "_id": {"$in": patientsArray}});
        const deletedUser = await User.deleteOne({"_id": req.user._id});

        res.json({"Success": "User and all referenced patients and their medications have all been deleted."});
    }catch(err){
        next(err)
    }finally{
        
    }

    




}



module.exports = userController;