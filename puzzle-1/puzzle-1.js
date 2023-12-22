const fs = require('fs')
fs.readFile('input.txt', (err, data) => {
    if (err) throw err;
    
    let dataString = data.toString();
    const myLinesArray = dataString.split("\n");
    let myNumsArray = [];
    console.log(myLinesArray[0]);
    console.log(getFirstAndLastNum(myLinesArray[0]));

    let i = 0;
    let count = 0;
    while (i < myLinesArray.length){
        myNumsArray.push(getFirstAndLastNum(myLinesArray[i]));
        count = count + parseInt(getFirstAndLastNum(myLinesArray[i]));
        i = i + 1;
    };
    console.log(myNumsArray);
    console.log(count);
});

function getFirstAndLastNum(str){
    let firstNum = '';
    let lastNum = '';
    const nums = ['1','2','3','4','5','6','7','8','9','0'];

    let i = 0;
    while (i < str.length){
        let num = identifyNum(str, i);
        if (num != ''){
            if (firstNum == ''){
                firstNum = num;
                lastNum = num;
            }
            else{
                lastNum = num;
            };
        }
        i = i + 1;
    };
    return (firstNum + lastNum);
};

function identifyNum(str, i){
    const nums = ['1','2','3','4','5','6','7','8','9','0'];
    if (nums.includes(str.charAt(i))){
            return (str.charAt(i));
    }
    else{
        if (str.length - i >= 3){
            if (str.charAt(i) + str.charAt(i+1) + str.charAt(i+2) == 'one'){ return '1' };
            if (str.charAt(i) + str.charAt(i+1) + str.charAt(i+2) == 'two'){ return '2' };
            if (str.charAt(i) + str.charAt(i+1) + str.charAt(i+2) == 'six'){ return '6' };
        };
        if (str.length - i >= 4){
            if (str.charAt(i) + str.charAt(i+1) + str.charAt(i+2) + str.charAt(i+3) == 'zero'){ return '0' };
            if (str.charAt(i) + str.charAt(i+1) + str.charAt(i+2) + str.charAt(i+3) == 'four'){ return '4' };
            if (str.charAt(i) + str.charAt(i+1) + str.charAt(i+2) + str.charAt(i+3) == 'five'){ return '5' };
            if (str.charAt(i) + str.charAt(i+1) + str.charAt(i+2) + str.charAt(i+3) == 'nine'){ return '9' };
        };
        if (str.length - i >= 4){
            if (str.charAt(i) + str.charAt(i+1) + str.charAt(i+2) + str.charAt(i+3) + str.charAt(i+4) == 'three'){ return '3' };
            if (str.charAt(i) + str.charAt(i+1) + str.charAt(i+2) + str.charAt(i+3) + str.charAt(i+4) == 'seven'){ return '7' };
            if (str.charAt(i) + str.charAt(i+1) + str.charAt(i+2) + str.charAt(i+3) + str.charAt(i+4) == 'eight'){ return '8' };
        };
    };
    return ('');
};