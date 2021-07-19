Feature: Feature to test Webtable app

  Scenario: Add Multiple Users
    Given I navigate to webtable app
    When I add data for user "user1"
    And I add data for user "user2"
    And I add data for user "user3"
    Then data should be present for user "user1"
    Then data should be present for user "user2"
    Then data should be present for user "user3"
