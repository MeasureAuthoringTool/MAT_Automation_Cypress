import * as helper from "../../../../../support/helpers"
import * as oktaLogin from "../../../../../support/oktaLogin"
import * as measurelibrary from "../../../../../pom/MAT/WI/MeasureLibrary"
import * as cqlLibrary from "../../../../../pom/MAT/WI/CqlLibrary"
import * as cqlComposer from "../../../../../pom/MAT/WI/CQLComposer"
import * as dataCreation from "../../../../../support/MAT/MeasureAndCQLLibraryCreation"

let qdmCqlLibrary = ''
let fhirCqlLibrary = ''
let fhirCqlLibrarySecond = ''

describe('CQL Composer: CQL Editor message', () => {
    before('Login', () => {
        oktaLogin.login()

        qdmCqlLibrary = dataCreation.createDraftCqlLibrary('qdmCqlLibrary', 'QDM')
        fhirCqlLibrary = dataCreation.createDraftCqlLibrary('FhirCqlLibrary', 'FHIR')

        helper.verifySpinnerAppearsAndDissappears()
    })
    beforeEach('Preserve Cookies', () => {
        helper.preserveCookies()
    })
    after('Log Out', () => {
        helper.logout()
    })

    it('QDM Library: Validate the success message on CQL Library Editor', () => {

        helper.verifySpinnerAppearsAndDissappears()

        helper.enabledWithTimeout(cqlLibrary.searchInputBox)
        helper.enterText(cqlLibrary.searchInputBox, qdmCqlLibrary)
        cy.get(cqlLibrary.searchBtn).click();

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(cqlLibrary.row1CqlLibrarySearch).dblclick();

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(cqlComposer.cqlLibraryEditor).click();

        cy.get('h4').should('contain.text', 'CQL Library Workspace > CQL Library Editor');

        cy.get(cqlComposer.warningMessage).should('contain.text', 'You are viewing CQL with no validation errors.');

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(measurelibrary.cqlLibraryTab).click()

        helper.verifySpinnerAppearsAndDissappears()

    })

    it('FHIR Library: Validate the success message on CQL Library Editor', () => {
        helper.verifySpinnerAppearsAndDissappears()

        helper.enabledWithTimeout(cqlLibrary.searchInputBox)
        helper.enterText(cqlLibrary.searchInputBox, fhirCqlLibrary)
        cy.get(cqlLibrary.searchBtn).click();

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(cqlLibrary.row1CqlLibrarySearch).dblclick();

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(cqlComposer.cqlLibraryEditor).click();

        cy.get(cqlComposer.warningMessage).should('contain.text', 'You are viewing CQL with no validation errors.');

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(measurelibrary.cqlLibraryTab).click()

        helper.verifySpinnerAppearsAndDissappears()

    })

    it('QDM Library: Validate the error message on CQL Library Editor', () => {
        helper.verifySpinnerAppearsAndDissappears()

        helper.enabledWithTimeout(cqlLibrary.searchInputBox)
        helper.enterText(cqlLibrary.searchInputBox, qdmCqlLibrary)
        cy.get(cqlLibrary.searchBtn).click();

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(cqlLibrary.row1CqlLibrarySearch).dblclick();

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(cqlComposer.functionCQLComposer).click();

        cy.get(cqlComposer.functionNameInput).type('FunctionName');
        cy.get(cqlComposer.functionCQLExpressionEditorInput).type('.fhlsdfi');
        cy.get(cqlComposer.functionSaveBtn).click();

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(cqlComposer.cqlLibraryEditor).click();
        helper.verifySpinnerAppearsAndDissappears()

        cy.get(cqlComposer.warningMessage).should('contain.text', 'You are viewing the CQL file with validation errors. Errors are marked with a red square on the line number.');

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(measurelibrary.cqlLibraryTab).click()

        helper.verifySpinnerAppearsAndDissappears()

    })

    it('FHIR Library: Validate the error message on CQL Library Editor', () => {

        helper.verifySpinnerAppearsAndDissappears()

        helper.enabledWithTimeout(cqlLibrary.searchInputBox)
        helper.enterText(cqlLibrary.searchInputBox, fhirCqlLibrary)
        cy.get(cqlLibrary.searchBtn).click();

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(cqlLibrary.row1CqlLibrarySearch).dblclick();

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(cqlComposer.functionCQLComposer).click();

        cy.get(cqlComposer.functionNameInput).type('FunctionNameFHIR');
        cy.get(cqlComposer.functionCQLExpressionEditorInput).type('.fhlsdfi');
        cy.get(cqlComposer.functionSaveBtn).click();

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(cqlComposer.cqlLibraryEditor).click();
        helper.verifySpinnerAppearsAndDissappears()

        cy.get(cqlComposer.warningMessage).should('contain.text', 'You are viewing the CQL file with validation errors. Errors are marked with a red square on the line number.');

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(measurelibrary.cqlLibraryTab).click()

        helper.verifySpinnerAppearsAndDissappears()

    })

})

