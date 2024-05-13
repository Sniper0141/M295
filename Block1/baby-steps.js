let result = 0;

for(let i = 2; i < process.argv.length; i++){
    if(typeof +process.argv[i] === "number"){
        result += +process.argv[i];
    }
}

console.log(result);