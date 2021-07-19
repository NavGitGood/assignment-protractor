const { $, browser } = require("protractor");

const table = $("table");
const dataRow = table.$$("tbody > tr");
const headerRow = table.$("thead > tr.smart-table-header-row");
const tableSearch = $(".smart-table-global-search > input");
const deletePopupBtn = $(".modal-footer > .btn-primary");

async function getColumnIdFromHeaderName(headerName) {
    const headerData = await headerRow.$$("th").map(async column => await column.getText());
    return headerData.findIndex(header => header === headerName);
}

async function getTableRowByColumnValue(headerName, columnValue) {
    const index = await getColumnIdFromHeaderName(headerName);
    return dataRow.filter(
        row => row.$$("td").get(index).getText()
            .then(innerText => innerText === columnValue)
    ).get(0);
}

async function getTableRowCountByColumnValue(headerName, columnValue) {
    const index = await getColumnIdFromHeaderName(headerName);
    return dataRow.filter(
        row => row.$$("td").get(index).getText()
            .then(innerText => innerText === columnValue)
    ).count();
}

async function editARow(headerName, columnValue) {
    const index = await getColumnIdFromHeaderName(headerName);
    const rowToEdit = await dataRow.filter(
        row => row.$$("td").get(index).getText()
            .then(innerText => innerText === columnValue)
    ).get(0);
    await rowToEdit.$("button[type=edit]").click();
}

async function readARow(row) {
    return row.$$("td").map(async column => await column.getText())
}

async function getDataForARow(headerName, columnValue) {
    const row = await getTableRowByColumnValue(headerName, columnValue);
    const data = await readARow(row);
    return data;
}

async function searchUser(valueToBeSearched) {
    tableSearch.sendKeys(valueToBeSearched);
}

async function getRowCount() {
    return dataRow.count();
}

async function deleteFirstRow() {
    await dataRow.get(0).$("td .icon-remove").click();
    await browser.sleep(1000);
    await deletePopupBtn.click();
}

module.exports = {
    getDataForARow,
    searchUser,
    getRowCount,
    deleteFirstRow,
    getTableRowCountByColumnValue,
    editARow
}