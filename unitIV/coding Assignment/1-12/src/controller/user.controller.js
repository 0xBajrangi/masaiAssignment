const express = require('express');

// import fs module for deletion
const fs = require('fs');

// importing models
const User = require('../models/user.model');
const Gallery = require('../models/gallery.model');

const router = express.Router();

const upload = require('../middleware/upload');


router.get('/', async (req, res) => {
    const user = await User.find().lean().exec();
    return res.send(user)
})

router.post('/profile', upload.single("profile"), async (req, res) => {
    try {
        const user = await User.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            profile_pic: req.file.path,
            
        });
        return res.status(200).json({ user });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
})

router.post('/pictures', upload.array("picture", 5), async (req, res) => {
    try {
        let paths = req.files.map((file) => {
            return file.path
        });
        const gallery = await Gallery.create({
            user_id: req.body.user_id,
            pictures: paths,
            
        });

        return res.status(200).json({ gallery });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
});

router.delete('/user/:id', async (req, res) => {
    try {
        
        let user = await User.findByIdAndDelete(req.params.id);
        fs.unlink(user.profile_pic, (err) => {
            if (err) {
                throw errl;
            }
            console.log("file deleted");
        })

      
        return res.status(200).json({ user });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
});

router.delete('/user/:id', async (req, res) => {
    try {
        
        let user = await User.findByIdAndDelete(req.params.id);
        
        fs.unlink(user.profile_pic, (err) => {
            if (err) {
                throw errl;
            }
            console.log("file deleted");
        })

      
        return res.status(200).json({ user });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
});




module.exports = router;