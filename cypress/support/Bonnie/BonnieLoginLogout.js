import * as helper from '../helpers'
import * as signInpage from '../../pom/BonnieFHIR/WI/Sign_in'
import * as dashboard from '../../pom/BonnieFHIR/WI/Dashboard'
import * as importMeasureDialog from '../../pom/BonnieFHIR/WI/ImportMeasureDialog'

let mongoURL = ''
let mongoGroupId = ''
const sslCert = Cypress.env('MONGO_SSLCERT')

switch (Cypress.env('environment')) {
  case 'bonnieQDM56Dev':
    mongoURL = Cypress.env('DEVmongoURL')
    mongoGroupId = Cypress.env('DEVQDM56_DB_MONGO_GROUPID')
    break
  case 'stag':
}

export const login = () => {

  //remove measures and patients for user
  cy.task('bonnieDeleteMeasuresAndPatients', {mongoGroupId: mongoGroupId, mongoURL: mongoURL, sslCert: sslCert})
    .then(results => {
      cy.log('bonnieDeleteMeasuresAndPatients Task finished')
    })

  cy.visit('/')

  helper.enabledWithTimeout(signInpage.passwordInputBox)

  //helper.enterText(signInpage.usernameInputBox, username)
  //helper.enterText(signInpage.passwordInputBox, password)

  cy.get(signInpage.loginBtn).click()

  helper.visibleWithTimeout(dashboard.navigationBar)

  helper.visibleWithTimeout(importMeasureDialog.importMeasureDialog)

  cy.get(importMeasureDialog.closeBtn).click()

  helper.notVisibleWithTimeout(importMeasureDialog.importMeasureDialog)

  cy.log('Login Successful')
}

export const logout = () => {

  helper.visibleWithTimeout(dashboard.signOutBtn)

  cy.get(dashboard.signOutBtn).click({ force: true })

  helper.visibleWithTimeout(signInpage.usernameInputBox)

  cy.log('Logout Successful')

}

