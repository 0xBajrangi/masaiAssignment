const express = require('express');

const Post = require('../models/post.model');

const router = express.Router();

const authenticate = require('../middleware/authenticate');


router.post("/", authenticate, async (req, res) => {
    try {
         



        const user = req.user;
        console.log(user)
        const post = await Post.create(

            {
                title: req.body.title,
                body: req.body.body,
                user: user.user._id
            }
        );

        const posts = await Post.find().lean().exec();

        return res.status(201).json({posts})


        
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
})


module.exports = router;