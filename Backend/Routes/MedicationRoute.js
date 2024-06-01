const express = require('express');
const router = express.Router();
const Patient = require('../Models/PatientModel');
const authMiddleware = require('../Middleware/AuthMiddleware');
const patientController = require('../Controllers/PatientController');
const patientMiddleware = require('../Middleware/PatientMiddleware');

//get all medications
router.get('/', (req, res) => {

});

//get one medication
router.get('/:id', (req, res) => {

});

/* ADD MEDICATION
input:
    body{
        patientId,
        medication: {
            name,
            dosage: {
                amount,
                unit
            },
            frequency
        }
    }
output: return medication that has been added to the patient

*/
router.post('/', authMiddleware.validateJWT, patientMiddleware.verifyPatientOfUser, patientController.addMedicationToPatient ,(req, res) => {

});
//add a medication (for a patient)
router.get('/', (req, res) => {

});


module.exports = router;