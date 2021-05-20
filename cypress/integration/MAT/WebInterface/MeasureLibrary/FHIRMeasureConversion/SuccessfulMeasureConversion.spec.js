import * as helper from '../../../../../support/helpers'
import * as measureLibrary from '../../../../../pom/MAT/WI/MeasureLibrary'
import * as dataCreation from '../../../../../support/MAT/MeasureAndCQLLibraryCreation'
import * as gridRowActions from '../../../../../support/MAT/GridRowActions'
import * as measureLibraryHelper from '../../../../../support/MAT/MeasureLibraryHelper'
import * as login from '../../../../../support/MAT/Login'

let measureName = ''


//these test cases are tied together and need to be run sequentialy

describe('Measure Library: FHIR Measure Conversion: Successful Conversion to FHIR', () => {
  beforeEach('Login', () => {
    login.matLogin()
  })
  afterEach('Log Out', () => {
    login.matLogout()
  })

  it('Convert QDM Measure to FHIR successfully', () => {
    measureName = dataCreation.createMajorVersionMeasure( 'QDM')
    // Search for created draft QDM measure
    helper.enabledWithTimeout(measureLibrary.searchInputBox)
    helper.enterText(measureLibrary.searchInputBox, measureName)
    cy.get(measureLibrary.searchBtn).click()

    helper.verifySpinnerAppearsAndDissappears()

    helper.visibleWithTimeout(measureLibrary.row1MeasureSearch)

    // assert model version for QDM Library
    cy.get(measureLibrary.row1MeasureModelVersion).should('contain.text', '5.6')

    gridRowActions.selectRow(measureLibrary.row1MeasureSearch)
    measureLibraryHelper.convertMeasureToFHIRAndVerify(measureName)
  })


  it('Verify FHIR reconversion and Measure history, Delete converted FHIR Measure and reconvert', () => {

    helper.enabledWithTimeout(measureLibrary.searchInputBox, 200000)
    helper.enterText(measureLibrary.searchInputBox, measureName)
    cy.get(measureLibrary.searchBtn).click()

    helper.verifySpinnerAppearsAndDissappears()

    gridRowActions.selectRow(measureLibrary.row1MeasureSearch)

    helper.disabledWithTimeout(measureLibrary.convertToFhirMeasureSearchBtn)

    cy.get(measureLibrary.editMeasureSearchBtn).should('be.visible')

    cy.get(measureLibrary.historyMeasureSearchBtn).click()

    // verifying the log entries
    helper.visibleWithTimeout(measureLibrary.historyRow1)
    helper.visibleWithTimeout(measureLibrary.historyRow2)

    cy.get(measureLibrary.historyGrid).should('contain.text', 'Converted QDM/CQL to FHIR')
    cy.get(measureLibrary.historyGrid).should('contain.text', 'Measure Versioned')
    cy.get(measureLibrary.historyGrid).should('contain.text', 'Measure Created')


    cy.get(measureLibrary.returnToMeasureLibraryLink).click()

    helper.verifySpinnerAppearsAndDissappears()

    // Verify to see if reconversion is disabled
    gridRowActions.selectRow(measureLibrary.row1MeasureSearch)
    helper.disabledWithTimeout(measureLibrary.convertToFhirMeasureSearchBtn)

    cy.get(measureLibrary.historyMeasureSearchBtn).click()

    // verifying the log entries
    helper.visibleWithTimeout(measureLibrary.historyRow1)
    helper.visibleWithTimeout(measureLibrary.historyRow2)

    cy.get(measureLibrary.returnToMeasureLibraryLink).click()

    helper.verifySpinnerAppearsAndDissappears()

    measureLibraryHelper.deleteMeasure(measureName + 'FHIR')

    helper.verifySpinnerAppearsAndDissappears()

    cy.get(measureLibrary.WarningMessage).should('contain.text','No measures returned. Please change your ' +
      'search criteria and search again.')

    helper.enabledWithTimeout(measureLibrary.searchInputBox)

    helper.enterText(measureLibrary.searchInputBox, measureName)
    cy.get(measureLibrary.searchBtn).click()

    helper.verifySpinnerAppearsAndDissappears()

    helper.visibleWithTimeout(measureLibrary.row1MeasureSearch)
    gridRowActions.selectRow(measureLibrary.row1MeasureSearch)

    measureLibraryHelper.convertMeasureToFHIRAndVerify(measureName)
  })
})
