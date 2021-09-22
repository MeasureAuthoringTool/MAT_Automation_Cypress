import * as helper from '../helpers'
import * as dashboard from '../../pom/BonnieFHIR/WI/Dashboard'
import * as importMeasureDialog from '../../pom/BonnieFHIR/WI/ImportMeasureDialog'

const baseUrl = Cypress.config().baseUrl
let username = ''
let password = ''
let mongoURL = ''
let mongoGroupId = ''
let mongoId = ''
const sslCert = Cypress.env('MONGO_SSLCERT')

switch (Cypress.env('environment')) {
  case 'bonnieQDM56Dev':
    mongoURL = Cypress.env('DEVmongoURL')
    mongoGroupId = Cypress.env('DEVQDM56_DB_MONGO_GROUPID')

    username = Cypress.env('DEV_USERNAME')
    password = Cypress.env('DEV_PASSWORD')


    break
  case 'bonnieFHIRDev':
    mongoURL = Cypress.env('DEVmongoURL')
    mongoGroupId = Cypress.env('DEVFHIR_DB_MONGO_GROUPID')
    mongoId = Cypress.env('DEVFHIR_DB_MONGO_id')

    username = Cypress.env('DEV_USERNAME')
    password = Cypress.env('DEV_PASSWORD')

    break

  case 'bonnieQDM55Dev':
    mongoURL = Cypress.env('DEVmongoURL')
    mongoGroupId = Cypress.env('DEVQDM55_DB_MONGO_GROUPID')

    username = Cypress.env('DEV_USERNAME')
    password = Cypress.env('DEV_PASSWORD')

    break
}

export const login = () => {

  //remove measures and patients for user
  cy.task('bonnieDeleteMeasuresAndPatients', {mongoGroupId: mongoGroupId, mongoURL: mongoURL, sslCert: sslCert})
    .then(results => {
      cy.log('bonnieDeleteMeasuresAndPatients Task finished')
    })
  //Get Session
  cy.task(`getSession`, {username: username, password: password, url: baseUrl}).then(session => {
    cy.restoreSession(session)
  })
  cy.visit('/')

  helper.visibleWithTimeout(importMeasureDialog.importMeasureDialog)

  cy.clearCookie('_bonnie_session')

  helper.visibleWithTimeout(importMeasureDialog.closeBtn)

  cy.get(importMeasureDialog.closeBtn).click()

  helper.visibleWithTimeout(dashboard.uploadBtn)
  helper.enabledWithTimeout(dashboard.uploadBtn)

  cy.log('Login Successful')
}

export const logout = () => {

  helper.visibleWithTimeout(dashboard.signOutBtn)

  cy.get(dashboard.signOutBtn).click({ force: true })

  cy.log('Logout Successful')

}

