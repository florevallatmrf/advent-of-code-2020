/**
 * How many passwords are valid in the list?
 *
 * run program with node find.js

 */

const fs = require('fs');

const passesNewRule = function(minMax, password, targetLetter) {
    const indexes = minMax.map(x => x - 1);
    const isAtMin = password.charAt(indexes[0]) === targetLetter;
    const isAtMax = password.charAt(indexes[1]) === targetLetter;

    if (isAtMin) return !isAtMax;
    if (isAtMax) return !isAtMin;

    return false;
}

const passesOldRule = function(minMax, password, targetLetter) {
    const numberOf = [...password.matchAll(targetLetter)].length

    return numberOf >= minMax[0] && numberOf <= minMax[1];
}


function removeInvalid(array, ruleToPass) {
    return array.filter(pair => {
        const rule = pair[0].split(' ');
        const minMax = rule[0].split('-');

        return ruleToPass(minMax, pair[1].trim(), rule[1]);
    });
}

fs.readFile('input.csv', 'utf8', (err, data) => {
    if (err) throw err;

    let rawArray = data.split('\n');
    const array = rawArray.map( x => x.split(':')).filter(x => x.length === 2);


    console.log('oldrule: ', removeInvalid(array, passesOldRule).length);
    console.log('newrule: ', removeInvalid(array, passesNewRule).length);
});
