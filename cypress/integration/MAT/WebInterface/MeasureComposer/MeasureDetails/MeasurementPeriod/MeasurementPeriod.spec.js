import * as helper from '../../../../../../support/helpers'
import * as measurelibrary from '../../../../../../pom/MAT/WI/MeasureLibrary'
import * as measureDetails from '../../../../../../pom/MAT/WI/MeasureDetails'
import * as dataCreation from '../../../../../../support/MAT/MeasureAndCQLLibraryCreation'
import * as gridRowActions from '../../../../../../support/MAT/GridRowActions'
import * as login from '../../../../../../support/MAT/Login'

let fhirMeasure = ''
let qdmMeasure = ''

describe('Measure Composer: Measure Details: Validate the Measure Period without Data changes', () => {
  before('Login, Data creation', () => {
    login.matLogin()

    fhirMeasure = dataCreation.createDraftMeasure('FhirDraftMeasure', 'FHIR')
    qdmMeasure = dataCreation.createDraftMeasure('QdmDraftMeasure', 'QDM')

    login.matLogout()
  })
  beforeEach('Login', () => {
    login.matLogin()
  })
  afterEach('Log Out', () => {
    login.matLogout()
  })

  it('FHIR Measure: Validate the default behavior and next calendar year', () => {

    helper.enabledWithTimeout(measurelibrary.searchInputBox)
    helper.enterText(measurelibrary.searchInputBox, fhirMeasure)
    cy.get(measurelibrary.searchBtn).click()

    helper.verifySpinnerAppearsAndDissappears()

    gridRowActions.doubleClickRow(measurelibrary.row1MeasureSearch)

    helper.verifySpinnerAppearsAndDissappears()

    // Initial visit
    cy.get(measureDetails.measurePeriodHeaderLabel).should('contain.text', 'Measurement Period')

    cy.get(measureDetails.measurementPeriodCheckbox).should('be.checked')

    cy.get(measureDetails.checkboxLabel).should('contain.text', 'Next Calendar Year')

    cy.get(measureDetails.measurementPeriodFromInputBox).should('be.disabled')
    cy.get(measureDetails.measurementPeriodToInputBox).should('be.disabled')

    // Uncheck default measure period
    cy.get(measureDetails.measurementPeriodCheckbox).uncheck()

    cy.get(measureDetails.measurementPeriodFromInputBox).should('contain.value', '01/01/2023')
    cy.get(measureDetails.measurementPeriodToInputBox).should('contain.value', '12/31/2023')

    cy.get(measureDetails.saveBtn).click()

    cy.get(measurelibrary.measureLibraryTab).click()

    helper.verifySpinnerAppearsAndDissappears()

  })

  it('QDM Measure: Validate the default behavior and next calendar year', () => {

    helper.enabledWithTimeout(measurelibrary.searchInputBox)
    helper.enterText(measurelibrary.searchInputBox, qdmMeasure)
    cy.get(measurelibrary.searchBtn).click()

    helper.verifySpinnerAppearsAndDissappears()

    gridRowActions.doubleClickRow(measurelibrary.row1MeasureSearch)

    helper.verifySpinnerAppearsAndDissappears()

    // Initial visit
    cy.get(measureDetails.measurePeriodHeaderLabel).should('contain.text', 'Measurement Period')

    cy.get(measureDetails.measurementPeriodCheckbox).should('be.checked')

    cy.get(measureDetails.checkboxLabel).should('contain.text', 'Calendar Year (January 1, 20XX through December 31, 20XX)')

    cy.get(measureDetails.measurementPeriodFromInputBox).should('be.disabled')
    cy.get(measureDetails.measurementPeriodToInputBox).should('be.disabled')

    // cy.get(measureDetails.saveBtn).click()

    cy.get(measurelibrary.measureLibraryTab).click()

    helper.verifySpinnerAppearsAndDissappears()

  })

  it('Convert measure without changing measurement period and validate the converted measure', () => {

    helper.enabledWithTimeout(measurelibrary.searchInputBox)
    helper.enterText(measurelibrary.searchInputBox, qdmMeasure)
    cy.get(measurelibrary.searchBtn).click()

    helper.verifySpinnerAppearsAndDissappears()

    gridRowActions.selectRow(measurelibrary.row1MeasureSearch)

    cy.get(measurelibrary.createVersionMeasureSearchBtn).click()
    cy.get(measurelibrary.majorVersionTypeRadio).click()
    cy.get(measurelibrary.packageAndVersion).click()

    helper.verifySpinnerAppearsAndDissappears()

    cy.get(measurelibrary.continueBtn).click()

    helper.verifySpinnerAppearsAndDissappears()
    helper.verifySpinnerAppearsAndDissappears()

    helper.visibleWithTimeout(measurelibrary.row1MeasureSearch)
    gridRowActions.selectRow(measurelibrary.row1MeasureSearch)
    cy.get(measurelibrary.convertToFhirMeasureSearchBtn).click()

    helper.verifySpinnerAppearsAndDissappears()
    helper.verifySpinnerAppearsAndDissappears()

    helper.visibleWithTimeout(measurelibrary.row2MeasureSearch)

    gridRowActions.doubleClickRow(measurelibrary.row2MeasureSearch)

    helper.verifySpinnerAppearsAndDissappears()

    // Initial visit
    cy.get(measureDetails.measurePeriodHeaderLabel).should('contain.text', 'Measurement Period')

    cy.get(measureDetails.measurementPeriodCheckbox).should('be.checked')

    cy.get(measureDetails.checkboxLabel).should('contain.text', 'Next Calendar Year')

    cy.get(measureDetails.measurementPeriodFromInputBox).should('contain.value', '01/01/2023')
    cy.get(measureDetails.measurementPeriodToInputBox).should('contain.value', '12/31/2023')

    // uncheck default measure period
    cy.get(measureDetails.measurementPeriodCheckbox).uncheck()

    cy.get(measureDetails.measurementPeriodFromInputBox).type('01/01/2020')
    cy.get(measureDetails.measurementPeriodToInputBox).type('12/31/2020')

    cy.get(measureDetails.saveBtn).click()

    cy.get(measurelibrary.measureLibraryTab).click()

    helper.verifySpinnerAppearsAndDissappears()

  })
})


