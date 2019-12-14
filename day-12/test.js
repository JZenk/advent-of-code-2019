import test from 'ava';
import { parseMoons, applyGravity, applyVelocity, applyStep, applyNSteps, getTotalEnergy, getTimeToRepeat } from './functions';

test('load in moon data', t => {
    let input = `<x=-1, y=0, z=2>
    <x=2, y=-10, z=-7>
    <x=4, y=-8, z=8>
    <x=3, y=5, z=-1>`;
    let moons = [{pos: {x: -1, y:0, z:2}, vel:{x:0,y:0,z:0}},
        {pos: {x: 2, y:-10, z:-7}, vel:{x:0,y:0,z:0}},
        {pos: {x: 4, y:-8, z:8}, vel:{x:0,y:0,z:0}},
        {pos: {x: 3, y:5, z:-1}, vel:{x:0,y:0,z:0}}];
    t.deepEqual(parseMoons(input), moons);
});

test('apply gravity', t=> {
    let moons = [{pos: {x: -1, y:0, z:2}, vel:{x:0,y:0,z:0}},
        {pos: {x: 2, y:-10, z:-7}, vel:{x:0,y:0,z:0}},
        {pos: {x: 4, y:-8, z:8}, vel:{x:0,y:0,z:0}},
        {pos: {x: 3, y:5, z:-1}, vel:{x:0,y:0,z:0}}];
    let expected = [{pos: {x: -1, y:0, z:2}, vel:{x:3,y:-1,z:-1}},
        {pos: {x: 2, y:-10, z:-7}, vel:{x:1,y:3,z:3}},
        {pos: {x: 4, y:-8, z:8}, vel:{x:-3,y:1,z:-3}},
        {pos: {x: 3, y:5, z:-1}, vel:{x:-1,y:-3,z:1}}];
    t.deepEqual(applyGravity(moons), expected);
});

test('apply new velocity', t=> {
    let moons = [{pos: {x: -1, y:0, z:2}, vel:{x:3,y:-1,z:-1}},
        {pos: {x: 2, y:-10, z:-7}, vel:{x:1,y:3,z:3}},
        {pos: {x: 4, y:-8, z:8}, vel:{x:-3,y:1,z:-3}},
        {pos: {x: 3, y:5, z:-1}, vel:{x:-1,y:-3,z:1}}];
    let expected = [{pos: {x: 2, y:-1, z:1}, vel:{x:3,y:-1,z:-1}},
        {pos: {x: 3, y:-7, z:-4}, vel:{x:1,y:3,z:3}},
        {pos: {x: 1, y:-7, z:5}, vel:{x:-3,y:1,z:-3}},
        {pos: {x: 2, y:2, z:0}, vel:{x:-1,y:-3,z:1}}];
    t.deepEqual(applyVelocity(moons), expected);
});

test('apply full step', t=> {
    let moons = [{pos: {x: -1, y:0, z:2}, vel:{x:0,y:0,z:0}},
        {pos: {x: 2, y:-10, z:-7}, vel:{x:0,y:0,z:0}},
        {pos: {x: 4, y:-8, z:8}, vel:{x:0,y:0,z:0}},
        {pos: {x: 3, y:5, z:-1}, vel:{x:0,y:0,z:0}}];
    let expected = [{pos: {x: 2, y:-1, z:1}, vel:{x:3,y:-1,z:-1}},
        {pos: {x: 3, y:-7, z:-4}, vel:{x:1,y:3,z:3}},
        {pos: {x: 1, y:-7, z:5}, vel:{x:-3,y:1,z:-3}},
        {pos: {x: 2, y:2, z:0}, vel:{x:-1,y:-3,z:1}}];
    t.deepEqual(applyStep(moons), expected);
});

test('apply 10 steps', t=> {
    let moons = [{pos: {x: -1, y:0, z:2}, vel:{x:0,y:0,z:0}},
        {pos: {x: 2, y:-10, z:-7}, vel:{x:0,y:0,z:0}},
        {pos: {x: 4, y:-8, z:8}, vel:{x:0,y:0,z:0}},
        {pos: {x: 3, y:5, z:-1}, vel:{x:0,y:0,z:0}}];
    let expected = [{pos: {x: 2, y:1, z:-3}, vel:{x:-3,y:-2,z:1}},
        {pos: {x: 1, y:-8, z:0}, vel:{x:-1,y:1,z:3}},
        {pos: {x: 3, y:-6, z:1}, vel:{x:3,y:2,z:-3}},
        {pos: {x: 2, y:0, z:4}, vel:{x:1,y:-1,z:-1}}];
    t.deepEqual(applyNSteps(moons, 10), expected);
});

test('total energy for a moon', t=> {
    let moon = {pos: {x: 2, y:1, z:-3}, vel:{x:-3,y:-2,z:1}};
    t.is(getTotalEnergy(moon), 36);
});

test('second example after 100 steps', t=> {
    let input = `<x=-8, y=-10, z=0>
    <x=5, y=5, z=10>
    <x=2, y=-7, z=3>
    <x=9, y=-8, z=-3>`;
    let moons = parseMoons(input);
    let expected = [{pos: {x: 8, y:-12, z:-9}, vel:{x:-7,y:3,z:0}},
        {pos: {x: 13, y:16, z:-3}, vel:{x:3,y:-11,z:-5}},
        {pos: {x: -29, y:-11, z:-1}, vel:{x:-3,y:7,z:4}},
        {pos: {x: 16, y:-13, z:23}, vel:{x:7,y:1,z:1}}];
    t.deepEqual(applyNSteps(moons, 100), expected);
});

test('total energy for second example', t=> {
   let moons = [{pos: {x: 8, y:-12, z:-9}, vel:{x:-7,y:3,z:0}},
    {pos: {x: 13, y:16, z:-3}, vel:{x:3,y:-11,z:-5}},
    {pos: {x: -29, y:-11, z:-1}, vel:{x:-3,y:7,z:4}},
    {pos: {x: 16, y:-13, z:23}, vel:{x:7,y:1,z:1}}];
    let energy = 0;
    moons.forEach(moon => {
        energy += getTotalEnergy(moon);
    });
    t.is(energy, 1940);
});

test('Time to repeat', t=> {
    let moons = [{pos: {x: -1, y:0, z:2}, vel:{x:0,y:0,z:0}},
        {pos: {x: 2, y:-10, z:-7}, vel:{x:0,y:0,z:0}},
        {pos: {x: 4, y:-8, z:8}, vel:{x:0,y:0,z:0}},
        {pos: {x: 3, y:5, z:-1}, vel:{x:0,y:0,z:0}}];
    t.is(getTimeToRepeat(moons), 2772);
});