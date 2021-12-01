const express = require('express');
const router = express.Router();

// send mail 
const sendMail = require('../utils/sendMail');


const User = require("../models/user.model");
const Admin = require("../models/admin.model");


router.get("/", async (req, res) => {
    
    try {

        let page = +req.query.page || 1;
        let size = +req.query.size || 2;
        let offset = (page - 1) * size;
      console.log(page, size)
        const user = await User.find({}).skip(offset).limit(size).lean().exec();

        let total_page = Math.ceil((await User.find({}).countDocuments().lean().exec()) / size);
        return res.send({user,total_page});


        
    } catch (e) {
        return res.status(500).json({ message: e.message, status: "failed" })
    }
});
router.get("/admin", async (req, res) => {
    
    try {
       
        

        const admin = await Admin.find({}).populate("user_ids").skip(offset).limit(size).lean().exec();
        console.log(admin)
        let maillist = admin.map(el => {
            return el.user_ids.mail;
        })
        console.log(maillist)
        return res.send(admin);

        
    } catch (e) {
        return res.status(500).json({ message: e.message, status: "failed" })
    }
});


router.post('/', async (req, res) => {
    try {
        const user = await User.create(req.body);
        const admin = await Admin.find({}).
            populate("user_ids").
            lean().
            exec();
        
        let maillist = admin.map(el => {
            return el.user_ids.mail;
        });
        sendMail(
            "backend@b.com",
            maillist,
            `${req.body.first_name} ${req.body.last_name} has registered with us`,
            `Please welcome ${req.body.first_name} ${req.body.last_name} `,
            `Please welcome ${req.body.first_name} ${req.body.last_name} `
        );

        sendMail("backend@b.com",
            `${req.body.mail}`,
            `Welcome to ABC system ${req.body.first_name} ${req.body.last_name} `,
            `Hi ${req.body.first_name}  please confirm your email address `
        );

     



        
        
        return res.status(200).send(user);

    } catch (e) {
        return res.status(500).json({ message: e.message, status: "failed"});
    }
    
});

router.post("/admin", async (req, res) => {
     try {
      
        const admin = await Admin.create(req.body);
        return res.send(admin);

        
    } catch (e) {
         return res.status(500).json({ message: e, status: "failed" });
    }
})

module.exports = router;