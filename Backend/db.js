const mongoose = require('mongoose');
require('dotenv').config();

const connectToDatabase = async () => {

    try{
        await mongoose.connect(process.env.DB_CONNECTION_STRING);
        console.log('Connected to Mongo Database!')
    }catch(err){
        console.error('Error connecting to Mongo Database...', err)        
    }

}


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
            required: true
        }
    },
    frequency: {//number of hours between doses
        type: Number,
        required: true
    }
});
const MedicationModel = mongoose.model('medication', medicationSchema);

const patientSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName : {
        type: String,
        required: true
    },
    medications:{
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'medication'
        } ]
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
const PatientModel = mongoose.model('patient', patientSchema);

const userSchema = new mongoose.Schema( {
    firstName:{
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        unique: true,
        required: true
    },
    patients: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'patient'
    }]

});
const UserModel = mongoose.model('user', userSchema);

module.exports = {
    connectToDatabase,
    UserModel,
    PatientModel,
    MedicationModel
}