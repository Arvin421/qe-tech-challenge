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

Cypress.Commands.add('NovusIINET_Login', () => {
    cy.visit("https://novus-ui-staging.iinet.net.au/novus-ui/iinet/index#/customermanagement/find");
    cy.get("[name='username']").type('arvin.gumabay')
    cy.get("[name='password']").type('Kambingloser123')
    cy.get("[type='SUBMIT']").click() 
})

Cypress.Commands.add('ToolboxLogin', () => {
    cy.request({
        method: 'GET',
        url : "novus-ui-staging.iinet.net.au/novus-ui/iinet/novus/customer/management/1183369030/toolbox/login",
    })
    .then((response) => {
        const tbrequest = response.body
        const tblogin = tbrequest.replace('&csrname=arvin.gumabay', '')
        Cypress.on('uncaught:exception', (err, runnable) => {
            return false;
        })
        cy.visit(tblogin)
    })
})

Cypress.Commands.add('Check_Verify_identity_Page', () => {
    cy.get('[class="ng-star-inserted"]')
    .contains('Verify identity').should('be.visible')
    .get('[class="ng-star-inserted"]')
    .contains('Choose a mobile number to receive a security code to verify your identity.').should('be.visible')
    .get('[class="form-row-container"]')
    .contains('Send code').should('be.visible')
    .get('[id="cancel-button"]')
    .contains('Cancel').should('be.visible')
    .get('[id="send-button"]').click()
})

Cypress.Commands.add('Check_mobile_number', () => {
    cy.request({ //get request
        method : 'GET',
        url: "http://smsgwtst-cro-app-01.it.tpgtelecom.com.au:8211/api/v1/messages?direction=MT&&sort=created,desc",
        auth: {
            'user': 'accc',
            'pass': 'password'
        }
    })   
        .then((response) => {
            var mobilenumber =  response.body.content[0].to
            const changeprefix = mobilenumber.replace(mobilenumber.substring(0,3), '0')
            const encryptnumber = changeprefix.replace(changeprefix.substring(2,7), 'XX XXX ')
            cy.wrap(encryptnumber)
        })  
})

Cypress.Commands.add('Check_Enter_code_Page', () => {
    cy.get('[class="mat-card mat-focus-indicator small-card ng-star-inserted"]')
    .get('[class="mat-card-content"]')
    .get('[class="ng-star-inserted"]').contains(' We sent a code to your mobile number ').should('be.visible')
    .get('[class="ng-star-inserted"]').contains('Enter code').should('be.visible')
    .get('[class="ng-star-inserted"]').contains(' Please enter your code to verify your identity. Your code will expire in 5 minutes.').should('be.visible')
    .get('[class="ng-star-inserted"]').contains('Code').should('be.visible')
    .get('[class="form-row-container"]').contains("Verify").should('be.visible')
    .get('[class="form-row-container"]').contains("Back").should('be.visible')
    .get('[class="ng-star-inserted"]').get('[class="resend-paragraph ng-star-inserted"]').contains("Didn't receive a code?").should('be.visible')
    .get('[class="ng-star-inserted"]').get('[class="resend-paragraph ng-star-inserted"]').contains("Resend code").should('be.visible')
})

Cypress.Commands.add('Check_Invalid_Code_Toolbox', () => {
    cy.get('[id="otpCode0"]').type('000000')
    .get('[id=verify-button]').click()
    .get('[class="mat-card-content"]')
    .get('[class="ng-star-inserted"]')
    .contains('Security code is invalid.').should('be.visible')
})

Cypress.Commands.add('Check_Invalid_Code_OC', () => {
    cy.get('[id="mat-input-2"]').click({force: true}).type('000000')
    .get('[id=verify-button]').click({force: true})
    .get('[class="mat-card-content"]')
    .get('[class="ng-star-inserted"]')
    .contains('Security code is invalid.').should('be.visible')
})

Cypress.Commands.add('Check_Invalid_Code_MultipleAttempts', () => {
    cy.get('[id="otpCode0"]').type('111111')
    .get('[id=verify-button]').click()
    .get('[class="mat-card-content"]')
    .get('[class="ng-star-inserted"]')
    .get('[class="mat-error ng-star-inserted"]')
    .get('[class="ng-star-inserted"]')
    .contains(' Security code is invalid. Please try again. You have 3 attempts remaining before we temporarily lock your account. ').should('be.visible')
})

Cypress.Commands.add('Check_Invalid_Code_MultipleAttempts_OC', () => {
    cy.get('[id="mat-input-2"]').click({force: true}).type('000000')
    .get('[id=verify-button]').click({force: true})
    .get('[class="mat-card-content"]')
    .get('[class="ng-star-inserted"]')
    //.get('[class="mat-error ng-star-inserted"]')
    //.get('[class="ng-star-inserted"]')
    //.get('[class="mat-error-1"]')
    .contains('Security code is invalid.').should('be.visible')
})

Cypress.Commands.add('OCPage_Login', () => {
cy.visit("https://iinet-corpwebpre.it.tpgtelecom.com.au/sim-only-plans/tst")
cy.get('[id="mat-tab-label-0-1"]').click()
cy.get('[class="addresscheck__fieldwrap"]')
.get('[id="mat-input-0"]').type("testmfaiinet")
.get('[class="addresscheck__fieldwrap"]')
.get('[id="mat-input-1"]').click({force: true}).type("Pass12345")
.get('[class="text-left"]').contains("Login").click()
})