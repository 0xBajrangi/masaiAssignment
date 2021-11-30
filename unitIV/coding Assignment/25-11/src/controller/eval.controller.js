const express = require('express');

const Eval = require('../models/eval.model');

const router = express.Router();


router.get('/', async (req, res) => {
    try {
        const eval = await Eval.find().lean().exec();
        return res.status(200).send(eval);
    } catch (e) {
        return res.status(500).json({ message: e })
    }
});

router.post('/', async (req, res) => {
    try {
        const eval = await Eval.create(req.body);
        return res.status(200).send(eval);
    } catch (e) {
        return res.status(500).json({ message: e });
    }
    
});





module.exports = router;