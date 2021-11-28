const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

const connect = () => {
    return mongoose.connect("mongodb://127.0.0.1:27017/books")
}




app.listen(1234, () => {
    connect();
    console.log('listening on port 1234...')
});