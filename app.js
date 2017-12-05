const fs = require('fs');
const faker = require('faker');
faker.locale = "en";

// uncomment to create data
fillMockFile();

// read generated data
const lineReader = require('readline').createInterface({
    input: fs.createReadStream('test.csv')
});

const rgbaRegex = '(^rgba?\\(((25[0-5]|2[0-4]\\d|1\\d{1,2}|\\d\\d?)\\s*,\\s*?){2}(25[0-5]|2[0-4]\\d|1\\d{1,2}|\\d\\d?)\\s*,?\\s*([01]\\.?\\d*?)?\\)$)';
const hexRegex = '(^#[0-9A-Fa-f]{3}$)|(^#([0-9A-Fa-f]{6}$)|(^#([0-9A-Fa-f]{8}$)))';
const allRegex = `${rgbaRegex}|${hexRegex}`;

lineReader.on('line', function (line) {
    const data = line.split('-')[0];
    const pattern = new RegExp(allRegex);
    if(!pattern.test(data)) {
        console.log('doesn\'t match:', data);
    }
});

function fillMockFile() {
    // simple hex color
    for (let i = 0; i < 1000; i++) {
        fs.appendFile('test.csv', faker.internet.color() + '-\n', function (err) {
            if (err) throw err;
        });
    }
    //
    // // hex color with opacity
    for (let i = 0; i < 1000; i++) {
        const tempColor = faker.internet.color();
        fs.appendFile('test.csv', tempColor + tempColor.substr(5,6) + '-\n', function (err) {
            if (err) throw err;
        });
    }

    // simple hex color
    for (let i = 0; i < 1000; i++) {
        fs.appendFile('test.csv', faker.internet.color().substring(0,4) + '-\n', function (err) {
            if (err) throw err;
        });
    }

    // rgba color
    for (let i = 0; i < 1000; i++) {
        fs.appendFile('test.csv', random_rgba() + '-\n', function (err) {
            if (err) throw err;
        });
    }
    // rgb color
    for (let i = 0; i < 1000; i++) {
        fs.appendFile('test.csv', random_rgb() + '-\n', function (err) {
            if (err) throw err;
        });
    }

    function random_rgba() {
        const o = Math.round, r = Math.random, s = 255;
        return 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' + r().toFixed(1) + ')';
    }

    function random_rgb() {
        const o = Math.round, r = Math.random, s = 255;
        return 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ')';
    }
}