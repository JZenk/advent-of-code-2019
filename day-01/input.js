const fs = require('fs');
import { getFuel, getFuelMass } from './functions';

let text;
text = fs.readFileSync('./day-01/input.txt');
let textArray = text.toString().split('\n');
 
try {
  let result = textArray.reduce( ( p, c ) => p + getFuel(c), 0 );
  console.log('Fuel ' + result);
  let massResult = textArray.reduce( ( p, c ) => p + getFuelMass(c), 0 );
  console.log('Fuel + Mass: ' + massResult);
} catch (e) {
  console.log('Error! ', e.stack);
}