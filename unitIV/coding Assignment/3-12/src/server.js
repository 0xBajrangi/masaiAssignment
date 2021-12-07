const connect = require('./config/db');
const express = require('express');
const { register, login } = require('./controller/user.controller')

const postController =require("./controller/post.controller")
const { body, validationResult } = require("express-validator");



const app = express();
app.use(express.json())

app.post("/register",
    body("name").isLength({ min: 2 }).withMessage("minimum length must be at least 2 characters"),
    body("email").custom(async (value) => {
        let regex = new RegExp(`[a-z0-9]+@[a-z]+\.[a-z]{2,3}`);
 console.log(regex.test(value))
        if(! regex.test(value)){
            throw new Error("Invalid email");
        }
        
    }),
    body("password").isLength({ min: 2, max: 10 }).withMessage("passowrd must be in between 2-10 in legth"), register);
    
app.post("/login", 
   body("email").custom(async (value) => {
        let regex = new RegExp(`[a-z0-9]+@[a-z]+\.[a-z]{2,3}`);
 console.log(regex.test(value))
        if(! regex.test(value)){
            throw new Error("Invalid email");
        }
        
    }),
    body("password").isLength({ min: 2,max:10 }).withMessage("passowrd must be in between 2-10 in legth"),login)

app.use('/post', postController);



const start = async () => {
    await connect();
    app.listen(1234, () => {
        console.log("listening on port 1234");
    });

}

module.exports = start;