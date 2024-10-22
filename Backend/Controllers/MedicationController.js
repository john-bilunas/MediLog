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
            console.log(req.body)
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
medicationController.deleteMedication = async (req, res, next) => {
    try {
      const { patientId, medicationId } = req.body;
  
      //Error handling
      if (!patientId || !medicationId) {
        const error = new Error('Patient or medication information is missing.');
        error.statusCode = 400;
        throw error;
      }
  
      //Check if the medication exists in the patients doc
      const patient = await Patient.findById(patientId);
      if (!patient) {
        const error = new Error('Patient not found.');
        error.statusCode = 404;
        throw error;
      }
  
      //Check if the medication exists in the patient's medications array
      const medicationIndex = patient.medications.findIndex(
        (med) => med.toString() === medicationId
      );
  
      if (medicationIndex === -1) {
        const error = new Error('Medication is not used by this patient.');
        error.statusCode = 400;
        throw error;
      }
  
      //Remove all log entries related to the medication with medicationId
      patient.log = patient.log.filter(
        (entry) => entry.medication.toString() !== medicationId
      );
  
      patient.medications.splice(medicationIndex, 1);
      await patient.save();
  
      // Delete the medication from the Medication collection
      await Medication.findByIdAndDelete(medicationId);
  
      console.log(`Medication ${medicationId} has been deleted from patient ${patientId}.`);
      res.json({ success: 'Successfully deleted medication from patient.' });
    } catch (err) {
      next(err);
    }
  };
  
// medicationController.deleteMedication = async (req,res,next) => {


//     try{
//         const {patientId, medicationId} = req.body;

//         //error handling
//         if(!patientId){
//             const error = new Error('Client is missing patient information.');
//             error.statusCode = 400;
//             throw error;
//         }
//         if(!medicationId){
//             const error = new Error('Client is missing medication information.');
//             error.statusCode = 400;
//             throw error;
//         }

//         const patient = await Patient.findById(patientId);
//         let validDeletion = false;
//         let deletionIndex;
//         for(let i = 0; i < patient.medications.length; i++){
//             if(patient.medications[i].toString() === medicationId){
//                 validDeletion = true;
//                 deletionIndex = i;
//                 break;
//             }
//         }

        
        
//         console.log(validDeletion);

//         if(validDeletion){
//             //delete medication
//             //delete medication
//             await Medication.deleteOne({"_id": medicationId});
//             //delete link between patient and medication
//             const patientDoc = await Patient.findById(patientId);
//             console.log('patientDoc', patientDoc)
//             //delete all med log entries with that medicationId
//             patientDoc.log = patientDoc.log.filter( (el) => { el.log._id.toString() !== medicationId; 
//             })


//             //delete link between patient and medication
//             patientDoc.medications.splice(deletionIndex,1);
//             await patientDoc.save();
//             console.log("Medication ", medicationId, " has been deleted from patient ", patientId)
//         }else{
//             //throw error
//             const error = new Error('Medication is not used by this patient.');
//             error.statusCode = 400;
//             throw error;
//         }
//         res.json({"Success":"Successfully deleted medicaiton from patient"});

//     }catch(err){
//         next(err)
//     }
// }




module.exports = medicationController;