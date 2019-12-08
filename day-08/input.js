const fs = require('fs');
import { fewestZeros, getLayers, getPixels, getImage } from './functions';

let data = fs.readFileSync('./day-08/input.txt');
let layers = getLayers(data.toString(), 25, 6);
let pixels = getPixels(layers, 25, 6);
let image = getImage(pixels, 25, 6);

let checkLayer = fewestZeros(layers)[0];

console.log('Image checksum: ' + (checkLayer.ones * checkLayer.twos));
console.log(image);