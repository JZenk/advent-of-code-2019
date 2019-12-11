const getAsteroids = input => {
    const asteroids = input.split('\n').reduce((objects, line, y) => {
        line.trim().split('').forEach((space, x) => {
            if (space == '#') {
                objects.push({ x, y });
            }
        });
        return objects;
    }, []);
    return asteroids
    .map(({ x: x1, y: y1 }) => {
      const angles = new Set();

      asteroids.forEach(({ x: x2, y: y2 }) => {
        if (!(x1 === x2 && y1 === y2)) {
          angles.add(Math.atan2(y2 - y1, x2 - x1));
        }
      });

      return {
        asteroids: angles.size,
        x: x1,
        y: y1,
      };
    })
    .sort((a, b) => b.asteroids - a.asteroids)[0];
};

const getTargets = (input, stationCoords = { x:0, y:0 }) => {
    const { x: x1, y: y1 } = stationCoords;

    let targets = input.split('\n').reduce((objects, line, y2) => {
        line.trim().split('').forEach((space, x2) => {
            if (space == '#' && !(x1 == x2 && y1 == y2)) {
                objects.push({
                    x: x2,
                    y: y2,
                    degrees: Math.atan2(y2-y1, x2-x1) * (180 / Math.PI),
                    distance: Math.hypot(x1 - x2, y1 - y2),
                });
            }
        });
        return objects;
    }, [])
    .sort((a, b) => a.degrees - b.degrees);

    return targets;
};

const get200th = targets => {
    const targetDegrees = [...new Set(targets.map(({ degrees }) => degrees))];

    let currentDegrees = targetDegrees.findIndex((degrees) => degrees === -90);
    let counter = 0;

    while (targets.length) {
        const target = targets.filter(({ degrees }) => degrees === targetDegrees[currentDegrees])
            .sort((a, b) => a.distance - b.distance)[0];

        if (target) {
            targets = targets.filter(({ x, y }) => !(x === target.x && y === target.y));

            if (++counter === 200) {
                return target.x * 100 + target.y;
            }
        }
        currentDegrees = currentDegrees < targetDegrees.length ? currentDegrees + 1 : 0;
    }
};

exports.getAsteroids = getAsteroids;
exports.getTargets = getTargets;
exports.get200th = get200th;