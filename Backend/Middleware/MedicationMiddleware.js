
const Patient = require('../Models/PatientModel');
const medicationMiddleware = {};

medicationMiddleware.verifyMedicationOfPatient = async (req, res, next) => {

    try{

        const {patientId, medication, date} = req.body;

        const patient = await Patient.findById(patientId).exec();

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
        
        patient.log.push({
            medication:medication,
            date:date
        })
        await patient.save();
        res.status(200).json(patient);




    }catch(err){
        next(err);
    }



}

module.exports = medicationMiddleware;