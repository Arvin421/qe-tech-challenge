const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    chromeWebSecurity : false,
    specPattern: 'cypress/integration/examples/*.js',
    baseUrl: 'https://api-prod.prod.cms.df.services.vodafone.com.au',
    failOnStatusCode: false,
    pageLoadTimeout: 50000
  },
});
