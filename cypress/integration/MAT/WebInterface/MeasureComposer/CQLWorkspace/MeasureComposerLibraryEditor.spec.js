import * as helper from "../../../../../support/helpers";
import * as measurelibrary from "../../../../../pom/MAT/WI/MeasureLibrary";
import * as measureComposer from "../../../../../pom/MAT/WI/MeasureComposer";
import * as oktaLogin from "../../../../../support/oktaLogin";

let fhirMeasure = ''
let qdmMeasure = ''

// describe('Measure: CQL Editor message', () => {
//     before('Login', () => {
//         oktaLogin.login()

//         qdmMeasure = helper.createDraftMeasure('qdmDraftMeasure', 'QDM')
//         fhirMeasure = helper.createDraftMeasure('fhirDraftMeasure', 'FHIR')

//     })
//     beforeEach('Preserve Cookies', () => {
//         helper.preserveCookies()
//     })
//     after('Log Out', () => {
//         helper.logout()
//     })

//     it('QDM Measure: Validate the error message on CQL Editor', () => {

//         helper.enterText(measurelibrary.searchInputBox, qdmMeasure)
//         cy.get(measurelibrary.searchBtn).click();

//         helper.verifySpinnerAppearsAndDissappears()

//         cy.get(measurelibrary.row1MeasureSearch).dblclick();

//         helper.verifySpinnerAppearsAndDissappears()

//         cy.get(measureComposer.cqlWorkspace).click();

//         helper.verifySpinnerAppearsAndDissappears()

//         cy.get(measureComposer.functionMeasureComposer).click();

//         cy.get(measureComposer.functionNameInput).type('FunctionNameQDM');
//         cy.get(measureComposer.functionCQLExpressionEditorInput).type('.fhlsdfi');
//         cy.get(measureComposer.functionSaveBtn).click();

//         cy.wait(2000);

//         cy.get(measureComposer.cqlLibraryEditor).click();
//         helper.verifySpinnerAppearsAndDissappears()

//         cy.get(measureComposer.warningMessage).should('contain.text', 'You are viewing the CQL file with validation errors. Errors are marked with a red square on the line number.');

//         cy.wait(2000);

//         cy.get(measurelibrary.measureLibraryTab).click()

//         helper.verifySpinnerAppearsAndDissappears()

//     })

//     it('FHIR Measure: Validate the error message on CQL Editor', () => {

//         helper.enterText(measurelibrary.searchInputBox, fhirMeasure)
//         cy.get(measurelibrary.searchBtn).click();

//         helper.verifySpinnerAppearsAndDissappears()

//         cy.get(measurelibrary.row1MeasureSearch).dblclick();

//         helper.verifySpinnerAppearsAndDissappears()

//         cy.get(measureComposer.cqlWorkspace).click();

//         helper.verifySpinnerAppearsAndDissappears()

//         cy.get(measureComposer.functionMeasureComposer).click();

//         cy.get(measureComposer.functionNameInput).type('FunctionNameFHIR');
//         cy.get(measureComposer.functionCQLExpressionEditorInput).type('.fhlsdfi');
//         cy.get(measureComposer.functionSaveBtn).click();

//         cy.wait(2000);

//         cy.get(measureComposer.cqlLibraryEditor).click();
//         helper.verifySpinnerAppearsAndDissappears()

//         cy.get(measureComposer.warningMessage).should('contain.text', 'You are viewing the CQL file with validation errors. Errors are marked with a red square on the line number.');

//         cy.wait(2000);

//         cy.get(measurelibrary.measureLibraryTab).click()

//         helper.verifySpinnerAppearsAndDissappears()

//     })
// })

describe('FHIR Measure: Version error message', () => {
    before('Login', () => {
        oktaLogin.login()

        fhirMeasure = helper.createDraftMeasure('fhirDraftMeasure', 'FHIR')

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

        cy.get(measurelibrary.row1MeasureSearch).dblclick();

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(measureComposer.cqlWorkspace).click();

        helper.verifySpinnerAppearsAndDissappears()

        // CQL Library Editor
        cy.get(measureComposer.cqlLibraryEditor).click();
        helper.verifySpinnerAppearsAndDissappears()
        cy.get(measureComposer.cqlLibraryEditorInput).type("{uparrow}{uparrow}{uparrow}{uparrow}{uparrow}include Hospice_FHIR4 version '1.0' called Hospice");
        cy.get(measureComposer.cqlEditorSaveBtn).click();

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(measureComposer.warningMessage).should('contain.text', "The MAT was unable to save the changes. Errors: Invalid version , 1.0, for lib Hospice_FHIR4. Must be in MAT version format, e.g. '1.0.000'.");

        cy.get(measurelibrary.measureLibraryTab).click();

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(measurelibrary.measureLibraryTab).click()

        helper.verifySpinnerAppearsAndDissappears()

    })

})

// describe('FHIR Measure: Add code directly on CQL Library Editor', () => {
//     before('Login', () => {
//         oktaLogin.login()

//         fhirMeasure = helper.createDraftMeasure('fhirDraftMeasure', 'FHIR')

//     })
//     beforeEach('Preserve Cookies', () => {
//         helper.preserveCookies()
//     })
//     after('Log Out', () => {
//         helper.logout()
//     })

//     it('FHIR Measure: Validate the warning message when editing directly on CQL Library Editor', () => {

//         helper.enterText(measurelibrary.searchInputBox, fhirMeasure)
//         cy.get(measurelibrary.searchBtn).click();

//         helper.verifySpinnerAppearsAndDissappears()

//         cy.get(measurelibrary.row1MeasureSearch).dblclick();

//         helper.verifySpinnerAppearsAndDissappears()

//         cy.get(measureComposer.cqlWorkspace).click();

//         helper.verifySpinnerAppearsAndDissappears()

//         //CQL Library Editor

//         cy.get(measureComposer.cqlLibraryEditor).click()

//         cy.get(measureComposer.warningMessage).should('contain.text', 'You are viewing CQL with no validation errors.');

//         helper.verifySpinnerAppearsAndDissappears()

//         cy.get(measureComposer.cqlLibraryEditorInput).type("{uparrow}{uparrow}{uparrow}{uparrow}{uparrow}{uparrow}{uparrow}{uparrow}{uparrow}valueset \"Annual Wellness Visit\": 'http://cts.nlm.nih.gov/fhir/ValueSet/2.16.840.1.113883.3.526.3.1240'")

//         cy.get(measureComposer.cqlEditorSaveBtn).click()

//         cy.get(measureComposer.warningMessage).should('contain.text', 'Changes made to the CQL library declaration and model declaration can not be saved through the CQL Library Editor. Please make those changes in the appropriate areas of the CQL Workspace.')

//         cy.get(measurelibrary.cqlLibraryTab).click()

//         helper.verifySpinnerAppearsAndDissappears()

//     })

// })