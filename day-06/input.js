const fs = require('fs');
import { parseInput, getSystem, dijkstra, getGraph } from './functions';

let data = fs.readFileSync('./day-06/input.txt');
let orbits = parseInput(data);

console.log('Total orbits: ' + getSystem(orbits));
console.log('Distance to Santa: ' + (dijkstra(getGraph(orbits), 'YOU')[0].get('SAN') - 2));