import * as helper from '../../../../../support/helpers'
import * as measurelibrary from '../../../../../pom/MAT/WI/MeasureLibrary'
import * as measureComposer from '../../../../../pom/MAT/WI/MeasureComposer'
import * as oktaLogin from '../../../../../support/oktaLogin'
import * as dataCreation from '../../../../../support/MAT/MeasureAndCQLLibraryCreation'
import * as gridRowActions from '../../../../../support/MAT/GridRowActions'

let fhirMeasureCohort = ''
let fhirMeasureContVariable = ''
let fhirMeasureRatio = ''
let fhirMeasureProportion = ''
describe('Test cohort Validation Messages for FHIR Measure in Package Manager', function () {

  before('Setup', () => {
    oktaLogin.login()

    //as a setup to the test, create these measures so that the test can check them
    fhirMeasureCohort = dataCreation.createFHIRMeasureByType('FhirDraftMeasureCohort', 'Cohort', 'Yes')

    helper.logout()
  })
  beforeEach('Login', () => {
    oktaLogin.login()
  })
  afterEach('Log Out', () => {
    helper.logout()
  })

  it('Validate error Messages for FHIR Cohort Measure', () => {

    helper.enabledWithTimeout(measurelibrary.searchInputBox)
    helper.enterText(measurelibrary.searchInputBox, fhirMeasureCohort)
    cy.get(measurelibrary.searchBtn).click()

    helper.verifySpinnerAppearsAndDissappears()

    //click row 1 of the measures to get the new measures
    helper.visibleWithTimeout(measurelibrary.row1MeasureSearch)
    gridRowActions.doubleClickRow(measurelibrary.row1MeasureSearch)

    //enter a measure description
    //cy.get(measureComposer.)

    //wait for page to load
    helper.verifySpinnerAppearsAndDissappears()

    //add an initial population to the measureMan
    cy.get(measureComposer.populationWorkspace).click()
    cy.get(measureComposer.initialPopulation).click()
    cy.get(measureComposer.initialPopulationDefinitionListBox).select('SDE Sex')
    cy.get(measureComposer.initialPopulationSaveBtn).click()
    helper.verifySpinnerAppearsAndDissappears()

    //add another initial population
    cy.get(measureComposer.initialPopulation).click()
    helper.verifySpinnerAppearsAndDissappears()
    cy.get(measureComposer.initialPopulationDefinitionListBox).select('SDE Race')
    cy.get(measureComposer.initialPopulationSaveBtn).click()
    helper.verifySpinnerAppearsAndDissappears()

    //head over to pacakge manager
    cy.get(measureComposer.measurePackager).click()
    helper.verifySpinnerAppearsAndDissappears()

    //attempt to save the grouping with no Initial Population
    cy.get(measureComposer.saveGrouping).click()
    helper.verifySpinnerAppearsAndDissappears()
    cy.get(measureComposer.groupingErrorOne).should('contain', 'For a Cohort measure, a grouping must contain exactly one Initial Population.')
  })
})
/* NOTE: The below test case needs to be completed when the validation work has been completed. See
MAT-1558 for details
describe('Test cohort Validation Messages for QDM Measure in Package Manager', function () {

  before('Login', () => {
    oktaLogin.login()

    //as a setup to the test, create these measures so that the test can check them
    fhirMeasureCohort = dataCreation.createFHIRMeasureByType('FhirDraftMeasureCohort', 'Cohort', 'Yes')

  })
  beforeEach('Preserve Cookies', () => {
    helper.preserveCookies()
  })
  after('Log Out', () => {
    //helper.logout()
  })

  it('Validate error Messages for QDM Cohort Measure', () => {

    helper.enabledWithTimeout(measurelibrary.searchInputBox)
    helper.enterText(measurelibrary.searchInputBox, fhirMeasureCohort)
    cy.get(measurelibrary.searchBtn).click()

    helper.verifySpinnerAppearsAndDissappears()

    //click row 1 of the measures to get the new measures
    cy.get(measurelibrary.row1MeasureSearch).dblclick()

    //enter a measure description
    //cy.get(measureComposer.)

    //wait for page to load
    helper.verifySpinnerAppearsAndDissappears()

    //add an initial population to the measureMan
    cy.get(measureComposer.populationWorkspace).click()
    cy.get(measureComposer.initialPopulation).click()
    cy.get(measureComposer.initialPopulationDefinitionListBox).select('SDE Sex')
    cy.get(measureComposer.initialPopulationSaveBtn).click()
    helper.verifySpinnerAppearsAndDissappears()

    //add another initial population
    cy.get(measureComposer.initialPopulation).click()
    helper.verifySpinnerAppearsAndDissappears()
    cy.get(measureComposer.initialPopulationDefinitionListBox).select('SDE Race')
    cy.get(measureComposer.initialPopulationSaveBtn).click()
    helper.verifySpinnerAppearsAndDissappears()

    //head over to pacakge manager
    cy.get(measureComposer.measurePackager).click()
    helper.verifySpinnerAppearsAndDissappears()

    //attempt to save the grouping with no Initial Population
    cy.get(measureComposer.saveGrouping).click()
    helper.verifySpinnerAppearsAndDissappears()
    cy.get(measureComposer.cohortInitialPopulationValidationError).should('contain', 'For a Cohort measure, a grouping must contain exactly one Initial Population.')
  })
})
*/
