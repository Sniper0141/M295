function verdoppeln(zahl, callback){
    callback(zahl * 2);
}

verdoppeln(2, function(result){
    console.log("Das Ergebnis ist " + result);
});