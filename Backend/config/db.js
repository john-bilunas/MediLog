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

module.exports = connectToDatabase;
