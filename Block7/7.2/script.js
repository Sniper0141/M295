import { createRequire } from "module";
const require = createRequire(import.meta.url);

import express from 'express';
const session = require('express-session')
const app = express();
const port = 3000;

app.use(session({
    secret: 'supersecret',
      resave: false,
      saveUninitialized: true,
    cookie: {}
}));
app.use(express.json());

app.post("/name", (req, res) => {

    const { name } = req.body;

    if(!name){
        res.status(400).send("ERROR 400: Bad request.");
        return;
    }

    req.session.name = name;
    res.send("Name '" + name + "' saved in session");
});
app.get("/name", (request, response) => {
    if(!request.session.name){
        response.status(404).send("ERROR 404: Name could not be found.");
        return;
    }

    console.log(request.session.name);
    response.send(request.session.name);
});

app.listen(port, () => {
    console.log(`Session app listening on port ${port}`);
});