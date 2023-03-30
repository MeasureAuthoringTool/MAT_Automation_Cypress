import * as helper from '../../../../../support/helpers'
import * as measurelibrary from '../../../../../pom/MAT/WI/MeasureLibrary'
import * as measureComposer from '../../../../../pom/MAT/WI/MeasureComposer'
import * as dataCreation from '../../../../../support/MAT/MeasureAndCQLLibraryCreation'
import * as measureDetails from '../../../../../pom/MAT/WI/MeasureDetails'
import * as createNewMeasure from '../../../../../pom/MAT/WI/CreateNewMeasure'
import * as login from '../../../../../support/MAT/Login'
import { selectModelRadioBtn } from '../../../../../pom/MAT/WI/CreateNewMeasure'

describe('Test cohort Grouping Validation Messages for FHIR Measure in Measure Packager', function () {

  beforeEach('Login', () => {
    login.matLogin()

  })
  afterEach('Log Out', () => {
    login.matLogout()
  })

  it('Grouping Validate error Messages for FHIR Cohort Measure', () => {

    //Make sure the page is available
    helper.verifySpinnerAppearsAndDissappears()

    //Create a new fhir measure, cohort that is patient based
    helper.enabledWithTimeout(measurelibrary.newMeasureButton)
    cy.get(measurelibrary.newMeasureButton).click()
    let measureName = 'CreateFhirCohortMeasure' + Date.now()
    cy.get(createNewMeasure.measureName).type(measureName, { delay: 50 })
    cy.get(createNewMeasure.selectModelRadioBtn).eq(0).click()
    cy.get(createNewMeasure.cqlLibraryName).type(measureName, { delay: 50 })
    cy.get(createNewMeasure.shortName).type(measureName, { delay: 50 })
    cy.get(createNewMeasure.measureScoringListBox).select('Cohort')
    cy.get(createNewMeasure.patientBasedMeasureListBox).select('Yes')
    cy.get(createNewMeasure.saveAndContinueBtn).click()
    cy.get(createNewMeasure.confirmationContinueBtn).click()
    helper.verifySpinnerAppearsAndDissappears()

    //entering required meta data
    cy.get(measureDetails.measureStewardDeveloper).click()
    cy.get(measureDetails.measureStewardListBox).select('SemanticBits')
    cy.get(measureDetails.row1CheckBox).click()
    cy.get(measureDetails.saveBtn).click()
    helper.visibleWithTimeout(measureDetails.warningMessage)
    helper.verifySpinnerAppearsAndDissappears()

    //Change Population Basis to Encounter
    cy.get(measureDetails.generalMeasureInformation).click()
    cy.get(measureDetails.populationBasisListbox).select('Encounter')
    cy.get(measureDetails.saveBtn).click()
    helper.visibleWithTimeout(measureDetails.warningMessage)

    cy.get(measureDetails.description).click()
    helper.enterText(measureDetails.textAreaInput, 'description')
    cy.get(measureDetails.saveBtn).click()
    helper.visibleWithTimeout(measureDetails.warningMessage)
    cy.get(measureDetails.measureType).click()
    cy.get(measureDetails.row1CheckBox).click()
    cy.get(measureDetails.saveBtn).click()
    helper.visibleWithTimeout(measureDetails.warningMessage)

    //Proceed to CQL Workspace and enter definitions
    cy.get(measureComposer.cqlWorkspace).click()
    helper.verifySpinnerAppearsAndDissappears()
    helper.waitToContainText(measureComposer.cqlWorkspaceTitleGeneralInformation, 'General Information')

    //Enter Includes
    cy.get(measureComposer.includes).click()
    cy.get(measureComposer.includesListItems).its('length').should('equal', 3)
    cy.get(measureComposer.includesListItems).eq(0).should('contain.text', 'FHIRHelpers')
    cy.get(measureComposer.includesListItems).eq(1).should('contain.text', 'Global')
    cy.get(measureComposer.includesListItems).eq(2).should('contain.text', 'SDE')
    cy.get(measureComposer.searchInputBox).type('TJCOverallFHIR4', { delay: 50 })
    cy.get(measureComposer.searchBtn).click()
    cy.get(measureComposer.availableLibrariesRow1checkbox).click()
    cy.get(measureComposer.libraryAliasInputBox).type('TJC', { delay: 50 })
    cy.get(measureComposer.saveIncludes).click()
    helper.visibleWithTimeout(measureComposer.warningMessage)

    //Enter Value Sets
    cy.get(measureComposer.valueSets).click()
    helper.verifySpinnerAppearsAndDissappears()
    dataCreation.addValueSet('2.16.840.1.113883.3.666.5.307')
    dataCreation.addValueSet('2.16.840.1.113762.1.4.1182.118')
    dataCreation.addValueSet('2.16.840.1.113762.1.4.1111.161')

    //Enter Codes
    cy.get(measureComposer.valueSets).click()
    helper.verifySpinnerAppearsAndDissappears()
    dataCreation.addCode('CODE:/CodeSystem/LOINC/Version/2.46/Code/21112-8/Info')
    dataCreation.addCode('CODE:/CodeSystem/SNOMEDCT/Version/2016-03/Code/419099009/Info')
    dataCreation.addCode('CODE:/CodeSystem/SNOMEDCT/Version/2017-09/Code/371828006/Info')

    // Enter Definitions
    cy.get(measureComposer.definition).click()
    helper.verifySpinnerAppearsAndDissappears()
    dataCreation.addDefinition('Initial Population', 'TJC."Non Elective Inpatient Encounter"')

    //Proceed to Population Workspace and add Initial Populations
    cy.get(measureComposer.populationWorkspace).click()
    helper.verifySpinnerAppearsAndDissappears()
    cy.get(measureComposer.initialPopulation).click()
    helper.verifySpinnerAppearsAndDissappears()
    cy.get(measureComposer.initialPopulationDefinitionListBox).select('Initial Population')
    cy.get(measureComposer.initialPopulationSaveBtn).click()
    helper.visibleWithTimeout(measureComposer.warningMessage)
    helper.waitToContainText(measureComposer.warningMessage, 'Changes to Initial Populations have been successfully saved.')

    //navigate to Measure Packager
    cy.get(measureComposer.measurePackager).click()

    //attempt to save the grouping with no Initial Population
    cy.get(measureComposer.saveGrouping).click()
    helper.verifySpinnerAppearsAndDissappears()
    cy.get(measureComposer.packagingErrorDiv).should('contain', 'For a Cohort measure, a grouping must contain exactly one Initial Population.')

    //add The intial population and validate the grouping worked
    cy.get(measureComposer.packageManagerPopulationsListInitialPopulationOnPackageManager).click()
    cy.get(measureComposer.addClauseButton).click()
    cy.get(measureComposer.saveGrouping).click()
    helper.verifySpinnerAppearsAndDissappears()
    cy.get(measureComposer.measureGroupingSuccessMessage).should('contain', 'Grouping has been saved.')

  })
})

