const express = require('express');
const User = require('../models/user.model')


const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const user = await User.find().lean().exec();
        return res.status(200).send(user);
    } catch (e) {
        return res.status(500).json({message: e})
    }
});

router.post('/', async (req, res) => {
    try {
        const user = await User.create(req.body);
        return res.status(200).send(user);
    } catch (e) {
        return res.status(500).json({ message: e });
    }
    
});


module.exports = router;

