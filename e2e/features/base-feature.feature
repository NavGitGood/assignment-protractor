Feature: Feature to test Webtable app

  Scenario: Verify title
        Given I navigate to webtable app
        Then there should be a button add
        When Click on adduser
        And Add data for user "firstName"
        Then data should be present for user "firstName"
        When added user is searched with "firstName"
        Then the table should display "1" row
        And data should be present for user "firstName"
      # would work only when searched
        When I delete the user "firstName"
      #   And search for user "firstName"
        Then the table should display "0" row
      #   And data should be present for user "firstName"


  Scenario: Verify mandatory fields
        Given I navigate to webtable app
        Then there should be a button add
        When Click on adduser
        Then save button should be disabled
