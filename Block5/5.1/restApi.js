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
        console.log("ERROR 404: The book you are looking for does not exist in our database.");
        response.status(404).send("ERROR 404: The book you are looking for does not exist in our database.");
    }

    console.log("");
    console.log("GET: /books/" + request.params.isbn);
    console.log(bookWithInfo);
});
app.post("/books", (request, response) => {

});
app.get("/books", (request, response) => {

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