import * as helper from "../../../../../support/helpers"
import * as measurelibrary from "../../../../../pom/MAT/WI/MeasureLibrary"
import * as measureComposer from "../../../../../pom/MAT/WI/MeasureComposer"
import * as oktaLogin from "../../../../../support/oktaLogin"
import * as dataCreation from "../../../../../support/MAT/MeasureAndCQLLibraryCreation"
import * as gridRowActions from '../../../../../support/MAT/GridRowActions'

let fhirMeasure = ''
let qdmMeasure = ''

describe('Measure: CQL Editor message', () => {
    before('Login', () => {
        oktaLogin.login()

        qdmMeasure = dataCreation.createDraftMeasure('qdmDraftMeasure', 'QDM')
        fhirMeasure = dataCreation.createDraftMeasure('FhirDraftMeasure', 'FHIR')

        helper.verifySpinnerAppearsAndDissappears()

    })
    beforeEach('Preserve Cookies', () => {
        helper.preserveCookies()
    })
    after('Log Out', () => {
        helper.logout()
    })

    it('QDM Measure: Validate the error message on CQL Editor', () => {
        helper.verifySpinnerAppearsAndDissappears()

        helper.enabledWithTimeout(measurelibrary.searchInputBox)
        helper.enterText(measurelibrary.searchInputBox, qdmMeasure)
        cy.get(measurelibrary.searchBtn).click();

        helper.verifySpinnerAppearsAndDissappears()

        gridRowActions.doubleClickRow(measurelibrary.row1MeasureSearch)

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(measureComposer.cqlWorkspace).click();

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(measureComposer.functionMeasureComposer).click();

        cy.get(measureComposer.functionNameInput).type('FunctionNameQDM');
        cy.get(measureComposer.functionCQLExpressionEditorInput).type('.fhlsdfi');
        cy.get(measureComposer.functionSaveBtn).click();

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(measureComposer.cqlLibraryEditor).click();
        helper.verifySpinnerAppearsAndDissappears()

        cy.get(measureComposer.warningMessage).should('contain.text', 'You are viewing the CQL file with validation errors. Errors are marked with a red square on the line number.');

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(measurelibrary.measureLibraryTab).click()

        helper.verifySpinnerAppearsAndDissappears()

    })

    it('FHIR Measure: Validate the error message on CQL Editor', () => {
        helper.verifySpinnerAppearsAndDissappears()

        helper.enabledWithTimeout(measurelibrary.searchInputBox)
        helper.enterText(measurelibrary.searchInputBox, fhirMeasure)
        cy.get(measurelibrary.searchBtn).click()

        helper.verifySpinnerAppearsAndDissappears()

        gridRowActions.doubleClickRow(measurelibrary.row1MeasureSearch)

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(measureComposer.cqlWorkspace).click()

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(measureComposer.functionMeasureComposer).click()

        cy.get(measureComposer.functionNameInput).type('FunctionNameFHIR')
        cy.get(measureComposer.functionCQLExpressionEditorInput).type('.fhlsdfi');
        cy.get(measureComposer.functionSaveBtn).click();

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(measureComposer.cqlLibraryEditor).click();
        helper.verifySpinnerAppearsAndDissappears()

        cy.get(measureComposer.warningMessage).should('contain.text', 'You are viewing the CQL file with validation errors. Errors are marked with a red square on the line number.');

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(measurelibrary.measureLibraryTab).click()

        helper.verifySpinnerAppearsAndDissappears()

    })
})

describe('FHIR Measure: Version error message', () => {
    before('Login', () => {
        oktaLogin.login()

        fhirMeasure = dataCreation.createDraftMeasure('FhirDraftMeasure', 'FHIR')

    })
    beforeEach('Preserve Cookies', () => {
        helper.preserveCookies()
    })
    after('Log Out', () => {
        helper.logout()
    })

    it('FHIR Measure: Invalid version error message on CQL Editor', () => {

        helper.enterText(measurelibrary.searchInputBox, fhirMeasure)
        cy.get(measurelibrary.searchBtn).click();

        helper.verifySpinnerAppearsAndDissappears()

        gridRowActions.doubleClickRow(measurelibrary.row1MeasureSearch)

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(measureComposer.cqlWorkspace).click()

        helper.verifySpinnerAppearsAndDissappears()

        // CQL Library Editor
        cy.get(measureComposer.cqlLibraryEditor).click()
        helper.verifySpinnerAppearsAndDissappears()
        cy.get(measureComposer.cqlLibraryEditorInput).type("{uparrow}{uparrow}{uparrow}{uparrow}{uparrow}{uparrow}{uparrow}{uparrow}{uparrow}include Hospice_FHIR4 version '1.0' called Hospice");
        cy.get(measureComposer.cqlEditorSaveBtn).click();

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(measureComposer.warningMessage).should('contain.text', "The CQL file was saved with errors. Please correct the syntax errors so the CQL can be validated.");

        cy.get(measurelibrary.measureLibraryTab).click();

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(measurelibrary.measureLibraryTab).click()

        helper.verifySpinnerAppearsAndDissappears()

    })

})

