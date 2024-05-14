import fs from 'fs'
import express from 'express';

const port = 3000;
const app = express();

// Endpoints

app.get("/now", (request, response) => {
    const today = new Date();
    response.send(today.getTime().toLocaleString("de-CH", { timeZone: request.params.tz }));
});

app.get("/zli", (request, response) => {
    response.redirect("https://www.zli.ch/");
});

app.get("/name", (request, response) => {
    const namesListJson = JSON.parse(fs.readFileSync("namesList.json", "utf8"));
    const randomNumber = Math.floor(Math.random() * 10);
    response.send(namesListJson[randomNumber]);
});

app.get("/html", (request, response) => {
    response.sendFile("C:/Users/saids/OneDrive - bbw.ch/Desktop/Schule/ÜKs/Files/ZLI_ÜK_M295/M295/Block3/3.3/haha.html");
});

// Listen on Port 3000

app.listen(port, ()=>{
    console.log(`Endpoints app listening on port ${port}`)
})