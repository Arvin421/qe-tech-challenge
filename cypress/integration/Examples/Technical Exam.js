//cypress - spec file is test case
describe('Cypress Practice', function () {
    it('Verify All Plan', function ()  {
        cy.request({ //get request
            method : 'GET',
            url: "plan/postpaid-simo?serviceType=New",
        })
        .then((response) => {
            const allPlans =  response.body.planListing.plans //get response body
            cy.visit("https://www.vodafone.com.au/plans/sim-only")
            Cypress.on('uncaught:exception', (err, runnable) => {
                return false;
            })
        cy.VerifyAllCarts(allPlans)
        })
    })
})
