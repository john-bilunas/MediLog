const { isValidObjectId } = require('mongoose');
const Medication = require('../Models/MedicationModel');
const Patient = require('../Models/PatientModel');
const User = require('../Models/UserModel');



const medicationController = {};

medicationController.addMedicationToPatient = async (req,res,next) => {

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

medicationController.deleteMedication = async (req,res,next) => {


    try{
        const {patientId, medicationId} = req.body;

        //error handling
        if(!patientId){
            const error = new Error('Client is missing patient information.');
            error.statusCode = 400;
            throw error;
        }
        if(!medicationId){
            const error = new Error('Client is missing medication information.');
            error.statusCode = 400;
            throw error;
        }

        const patient = await Patient.findById(patientId);
        let validDeletion = false;
        let deletionIndex;
        for(let i = 0; i < patient.medications.length; i++){
            if(patient.medications[i].toString() === medicationId){
                validDeletion = true;
                deletionIndex = i;
                break;
            }
        }

        
        
        console.log(validDeletion);

        if(validDeletion){
            //delete medication
            await Medication.deleteOne({"_id": medicationId});
            const patientDoc = await Patient.findById(patientId);
            patientDoc.medications.splice(deletionIndex,1);
            await patientDoc.save();
            console.log("Medication ", medicationId, " has been deleted from patient ", patientId)
        }else{
            //throw error
            const error = new Error('Medication is not used by this patient.');
            error.statusCode = 400;
            throw error;
        }


        res.json({"Success":"Successfully deleted medicaiton from patient"});
        // res.json({"Success":validDeletion});

    }catch(err){
        next(err)
    }
}



module.exports = medicationController;