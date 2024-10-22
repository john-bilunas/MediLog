
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



patientController.getMedInfo = async (req,res,next) => {
    
    try{
        //get the patient that we are looking for
        const {patientId} = req.params;

        const data = await Patient.findById(patientId).populate({path: 'log.medication medications'});
        const copiedData = JSON.parse(JSON.stringify(data));
        console.log("copiedData",copiedData)
        //organize the data to send back
        const allLogs = copiedData.log;
        //convert all date strings to date objects
        console.log("all meds", copiedData.medications)
        console.log("all logs", allLogs)

        // res.json({logs: allLogs,medications: copiedData.medications})
        res.json({patientInfo: copiedData});
    }
    catch(err){
        console.error(err)
        next(err);
    }
}

patientController.updatePatient  = async (req,res,next) => {
    
    try{
           //get the patient that we are looking for
           const {patientId, firstname, lastname} = req.body;

           const data = await Patient.findById(patientId);
           data.firstname = firstname;
           data.lastname = lastname;
   
            await data.save();
   
           // res.json({logs: allLogs,medications: copiedData.medications})
           res.json({"Success": "Successfully updated patient"});
    }
    catch(err){
        console.error(err)
        next(err);
    }
}
patientController.addLogToPatient = async (req,res,next) => {

     //this was taken care of in the check to see if the medication belonged to the patient.
    try{

        const {patientId, medication, date} = req.body;

        const patient = await Patient.findById(patientId).exec();
        console.log('adding med log to patient')
        //if patient cannot be found, throw error
        if(!patient){
            const error = new Error('Patient could not be found');
            error.statusCode = 404;
            throw error;
        }
        
        patient.log.push({
            medication:medication,
            date:date
        })
        await patient.save();
        res.status(200).json(patient);

        next();


    }catch(err){
        next(err);
    }



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

patientController.deleteLog = async (req, res, next) => {


    try{
        
        const {patientId, logId} = req.body;

        const patient = await Patient.findOneAndUpdate( {_id: patientId}, {$pull: {log: {_id: logId}}}, {new: true});
        console.log("Deleted log entry")
        res.status(200).json({Success: "Successfully deleted log entry."})
    }
    catch(err){
        next(err);
    }
}

module.exports = patientController;