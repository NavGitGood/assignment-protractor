const {Given, When, Then} = require("@cucumber/cucumber");
const userData = require("../data/users");
const constants = require("../data/constants");
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
    selectRole,
    fillAddUserDataWithoutPhone,
    emailValidationVisible,
    addEmail
    } = require("../page-objects/add-user");
const {
    getDataForARow,
    searchUser,
    getRowCount,
    deleteFirstRow,
    getTableRowCountByColumnValue,
    editARow
} = require("../page-objects/user-data-table");
const { deleteFromObject } = require("../support/helpers");

chai.use(chaiAsPromised);
const expect = chai.expect;

Given('I navigate to webtable app', async function () {
    await browser.driver.get(constants.url);
})

Then('there should be a button add', async function () {
    expect(await $('.pull-right.btn').isDisplayed()).to.be.true;
})

When('I click on adduser button', async function () {
    await openAddUserDialog();
})

When('I close add user dialog', async function () {
    await closeAddUserDialog();
})

When(/I add data for user "([^"]*)"$/, {timeout: 15 * 1000}, async function (userId) {
    await openAddUserDialog();
    const userRecord = userData.filter(user => user.user === userId)[0];
    await fillAddUserData(userRecord);
    await addUser();
})

Then(/data should be present for user "([^"]*)"$/, {timeout: 5 * 1000}, async function (userId) {
    let userRecord = JSON.parse(JSON.stringify(userData)).filter(user => user.user === userId)[0];
    userRecord = deleteFromObject(userRecord, constants.keysToDelete);
    let data = await getDataForARow("First Name", userRecord.firstName);
    data = data.filter(record => record !== "" && record !== "Edit");
    expect(data).to.deep.equal(Object.values(userRecord).filter(record => record !== "password" && record !== "AAA"));
})

When(/added user "([^"]*)" is searched with "([^"]*)"$/, {timeout: 5 * 1000}, async function (userId, field) {
    const valueToSearch = userData.filter(user => user.user === userId)[0][field];
    await searchUser(valueToSearch);
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

When(/I add data in FirstName$/, {timeout: 5 * 1000}, async function () {
    const user = userData[0];
    await addFirstName(user.firstName);
})

When(/I add data in UserName$/, {timeout: 5 * 1000}, async function () {
    const user = userData[0];
    await addUserName(user.userName);
})

When(/I add data in CellPhone$/, {timeout: 5 * 1000}, async function () {
    const user = userData[0];
    await addCellphone(user.phone);
})

When(/I add a valid email$/, {timeout: 5 * 1000}, async function () {
    await addEmail(constants.validEmail);
})

When(/I add an invalid email$/, {timeout: 5 * 1000}, async function () {
    await addEmail(constants.inValidEmail);
})

When(/I select a role$/, {timeout: 5 * 1000}, async function () {
    const user = userData[0];
    await selectRole(user.role);
})

Then(/the user "([^"]*)" should not be present in the table/, {timeout: 5 * 1000}, async function (userId) {
    let userRecord = userData.filter(user => user.user === userId)[0];
    expect(await getTableRowCountByColumnValue("First Name", userRecord.firstName)).to.equal(0);
})

When(/I edit the user "([^"]*)" with data for "([^"]*)"/, {timeout: 10 * 1000}, async function (user1, user2) {
    // await browser.sleep(5000);
    let userRecord = userData.filter(user => user.user === user1)[0];
    await editARow("First Name", userRecord.firstName);
    userRecord = userData.filter(user => user.user === user2)[0];
    await fillAddUserDataWithoutPhone(userRecord);
    await addUser();
})

Then(/data should be updated with values of user "([^"]*)"$/, {timeout: 5 * 1000}, async function (userId) {
    let userRecord = JSON.parse(JSON.stringify(userData)).filter(user => user.user === userId)[0];
    userRecord = deleteFromObject(userRecord, constants.keysToDelete);
    // due to phone number bug
    userRecord = deleteFromObject(userRecord, ["phone"]);
    let data = await getDataForARow("First Name", userRecord.firstName);
    data = data.filter(record => record !== "" && record !== "Edit"&& !/[0-9]{5,9}/.test(record));
    expect(data).to.deep.equal(Object.values(userRecord).filter(record => record !== "password" && record !== "AAA"));
})

Then(/email validation should be visible$/, {timeout: 5 * 1000}, async function () {
    expect(await emailValidationVisible()).to.be.true;
})

Then(/email validation should not be visible$/, {timeout: 5 * 1000}, async function () {
    expect(await emailValidationVisible()).to.be.false;
})