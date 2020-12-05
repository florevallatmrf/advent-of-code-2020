const { Console } = require('console');
const fs = require('fs');

function row(excerpt) {
    let range = 128;
    let min = 0;
    let max = 127;

    excerpt.split('').forEach(letter => {
        if (letter === 'F') {
            max = Math.floor(range / 2) + min
        }
        if (letter === 'B') {
            min = Math.ceil(range / 2) + min
        }
        range = max - min;
    });

    return min;
}

function column(excerpt) {
    let range = 8;
    let min = 0;
    let max = 7;

    excerpt.split('').forEach(letter => {
        if (letter === 'L') {
            max = Math.floor(range / 2) + min
        }
        if (letter === 'R') {
            min = Math.ceil(range / 2) + min
        }
        range = max - min;
    });

    return min;
}

function seatID(pass) {
    const passRow = row(pass.substring(0,7));
    const passColumn = column(pass.substring(7));

    return passRow * 8 + passColumn;
}

function findAllIds(data) {
    const passes = data.trim().split('\n');

    return passes.map(seatID);
}

function findHighestId(data) {
    return Math.max(...data);
}

function findSmallestId(data) {
    return Math.min(...data);
}

// Your seat wasn't at the very front or back, though;
// the seats with IDs +1 and -1 from yours will be in your list.

// What is the ID of your seat?

function findMySeat(data) {
    const allPasses = findAllIds(data).sort();
    const seatNextToMe = allPasses.find((pass, index, passes) => {
        if (index > 0) {
            return !(pass === passes[index - 1] + 1 && pass === passes[index + 1] -1);
        }
        return false;
    });

    return seatNextToMe + 1;
}

function readAndProcess(inputFile) {
    fs.readFile(inputFile, 'utf8', (err, data) => {
        if (err) throw err;
        console.log(findHighestId(findAllIds(data)));
        console.log(findMySeat(data));
    });
}

// readAndProcess('input.txt');

module.exports = {
    row,
    column,
    seatID
};
