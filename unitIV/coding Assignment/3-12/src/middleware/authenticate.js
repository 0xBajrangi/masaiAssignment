const jwt = require("jsonwebtoken");

require("dotenv").config();

const verifyToken = (token) => {
    return new Promise((resolve, reject) => {
            
        jwt.verify(token, process.env.JWT_ACCESS_KEY, function (err, token) {
            if (err) return reject(err);
           
            return resolve(token);
        });
        })
 
        
  

}




module.exports = async (req, res, next) => {
    
    //if we received the beareer toke in the header
     
    const bearerToken = req?.headers?.authorization;
   

    //if not received the token is not a bearer token then throw an error
    if (!bearerToken || !bearerToken.startsWith('Bearer ')) {
        return res.status(400).json({message: 'Provide a valid token'});
    }

    //else we will try to get the use form the token

    const token = bearerToken.split(" ")[1];
  
    let user;
    try {
         user = await verifyToken(token);
    
    } catch (e) {
          return res.status(400).json({message: 'Provide a valid token @user'});
}
  

    //if no user found then we will throw an error
    if (!user) {
        
             return res.status(400).json({message: 'Provide a valid token'});


    }

    //else we will attach the user to the req 

    req.user = user;

    //return next 
    return next();





}