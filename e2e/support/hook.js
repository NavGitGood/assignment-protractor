const { After, Status} = require("@cucumber/cucumber");
const { browser } = require("protractor");
const fs = require("fs");
// const * as mkdir = require("mkdirp");

const imgPath = require('../../protractor.conf.js').config.reportPath + '/screenshots';

function saveScreenshot(data, fileName) {
    if (!fs.existsSync(imgPath)){
        fs.mkdirSync(imgPath);
    }
    const stream = fs.createWriteStream(imgPath + '/' + fileName);
    stream.write(Buffer.from(data, 'base64'));
    stream.end();
}

After(async function(scenario) {
    if (scenario.result.status === Status.FAILED) {
        const image = await browser.takeScreenshot();
        this.attach(image, 'image/png');
        const imgName = scenario.pickle.name.split(' ').join('_');
        saveScreenshot(image, imgName + '.png');
    }
});