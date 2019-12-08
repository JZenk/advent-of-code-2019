import test from 'ava';
import { parseInput, getOrbits, getSystem, getGraph, dijkstra } from './functions';

test('Parse simple string', t => {
    let input = "AAA)BBB";
    t.deepEqual(parseInput(input), {BBB:'AAA'});
});

test('Large string', t=> {
    let input = `COM)B
    B)C
    C)D
    D)E
    E)F
    B)G
    G)H
    D)I
    E)J
    J)K
    K)L`;
    let answer = {
        B: 'COM',
        C: 'B',
        D: 'C',
        E: 'D',
        F: 'E',
        G: 'B',
        H: 'G',
        I: 'D',
        J: 'E',
        K: 'J',
        L: 'K'
    };
    t.deepEqual(parseInput(input), answer);
});

test('Two object system orbits ', t=> {
    let input = {
        BBB: 'AAA',
    };
    t.is(getOrbits(input,'BBB'), 1);
});

test('D orbits', t=> {
    let input = {
        B: 'COM',
        C: 'B',
        D: 'C',
        E: 'D',
        F: 'E',
        G: 'B',
        H: 'G',
        I: 'D',
        J: 'E',
        K: 'J',
        L: 'K'
    };
    t.is(getOrbits(input, 'D'), 3);
});

test('L orbits', t=> {
    let input = {
        B: 'COM',
        C: 'B',
        D: 'C',
        E: 'D',
        F: 'E',
        G: 'B',
        H: 'G',
        I: 'D',
        J: 'E',
        K: 'J',
        L: 'K'
    };
    t.is(getOrbits(input, 'L'), 7);
});

test('COM orbits', t=> {
    let input = {
        B: 'COM',
        C: 'B',
        D: 'C',
        E: 'D',
        F: 'E',
        G: 'B',
        H: 'G',
        I: 'D',
        J: 'E',
        K: 'J',
        L: 'K'
    };
    t.is(getOrbits(input, 'COM'), 0);
});

test('Total orbits in system', t=> {
    let input = {
        B: 'COM',
        C: 'B',
        D: 'C',
        E: 'D',
        F: 'E',
        G: 'B',
        H: 'G',
        I: 'D',
        J: 'E',
        K: 'J',
        L: 'K'
    };
    t.is(getSystem(input), 42); 
});

test('Simple graph', t=> {
    let input = {BBB:'AAA'};
    let answer = {
        AAA: ['BBB'],
        BBB: ['AAA']
    };
    t.deepEqual(getGraph(input), answer);
});

test('Santa orbit', t=> {
    let input = `COM)B
    B)C
    C)D
    D)E
    E)F
    B)G
    G)H
    D)I
    E)J
    J)K
    K)L
    K)YOU
    I)SAN`;
    let answer = {
        B: 'COM',
        C: 'B',
        D: 'C',
        E: 'D',
        F: 'E',
        G: 'B',
        H: 'G',
        I: 'D',
        J: 'E',
        K: 'J',
        L: 'K',
        SAN: 'I',
        YOU: 'K'
    };
    t.deepEqual(parseInput(input), answer); 
});

test('Santa graph', t=> {
    let orbit = {
        B: 'COM',
        C: 'B',
        D: 'C',
        E: 'D',
        F: 'E',
        G: 'B',
        H: 'G',
        I: 'D',
        J: 'E',
        K: 'J',
        L: 'K',
        SAN: 'I',
        YOU: 'K' 
    };
    let answer = {
        B: ['COM','C','G'], 
        C: ['B','D'],
        COM: ['B'],
        D: ['C','E','I'],
        E: ['D','F','J'],
        F: ['E'],
        G: ['B','H'],
        H: ['G'],
        I: ['D','SAN'],
        J: ['E','K'],
        K: ['J','L','YOU'],
        L: ['K'],
        SAN: ['I'],
        YOU: ['K'] 
    };
    t.deepEqual(getGraph(orbit), answer);
});

test('Shortest path between me and Santa', t => {
    let input = {
        B: ['COM','C','G'], 
        C: ['B','D'],
        COM: ['B'],
        D: ['C','E','I'],
        E: ['D','F','J'],
        F: ['E'],
        G: ['B','H'],
        H: ['G'],
        I: ['D','SAN'],
        J: ['E','K'],
        K: ['J','L','YOU'],
        L: ['K'],
        SAN: ['I'],
        YOU: ['K'] 
    };
    t.is(dijkstra(input, 'YOU')[0].get('SAN'), 6);
});