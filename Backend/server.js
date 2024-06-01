const express = require('express');
const app = express();
const PORT = 3000;
const connectToDatabase = require('./config/db');
const users = require('./Routes/UserRoutes');
const patients = require('./Routes/PatientRoutes');
const login = require('./Routes/LoginRoute');
const logout = require('./Routes/LogoutRoute');
const signup = require('./Routes/SignUpRoute');
const authMiddleware = require('./Middleware/AuthMiddleware');
app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.use('/login', login);
app.use('/logout', logout);
app.use('/signup', signup);
app.use('/users', users);
app.use('/patients', patients);



//Global Error Handler
app.use( authMiddleware.globalErrorHandler);


( async function(){
    await connectToDatabase();
})();
app.listen(3000, () => {
    console.log(`App is now listening on port ${PORT}!`)
});
















