const { $, browser } = require("protractor");

const addUserBtn = $("button.pull-right");
const firstNameTxt = $("input[name=FirstName]");
const lastNameTxt = $("input[name=LastName]");
const userNameTxt = $("input[name=UserName]");
const passwordTxt = $("input[name=Password]");
const aaaCompanyRdBtn = $("input[value='15']");
const bbbCompanyRdBtn = $("input[value='16']");
const roleSelect = $("select[name=RoleId]");
const emailTxt = $("input[name=Email]");
const phoneTxt = $("input[name=Mobilephone]");
const closeBtn = $("button.btn-danger");
const saveBtn = $("button.btn-success");

async function openAddUserDialog() {
    await addUserBtn.click();
}

async function fillAddUserData(userData) {
    await firstNameTxt.sendKeys(userData.firstName);
    // browser.sleep(2000);
    await lastNameTxt.sendKeys(userData.lastName);
    // browser.sleep(2000);
    await userNameTxt.sendKeys(userData.userName);
    // browser.sleep(2000);
    await passwordTxt.sendKeys(userData.password);
    // browser.sleep(2000);
    await phoneTxt.sendKeys(userData.phone);
    // browser.sleep(2000);
    await selectRole(userData.role);
    // browser.sleep(2000);
    await emailTxt.sendKeys(userData.email);
    // browser.sleep(2000);
    console.log("-------------", userData.customer);
    await selectCustomer(userData.customer); // this is a bug, never displayed on table
    // browser.sleep(2000);
}

async function selectRole(role) {
    // await roleSelect.click();
    // browser.sleep(2000);
    await roleSelect.$$("option").filter(opt => opt.getText()
    .then(innerText => innerText === role)
    ).get(0).click();
    // browser.sleep(2000);
}

async function selectCustomer(customer) {
    if (customer === "AAA") await aaaCompanyRdBtn.click();
    else if (customer === "BBB") await bbbCompanyRdBtn.click();
}

async function addUser() {
    await saveBtn.click();
}

module.exports = {
    openAddUserDialog,
    fillAddUserData,
    addUser
}