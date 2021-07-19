const { $ } = require("protractor");

const addUserDialogBox = $("form[name=smartTableValidForm]");
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
const emailValidation = $("span[ng-show='smartTableValidForm.Email.$error.email']");

async function openAddUserDialog() {
    const flag = await addUserDialogBox.isPresent();
    if(!flag) await addUserBtn.click();
}

async function closeAddUserDialog() {
    const flag = await addUserDialogBox.isPresent();
    if(flag) await closeBtn.click();
}

async function saveButtonEnabled() {
    return saveBtn.isEnabled();
}

async function emailValidationVisible() {
    return emailValidation.isDisplayed();
}

async function addFirstName(data) {
    await firstNameTxt.clear()
    await firstNameTxt.sendKeys(data);
}

async function addLastName(data) {
    await lastNameTxt.clear()
    await lastNameTxt.sendKeys(data);
}

async function addUserName(data) {
    await userNameTxt.clear()
    await userNameTxt.sendKeys(data);
}

async function addPassword(data) {
    await passwordTxt.clear()
    await passwordTxt.sendKeys(data);
}

async function addCellphone(data) {
    await phoneTxt.clear()
    await phoneTxt.sendKeys(data);
}

async function addEmail(data) {
    await emailTxt.clear()
    await emailTxt.sendKeys(data);
}

async function fillAddUserData(userData) {
    await addFirstName(userData.firstName);
    await addLastName(userData.lastName);
    await addUserName(userData.userName);
    await addPassword(userData.password);
    await addCellphone(userData.phone);
    await selectRole(userData.role);
    await addEmail(userData.email);
    await selectCustomer(userData.customer); // this is a bug, never displayed on table
}

// bug in edit, phone number field missing
async function fillAddUserDataWithoutPhone(userData) {
    await addFirstName(userData.firstName);
    await addLastName(userData.lastName);
    await addUserName(userData.userName);
    await addPassword(userData.password);
    await selectRole(userData.role);
    await addEmail(userData.email);
    await selectCustomer(userData.customer); // this is a bug, never displayed on table
}

async function selectRole(role) {
    await roleSelect.$$("option").filter(opt => opt.getText()
        .then(innerText => innerText === role)
    ).get(0).click();
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
    addUser,
    saveButtonEnabled,
    addFirstName,
    addUserName,
    addCellphone,
    selectRole,
    closeAddUserDialog,
    fillAddUserDataWithoutPhone,
    emailValidationVisible,
    addEmail
}