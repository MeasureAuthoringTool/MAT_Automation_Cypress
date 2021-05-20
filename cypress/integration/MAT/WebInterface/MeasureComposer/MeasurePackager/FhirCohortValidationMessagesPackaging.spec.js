import * as helper from '../../../../../support/helpers'
import * as measurelibrary from '../../../../../pom/MAT/WI/MeasureLibrary'
import * as measureComposer from '../../../../../pom/MAT/WI/MeasureComposer'
import * as dataCreation from '../../../../../support/MAT/MeasureAndCQLLibraryCreation'
import * as gridRowActions from '../../../../../support/MAT/GridRowActions'
import * as login from '../../../../../support/MAT/Login'

let fhirMeasureCohort = ''

describe('Test cohort Validation Messages for FHIR Measure in Package Manager', function () {

  before('Setup', () => {
    login.matLogin()

    //as a setup to the test, create these measures so that the test can check them
    fhirMeasureCohort = dataCreation.createFHIRMeasureByType('FhirDraftMeasureCohort', 'Cohort', 'Yes')

    login.matLogout()
  })
  beforeEach('Login', () => {
    login.matLogin()
  })
  afterEach('Log Out', () => {
    login.matLogout()
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
