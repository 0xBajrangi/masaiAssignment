const Prod = require('../models/prod.model');

const express = require('express');

const authenticate = require('../middleware/authenticate');

const authorize = require('../middleware/authorize');

const router = express.Router();

router.post("/", authenticate,authorize(["seller","admin"]),async (req, res) => {
   
    const user = req.user.user;
    console.log(user.id)
    console.log(req.user.user)

    
    const prod = await Prod.create({
        title: req.body.title,
        body: req.body.body,
        user: user,
     
    });

    return res.status(201).json({ prod });

});



module.exports = router;

