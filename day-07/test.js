import test from 'ava';
import { parseInput, readOp, getNum, ampCode, getSignal, getPermutations, findHighestSignal } from './functions';

test('Parse string', t=> {
    let input = '3,15,3,16,1002,16,10,16,1,16,15,15,4,15,99,0,0';
    let answer = [3,15,3,16,1002,16,10,16,1,16,15,15,4,15,99,0,0]; 
    t.deepEqual(parseInput(input), answer);
});

test('Read 4 digit opcode', t=> {
    t.deepEqual(readOp([1002]), [2,0,1,0]);
});

test('getNum position mode', t=> {
    t.is(getNum([1, 2, 3, 4], 0, 2), 3);
});

test('Amp Code', t=> {
    let input = [3,9,7,9,10,9,4,9,99,-1,8];
    return ampCode(input, [8]).then(result => {
		t.is(result[0], 0);
	});
});

test('Simple permutations', t=> {
    let array = [0,1];
    let answer = [[0,1],[1,0]];
    t.deepEqual(getPermutations(array), answer);
});

test('bar', async t => {
	const bar = Promise.resolve('bar');
	t.is(await bar, 'bar');
});

test('Max thruster setting 1', async t=> {
    let input = [3,15,3,16,1002,16,10,16,1,16,15,15,4,15,99,0,0];
    t.is(await getSignal(input), 43210);
});

test('Max thruster setting 2', async t=> {
    let input = [3,23,3,24,1002,24,10,24,1002,23,-1,23,101,5,23,23,1,24,23,23,4,23,99,0,0];

    t.is(await getSignal(input), 54321);
});

test('Max thruster setting 3', async t=> {
    let input = [3,31,3,32,1002,32,10,32,1001,31,-2,31,1007,31,0,33,1002,33,7,33,1,33,31,31,1,32,31,31,4,31,99,0,0,0];
    return getSignal(input).then(result => {
        t.is(result, 65210);
    });
});

test('Max thruster setting 4', async t=> {
    let input = [3,26,1001,26,-4,26,3,27,1002,27,2,27,1,27,26,27,4,27,1001,28,-1,28,1005,28,6,99,0,0,5];

    return findHighestSignal(input).then(result => {
        t.is(result, 139629729);
    });
});
