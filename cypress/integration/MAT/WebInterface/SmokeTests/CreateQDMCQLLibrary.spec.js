import * as helper from '../../../../support/helpers'
import * as dataCreation from '../../../../support/MAT/MeasureAndCQLLibraryCreation'
import * as measurelibrary from '../../../../pom/MAT/WI/MeasureLibrary'
import * as measureComposer from '../../../../pom/MAT/WI/MeasureComposer'
import * as cqlLibrary from '../../../../pom/MAT/WI/CqlLibrary'
import * as createNewCqlLibrary from '../../../../pom/MAT/WI/CreateNewCQLLibrary'
import * as cqlComposer from '../../../../pom/MAT/WI/CQLComposer'
import * as login from '../../../../support/MAT/Login'
import { selectLibraryModelRadioBtn } from '../../../../pom/MAT/WI/CreateNewCQLLibrary'

//Create QDM CQL Library with definitions and Functions

describe('Create CQL Library', () => {
  beforeEach('Login', () => {
    login.matLogin()

    cy.get(measurelibrary.cqlLibraryTab).click()
    helper.verifySpinnerAppearsAndDissappears()
  })
  afterEach('Log Out', () => {
    login.matLogout()
  })
  it('Create CQL Library with definitions and functions', () => {
    helper.verifySpinnerAppearsAndDissappears()

    helper.enabledWithTimeout(cqlLibrary.newLibraryBtn)
    cy.get(cqlLibrary.newLibraryBtn).click()

    let cqlLibraryName = 'CQLLibraryTest' + Date.now()

    cy.get(createNewCqlLibrary.cqlLibraryName).type(cqlLibraryName, { delay: 50 })

    cy.get(createNewCqlLibrary.selectLibraryModelRadioBtn).eq(1).click()

    cy.get(createNewCqlLibrary.saveAndContinueBtn).click()

    cy.get(cqlComposer.confirmationContinueBtn).click()

    helper.verifySpinnerAppearsAndDissappears()

    helper.waitToContainText(measureComposer.cqlWorkspaceTitleGeneralInformation, 'General Information')

    //Includes
    helper.verifySpinnerAppearsAndDissappears()
    cy.get(measureComposer.includes).click()
    helper.verifySpinnerAppearsAndDissappears()

    helper.waitToContainText(measureComposer.cqlWorkspaceTitleIncludes, 'Includes')

    cy.get(measureComposer.libraryAliasInputBox).type('Global', { delay: 50 })
    cy.get(measureComposer.searchInputBox).type('matglobal', { delay: 50 })
    cy.get(measureComposer.searchBtn).click()
    cy.get(measureComposer.availableLibrariesRow1checkbox).click()
    cy.get(measureComposer.saveIncludes).click()

    helper.visibleWithTimeout(measureComposer.warningMessage)

    //Value Sets

    dataCreation.addValueSet('2.16.840.1.113883.17.4077.2.2079')
    dataCreation.addValueSet('2.16.840.1.113883.3.526.3.1520')
    dataCreation.addValueSet('2.16.840.1.113883.3.117.1.7.1.299')

    //codes

    dataCreation.addCode('CODE:/CodeSystem/SNOMEDCT/Version/2018-09/Code/448951000124107/Info')
    dataCreation.addCode('CODE:/CodeSystem/LOINC/Version/2.66/Code/21112-8/Info')
    dataCreation.addCode('CODE:/CodeSystem/CPT/Version/2015/Code/99291/Info')
    dataCreation.addCode('CODE:/CodeSystem/DischargeDisposition/Version/HL7V2.5/Code/20/Info')
    dataCreation.addCode('CODE:/CodeSystem/SNOMEDCT/Version/2019-09/Code/371828006/Info')

    //Parameter

    cy.get(measureComposer.parameter).click()

    helper.waitToContainText(measureComposer.cqlWorkspaceTitleGlobal2, 'Parameter')

    cy.get(measureComposer.addNewBtn).click()
    cy.get(measureComposer.parameterNameInput).type('test.Parameter', { delay: 50 })
    cy.get(measureComposer.parameterCQLExpressionEditorInput).type('Interval<DateTime>', { delay: 50 })
    cy.get(measureComposer.parameterSaveBtn).click()

    helper.visibleWithTimeout(measureComposer.warningMessage)

    //Definition

    dataCreation.addDefinition('Emergency Department Visit During Measurement Period', '( ["Encounter, Performed": "Emergency Department Visit"]\n' +
      '\tunion ["Encounter, Performed": "Critical care, evaluation and management of the critically ill or critically injured patient; first 30-74 minutes"] ) EDVisit\n' +
      '\twhere EDVisit.relevantPeriod during "Measurement Period"\n' +
      '\t\tand EDVisit.dischargeDisposition is not null\n' +
      '\t\tand EDVisit.lengthOfStay > 0 \'minutes\'')

    dataCreation.addDefinition('Initial Population', '/*Emergency Department visit during the measurement period*/\n' +
      '["Encounter, Performed": "Emergency Department Visit"] EDVisit\n' +
      '  where EDVisit.relevantPeriod during "Measurement Period"')

    dataCreation.addDefinition('Measure Population', '"Initial Population"')

    dataCreation.addDefinition('Patient Expired During Emergency Department Visit', '"Emergency Department Visit During Measurement Period" EDVisitMP\n' +
      '  where ( EDVisitMP.dischargeDisposition ~ "Patient deceased during stay (discharge status = dead) (finding)"\n' +
      '      or EDVisitMP.dischargeDisposition ~ "Expired (i.e. dead)"\n' +
      '  )')

    dataCreation.addDefinition('Patient Has Psychiatric or Mental Health Diagnosis', '"Emergency Department Visit During Measurement Period" EDVisitMP\n' +
      'with ["Diagnosis": "Psychiatric/Mental Health Diagnosis"] PsychDiagnosis\n' +
      'such that PsychDiagnosis.prevalencePeriod overlaps after EDVisitMP.relevantPeriod')

    dataCreation.addDefinition('Patient Transferred to Acute Care Hospital or Admitted to Observation', '"Emergency Department Visit During Measurement Period" EDVisitMP\n' +
      'where ( EDVisitMP.dischargeDisposition in "Acute Care or Inpatient Facility"\n' +
      'or EDVisitMP.dischargeDisposition ~ "Admission to observation unit (procedure)")')

    //Function

    cy.get(measureComposer.functionMeasureComposer).click()

    helper.waitToContainText(measureComposer.cqlWorkspaceTitleGlobal2, 'Function')

    cy.get(measureComposer.addNewBtn).click()
    cy.get(measureComposer.functionNameInput).type('Arrival and Departure Time', { delay: 50 })
    cy.get(measureComposer.addArgument).click()
    helper.enabledWithTimeout(measureComposer.argumentNameInput)
    helper.enterText(measureComposer.argumentNameInput, 'Encounter')
    cy.get(measureComposer.availableDatatypesListBox).select('QDM Datatype')
    cy.get(measureComposer.selectQDMDatatypeObject).select('Encounter, Performed')
    cy.get(measureComposer.addBtn).click()
    cy.wait(1500)
    cy.get(measureComposer.functionCQLExpressionEditorInput).type('Interval[start of Encounter.relevantPeriod, \n' +
      'end of Encounter.relevantPeriod]', { delay: 50 })
    cy.get(measureComposer.functionSaveBtn).click()

    helper.visibleWithTimeout(measureComposer.warningMessage)

    cy.get(measureComposer.addNewBtn).click()
    cy.get(measureComposer.functionNameInput).type('Duration of ED Visit', { delay: 50 })
    cy.get(measureComposer.addArgument).click()
    helper.enabledWithTimeout(measureComposer.argumentNameInput)
    helper.enterText(measureComposer.argumentNameInput, 'Encounter')
    cy.get(measureComposer.availableDatatypesListBox).select('QDM Datatype')
    cy.get(measureComposer.selectQDMDatatypeObject).select('Encounter, Performed')
    cy.get(measureComposer.addBtn).click()
    cy.wait(1500)
    cy.get(measureComposer.functionCQLExpressionEditorInput).type('duration in minutes of ( "Arrival and Departure Time"(Encounter))', { delay: 50 })
    cy.get(measureComposer.functionSaveBtn).click()

    helper.visibleWithTimeout(measureComposer.warningMessage)

    //CQL Library Editor

    cy.get(measureComposer.cqlLibraryEditor).click()

    helper.waitToContainText(measureComposer.cqlWorkspaceTitleCQLLibraryEditor, 'CQL Library Editor')
    helper.visibleWithTimeout(measureComposer.warningMessage)

    helper.waitToContainText(measureComposer.warningMessage, 'You are viewing CQL with no validation errors.')

    cy.get(measurelibrary.measureLibraryTab).click()
    cy.get(measurelibrary.measureLibraryTab).click()

    helper.verifySpinnerAppearsAndDissappears()

  })
})
