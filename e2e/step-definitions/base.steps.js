const {Given, When, Then} = require("@cucumber/cucumber");
const userData = require("../data/users");
const { browser, $ } = require("protractor");
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

const { 
    fillAddUserData,
    openAddUserDialog,
    addUser,
    saveButtonEnabled,
    addFirstName,
    addUserName,
    addCellphone,
    selectRole
    } = require("../page-objects/add-user");

const {
    getDataForARow,
    searchUser,
    getRowCount,
    deleteFirstRow
} = require("../page-objects/user-data-table");


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

When(/Add data for user "([^"]*)"$/, {timeout: 15 * 1000}, async function (firstName) {
    const user = userData.filter(user => user.firstName === firstName)[0];
    await fillAddUserData(user);
    await addUser();
})

Then(/data should be present for user "([^"]*)"$/, {timeout: 5 * 1000}, async function (firstName) {
    let data = await getDataForARow("First Name", firstName);
    const user = userData.filter(user => user.firstName === firstName)[0];
    data = data.filter(record => record !== "" && record !== "Edit");
    // filter used to remove password which is not shown on table and Customer bug
    expect(data).to.deep.equal(Object.values(user).filter(user => user !== "password" && user !== "AAA"));
})

When(/added user is searched with "([^"]*)"$/, {timeout: 5 * 1000}, async function (firstName) {
    await searchUser(firstName);
})
When(/search for user "([^"]*)"$/, {timeout: 5 * 1000}, async function (firstName) {
    await searchUser(firstName);
})

Then(/the table should display "([^"]*)" row$/, {timeout: 5 * 1000}, async function (rowCount) {
    await browser.sleep(1000);
    expect(await getRowCount()).to.equal(parseInt(rowCount));
})

Then(/save button should be disabled$/, {timeout: 5 * 1000}, async function () {
    expect(await saveButtonEnabled()).to.be.false;
})

Then(/save button should be enabled$/, {timeout: 5 * 1000}, async function () {
    expect(await saveButtonEnabled()).to.be.true;
})

When(/I delete the user "([^"]*)"$/, {timeout: 5 * 1000}, async function (firstName) {
    await deleteFirstRow();
})

When(/add data in FirstName$/, {timeout: 5 * 1000}, async function () {
    const user = userData[0];
    await addFirstName(user.firstName);
})

When(/add data in UserName$/, {timeout: 5 * 1000}, async function () {
    const user = userData[0];
    await addUserName(user.userName);
})

When(/add data in CellPhone$/, {timeout: 5 * 1000}, async function () {
    const user = userData[0];
    await addCellphone(user.phone);
})

When(/select a role$/, {timeout: 5 * 1000}, async function () {
    const user = userData[0];
    await selectRole(user.role);
})