describe('FHIR Measure: Add code directly on CQL Library Editor', () => {
    before('Login', () => {
        oktaLogin.login()

        fhirMeasure = dataCreation.createDraftMeasure('FhirDraftMeasure', 'FHIR')

    })
    beforeEach('Preserve Cookies', () => {
        helper.preserveCookies()
    })
    after('Log Out', () => {
        helper.logout()
    })

    it('FHIR Measure: Validate the successful when editing directly on CQL Library Editor', () => {

        helper.enterText(measurelibrary.searchInputBox, fhirMeasure)
        cy.get(measurelibrary.searchBtn).click();

        helper.verifySpinnerAppearsAndDissappears()

        gridRowActions.doubleClickRow(measurelibrary.row1MeasureSearch)

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(measureComposer.cqlWorkspace).click();

        helper.verifySpinnerAppearsAndDissappears()

        //CQL Library Editor

        cy.get(measureComposer.cqlLibraryEditor).click()

        cy.get(measureComposer.warningMessage).should('contain.text', 'You are viewing CQL with no validation errors.');

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(measureComposer.cqlLibraryEditorInput).type("{uparrow}{uparrow}{uparrow}{uparrow}{uparrow}{uparrow}{uparrow}{uparrow}{uparrow}valueset \"Annual Wellness Visit\": 'http://cts.nlm.nih.gov/fhir/ValueSet/2.16.840.1.113883.3.526.3.1240'{enter}")

        cy.get(measureComposer.cqlEditorSaveBtn).click()

        cy.get(measureComposer.warningMessage).should('contain.text', ' Changes to the CQL File have been successfully saved.')

        cy.get(measurelibrary.measureLibraryTab).click()

        helper.verifySpinnerAppearsAndDissappears()

    })

})

describe('FHIR Measure: Add codesystems and valusets without UMLS', () => {
    before('Login', () => {
        oktaLogin.loginWithoutUMLS()
        fhirMeasure = dataCreation.createDraftMeasure('FhirMeasure', 'FHIR')
        helper.verifySpinnerAppearsAndDissappears()
    })
    beforeEach('Preserve Cookies', () => {
        helper.preserveCookies()
    })
    after('Log Out', () => {
        helper.logout()
    })

    it('Validate the error message for adding codesystems and valuesets without UMLS', () => {

        helper.verifySpinnerAppearsAndDissappears()

        helper.enabledWithTimeout(measurelibrary.searchInputBox)
        helper.enterText(measurelibrary.searchInputBox, fhirMeasure)

        cy.get(measurelibrary.searchBtn).click()

        helper.verifySpinnerAppearsAndDissappears()

        helper.visibleWithTimeout(measurelibrary.row1MeasureSearch)
        gridRowActions.doubleClickRow(measurelibrary.row1MeasureSearch)

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(measureComposer.cqlWorkspace).click()

        helper.verifySpinnerAppearsAndDissappears()

        helper.waitToContainText(measureComposer.cqlWorkspaceTitleGeneralInformation, 'General Information')

        //CQL Library Editor
        cy.get(measureComposer.cqlLibraryEditor).click()

        helper.verifySpinnerAppearsAndDissappears()
        helper.verifySpinnerAppearsAndDissappears()

        cy.get(measureComposer.warningMessage).should('contain.text', 'You are viewing CQL with no validation errors.')

        cy.get(measureComposer.cqlLibraryEditorInput).type("{uparrow}{uparrow}{uparrow}{uparrow}{uparrow}{uparrow}{uparrow}{uparrow}{uparrow}codesystem \"LOINC\": 'http://loinc.org' version '2.67'{enter}")
        cy.get(measureComposer.cqlLibraryEditorInput).type("{uparrow}{uparrow}{uparrow}{uparrow}{uparrow}{uparrow}{uparrow}{uparrow}code \"Birth date\": '21112-8' from \"LOINC\" display 'Birth date'{enter}")
        cy.get(measureComposer.cqlLibraryEditorInput).type("{uparrow}{uparrow}{uparrow}{uparrow}{uparrow}{uparrow}{uparrow}valueset \"AAN - Encounter Codes Grouping\": 'http://cts.nlm.nih.gov/fhir/ValueSet/2.16.840.1.113883.3.2286'")

        cy.get(measureComposer.cqlEditorSaveBtn).click()

        cy.get(measureComposer.warningMessage).should('contain.text', 'The CQL file was saved with errors. Please correct the syntax errors so the CQL can be validated.')

        cy.get(measurelibrary.measureLibraryTab).click()

        helper.verifySpinnerAppearsAndDissappears()
    })
})

