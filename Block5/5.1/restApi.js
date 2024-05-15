import fs from 'fs'
import express, { response } from 'express';
import { v4 as uuidv4 } from 'uuid';

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
        return;
    }

    if(!request.body || !request.body.isbn || !request.body.title || !request.body.year || !request.body.author){
        console.log("");
        response.status(422).send("ERROR 422: Faulty input data.");
        return;
    }

    booksList.push(request.body);
    fs.writeFileSync("books.json", JSON.stringify(booksList));

    response.status(201).send(request.body);
});
app.put("/books/:isbn", (request, response) => {
    const booksList = JSON.parse(fs.readFileSync("books.json", "utf-8"));

    if(!request.body || !request.body.isbn || !request.body.title || !request.body.year || !request.body.author){
        console.log("");
        response.status(422).send("ERROR 422: Faulty input data.");
        return;
    }
    if(request.params.isbn != request.body.isbn){
        console.log("");
        response.status(422).send("ERROR 422: ISBN in the URL does not match ISBN in json body.");
        return;
    }

    if(booksList.find(book => book.isbn == request.body.isbn)){
        booksList.map(book => book.isbn == request.body.isbn ? request.body : book);
    }
    else{
        console.log("");
        response.status(404).send("ERROR 404: The resource with the ISBN " + request.params.isbn + " does not exist yet.");
        return;
    }

    fs.writeFileSync("books.json", JSON.stringify(booksList));
    response.status(201).send(request.body);
});
app.delete("/books/:isbn", (request, response) => {
    const booksList = JSON.parse(fs.readFileSync("books.json", "utf-8"));
    booksList.filter(book => book.isbn != request.params.isbn);
    fs.writeFileSync("books.json", JSON.stringify(booksList));
    response.status(200).send("Resource with ISBN " + request.params.isbn + " has been deleted. (200)");
});
app.patch("/books/:isbn", (request, response) => {
    let booksList = JSON.parse(fs.readFileSync("books.json", "utf-8"));

    if(!request.body || !request.body.isbn || !request.body.title || !request.body.year || !request.body.author){
        console.log("");
        response.status(422).send("ERROR 422: Faulty input data.");
        return;
    }

    if(!booksList.find(book => book.isbn == request.params.isbn)){
        console.log("");
        response.status(404).send("ERROR 404: The resource with the ISBN " + request.params.isbn + " does not exist yet.");
        return;
    }
    
    booksList = booksList.map(book => book.isbn == request.params.isbn ? {
        isbn: (request.body.isbn ?? book.isbn),
        title: (request.body.title ?? book.title),
        year: (request.body.year ?? book.year),
        author: (request.body.author ?? book.author)
    } : book);

    fs.writeFileSync("books.json", JSON.stringify(booksList));
    response.status(200).send(request.body);
});

app.get("/lends", (request, response) => {
    const lendsList = JSON.parse(fs.readFileSync("lends.json", "utf-8"));
    response.send(lendsList);
});
app.get("/lends/:id", (request, response) => {
    const lendsList = JSON.parse(fs.readFileSync("lends.json", "utf-8"));
    const lendInfo = lendsList.find(lend => lend.id == request.params.id);
    response.send(lendInfo);
});
app.post("/lends", (request, response) => {
    const lendsList = JSON.parse(fs.readFileSync("lends.json", "utf-8"));
    
    if(lendsList.find(lend => lend.id == request.body.id)){
        console.log("");
        console.log("ERROR 422: Resource with id " + request.body.id + " already exists.");
        response.status(422).send("ERROR 422: Resource with id " + request.body.id + " already exists.");
        return;
    }

    lendsList.push(request.body);
    
    fs.writeFileSync("lends.json", JSON.stringify(lendsList));
    response.status(200).send(request.body);
});

// Listen on port 3000
app.listen(port, ()=>{
    console.log("");
    console.log(`RestAPI app listening on port ${port}`);
});