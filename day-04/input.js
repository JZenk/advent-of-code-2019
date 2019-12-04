import { passwordFacts, strictPasswordFacts } from './functions';

try {
    console.log('Matching passwords: ' + passwordFacts(134564,585159));
    console.log('Strict matching passwords: ' + strictPasswordFacts(134564, 585159));
} catch (e) {
    console.log('Error! ' + e.stack);
}