const mongoose = require('mongoose');




const userSchema = new mongoose.Schema( {
    firstname:{
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    username: {
        type: String,
        unique: true,
        required: true
    },
    patients: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'patient'
    }], 
    email: {
        type: String,
        required: true,
        //add unique once done testing
    },
    phone: {
        type: String,
        required: true,
        //add phone number validation
        
    },

});
const User = mongoose.model('user', userSchema);

module.exports = User;