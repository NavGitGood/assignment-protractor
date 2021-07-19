Feature: Feature to test Webtable app

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
    #   And search for user "firstName"
    Then the table should display "0" row
  #   And data should be present for user "firstName"


