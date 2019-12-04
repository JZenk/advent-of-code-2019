const passwordFacts = ( input1, input2 ) => {
    let meets = 0;

    for (let i = input1; i <= input2; i++) {

        if ( doesIncrease(i) ) {
            if ( doesRepeat(i) ) {
                meets++;
            }
        }
    }
    return meets;
};

const strictPasswordFacts = ( input1, input2 ) => {
    let meets = 0;

    for (let i = input1; i <= input2; i++) {

        if ( doesIncrease(i) ) {
            if ( doesRepeated(i) ) {
                meets++;
            }
        }
    }
    return meets;
};

const doesIncrease = ( input ) => {
    let inc = false;
    let stringy = input.toString().split('');

    for(let i = 1; i < stringy.length; i++) {
        if (stringy[i] >= stringy[i-1]) {
            inc = true;
        } else {
            if (inc) {
                inc = false;
                break;
            }
            break;
        }
    }
    return inc;
};

const doesRepeat = ( input ) => {
    let repeat = false;
    let stringy = input.toString().split('');

    for(let i = 1; i < stringy.length; i++) {
        if (stringy[i] == stringy[i-1]) {
            repeat = true;
        }
    }
    return repeat;
};

const doesRepeated = ( input ) => {
    let prevNumber;
    let doublesMap = {};
    let stringy = input.toString().split('').map(n => Number.parseInt(n));

    stringy.forEach(number => {
        if (prevNumber !== undefined) {
            if (prevNumber === number) {
              doublesMap[number] = doublesMap[number] || 1;
              doublesMap[number]++;
            }
        }
        prevNumber = number;
    });
    let result = Object.values(doublesMap).filter(n => n === 2).length > 0;
    return result;
};

exports.doesIncrease = doesIncrease;
exports.doesRepeat = doesRepeat;
exports.doesRepeated = doesRepeated;
exports.passwordFacts = passwordFacts;
exports.strictPasswordFacts = strictPasswordFacts;