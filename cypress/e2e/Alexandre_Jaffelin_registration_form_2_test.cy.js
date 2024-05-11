beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_2.html')
})

/*
Assignement 4: add content to the following tests
*/

describe('Section 1: Functional tests', () => {

    it('User can use only same both first and validation passwords', ()=>{
        // Add test steps for filling in only mandatory fields
        cy.get("#username").type("Diabinho")
        cy.get("#email").type("alexandrejaffelin@gmail.com")
        cy.get("input[name='name']").type("Alexandre")
        cy.get("input[data-testid='lastNameTestId']").type("Jaffelin")
        cy.get("input[data-testid='phoneNumberTestId']").type("999888777")
        cy.get("#password").type("password321")

        // Type confirmation password which is different from first password
        cy.get("#confirm").type("password123")

        // Type click to be outside to fire submit button or not
        cy.get("h2").contains("Password").click()

        // Assert that submit button is not enabled
        cy.get(".submit_button").should("be.disabled")

        // Assert that successful message is not visible
        cy.get("#success_message").should("not.be.visible")

        // Assert that error message is visible
        cy.get("#password_error_message").should("be.visible").should('contain', 'Passwords do not match!')

        // Change the test, so the passwords would match
        cy.get("#confirm").scrollIntoView()
        cy.get('#confirm').clear()
        cy.get('#confirm').type("password321")

        // Type click to be outside to fire submit button or not
        cy.get("h2").contains("Password").click()

        // Add assertion, that submit button is now enabled
        cy.get(".submit_button").should('be.enabled') 

        // Add assertion, that error message is not visible anymore
        cy.get("#password_error_message").should("not.be.visible")
    })
    
    it('User can submit form with all fields added', ()=>{
        // Add test steps for filling in ALL fields
        // Mandatory fields
        cy.get("#username").type("Diabinho")
        cy.get("#email").type("alexandrejaffelin@gmail.com")
        cy.get("input[name='name']").type("Alexandre")
        cy.get("input[data-testid='lastNameTestId']").type("Jaffelin")
        cy.get("input[data-testid='phoneNumberTestId']").type("999888777")
        cy.get("#password").type("password321")
        cy.get("#confirm").type("password321")

        // Optional fields
        cy.get("#javascriptFavLanguage").click()
        cy.get("#vehicle1").click()
        cy.get("select[name='cars']").select("Audi")
        cy.get("select[name='animal']").select("Dog")

        cy.get("h2").contains("Password").click()

        // Assert that submit button is enabled
        cy.get(".submit_button").should("be.enabled")

        // Assert that after submitting the form system show successful message
        cy.get(".submit_button").click()
        cy.get("#success_message").should("be.visible")
    })

    it('User can submit form with valid data and only mandatory fields added', ()=>{
        // Add test steps for filling in ONLY mandatory fields
        cy.get("#username").type("Diabinho")
        cy.get("#email").type("alexandrejaffelin@gmail.com")
        cy.get("input[name='name']").type("Alexandre")
        cy.get("input[data-testid='lastNameTestId']").type("Jaffelin")
        cy.get("input[data-testid='phoneNumberTestId']").type("999888777")
        cy.get("#password").type("password321")
        cy.get("#confirm").type("password321")

        cy.get("h2").contains("Password").click()

        // Assert that submit button is enabled
        cy.get(".submit_button").should("be.enabled")

        // Assert that after submitting the form system shows successful message
        cy.get(".submit_button").click()
        cy.get("#success_message").should("be.visible")

        // example, how to use function, which fills in all mandatory data
        // in order to see the content of the function, scroll to the end of the file
        inputValidData('johnDoe')
    })

    // Add at least 1 test for checking some mandatory field's absence
    it('User cannot submit form without mandatory fields', () =>{

        // functions to fill mandatory fields
        inputValidData('johnDoe')

        // mandatory field confirm password is empty
        cy.get("#confirm").scrollIntoView()
        cy.get('#confirm').clear()

        // Type click to be outside to fire submit button or not
        cy.get("h2").contains("Password").click()

        // submit button is disabled
        cy.get(".submit_button").should("be.disabled")

        // successful message is not visible 
        cy.get('#success_message').should('not.be.visible')

        // Assert that error message is visible
        cy.get("#password_error_message").should("be.visible")

    })


})

