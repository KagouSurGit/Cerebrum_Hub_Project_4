beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_3.html')
})

/*
BONUS TASK: add visual tests for registration form 3
Task list:
* Create test suite for visual tests for registration form 3 (describe block)
* Create tests to verify visual parts of the page:
    * radio buttons and its content
    * dropdown and dependencies between 2 dropdowns:
        * list of cities changes depending on the choice of country
        * if city is already chosen and country is updated, then city choice should be removed
    * checkboxes, their content and links
    * email format
 */

describe('Test suite for visual tests for registration form 3', () => {

    // input name and email
    it('check name and email', () => {
        cy.get('#name').type('Alexandre')
        cy.get('input[name="email"]').type('alexandrejaffelin@gmail.com')

        // alert not visible
        cy.get('#emailAlert').should('not.be.visible')

        // checking name and email
        cy.get('#name').should('have.value', 'Alexandre')
        cy.get('input[name="email"]').should('have.value', 'alexandrejaffelin@gmail.com')
        cy.get('input[name="email"]').scrollIntoView()
        cy.get('input[name="email"]').clear()
        
        // alert visible
        cy.get('#emailAlert').should('be.visible')
    })

    /* I don't know the answer 

    it('check dropdown for countries', () => {
        cy.get()
    })
    */

    it('checks for radio buttons and its content', () => {

        // check length of radio button content
        cy.get('input[type="radio"]').should('have.length', 4)

        // check values with text Daily, Weekly, Monthly, Never
        cy.get('input[type="radio"]').next().eq(0).should('have.text', 'Daily')
        cy.get('input[type="radio"]').next().eq(1).should('have.text', 'Weekly')
        cy.get('input[type="radio"]').next().eq(2).should('have.text', 'Monthly')
        cy.get('input[type="radio"]').next().eq(3).should('have.text', 'Never')

        // check default radio buttons
        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
        cy.get('input[type="radio"]').eq(1).should('not.be.checked')
        cy.get('input[type="radio"]').eq(2).should('not.be.checked')
        cy.get('input[type="radio"]').eq(3).should('not.be.checked')

        // one radio checked should keep the others unchecked
        // first one clicked
        cy.get('input[type="radio"]').eq(0).check().should('be.checked')
        cy.get('input[type="radio"]').eq(1).should('not.be.checked')
        cy.get('input[type="radio"]').eq(2).should('not.be.checked')
        cy.get('input[type="radio"]').eq(3).should('not.be.checked')

        // second one clicked
        cy.get('input[type="radio"]').eq(1).check().should('be.checked')
        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
        cy.get('input[type="radio"]').eq(2).should('not.be.checked')
        cy.get('input[type="radio"]').eq(3).should('not.be.checked')

        // third one clicked
        cy.get('input[type="radio"]').eq(2).check().should('be.checked')
        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
        cy.get('input[type="radio"]').eq(1).should('not.be.checked')
        cy.get('input[type="radio"]').eq(3).should('not.be.checked')

        // fourth one clicked
        cy.get('input[type="radio"]').eq(3).check().should('be.checked')
        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
        cy.get('input[type="radio"]').eq(1).should('not.be.checked')
        cy.get('input[type="radio"]').eq(2).should('not.be.checked')

    })

    it('Birthday check', () => {

        // type date for birthday
        cy.get('#birthday').type('1995-02-19')

        // verify date input
        cy.get('#birthday').should('have.value', '1995-02-19')

        // check if upload file exists
        cy.contains('h1', 'Upload a file').should('exist')
    })

    it('checkboxes are checked', () => {

        // check length checkboxes
        cy.get('input[type="checkbox"]').should('have.length', 2)

        // boxes checked
        cy.get('input[type="checkbox"]').eq(0).check()
        cy.get('input[type="checkbox"]').eq(1).check()
        cy.get('button').find('a').should('have.attr', 'href', 'cookiePolicy.html')

        // check alert message
        cy.get('input[type="checkbox"]').eq(1).uncheck()

        // wrong
        // cy.get('#checkboxAlert span').should('be.visible')
        cy.get('h2').contains('Birthday').click()
    })

})


/*
BONUS TASK: add functional tests for registration form 3
Task list:
* Create second test suite for functional tests
* Create tests to verify logic of the page:
    * all fields are filled in + corresponding assertions
    * only mandatory fields are filled in + corresponding assertions
    * mandatory fields are absent + corresponding assertions (try using function)
    * add file functionlity(google yourself for solution!)
 */