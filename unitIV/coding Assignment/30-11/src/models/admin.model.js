const { Schema, model } = require("mongoose");


const adminSchema = new Schema({
    user_ids: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "user"
    }
}, {
    versionKey: false
});

module.exports = model("admin", adminSchema);