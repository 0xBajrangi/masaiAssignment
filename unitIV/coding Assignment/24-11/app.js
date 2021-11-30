const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

const connect = () => {
    return mongoose.connect("mongodb://127.0.0.1:27017/books")
}

// book schema


const sectionSchema =  new mongoose.Schema({
    section: { type: String, required: true }
},{
    versionKey:false,
    timestamps: true
});
const Section = mongoose.model("section", sectionSchema);

// author schema 
const authorSchema = new  mongoose.Schema({
    first_name: {
        type: String, required: true,
    },
    last_name: { type: String, required: true },
   
},{
    versionKey:false,
    timestamps: true
});

const Author = mongoose.model("author",authorSchema);

// book shcema schema
const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    body: { type: String, required: true },
    author_ids: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "author",
        required: true
    }],
    section_ids: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "section",
        required: true
    },
    checkout_ids: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "checkout",
        required: true
    }
    
},{
    versionKey:false,
    timestamps: true
});
const Book = mongoose.model("book",bookSchema);

// checkout schema 
const checkoutSchema = new mongoose.Schema({
    status: { type: String, required: true },
    
    
}, {
    versionKey: false,
    timestamps: true
});
const Checkout = mongoose.model("checkout", checkoutSchema);




// crud api for seciton
app.get('/section', async (req, res) => {
    const sec = await Section.find().lean().exec();
    return res.send(sec);
    
});

app.get('/section/:id', async (req, res) => {
    const section = await Section.findbyID(req.params.id).lean().exec();
    return res.send(section);
})

app.post("/section", async (req, res) => {
    const section = await Section.create(req.body);
    return res.send(section);
});
app.patch("/section/:id", async (req, res) => {
    const section = await Section.findByIdAndUpdate(req.params.id, req.body).lean().exec();
    return res.send(section);
});



// crud for the author;
app.get('/author', async (req, res) => {
    const sec = await Author.find().lean().exec();
    return res.send(sec);
    
});

app.get('/author/:id', async (req, res) => {
    const author = await Author.findbyID(req.params.id).lean().exec();
    return res.send(author);
});
app.post("/author", async (req, res) => {
    const author = await Author.create(req.body);
    return res.send(author);
});


// crud for the book;
app.get('/book', async (req, res) => {
    const sec = await Book.find().populate("author_ids").populate("checkout_ids").populate("section_ids").lean().exec();
    return res.send(sec);
    
});


app.post("/book", async (req, res) => {
    const book = await Book.create(req.body);
    return res.send(book);
});

//// crud for the checkout;
app.get('/checkout', async (req, res) => {
    const sec = await Checkout.find().lean().exec();
    return res.send(sec);
    
});

app.get('/checkout/:id', async (req, res) => {
    const checkout = await Checkout.findbyID(req.params.id).lean().exec();
    return res.send(checkout);
});
app.post("/checkout", async (req, res) => {
    const checkout = await Checkout.create(req.body);
    return res.send(checkout);
});

// get books that are checked output
app.get('/book/checkout', async (req, res) => {
    const checkout = await Checkout.find({ status: "true" });
    console.log(checkout);
    const book = await Book.find({checkout_ids:checkout[0]._id}).populate("checkout_ids").lean().exec();

    
   
 
    return res.send(book);
    
});

// all books written by a author are
app.get('/book/author/:author', async (req, res) => {
    const aut = await Author.find({ first_name:req.params.author });
      console.log(aut)
    const book = await Book.find({author_ids:aut[0]._id}).populate("author_ids").lean().exec();
    return res.send(book);
    
});

//find a book in a section 

app.get('/book/section/:section', async (req, res) => {
    const aut = await Section.find({ first_name:req.params.section });
      console.log(aut)
    const book = await Book.find({section_ids:aut[0]._id}).populate("section_ids").lean().exec();
    return res.send(book);
    
});


// find book in a section which are not check out

app.get('/book/checkout/:section', async (req, res) => {
     const aut = await Section.find({ first_name: req.params.section });
     const checkout = await Checkout.find({ status: "false" });
      console.log(aut)
    const book = await Book.find({ $and: [{section_ids:aut[0]._id},{checkout_ids:checkout[0]._id}] })
        .populate("section_ids")
        .populate("checkout_ids")
        .lean()
        .exec();
    return res.send(book);
        
})


//find book of one author inside a seciton
app.get('/book/author/section/:author/:section', async (req, res) => {
    const aut = await Author.find({ first_name: req.params.author });
     const sec = await Section.find({ first_name: req.params.section });
    
      
    const book = await Book.find({ $and: [{section_ids:sec[0]._id},{author_ids:aut[0]._id}] }).populate("author_ids").populate("section_ids").lean().exec();
    return res.send(book);
    
});




app.listen(1234, () => {
    connect();
    console.log('listening on port 1234...')
});