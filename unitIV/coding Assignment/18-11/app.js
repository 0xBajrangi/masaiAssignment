const express = require('express');
const app = express();

const book = require('./book.json');

app.use(express.json());

//let authorize middleware
function authorize(name) {
    return (req, res, next) => {
        const originalSendFunc = res.send.bind(res);
        res.send = function (body) {
            
            body.api_requested_by = name;
            return originalSendFunc(body);
        }
        
        next();
      
     }
 }

//get

app.get('/',authorize("pawan"), (req, res) => {
  
     res.send({book});
});

//post /book append uset to end of it

app.post('/books', (req, res) => {

    let add_book = [...book, req.body];

    res.send(add_book);

});

//get '/book/:id' this will return user with a specific id
app.get('/books/:id',authorize("pawan"), (req, res) => {
    let single_book = book.filter(book => book.id == req.params.id);

    res.send({ "books": single_book });
});

//Patch 'books/:id' update 
app.patch('/books/:id', (req, res) => {
   
    let updated_book = book.map(book => {
        if (book.id == req.params.id) {
            book.author = req.body.author;
            book.year = req.body.year;
        }
        return {...book};
    });

    res.send(updated_book);
});
    
app.delete('/books/:id', (req, res) =>{
    
    let after_delete = book.filter(book => !(req.params.id == book.id));

    res.send(after_delete)

})
    




app.listen(12345, () => {
    console.log("listening to port 12345...");
})