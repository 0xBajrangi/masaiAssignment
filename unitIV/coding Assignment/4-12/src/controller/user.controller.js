const User = require("../models/user.model")
const jwt = require("jsonwebtoken");
require("dotenv").config();

const newToken=  (user)=>{

    return jwt.sign({ user: user }, process.env.JWT_ACCESS_KEY);

}

const register = async (req, res) => {
    
    try {
        
        //check if already a user or not
        let user = await User.findOne({ email: req.body.email }).lean().exec();
        
        if (user) {
            return res.send("already a user");
        }

        
        user = await User.create(req.body);

        //we will create token and
        const token = newToken(user);


        res.status(200).json({user:user,token:token});



    } catch (e) {
            return res.status(500).json({message: e.message});
    }

}

const login = async (req, res) => {
    try {

        let user = await User.findOne({ email: req.body.email });


        
        if (!user) {
            return res.send("You are not a user please register now");
        }

        const match = await user.CheckPassword(req.body.password);
    

        if (!match) {
            return res.json({ message:"invalid credentials"})
        }

        //generatre token

        const token = newToken(user);


        res.status(200).json({user,token})
        



    }catch (e) {
            return res.status(500).json({message: e.message});
    }
}


module.exports = {register,login}