/*
Assignement 5: create more visual tests
*/

describe('Section 2: Visual tests', () => {
    it('Check that logo is correct and has correct size', () => {
        cy.log('Will check logo source and size')
        cy.get('#logo').should('have.attr', 'src').should('include', 'cerebrum_hub_logo')
        // get element and check its parameter height
        // it should be less than 178 and greater than 100
        cy.get('#logo').invoke('height').should('be.lessThan', 178)
            .and('be.greaterThan', 100)   
    })

    it('My test for second picture', () => {
        // Create similar test for checking the second picture
        cy.log("Will check for height and width")
        cy.get("[data-cy=cypress_logo]").should("have.attr", "src").should("include", "cypress_logo")
        cy.get("[data-cy=cypress_logo]").invoke("height").should("be.lessThan", 100)
            .and("be.greaterThan", 75)
        cy.get("[data-cy=cypress_logo]").invoke("width").should("be.lessThan", 130)
            .and("be.greaterThan", 95)
    })

    it('Check navigation part', () => {
        cy.get('nav').children().should('have.length', 2)

        // Get navigation element, find siblings that contains h1 and check if it has Registration form in string
        cy.get('nav').siblings('h1').should('have.text', 'Registration form number 2')
        
        // Get navigation element, find its first child, check the link content and click it
        cy.get('nav').children().eq(0).should('be.visible')
            .and('have.attr', 'href', 'registration_form_1.html')
            .click()
        
        // Check that currently opened URL is correct
        cy.url().should('contain', '/registration_form_1.html')
        
        // Go back to previous page
        cy.go('back')
        cy.log('Back again in registration form 2')
    })

    // Create similar test for checking the second link 
    it('Check second navigation part link', () => {
        cy.get('nav').children().should('have.length', 2)

        // Get navigation element, find siblings that contains h1 and check if it has Registration form in string
        cy.get('nav').siblings('h1').should('have.text', 'Registration form number 2')
        
        // Get navigation element, find its first child, check the link content and click it
        cy.get('nav').children().eq(1).should('be.visible')
            .and('have.attr', 'href', 'registration_form_3.html')
            .click()
        
        // Check that currently opened URL is correct
        cy.url().should('contain', '/registration_form_3.html')
        
        // Go back to previous page
        cy.go('back')
        cy.log('Back again in registration form 2')
    
    })

    it('Check that radio button list is correct', () => {
        // Array of found elements with given selector has 4 elements in total
        cy.get('input[type="radio"]').should('have.length', 4)

        // Verify labels of the radio buttons
        cy.get('input[type="radio"]').next().eq(0).should('have.text','HTML')
        cy.get('input[type="radio"]').next().eq(1).should('have.text','CSS')
        cy.get('input[type="radio"]').next().eq(2).should('have.text','JavaScript')
        cy.get('input[type="radio"]').next().eq(3).should('have.text','PHP')

        //Verify default state of radio buttons
        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
        cy.get('input[type="radio"]').eq(1).should('not.be.checked')
        cy.get('input[type="radio"]').eq(2).should('not.be.checked')
        cy.get('input[type="radio"]').eq(3).should('not.be.checked')

        // Selecting one will remove selection from the other radio button
        cy.get('input[type="radio"]').eq(0).check().should('be.checked')
        cy.get('input[type="radio"]').eq(1).check().should('be.checked')
        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
    })

    // Create test similar to previous one verifying check boxes

    it('Check that check boxes list is correct', () => {
        // Array of found elements with given selector has 3 elements in total
        cy.get('input[class="checkbox vehicles"]').should('have.length', 3)

        // Verify labels of the checkboxes buttons
        cy.get("#vehicle1").should('have.value','Bike')
        cy.get("#vehicle2").should('have.value','Car')
        cy.get("#vehicle3").should('have.value','Boat')

        //Verify default state of checkboxes buttons
        cy.get("#vehicle1").should('not.be.checked')
        cy.get("#vehicle2").should('not.be.checked')
        cy.get("#vehicle3").should('not.be.checked')

        // Click one or more will check one or more checkboxes 
        cy.get("#vehicle1").click()
        cy.get("#vehicle2").click()
        cy.get("#vehicle3").click()

        cy.get("#vehicle1").should('be.checked')
        cy.get("#vehicle2").should('be.checked')
        cy.get("#vehicle3").should('be.checked')

        // Click one or more will uncheck one or more checkboxes
        cy.get("#vehicle1").click()
        cy.get("#vehicle2").click()
        cy.get("#vehicle1").should('not.be.checked')
        cy.get("#vehicle2").should('not.be.checked')

    })

    it('Car dropdown is correct', () => {
        // Here is just an example how to explicitely create screenshot from the code
        // Select second element and create screenshot for this area or full page
        cy.get('#cars').select(1).screenshot('Cars drop-down')
        cy.screenshot('Full page screenshot')

        // Here are given different solutions how to get the length of array of elements in Cars dropdown
        // Next 2 lines of code do exactly the same!
        cy.get('#cars').children().should('have.length', 4)
        cy.get('#cars').find('option').should('have.length', 4)
        
        // Check  that first element in the dropdown has text Volvo
        cy.get('#cars').find('option').eq(0).should('have.text', 'Volvo')
        
        // Advanced level how to check the content of the Cars dropdown
        cy.get('#cars').find('option').then(options => {
            const actual = [...options].map(option => option.value)
            expect(actual).to.deep.eq(['volvo', 'saab', 'opel', 'audi'])
        })
    })

    // Create test similar to previous one

    it('Animal dropdown is correct', () => {
        // Here is just an example how to explicitely create screenshot from the code
        // Select second element and create screenshot for this area or full page
        cy.get('#animal').select(1).screenshot('Animal drop-down')
        cy.screenshot('Full page screenshot')

        // Here are given different solutions on how to get the length of array of elements in Animal dropdown
        // Next 2 lines of code do exactly the same!
        cy.get('#animal').children().should('have.length', 6)
        cy.get('#animal').find('option').should('have.length', 6)
        
        // Check that the elements in the dropdown have text Dog, Cat, Snake, Hippo, Cow, Horse
        cy.get('#animal').find('option').eq(0).should('have.text', 'Dog')
        cy.get('#animal').find('option').eq(1).should('have.text', 'Cat')
        cy.get('#animal').find('option').eq(2).should('have.text', 'Snake')
        cy.get('#animal').find('option').eq(3).should('have.text', 'Hippo')
        cy.get('#animal').find('option').eq(4).should('have.text', 'Cow')
        cy.get('#animal').find('option').eq(5).should('have.text', 'Horse')

        // Advanced level on how to check the content (value) of the Animal dropdown
        cy.get('#animal').find('option').then(options => {
            const actual = [...options].map(option => option.value)
            expect(actual).to.deep.eq(['dog', 'cat', 'snake', 'hippo', 'cow', 'mouse'])
        })
    })

})

function inputValidData(username) {
    cy.log('Username will be filled')
    cy.get('input[data-testid="user"]').type(username)
    cy.get('#email').type('validemail@yeap.com')
    cy.get('[data-cy="name"]').type('John')
    cy.get('#lastName').type('Doe')
    cy.get('[data-testid="phoneNumberTestId"]').type('10203040')
    cy.get('#password').type('MyPass')
    cy.get('#confirm').type('MyPass')
    cy.get('h2').contains('Password').click()
}