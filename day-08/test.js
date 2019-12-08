import test from 'ava';
import { getLayers, fewestZeros, getPixels, getImage } from './functions';

test('Small image', t => {
    let input = '123456789012';
    let answer = [[1,2,3,4,5,6],[7,8,9,0,1,2]];

    t.deepEqual(getLayers(input, 3, 2), answer);
});

test('Layer with fewest 0', t=> {
    let input = [[1,2,3,4,5,6],[7,8,9,0,1,2]];
    let answer = {
        zeros: 0,
        ones: 1,
        twos: 1,
    };

    t.deepEqual(fewestZeros(input)[0], answer);
});

test('More layers', t=> {
    let input = '0222112222120000';
    let answer = [[0,2,2,2],[1,1,2,2],[2,2,1,2],[0,0,0,0]];

    t.deepEqual(getLayers(input, 2, 2), answer);
});

test('Pixels', t=> {
    let input = [[0,2,2,2],[1,1,2,2],[2,2,1,2],[0,0,0,0]];
    let answer = [0,1,1,0];

    t.deepEqual(getPixels(input, 2, 2), answer);
});

test('Image', t=> {
    let input = [0,1,1,0];
    let image = ` X\nX `;

    t.deepEqual(getImage(input, 2, 2), image);
});