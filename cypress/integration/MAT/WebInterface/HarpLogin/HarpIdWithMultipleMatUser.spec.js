import * as oktaLogin from '../../../../support/oktaLogin'
import * as helper from '../../../../support/helpers'
import * as matheader from '../../../../pom/MAT/WI/MATheader'
import * as measurelibrary from '../../../../pom/MAT/WI/MeasureLibrary'

describe('HARP ID: Multiple MAT Users', () => {
  before('Login', () => {
    oktaLogin.login('multiple')
  })
  beforeEach('Preserve Cookies', () => {
    helper.preserveCookies()
  })
  after('Log Out', () => {
    helper.logoutUserwithMultipleMAT()
  })

  it.skip('Validate the user can see switch MAT users', () => {

    cy.get(matheader.userprofile).click()

    cy.get(matheader.switchMATUserLabel).should('have.text', 'Switch MAT account')
    cy.get(matheader.firstMATUser).should('contain.text', '@ SemanticBits')
    cy.get(matheader.secondMATUser).should('contain.text', '@ SemanticBits')

    // Navigate to second MAT User (Top-Level User)
    cy.get(matheader.secondMATUser).click()

    cy.get(measurelibrary.newMeasureButton).should('have.text', ' New Measure')

  })

})
