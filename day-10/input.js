const fs = require('fs');
import { getAsteroids, getTargets, get200th } from './functions';

let data = fs.readFileSync('./day-10/input.txt').toString();
let targets = getTargets(data, {x:23, y:29});

console.log(getAsteroids(data));
console.log(get200th(targets));