const connect = require('./config/db');

const express = require('express');
const app = express();
app.use(express.json());

const userController = require('./controller/user.controller');

app.use("/user", userController);




const start = async () => {
    await connect();
    app.listen(1234, () => {
        console.log("listening on port 1234");
    })
}

module.exports = start;

