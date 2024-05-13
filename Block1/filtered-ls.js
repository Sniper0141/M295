const fs = require('fs');
const path = require('path');

let result = [];

fs.readdir(process.argv[2], function callback (err, list) {
    if(err != null){
        console.log(err);
    }
    else{
        for(let i = 0; i < list.length; i++){
            if(path.extname(list[i]) == process.argv[3]){
                result.push(list[i])
            }
        }
    }
});

console.log(result)

/* BTW, FUNKTIONIERT NICHT */