beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_3.html')
})

/*
BONUS TASK: Add visual tests for registration form 3
*/

describe('Visual tests for form 3', () => {
    it('Check that logo is correct and has correct size', () => {
        cy.log('Will check Cerebrum Hub logo source and size')
        cy.get('img[data-testid="picture"]').should('have.attr', 'src').should('include', 'cerebrum_hub_logo')
        cy.get('img[data-testid="picture"]').invoke('height').should('equal', 166)
        cy.get('img[data-testid="picture"]').invoke('width').should('equal', 178)  
    })


    it('Email input should support correct format', () => {
        cy.get('input[name="email"]').should('have.attr', 'ng-model', 'email')
        cy.get('input[name="email"]').type('invalid')
        cy.get('h2').contains('Birthday').click()
        cy.get('span[ng-show="myForm.email.$error.email"]').should('be.visible').should('contain', 'Invalid email address.')
        cy.get('input[type="submit"]').should('be.disabled')
    })


    it('Country and city dropdowns are correct and change accordingly when updated', () => {
        // Default state of both dropdowns
        cy.get('#country').should('not.have.value')
        cy.get('#city').should('not.have.value').should('be.disabled')

        // Verifying country option labels
        cy.get('#country').find('option').should('have.length', 4)
        cy.get('#country').find('option').eq(0).should('not.have.value')
        cy.get('#country').find('option').eq(1).should('have.text', 'Spain')
        cy.get('#country').find('option').eq(2).should('have.text', 'Estonia')
        cy.get('#country').find('option').eq(3).should('have.text', 'Austria')
        
        // If a country is selected, its cities will become visible in the second dropdown menu
        
        // Selecting Spain
        cy.get('#country').select('Spain')
        cy.get('#country option').eq(1).should('be.selected')
        cy.get('#city').find('option').should('be.visible').should('have.length', 5)
        cy.get('#city option').eq(0).should('not.have.value')
        cy.get('#city option').eq(1).should('have.text', 'Malaga')
        cy.get('#city option').eq(2).should('have.text', 'Madrid')
        cy.get('#city option').eq(3).should('have.text', 'Valencia')
        cy.get('#city option').eq(4).should('have.text', 'Corralejo')

        // Selecting Estonia
        cy.get('#country').select('Estonia')
        cy.get('#country option').eq(2).should('be.selected')
        cy.get('#city').find('option').should('be.visible').should('have.length', 4)
        cy.get('#city option').eq(0).should('not.have.value')
        cy.get('#city option').eq(1).should('have.text', 'Tallinn')
        cy.get('#city option').eq(2).should('have.text', 'Haapsalu')
        cy.get('#city option').eq(3).should('have.text', 'Tartu')

        // Selecting Austria
        cy.get('#country').select('Austria')
        cy.get('#country option').eq(3).should('be.selected')
        cy.get('#city').find('option').should('be.visible').should('have.length', 4)
        cy.get('#city option').eq(0).should('not.have.value')
        cy.get('#city option').eq(1).should('have.text', 'Vienna')
        cy.get('#city option').eq(2).should('have.text', 'Salzburg')
        cy.get('#city option').eq(3).should('have.text', 'Innsbruck')

        // If city is already chosen and country is updated, then city choice should be removed
        cy.get('#city').select('Vienna')
        cy.get('#city option').eq(1).should('be.selected')
        cy.get('#country').select('Estonia')
        cy.get('#country option').eq(2).should('be.selected')
        cy.get('#city').find('option').should('be.visible').should('have.length', 4).then(options => {
            const actual = [...options].map(option => option.label)
            expect(actual).to.deep.eq(['','Tallinn', 'Haapsalu', 'Tartu'])
        })
        cy.get('#city').should('not.have.text', 'Vienna').should('not.be.selected')

    })


    it('Check that radio button list is correct', () => {
        cy.get('input[type="radio"]').should('have.length', 4)
        cy.get('input[type="radio"]').next().eq(0).should('have.text','Daily')
        cy.get('input[type="radio"]').next().eq(1).should('have.text','Weekly')
        cy.get('input[type="radio"]').next().eq(2).should('have.text','Monthly')
        cy.get('input[type="radio"]').next().eq(3).should('have.text','Never')
        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
        cy.get('input[type="radio"]').eq(1).should('not.be.checked')
        cy.get('input[type="radio"]').eq(2).should('not.be.checked')
        cy.get('input[type="radio"]').eq(3).should('not.be.checked')
        cy.get('input[type="radio"]').eq(0).check().should('be.checked')
        cy.get('input[type="radio"]').eq(1).check().should('be.checked')
        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
        
    })
    

    it('Check that checkboxes and its link are correct', () => {
        cy.get('input[type="checkbox"]').should('have.length', 2)
        cy.get('input[type="checkbox"]').parent().should('contain', 'Accept our privacy policy')
        cy.get('input[type="checkbox"]').parent().get('a[href]').should('contain', 'Accept our cookie policy')
        cy.get('input[type="checkbox"]').eq(0).should('not.be.checked')
        cy.get('input[type="checkbox"]').eq(1).should('not.be.checked')
        cy.get('input[type="checkbox"]').eq(0).check().should('be.checked')
        cy.get('input[type="checkbox"]').eq(1).check().should('be.checked')
        cy.get('input[type="checkbox"]').eq(0).should('be.checked')
        cy.get('input[type="checkbox"]').eq(0).uncheck().should('not.be.checked')
        cy.get('input[type="checkbox"]').eq(1).uncheck().should('not.be.checked')

        // Checking the cookie policy link
        cy.get('a').should('be.visible').and('have.attr', 'href', 'cookiePolicy.html').click()
        cy.url().should('contain', '/cookiePolicy.html')
        cy.go('back')
        cy.url().should('contain', '/registration_form_3.html')
        cy.log('Back again in registration form 3')

    })

})


