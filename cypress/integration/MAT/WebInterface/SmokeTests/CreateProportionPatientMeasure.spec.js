import * as helper from '../../../../support/helpers'
import * as measurelibrary from '../../../../pom/MAT/WI/MeasureLibrary'
import * as createNewMeasure from '../../../../pom/MAT/WI/CreateNewMeasure'
import * as measureComposer from '../../../../pom/MAT/WI/MeasureComposer'
import * as matheader from "../../../../pom/MAT/WI/MATheader";

describe('Create Proportion Patient Measure', () => {
    before('Login', () => {
        helper.loginGeneric()
    })
    beforeEach('Preserve Cookies', () => {
        helper.preserveCookies()
    })
    after('Log Out', () => {
        //helper.logout()
    })
    // it('Potential Opioid Overuse v1.3', () => {
    //
    //     cy.get(measurelibrary.newMeasureButton).click()
    //
    //     let measureName = 'createContVariableMeasure' + Date.now()
    //
    //     cy.get(createNewMeasure.measureName).type(measureName, { delay: 50 })
    //     cy.get(createNewMeasure.modelradioQDM).click()
    //     cy.get(createNewMeasure.cqlLibraryName).type(measureName, { delay: 50 })
    //     cy.get(createNewMeasure.shortName).type(measureName, { delay: 50 })
    //
    //     cy.get(createNewMeasure.measureScoringListBox).select('Continuous Variable')
    //     cy.get(createNewMeasure.patientBasedMeasureListBox).select('No')
    //
    //     cy.get(createNewMeasure.saveAndContinueBtn).click()
    //     cy.get(createNewMeasure.confirmationContinueBtn).click()
    //
    //     helper.visibleWithTimeout(matheader.progressbar)
    //     helper.notVisibleWithTimeout(matheader.progressbar)
    //
    //     cy.get(measureComposer.cqlWorkspace).click()
    //
    //     helper.visibleWithTimeout(matheader.progressbar)
    //     helper.notVisibleWithTimeout(matheader.progressbar)
    //
    //     helper.waitToContainText(measureComposer.cqlWorkspaceTitleGeneralInformation,'General Information')
    //
    //     //Includes
    //
    //     cy.get(measureComposer.includes).click()
    //
    //     helper.waitToContainText(measureComposer.cqlWorkspaceTitleIncludes,'Includes')
    //
    //     cy.get(measureComposer.searchInputBox).type('global', { delay: 50 })
    //     cy.get(measureComposer.searchBtn).click()
    //     cy.get(measureComposer.availableLibrariesRow1checkbox).click()
    //     cy.get(measureComposer.libraryAliasInputBox).type('Global', { delay: 50 })
    //     cy.get(measureComposer.saveIncludes).click()
    //
    //     helper.visibleWithTimeout(measureComposer.warningMessage)
    //
    //     //Value Sets
    //
    //     helper.addValueSet('2.16.840.1.113883.17.4077.2.2079')
    //     helper.addValueSet('2.16.840.1.113883.3.526.3.1520')
    //     helper.addValueSet('2.16.840.1.113883.3.117.1.7.1.299')
    //
    //     //codes
    //
    //     helper.addCode('CODE:/CodeSystem/SNOMEDCT/Version/2018-09/Code/448951000124107/Info')
    //     helper.addCode('CODE:/CodeSystem/LOINC/Version/2.66/Code/21112-8/Info')
    //     helper.addCode('CODE:/CodeSystem/CPT/Version/2015/Code/99291/Info')
    //     helper.addCode('CODE:/CodeSystem/DischargeDisposition/Version/HL7V2.5/Code/20/Info')
    //     helper.addCode('CODE:/CodeSystem/SNOMEDCT/Version/2019-09/Code/371828006/Info')
    //
    //     //Parameter
    //
    //     cy.get(measureComposer.parameter).click()
    //
    //     helper.waitToContainText(measureComposer.cqlWorkspaceTitleGlobal2,'Parameter')
    //
    //     cy.get(measureComposer.addNewBtn).click()
    //     cy.get(measureComposer.parameterNameInput).type('test.Parameter', { delay: 50 })
    //     cy.get(measureComposer.parameterCQLExpressionEditorInput).type('Interval<DateTime>', { delay: 50 })
    //     cy.get(measureComposer.parameterSaveBtn).click()
    //
    //     helper.visibleWithTimeout(measureComposer.warningMessage)
    //
    //     //Definition
    //
    //     helper.addDefinition('Emergency Department Visit During Measurement Period','( ["Encounter, Performed": "Emergency Department Visit"]\n' +
    //         '\tunion ["Encounter, Performed": "Critical care, evaluation and management of the critically ill or critically injured patient; first 30-74 minutes"] ) EDVisit\n' +
    //         '\twhere EDVisit.relevantPeriod during "Measurement Period"\n' +
    //         '\t\tand EDVisit.dischargeDisposition is not null\n' +
    //         '\t\tand EDVisit.lengthOfStay > 0 \'minutes\'')
    //
    //     helper.addDefinition('Initial Population','"Emergency Department Visit During Measurement Period" EDVisitMP\n' +
    //         '  with ["Patient Characteristic Birthdate": "Birth date"] BirthDate\n' +
    //         '    such that Global."CalendarAgeInYearsAt" ( BirthDate.birthDatetime, start of EDVisitMP.relevantPeriod ) >= 18')
    //
    //     helper.addDefinition('Measure Exclusions','"Patient Expired During Emergency Department Visit"\n' +
    //         '\tunion "Patient Has Psychiatric or Mental Health Diagnosis"\n' +
    //         '\tunion "Patient Transferred to Acute Care Hospital or Admitted to Observation"')
    //
    //     helper.addDefinition('Measure Population','"Initial Population"')
    //
    //     helper.addDefinition('Patient Expired During Emergency Department Visit','"Emergency Department Visit During Measurement Period" EDVisitMP\n' +
    //         '  where ( EDVisitMP.dischargeDisposition ~ "Patient deceased during stay (discharge status = dead) (finding)"\n' +
    //         '      or EDVisitMP.dischargeDisposition ~ "Expired (i.e. dead)"\n' +
    //         '  )')
    //
    //     helper.addDefinition('Patient Has Psychiatric or Mental Health Diagnosis','"Emergency Department Visit During Measurement Period" EDVisitMP\n' +
    //         '\twith ["Diagnosis": "Psychiatric/Mental Health Diagnosis"] PsychDiagnosis\n' +
    //         '\t\tsuch that PsychDiagnosis.prevalencePeriod overlaps after EDVisitMP.relevantPeriod')
    //
    //     helper.addDefinition('Patient Transferred to Acute Care Hospital or Admitted to Observation','"Emergency Department Visit During Measurement Period" EDVisitMP\n' +
    //         '\twhere ( EDVisitMP.dischargeDisposition in "Acute Care or Inpatient Facility"\n' +
    //         '\t\t\tor EDVisitMP.dischargeDisposition ~ "Admission to observation unit (procedure)"\n' +
    //         '\t)')
    //
    //     //Function
    //
    //     cy.get(measureComposer.functionMeasureComposer).click()
    //
    //     helper.waitToContainText(measureComposer.cqlWorkspaceTitleGlobal2,'Function')
    //
    //     cy.get(measureComposer.addNewBtn).click()
    //     cy.get(measureComposer.functionNameInput).type('Arrival and Departure Time', { delay: 50 })
    //     cy.get(measureComposer.addArgument).click()
    //     cy.get(measureComposer.argumentNameInput).type('Encounter', { delay: 50 })
    //     cy.get(measureComposer.availableDatatypesListBox).select('QDM Datatype')
    //     cy.get(measureComposer.selectQDMDatatypeObject).select('Encounter, Performed')
    //     cy.get(measureComposer.addBtn).click()
    //     cy.get(measureComposer.functionCQLExpressionEditorInput).type('Interval[start of Encounter.relevantPeriod, \n' +
    //         'end of Encounter.relevantPeriod]', { delay: 50 })
    //     cy.get(measureComposer.functionSaveBtn).click()
    //
    //     helper.visibleWithTimeout(measureComposer.warningMessage)
    //
    //     cy.get(measureComposer.addNewBtn).click()
    //     cy.get(measureComposer.functionNameInput).type('Duration of ED Visit', { delay: 50 })
    //     cy.get(measureComposer.addArgument).click()
    //     cy.get(measureComposer.argumentNameInput).type('Encounter', { delay: 50 })
    //     cy.get(measureComposer.availableDatatypesListBox).select('QDM Datatype')
    //     cy.get(measureComposer.selectQDMDatatypeObject).select('Encounter, Performed')
    //     cy.get(measureComposer.addBtn).click()
    //     cy.get(measureComposer.functionCQLExpressionEditorInput).type('duration in minutes of ( "Arrival and Departure Time"(Encounter))', { delay: 50 })
    //     cy.get(measureComposer.functionSaveBtn).click()
    //
    //     helper.visibleWithTimeout(measureComposer.warningMessage)
    //
    //     //CQL Library Editor
    //
    //     cy.get(measureComposer.cqlLibraryEditor).click()
    //
    //     helper.waitToContainText(measureComposer.cqlWorkspaceTitleCQLLibraryEditor,'CQL Library Editor')
    //     helper.visibleWithTimeout(measureComposer.warningMessage)
    //     helper.waitToContainText(measureComposer.warningMessage,'You are viewing CQL with no validation errors.')
    //
    //     cy.get(measurelibrary.measureLibraryTab).click()
    //     cy.get(measurelibrary.measureLibraryTab).click()
    //
    //     helper.visibleWithTimeout(matheader.progressbar)
    //     helper.notVisibleWithTimeout(matheader.progressbar)
    //
    // })

    it('Create FHIR Proportion Patient Measure', () => {

        cy.get(measurelibrary.newMeasureButton).click()

        let measureName = 'createFHIRProportionPatientMeasure' + Date.now()

        cy.get(createNewMeasure.measureName).type(measureName, { delay: 50 })
        cy.get(createNewMeasure.modelradioFHIR).click()
        cy.get(createNewMeasure.cqlLibraryName).type(measureName, { delay: 50 })
        cy.get(createNewMeasure.shortName).type(measureName, { delay: 50 })

        cy.get(createNewMeasure.measureScoringListBox).select('Proportion')
        cy.get(createNewMeasure.patientBasedMeasureListBox).select('Yes')

        cy.get(createNewMeasure.saveAndContinueBtn).click()
        cy.get(createNewMeasure.confirmationContinueBtn).click()

        helper.visibleWithTimeout(matheader.progressbar)
        helper.notVisibleWithTimeout(matheader.progressbar)

        cy.get(measureComposer.cqlWorkspace).click()

        helper.visibleWithTimeout(matheader.progressbar)
        helper.notVisibleWithTimeout(matheader.progressbar)

        helper.waitToContainText(measureComposer.cqlWorkspaceTitleGeneralInformation,'General Information')

        //Includes

        // cy.get(measureComposer.includes).click()
        //
        // helper.waitToContainText(measureComposer.cqlWorkspaceTitleIncludes,'Includes')
        //
        // cy.get(measureComposer.searchInputBox).type('global', { delay: 50 })
        // cy.get(measureComposer.searchBtn).click()
        // cy.get(measureComposer.availableLibrariesRow1checkbox).click()
        // cy.get(measureComposer.libraryAliasInputBox).type('Global', { delay: 50 })
        // cy.get(measureComposer.saveIncludes).click()
        //
        // helper.visibleWithTimeout(measureComposer.warningMessage)

        //Value Sets

        helper.addValueSet('2.16.840.1.113883.3.560.100.2')
        helper.addValueSet('2.16.840.1.113883.3.464.1003.101.12.1016')
        helper.addValueSet('2.16.840.1.113883.3.464.1003.198.12.1014')
        helper.addValueSet('2.16.840.1.113883.3.464.1003.101.12.1001')
        helper.addValueSet('2.16.840.1.113883.3.464.1003.108.12.1017')
        helper.addValueSet('2.16.840.1.113883.3.464.1003.101.12.1025')
        helper.addValueSet('2.16.840.1.113883.3.464.1003.101.12.1023')
        helper.addValueSet('2.16.840.1.113883.3.464.1003.110.12.1059')
        helper.addValueSet('2.16.840.1.113883.3.117.1.7.1.207')
        helper.addValueSet('2.16.840.1.113883.3.117.1.7.1.209')
        helper.addValueSet('2.16.840.1.113883.3.666.5.307')
        helper.addValueSet('2.16.840.1.113762.1.4.1108.15')

        //codes

        helper.addCode('CODE:/CodeSystem/SNOMEDCT/Version/2012-07/Code/37687000/Info')


        //Parameter

        cy.get(measureComposer.parameter).click()

        helper.waitToContainText(measureComposer.cqlWorkspaceTitleGlobal2,'Parameter')

        cy.get(measureComposer.addNewBtn).click()
        cy.get(measureComposer.parameterNameInput).type('test.Parameter', { delay: 50 })
        cy.get(measureComposer.parameterCQLExpressionEditorInput).type('Interval<DateTime>', { delay: 50 })
        cy.get(measureComposer.parameterSaveBtn).click()

        helper.visibleWithTimeout(measureComposer.warningMessage)

        //Definition

        helper.addDefinition('Pap Test with Results','  ["Laboratory Test, Performed": "Pap Test"] PapTest\n' +
            '  \twhere PapTest.result is not null')

        helper.addDefinition('Pap Test Within 3 Years','  "Pap Test with Results" PapTest\n' +
            '  \twhere PapTest.relevantPeriod 3 years or less before end of "Measurement Period"')

        helper.addDefinition('Pap Test With HPV Within 5 Years','  "PapTest Within 5 Years" PapTestOver30YearsOld\n' +
            '  \twith ["Laboratory Test, Performed": "HPV Test"] HPVTest\n' +
            '  \t\tsuch that HPVTest.result is not null\n' +
            '  \t\t\tand ( HPVTest.relevantPeriod starts 1 day or less before or on day of start of PapTestOver30YearsOld.relevantPeriod\n' +
            '  \t\t\t\t\tor HPVTest.relevantPeriod starts less than 1 day after or on day of start of PapTestOver30YearsOld.relevantPeriod\n' +
            '  \t\t\t)')



        helper.addDefinition('Numerator','  exists "Pap Test Within 3 Years"\n' +
            '  \tor exists "Pap Test With HPV Within 5 Years"')

        helper.addDefinition('Qualifying Encounters','  ( ["Encounter, Performed": "Office Visit"]\n' +
            '  \tunion ["Encounter, Performed": "Preventive Care Services - Established Office Visit, 18 and Up"]\n' +
            '  \tunion ["Encounter, Performed": "Preventive Care Services-Initial Office Visit, 18 and Up"]\n' +
            '  \tunion ["Encounter, Performed": "Home Healthcare Services"] ) ValidEncounter\n' +
            '  \twhere ValidEncounter.relevantPeriod during "Measurement Period"\n' +
            'define "PapTest Within 5 Years":\n' +
            '  ( "Pap Test with Results" PapTestOver30YearsOld\n' +
            '  \t\twith ["Patient Characteristic Birthdate"] BirthDate\n' +
            '  \t\t\tsuch that Global."CalendarAgeInYearsAt"(BirthDate.birthDatetime, start of PapTestOver30YearsOld.relevantPeriod)>= 30\n' +
            '  \t\t\t\tand PapTestOver30YearsOld.relevantPeriod 5 years or less before end of "Measurement Period"\n' +
            '  )')

        helper.addDefinition('Initial Population','  exists ( ["Patient Characteristic Birthdate"] BirthDate\n' +
            '  \t\twhere Global."CalendarAgeInYearsAt"(BirthDate.birthDatetime, start of "Measurement Period")>= 23\n' +
            '  \t\t\tand Global."CalendarAgeInYearsAt"(BirthDate.birthDatetime, start of "Measurement Period")<= 64\n' +
            '  )\n' +
            '  \tand exists ( ["Patient Characteristic Sex": "Female"] )\n' +
            '  \tand exists "Qualifying Encounters"')

        helper.addDefinition('Denominator','"Initial Population"')

        helper.addDefinition('Absence of Cervix','  ["Diagnosis": "Congenital absence of cervix (disorder)"] NoCervixBirth\n' +
            '  \twhere NoCervixBirth.prevalencePeriod starts before end "Measurement Period"')

        helper.addDefinition('Surgical Absence of Cervix','  ["Procedure, Performed": "Hysterectomy with No Residual Cervix"] NoCervixHysterectomy\n' +
            '  \twhere NoCervixHysterectomy.relevantPeriod ends before end "Measurement Period"')

        helper.addDefinition('Denominator Exclusions','  Hospice."Has Hospice"\n' +
            '  \tor exists "Surgical Absence of Cervix"\n' +
            '  \tor exists "Absence of Cervix"')





        //Function

        // cy.get(measureComposer.functionMeasureComposer).click()
        //
        // helper.waitToContainText(measureComposer.cqlWorkspaceTitleGlobal2,'Function')
        //
        // cy.get(measureComposer.addNewBtn).click()
        // cy.get(measureComposer.functionNameInput).type('Arrival and Departure Time', { delay: 50 })
        // cy.get(measureComposer.addArgument).click()
        // cy.get(measureComposer.argumentNameInput).type('Encounter', { delay: 50 })
        // cy.get(measureComposer.availableDatatypesListBox).select('QDM Datatype')
        // cy.get(measureComposer.selectQDMDatatypeObject).select('Encounter, Performed')
        // cy.get(measureComposer.addBtn).click()
        // cy.get(measureComposer.functionCQLExpressionEditorInput).type('Interval[start of Encounter.relevantPeriod, \n' +
        //     'end of Encounter.relevantPeriod]', { delay: 50 })
        // cy.get(measureComposer.functionSaveBtn).click()
        //
        // helper.visibleWithTimeout(measureComposer.warningMessage)
        //
        // cy.get(measureComposer.addNewBtn).click()
        // cy.get(measureComposer.functionNameInput).type('Duration of ED Visit', { delay: 50 })
        // cy.get(measureComposer.addArgument).click()
        // cy.get(measureComposer.argumentNameInput).type('Encounter', { delay: 50 })
        // cy.get(measureComposer.availableDatatypesListBox).select('QDM Datatype')
        // cy.get(measureComposer.selectQDMDatatypeObject).select('Encounter, Performed')
        // cy.get(measureComposer.addBtn).click()
        // cy.get(measureComposer.functionCQLExpressionEditorInput).type('duration in minutes of ( "Arrival and Departure Time"(Encounter))', { delay: 50 })
        // cy.get(measureComposer.functionSaveBtn).click()
        //
        // helper.visibleWithTimeout(measureComposer.warningMessage)

        //CQL Library Editor

        cy.get(measureComposer.cqlLibraryEditor).click()

        helper.waitToContainText(measureComposer.cqlWorkspaceTitleCQLLibraryEditor,'CQL Library Editor')
        helper.visibleWithTimeout(measureComposer.warningMessage)

        helper.waitToContainText(measureComposer.warningMessage,'You are viewing CQL with no validation errors.')

        cy.get(measurelibrary.measureLibraryTab).click()
        cy.get(measurelibrary.measureLibraryTab).click()

        helper.visibleWithTimeout(matheader.progressbar)
        helper.notVisibleWithTimeout(matheader.progressbar)

    })
})