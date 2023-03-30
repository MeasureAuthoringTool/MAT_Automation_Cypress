import * as login from '../../../../../support/MAT/Login'
import * as measurelibrary from '../../../../../pom/MAT/WI/MeasureLibrary'
import * as createNewMeasure from '../../../../../pom/MAT/WI/CreateNewMeasure'
import * as helper from '../../../../../support/helpers'
import * as measureDetails from '../../../../../pom/MAT/WI/MeasureDetails'
import * as measureComposer from '../../../../../pom/MAT/WI/MeasureComposer'
import * as dataCreation from '../../../../../support/MAT/MeasureAndCQLLibraryCreation'
import { selectModelRadioBtn } from '../../../../../pom/MAT/WI/CreateNewMeasure'

const path = require('path')
const downloadsFolder = Cypress.config('downloadsFolder')

describe('Exporting: FHIR Measure', () => {
  beforeEach('Login', () => {
    login.matLogin()
  })
  afterEach('Log Out', () => {
    login.matLogout()
  })
  it('Validate the zip file export for FHIR Measure', () => {
    cy.get(measurelibrary.newMeasureButton).click()
    const measureName = 'CreateFhirContinuousVariableMeasure' + Date.now()

    cy.get(createNewMeasure.measureName).type(measureName, { delay: 50 })
    cy.get(createNewMeasure.selectModelRadioBtn).eq(0).click()
    cy.get(createNewMeasure.cqlLibraryName).type(measureName, { delay: 50 })
    cy.get(createNewMeasure.shortName).type(measureName, { delay: 50 })
    cy.get(createNewMeasure.measureScoringListBox).select('Continuous Variable')
    cy.get(createNewMeasure.patientBasedMeasureListBox).select('No')

    cy.get(createNewMeasure.saveAndContinueBtn).click()

    cy.get(createNewMeasure.confirmationContinueBtn).click()

    helper.verifySpinnerAppearsAndDissappears()

    // select population basis
    cy.get(measureDetails.populationBasisListbox).select('Encounter')
    cy.get(measureDetails.saveBtn).click()

    helper.verifySpinnerAppearsAndDissappears()
    helper.verifySpinnerAppearsAndDissappears()

    // entering required meta data
    helper.visibleWithTimeout(measureDetails.measureStewardDeveloper)
    cy.get(measureDetails.measureStewardDeveloper).click()
    cy.get(measureDetails.measureStewardListBox).select('SemanticBits')
    cy.get(measureDetails.row1CheckBox).click()
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

    cy.get(measureComposer.cqlWorkspace).click()

    helper.verifySpinnerAppearsAndDissappears()

    helper.waitToContainText(measureComposer.cqlWorkspaceTitleGeneralInformation, 'General Information')

    // Includes

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

    // Value Sets

    cy.get(measureComposer.valueSets).click()

    helper.verifySpinnerAppearsAndDissappears()

    dataCreation.addValueSet('2.16.840.1.113883.3.666.5.307')
    dataCreation.addValueSet('2.16.840.1.113762.1.4.1182.118')
    dataCreation.addValueSet('2.16.840.1.113762.1.4.1111.161')

    // Codes

    cy.get(measureComposer.codes).click()

    helper.verifySpinnerAppearsAndDissappears()

    dataCreation.addCode('CODE:/CodeSystem/LOINC/Version/2.46/Code/21112-8/Info')
    dataCreation.addCode('CODE:/CodeSystem/SNOMEDCT/Version/2016-03/Code/419099009/Info')
    dataCreation.addCode('CODE:/CodeSystem/SNOMEDCT/Version/2017-09/Code/371828006/Info')

    // Definition

    cy.get(measureComposer.definition).click()

    helper.verifySpinnerAppearsAndDissappears()

    dataCreation.addDefinition('Initial Population', 'TJC."Non Elective Inpatient Encounter"')
    dataCreation.addDefinition('Measure Population', '"Initial Population"')

    // Function

    cy.get(measureComposer.functionMeasureComposer).click()

    helper.waitToContainText(measureComposer.cqlWorkspaceTitleGlobal2, 'Function')

    cy.get(measureComposer.addNewBtn).click()
    cy.get(measureComposer.functionNameInput).type('Arrival and Departure Time', { delay: 50 })
    cy.get(measureComposer.addArgument).click()
    helper.enterText(measureComposer.argumentNameInput, 'Encounter')
    cy.get(measureComposer.availableDatatypesListBox).select('FHIR Datatype')
    cy.get(measureComposer.selectQDMDatatypeObject).select('Encounter')
    cy.get(measureComposer.addBtn).click()
    cy.get(measureComposer.functionCQLExpressionEditorInput).type(23, { delay: 50 })
    cy.get(measureComposer.functionSaveBtn).click()

    helper.visibleWithTimeout(measureComposer.warningMessage)

    // CQL Library Editor

    cy.get(measureComposer.cqlLibraryEditor).click()

    helper.waitToContainText(measureComposer.cqlWorkspaceTitleCQLLibraryEditor, 'CQL Library Editor')

    helper.visibleWithTimeout(measureComposer.warningMessage)
    helper.waitToContainText(measureComposer.warningMessage, 'You are viewing CQL with no validation errors.')

    helper.verifySpinnerAppearsAndDissappears()
    helper.verifySpinnerAppearsAndDissappears()

    // Population Workspace

    cy.get(measureComposer.populationWorkspace).click()

    helper.verifySpinnerAppearsAndDissappears()

    // Initial Population
    cy.get(measureComposer.initialPopulation).click()

    helper.verifySpinnerAppearsAndDissappears()

    cy.get(measureComposer.initialPopulationDefinitionListBox).select('Initial Population')
    cy.get(measureComposer.initialPopulationSaveBtn).click()

    helper.visibleWithTimeout(measureComposer.warningMessage)
    helper.waitToContainText(measureComposer.warningMessage, 'Changes to Initial Populations have been successfully saved.')

    // Measure Population
    cy.get(measureComposer.measurePopulations).click()

    helper.verifySpinnerAppearsAndDissappears()

    cy.get(measureComposer.measurePopulationsDefinitionListBox).select('Measure Population')
    cy.get(measureComposer.measurePopulationsSaveBtn).click()

    helper.visibleWithTimeout(measureComposer.warningMessage)
    helper.waitToContainText(measureComposer.warningMessage, 'Changes to Measure Populations have been successfully saved.')

    // Measure Observation
    cy.get(measureComposer.measureObservations).click()

    helper.verifySpinnerAppearsAndDissappears()

    cy.get(measureComposer.measureObservationsAggregateFunctionListBox).select('Count')
    cy.get(measureComposer.measureObservationsFunctionListBox).select('Arrival and Departure Time')
    cy.get(measureComposer.measureObservationsSaveBtn).click()

    helper.visibleWithTimeout(measureComposer.warningMessage)
    helper.waitToContainText(measureComposer.warningMessage, 'Changes to Measure Observations have been successfully saved.')

    // navigate to Measure Packager
    cy.get(measureComposer.measurePackager).click()

    helper.verifySpinnerAppearsAndDissappears()

    // verifying the the Population Workspace data is viewable in the Populations list in Measure Packager
    cy.get(measureComposer.populationsListItems).its('length').should('equal', 3)

    cy.get(measureComposer.populationsListItems).eq(0).should('contain.text', 'Initial Population 1')
    cy.get(measureComposer.populationsListItems).eq(1).should('contain.text', 'Measure Population')
    cy.get(measureComposer.populationsListItems).eq(2).should('contain.text', 'Measure Observation')

    // Package Grouping
    cy.get(measureComposer.addAllItemsToGrouping).click()
    cy.get(measureComposer.saveGrouping).click()

    cy.get(measureComposer.measureGroupingTable).should('contain.text', 'Measure Grouping 1')

    // Create Measure Package
    cy.get(measureComposer.createMeasurePackageBtn).click()

    helper.verifySpinnerAppearsAndDissappears()
    helper.verifySpinnerAppearsAndDissappears()
    helper.verifySpinnerAppearsAndDissappears()

    helper.waitToContainText(measureComposer.packageWarningMessage, 'Measure packaged successfully. Please access the Measure Library to export the measure.',220000)

    cy.get(measurelibrary.measureLibraryTab).click()

    helper.verifySpinnerAppearsAndDissappears()
    helper.verifySpinnerAppearsAndDissappears()
    helper.enabledWithTimeout(measurelibrary.searchInputBox)
    cy.get(measurelibrary.searchInputBox).type(measureName)

    cy.get(measurelibrary.searchBtn).click()

    helper.verifySpinnerAppearsAndDissappears()
    helper.verifySpinnerAppearsAndDissappears()

    cy.get(measurelibrary.selectMeasureCheckbox).click()
    cy.get(measurelibrary.exportMeasureSearchBtn).click()
    cy.get(measurelibrary.exportFHIRPackageRadioBtn).click()
    helper.verifySpinnerAppearsAndDissappears()
    cy.get(measurelibrary.openExportBtn).click()

    // Verify all file types available in exported zip file
    cy.readFile(path.join(downloadsFolder, 'CreateFhirContinuousVariableMeas-v0-0-001-FHIR-4-0-1.zip'),{timeout: 100000}).should('contain', 'CreateFhirContinuousVariableMeas-v0-0-001-FHIR-4-0-1.html', 'CreateFhirContinuousVariableMeas-v0-0-001-FHIR-4-0-1.json', 'CreateFhirContinuousVariableMeas-v0-0-001-FHIR-4-0-1.xml')
    cy.log('Successfully verified zip file export')

    helper.verifySpinnerAppearsAndDissappears()
    helper.verifySpinnerAppearsAndDissappears()
    cy.get(measurelibrary.measureLibraryTab).click()

    helper.verifySpinnerAppearsAndDissappears()
  })
})
