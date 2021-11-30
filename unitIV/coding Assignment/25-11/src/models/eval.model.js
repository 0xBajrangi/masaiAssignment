const mongoose = require("mongoose");


const evaluationSchema = new mongoose.Schema({
    date_of_eval: { type: String, required: true },
    instructor: { type: String, required: true },
    topic_ids: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "topic",
        required: true
    }
});

module.exports = mongoose.model("eval", evaluationSchema);