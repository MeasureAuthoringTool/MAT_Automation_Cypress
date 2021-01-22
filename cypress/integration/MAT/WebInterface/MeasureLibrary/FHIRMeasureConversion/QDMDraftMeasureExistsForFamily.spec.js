import * as helper from '../../../../../support/helpers'
import * as measureLibrary from '../../../../../pom/MAT/WI/MeasureLibrary'
import * as oktaLogin from '../../../../../support/oktaLogin'
import * as dataCreation from '../../../../../support/MAT/MeasureAndCQLLibraryCreation'
import * as gridRowActions from '../../../../../support/MAT/GridRowActions'

let measureName = ''

describe('Measure Library: Validate Scenario 1 Conversion to FHIR', () => {
  before('Login', () => {
    oktaLogin.login()

    measureName = dataCreation.createDraftMeasure('qdmCqlMeasure', 'QDM')
  })
  beforeEach('Preserve Cookies', () => {
    helper.preserveCookies()
  })
  after('Log Out', () => {
    helper.logout()
  })

  it('Scenario 1: QDM/CQL draft exists for that family', () => {

    helper.enterText(measureLibrary.searchInputBox, measureName)
    cy.get(measureLibrary.searchBtn).click()

    helper.verifySpinnerAppearsAndDissappears()

    gridRowActions.selectRow(measureLibrary.row1MeasureSearch)

    cy.get(measureLibrary.createVersionMeasureSearchBtn).click()
    cy.get(measureLibrary.majorVersionTypeRadio).click()
    cy.get(measureLibrary.packageAndVersion).click()

    helper.verifySpinnerAppearsAndDissappears()

    cy.get(measureLibrary.continueBtn).click()

    helper.verifySpinnerAppearsAndDissappears()

    gridRowActions.selectRow(measureLibrary.row1MeasureSearch)
    cy.get(measureLibrary.createDraftMeasureSearchBtn).click()

    helper.verifySpinnerAppearsAndDissappears()

    cy.get('h1').should('contain.text', 'My Measures > Draft Measure')

    cy.get(measureLibrary.saveAndContinueButtonDraft).click()

    cy.get(measureLibrary.confirmationContinue).click()

    cy.get(measureLibrary.measureLibraryTab).click()

    helper.verifySpinnerAppearsAndDissappears()

    cy.wait(3000)

    gridRowActions.selectRow(measureLibrary.row2MeasureSearch)
    cy.get(measureLibrary.convertToFhirMeasureSearchBtn).click()

    // FHIR Warning Dialog
    cy.get(measureLibrary.fhirConversionWarningMessage).should('contain.text', 'Only one draft per measure family should be allowed.')
    cy.get(measureLibrary.fhirConversionReturnBtn).click()

  })

})
