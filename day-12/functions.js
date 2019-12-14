const parseMoons = input => {
    return input.split('\n').map(line =>
        line.match(/<x=(-?\d+), y=(-?\d+), z=(-?\d+)>/u)
        .slice(1)
        .map(Number)
    ).map(([x,y,z]) => ({ pos: {x, y, z }, vel: { x: 0, y:0, z:0} }));
};

const DIMS = ['x', 'y', 'z'];

const applyGravity = moons => {
  moons.forEach(moon =>
    moons
      .filter(m => m !== moon)
      .forEach(other =>
        DIMS.forEach(
          dim =>
            (moon.vel[dim] +=
              moon.pos[dim] < other.pos[dim] ? 1 : moon.pos[dim] > other.pos[dim] ? -1 : 0)
        )
      )
  );
  return moons;
};

const applyVelocity = moons => {
  moons.forEach(moon => DIMS.forEach(dim => (moon.pos[dim] += moon.vel[dim])));
  return moons;
};

const applyStep = moons => {
    moons = applyGravity(moons);
    moons = applyVelocity(moons);
    return moons;
};

const applyNSteps = (moons, n) => {
    for (let i = 0; i < n; i++) {
        moons = applyStep(moons);
    }
    return moons;
};

const getPotentialEnergy = ({ pos }) => {
    return DIMS.map(dim => Math.abs(pos[dim])).reduce((a,b) => a + b);
};

const getKineticEnergy = ({ vel }) => {
    return DIMS.map(dim => Math.abs(vel[dim])).reduce((a,b) => a + b);
};

const getTotalEnergy = moon => {
    return getPotentialEnergy(moon) * getKineticEnergy(moon);
};

const gcd = (a, b) => (a ? gcd(b % a, a) : b);

const lcm = (a, b) => (a * b) / gcd(a, b);


const getTimeToRepeat = moons => {
    moons.forEach(moon => (moon.start = { pos: { ...moon.pos }, vel: { ...moon.vel } }));
    const repeat = {};
    for (let i = 1; DIMS.some(dim => !repeat[dim]); i++) {
      applyStep(moons);
      DIMS.filter(
        dim =>
          !repeat[dim] &&
          moons.every(
            moon => moon.pos[dim] === moon.start.pos[dim] && moon.vel[dim] === moon.start.vel[dim]
          )
      ).forEach(dim => (repeat[dim] = i));
    }
    return DIMS.map(d => repeat[d]).reduce(lcm);
  };

exports.parseMoons = parseMoons;
exports.applyGravity = applyGravity;
exports.applyVelocity = applyVelocity;
exports.applyStep = applyStep;
exports.applyNSteps = applyNSteps;
exports.getTotalEnergy = getTotalEnergy;
exports.getTimeToRepeat = getTimeToRepeat;