describe('MAT: MeasureComposer: CQLWorkspace: CQL Library Editor: FHIR Errors, ability to save FHIR Measures with errors ' +
  'and correct Error Messages are displayed', () => {
    before('Login', () => {
        oktaLogin.login()

        fhirMeasure = dataCreation.createQDMProportionMeasure()

        helper.enabledWithTimeout(measurelibrary.searchInputBox)
        helper.enterText(measurelibrary.searchInputBox, fhirMeasure)
        cy.get(measurelibrary.searchBtn).click()

        helper.verifySpinnerAppearsAndDissappears()
        helper.visibleWithTimeout(measurelibrary.row1MeasureSearch)

        gridRowActions.selectRow(measurelibrary.row1MeasureSearch)

        cy.get(measurelibrary.createVersionMeasureSearchBtn).click()

        cy.get(measurelibrary.majorVersionTypeRadio).click()
        cy.get(measurelibrary.packageAndVersion).click()

        helper.verifySpinnerAppearsAndDissappears()

        helper.visibleWithTimeout(measurelibrary.row1RecentActivity)
        helper.verifySpinnerAppearsAndDissappears()
        gridRowActions.selectRow(measurelibrary.row1RecentActivity)
        cy.get(measurelibrary.convertToFhirRecentActivityBtn).click()

        helper.verifySpinnerAppearsAndDissappears()
        helper.verifySpinnerAppearsAndDissappears()

        helper.visibleWithTimeout(measurelibrary.row1RecentActivity)

        cy.get(measurelibrary.row1RecentActivity).should('contain.text', 'FHIR / CQL')

    })
    beforeEach('Preserve Cookies', () => {
        helper.preserveCookies()
    })
    after('Log Out', () => {
        helper.logout()
    })

    it('Ability to save with CQL error or syntax error', () => {

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(measurelibrary.row1RecentActivity).dblclick()

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(measureComposer.cqlWorkspace).click()

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(measureComposer.cqlLibraryEditor).click()

        helper.visibleWithTimeout(measureComposer.warningMessage)
        cy.get(measureComposer.warningMessage).should('contain.text', ' You are viewing the CQL file with validation errors. ' +
          'Errors are marked with a red square on the line number.')

        cy.get(measureComposer.cqlEditorSaveBtn).click()

        helper.verifySpinnerAppearsAndDissappears()

        //assertion for being able to save with CQL errors
        helper.visibleWithTimeout(measureComposer.warningMessage)
        cy.get(measureComposer.warningMessage).should('contain.text', ' The CQL file was saved with errors.')

        cy.get(measureComposer.definition).click()

        helper.waitToContainText(measureComposer.cqlWorkspaceTitleGlobal2,'Definition')

        dataCreation.addDefinition('syntax errors', 'asdfasdf\n' +
          'asdfasdf\n' +
          '\n' +
          'asdfasdf')

        cy.get(measureComposer.cqlLibraryEditor).click()

        helper.verifySpinnerAppearsAndDissappears()
        helper.verifySpinnerAppearsAndDissappears()

        //checking message when loading the CQL editor with syntax error
        helper.visibleWithTimeout(measureComposer.warningMessage)
        // cy.get(measureComposer.warningMessage).eq(0).should('contain.text', ' You are viewing the CQL file with validation errors. Errors are marked with a red square on the line number.')
        // cy.get(measureComposer.warningMessage).eq(1).should('contain.text', ' Please correct the syntax errors so the CQL can be validated.')

        cy.get(measureComposer.warningMessage).should('contain.text', ' You are viewing the CQL file with validation errors. Errors are marked with a red square on the line number. Please correct the syntax errors so the CQL can be validated.')

        cy.get(measureComposer.cqlEditorSaveBtn).click()

        helper.verifySpinnerAppearsAndDissappears()

        //assertion for being able to save with syntax error
        helper.visibleWithTimeout(measureComposer.warningMessage)
        // cy.get(measureComposer.warningMessage).eq(0).should('contain.text', ' The CQL file was saved with errors.')
        // cy.get(measureComposer.warningMessage).eq(1).should('contain.text', ' Please correct the syntax errors so the CQL can be validated.')

        cy.get(measureComposer.warningMessage).should('contain.text', ' The CQL file was saved with errors. Please correct the syntax errors so the CQL can be validated.')

        cy.get(measurelibrary.measureLibraryTab).click()

        helper.verifySpinnerAppearsAndDissappears()

    })
})