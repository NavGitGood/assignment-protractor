Feature: Feature to test Webtable app

  Scenario: Verify add edit delete
    Given I navigate to webtable app
    When I add data for user "user1"
    Then data should be present for user "user1"
    When I edit the user "user1" with data for "user2"
    Then data should be updated with values of user "user2"
    When I delete the user "user2"
    Then the user "user2" should not be present in the table


