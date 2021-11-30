
const mongoose = require('mongoose');

// student schema
const studentSchema = new mongoose.Schema({
    rollno: { type: Number, required: true },
    current_batch: { type: String, required: true },
    marks:{ type: Number, required: true},
    eval_ids: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "eval",
        required: true
    },
    user_ids: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    required: true}
});

// student model;
module.exports = mongoose.model("student", studentSchema);