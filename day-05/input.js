const fs = require('fs');
import { run } from './functions';

let text;
text = fs.readFileSync('./day-05/input.txt');

const parseInput = () => text.toString().split(',').map(Number);

console.log('Part 1: ' + run(parseInput(), 1).pop());
console.log('Part 2: ' + run(parseInput(), 5).pop());