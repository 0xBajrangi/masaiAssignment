
const { Schema, model } = require("mongoose");

const userSchema = new Schema({
    
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    mail: { type: String, required: true }
    
}, {
    versionKey: false
});


module.exports = model("user", userSchema);
