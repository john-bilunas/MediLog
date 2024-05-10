const express = require('express');
const app = express();
const PORT = 3000;
const {connectToDatabase} = require('./db');


app.use(express.json());
app.use(express.urlencoded({extended: true}));










app.listen(3000, () => {
    console.log(`App is now listening on port ${PORT}!`)
});

( async function(){
    await connectToDatabase();
})();














