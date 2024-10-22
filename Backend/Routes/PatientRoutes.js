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
router.post('/log' , authMiddleware.validateJWT,patientMiddleware.verifyPatientOfUser ,medicationMiddleware.verifyMedicationOfPatient,patientController.addLogToPatient,(req, res) => {
    
});


//delete log
/*
input:
    body{
        patientId,
        logId

    }
output: return success message

*/
router.delete('/log' , authMiddleware.validateJWT,patientMiddleware.verifyPatientOfUser ,patientController.deleteLog,(req, res) => {
    
});

//update one patient
/*
input:
    body{
        patientId,
        firstname: firstname,
        lastname: lastname

    }
output: Success message

*/
router.put('/' , authMiddleware.validateJWT,patientMiddleware.verifyPatientOfUser ,patientController.updatePatient,(req, res) => {
    
});

//delete one patient
/*
input:
    body:{
        patientId
    }

output: Success message


*/
router.delete('/',authMiddleware.validateJWT, patientController.deletePatient, (req,res) => {
    
});


router.get('/log/:patientId',authMiddleware.validateJWT, patientController.getMedInfo, (req,res) => {
    
}); 

// router.get('/log/:patientId', (req,res) => {
//     res.json({params: req.params});
// }); 


module.exports = router;