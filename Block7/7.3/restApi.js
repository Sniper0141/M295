import fs from 'fs'
import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import swaggerAutogen from 'swagger-autogen';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger-output.json' with { type: 'json' };

const port = 3000;
const app = express();

var options = {
    swaggerOptions: {
        url: 'localhost:3000/swagger.json'
    }
}

app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));

// auth
let authenticated = false;
let userEmail;
let userPassword;

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
    if(!authenticated){
        response.status(401).send("ERROR 401: Not authenticated.")
        return;
    }

    const lendsList = JSON.parse(fs.readFileSync("lends.json", "utf-8"));
    response.send(lendsList);
});
app.get("/lends/:id", (request, response) => {
    if(!authenticated){
        response.status(401).send("ERROR 401: Not authenticated.")
        return;
    }

    const lendsList = JSON.parse(fs.readFileSync("lends.json", "utf-8"));
    const lendInfo = lendsList.find(lend => lend.id == request.params.id);
    response.send(lendInfo);
});
app.post("/lends", (request, response) => {
    if(!authenticated){
        response.status(401).send("ERROR 401: Not authenticated.")
        return;
    }
    
    if(!request.body || !request.body.customer_id || !request.body.isbn || request.body.isbn){
        console.log("");
        console.log("ERROR 422: Faulty data.");
        response.status(422).send("ERROR 422: Faulty data.");
        return;
    }

    const lendsList = JSON.parse(fs.readFileSync("lends.json", "utf-8"));
    let newLend = request.body;
    newLend.id = request.body.id ?? uuidv4();
    newLend.borrowed_at = request.body.borrowed_at ?? new Date().toLocaleString("de-CH");

    if(lendsList.find(lend => lend.id == newLend.id)){
        console.log("");
        console.log("ERROR 422: Resource with id " + newLend.id + " already exists.");
        response.status(422).send("ERROR 422: Resource with id " + newLend.id + " already exists.");
        return;
    }

    lendsList.push(newLend);
    
    fs.writeFileSync("lends.json", JSON.stringify(lendsList));
    response.status(200).send(newLend);
});
app.delete("/lends/:id", (request, response) => {
    if(!authenticated){
        response.status(401).send("ERROR 401: Not authenticated.")
        return;
    }

    let lendsList = JSON.parse(fs.readFileSync("lends.json", "utf-8"));
    let turnedInLend = lendsList.find(lend => lend.id == request.params.id)

    if(!turnedInLend){
        console.log("");
        console.log("ERROR 404: Resource with id " + request.params.id + " does not exist.");
        response.status(404).send("ERROR 404: Resource with id " + request.params.id + " does not exist.");
        return;
    }
    if(turnedInLend.returned_at){
        console.log("");
        console.log("ERROR 400: Resource with id " + request.params.id + " has already been turned in!");
        response.status(400).send("ERROR 400: Resource with id " + request.params.id + " has already been turned in!");
        return;
    }

    turnedInLend.returned_at = new Date().toLocaleString("de-CH");
    lendsList = lendsList.map(lend => lend.id == request.params.id ? turnedInLend : lend);
    
    fs.writeFileSync("lends.json", JSON.stringify(lendsList));
    response.status(200).send("The resource with id " + request.params.id + " has been turned in.");
});

// Session
app.post("/login", (request, response) => {    
    if(!request.body.email || !request.body.password){
        response.status(400).send("ERROR 400: Invalid input data.");
        return;
    }
    if(!validateLogin(request.body.email, request.body.password)){
        response.status(400).send("ERROR 400: Invalid input data.");
        return;
    }

    authenticated = true;
    userEmail = request.body.email;
    userPassword = request.body.password;
    response.status(201).send({ email: userEmail, password: userPassword });
});
app.get("/verify", (request, response) => {
    if(!authenticated){
        response.status(401).send("ERROR 401: Not authenticated.")
        return;
    }

    response.status(200).send(userEmail + " " + userPassword);
});
app.delete("/logout", (request, response) => {
    if(!authenticated){
        response.status(400).send("ERROR 400: Alread logged out.")
    }

    authenticated = false;
    userEmail = null;
    userPassword = null;

    response.status(204).send();
});

function validateLogin(email, password){
    if(email == "desk@library.example" && password == "m295"){
        return true;
    }

    return false;
}


// Listen on port 3000
app.listen(port, ()=>{
    console.log("");
    console.log(`RestAPI app listening on port ${port}`);
});

/*
// Swagger docs
*/
const doc = {
    info: {
        title: 'Library',
        description: 'Meine tolle Bibliothek API'
    },
    host: 'localhost:3000'
};
const outputfile = "./swagger-output.json";
const routes = ["./restApi.js"];

swaggerAutogen()(outputfile, routes, doc);