import express from 'express';
const port = 3000

const app = express();
let url ="https://app-prod-ws.meteoswiss-app.ch/v1/plzDetail?plz=";

app.get("/:zip", async (browserRequest,response) => {
    const zip = browserRequest.params.zip;
    const weatherData = await fetch(url+zip+"00")
    const data = await weatherData.json()
        console.log(data);
        response.send(data);})

app.listen(port, ()=>{
    console.log(`Example app listening on port ${port}`)
})