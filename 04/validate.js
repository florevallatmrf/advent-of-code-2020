const fs = require('fs');
const fields = [
    'ecl:',
    'pid:',
    'eyr:',
    'hcl:',
    'byr:',
    'iyr:',
    'hgt:'
]

const validFields = {
    "byr:": passport => {
        const byr = passport.split(' ')[0]
        return +byr >= 1920 && +byr <= 2002;
    },
    "iyr:": passport => {
        const iyr = passport.split(' ')[0]
        return +iyr >= 2010 && +iyr <= 2020
    },
    "eyr:": passport => {
        const eyr = passport.split(' ')[0]
        return +eyr >= 2020 && +eyr <= 2030
    },
    "hgt:": passport => {
        const hgt = passport.split(' ')[0]
        if (hgt.includes('cm')) return +hgt.substring(0,3) >= 150 && +hgt.substring(0,3) <=193;
        if (hgt.includes('in')) return +hgt.substring(0,2) >= 59 && +hgt.substring(0,2) <=76;
        return false;
    },
    "hcl:": passport => {
        const hcl = passport.split(' ')[0]
        const hclRegex = /#[0-9,a-f]{6}/;
        return hclRegex.test(hcl);
    },
    "ecl:": passport => {
        const ecl = passport.split(' ')[0]
        const options = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth']
        return options.includes(ecl);
    },
    "pid:": passport => {
        const pid = passport.substring(0, 10)
        const pidRegex = /[0-9]{9}/;

        const startsGood = pidRegex.test(pid);
        if (startsGood) {
            const nextChar = passport[9];
            if (!!nextChar && /[a-z,0-9]/.test(nextChar)) {
                return false;
            }
            return true;
        }
        return false;
    }
}

function singleField(field, passportExcerpt) {
    return validFields[field](passportExcerpt.replace(/\n/g, ' '));
}

function onePassport(passport, beThorough = false) {
    return fields.every(field => {
        const itemIndex = passport.indexOf(field);
        const exists = itemIndex >= 0;

        if (exists && beThorough) {
            return singleField(field, passport.substring(itemIndex + 4));
        }

        return exists;
    });
}

function allPassports(data, beThorough = false) {
    const passports = data.split('\n\n');

    const validPassports = passports.filter(passport => onePassport(passport, beThorough))
    return validPassports.length;
}

function allPassportsWithMoreRules(data) {
    validPassports = allPassports(data, true);

    return validPassports;
}


function readAndProcess(inputFile) {
    fs.readFile(inputFile, 'utf8', (err, data) => {
        if (err) throw err;

        console.log(allPassports(data));
        console.log(allPassportsWithMoreRules(data));
    });
}

readAndProcess('input.txt');

module.exports = {
    onePassport,
    allPassports,
    allPassportsWithMoreRules,
    singleField
};
