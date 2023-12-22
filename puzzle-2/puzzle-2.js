const fs = require('fs');
const { get } = require('http');
fs.readFile('input.txt', (err, data) => {
    if (err) throw err;
    
    let correctGamesIdSum = 0;
    let gamesPowerSum = 0;
    let dataString = data.toString();
    var ret = dataString.replace(/\r/g,"");
    ret = ret.replace(/,/g,"");
    const myLinesArray = ret.split("\n");
    let myGamesArray = [];
    let i = 0;
    while(i < myLinesArray.length){
        let myRoundsArray = myLinesArray[i].split(";");
        myRoundsArray[0] = myRoundsArray[0].split(":")[1];
        for(let j = 0; j < myRoundsArray.length; j++){
            myRoundsArray[j] = myRoundsArray[j].split(" ");
            myRoundsArray[j].shift()
        }
        myGamesArray.push(myRoundsArray);
        i = i + 1;
    }
    let colors = ["blue", "red", "green"];
    for (let i = 0; i < myGamesArray.length; i++){
        let rounds = myGamesArray[i];
        for (let roundIndex = 0; roundIndex < rounds.length; roundIndex++){
            let round = rounds[roundIndex];
            let newRound = {"blue": 0, "red": 0, "green": 0};
            for (let j = 0; j < round.length; j++){
                if (colors.includes(round[j])){
                    newRound[round[j]] = round[j-1];
                };
            };
            myGamesArray[i][roundIndex] = newRound;
        }
        if (checkPossibleResult(myGamesArray[i])){
            correctGamesIdSum = correctGamesIdSum + i + 1
        }
        gamesPowerSum = gamesPowerSum + getGamePower(myGamesArray[i]);
    }
    //console.log(myGamesArray);
    console.log(correctGamesIdSum);
    console.log(gamesPowerSum);
});

function checkPossibleResult(myArray){
    for (let i = 0; i < myArray.length; i++){
        let hand = myArray[i];
        if (hand["blue"] > 14 || hand["red"] > 12 || hand["green"] > 13){
            return (false);
        };
    };
    return (true);
};

function getGamePower(myArray){
    let blueMin = 0;
    let redMin = 0;
    let greenMin = 0;
    for (let i = 0; i < myArray.length; i++){
        let hand = myArray[i];
        if (hand["blue"] > blueMin){
            blueMin = parseInt(hand["blue"]);
        };
        if (hand["red"] > redMin){
            redMin = parseInt(hand["red"]);
        };
        if (hand["green"] > greenMin){
            greenMin = parseInt(hand["green"]);
        };
    };
    return (blueMin * redMin * greenMin);
};