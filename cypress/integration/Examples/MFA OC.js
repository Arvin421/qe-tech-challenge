const { gzipSync } = require("zlib")
import Helper from '../../support/helper'

describe('MFA Get The Codes', function () {
const helper = new Helper()
Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
})

    it('Input Valid Code', function ()  {
        cy.OCPage_Login()
        cy.Check_Verify_identity_Page()
        cy.screenshot({'capture': 'fullPage','log': true} )
        cy.wait(5000)
        helper.get2facode()
        .then(otp => {
            cy.log(otp)
            cy.Check_Enter_code_Page()
            .get('[class="ng-star-inserted"]')
            .get('[id="mat-input-2"]').click({force: true}).type(otp)
            .get('[id=verify-button]').click({force: true})
            //cy.screenshot({'capture': 'fullPage','log': true} )
        })
    })
    it('Input Invalid Code and Multiple Attempts', function ()  {
        cy.OCPage_Login()
        cy.Check_Verify_identity_Page()
        cy.screenshot({'capture': 'fullPage','log': true} )
        cy.wait(3000)
        cy.Check_Enter_code_Page()
        cy.screenshot({'capture': 'fullPage','log': true} )
        cy.Check_Invalid_Code_OC()
        cy.screenshot({'capture': 'fullPage','log': true} )
        cy.Check_Invalid_Code_MultipleAttempts_OC()
    }) //Not included in phase 1 scope
    it('Verify Resend Code link', function ()  {
        cy.OCPage_Login()
        cy.Check_Verify_identity_Page()
        cy.wait(3000)
        cy.Check_Enter_code_Page()
        .get('[class="ng-star-inserted"]').get('[class="resend-paragraph ng-star-inserted"]').contains("Resend code").click({force: true})
        //cy.screenshot({'capture': 'fullPage','log': true} )
    })
})