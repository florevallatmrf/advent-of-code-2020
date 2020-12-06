const fs = require('fs');

function peopleInGroup(group) {
    return group.trim().split('\n').length;
}

function allYesAnswers(group, keepDuplicates = false) {
    return group.trim().split('\n').reduce((accumulator, answers) => {
        answers.split('').forEach(answer => {
            if (keepDuplicates || !accumulator.includes(answer)) {
                accumulator.push(answer);
            }
        });
        return accumulator;
    }, []);
}

function anyoneSaidYes(group) {
    return allYesAnswers(group).length;
}

function everyoneSaidYes(group) {
    const allYes = allYesAnswers(group, true);
    const people = peopleInGroup(group);
    let countedAnswers = new Map();

    allYes.forEach(value => {
        countedAnswers.set(value, (countedAnswers.get(value) || 0) + 1);
    });

    countedAnswers.forEach((value, key) => {
        if (value < people) {
            countedAnswers.delete(key);
        }
    });

    return countedAnswers.size;
}

function sumResult(groups, criteria) {
    return groups.split('\n\n').reduce((groupsSum, groupAnswers) => {
        return groupsSum + criteria(groupAnswers);
    }, 0);
}

function readAndProcess(inputFile) {
    fs.readFile(inputFile, 'utf8', (err, data) => {
        if (err) throw err;
        console.log(sumResult(data, anyoneSaidYes));
        console.log(sumResult(data, everyoneSaidYes));
    });
}

// readAndProcess('input.txt');

module.exports = {
    anyoneSaidYes,
    everyoneSaidYes,
    sumResult
};
