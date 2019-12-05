import test from 'ava';
import { run, parseInput, getNum, readOp } from './functions';

test('Parse string', t=> {
    t.deepEqual(parseInput('1,2,3,4,5'), [1,2,3,4,5]);
});

test('Read 2 digit opcode', t=> {
    t.deepEqual(readOp([99]), [99, 0, 0, 0]);
});

test('Read 4 digit opcode', t=> {
    t.deepEqual(readOp([1002]), [2,0,1,0]);
});

test('getNum position mode', t=> {
    t.is(getNum([1, 2, 3, 4], 0, 2), 3);
});

test('getNum immediate mode', t=> {
    t.is(getNum([1, 2, 3, 4], 1, 2), 2);
});

test('Diagnostic code position mode is 8, true', t=> {
    let input = [3,9,8,9,10,9,4,9,99,-1,8];
    t.is(run(input, 8)[0], 1);
});

test('Diagnostic code position mode is 8, false', t=> {
    let input = [3,9,8,9,10,9,4,9,99,-1,8];
    t.is(run(input, 7)[0], 0);
});

test('Diagnostic code position mode less than 8, true', t=> {
    let input = [3,9,7,9,10,9,4,9,99,-1,8];
    t.is(run(input, 7)[0], 1);
});

test('Diagnostic code position mode 8, false', t=> {
    let input = [3,9,7,9,10,9,4,9,99,-1,8];
    t.is(run(input, 8)[0], 0);
});