const express = require('express');
const router = express.Router();
const Patient = require('../Models/PatientModel');
const authMiddleware = require('../Middleware/AuthMiddleware');
const patientController = require('../Controllers/PatientController');



//create a patient

router.post('/',authMiddleware.validateJWT,patientController.createPatient , (req,res) => {
    //input: firstname, lastname
    //output: send patient in a response

});


//compared to put since we will be using the $push method
router.patch('/:patientId', (req, res) => {
    
})
//delete one patient
router.delete('/:patientId', (req,res) => {
    
});




module.exports = router;