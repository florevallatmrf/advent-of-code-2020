const find = require('./find');
const fs = require('fs');


test('finds the right number for the example', () => {
    const data = fs.readFileSync(__dirname + '/input-test.txt', 'utf8');
    expect(find.treesInTrip(data)).toBe(7);
});


test('finds the right number for the mini example', () => {
    const data = fs.readFileSync(__dirname + '/input-test-mini.txt', 'utf8');
    expect(find.treesInTrip(data)).toBe(1);
});


test('finds the right product for the example', () => {
    const data = fs.readFileSync(__dirname + '/input-test.txt', 'utf8');
    expect(find.treesInAllTrips(data)).toBe(336);
});
