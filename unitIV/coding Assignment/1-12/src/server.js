const express = require('express');
const app = express();


const connect = require('./configure/db');



const userController = require('./controller/user.controller');

app.use(express.json());

app.use('/user',userController);

const start = async () => {
    
    await connect();

    app.listen(1234, () => {
        console.log("listening to port 1234");
    });

}

module.exports = start;