/*
BONUS TASK: Add functional tests for registration form 3
 */


describe('Functional tests for form 3', () => {
    it('User can submit form with all fields added', () => {
        cy.get('#name').type('Nancy')
        cy.get('input[name="email"]').type('tst88@gmail.com')
        cy.get('#country').select('Estonia')
        cy.get('#country option').eq(2).should('be.selected')
        cy.get('#city').select('Haapsalu')
        cy.get('#city option').eq(2).should('be.selected')
        cy.get('input[type="date"]').eq(0).click().type('2024-08-22')
        cy.get('input[type="radio"]').eq(3).check().should('be.checked')
        cy.get('#birthday').click().type('1988-04-21')
        cy.get('input[type="checkbox"]').eq(0).check().should('be.checked')
        cy.get('input[type="checkbox"]').eq(1).check().should('be.checked')
        cy.get('input[type="file"]').selectFile('cypress/fixtures/cypress_logo.png')
        cy.get('input[type="submit"]').should('be.enabled').click()
        cy.get('h1').contains('Submission received').should('be.visible')

    })


    it('User can submit form with valid data and only mandatory fields added', () => {
        inputMandatoryFields('karen55@yahoo.com')
        cy.get('input[type="submit"]').should('be.enabled').click()
        cy.get('h1').contains('Submission received').should('be.visible')
    })


    it('User cannot submit empty form', () => {
        cy.get('input[type="submit"]').should('be.disabled')
    })


    it('User cannot submit data when email is missing', () => {
        inputMandatoryFields('karen55@yahoo.com')
        cy.get('input[name="email"]').clear()
        cy.get('h2').contains('Birthday').click()
        cy.get('input[type="submit"]').should('be.disabled')
        cy.get('span[ng-show="myForm.email.$error.required"]').should('be.visible').should('contain', 'Email is required.')
    })


    it('User cannot submit data when country is missing ', () => {
        inputMandatoryFields('karen55@yahoo.com')
        cy.get('#country').select(0)
        cy.get('h2').contains('Birthday').click()
        cy.get('input[type="submit"]').should('be.disabled')
    })


    it('User cannot submit data when city is missing ', () => {
        inputMandatoryFields('karen55@yahoo.com')
        cy.get('#city').select(0)
        cy.get('h2').contains('Birthday').click()
        cy.get('input[type="submit"]').should('be.disabled')
    })


    it('User cannot submit data if privacy policy is not checked ', () => {
        inputMandatoryFields('karen55@yahoo.com')
        cy.get('input[type="checkbox"]').eq(0).uncheck().should('not.be.checked')
        cy.get('h2').contains('Birthday').click()
        cy.get('input[type="submit"]').should('be.disabled')
    })


    it('User can add a file using .selectFile', () => {
        cy.get('input[type="file"]').selectFile('cypress/fixtures/cypress_logo.png').should('be.visible')
    })


    it('User can add a file using .selectFile drag and drop mode', () => {
        cy.get('input[type="file"]').selectFile('cypress/fixtures/cypress_logo.png', {action: 'drag-drop'}).should('be.visible')
    })


})


// Filling in mandatory fields
function inputMandatoryFields(email) {
    cy.log('Mandatory fields will be filled')
    cy.get('input[name="email"]').type(email)
    cy.get('#country').select('Austria')
    cy.get('#country option').eq(3).should('be.selected')
    cy.get('#city').select('Salzburg')
    cy.get('#city option').eq(2).should('be.selected')
    cy.get('input[type="checkbox"]').eq(0).check().should('be.checked')
    cy.get('h2').contains('Birthday').click()
}
