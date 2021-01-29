import * as helper from '../../../../../support/helpers'
import * as measurelibrary from '../../../../../pom/MAT/WI/MeasureLibrary'
import * as createNewMeasure from '../../../../../pom/MAT/WI/CreateNewMeasure'
import * as measureDetails from '../../../../../pom/MAT/WI/MeasureDetails'
import * as oktaLogin from '../../../../../support/oktaLogin'

let measureName = ''

describe('Measure Composer: Measure Details: References', () => {
  before('Login', () => {
    oktaLogin.login()
  })
  beforeEach('Preserve Cookies', () => {
    helper.preserveCookies()
  })
  after('Log Out', () => {
    helper.logout()
  })
  it('Verify Reference Type', () => {

    cy.get(measurelibrary.newMeasureButton).click()

    measureName = 'createProportionMeasure' + Date.now()

    cy.get(createNewMeasure.measureName).type(measureName, { delay: 50 })
    cy.get(createNewMeasure.modelradioQDM).click()
    cy.get(createNewMeasure.cqlLibraryName).type(measureName, { delay: 50 })
    cy.get(createNewMeasure.shortName).type(measureName, { delay: 50 })

    cy.get(createNewMeasure.measureScoringListBox).select('Ratio')
    cy.get(createNewMeasure.patientBasedMeasureListBox).select('Yes')

    cy.get(createNewMeasure.saveAndContinueBtn).click()
    cy.get(createNewMeasure.confirmationContinueBtn).click()

    helper.verifySpinnerAppearsAndDissappears()

    //check reference type values

    cy.get(measureDetails.references).click()

    cy.get(measureDetails.referenceTypeListBox).select('Citation').should('have.value', 'CITATION')
    cy.get(measureDetails.referenceTypeListBox).select('Documentation').should('have.value', 'DOCUMENTATION')
    cy.get(measureDetails.referenceTypeListBox).select('Justification').should('have.value', 'JUSTIFICATION')
    cy.get(measureDetails.referenceTypeListBox).select('Unknown').should('have.value', 'UNKNOWN')

  })

})
