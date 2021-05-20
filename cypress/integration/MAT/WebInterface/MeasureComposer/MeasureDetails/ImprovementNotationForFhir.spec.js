import * as helper from '../../../../../support/helpers'
import * as measurelibrary from '../../../../../pom/MAT/WI/MeasureLibrary'
import * as measureDetails from '../../../../../pom/MAT/WI/MeasureDetails'
import * as dataCreation from '../../../../../support/MAT/MeasureAndCQLLibraryCreation'
import * as gridRowActions from '../../../../../support/MAT/GridRowActions'
import * as login from '../../../../../support/MAT/Login'

let fhirMeasure = ''

describe('FHIR Measure: Improvement Notation', () => {
  before('Data Setup', () => {
    login.matLogin()

    fhirMeasure = dataCreation.createDraftMeasure('FhirDraftMeasure', 'FHIR')

    login.matLogout()
  })
  beforeEach('Login', () => {
    login.matLogin()
  })
  afterEach('Log Out', () => {
    login.matLogout()
  })

  it('Validate the Improvement Notation has updated drop-down', () => {

    helper.enterText(measurelibrary.searchInputBox, fhirMeasure)
    cy.get(measurelibrary.searchBtn).click()

    helper.verifySpinnerAppearsAndDissappears()

    gridRowActions.doubleClickRow(measurelibrary.row1MeasureSearch)

    helper.verifySpinnerAppearsAndDissappears()

    cy.get(measureDetails.improvementNotation).click()

    helper.verifySpinnerAppearsAndDissappears()

    cy.get(measureDetails.improvementNotationTitle).should('have.text', 'Improvement Notation')

    cy.get(measureDetails.improvementNotationDropDown).should('contain.text', 'increase')

    cy.get(measureDetails.improvementNotationDropDown).select('decrease')

    cy.get(measureDetails.improvementNotationSaveBtn).click()

    cy.get(measurelibrary.measureLibraryTab).click()

    helper.verifySpinnerAppearsAndDissappears()

  })

})
