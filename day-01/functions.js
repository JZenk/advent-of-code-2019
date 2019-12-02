const getFuel = ( mass ) => {
    let fuel = Math.floor(mass /3) - 2;
    return fuel;
};

const getFuelMass = ( mass ) => {

    let total = getFuel(mass);
    let step = total;

    while (step >= 9) {
        step = getFuel(step);
        total += step;
    }

    return total;
};

exports.getFuel = getFuel;
exports.getFuelMass = getFuelMass;