describe('FHIR Library: Add code directly on CQL Library Editor', () => {
    before('Login', () => {
        oktaLogin.login()

        fhirCqlLibrary = dataCreation.createDraftCqlLibrary('FhirCqlLibrary', 'FHIR')

        helper.verifySpinnerAppearsAndDissappears()
    })
    beforeEach('Preserve Cookies', () => {
        helper.preserveCookies()
    })
    after('Log Out', () => {
        helper.logout()
    })


    it('FHIR Library: Validate the successful message when editing directly on CQL Library Editor', () => {

        helper.verifySpinnerAppearsAndDissappears()

        helper.enabledWithTimeout(cqlLibrary.searchInputBox)
        helper.enterText(cqlLibrary.searchInputBox, fhirCqlLibrary)
        cy.get(cqlLibrary.searchBtn).click();

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(cqlLibrary.row1CqlLibrarySearch).dblclick();

        helper.verifySpinnerAppearsAndDissappears()

        helper.waitToContainText(cqlComposer.cqlWorkspaceTitleGeneralInformation, 'General Information')

         //Value Sets

        cy.get(cqlComposer.valueSets).click()

        helper.verifySpinnerAppearsAndDissappears()

        dataCreation.addValueSet('2.16.840.1.113883.3.666.5.307')

        //CQL Library Editor

        cy.get(cqlComposer.cqlLibraryEditor).click()

        cy.get(cqlComposer.warningMessage).should('contain.text', 'You are viewing CQL with no validation errors.');

        cy.get(cqlComposer.cqlLibraryEditorBox).type("{downarrow}{downarrow}{downarrow}valueset \"Annual Wellness Visit\": 'http://cts.nlm.nih.gov/fhir/ValueSet/2.16.840.1.113883.3.526.3.1240'")

        cy.get(cqlComposer.cqlEditorSaveBtn).click()

        cy.get(measureComposer.warningMessage).should('contain.text', ' Changes to the CQL File have been successfully saved.')

        cy.get(measurelibrary.cqlLibraryTab).click()

        helper.verifySpinnerAppearsAndDissappears()
    })

})

describe('FHIR Library: Add codesystems and valuesets in CQL Editor without UMLS', () => {
    before('Login', () => {
        oktaLogin.loginWithoutUMLS()

        fhirCqlLibrary = dataCreation.createDraftCqlLibrary('FhirCqlLibrary', 'FHIR')

        helper.verifySpinnerAppearsAndDissappears()
    })
    beforeEach('Preserve Cookies', () => {
        helper.preserveCookies()
    })
    after('Log Out', () => {
        helper.logout()
    })

    it('Validate the error message for adding codesystems without UMLS', () => {

        helper.verifySpinnerAppearsAndDissappears()

        helper.enabledWithTimeout(cqlLibrary.searchInputBox)
        helper.enterText(cqlLibrary.searchInputBox, fhirCqlLibrary)
        cy.get(cqlLibrary.searchBtn).click();

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(cqlLibrary.row1CqlLibrarySearch).dblclick()

        helper.verifySpinnerAppearsAndDissappears()

        helper.waitToContainText(cqlComposer.cqlWorkspaceTitleGeneralInformation, 'General Information')

        //CQL Library Editor

        cy.get(cqlComposer.cqlLibraryEditor).click()

        cy.get(cqlComposer.warningMessage).should('contain.text', 'You are viewing CQL with no validation errors.')

        cy.get(cqlComposer.cqlLibraryEditorBox).type("{downarrow}{downarrow}{downarrow}codesystem \"LOINC\": 'http://loinc.org' version '2.67'{enter}")

        cy.get(cqlComposer.cqlLibraryEditorBox).type("{downarrow}code \"Birth date\": '21112-8' from \"LOINC\" display 'Birth date'{enter}")

        cy.get(cqlComposer.cqlEditorSaveBtn).click()

        cy.get(cqlComposer.warningMessage).should('contain.text', 'The CQL file was saved with errors.')

        cy.get(measurelibrary.cqlLibraryTab).click()

        helper.verifySpinnerAppearsAndDissappears()

    })

    it('Validate the error message for adding valuesets without UMLS', () => {

        fhirCqlLibrarySecond = dataCreation.createDraftCqlLibrary('FhirCqlLibrarySecond', 'FHIR')

        helper.verifySpinnerAppearsAndDissappears()

        helper.enabledWithTimeout(cqlLibrary.searchInputBox)
        helper.enterText(cqlLibrary.searchInputBox, fhirCqlLibrarySecond)
        cy.get(cqlLibrary.searchBtn).click();

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(cqlLibrary.row1CqlLibrarySearch).dblclick()

        helper.verifySpinnerAppearsAndDissappears()

        helper.waitToContainText(cqlComposer.cqlWorkspaceTitleGeneralInformation, 'General Information')

        //CQL Library Editor

        cy.get(cqlComposer.cqlLibraryEditor).click()

        cy.get(cqlComposer.warningMessage).should('contain.text', 'You are viewing CQL with no validation errors.')

        cy.get(cqlComposer.cqlLibraryEditorBox).type("{downarrow}{downarrow}{downarrow}valueset \"AAN - Encounter Codes Grouping\": 'http://cts.nlm.nih.gov/fhir/ValueSet/2.16.840.1.113883.3.2286'")

        cy.get(cqlComposer.cqlEditorSaveBtn).click()

        cy.get(cqlComposer.warningMessage).should('contain.text', 'The CQL file was saved with errors.')

        cy.get(measurelibrary.cqlLibraryTab).click()

        helper.verifySpinnerAppearsAndDissappears()

    })

})

