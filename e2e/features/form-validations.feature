@validations
Feature: Feature to test form validations

  Scenario: Verify mandatory fields
        Given I navigate to webtable app
        Then there should be a button add
        When Click on adduser
        Then save button should be disabled
        When add data in FirstName
        And add data in UserName
        And add data in CellPhone
        And select a role
        Then save button should be enabled

