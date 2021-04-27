import * as helper from '../../../../support/helpers'
import * as dataCreation from '../../../../support/MAT/MeasureAndCQLLibraryCreation'
import * as measurelibrary from '../../../../pom/MAT/WI/MeasureLibrary'
import * as createNewMeasure from '../../../../pom/MAT/WI/CreateNewMeasure'
import * as measureComposer from '../../../../pom/MAT/WI/MeasureComposer'
import * as login from '../../../../support/MAT/Login'

//Smoke test for QDM Continuous Variable Measure NOT Patient Based. Create Draft measure and Package

describe('QDM Continuous Variable Measure No Patient', () => {
  beforeEach('Login', () => {
    login.matLogin()
  })
  afterEach('Log Out', () => {
    login.matLogout()
  })
  it('Continuous Variable QDM No Patient, create Draft measure and package', () => {

    helper.verifySpinnerAppearsAndDissappears()

    helper.enabledWithTimeout(measurelibrary.newMeasureButton)
    cy.get(measurelibrary.newMeasureButton).click()

    let measureName = 'ContVariableMeasureCMS32v8' + Date.now()

    cy.get(createNewMeasure.measureName).type(measureName, { delay: 50 })
    cy.get(createNewMeasure.modelradioQDM).click()
    cy.get(createNewMeasure.cqlLibraryName).type(measureName, { delay: 50 })
    cy.get(createNewMeasure.shortName).type(measureName, { delay: 50 })

    cy.get(createNewMeasure.measureScoringListBox).select('Continuous Variable')
    cy.get(createNewMeasure.patientBasedMeasureListBox).select('No')

    cy.get(createNewMeasure.saveAndContinueBtn).click()
    cy.get(createNewMeasure.confirmationContinueBtn).click()

    helper.verifySpinnerAppearsAndDissappears()

    cy.get(measureComposer.cqlWorkspace).click()

    helper.verifySpinnerAppearsAndDissappears()

    helper.waitToContainText(measureComposer.cqlWorkspaceTitleGeneralInformation, 'General Information')

    //Includes

    cy.get(measureComposer.includes).click()

    helper.waitToContainText(measureComposer.cqlWorkspaceTitleIncludes, 'Includes')

    cy.get(measureComposer.searchInputBox).type('matglobal', { delay: 50 })
    cy.get(measureComposer.searchBtn).click()
    cy.get(measureComposer.availableLibrariesRow1checkbox).click()
    cy.get(measureComposer.libraryAliasInputBox).type('Global', { delay: 50 })
    cy.get(measureComposer.saveIncludes).click()

    helper.visibleWithTimeout(measureComposer.warningMessage)

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

    //Definition

    dataCreation.addDefinition('Emergency Department ED Visit', '/*Emergency Department visit during the measurement period*/\n' +
      '["Encounter, Performed": "Emergency Department Visit"] EDVisit\n' +
      '  where EDVisit.relevantPeriod during "Measurement Period"')

    dataCreation.addDefinition('Initial Population', '/*Emergency Department visit during the measurement period*/\n' +
      '["Encounter, Performed": "Emergency Department Visit"] EDVisit\n' +
      '  where EDVisit.relevantPeriod during "Measurement Period"')

    dataCreation.addDefinition('Measure Population', '/*Measure population does not include an ED visit where the date/times are null*/\n' +
      '"Initial Population" EDVisit\n' +
      '\twhere "Measure Observation"(EDVisit)is not null')

    dataCreation.addDefinition('Measure Population Exclusions', '/*ED visits where patient expired or the patient was admitted inpatient within an hour of the ED visit*/\n' +
      '( "Emergency Department ED Visit" EDVisit\n' +
      '    where EDVisit.dischargeDisposition ~ "Patient deceased during stay (discharge status = dead) (finding)"\n' +
      ')\n' +
      '  union ( "Emergency Department ED Visit" EDVisit\n' +
      '      with ["Encounter, Performed": "Encounter Inpatient"] Encounter\n' +
      '        such that EDVisit.relevantPeriod ends 1 hour or less before or on start of Encounter.relevantPeriod\n' +
      '  )')

    dataCreation.addDefinition('Stratification 2', '/*Patients who are discharged to an acute care facility as detailed in the value set*/\n' +
      '"Emergency Department ED Visit" EDVisit\n' +
      '  where EDVisit.dischargeDisposition in "Discharge To Acute Care Facility"')

    //Function

    cy.get(measureComposer.functionMeasureComposer).click()

    helper.waitToContainText(measureComposer.cqlWorkspaceTitleGlobal2, 'Function')

    cy.get(measureComposer.addNewBtn).click()
    cy.get(measureComposer.functionNameInput).type('Arrival and Departure Time', { delay: 50 })
    cy.get(measureComposer.addArgument).click()
    cy.get(measureComposer.argumentNameInput).click()
    helper.enterText(measureComposer.argumentNameInput, 'Encounter')
    cy.get(measureComposer.availableDatatypesListBox).select('QDM Datatype')
    cy.get(measureComposer.selectQDMDatatypeObject).select('Encounter, Performed')
    cy.get(measureComposer.addBtn).click()
    cy.get(measureComposer.functionCQLExpressionEditorInput).type('/*Evaluates the interval from the first ED encounter time (arrival) to the last ED encounter time (departure)*/\n' +
      'Interval[First(Encounter.facilityLocations Location\n' +
      '    return start of Location.locationPeriod\n' +
      '    sort ascending\n' +
      '), Last(Encounter.facilityLocations Location\n' +
      '    return \n' +
      '    end of Location.locationPeriod\n' +
      '    sort ascending\n' +
      ')]', { delay: 50 })
    cy.get(measureComposer.functionSaveBtn).click()

    helper.visibleWithTimeout(measureComposer.warningMessage)

    cy.get(measureComposer.addNewBtn).click()
    cy.get(measureComposer.functionNameInput).type('Arrival Time', { delay: 50 })
    cy.get(measureComposer.addArgument).click()
    cy.get(measureComposer.argumentNameInput).click()
    helper.enterText(measureComposer.argumentNameInput, 'Encounter')
    cy.get(measureComposer.availableDatatypesListBox).select('QDM Datatype')
    cy.get(measureComposer.selectQDMDatatypeObject).select('Encounter, Performed')
    cy.get(measureComposer.addBtn).click()
    cy.get(measureComposer.functionCQLExpressionEditorInput).type('First(Encounter.facilityLocations Location\n' +
      '    return start of Location.locationPeriod\n' +
      '    sort ascending\n' +
      ')', { delay: 50 })
    cy.get(measureComposer.functionSaveBtn).click()

    helper.visibleWithTimeout(measureComposer.warningMessage)

    cy.get(measureComposer.addNewBtn).click()
    cy.get(measureComposer.functionNameInput).type('Arrival to Observation Order or Departure Time', { delay: 50 })
    cy.get(measureComposer.addArgument).click()
    cy.get(measureComposer.argumentNameInput).click()
    helper.enterText(measureComposer.argumentNameInput, 'Encounter')
    cy.get(measureComposer.availableDatatypesListBox).select('QDM Datatype')
    cy.get(measureComposer.selectQDMDatatypeObject).select('Encounter, Performed')
    cy.get(measureComposer.addBtn).click()
    cy.get(measureComposer.functionCQLExpressionEditorInput).type('duration in minutes of Interval ["Arrival Time"(Encounter), Coalesce("Observation Services Order"(Encounter).authorDatetime, "Departure Time"(Encounter))]', { delay: 50 })
    cy.get(measureComposer.functionSaveBtn).click()

    helper.visibleWithTimeout(measureComposer.warningMessage)

    cy.get(measureComposer.addNewBtn).click()
    cy.get(measureComposer.functionNameInput).type('Departure Time', { delay: 50 })
    cy.get(measureComposer.addArgument).click()
    cy.get(measureComposer.argumentNameInput).click()
    helper.enterText(measureComposer.argumentNameInput, 'Encounter')
    cy.get(measureComposer.availableDatatypesListBox).select('QDM Datatype')
    cy.get(measureComposer.selectQDMDatatypeObject).select('Encounter, Performed')
    cy.get(measureComposer.addBtn).click()
    cy.get(measureComposer.functionCQLExpressionEditorInput).type('Last(Encounter.facilityLocations Location\n' +
      '    return \n' +
      '    end of Location.locationPeriod\n' +
      '    sort ascending\n' +
      ')', { delay: 50 })
    cy.get(measureComposer.functionSaveBtn).click()

    helper.visibleWithTimeout(measureComposer.warningMessage)

    cy.get(measureComposer.addNewBtn).click()
    cy.get(measureComposer.functionNameInput).type('Measure Observation', { delay: 50 })
    cy.get(measureComposer.addArgument).click()
    cy.get(measureComposer.argumentNameInput).click()
    helper.enterText(measureComposer.argumentNameInput, 'Encounter')
    cy.get(measureComposer.availableDatatypesListBox).select('QDM Datatype')
    cy.get(measureComposer.selectQDMDatatypeObject).select('Encounter, Performed')
    cy.get(measureComposer.addBtn).click()
    cy.wait(1500)
    cy.get(measureComposer.functionCQLExpressionEditorInput).type('/*Time from ED visit arrival to observation order or ED departure for patients not admitted to inpatient*/\n' +
      '"Arrival to Observation Order or Departure Time"(Encounter)', { delay: 50 })
    cy.get(measureComposer.functionSaveBtn).click()

    helper.visibleWithTimeout(measureComposer.warningMessage)

    cy.get(measureComposer.addNewBtn).click()
    cy.get(measureComposer.functionNameInput).type('Observation Services Order', { delay: 50 })
    cy.get(measureComposer.addArgument).click()
    cy.get(measureComposer.argumentNameInput).click()
    helper.enterText(measureComposer.argumentNameInput, 'Encounter')
    cy.get(measureComposer.availableDatatypesListBox).select('QDM Datatype')
    cy.get(measureComposer.selectQDMDatatypeObject).select('Encounter, Performed')
    cy.get(measureComposer.addBtn).click()
    cy.get(measureComposer.functionCQLExpressionEditorInput).type('/*Order to place patient in observation services*/\n' +
      'Last(["Encounter, Order": "Observation Services"] ObservationOrder\n' +
      '    where ObservationOrder.authorDatetime during Encounter.relevantPeriod\n' +
      '    sort by authorDatetime\n' +
      ')', { delay: 50 })
    cy.get(measureComposer.functionSaveBtn).click()

    helper.visibleWithTimeout(measureComposer.warningMessage)

    //CQL Library Editor

    cy.get(measureComposer.cqlLibraryEditor).click()

    helper.waitToContainText(measureComposer.cqlWorkspaceTitleCQLLibraryEditor, 'CQL Library Editor')

    helper.visibleWithTimeout(measureComposer.warningMessage)
    helper.waitToContainText(measureComposer.warningMessage, 'You are viewing CQL with no validation errors.')

    cy.get(measureComposer.populationWorkspace).click()

    helper.verifySpinnerAppearsAndDissappears()

    cy.get(measureComposer.initialPopulation).click()

    helper.verifySpinnerAppearsAndDissappears()

    cy.get(measureComposer.initialPopulationDefinitionListBox).select('Initial Population')
    cy.get(measureComposer.initialPopulationSaveBtn).click()

    helper.visibleWithTimeout(measureComposer.warningMessage)
    helper.waitToContainText(measureComposer.warningMessage, 'Changes to Initial Populations have been successfully saved.')

    cy.get(measureComposer.measurePopulations).click()

    helper.verifySpinnerAppearsAndDissappears()

    cy.get(measureComposer.measurePopulationsDefinitionListBox).select('Measure Population')
    cy.get(measureComposer.measurePopulationsSaveBtn).click()

    helper.visibleWithTimeout(measureComposer.warningMessage)
    helper.waitToContainText(measureComposer.warningMessage, 'Changes to Measure Populations have been successfully saved.')

    cy.get(measureComposer.measurePopulationExclusions).click()

    helper.verifySpinnerAppearsAndDissappears()

    cy.get(measureComposer.measurePopulationExclusionsDefinitionListBox).select('Measure Population Exclusions')
    cy.get(measureComposer.measurePopulationExclusionsSaveBtn).click()

    helper.visibleWithTimeout(measureComposer.warningMessage)
    helper.waitToContainText(measureComposer.warningMessage, 'Changes to Measure Population Exclusions have been successfully saved.')

    cy.get(measureComposer.stratification).click()

    helper.verifySpinnerAppearsAndDissappears()

    cy.get(measureComposer.stratificationDefinitionListBox).select('Stratification 2')
    cy.get(measureComposer.stratificationSaveBtn).click()

    helper.visibleWithTimeout(measureComposer.warningMessage)
    helper.waitToContainText(measureComposer.warningMessage, 'Changes to Stratification have been successfully saved.')

    cy.get(measureComposer.measureObservations).click()

    helper.verifySpinnerAppearsAndDissappears()

    cy.get(measureComposer.measureObservationsAggregateFunctionListBox).select('Median')
    cy.get(measureComposer.measureObservationsFunctionListBox).select('Measure Observation')
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
    cy.get(measureComposer.populationsListItems).eq(1).should('contain.text', 'Measure Population 1')
    cy.get(measureComposer.populationsListItems).eq(2).should('contain.text', 'Measure Population Exclusions 1')
    cy.get(measureComposer.populationsListItems).eq(3).should('contain.text', 'Measure Observation 1')
    cy.get(measureComposer.populationsListItems).eq(4).should('contain.text', 'Stratification 1')

    //need to add MO associations and packaging actions

    cy.get(measurelibrary.measureLibraryTab).click()

    helper.verifySpinnerAppearsAndDissappears()

  })
})
