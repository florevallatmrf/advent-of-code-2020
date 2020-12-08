const fs = require('fs');

function findRule(rules, bag) {
    return rules.find(rule => rule.indexOf(bag) === 0);
}

function findAllContentsOfBag(remainingRules, targetRule) {
    let sum = 0;
    const contents = targetRule.split('contain ')[1].split(', ');

    contents.forEach(content => {
        if (content !== 'no other bags') {
            const qty = content[0];
            const bagType = content.substring(2);
            const currentBagContent = findAllContentsOfBag(remainingRules, findRule(remainingRules, bagType));
            if (currentBagContent === 0) {
                sum += +qty;
            } else {
                sum += +qty + qty * currentBagContent;

            }
        }

    });

    return sum;
}

function findAllContainersOfBag(remainingRules, bag) {
    const reduced = remainingRules.reduce((rulesWithBag, rule) => {
        if (rule.indexOf(bag) > 0) {
            rulesWithBag.push(rule);
            const bagInThisRule = rule.split('s contain ')[0];

            return rulesWithBag.concat(findAllContainersOfBag(remainingRules, bagInThisRule));
        }
        return rulesWithBag;

    }, []);

    return reduced;
}
function cleanData(data) {
    return data.split('.\n').filter(Boolean);
}
function whoCanContainShinyGold(data) {
    const bagRules = cleanData(data);
    const allContainers = findAllContainersOfBag(bagRules, 'shiny gold bag');
    const containersWithoutDuplicates = [...new Set(allContainers)];

    return containersWithoutDuplicates.length;
}

function howManyBagsInside(data, bag) {
    const bagRules = cleanData(data);
    const bagRule = findRule(bagRules, bag);
    const contentsOfBag = findAllContentsOfBag(bagRules, bagRule);

    return contentsOfBag;
}

function howManyBagInsideShinyGold(data) {
    return howManyBagsInside(data, 'shiny gold bag');
}

function readAndProcess(inputFile) {
    fs.readFile(inputFile, 'utf8', (err, data) => {
        if (err) throw err;
        console.log(whoCanContainShinyGold(data));
        console.log(howManyBagInsideShinyGold(data));
    });
}

// readAndProcess('input-test.txt');
// readAndProcess('input.txt');

module.exports = {
    whoCanContainShinyGold,
    howManyBagInsideShinyGold,
    howManyBagsInside
};
