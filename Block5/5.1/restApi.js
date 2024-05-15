import fs from 'fs'
import express, { response } from 'express';

const port = 3000;
const app = express();

app.use(express.json());

// Endpoints
app.get("/books", (request, response) => {
    const booksList = JSON.parse(fs.readFileSync("books.json", "utf-8"));
    const bookTitlesList = booksList.map(book => book.title);
    response.send(bookTitlesList);

    console.log("");
    console.log("GET: /books");
});
app.get("/books/:isbn", (request, response) => {
    const booksList = JSON.parse(fs.readFileSync("books.json", "utf-8"));
    const bookWithInfo = booksList.find(book => book.isbn === request.params.isbn)

    if(bookWithInfo){
        response.send(bookWithInfo);
    }
    else{
        console.log("");
        console.log("ERROR 404: The book you are looking for does not exist in our database.");
        response.status(404).send("ERROR 404: The book you are looking for does not exist in our database.");
    }

    console.log("");
    console.log("GET: /books/" + request.params.isbn);
    console.log(bookWithInfo);
});
app.post("/books", (request, response) => {
    const booksList = JSON.parse(fs.readFileSync("books.json", "utf-8"));

    if(booksList.find(book => book.isbn === request.body.isbn)){
        console.log("");
        response.status(409).send("ERROR 409: This book is already in our database. Use PUT to overwrite.");
    }

    if(!request.body){
        console.log("");
        response.status(400).send("ERROR 400: Faulty input data.");
    }

    booksList.push(request.body);
    fs.writeFileSync("books.json", JSON.stringify(booksList));

    response.status(201).send(request.body);
});
app.put("/books:isbn", (request, response) => {
    const booksList = JSON.parse(fs.readFileSync("books.json", "utf-8"));

    if(!request.body || !request.body.isbn || !request.body.title || !request.body.year || !request.body.author){
        console.log("");
        response.status(400).send("ERROR 400: Faulty input data.");
        return
    }
    if(request.params.isbn != request.body.isbn){
        console.log("");
        response.status(400).send("ERROR 400: ISBN in the URL does not match ISBN in json body.");
        return
    }

    if(booksList.find(book => book.isbn === request.body.isbn)){
        for(let i = 0; i < booksList.length; i++){
            booksList[i] = request.body;
        }
    }
    else{
        booksList.push(request.body);
    }

    fs.writeFileSync("books.json", JSON.stringify(booksList));
    response.status(201).send(request.body);
});
app.get("/books", (request, response) => {

});
app.get("/books", (request, response) => {

});

// Listen on port 3000
app.listen(port, ()=>{
    console.log("");
    console.log(`RestAPI app listening on port ${port}`)
});