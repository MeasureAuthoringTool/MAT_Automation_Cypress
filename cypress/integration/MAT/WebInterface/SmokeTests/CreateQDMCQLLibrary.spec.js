import * as helper from '../../../../support/helpers'
import * as measurelibrary from '../../../../pom/MAT/WI/MeasureLibrary'
import * as measureComposer from '../../../../pom/MAT/WI/MeasureComposer'
import * as cqlLibrary from "../../../../pom/MAT/WI/CqlLibrary";
import * as createNewCqlLibrary from "../../../../pom/MAT/WI/CreateNewCQLLibrary";
import * as cqlComposer from "../../../../pom/MAT/WI/CQLComposer";
import * as oktaLogin from '../../../../support/oktaLogin'

describe('Create CQL Library', () => {
    before('Login', () => {
        oktaLogin.login()

        cy.get(measurelibrary.cqlLibraryTab).click()
    })
    beforeEach('Preserve Cookies', () => {
        helper.preserveCookies()
    })
    after('Log Out', () => {
        helper.logout()
    })
    it('Create CQL Library', () => {


        cy.get(cqlLibrary.newLibraryBtn).click()

        let cqlLibraryName = 'CQLLibraryTest' + Date.now()

        cy.get(createNewCqlLibrary.cqlLibraryName).type(cqlLibraryName, { delay: 50 })

        cy.get(createNewCqlLibrary.modelQDMRadio).click()

        cy.get(createNewCqlLibrary.saveAndContinueBtn).click()

        cy.get(cqlComposer.confirmationContinueBtn).click()

        helper.verifySpinnerAppearsAndDissappears()

        helper.waitToContainText(measureComposer.cqlWorkspaceTitleGeneralInformation,'General Information')

        //Includes

        cy.get(measureComposer.includes).click()

        helper.waitToContainText(measureComposer.cqlWorkspaceTitleIncludes,'Includes')

        cy.get(measureComposer.searchInputBox).type('global', { delay: 50 })
        cy.get(measureComposer.searchBtn).click()
        cy.get(measureComposer.availableLibrariesRow1checkbox).click()
        cy.get(measureComposer.libraryAliasInputBox).type('Global', { delay: 50 })
        cy.get(measureComposer.saveIncludes).click()

        helper.visibleWithTimeout(measureComposer.warningMessage)

        //Value Sets

        helper.addValueSet('2.16.840.1.113883.17.4077.2.2079')
        helper.addValueSet('2.16.840.1.113883.3.526.3.1520')
        helper.addValueSet('2.16.840.1.113883.3.117.1.7.1.299')

        //codes

        helper.addCode('CODE:/CodeSystem/SNOMEDCT/Version/2018-09/Code/448951000124107/Info')
        helper.addCode('CODE:/CodeSystem/LOINC/Version/2.66/Code/21112-8/Info')
        helper.addCode('CODE:/CodeSystem/CPT/Version/2015/Code/99291/Info')
        helper.addCode('CODE:/CodeSystem/DischargeDisposition/Version/HL7V2.5/Code/20/Info')
        helper.addCode('CODE:/CodeSystem/SNOMEDCT/Version/2019-09/Code/371828006/Info')

        //Parameter

        cy.get(measureComposer.parameter).click()

        helper.waitToContainText(measureComposer.cqlWorkspaceTitleGlobal2,'Parameter')

        cy.get(measureComposer.addNewBtn).click()
        cy.get(measureComposer.parameterNameInput).type('test.Parameter', { delay: 50 })
        cy.get(measureComposer.parameterCQLExpressionEditorInput).type('Interval<DateTime>', { delay: 50 })
        cy.get(measureComposer.parameterSaveBtn).click()

        helper.visibleWithTimeout(measureComposer.warningMessage)

        //Definition

        helper.addDefinition('Emergency Department Visit During Measurement Period','( ["Encounter, Performed": "Emergency Department Visit"]\n' +
            '\tunion ["Encounter, Performed": "Critical care, evaluation and management of the critically ill or critically injured patient; first 30-74 minutes"] ) EDVisit\n' +
            '\twhere EDVisit.relevantPeriod during "Measurement Period"\n' +
            '\t\tand EDVisit.dischargeDisposition is not null\n' +
            '\t\tand EDVisit.lengthOfStay > 0 \'minutes\'')

        helper.addDefinition('Initial Population','"Emergency Department Visit During Measurement Period" EDVisitMP\n' +
            '  with ["Patient Characteristic Birthdate": "Birth date"] BirthDate\n' +
            '    such that Global."CalendarAgeInYearsAt" ( BirthDate.birthDatetime, start of EDVisitMP.relevantPeriod ) >= 18')

        helper.addDefinition('Measure Exclusions','"Patient Expired During Emergency Department Visit"\n' +
            '\tunion "Patient Has Psychiatric or Mental Health Diagnosis"\n' +
            '\tunion "Patient Transferred to Acute Care Hospital or Admitted to Observation"')

        helper.addDefinition('Measure Population','"Initial Population"')

        helper.addDefinition('Patient Expired During Emergency Department Visit','"Emergency Department Visit During Measurement Period" EDVisitMP\n' +
            '  where ( EDVisitMP.dischargeDisposition ~ "Patient deceased during stay (discharge status = dead) (finding)"\n' +
            '      or EDVisitMP.dischargeDisposition ~ "Expired (i.e. dead)"\n' +
            '  )')

        helper.addDefinition('Patient Has Psychiatric or Mental Health Diagnosis','"Emergency Department Visit During Measurement Period" EDVisitMP\n' +
            '\twith ["Diagnosis": "Psychiatric/Mental Health Diagnosis"] PsychDiagnosis\n' +
            '\t\tsuch that PsychDiagnosis.prevalencePeriod overlaps after EDVisitMP.relevantPeriod')

        helper.addDefinition('Patient Transferred to Acute Care Hospital or Admitted to Observation','"Emergency Department Visit During Measurement Period" EDVisitMP\n' +
            '\twhere ( EDVisitMP.dischargeDisposition in "Acute Care or Inpatient Facility"\n' +
            '\t\t\tor EDVisitMP.dischargeDisposition ~ "Admission to observation unit (procedure)"\n' +
            '\t)')

        //Function

        cy.get(measureComposer.functionMeasureComposer).click()

        helper.waitToContainText(measureComposer.cqlWorkspaceTitleGlobal2,'Function')

        cy.get(measureComposer.addNewBtn).click()
        cy.get(measureComposer.functionNameInput).type('Arrival and Departure Time', { delay: 50 })
        cy.get(measureComposer.addArgument).click()
        cy.get(measureComposer.argumentNameInput).type('Encounter', { delay: 50 })
        cy.get(measureComposer.availableDatatypesListBox).select('QDM Datatype')
        cy.get(measureComposer.selectQDMDatatypeObject).select('Encounter, Performed')
        cy.get(measureComposer.addBtn).click()
        cy.get(measureComposer.functionCQLExpressionEditorInput).type('Interval[start of Encounter.relevantPeriod, \n' +
            'end of Encounter.relevantPeriod]', { delay: 50 })
        cy.get(measureComposer.functionSaveBtn).click()

        helper.visibleWithTimeout(measureComposer.warningMessage)

        cy.get(measureComposer.addNewBtn).click()
        cy.get(measureComposer.functionNameInput).type('Duration of ED Visit', { delay: 50 })
        cy.get(measureComposer.addArgument).click()
        cy.get(measureComposer.argumentNameInput).type('Encounter', { delay: 50 })
        cy.get(measureComposer.availableDatatypesListBox).select('QDM Datatype')
        cy.get(measureComposer.selectQDMDatatypeObject).select('Encounter, Performed')
        cy.get(measureComposer.addBtn).click()
        cy.get(measureComposer.functionCQLExpressionEditorInput).type('duration in minutes of ( "Arrival and Departure Time"(Encounter))', { delay: 50 })
        cy.get(measureComposer.functionSaveBtn).click()

        helper.visibleWithTimeout(measureComposer.warningMessage)

        //CQL Library Editor

        cy.get(measureComposer.cqlLibraryEditor).click()

        helper.waitToContainText(measureComposer.cqlWorkspaceTitleCQLLibraryEditor,'CQL Library Editor')
        helper.visibleWithTimeout(measureComposer.warningMessage)

        helper.waitToContainText(measureComposer.warningMessage,'You are viewing CQL with no validation errors.')

        cy.get(measurelibrary.measureLibraryTab).click()
        cy.get(measurelibrary.measureLibraryTab).click()

        helper.verifySpinnerAppearsAndDissappears()

    })
})