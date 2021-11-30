const express = require('express');
const Student = require('../models/student.model');
const Eval = require('../models/eval.model');
const Topic = require('../models/topic.model');



const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const student = await Student.find().lean().exec();
        return res.status(200).send(student);
    } catch (e) {
        return res.status(500).json({message: e})
    }
});

router.post('/', async (req, res) => {
    try {
        const student = await Student.create(req.body);
        return res.status(200).send(student);
    } catch (e) {
        return res.status(500).json({ message: e });
    }
    
});

router.patch('/:id', async (req, res) => {
    try {
        const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
            new:true
        });
        return res.status(200).send(student);
    } catch (e) {
        return res.status(500).json({ message: e });
    }
    
});

// get all student who gave 
router.get('/eval/:sub', async (req, res) => {
    try {
        console.log("hello")
        const subject = await Topic.find({ topic_name: req.params.sub }).lean().exec();
        console.log(subject);

        const eval = await Eval.find({ topic_ids: subject[0]._id }).lean().exec();
        console.log(eval);
        const student = await Student.find({ eval_ids: eval[0]._id })
            .populate(
                {
                    path: "eval_ids",
                    populate: {
                        path: "topic_ids",
                    }
                }
            ).lean().exec();

        return res.status(200).send(student);
    } catch (e) {
        return res.status(500).json({ message: e });
    }
});

router.get('/eval/marks/:sub', async (req, res) => {
    try {
         console.log("hello")
         const subject = await Topic.find({topic_name:req.params.sub}).lean().exec();
         console.log(subject);

         const eval = await Eval.find({ topic_ids: subject[0]._id }).lean().exec();
         console.log(eval);
        const student = await Student.find({ eval_ids: eval[0]._id })
            .populate(
                {
                    path: "eval_ids",
                    populate: {
                        path: "topic_ids",
                    }
                }
            ).sort({marks:-1}).limit(1).lean().exec();

        return res.status(200).send(student);
    } catch (e) {
        return res.status(500).json({ message: e });
    }
})




module.exports = router;

