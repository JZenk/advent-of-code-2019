const fs = require('fs');
import { intCode, parseInput } from './functions';

let data = fs.readFileSync('./day-09/input.txt');
let software = parseInput(data);

const run = mode => [...intCode(software, mode)].pop();

console.log('BOOST keycode: ' + run(1));
console.log('Coordinates: ' + run(2));