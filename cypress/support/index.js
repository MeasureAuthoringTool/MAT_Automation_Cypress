// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'
import 'cypress-axe'

// Retry failed tests:
require('cypress-plugin-retries')
require('cypress-file-upload')
require('cypress-commands')

// Alternatively you can use CommonJS syntax:
// require('./commands')

Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false;
});
Cypress.Server.defaults({
  delay: 500,
  force404: false,
  whitelist: (xhr) => {
    return true;
  }
});

const addContext = require('mochawesome/addContext');

Cypress.on('test:after:run', (test, runnable) => {
  if (test.state === 'failed') {
    addContext({test}, { title: "Screenshot", value:`assets/${Cypress.spec.name}/${runnable.parent.title} -- ${test.title} (failed).png` })
  }
})