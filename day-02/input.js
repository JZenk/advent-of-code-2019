const fs = require('fs');
import { gravityAssist } from './functions';

let text;
text = fs.readFileSync('./day-02/input.txt');
let origArray = text.toString().split(',');
let textArray = origArray;

try {
    textArray[1] = 12;
    textArray[2] = 2;
    let result = gravityAssist(textArray);
    console.log('Program output: ' + result[0]);

    for (let i = 0; i < 100; i++) {
        for (let j = 0; j < 100; j++) {
            let mutArray = origArray;
            mutArray[1] = i;
            mutArray[2] = j;

            if (gravityAssist(mutArray)[0] == 19690720) {
                console.log('Noun: ' + i + ' Verb: ' + j);
                let answer = 100 * i + j;
                console.log('Result: ' + answer);
                break;
            }
        }
    }
} catch (e) {
    console.log('Error! ', e.stack);
}