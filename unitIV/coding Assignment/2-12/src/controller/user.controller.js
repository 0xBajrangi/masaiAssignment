const express = require('express');
const router = express.Router();

// importing validator

const { body, validationResult } = require("express-validator");
const expressvalidator = require("express-validator");

console.log(body("first_name"))

const User = require('../model/user.model');


router.get('/' ,async (req, res) => {
    console.log("hello");
});

router.post('/',
    
    body("first_name", "first name is required cannot be empty").notEmpty()
    ,
     
    body("last_name", "last name is required cannot be empty").notEmpty()

    , body('email').custom((value) => {
        let regex = new RegExp(`[a-z0-9]+@[a-z]+\.[a-z]{2,3}`);
        if (!regex.test(value)) {
            throw new Error("Invalid Email")
        }
        return true;
    }) ,
    body("pincode").isLength({max:6}).withMessage("length must be less than 6")
    ,
    body("age").isInt({ min: 1, max: 100 }).withMessage("the valid age must be between 1 - 100"),
    body("gender").custom((value) => {
    
        if (!["Male", "Female", "Others"].includes(value)) {
            throw new Error("the value should be Male Female or Others")
        }
        return true;

    })


    
    
    , async (req, res) => {


        const errors = validationResult(req);
        console.log(errors.errors);
        if (!errors.isEmpty()) {
            return res.status(400).json({ data: errors.array() })
        }

        try {
        

            const user = await User.create(req.body);

            return res.status(200).json({ user });





        } catch (e) {
            return res.status(500).json({ message: e.message, status: "failed" });
        }
    });

module.exports = router;