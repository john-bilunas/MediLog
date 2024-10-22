const express = require('express');
const app = express();
const PORT = 9000;
const connectToDatabase = require('./config/db');
const cors = require('cors');
const users = require('./Routes/UserRoutes');
const patients = require('./Routes/PatientRoutes');
const login = require('./Routes/LoginRoute');
const medication = require('./Routes/MedicationRoute');
const logout = require('./Routes/LogoutRoute');
const signup = require('./Routes/SignUpRoute');
const authMiddleware = require('./Middleware/AuthMiddleware');
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));


app.use('/api/login', login);
app.use('/api/logout', logout);
app.use('/api/signup', signup);
app.use('/api/users', users);
app.use('/api/patients', patients);
app.use('/api/medication', medication)



//Global Error Handler
app.use( authMiddleware.globalErrorHandler);


( async function(){
    await connectToDatabase();
})();
app.listen(PORT, () => {
    console.log(`App is now listening on port ${PORT}!`)
});
















