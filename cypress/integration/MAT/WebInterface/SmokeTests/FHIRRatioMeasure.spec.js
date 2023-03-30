import * as helper from '../../../../support/helpers'
import * as dataCreation from '../../../../support/MAT/MeasureAndCQLLibraryCreation'
import * as measurelibrary from '../../../../pom/MAT/WI/MeasureLibrary'
import * as createNewMeasure from '../../../../pom/MAT/WI/CreateNewMeasure'
import * as measureComposer from '../../../../pom/MAT/WI/MeasureComposer'
import * as measureDetails from '../../../../pom/MAT/WI/MeasureDetails'
import * as login from '../../../../support/MAT/Login'
import { selectModelRadioBtn } from '../../../../pom/MAT/WI/CreateNewMeasure'

//Smoke test for FHIR Ratio Measure. Create Draft measure and Package

describe('FHIR Ratio Measure', () => {
  beforeEach('Login', () => {
    login.matLogin()
  })
  afterEach('Log Out', () => {
    login.matLogout()
  })
  it('FHIR Ratio, creation Draft measure and Package', () => {

    helper.verifySpinnerAppearsAndDissappears()

    helper.enabledWithTimeout(measurelibrary.newMeasureButton)
    cy.get(measurelibrary.newMeasureButton).click()
    let measureName = 'FHIRRatioMeasure' + Date.now()

    cy.get(createNewMeasure.measureName).type(measureName, { delay: 50 })
    cy.get(createNewMeasure.selectModelRadioBtn).eq(0).click()
    cy.get(createNewMeasure.cqlLibraryName).type(measureName, { delay: 50 })
    cy.get(createNewMeasure.shortName).type(measureName, { delay: 50 })
    cy.get(createNewMeasure.measureScoringListBox).select('Ratio')
    cy.get(createNewMeasure.patientBasedMeasureListBox).select('No')

    cy.get(createNewMeasure.saveAndContinueBtn).click()

    cy.get(createNewMeasure.confirmationContinueBtn).click()

    helper.verifySpinnerAppearsAndDissappears()

    //select population basis
    cy.get(measureDetails.populationBasisListbox).select('Encounter')
    cy.get(measureDetails.saveBtn).click()

    helper.verifySpinnerAppearsAndDissappears()

    //entering required meta data
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

    // Definition

    cy.get(measureComposer.definition).click()

    helper.verifySpinnerAppearsAndDissappears()

    dataCreation.addDefinition('Qualifying Encounters', '["Encounter"]')
    dataCreation.addDefinition('Falls with Major Injury', '["Observation"]')
    dataCreation.addDefinition('Initial Population', '"Qualifying Encounters"')
    dataCreation.addDefinition('Denominator', '"Initial Population"')
    dataCreation.addDefinition('Numerator', '"Initial Population"')

    // Function

    cy.get(measureComposer.functionMeasureComposer).click()

    helper.waitToContainText(measureComposer.cqlWorkspaceTitleGlobal2, 'Function')

    cy.get(measureComposer.addNewBtn).click()
    cy.get(measureComposer.functionNameInput).type('Denominator Observation', { delay: 50 })
    cy.get(measureComposer.addArgument).click()
    cy.get(measureComposer.argumentNameInput).click()
    helper.enterText(measureComposer.argumentNameInput, 'Encounter')
    cy.get(measureComposer.availableDatatypesListBox).select('FHIR Datatype')
    cy.get(measureComposer.selectQDMDatatypeObject).select('Encounter')
    cy.get(measureComposer.addBtn).click()
    cy.get(measureComposer.functionCQLExpressionEditorInput).type('duration in hours of Global.Hospitalization(Encounter) / 24', { delay: 50 })
    cy.get(measureComposer.functionSaveBtn).click()

    helper.visibleWithTimeout(measureComposer.warningMessage)

    cy.get(measureComposer.addNewBtn).click()
    cy.get(measureComposer.functionNameInput).type('Numerator Observation', { delay: 50 })
    cy.get(measureComposer.addArgument).click()
    cy.get(measureComposer.argumentNameInput).click()
    helper.enterText(measureComposer.argumentNameInput, 'Encounter')
    cy.get(measureComposer.availableDatatypesListBox).select('FHIR Datatype')
    cy.get(measureComposer.selectQDMDatatypeObject).select('Encounter')
    cy.get(measureComposer.addBtn).click()
    cy.get(measureComposer.functionCQLExpressionEditorInput).type('Count(\n' +
      '    "Falls with Major Injury" Falls\n' +
      '      where Global."Normalize Interval"(Falls.effective) during Encounter.period\n' +
      '  )', { delay: 50 })
    cy.get(measureComposer.functionSaveBtn).click()

    helper.visibleWithTimeout(measureComposer.warningMessage)

    cy.get(measureComposer.addNewBtn).click()
    cy.get(measureComposer.functionNameInput).type('Medication', { delay: 50 })
    cy.get(measureComposer.addArgument).click()
    cy.get(measureComposer.argumentNameInput).click()
    helper.enterText(measureComposer.argumentNameInput, 'test')
    cy.get(measureComposer.availableDatatypesListBox).select('Boolean')
    cy.get(measureComposer.addBtn).click()
    cy.get(measureComposer.functionCQLExpressionEditorInput).type('([Medication: "test"])', { delay: 50 })
    cy.get(measureComposer.functionSaveBtn).click()

    helper.visibleWithTimeout(measureComposer.warningMessage)

    cy.get(measureComposer.addNewBtn).click()
    cy.get(measureComposer.functionNameInput).type('MedicationWithoutTerminology', { delay: 50 })
    cy.get(measureComposer.addArgument).click()
    cy.get(measureComposer.argumentNameInput).click()
    helper.enterText(measureComposer.argumentNameInput, 'test')
    cy.get(measureComposer.availableDatatypesListBox).select('Boolean')
    cy.get(measureComposer.addBtn).click()
    cy.get(measureComposer.functionCQLExpressionEditorInput).type('([Medication])', { delay: 50 })
    cy.get(measureComposer.functionSaveBtn).click()

    helper.visibleWithTimeout(measureComposer.warningMessage)

    //CQL Library Editor

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

    // Denominator
    cy.get(measureComposer.denominator).click()

    helper.verifySpinnerAppearsAndDissappears()

    cy.get(measureComposer.denominatorDefinitionListBox).select('Denominator')
    cy.get(measureComposer.denominatorSaveBtn).click()

    helper.visibleWithTimeout(measureComposer.warningMessage)
    helper.waitToContainText(measureComposer.warningMessage, 'Changes to Denominators have been successfully saved.')

    // Numerator
    cy.get(measureComposer.numerator).click()

    helper.verifySpinnerAppearsAndDissappears()

    cy.get(measureComposer.numeratorDefinitionListBox).select('Numerator')
    cy.get(measureComposer.numeratorSaveBtn).click()

    helper.visibleWithTimeout(measureComposer.warningMessage)
    helper.waitToContainText(measureComposer.warningMessage, 'Changes to Numerators have been successfully saved.')


    // Measure Observations

    cy.get(measureComposer.measureObservations).click()

    helper.verifySpinnerAppearsAndDissappears()

    cy.get(measureComposer.measureObservationsAggregateFunctionListBox).select('Count')

    cy.get(measureComposer.measureObservationsFunctionListBox).find('option').should('have.length', 5)
    cy.get(measureComposer.measureObservationsFunctionListBox).select('Numerator Observation')

    cy.get(measureComposer.measureObservationsSaveBtn).click()

    helper.verifySpinnerAppearsAndDissappears()

    helper.visibleWithTimeout(measureComposer.warningMessage)
    helper.waitToContainText(measureComposer.warningMessage, 'Changes to Measure Observations have been successfully saved.')

    cy.get(measureComposer.measureObservationsAddNew).click()

    cy.get(measureComposer.measureObservationsAggregateFunctionListBox2).select('Count')

    cy.get(measureComposer.measureObservationsFunctionListBox2).find('option').should('have.length', 5)
    cy.get(measureComposer.measureObservationsFunctionListBox2).select('Denominator Observation')

    cy.get(measureComposer.measureObservationsSaveBtn).click()

    helper.verifySpinnerAppearsAndDissappears()

    helper.visibleWithTimeout(measureComposer.warningMessage)
    helper.waitToContainText(measureComposer.warningMessage, 'Changes to Measure Observations have been successfully saved.')

    //navigate to Measure Packager
    cy.get(measureComposer.measurePackager).click()

    helper.verifySpinnerAppearsAndDissappears()

    //verifying the the Population Workspace data is viewable in the Populations list in Measure Packager
    cy.get(measureComposer.populationsListItems).its('length').should('equal', 5)

    cy.get(measureComposer.populationsListItems).eq(0).should('contain.text', 'Initial Population 1')
    cy.get(measureComposer.populationsListItems).eq(1).should('contain.text', 'Denominator 1')
    cy.get(measureComposer.populationsListItems).eq(2).should('contain.text', 'Numerator 1')
    cy.get(measureComposer.populationsListItems).eq(3).should('contain.text', 'Measure Observation 1')
    cy.get(measureComposer.populationsListItems).eq(4).should('contain.text', 'Measure Observation 2')

    //Package Grouping
    cy.get(measureComposer.addAllItemsToGrouping).click()

    //Add Associations

    cy.get(measureComposer.associationMeasureObservation1).find('option').should('have.length', 3)
    cy.get(measureComposer.associationMeasureObservation1).select('Numerator 1')

    cy.get(measureComposer.associationMeasureObservation2).find('option').should('have.length', 3)
    cy.get(measureComposer.associationMeasureObservation2).select('Denominator 1')

    cy.get(measureComposer.saveGrouping).click()

    cy.get(measureComposer.measureGroupingTable).should('contain.text', 'Measure Grouping 1')

    //Create Measure Package
    cy.get(measureComposer.createMeasurePackageBtn).click()

    helper.verifySpinnerAppearsAndDissappears()
    helper.verifySpinnerAppearsAndDissappears()
    helper.verifySpinnerAppearsAndDissappears()

    helper.visibleWithTimeout(measureComposer.packageWarningMessage, 100000)
    helper.waitToContainText(measureComposer.packageWarningMessage, 'Measure packaged successfully. Please access the Measure Library to export the measure.')

  })
})
