
const Patient = require('../Models/PatientModel');
const User = require('../Models/UserModel');
const patientController = {};



//input: firstname, lastname
//output: send patient in a response
patientController.createPatient = async (req, res, next) => {

    try{
        //destructure name of the patient, and the _id from req.user
        const {firstname, lastname} = req.body;
        const {_id} = req.user;
        
        //get the users document
        const user = await User.findById(_id);
        if(!user){
            const error = new Error('Error getting user information to add patient to.');
            error.statusCode = 404;
            throw error;
        }
        //create new patient        
        const newPatient = new Patient({
            firstname: firstname,
            lastname: lastname
        });
        //save the patient
        const savedPatient = await newPatient.save();

        //add the newly saved patient to the user.patients array
        user.patients.push(savedPatient._id);
        user.save();
    res.status(200).json(savedPatient)
    }catch(err){

    }


};

module.exports = patientController;