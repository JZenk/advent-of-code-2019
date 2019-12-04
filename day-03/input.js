const fs = require('fs');
import { wholeThing, wholeStepThing } from './functions';

let text;
text = fs.readFileSync('./day-03/input.txt');
let wires = text.toString().split("\n");
let wire1 = wires[0];
let wire2 = wires[1];

try {
    console.log("Shortest distance: " + wholeThing(wire1, wire2));
    console.log("Fewest steps: " + wholeStepThing(wire1, wire2));

} catch (e) {
    console.log('Error! ', e.stack);
}