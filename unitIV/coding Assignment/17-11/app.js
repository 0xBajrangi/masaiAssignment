const express = require('express');
const user = require('./user.json')

const app = express();



app.get('/', (req, res) => {
    res.send("Welcome to Home Page");
});

app.get('/user', (req, res) => {
    res.send(user);
})

app.listen(1234, () => {
    console.log("listening to port 1234");
});