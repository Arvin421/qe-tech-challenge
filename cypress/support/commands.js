// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('VerifyAllCarts', (allPlans) => {
    for(let i=0; i<allPlans.length; i++) { //loop based on get result plans
        cy.get('[data-testid="plan-card-'+allPlans[i].id) //check if plan id matches the get and fron-end plan id
        .should('be.visible')
        .within(() => {
            cy.contains(allPlans[i].planName)
            .should('have.text', allPlans[i].planName) //check if plan name matches the get and fron-end plan name
        })
        cy.get('[id="primaryPlans"]').get('[data-index]').should('have.length', allPlans.length).eq([i]) //check if plans list matches the get and front end
        .within(() => {
            cy.contains('Add to cart').click({force:true})
        })
        cy.get('[data-testid="sticky-cart"]').contains("Continue to cart").click().wait(10000)
        cy.get('[class="Textstyles__StyledText-sc-x9yfwz-0 dLhOBF"] >[class="RichText__Root-sc-1i7juze-0 kCOpqt"]')        
        .should('have.text', allPlans[i].planProductName)   //assert if plan product name is equal to add to cart
        cy.screenshot(allPlans[i].planProductName, {'capture': 'fullPage','log': true} ) // capture screenshots
        cy.get('[data-testid="remove-bundle-cta"]').click()
        cy.visit("https://www.vodafone.com.au/plans/sim-only")
    }  
})