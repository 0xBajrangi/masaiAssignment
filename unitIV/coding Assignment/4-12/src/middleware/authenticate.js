const jwt = require('jsonwebtoken');
require("dotenv").config();

const verifyToken = (token) => {
      
    return new Promise((resolve, reject) => {
            
        jwt.verify(token, process.env.JWT_ACCESS_KEY, function (err, token) {
            if (err) return reject(err);
            return resolve(token);
        });
        })
};


module.exports = async (req, res, next) => {
    //check for recieved bearer token in the headers
    const bearerToken = req?.headers?.authorization;
 
    if (!bearerToken || !bearerToken.startsWith('Bearer ')) {
        return res.status(400).json({message: 'Invalid bearer token'})
    }

    const token = bearerToken.split(" ")[1];
    let user;
    try {
        user = await verifyToken(token);
    } catch (e) {
        return res.status(400).json(
            { message: "provinnnnnnnnnnde a valid token" }
        )
    }
    if (!user) {
        
        return res.status(400).json(
            { message: 'Provide a valid token' }
        );


    }

    //else we will attach the user to the req 

    req.user = user;


    //return next 
    return next();
}
