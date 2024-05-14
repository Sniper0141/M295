import express from 'express';

const port = 3000;
const app = express();

app.get("/now", (request, response) => {
    const today = new Date();
    response.send(today.getTime().toLocaleString("de-CH"));
});

app.get("/zli", (request, response) => {
    const today = new Date();
    console.log(today)
});

app.listen(port, ()=>{
    console.log(`Endpoints app listening on port ${port}`)
})