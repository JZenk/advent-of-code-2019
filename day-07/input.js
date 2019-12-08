const fs = require('fs');
import { getSignal, parseInput } from './functions';

let data = fs.readFileSync('./day-07/input.txt');
let software = parseInput(data);

console.log('Max signal: ' + getSignal(software));