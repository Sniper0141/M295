import express from 'express';

const port = 3000;
const app = express();
const router = express.Router()

app.get("/now", (request, response) => {
    const today = new Date();
    response.send(today.getTime().toLocaleString("de-CH"));
});

app.get("/zli", (request, response) => {
    response.redirect("https://www.zli.ch/");
});

app.get("/name", (request, response) => {
    const randomNumber = Math.floor(Math.random() * 10);

    let name;
    switch(randomNumber){
        case 0:
            name = "Živko Dušan";
            break;
        case 1:
            name = "Biljana Filip";
            break;
        case 2:
            name = "Nikolina Vukašin";
            break;
        case 3:
            name = "Filip Đorđe";
            break;
        case 4:
            name = "Agata Anja";
            break;
        case 5:
            name = "Plamen Vojislava";
            break;
        case 6:
            name = "Ljiljana Tomislav";
            break;
        case 7:
            name = "Bojana Mirka";
            break;
        case 8:
            name = "Isaija Viktorija";
            break;
        case 9:
            name = "Spiridon Slavomir";
            break;
        default:
            name = "bez imena";
    }

    response.send(name);
});

app.listen(port, ()=>{
    console.log(`Endpoints app listening on port ${port}`)
})