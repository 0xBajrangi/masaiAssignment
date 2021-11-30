const express = require('express');
const mongoose = require('mongoose');

const connect = require('./config/db')

const User = require('./models/user.model');
const Student = require('./models/student.model');
const Eval = require('./models/eval.model');


const topicController = require('./controller/topic.controller');

const evalController = require('./controller/eval.controller');

const studentController = require('./controller/student.controller');

const userController = require('./controller/user.controller');







const app = express();
app.use(express.json());


app.use("/topic", topicController);
app.use("/eval", evalController);
app.use("/student", studentController);
app.use("/user", userController);













app.listen(1234, () => {
    connect();
    console.log("listening to port 1234....")
})