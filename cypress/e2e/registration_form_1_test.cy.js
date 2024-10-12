// Before each test (it...) open .html page
beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_1.html')
})

/*
Assignment 2:
 */

 // 25.09.2024 tested
describe('This is first test suite, Birgit Tikk', () => {
    it('User can submit data only when valid mandatory values are added', () => {
        cy.get('[data-testid="phoneNumberTestId"]').type('555666777')
        cy.get('#firstName').type('Mary')
        cy.get('#lastName').type('Moose')
        cy.get('input[name="password"]').type('MouseTest508')
        cy.get('[name="confirm"]').type('MouseTest508')
        cy.get('#username').type('TestBossman5000')
        cy.get('h2').contains('Password').click()
        cy.get('.submit_button').should('be.enabled')
        cy.get('.submit_button').click()
        cy.get('#input_error_message').should('not.be.visible')
        cy.get('#password_error_message').should('have.css', 'display', 'none')
        cy.get('#success_message').should('be.visible').should('contain', 'User successfully submitted registration')
    })


    it('User can use only same both first and validation passwords', () => {
        cy.get('#username').type('johnDoe')
        cy.get('[data-testid="phoneNumberTestId"]').type('10203040')
        cy.get('input[name="password"]').type('Password123')
        cy.get('[name="confirm"]').type('Password123123')
        cy.get('[name="confirm"]').type('{enter}')
        cy.get('#password_error_message').should('be.visible').should('contain', 'Passwords do not match!')
        cy.get('#success_message').should('not.be.visible')
        cy.get('.submit_button').should('be.disabled')
        cy.get('input[name="confirm"]').should('have.attr', 'title', 'Both passwords should match')

        // Changing the test, so the passwords are matching
        cy.get('[name="confirm"]').clear()
        cy.get('[name="confirm"]').type('Password123')
        cy.get('h2').contains('Password').click()
        cy.get('#password_error_message').should('not.be.visible')
        cy.get('.submit_button').should('be.enabled')
    })

    it('User cannot submit data when username is absent', () => {
        cy.get('#username').type('johnDoe')
        cy.get('[data-testid="phoneNumberTestId"]').type('10203040')
        cy.get("input[name='password']").type('Password123')
        cy.get('[name="confirm"]').type('Password123')
        cy.get('#username').scrollIntoView()
        cy.get('#username').clear()
        cy.get('h2').contains('Password').click()
        cy.get('.submit_button').should('be.disabled')
        cy.get('#success_message').should('not.be.visible')
        cy.get('#input_error_message').should('be.visible').should('contain', 'Mandatory input field is not valid or empty!')
        cy.get('input[name="username"]').should('have.attr', 'title').should('contain', 'Input field')
    })

    /*
    Assignment 3: add the content to the following tests
    */

    it('User cannot submit data when phone number is absent', () => {
        cy.get('#username').type('TestBossman6000')
        cy.get('input[name="password"]').type('MouseTest508')
        cy.get('[name="confirm"]').type('MouseTest508')
        cy.get('h2').contains('Password').click()
        cy.get('.submit_button').should('be.disabled')
        cy.get('#success_message').should('not.be.visible')
    })

    it('User cannot submit data when password and/or confirmation password is absent', () => {
        cy.get('#username').type('TestBossman7000')
        cy.get('[data-testid="phoneNumberTestId"]').type('66695855')
        cy.get('#firstName').type('Mary')
        cy.get('#lastName').type('Moose')
        cy.get('h2').contains('Password').click()
        cy.get('.submit_button').should('be.disabled')
        cy.get('#success_message').should('not.be.visible')

    })

    it('User cannot add letters to phone number', () => {
        cy.get('#username').type('TestBossman7000')
        cy.get('[data-testid="phoneNumberTestId"]').should('have.attr', 'type', 'number')
        cy.get('[data-testid="phoneNumberTestId"]').type('Helloworld')
        cy.get('#firstName').type('Mary')
        cy.get('#lastName').type('Moose')
        cy.get('input[name="password"]').type('MouseTest508')
        cy.get('[name="confirm"]').type('MouseTest508')
        cy.get('h2').contains('Password').click()
        cy.get('.submit_button').should('be.disabled')
        cy.get('#success_message').should('not.be.visible')
    })
})