Feature: User Operations

  Scenario: Verify Users Added Successfully
    Given I navigate to webtable app
    Then there should be a button add
    When I click on adduser button
    And I add data for user "user1"
    Then data should be present for user "user1"
    When added user "user1" is searched with "firstName"
    Then the table should display "1" row
    And data should be present for user "user1"
    # would work only when searched
    When I delete the user "user1"
    Then the table should display "1" row

  Scenario: Add Multiple Users
    Given I navigate to webtable app
    When I add data for user "user1"
    And I add data for user "user2"
    And I add data for user "user3"
    Then data should be present for user "user1"
    Then data should be present for user "user2"
    Then data should be present for user "user3"

  Scenario: Verify add edit delete
    Given I navigate to webtable app
    When I add data for user "user1"
    Then data should be present for user "user1"
    When I edit the user "user1" with data for "user2"
    Then data should be updated with values of user "user2"
    When I delete the user "user2"
    Then the user "user2" should not be present in the table

