
const Patient = require('../Models/PatientModel');
const medicationMiddleware = {};

medicationMiddleware.verifyMedicationOfPatient = async (req, res, next) => {

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
        //if the medication isn't on the list for this patient
        if(!patient.medications.includes(medication)){
            const error = new Error('This is not a medication for this patient.')
            error.statusCode = 400;
            throw error;
        }
        
        res.status(200).json(patient);

        next();


    }catch(err){
        next(err);
    }



}

module.exports = medicationMiddleware;