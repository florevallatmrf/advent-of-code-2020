const validate = require('./validate');
const fs = require('fs');
const { describe, test, expect } = require('@jest/globals');

describe('part 1', () => {
    test('Test passport 1 is valid', () => {
        const passport = `ecl:gry pid:860033327 eyr:2020 hcl:#fffffd
byr:1937 iyr:2017 cid:147 hgt:183cm`
        expect(validate.onePassport(passport)).toBeTruthy();
    });

    test('Test passport 2 is invalid', () => {
        const passport = `iyr:2013 ecl:amb cid:350 eyr:2023 pid:028048884
hcl:#cfa07d byr:1929`
        expect(validate.onePassport(passport)).toBeFalsy();
    });

    test('Test passport 3 is valid', () => {
        const passport = `hcl:#ae17e1 iyr:2013
eyr:2024
ecl:brn pid:760753108 byr:1931
hgt:179cm`
        expect(validate.onePassport(passport)).toBeTruthy();
    });

    test('Test passport 4 is invalid', () => {
        const passport = `hcl:#cfa07d eyr:2025 pid:166559648
iyr:2011 ecl:brn hgt:59in`
        expect(validate.onePassport(passport)).toBeFalsy();
    });

    test('2 examples are valid', () => {
        const data = fs.readFileSync(__dirname + '/input-test.txt', 'utf8');
        expect(validate.allPassports(data)).toBe(2);
    })
});

describe('Part 2', () => {
    describe('precise test', () => {
        test('byr valid', () => {
            expect(validate.singleField('byr:', '2002')).toBeTruthy();
        });
        test('byr invalid', () => {
            expect(validate.singleField('byr:', '2003')).toBeFalsy();
        });
        test('hgt valid', () => {
            expect(validate.singleField('hgt:', '60in')).toBeTruthy();
        });
        test('hgt valid', () => {
            expect(validate.singleField('hgt:', '190cm')).toBeTruthy();
        });
        test('hgt invalid', () => {
            expect(validate.singleField('hgt:', '190in')).toBeFalsy();
        });
        test('hgt invalid', () => {
            expect(validate.singleField('hgt:', '190')).toBeFalsy();
        });
        test('hcl valid', () => {
            expect(validate.singleField('hcl:', '#123abc')).toBeTruthy();
        });
        test('hcl invalid', () => {
            expect(validate.singleField('hcl:', '#123abz')).toBeFalsy();
        });
        test('hcl invalid', () => {
            expect(validate.singleField('hcl:', '123abc')).toBeFalsy();
        });
        test('ecl valid', () => {
            expect(validate.singleField('ecl:', 'brn')).toBeTruthy();
        });
        test('ecl invalid', () => {
            expect(validate.singleField('ecl:', 'wat')).toBeFalsy();
        });
        test('pid valid', () => {
            expect(validate.singleField('pid:', '000000001 ')).toBeTruthy();
        });
        test('pid invalid', () => {
            expect(validate.singleField('pid:', '0123456789 ')).toBeFalsy();
        });
    });
    describe('general test', () => {
        test('Invalid with extra rules', () => {
            const data = fs.readFileSync(__dirname + '/input-test-invalid.txt', 'utf8');
            expect(validate.allPassportsWithMoreRules(data)).toBe(0);
        })
        test('Valid with extra rules', () => {
            const data = fs.readFileSync(__dirname + '/input-test-valid.txt', 'utf8');
            expect(validate.allPassportsWithMoreRules(data)).toBe(4);
        })
    })
});

