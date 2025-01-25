# Registration Forms
This project is about testing how registration forms look and work by using UI test automation. The goal of the project is to utilize Cypress and completely cover 3 registration forms with automated tests.

## Technical workplace set-up
#### Installing Node.js and NPM
1. Download the software from the link - [Node.js Download](https://nodejs.org/en/) - take LTS (long term support version)  
2. Check with terminal that Node.js is installed by using command `node --version`.
3. Check with terminal that NPM is installed by using command `npm --version`.
#### Installing GIT
1. Download and install GIT:  [GIT Download](https://git-scm.com/download/win)
2. Check that GIT is installed. There are several possibilities to check that GIT is installed:
    * Type “Git” in the start menu in Windows. As a result the system should show multiple tools and one of them should be Git Bash.
    * Or check the version of installed GIT using command prompt terminal window with command `git --version`. The result of command execution should be information regarding currently installed GIT version.
#### Installing VS Code and plugins
1. Download VS Code software from here: [VS Code Download](https://code.visualstudio.com/download)
2. Install the following plugins:
     * [ES6 Mocha Snippets](https://marketplace.visualstudio.com/items?itemName=spoonscen.es6-mocha-snippets)
     * [Fold Plus](https://marketplace.visualstudio.com/items?itemName=dakara.dakara-foldplus)
     * [Javascript (ES6) Code Snippets](https://marketplace.visualstudio.com/items?itemName=xabikos.JavaScriptSnippets)
     * [Cypress Snippets](https://marketplace.visualstudio.com/items?itemName=andrew-codes.cypress-snippets)
#### Install Cypress and dependencies
1. Open VS Code terminal window
2. Install Cypress and dependencies from the project root folder using command `npm install`.
3. To check that Cypress is installed, use command `npm list`.

## Cypress simple tests
Tests written for basic HTML, CSS and JavaScript project.
#### Assignments
* [Assignment 1: Prepare technical workplace](https://github.com/MadAphrodite/Registration_Forms_Automation/tree/master?tab=readme-ov-file#technical-workplace-set-up)
* [Assignment 2: Update tests for Registration Form 1](https://github.com/MadAphrodite/Registration_Forms_Automation/blob/master/cypress/e2e/registration_form_1_test.cy.js)
* [Assignment 3: Create new tests for Registration Form 1](https://github.com/MadAphrodite/Registration_Forms_Automation/blob/master/cypress/e2e/registration_form_1_test.cy.js)
* [Assignment 4: Create new functional tests for Registration Form 2](https://github.com/MadAphrodite/Registration_Forms_Automation/blob/master/cypress/e2e/Birgit_Tikk_registration_form_2_test.cy.js)
* [Assignment 5: Create new visual tests for Registration Form 2](https://github.com/MadAphrodite/Registration_Forms_Automation/blob/master/cypress/e2e/Birgit_Tikk_registration_form_2_test.cy.js)
* [Bonus: Fix failed tests](https://github.com/MadAphrodite/Registration_Forms_Automation/blob/master/cypress/e2e/registration_form_4_test.cy.js)
* [Bonus: Create visual and functional tests for Registration Form 3](https://github.com/MadAphrodite/Registration_Forms_Automation/blob/master/cypress/e2e/registration_form_3_test.cy.js)

## Test execution guidelines

#### Executing tests locally
There are two main user flows with Cypress. Executing tests with CLI or by using Cypress IDE

To open Cypress IDE:
`npx cypress open`

#### Executing tests with CLI commands
Second option for executing tests is by using CLI commands

To execute tests using CLI for example only for headless Chrome:
`npx cypress run --browser chrome`

To execute specific tests:
`npx cypress run --spec 'cypress/e2e/<your pattern here>*.js' --browser chrome`




