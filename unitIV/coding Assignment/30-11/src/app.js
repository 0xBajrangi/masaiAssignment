const express = require('express');
const connect = require('./config/db');


const userController = require('./controllers/user.controller');

const app = express();
app.use(express.json())

app.use("/user",userController);



app.listen(1234, () => {
    connect();
    console.log("listening to port 1234");
})