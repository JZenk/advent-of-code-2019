const fs = require('fs');
import { parseMoons, applyNSteps, getTotalEnergy, getTimeToRepeat } from "./functions";

try {
    const read = fs.readFileSync("./day-12/input.txt");
    let moons = parseMoons(read.toString());
    moons = applyNSteps(moons, 1000);
    let energy = 0;
    moons.forEach(moon => {
        energy += getTotalEnergy(moon);
    });

    console.log('Total energy: ' + energy);
    moons = parseMoons(read.toString());
    let time = getTimeToRepeat(moons);
    console.log('Steps to repeat: ' + time);

}
catch {
    console.log('Error!');
}
