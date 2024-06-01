const mongoose = require('mongoose');

// const Medications = mongoose.model('medication', medicationSchema);

const patientSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname : {
        type: String,
        required: true
    },
    medications:{
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'medication'
        }]
    },
    log: [
        {
            medication: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'medication'
            
            },
            date: {
                type: Date,
                required: true
            }
        }
    ]
 
});

const Patient = mongoose.model('patient', patientSchema);

module.exports = Patient;