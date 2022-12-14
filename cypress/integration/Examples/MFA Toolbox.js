const { gzipSync } = require("zlib")
import Helper from '../../support/helper'

describe('MFA Get The Codes', function () {
const helper = new Helper()

    it('Input Valid Code', function ()  {
        cy.NovusIINET_Login()
        cy.wait(5000)
        cy.ToolboxLogin()
        cy.Check_Verify_identity_Page()
        cy.wait(5000)
        helper.get2facode()
        .then(otp => {
            cy.log(otp)
            cy.Check_Enter_code_Page()
            .get('[id="otpCode0"]').type(otp)
            .get('[id=verify-button]').click()
        })
    })
    it('Input Invalid Code and Multiple Attempts', function ()  {
        cy.NovusIINET_Login()
        cy.ToolboxLogin()
        cy.Check_Verify_identity_Page()
        cy.wait(3000)
        cy.Check_Enter_code_Page()
        cy.Check_Invalid_Code()
        cy.Check_Invalid_Code_MultipleAttempts()
    })
    it('Input Invalid Code and Multiple Attempts', function ()  {
        cy.NovusIINET_Login()
        cy.ToolboxLogin()
        cy.Check_Verify_identity_Page()
        cy.wait(3000)
        cy.Check_Enter_code_Page()
        cy.Check_Invalid_Code()
        cy.Check_Invalid_Code_MultipleAttempts()
    })
})

