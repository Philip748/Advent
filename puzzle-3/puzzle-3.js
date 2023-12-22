var myLinesArray = [];
var foundNums = [];
var nums = ["1","2","3","4","5","6","7","8","9","0"];
var gears = {};

const fs = require('fs')
fs.readFile('input.txt', (err, data) => {
    if (err) throw err;
    
    let dataString = data.toString();
    myLinesArray = dataString.split("\n");

    let y = 0;
    while(y < myLinesArray.length){
        let x = 0;
        while(x < myLinesArray[y].length){
            if (myLinesArray[y].charAt(x) == "*"){
                gears[y.toString() + " " + x.toString()] = [];
            };
            x++;
        }
        y++;
    }

    let i = 0;
    while(i < myLinesArray.length){
        let line = myLinesArray[i]
        let j = 0;
        while(j < line.length){
            if (nums.includes(line.charAt(j))){
                identifyNum(i,j);
                j = j + foundNums[foundNums.length-1]["num"].length - 1;
            }
            j++;
        }
        i = i + 1;
    }

    //console.log(foundNums);
    //console.log(gears);

    let sumOfTouching = 0;
    for(let i = 0; i < foundNums.length; i++){
        if (foundNums[i]["touching"]){
            sumOfTouching += parseInt(foundNums[i]["num"]);
        }
    }
    console.log(sumOfTouching)

    let gearRatioSum = 0
    for (const [key, value] of Object.entries(gears)) {
        console.log(key, value);
        if (value.length == 2){
            let v0 = 0;
            let v1 = 0;
            for(let i = 0; i < foundNums.length; i++){
                if (foundNums[i]["cords"] == value[0]){
                    v0 = parseInt(foundNums[i]["num"])
                }
                if (foundNums[i]["cords"] == value[1]){
                    v1 = parseInt(foundNums[i]["num"])
                }
            }
            gearRatioSum += v0 * v1
        }
    }
    console.log(gearRatioSum);
});

function identifyNum(y,x){
    let point = x;
    let num = myLinesArray[y][x];
    let checking = true;
    let touchingSymbol = false;
    let numCords = y.toString() + " " + x.toString()
    if(checkForSurroundingSymbol(y,x)){
        touchingSymbol = true;
    }
    checkForSurroundingGear(y, x, numCords)
    while(checking){
        if(point < myLinesArray[y].length - 1){
            point++;
            if(nums.includes(myLinesArray[y][point])){
                checkForSurroundingGear(y, point, numCords)
                num += myLinesArray[y][point];
                if(checkForSurroundingSymbol(y,point)){
                    touchingSymbol = true;
                }
            }
            else {
                checking = false;
            };
        }
        else {
            checking = false;
        };
    };
    foundNums.push({"x":x, "y":y, "num":num, "touching": touchingSymbol, "cords": numCords});
};

function checkForSurroundingSymbol(y, x){
    let maxY = myLinesArray.length - 1;
    let maxX = myLinesArray[y].length - 2;
    if (y > 0){
        if (x > 0){
            if(isSymbol(y-1, x-1)){
                return (true);
            }
        }
        if(isSymbol(y-1, x)){
            return (true);
        }
        if (x < maxX){
            if(isSymbol(y-1, x+1)){
                return (true);
            };
        };
    };
    if (x > 0){
        if(isSymbol(y, x-1)){
            return (true);
        };
    };
    if (x < maxX){
        if(isSymbol(y, x+1)){
            return (true);
        };
    };
    if (y < maxY){
        if (x > 0){
            if(isSymbol(y+1, x-1)){
                return (true);
            };
        };
        if(isSymbol(y+1, x)){
            return (true);
        };
        if (x < maxX){
            if(isSymbol(y+1, x+1)){
                return (true);
            };
        };
    };
    return (false);
}

function isSymbol(y, x){
    let nonsymbol = [".","1","2","3","4","5","6","7","8","9","0"];
    if (nonsymbol.includes(myLinesArray[y][x])){
        return (false);
    }
    else {
        return (true);
    };
};

function checkForSurroundingGear(y, x, numCords){
    let maxY = myLinesArray.length - 1;
    let maxX = myLinesArray[y].length - 2;
    if (y > 0){
        if (x > 0){
            isGear(y-1, x-1, numCords)
        }
        isGear(y-1, x, numCords)
        if (x < maxX){
            isGear(y-1, x+1, numCords)
        };
    };
    if (x > 0){
        isGear(y, x-1, numCords)
    };
    if (x < maxX){
        isGear(y, x+1, numCords)
    };
    if (y < maxY){
        if (x > 0){
            isGear(y+1, x-1, numCords)
        };
        isGear(y+1, x, numCords)
        if (x < maxX){
            isGear(y+1, x+1, numCords);
        };
    };
}

function isGear(y, x, numCords){
    //console.log(myLinesArray[y][x], myLinesArray[y][x] == '*')
    if (myLinesArray[y][x] == '*'){
        //console.log(y.toString() + " " + x.toString(), gears[y.toString() + " " + x.toString()])
        if(gears[y.toString() + " " + x.toString()] != null){
            if(!gears[y.toString() + " " + x.toString()].includes(numCords)){
                //console.log("found at " + y.toString() + " " + x.toString());
                gears[y.toString() + " " + x.toString()].push(numCords);
                //console.log("added " + numCords);
            }
            //console.log(y.toString() + " " + x.toString(), gears)
        }
    }
};
