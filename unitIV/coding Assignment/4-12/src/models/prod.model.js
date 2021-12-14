const { Schema, model } = require('mongoose');

const prodSchema = new Schema({
    title: { type: String, required: true },
    body: { type: String, required: true },
    user: {

        type: Schema.Types.ObjectId,
        ref: "user",
        required: true,
        
    }
    
}, {
    versionKey: false
})


module.exports = model("product", prodSchema);