const fs = require('fs');

const fileContent = fs.readFileSync(process.argv[2]).toString();
var contentArray = fileContent.split("\n")
console.log(contentArray.length - 1)