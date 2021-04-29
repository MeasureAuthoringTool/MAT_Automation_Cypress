import * as helper from '../../../../../support/helpers'
import * as dataCreation from '../../../../../support/MAT/MeasureAndCQLLibraryCreation'
import * as measurelibrary from '../../../../../pom/MAT/WI/MeasureLibrary'
import * as oktaLogin from '../../../../../support/oktaLogin'
import * as createNewMeasure from '../../../../../pom/MAT/WI/CreateNewMeasure'
import * as measureComposer from '../../../../../pom/MAT/WI/MeasureComposer'
import * as measureDetails from '../../../../../pom/MAT/WI/MeasureDetails'

let measureName = ''

describe('Packaging: Continuous Variable Measure', () => {
  before('Login', () => {
    oktaLogin.login()
  })
  beforeEach('Preserve Cookies', () => {
    helper.preserveCookies()
  })
  after('Log Out', () => {
    helper.logout()
  })

// Successful Patient based Continuous Variable QDM Measure Packaging

  it('Validate the measure packaging for Continuous Variable QDM Measure', () => {

    cy.get(measurelibrary.newMeasureButton).click()
    let measureName = 'CreateQDMContinuousVariableMeasure' + Date.now()

    cy.get(createNewMeasure.measureName).type(measureName, { delay: 50 })
    cy.get(createNewMeasure.modelradioQDM).click()
    cy.get(createNewMeasure.cqlLibraryName).type(measureName, { delay: 50 })
    cy.get(createNewMeasure.shortName).type(measureName, { delay: 50 })
    cy.get(createNewMeasure.measureScoringListBox).select('Continuous Variable')
    cy.get(createNewMeasure.patientBasedMeasureListBox).select('Yes')

    cy.get(createNewMeasure.saveAndContinueBtn).click()

    cy.get(createNewMeasure.confirmationContinueBtn).click()

    helper.verifySpinnerAppearsAndDissappears()

    cy.get(measureComposer.cqlWorkspace).click()

    helper.verifySpinnerAppearsAndDissappears()

    helper.waitToContainText(measureComposer.cqlWorkspaceTitleGeneralInformation, 'General Information')

    //Value Sets

    dataCreation.addValueSet('2.16.840.1.113883.3.117.1.7.1.87')
    dataCreation.addValueSet('2.16.840.1.113883.3.117.1.7.1.292')
    dataCreation.addValueSet('2.16.840.1.113883.3.666.5.307')
    dataCreation.addValueSet('2.16.840.1.113762.1.4.1111.143')
    dataCreation.addValueSet('2.16.840.1.113883.3.117.1.7.1.299')

    //codes

    dataCreation.addCode('CODE:/CodeSystem/LOINC/Version/2.46/Code/21112-8/Info')
    dataCreation.addCode('CODE:/CodeSystem/SNOMEDCT/Version/2016-03/Code/419099009/Info')
    dataCreation.addCode('CODE:/CodeSystem/SNOMEDCT/Version/2017-09/Code/371828006/Info')

    //Parameter

    cy.get(measureComposer.parameter).click()

    helper.waitToContainText(measureComposer.cqlWorkspaceTitleGlobal2, 'Parameter')

    cy.get(measureComposer.addNewBtn).click()
    cy.get(measureComposer.parameterNameInput).type('test.Parameter', { delay: 50 })
    cy.get(measureComposer.parameterCQLExpressionEditorInput).type('Interval<DateTime>', { delay: 50 })
    cy.get(measureComposer.parameterSaveBtn).click()

    helper.visibleWithTimeout(measureComposer.warningMessage)

    // Definition

    dataCreation.addDefinition('Emergency Department ED Visit', 'true')

    dataCreation.addDefinition('Initial Population', 'true')

    dataCreation.addDefinition('Measure Population', 'true')

    dataCreation.addDefinition('Measure Population Exclusions', 'true')

    dataCreation.addDefinition('Stratification 2', 'true')

    // Function

    cy.get(measureComposer.functionMeasureComposer).click()

    helper.waitToContainText(measureComposer.cqlWorkspaceTitleGlobal2, 'Function')

    cy.get(measureComposer.addNewBtn).click()
    cy.get(measureComposer.functionNameInput).type('Arrival and Departure Time', { delay: 50 })
    cy.get(measureComposer.functionCQLExpressionEditorInput).type(25, { delay: 50 })
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

    //navigate to Measure Packager
    cy.get(measureComposer.measurePackager).click()

    helper.verifySpinnerAppearsAndDissappears()

    //verifying the the Population Workspace data is viewable in the Populations list in Measure Packager
    cy.get(measureComposer.populationsListItems).its('length').should('equal', 3)

    cy.get(measureComposer.populationsListItems).eq(0).should('contain.text', 'Initial Population 1')
    cy.get(measureComposer.populationsListItems).eq(1).should('contain.text', 'Measure Population')
    cy.get(measureComposer.populationsListItems).eq(2).should('contain.text', 'Measure Observation')

    //Package Grouping
    cy.get(measureComposer.addAllItemsToGrouping).click()
    cy.get(measureComposer.saveGrouping).click()

    cy.get(measureComposer.measureGroupingTable).should('contain.text', 'Measure Grouping 1')

    //Create Measure Package
    cy.get(measureComposer.createMeasurePackageBtn).click()

    helper.verifySpinnerAppearsAndDissappears()
    helper.verifySpinnerAppearsAndDissappears()
    helper.verifySpinnerAppearsAndDissappears()

    helper.visibleWithTimeout(measureComposer.packageWarningMessage)
    helper.waitToContainText(measureComposer.packageWarningMessage, 'Measure packaged successfully. Please access the Measure Library to export the measure.')

    cy.get(measurelibrary.measureLibraryTab).click()

    helper.verifySpinnerAppearsAndDissappears()

  })

  //Validating Error Message when population definition is not boolean for Patient based Continuous Variable QDM Measure

  it('Validate Measure packaging error message for Continuous Variable QDM Measure', () => {

    cy.get(measurelibrary.newMeasureButton).click()
    let measureName = 'CreateQDMContinuousVariableMeasure1' + Date.now()

    cy.get(createNewMeasure.measureName).type(measureName, { delay: 50 })
    cy.get(createNewMeasure.modelradioQDM).click()
    cy.get(createNewMeasure.cqlLibraryName).type(measureName, { delay: 50 })
    cy.get(createNewMeasure.shortName).type(measureName, { delay: 50 })
    cy.get(createNewMeasure.measureScoringListBox).select('Continuous Variable')
    cy.get(createNewMeasure.patientBasedMeasureListBox).select('Yes')

    cy.get(createNewMeasure.saveAndContinueBtn).click()

    cy.get(createNewMeasure.confirmationContinueBtn).click()

    helper.verifySpinnerAppearsAndDissappears()

    cy.get(measureComposer.cqlWorkspace).click()

    helper.verifySpinnerAppearsAndDissappears()

    helper.waitToContainText(measureComposer.cqlWorkspaceTitleGeneralInformation, 'General Information')

    //Value Sets

    dataCreation.addValueSet('2.16.840.1.113883.3.117.1.7.1.87')
    dataCreation.addValueSet('2.16.840.1.113883.3.117.1.7.1.292')
    dataCreation.addValueSet('2.16.840.1.113883.3.666.5.307')
    dataCreation.addValueSet('2.16.840.1.113762.1.4.1111.143')
    dataCreation.addValueSet('2.16.840.1.113883.3.117.1.7.1.299')

    //codes

    dataCreation.addCode('CODE:/CodeSystem/LOINC/Version/2.46/Code/21112-8/Info')
    dataCreation.addCode('CODE:/CodeSystem/SNOMEDCT/Version/2016-03/Code/419099009/Info')
    dataCreation.addCode('CODE:/CodeSystem/SNOMEDCT/Version/2017-09/Code/371828006/Info')

    //Parameter

    cy.get(measureComposer.parameter).click()

    helper.waitToContainText(measureComposer.cqlWorkspaceTitleGlobal2, 'Parameter')

    cy.get(measureComposer.addNewBtn).click()
    cy.get(measureComposer.parameterNameInput).type('test.Parameter', { delay: 50 })
    cy.get(measureComposer.parameterCQLExpressionEditorInput).type('Interval<DateTime>', { delay: 50 })
    cy.get(measureComposer.parameterSaveBtn).click()

    helper.visibleWithTimeout(measureComposer.warningMessage)

    // Definition

    dataCreation.addDefinition('Emergency Department ED Visit', 'true')

    dataCreation.addDefinition('Initial Population', '/*Emergency Department visit during the measurement period*/\n' +
      '["Encounter, Performed": "Emergency Department Visit"] EDVisit\n' +
      '  where EDVisit.relevantPeriod during "Measurement Period"')

    dataCreation.addDefinition('Measure Population', '/*Emergency Department visit during the measurement period*/\n' +
      '["Encounter, Performed": "Emergency Department Visit"] EDVisit\n' +
      '  where EDVisit.relevantPeriod during "Measurement Period"')


    //Function

    cy.get(measureComposer.functionMeasureComposer).click()

    helper.waitToContainText(measureComposer.cqlWorkspaceTitleGlobal2, 'Function')

    cy.get(measureComposer.addNewBtn).click()
    cy.get(measureComposer.functionNameInput).type('Arrival and Departure Time', { delay: 50 })
    cy.get(measureComposer.functionCQLExpressionEditorInput).type(25, { delay: 50 })
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

    //navigate to Measure Packager
    cy.get(measureComposer.measurePackager).click()

    helper.verifySpinnerAppearsAndDissappears()

    //verifying the the Population Workspace data is viewable in the Populations list in Measure Packager
    cy.get(measureComposer.populationsListItems).its('length').should('equal', 3)

    cy.get(measureComposer.populationsListItems).eq(0).should('contain.text', 'Initial Population 1')
    cy.get(measureComposer.populationsListItems).eq(1).should('contain.text', 'Measure Population')
    cy.get(measureComposer.populationsListItems).eq(2).should('contain.text', 'Measure Observation')

    //Package Grouping
    cy.get(measureComposer.addAllItemsToGrouping).click()
    cy.get(measureComposer.saveGrouping).click()

    cy.get(measureComposer.measurePackagerWarning1).should('contain.text', 'Initial Population 1 : For Patient-based Measures, all definitions directly added to populations must return a Boolean.')
    cy.get(measureComposer.measurePackagerWarning2).should('contain.text', 'Measure Population 1 : For Patient-based Measures, all definitions directly added to populations must return a Boolean.')
    cy.get(measurelibrary.measureLibraryTab).click()

  })

  //Validating Error messasge when function is defined with arguments for Patient based Continuous Variable QDM Measure

  it('Validate Function error for Continuous Variable QDM Measure', () => {

    cy.get(measurelibrary.newMeasureButton).click()
    let measureName = 'CreateQDMContinuousVariableMeasure2' + Date.now()

    cy.get(createNewMeasure.measureName).type(measureName, { delay: 50 })
    cy.get(createNewMeasure.modelradioQDM).click()
    cy.get(createNewMeasure.cqlLibraryName).type(measureName, { delay: 50 })
    cy.get(createNewMeasure.shortName).type(measureName, { delay: 50 })
    cy.get(createNewMeasure.measureScoringListBox).select('Continuous Variable')
    cy.get(createNewMeasure.patientBasedMeasureListBox).select('Yes')

    cy.get(createNewMeasure.saveAndContinueBtn).click()

    cy.get(createNewMeasure.confirmationContinueBtn).click()

    helper.verifySpinnerAppearsAndDissappears()

    cy.get(measureComposer.cqlWorkspace).click()

    helper.verifySpinnerAppearsAndDissappears()

    helper.waitToContainText(measureComposer.cqlWorkspaceTitleGeneralInformation, 'General Information')

    //Value Sets

    dataCreation.addValueSet('2.16.840.1.113883.3.117.1.7.1.87')
    dataCreation.addValueSet('2.16.840.1.113883.3.117.1.7.1.292')
    dataCreation.addValueSet('2.16.840.1.113883.3.666.5.307')
    dataCreation.addValueSet('2.16.840.1.113762.1.4.1111.143')
    dataCreation.addValueSet('2.16.840.1.113883.3.117.1.7.1.299')

    //codes

    dataCreation.addCode('CODE:/CodeSystem/LOINC/Version/2.46/Code/21112-8/Info')
    dataCreation.addCode('CODE:/CodeSystem/SNOMEDCT/Version/2016-03/Code/419099009/Info')
    dataCreation.addCode('CODE:/CodeSystem/SNOMEDCT/Version/2017-09/Code/371828006/Info')

    //Parameter

    cy.get(measureComposer.parameter).click()

    helper.waitToContainText(measureComposer.cqlWorkspaceTitleGlobal2, 'Parameter')

    cy.get(measureComposer.addNewBtn).click()
    cy.get(measureComposer.parameterNameInput).type('test.Parameter', { delay: 50 })
    cy.get(measureComposer.parameterCQLExpressionEditorInput).type('Interval<DateTime>', { delay: 50 })
    cy.get(measureComposer.parameterSaveBtn).click()

    helper.visibleWithTimeout(measureComposer.warningMessage)

    // Definition

    dataCreation.addDefinition('Emergency Department ED Visit', 'true')

    dataCreation.addDefinition('Initial Population', 'true')

    dataCreation.addDefinition('Measure Population', 'true')


    //Function

    cy.get(measureComposer.functionMeasureComposer).click()

    helper.waitToContainText(measureComposer.cqlWorkspaceTitleGlobal2, 'Function')

    cy.get(measureComposer.addNewBtn).click()
    cy.get(measureComposer.functionNameInput).type('Arrival and Departure Time', { delay: 50 })
    cy.get(measureComposer.addArgument).click()
    helper.enterText(measureComposer.argumentNameInput, 'Encounter')
    cy.get(measureComposer.availableDatatypesListBox).select('QDM Datatype')
    cy.get(measureComposer.selectQDMDatatypeObject).select('Encounter, Not Ordered')
    cy.get(measureComposer.addBtn).click()
    cy.get(measureComposer.functionCQLExpressionEditorInput).type(25, { delay: 50 })
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
    cy.get(measureComposer.measureObservationsFunctionListBox).select('--Select--')
    cy.get(measureComposer.measureObservationsSaveBtn).click()

    helper.visibleWithTimeout(measureComposer.warningMessage)
    helper.waitToContainText(measureComposer.warningMessage, 'Both an Aggregate Function and a User Defined Function are required for a measure observation.')

  })
})
