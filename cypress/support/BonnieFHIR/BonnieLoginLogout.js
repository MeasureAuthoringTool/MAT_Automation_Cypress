import * as helper from '../helpers'
import * as signInpage from '../../pom/BonnieFHIR/WI/Sign_in'
import * as dashboard from '../../pom/BonnieFHIR/WI/Dashboard'
import * as sshTunnel from './SSHMongoDB'
import * as importMeasureDialog from '../../pom/BonnieFHIR/WI/ImportMeasureDialog'

let bonnieURL = Cypress.env('bonnieFhirBaseUrl')
let username = ''
let password = ''
let mongoUserId = ''

switch (Cypress.env('environment')) {
  case 'dev':
    username = Cypress.env('BONNIE_FHIR_DEV_USERNAME')
    password = Cypress.env('BONNIE_FHIR_DEV_PASSWORD')
    mongoUserId = Cypress.env('DEV_DB_MONGO_USERID')
    break
  case 'stag':
    username = Cypress.env('BONNIE_FHIR_STAG_USERNAME')
    password = Cypress.env('BONNIE_FHIR_STAG_PASSWORD')
}

export const login = () => {

  //remove measures and patients for user
  cy.task('bonnieFHIRDeleteMeasuresAndPatients', {sshTunnel: sshTunnel.sshTunnelConfig, mongoUserId: mongoUserId})
    .then(results => {
      cy.log('bonnieFHIRDeleteMeasuresAndPatients Task finished')
    })

  cy.visit(bonnieURL + '/users/sign_in')

  helper.enabledWithTimeout(signInpage.passwordInputBox)

  helper.enterText(signInpage.usernameInputBox, username)
  helper.enterText(signInpage.passwordInputBox, password)

  cy.get(signInpage.loginBtn).click()

  helper.visibleWithTimeout(dashboard.navigationBar)

  helper.visibleWithTimeout(importMeasureDialog.importMeasureDialog)

  cy.get(importMeasureDialog.closeBtn).click()

  helper.notVisibleWithTimeout(importMeasureDialog.importMeasureDialog)

  cy.log('Login Successful')
}

export const logout = () => {

  helper.visibleWithTimeout(dashboard.signOutBtn)

  cy.get(dashboard.signOutBtn).click()

  helper.visibleWithTimeout(signInpage.usernameInputBox)

  cy.log('Logout Successful')

}

