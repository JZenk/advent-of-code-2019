import test from 'ava';
import { getDistance, getPoints, getPaths, getIntersections, getFullDistance, wholeThing, wholeStepThing } from './functions';

test('Distance from [3,3]', t=> {
    t.is(getDistance([3,3]), 6);
});

test('Full distance', t=> {
    t.is(getFullDistance([[0,3],[0,5]]), 2);
});

test('Full distance w/negative numbers', t=> {
    t.is(getFullDistance([[0,3],[0,-2]]), 5);
});

test ('Convert string to array of points', t=> {
    let path = 'R8,U5,L5,D3';
    let answer = [['R',8],['U',5],['L',5],['D',3]];
    t.deepEqual(getPoints(path), answer);
});

test ('Convert second string to array of points', t=> {
    let path = 'U7,R6,D4,L4';
    let answer = [['U',7],['R',6],['D',4],['L',4]];
    t.deepEqual(getPoints(path), answer);
});

test ('Create line from points', t=> {
    let path = [['R',8],['U',5],['L',5],['D',3]];
    let answer = [[[0,0],[8,0]],[[8,0],[8,5]],[[8,5],[3,5]],[[3,5],[3,2]]];
    t.deepEqual(getPaths(path), answer);
});

test ('Create second line from points', t=> {
    let path = [['U',7],['R',6],['D',4],['L',4]];
    let answer = [[[0,0],[0,7]],[[0,7],[6,7]],[[6,7],[6,3]],[[6,3],[2,3]]];
    t.deepEqual(getPaths(path), answer);
});

test ('Simple intersection', t=> {
    let line1 = [[[0,0], [10,10]]];
    let line2 = [[[10,0], [0,10]]];
    t.deepEqual(getIntersections(line1, line2), [[5,5]]);
});

test ('No intersection', t=> {
    let line1 = [[[0,0], [8,8]]];
    let line2 = [[[1,1], [7,7]]];
    t.deepEqual(getIntersections(line1, line2), []);
});

test ('Same starting point', t=> {
    let line1 = [[[0,0], [8,8]]];
    let line2 = [[[0,0], [7,7]]];
    t.deepEqual(getIntersections(line1, line2), []);  
});

test ('Line 1 is longer', t=> {
    let line1 = [[[0,0], [8,8]], [[8,8], [4,4]]];
    let line2 = [[[0,0], [7,7]]];
    t.deepEqual(getIntersections(line1, line2), []);  
});

test ('Line 2 is longer', t=> {
    let line1 = [[[0,0], [8,8]]];
    let line2 = [[[0,0], [7,7]], [[7,7], [1,1]]];
    t.deepEqual(getIntersections(line1, line2), []);  
});

test ('Two line segments', t=> {
    let line1 = [[[0,0], [8,0]], [[8,0], [8,5]], [[8,5], [3,5]], [[3,5], [3,2]]];
    let line2 = [[[0,0], [0,7]], [[0,7], [6,7]], [[6,7], [6,3]], [[6,3], [2,3]]];
    let answer = [[0,0], [6,5], [3,3]];
    t.deepEqual(getIntersections(line1, line2), answer);
});

test ('Full example from instructions', t=> {
    let wire1 = "R8,U5,L5,D3";
    let wire2 = "U7,R6,D4,L4";

    t.is(wholeThing(wire1, wire2), 6);
});

test ('Example 2', t=> {
    let wire1 = "R75,D30,R83,U83,L12,D49,R71,U7,L72";
    let wire2 = "U62,R66,U55,R34,D71,R55,D58,R83";

    t.is(wholeThing(wire1, wire2), 159);
});

test ('Example 3', t=> {
    let wire1 = "R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51";
    let wire2 = "U98,R91,D20,R16,D67,R40,U7,R15,U6,R7";

    t.is(wholeThing(wire1, wire2), 135);
});

test ('Full example with steps from instructions', t=> {
    let wire1 = "R8,U5,L5,D3";
    let wire2 = "U7,R6,D4,L4";

    t.is(wholeStepThing(wire1, wire2), 30);
});

test ('Example 2 w/steps', t=> {
    let wire1 = "R75,D30,R83,U83,L12,D49,R71,U7,L72";
    let wire2 = "U62,R66,U55,R34,D71,R55,D58,R83";

    t.is(wholeStepThing(wire1, wire2), 610);
});

test ('Example 3 w/steps', t=> {
    let wire1 = "R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51";
    let wire2 = "U98,R91,D20,R16,D67,R40,U7,R15,U6,R7";

    t.is(wholeStepThing(wire1, wire2), 410);
});