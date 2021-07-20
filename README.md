# Assignment on Protractor Cucumber Framework #

## How to use ##

1. Extract the zip of clone from github
2. In the root directory, run following commands (required only once):
    - `npm i` - to install all the dependencies
    - `npm run webdriver-update` - to download Selenium Server jar, Chrome and Firefox drivers
3. To run the test, `npm test`
4. Report would be generated as `e2e/reports/<run-date>/cucumber_report.html`
5. On failure, screenshots would be generated in `e2e/reports/<currentdate>/screenshots` folder (and would be attached to the report)

## Few bugs ##

1. `Cell Phone` field is missing when editing
2. On adding a user, `Customer` is never shown on the table

## Known issues in framework ##

1. Report is generated from consolidated json outputs, but there is no way to know which feature ran in which browser
