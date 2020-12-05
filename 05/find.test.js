
const { describe } = require('@jest/globals');
const find = require('./find');


describe('finds the right row', () => {
    test('example 1', () => {
        const data = 'FBFBBFF';
        expect(find.row(data)).toBe(44);
    });
    test('example 2', () => {
        const data = 'BFFFBBF';
        expect(find.row(data)).toBe(70);
    });
    test('example 3', () => {
        const data = 'FFFBBBF';
        expect(find.row(data)).toBe(14);
    });
    test('example 4', () => {
        const data = 'BBFFBBF';
        expect(find.row(data)).toBe(102);
    });
});

describe('finds the right column', () => {
    test('example 1', () => {
        const data = 'RLR';
        expect(find.column(data)).toBe(5);
    });
    test('example 2', () => {
        const data = 'RRR';
        expect(find.column(data)).toBe(7);
    });
    test('example 3', () => {
        const data = 'RLL';
        expect(find.column(data)).toBe(4);
    });
});


describe('finds the right seat ID', () => {
    test('example 1', () => {
        const data = 'FBFBBFFRLR';
        expect(find.seatID(data)).toBe(357);
    });
    test('example 2', () => {
        const data = 'BFFFBBFRRR';
        expect(find.seatID(data)).toBe(567);
    });
    test('example 3', () => {
        const data = 'FFFBBBFRRR';
        expect(find.seatID(data)).toBe(119);
    });
    test('example 4', () => {
        const data = 'BBFFBBFRLL';
        expect(find.seatID(data)).toBe(820);
    });
});
