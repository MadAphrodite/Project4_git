# Registration Forms
This project is about testing how registration forms look and work. The goal of the project is to utilize Cypress and completely cover 4 registration forms with automated tests.

## Technical set-up
### Installing Node.js and NPM
1. Download the software from the link - https://nodejs.org/en/ - take LTS (long term support version)  
2. Check with terminal that Node.js is installed by using command `node --version`.
3. Check with terminal that NPM is installed by using command `npm --version`.
### Installing GIT
1. Download and install GIT:  https://git-scm.com/download/win
2. Check that GIT is installed. There are several possibilities to check that GIT is installed:
    * Type “Git” in the start menu in Windows. As a result the system should show multiple tools and one of them should be Git Bash.
    * Or check the version of installed GIT using command prompt terminal window with command `git --version`. The result of command execution should be information regarding currently installed GIT version.
### Installing VS Code and plugins
1. Download VS Code software from here: https://code.visualstudio.com/download
2. Install the following plugins:
     * https://marketplace.visualstudio.com/items?itemName=spoonscen.es6-mocha-snippets
     * https://marketplace.visualstudio.com/items?itemName=dakara.dakara-foldplus
     * https://marketplace.visualstudio.com/items?itemName=xabikos.JavaScriptSnippets
     * https://marketplace.visualstudio.com/items?itemName=andrew-codes.cypress-snippets

## Cypress simple tests
Tests written for basic HTML, CSS and JavaScript project.
#### Assignments


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




