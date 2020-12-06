
const { describe } = require('@jest/globals');
const find = require('./find');
const fs = require('fs');


describe('part 1', () => {
    test('mini example', () => {
        const data = fs.readFileSync(__dirname + '/input-test-mini.txt', 'utf8');
        expect(find.anyoneSaidYes(data)).toBe(6);
    });

    test('answered yes in several group', () => {
        const data = fs.readFileSync(__dirname + '/input-test.txt', 'utf8');
        expect(find.sumResult(data, find.anyoneSaidYes)).toBe(11);
    });
});

describe('part 2', () => {
    test('mini example', () => {
        const data = fs.readFileSync(__dirname + '/input-test-mini.txt', 'utf8');
        expect(find.everyoneSaidYes(data)).toBe(3);
    });

    test('answered yes in several group', () => {
        const data = fs.readFileSync(__dirname + '/input-test.txt', 'utf8');
        expect(find.sumResult(data, find.everyoneSaidYes)).toBe(6);
    });
});
