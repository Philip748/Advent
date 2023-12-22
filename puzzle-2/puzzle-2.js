const fs = require('fs')
fs.readFile('input.txt', (err, data) => {
    if (err) throw err;
    
    let dataString = data.toString();
    var ret = dataString.replace(/\r/g,"");
    const myLinesArray = ret.split("\n");
    let myGamesArray = [];
    let i = 0;
    while(i < myLinesArray.length){
        let myRoundsArray = myLinesArray[i].split(";");
        myRoundsArray[0] = myRoundsArray[0].split(":")[1];
        myGamesArray.push(myRoundsArray);
        i = i + 1;
    }
    console.log(myGamesArray);
});