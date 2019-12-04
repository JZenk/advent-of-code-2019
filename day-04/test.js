import test from 'ava';
import { doesIncrease, doesRepeat, doesRepeated } from './functions';

test('123456 increases', t=> {
    t.is(doesIncrease(123456), true);
});

test('111111 also passes', t=> {
    t.is(doesIncrease(111111), true);
});

test('123455 also passes', t=> {
    t.is(doesIncrease(123455), true);
});

test('123454 does not pass', t=> {
    t.is(doesIncrease(123454), false);
});

test('111111 repeats', t=> {
    t.is(doesRepeat(111111), true);
});

test('357789 also passes', t=> {
    t.is(doesRepeat(357789), true);
});

test('984375 does not repeat', t=> {
    t.is(doesRepeat(984375), false);
});

test('112233 passes stronger repeat', t=> {
    t.is(doesRepeated(112233), true);
});

test('111122 passes stronger repeat', t=> {
    t.is(doesRepeated(111122), true);
});

test('123444 does not pass', t=> {
    t.is(doesRepeated(123444), false);
});

test('112222 passes stronger repeat', t=> {
    t.is(doesRepeated(112222), true);
});

test('122444 does pass', t=> {
    t.is(doesRepeated(122444), true);
});