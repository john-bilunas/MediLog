const express = require('express');
const router = express.Router();
const Patient = require('../Models/PatientModel');
const authMiddleware = require('../Middleware/AuthMiddleware');
const patientController = require('../Controllers/PatientController');
const patientMiddleware = require('../Middleware/PatientMiddleware');
const medicationMiddleware = require('../Middleware/MedicationMiddleware');



//create a patient
/*
body

*/
router.post('/',authMiddleware.validateJWT,patientController.createPatient , (req,res) => {
    //input: firstname, lastname
    //output: send patient in a response

});



/*
input:
    body{
        patientId,
        medication: medicationId,
        date

    }
output: return medication that has been added to the patient

*/
router.post('/log', authMiddleware.validateJWT, patientMiddleware.verifyPatientOfUser,medicationMiddleware.verifyMedicationOfPatient, patientController.addLogToPatient ,(req, res) => {

});

//delete one patient
router.delete('/:patientId', (req,res) => {
    
});




module.exports = router;