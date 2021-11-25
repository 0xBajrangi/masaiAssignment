const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

const connect = function(){
    return mongoose.connect(`mongodb://127.0.0.1:27017/multimedia`);
}

const movieSchema = new mongoose.Schema({
    movie_name: { type: String, required: true },
    movie_genre: { type: String, required: true },
    production_year: { type: Number, required: true },
    budget: { type: Number, required: true }
}, {
    versionKey: false,
    timestamp: true
});


const Movie = mongoose.model('movie', movieSchema);

//get all movie 
app.get("/movies", async (req, res) => {
    const movies = await Movie.find().lean().exec();
    res.status(201).send({ movies });
});

///get a perticular movie by id
app.get("/movies/:id", async (req, res) => {
    const movie = await Movie.findById(req.params.id);

    res.status(201).send({ movie });
});

//add a movie to the list

app.post("/movies", async (req, res) => {
    const movie = await Movie.create(req.body);
    res.send(movie);
})

//updating a perticular movies

app.patch("/movies/:id", async (req, res) => {
    const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    });
    return res.status(200).send({ movie })
});

//deleteing a perticular movies
app.delete("/movies/:id", async (req, res) => {
    const movie = await Movie.findByIdAndDelete(req.params.id);
    return res.status(200).send({movie})
})


app.listen(2345, () => {
    connect();
    console.log("connecting to port 2345...");
});