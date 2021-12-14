module.exports = function (permision) {
    return (req, res, next) => {
        let allowed = false;
         req.user.user.roles.forEach((el) => {
            if (permision.includes(el)) {
                allowed =  true;
               
            }
         });
        
        
        if (!allowed) {
            
            return res.json({ message: 'You are not allowed to post' })
        }    
        
        
        next();
    }
}