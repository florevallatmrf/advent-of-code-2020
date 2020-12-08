
const { describe } = require('@jest/globals');
const find = require('./find');
const fs = require('fs');

describe('part 1', () => {
    test('Shiny gold has 4 possible containers', () => {
        const data = fs.readFileSync(__dirname + '/input-test.txt', 'utf8');
        expect(find.whoCanContainShinyGold(data)).toBe(4);
    });
});

describe('part 2', () => {
    test('Shiny gold contains 32 bags', () => {
        const data = fs.readFileSync(__dirname + '/input-test.txt', 'utf8');
        expect(find.howManyBagInsideShinyGold(data)).toBe(32);
    });
    test('Vibrant plum contains 11 bags', () => {
        const data = fs.readFileSync(__dirname + '/input-test.txt', 'utf8');
        expect(find.howManyBagsInside(data, 'vibrant plum')).toBe(11);
    });
    test('dark olive contains 7 bags', () => {
        const data = fs.readFileSync(__dirname + '/input-test.txt', 'utf8');
        expect(find.howManyBagsInside(data, 'dark olive')).toBe(7);
    });

    test('Example2: shinyGold contains 126 bags', () => {
        const data = fs.readFileSync(__dirname + '/input-test-2.txt', 'utf8');
        expect(find.howManyBagInsideShinyGold(data)).toBe(126);
    });
});
