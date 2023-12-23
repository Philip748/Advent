const fs = require('fs');
const { get } = require('http');

var dictList = [];

fs.readFile('input.txt', (err, data) => {
    if (err) throw err;
    
    
    let dataString = data.toString();
    dataString = dataString.replace(/\r/g,"");
    let dataStringLines = dataString.split("\n");
    for(let i = 0; i < dataStringLines.length; i++){
        dataStringLines[i] = dataStringLines[i].split(":");
        dataStringLines[i][1] = dataStringLines[i][1].split("|");

        dataStringLines[i][1][0] = dataStringLines[i][1][0].split(" ").map(num => num.trim()).filter(Boolean);
        dataStringLines[i][1][1] = dataStringLines[i][1][1].split(" ").map(num => num.trim()).filter(Boolean);

        dictList.push({"game" : dataStringLines[i][0], "winners": dataStringLines[i][1][0], "numbers": dataStringLines[i][1][1], "overlapCount": countOverlap(dataStringLines[i][1][0], dataStringLines[i][1][1]), "cardNum": 1});
    };
    //console.log(dictList);

    let winSum = 0;
    for(let i = 0; i < dictList.length; i++){
        if(dictList[i]["overlapCount"]>0){
            //console.log("2 ** " + dictList[i]["overlapCount"] + " = " + 2 ** (dictList[i]["overlapCount"]-1));
            winSum += 2 ** (dictList[i]["overlapCount"]-1);
        };
    };
    console.log(winSum);

    for(let i = 0; i < dictList.length; i++){
        let c = 1;
        while (c <= dictList[i]['overlapCount']){
            if(i+c < dictList.length){
                dictList[i+c]["cardNum"] += dictList[i]["cardNum"]
            }
            c++;
        }
    };
    //console.log(dictList);

    let cardSum = 0;
    for(let i = 0; i < dictList.length; i++){
        cardSum += dictList[i]["cardNum"]
    }
    console.log(cardSum);
});

function countOverlap(str1, str2){
    let count = 0;
    for(let i = 0; i < str1.length; i++){
        if(str2.includes(str1[i])){
            count++;
        };
    };
    return count;
};