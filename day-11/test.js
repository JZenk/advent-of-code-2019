import test from 'ava';
import { Grid } from './functions';

test('Make a grid', t => {
    let grid = new Grid('.');
    t.is(typeof grid, 'object');
    
});