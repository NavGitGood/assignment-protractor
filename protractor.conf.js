const path = require('path');
var fs = require('fs');
const reporter = require('cucumber-html-reporter');
const executionDate = new Date().toLocaleDateString().split('/').join('-');
const reportPath = path.join(process.cwd() + '/e2e/reports/' + executionDate);
const targetJsonPath = reportPath + '/cucumber_report.json';
const targetHtmlPath = reportPath + '/cucumber_report.html';

const seleniumServer = fs.readdirSync("./node_modules/webdriver-manager/selenium").filter(fn => fn.endsWith('.jar'))[0];

const cucumberReporterOptions = {
    // jsonFile: targetJsonPath,
    jsonDir: reportPath,
    output: targetHtmlPath,
    reportSuiteAsScenarios: true,
    theme: 'hierarchy'
}

exports.config = {

    seleniumServerJar: `./node_modules/webdriver-manager/selenium/${seleniumServer}`,
    baseUrl: "https://www.google.com",
    framework: "custom",
    frameworkPath: require.resolve("protractor-cucumber-framework"),
    reportPath: reportPath,

    // capabilities: {
    //     browserName: "firefox",
    // },
    multiCapabilities: [{
        'browserName': 'firefox'
    }, {
        'browserName': 'chrome'
    }],

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
        if (fs.existsSync(reportPath)) {
            fs.rmdirSync(reportPath, { recursive: true });
        }
        fs.mkdirSync(reportPath);
    },

    onPrepare: () => {
        browser.manage().window().maximize();
    },

    onComplete: async () => {
        reporter.generate(cucumberReporterOptions);
        await browser.driver.quit();
    },
}