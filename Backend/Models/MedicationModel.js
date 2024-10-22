const mongoose = require('mongoose');


const medicationSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    dosage: {
        amount: {
            type: Number,
            required: true
        },
        unit: {
            type: String,
            required: true,
            // enum: medicationUnits
        }
    },
    numberOfHoursBetweenDoses: {//number of hours between doses
        type: Number,
        required: true,
        alias: 'frequency'
    },
});

const Medication = mongoose.model('medication', medicationSchema);

module.exports = Medication;