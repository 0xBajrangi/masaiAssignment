const express = require('express');
const mongoose = require('mongoose');


const app = express();
app.use(express.json());
// connnect 
const connect = () => {
    return mongoose.connect("mongodb://127.0.0.1:27017/mvc");
}

const userSchema = new mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    gender: { type: String, required: true },
    data_of_birth: { type: String, required: true },
});

// user model
const User = mongoose.model("user", userSchema);


// student schema 
const studentSchema = new mongoose.Schema({
    rollno: { type: Number, required: true },
    current_batch: { type: String, required: true },
    eval_ids: {
        type: mongoose.Schema.types.ObjectId,
        ref: "eval",
        required: true
    },
    user_ids: {
        type: mongoose.Schema.types.ObjectId,
        ref: "user",
    required: true}
});

// student model;
const Student = mongoose.model("student", studentSchema);


const evaluationSchema = new mongoose.Schema({
    date_of_eval: { type: String, required: true },
    instrucor: { type: String, required: true },
    topic_ids: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "topic",
        required: true
    }
});

const Eval = mongoose.model("eval",evaluationSchema)


const topicSchema = new mongoose.Schema({
    topic_name: { type: String, required: true }
});
const Topic = mongoose.model('topic',top)


//get all topic
app.get("/topic", async (req, res) => {
    try {
        const topic = await Topic.find().lean().exec();
        return res.status(200).send(topic);
    } catch (e) {
        return res.status(500).json({message: e})
    }
})

// create  topics 

app.post("/topic", async (req, res) => {
    try {
        const topic = await Topic.create(req.body);
        return res.status(200).send(topic);
    } catch (e) {
        return res.status(500).json({message: e})
    }
})

















app.listen(1234, () => {
    connect();
    console.log("listening to port 1234....")
})