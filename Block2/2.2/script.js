const fs = require('node:fs');

function leseDateiInhalt(filepath){
    return new Promise((resolve, reject) => {
        const fileContent = fs.readFileSync(filepath).toString();
    
        if(fileContent === null || fileContent === ""){
            reject(new Error("Somethig went wrong..."));
        }
        else{
            resolve(fileContent.split("\n").length - 1);
        }
    });
} 

leseDateiInhalt("script.js")
.then(data => {
    return data
})
.then(data => console.log(data))
.catch(error => console.log(error));