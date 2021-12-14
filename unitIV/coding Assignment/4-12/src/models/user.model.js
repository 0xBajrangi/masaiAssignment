const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    roles: [{ type: String, required: true }],
}, {
    versionKey: false,
    timestamp: true
});

// to check password 
userSchema.methods.CheckPassword = function (password){
 
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, this.password, function (err, res) {
            if (err) return reject(err);
            return resolve(res);
        });
    });
    
}


userSchema.pre("save", function (next) {
    if (!this.isModified("password")) return next();
        bcrypt.hash(this.password, 10,  (err, hash)=>{
             
            console.log(this.password, hash);
            this.password = hash;
            return next();
        });

    })


    module.exports = model("user", userSchema);
