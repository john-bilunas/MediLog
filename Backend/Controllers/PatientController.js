
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

patientController.addMedicationToPatient = async (req,res,next) => {

    try{

        const {patientId, medication} = req.body;
        if(
            !patientId ||
            !medication.name ||
            !medication.dosage ||
            !medication.dosage.amount ||
            !medication.dosage.unit ||
            !medication.numberOfHoursBetweenDoses
        ){
            const error = new Error('Missing necessary information to add medication to patient.');
            error.statusCode = 400;
            throw error;
        }
        //create a new medciation document
        const medicationDoc = new Medication({
            name: medication.name,
            dosage: {
                amount: medication.dosage.amount,
                unit: medication.dosage.unit
            },
            numberOfHoursBetweenDoses: medication.numberOfHoursBetweenDoses
        });
        //save
        const newMedication = await medicationDoc.save();
        //add medication document to patient
        const patient = await Patient.findById(patientId).exec();
        patient.medications.push(newMedication._id);
        await patient.save();

        res.status(200).json(newMedication);


    }catch(err){
        next(err)
    }

}


patientController.addLogToPatient = async (req,res,next) => {

}


module.exports = patientController;