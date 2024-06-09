
const Patient = require('../Models/PatientModel');
const User = require('../Models/UserModel');
const Medication = require('../Models/MedicationModel')
const patientController = {};



//input: firstname, lastname
//output: send patient in a response
//this creates a patient and add's it to the users profile
patientController.createPatient = async (req, res, next) => {

    try{
        //destructure name of the patient, and the _id from req.user
        const {firstname, lastname} = req.body;
        const {_id} = req.user;
        
        //get the users document
        const user = await User.findById(_id).exec();
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
        await user.save();
        //respond to client
        res.status(200).json(savedPatient)
    }catch(err){
        next(err)
    }


};




patientController.addLogToPatient = async (req,res,next) => {

}

patientController.deletePatient = async (req, res, next) => {


    try{

        const userInfo = await User.findById(req.user._id).populate({
            path: 'patients',
            populate: {
                path: 'medications'
            }
        }).exec();
        // console.log('userInfo id : ', userInfo._id.toString());
        // console.log('userInfo: ', userInfo);
        if(!userInfo){
            const error = new Error('User not found');
            error.statusCode = (400);
            throw error;
        }
        //get patient Id
        const {patientId} = req.body;

        //get medicaiton info from the patient
        let patientToDelete;
        for(let i = 0; i < userInfo.patients.length; i++){
            if(userInfo.patients[i]._id.toString() === patientId){
                patientToDelete = userInfo.patients[i];
            }
        }
        //Handle error if patient does not exist for user
        if(!patientToDelete){
            const error = new Error('Patient does not exist for user.');
            error.statusCode = 400;
            throw error;
        }
        //generate an array of all of the meds for the patient
        const medsToDelete = [];
        for(let i = 0; i < patientToDelete.medications.length; i++){
            medsToDelete.push(patientToDelete.medications[i]._id.toString())
        }

        //delete meds
        await Medication.deleteMany( { "_id" : { "$in": medsToDelete}});
        
        //delete patient
        await Patient.deleteOne({"_id": patientId})


        res.json({"Success": "Patient and their medications have been deleted."});
    }catch(err){
        next(err)
    }
}


module.exports = patientController;