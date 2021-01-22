import * as helper from '../helpers'
import * as signInpage from '../../pom/BonnieFHIR/WI/Sign_in'
import * as dashboard from '../../pom/BonnieFHIR/WI/Dashboard'

let bonnieURL = Cypress.env('bonnieFhirBaseUrl')
let username = ''
let password = ''

switch (Cypress.env('environment')) {
  case 'dev':
    username = Cypress.env('BONNIE_FHIR_DEV_USERNAME')
    password = Cypress.env('BONNIE_FHIR_DEV_PASSWORD')
    break
  case 'stag':
    username = Cypress.env('BONNIE_FHIR_STAG_USERNAME')
    password = Cypress.env('BONNIE_FHIR_STAG_PASSWORD')
}

export const login = () => {

  cy.visit(bonnieURL + '/users/sign_in')

  helper.enabledWithTimeout(signInpage.passwordInputBox)

  helper.enterText(signInpage.usernameInputBox, username)
  helper.enterText(signInpage.passwordInputBox, password)

  cy.get(signInpage.loginBtn).click()

  helper.visibleWithTimeout(dashboard.navigationBar)

  cy.log('Login Successful')
}

export const logout = () => {

  helper.visibleWithTimeout(dashboard.signOutBtn)

  cy.get(dashboard.signOutBtn).click()

  helper.visibleWithTimeout(signInpage.usernameInputBox)

  cy.log('Logout Successful')

}

