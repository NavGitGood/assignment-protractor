const {Given, When, Then} = require("@cucumber/cucumber");
const { browser, $ } = require("protractor");
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

const { 
    fillAddUserData,
    openAddUserDialog
    } = require("../page-objects/add-user");


chai.use(chaiAsPromised);
const expect = chai.expect;

Given('I navigate to webtable app', async function () {
    await browser.driver.get("http://www.way2automation.com/angularjs-protractor/webtables/");
})

Then('there should be a button add', async function () {
    expect(await $('.pull-right.btn').isDisplayed()).to.be.true;
})

When('Click on adduser', async function () {
    await openAddUserDialog();
})

When('Add data', {timeout: 15 * 1000}, async function () {
    await fillAddUserData();
})