const express = require('express');
const app = express();
const PORT = 3000;
const {connectToDatabase} = require('./db');
const users = require('./Routes/Users');
const patients = require('./Routes/Patients');
const medications = require('./Routes/Medications');
app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.use('/users', users);
app.use('/patients', patients);
app.use('/medications', medications)







app.listen(3000, () => {
    console.log(`App is now listening on port ${PORT}!`)
});

( async function(){
    await connectToDatabase();
})();














