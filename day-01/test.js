import test from 'ava';
import { getFuel, getFuelMass } from './functions';

test('mass of 12 is 2', t=> {
    t.is(getFuel(12), 2);
});

test('mass of 14 is 2', t=> {
    let fuel = getFuel(14);
    t.is(fuel, 2);
});

test('mass of 1969 is 654', t=> {
    let fuel = getFuel(1969);
    t.is(fuel, 654);
});

test('mass of 100756 is 33583', t=> {
    let fuel = getFuel(100756);
    t.is(fuel, 33583);
});

test('mass of 14 w/fuel', t=> {
    let fuel = getFuelMass(14);
    t.is(fuel, 2);
});

test('mass of 1969 w/fuel', t=> {
    let fuel = getFuelMass(1969);
    t.is(fuel, 966);
});

test('mass of 100756 w/fuel', t=> {
    let fuel = getFuelMass(100756);
    t.is(fuel, 50346);
});