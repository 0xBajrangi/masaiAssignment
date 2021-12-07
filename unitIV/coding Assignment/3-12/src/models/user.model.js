const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new Schema({
    name: { type: String, require: true},
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true }
}, {
    
    versionKey: false,
    timestamps: true
});


// we will add a hook which is a type of middle ware which will run before saveing
userSchema.pre("save", function (next) {
    if (!this.isModified("password")) return next();

    bcrypt.hash(this.password, 10, (err, hash) =>{
            
            this.password = hash;
            return next();
    

    });
});


// matching the password 
userSchema.methods.CheckPassword = function (password) {

    return new Promise((resolve, reject) => {
        bcrypt.compare(password,this.password, function(err, res) {
            if (err) return reject(err);
            
            return resolve(res);
});
    })
    
}

module.exports = model("user",userSchema);