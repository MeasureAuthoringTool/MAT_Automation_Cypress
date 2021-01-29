import * as helper from '../../../../../support/helpers'
import * as measureLibrary from '../../../../../pom/MAT/WI/MeasureLibrary'
import * as oktaLogin from '../../../../../support/oktaLogin'
import * as dataCreation from '../../../../../support/MAT/MeasureAndCQLLibraryCreation'
import * as gridRowActions from '../../../../../support/MAT/GridRowActions'

let measureName = ''

describe('Measure Library: Validate Scenario 3b Conversion to FHIR', () => {
  before('Login', () => {
    oktaLogin.login()

    measureName = dataCreation.createDraftMeasure('qdmCqlMeasure', 'QDM')

    helper.verifySpinnerAppearsAndDissappears()
  })
  beforeEach('Preserve Cookies', () => {
    helper.preserveCookies()
  })
  after('Log Out', () => {
    helper.logout()
  })

  it('Scenario 3b: Reconverting QDM measure: Warning message', () => {
    helper.verifySpinnerAppearsAndDissappears()

    helper.enabledWithTimeout(measureLibrary.searchInputBox)
    helper.enterText(measureLibrary.searchInputBox, measureName)
    cy.get(measureLibrary.searchBtn).click()

    helper.verifySpinnerAppearsAndDissappears()
    helper.verifySpinnerAppearsAndDissappears()

    helper.visibleWithTimeout(measureLibrary.row1MeasureSearch)
    gridRowActions.selectRow(measureLibrary.row1MeasureSearch)

    cy.get(measureLibrary.createVersionMeasureSearchBtn).click()
    cy.get(measureLibrary.majorVersionTypeRadio).click()
    cy.get(measureLibrary.packageAndVersion).click()

    helper.verifySpinnerAppearsAndDissappears()

    cy.get(measureLibrary.continueBtn).click()

    helper.verifySpinnerAppearsAndDissappears()

    gridRowActions.selectRow(measureLibrary.row1MeasureSearch)
    cy.get(measureLibrary.convertToFhirMeasureSearchBtn).click()

    helper.verifySpinnerAppearsAndDissappears()
    helper.verifySpinnerAppearsAndDissappears()
    helper.verifySpinnerAppearsAndDissappears()

    helper.visibleWithTimeout(measureLibrary.row2MeasureSearch)
    gridRowActions.selectRow(measureLibrary.row2MeasureSearch)
    cy.get(measureLibrary.convertToFhirMeasureSearchBtn).click()

    // FHIR Warning Dialog
    cy.get(measureLibrary.fhirConversionWarningMessage).should('contain.text', 'Are you sure you want to convert this measure again? The existing FHIR measure will be overwritten.')
    cy.get(measureLibrary.fhirConversionNoBtn).click()

  })

})
