import test from 'ava';
import { parseInput, readOp, getNum, intCode } from './functions';

test('Parse string', t=> {
    let input = '3,15,3,16,1002,16,10,16,1,16,15,15,4,15,99,0,0';
    let answer = [3,15,3,16,1002,16,10,16,1,16,15,15,4,15,99,0,0]; 
    t.deepEqual(parseInput(input), answer);
});

test('Read 4 digit opcode', t=> {
    t.deepEqual(readOp([1002]), [2,0,1,0]);
});

test('getNum position mode', t=> {
    t.is(getNum([1, 2, 3, 4], 0, 0, 2), 3);
});