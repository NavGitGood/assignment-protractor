// const mkdir = require('mkdirp');
const path = require('path');
var fs = require('fs');
const reporter = require('cucumber-html-reporter');
// const { browser } = require('protractor');
const executionDate = new Date().toLocaleDateString().split('/').join('-');
const reportPath = path.join(process.cwd() + '/e2e/reports/' + executionDate);
const targetJsonPath = reportPath + '/cucumber_report.json';
const targetHtmlPath = reportPath + '/cucumber_report.html';

const seleniumServer = fs.readdirSync("./node_modules/webdriver-manager/selenium").filter(fn => fn.endsWith('.jar'))[0];

const cucumberReporterOptions = {
    jsonFile: targetJsonPath,
    output: targetHtmlPath,
    reportSuiteAsScenarios: true,
    theme: 'hierarchy'
}

exports.config = {

    seleniumServerJar: `./node_modules/webdriver-manager/selenium/${seleniumServer}`,
    baseUrl: "https://www.google.com",
    // directConnect: true,
    framework: "custom",
    frameworkPath: require.resolve("protractor-cucumber-framework"),
    reportPath: reportPath,

    capabilities: {
        browserName: "chrome",
    },

    specs: [
        "./e2e/features/*.feature",
    ],

    cucumberOpts: {
        require: [
            './e2e/step-definitions/*.js',
            './e2e/support/*.js'
        ],
        format: 'json:./e2e/reports/' + executionDate + '/cucumber_report.json',
        tags: "~@ignore"
    },

    beforeLaunch() {
        // mkdir.sync(reportPath);
        if (!fs.existsSync(reportPath)){
            fs.mkdirSync(reportPath);
        }

        // to use es6 syntax, like import keyword
        // require('ts-node').register({
        //     project: 'tsconfig.json'
        // });
    },

    onPrepare: () => {
        browser.manage().window().maximize();
        // Reporter.createDirectory(jsonReports);
        // non-anular page
        // browser.waitForAngularEnabled(false);
    },

    onComplete: () => {
        reporter.generate(cucumberReporterOptions);
        browser.driver.quit();
    },
};