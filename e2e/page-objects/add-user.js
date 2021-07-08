const { $, browser } = require("protractor");

const addUserBtn = $("button.pull-right");
const firstNameTxt = $("input[name=FirstName]");
const lastNameTxt = $("input[name=LastName]");
const userNameTxt = $("input[name=UserName]");
const passwordTxt = $("input[name=Password]");
const aaaCompanyRdBtn = $("input[name=15]");
const bbbCompanyRdBtn = $("input[name=16]");
const roleSelect = $("select[name=RoleId]");
const emailTxt = $("input[name=Email]");
const phoneTxt = $("input[name=Mobilephone]");
const closeBtn = $("button.btn-danger");
const saveBtn = $("button.btn-success");

async function openAddUserDialog() {
    await addUserBtn.click();
}

async function fillAddUserData() {
    await firstNameTxt.sendKeys("FirstName");
    browser.sleep(2000);
    await lastNameTxt.sendKeys("FirstName");
    browser.sleep(2000);
    await userNameTxt.sendKeys("FirstName");
    browser.sleep(2000);
    await passwordTxt.sendKeys("FirstName");
    browser.sleep(2000);
    await emailTxt.sendKeys("FirstName");
    browser.sleep(2000);
    await phoneTxt.sendKeys("FirstName");
    browser.sleep(2000);
}

async function addUser() {

}

module.exports = {
    openAddUserDialog,
    fillAddUserData
}