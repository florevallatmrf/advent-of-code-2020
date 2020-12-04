/**
 * Find from the list the 2 numbers that sum up to 2020
 * and multiply them
 * run program with node find.js
 *
 * Works! Would probably work better with an accumulator
 */

const fs = require('fs');

function findTripletFor2020(array) {
    let number1, number2, number3;

    number1 = array.find(expense => {
        number2 = array.find(otherExpense => {
            number3 = array.find(thirdExpense => expense + otherExpense + thirdExpense === 2020);

            return !!number3;
        });

        return !!number2
    });
    return [number1, number2, number3];
}

function findPairFor2020(array) {
    let number1, number2;

    number1 = array.find(expense => {
        number2 = array.find(otherExpense => expense + otherExpense === 2020);

        return !!number2
    });

    return [number1, number2]
}

fs.readFile('input.csv', 'utf8', (err, data) => {
    if (err) throw err;

    let rawArray = data.split('\n');
    const array = rawArray.map( x => parseInt(x, 10));

    const pair = findPairFor2020(array);
    const triplet = findTripletFor2020(array);

    console.log(pair[0] * pair[1]);
    console.log(triplet[0] * triplet[1] * triplet[2]);
});
