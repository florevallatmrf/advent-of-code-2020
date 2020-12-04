const fs = require('fs');

function findTreesInSpecificShape(map, move) {
    const right = move[0];
    const down = move[1];
    const height = map.length;
    const width = map[0].length;
    const trip = [];

    for (let i = down, offset = 0; i < height; i+=down) {
        offset += right;
        if (offset%width < width) {
            offset = offset%width;
        }

        trip.push(map[i][offset]);
    }

    const trees = trip.filter(square => {
        return square === '#';
    });

    return trees.length;
}

function treesInTrip(data) {
    const map = data.trim().split('\n');

    return findTreesInSpecificShape(map, [3, 1])
}


function treesInAllTrips(data) {
    const map = data.trim().split('\n');
    const allTrees = [];
    allTrees.push(findTreesInSpecificShape(map, [1, 1]))
    allTrees.push(findTreesInSpecificShape(map, [3, 1]))
    allTrees.push(findTreesInSpecificShape(map, [5, 1]))
    allTrees.push(findTreesInSpecificShape(map, [7, 1]))
    allTrees.push(findTreesInSpecificShape(map, [1, 2]))

    return allTrees.reduce(function(accumulator, currentValue, currentIndex, array) {
        return accumulator * currentValue
    })
}

function readAndProcess(inputFile) {
    fs.readFile(inputFile, 'utf8', (err, data) => {
        if (err) throw err;
        // console.log(treesInTrip(data));
        console.log(treesInAllTrips(data));
    });
}

// readAndProcess('input.txt');

module.exports = {
    treesInTrip,
    treesInAllTrips
};

