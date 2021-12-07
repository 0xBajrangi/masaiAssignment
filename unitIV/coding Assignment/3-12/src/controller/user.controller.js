const User = require('../models/user.model');

const jwt = require('jsonwebtoken');
require('dotenv').config();

const { body, validationResult } = require("express-validator");


const newToken = (user) => {
    return jwt.sign({ user: user }, process.env.JWT_ACCESS_KEY);
}

const register = async (req, res) =>{
    try {
// validation result
        let error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({ errors: error.array() });
        }


     //check if the email address already exisrt or not
    const already = await User.findOne({email:req.body.email}).lean().exec();
    if (already) {
        
        return res.send("already a user");
    }
//else create the user 
    let user = await User.create(req.body);
    
    //we will create tokens
    const token = newToken(user);

    // return user
    return res.send({ user, token });
    } catch (e) {
        return res.status(500).json({message: e.message});
 }


}


const login = async (req, res) => {
    
      try {

          // validation result
        let error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({ errors: error.array() });
        }
   
          //check if the email address exits or not
          let user = await User.findOne({email: req.body.email});
               
          //if it doesnt exiets then throw an error
          if (!user) {
              return res.status(400).json({
                  status: "failed",
                  message: "user does not exits"
              });
          }

          //else we match the password

          const match = await user.CheckPassword(req.body.password);


          //if not match then throw an error and
            if (!match) {
              return res.status(400).json({
                  status: "failed",
                  message: "invalid credentials"
              });
          }
          
          //if matches then create a token and

          const token = newToken(user);

          //return the user and the token 

          res.status(200).json({ user, token });
          
          
    } catch (e) {
        return res.status(500).json({message: e.message});
 }


}


module.exports = {register,login}