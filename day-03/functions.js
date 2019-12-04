const getIntersections = ( path1, path2 ) => {
    let intersections = [];
    let p1length = path1.length;
    let p2length = path2.length;

    for (let i = 0; i < p1length; i++) {
        for (let j= 0; j < p2length; j++) {
            let point = intersect(path1[i][0][0], path1[i][0][1], path1[i][1][0], path1[i][1][1], path2[j][0][0], path2[j][0][1], path2[j][1][0], path2[j][1][1]);

            if (point) {
                intersections.push(point);
            }
        }
    }

    return intersections;
};

const getIntersectionSteps = ( path1, path2 ) => {
    let stepArray = [];
    let p1length = path1.length;
    let p2length = path2.length;

    for (let i = 0; i < p1length; i++) {
        for (let j= 0; j < p2length; j++) {
            let point = intersect(path1[i][0][0], path1[i][0][1], path1[i][1][0], path1[i][1][1], path2[j][0][0], path2[j][0][1], path2[j][1][0], path2[j][1][1]);

            if (point) {
                let stepx = 0;
                let stepy = 0;
                let slice1 = path1.slice(0, i);
                slice1.push([path1[i][0], point]);

                let slice2 = path2.slice(0, j);
                slice2.push([path2[j][0], point]);

                slice1.forEach(line => {
                    stepx += getFullDistance(line);
                });
                slice2.forEach(line => {
                    stepy += getFullDistance(line);
                });
                stepArray.push([stepx, stepy]);
            }
        }
    }

    return stepArray;
};

const intersect = (x1, y1, x2, y2, x3, y3, x4, y4) => {

    // Check if none of the lines are of length 0
      if ((x1 === x2 && y1 === y2) || (x3 === x4 && y3 === y4)) {
          return false;
      }
  
      let denominator = ((y4 - y3) * (x2 - x1)) - ((x4 - x3) * (y2 - y1));
  
    // Lines are parallel
      if (denominator === 0) {
          return false;
      }
  
      let ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denominator;
      let ub = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / denominator;
  
    // is the intersection along the segments
      if (ua < 0 || ua > 1 || ub < 0 || ub > 1) {
          return false;
      }
  
    // Return an array with the x and y coordinates of the intersection
      let x = x1 + (ua * (x2 - x1));
      let y = y1 + (ua * (y2 - y1));

      if ( !isNaN(x) && !isNaN(y)){
          let array = [ x, y];
        return array;
      }

      return false;
  };

const getDistance = ( input ) => {
    // |x1 - x2| + |y1-y2|
    let distance = Math.abs(input[0]) + Math.abs(input[1]);
    return distance;
};

const getFullDistance = (input) => {
    let distance = Math.abs(input[0][0] - input[1][0]) + Math.abs(input[0][1] - input[1][1]);
    return distance;
}

const getPoints = ( input ) => {
    let steps = input.split(',');

    let directions = [];
    steps.forEach(step => {
        directions.push([step.substring(0,1), parseInt(step.substring(1))]);
    });

    return directions;
};

const getPaths = ( input ) => {
    let length = input.length;
    let path = [];
    let x = 0;
    let y = 0;

    for (let i = 0; i < length; i++) {
        let direction = input[i][0];
        let distance = input[i][1];

        if (direction == 'U') {
            let y2 = y + distance;
            path.push([[x, y], [x, y2]]);
            y = y2;
        } else if (direction == 'D') {
            let y2 = y - distance;
            path.push([[x, y], [x, y2]]);
            y = y2;
        } else if (direction == 'R') {
            let x2 = x + distance;
            path.push([[x, y], [x2, y]]);
            x = x2;

        } else if (direction == 'L') {
            let x2 = x - distance;
            path.push([[x, y], [x2, y]]);
            x = x2;
        }
    }
    return path;
};

const wholeThing = ( input1, input2 ) => {
    let wire1 = getPoints(input1);
    let wire2 = getPoints(input2);

    wire1 = getPaths(wire1);
    wire2 = getPaths(wire2);

    let intersections = getIntersections( wire1, wire2 );
    let minDistance = Infinity;

    intersections.forEach(intersection => {
        let distance = getDistance(intersection);
        if (distance < minDistance && distance > 0) {
            minDistance = distance;
        }
    });
    return minDistance;
};

const wholeStepThing = ( input1, input2 ) => {
    let wire1 = getPoints(input1);
    let wire2 = getPoints(input2);

    wire1 = getPaths(wire1);
    wire2 = getPaths(wire2);

    let steps = getIntersectionSteps( wire1, wire2 );

    return steps[1][0] + steps[1][1];
};
exports.getDistance = getDistance;
exports.getFullDistance = getFullDistance;
exports.getIntersections = getIntersections;
exports.getPoints = getPoints;
exports.getPaths = getPaths;
exports.wholeThing = wholeThing;
exports.wholeStepThing = wholeStepThing;