describe('MAT: CQL Composer: CQLLibraryWorkspace: CQL Library Editor: FHIR Errors, ability to save FHIR Libraries with errors ' +
  'and correct Error Messages are displayed', () => {
    before('Login', () => {

        oktaLogin.login()

        fhirCqlLibrary = dataCreation.createDraftCqlLibrary('FhirCqlLibrary', 'FHIR')

        helper.verifySpinnerAppearsAndDissappears()

    })
    beforeEach('Preserve Cookies', () => {
        helper.preserveCookies()
    })
    after('Log Out', () => {
        helper.logout()
    })

    it('Ability to save with CQL error or syntax error', () => {

        helper.verifySpinnerAppearsAndDissappears()

        helper.enabledWithTimeout(cqlLibrary.searchInputBox)
        helper.enterText(cqlLibrary.searchInputBox, fhirCqlLibrary)
        cy.get(cqlLibrary.searchBtn).click();

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(cqlLibrary.row1CqlLibrarySearch).dblclick()

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(cqlComposer.definition).click()

        helper.waitToContainText(cqlComposer.cqlWorkspaceTitleGlobal2,'Definition')

        dataCreation.addDefinition('Initial Population','"Emergency Department Visit During Measurement Period" EDVisitMP\n' +
          '  with ["Patient Characteristic Birthdate": "Birth date"] BirthDate\n' +
          '    such that Global."CalendarAgeInYearsAt" ( BirthDate.birthDatetime, start of EDVisitMP.relevantPeriod ) >= 18')

        cy.get(cqlComposer.cqlLibraryEditor).click()

        helper.visibleWithTimeout(cqlComposer.warningMessage)
        cy.get(cqlComposer.warningMessage).should('contain.text', ' You are viewing the CQL file with validation errors. ' +
          'Errors are marked with a red square on the line number.')

        cy.get(cqlComposer.cqlEditorSaveBtn).click()

        helper.verifySpinnerAppearsAndDissappears()

        //assertion for being able to save with CQL errors
        helper.visibleWithTimeout(cqlComposer.warningMessage)
        cy.get(cqlComposer.warningMessage).should('contain.text', ' The CQL file was saved with errors.')

        cy.get(cqlComposer.definition).click()

        helper.waitToContainText(cqlComposer.cqlWorkspaceTitleGlobal2,'Definition')

        dataCreation.addDefinition('syntax errors', 'asdfasdf\n' +
          'asdfasdf\n' +
          '\n' +
          'asdfasdf')

        cy.get(cqlComposer.cqlLibraryEditor).click()

        //checking message when loading the CQL editor with syntax error
        helper.visibleWithTimeout(cqlComposer.warningMessage)
        cy.get(cqlComposer.warningMessage).eq(0).should('contain.text', ' You are viewing the CQL file with validation errors. Errors are marked with a red square on the line number.')
        cy.get(cqlComposer.warningMessage).eq(1).should('contain.text', ' Please correct the syntax errors so the CQL can be validated.')

        cy.get(cqlComposer.cqlEditorSaveBtn).click()

        helper.verifySpinnerAppearsAndDissappears()

        //assertion for being able to save with syntax error
        helper.visibleWithTimeout(cqlComposer.warningMessage)
        cy.get(cqlComposer.warningMessage).eq(0).should('contain.text', ' The CQL file was saved with errors.')
        cy.get(cqlComposer.warningMessage).eq(1).should('contain.text', ' Please correct the syntax errors so the CQL can be validated.')

        cy.get(measurelibrary.measureLibraryTab).click()

        helper.verifySpinnerAppearsAndDissappears()

    })
})