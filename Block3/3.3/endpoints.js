import fs from 'fs'
import express, { response } from 'express';

const port = 3000;
const app = express();

app.use(express.json());

/*
// Endpoints
*/

// now
app.get("/now", (request, response) => {
    const today = new Date();
    response.send(today.getTime().toLocaleString("de-CH", { timeZone: request.params.tz }));
});

// zli
app.get("/zli", (request, response) => {
    response.redirect("https://www.zli.ch/");
});

// name
app.get("/name", (request, response) => {
    const namesListJson = JSON.parse(fs.readFileSync("namesList.json", "utf8"));
    const randomNumber = Math.floor(Math.random() * namesListJson.length);
    response.send(namesListJson[randomNumber]);
});
app.post("/names", (request, response) => {
    let namesListJson = JSON.parse(fs.readFileSync("namesList.json", "utf8"));
    namesListJson.push(request.query.name);
    fs.writeFileSync("namesList.json", JSON.stringify(namesListJson));

    response.send('Name "' + request.query.name + '" has been added.');
    console.log('Name "' + request.query.name + '" has been added.');
});
app.delete("/names", (request, response) => {
    let namesListJson = JSON.parse(fs.readFileSync("namesList.json", "utf8"));
    namesListJson = namesListJson.filter(name => name !== request.query.name);
    fs.writeFileSync("namesList.json", JSON.stringify(namesListJson));
    response.send('Name "' + request.query.name + '" has been removed.');
    console.log('Name "' + request.query.name + '" has been removed.');
});

// html
app.get("/html", (request, response) => {
    response.sendFile("C:/Users/saids/OneDrive - bbw.ch/Desktop/Schule/ÜKs/Files/ZLI_ÜK_M295/M295/Block3/3.3/haha.html");
});

// image
app.get("/image", (request, response) => {
    response.sendFile("C:/Users/saids/OneDrive - bbw.ch/Desktop/Schule/ÜKs/Files/ZLI_ÜK_M295/M295/Block3/3.3/bird.jpg");
});

// teapot
app.get("/teapot", (request, response) => {
    response.status(418).send("Im a teapot. (error 418)");
});

// user-agent
app.get("/user-agent", (request, response) => {
    response.send(request.headers['user-agent']);
});

// secret
app.get("/secret", (request, response) => {
    response.status(403).send("This page is forbidden. (error 403)");
});
app.get("/secret2", (request, response) => {
    if(request.headers.authorization == "Basic aGFja2VyOjEyMzQ="){
        response.status(200).send("oge (200)");
    }
    else{
        response.status(401).send("no. (401)");
    }
});

// xml
app.get("/xml", (request, response) => {
    response.sendFile("C:/Users/saids/OneDrive - bbw.ch/Desktop/Schule/ÜKs/Files/ZLI_ÜK_M295/M295/Block3/3.3/file.xml");
});

//me
app.get("/me", (request, response) => {
    const meObj = JSON.parse(fs.readFileSync("me.json", "utf-8"));
    response.send(meObj);
});
app.patch("/me", (request, response) => {
    fs.writeFileSync("me.json", JSON.stringify(request.body));
    response.status(201).send("The resource has been patched. (201)");
});

// chuck
app.get("/chuck", async (request, response) => {
    let jokeResponse = await fetch("https://api.chucknorris.io/jokes/random");
    const jokeJson = await jokeResponse.json();
    let joke = jokeJson.value;

    if(request.query.name){
        joke = joke.replace("Chuck Norris", request.query.name);
    }

    response.send(joke);
});

/*
// Listen on port 3000
*/

app.listen(port, ()=>{
    console.log(`Endpoints app listening on port ${port}`)
});