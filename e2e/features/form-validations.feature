@validations
Feature: Feature to test form validations

  Scenario: Verify mandatory fields
        Given I navigate to webtable app
        Then there should be a button add
        When I click on adduser button
        Then save button should be disabled
        When I add data in FirstName
        And I add data in UserName
        And I add data in CellPhone
        And I select a role
        Then save button should be enabled

    Scenario: Verify email validation
        Given I navigate to webtable app
        When I click on adduser button
        Then save button should be disabled
        When I add an invalid email
        Then email validation should be visible
        When I add a valid email
        Then email validation should not be visible

