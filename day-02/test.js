import test from 'ava';
import { gravityAssist } from './functions';

test('Adding', t=> {
    let input = [1,0,0,0,99];
    let answer = [2,0,0,0,99];

    t.deepEqual(gravityAssist(input), answer);
});

test('Multiply', t=> {
    let input = [2,3,0,3,99];
    let answer = [2,3,0,6,99];

    t.deepEqual(gravityAssist(input), answer);
});

test('Longer string multiply', t=> {
    let input = [2,4,4,5,99,0];
    let answer = [2,4,4,5,99,9801];

    t.deepEqual(gravityAssist(input), answer);
});

test('Longer string add', t=> {
    let input = [1,1,1,4,99,5,6,0,99];
    let answer = [30,1,1,4,2,5,6,0,99];

    t.deepEqual(gravityAssist(input), answer);
});

test('Complex string', t=> {
    let input = ['1','9','10','3','2','3','11','0','99','30','40','50'];
    let answer = [3500,9,10,70,2,3,11,0,99,30,40,50];

    t.deepEqual(gravityAssist(input), answer);
});