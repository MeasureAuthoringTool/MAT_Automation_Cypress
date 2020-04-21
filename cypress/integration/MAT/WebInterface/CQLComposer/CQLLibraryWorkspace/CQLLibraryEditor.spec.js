import * as helper from "../../../../../support/helpers";
import * as measurelibrary from "../../../../../pom/MAT/WI/MeasureLibrary";
import * as cqlLibrary from "../../../../../pom/MAT/WI/CqlLibrary";
import * as cqlComposer from "../../../../../pom/MAT/WI/CQLComposer";

let qdmCqlLibrary = ''
let fhirCqlLibrary = ''

describe('CQL Composer: CQL Editor message', () => {
    before('Login', () => {
        helper.loginGeneric()

        qdmCqlLibrary = helper.createDraftCqlLibrary('qdmCqlLibrary', 'QDM')
        fhirCqlLibrary = helper.createDraftCqlLibrary('fhirCqlLibrary', 'FHIR')
    })
    beforeEach('Preserve Cookies', () => {
        helper.preserveCookies()
    })
    after('Log Out', () => {
        helper.logout()
    })

    it('QDM measure: Validate the success message on CQL Library Editor', () => {

        helper.enterText(cqlLibrary.searchInputBox, qdmCqlLibrary)
        cy.get(cqlLibrary.searchBtn).click();

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(cqlLibrary.row1CqlLibrarySearch).dblclick();

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(cqlComposer.cqlLibraryEditor).click();

        cy.get('h4').should('contain.text', 'CQL Library Workspace > CQL Library Editor');

        cy.get(cqlComposer.warningMessage).should('contain.text', 'You are viewing CQL with no validation errors.');
        // cy.get(cqlComposer.generalInformation).click();

        cy.wait(2000);

        cy.get(measurelibrary.cqlLibraryTab).click()

        helper.verifySpinnerAppearsAndDissappears()

    })

    it('FHIR measure: Validate the success message on CQL Library Editor', () => {

        helper.enterText(cqlLibrary.searchInputBox, fhirCqlLibrary)
        cy.get(cqlLibrary.searchBtn).click();

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(cqlLibrary.row1CqlLibrarySearch).dblclick();

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(cqlComposer.cqlLibraryEditor).click();

        cy.get(cqlComposer.warningMessage).should('contain.text', 'You are viewing CQL with no validation errors.');
        // cy.get(cqlComposer.generalInformation).click();

        cy.wait(2000);

        cy.get(measurelibrary.cqlLibraryTab).click()

        helper.verifySpinnerAppearsAndDissappears()

    })

    it('QDM measure: Validate the error message on CQL Library Editor', () => {

        helper.enterText(cqlLibrary.searchInputBox, qdmCqlLibrary)
        cy.get(cqlLibrary.searchBtn).click();

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(cqlLibrary.row1CqlLibrarySearch).dblclick();

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(cqlComposer.functionCQLComposer).click();

        cy.get(cqlComposer.functionNameInput).type('FunctionName');
        cy.get(cqlComposer.functionCQLExpressionEditorInput).type('fhlsdfi');
        cy.get(cqlComposer.functionSaveBtn).click();

        cy.wait(2000);

        cy.get(cqlComposer.cqlLibraryEditor).click();
        helper.verifySpinnerAppearsAndDissappears()

        cy.get(cqlComposer.warningMessage).should('contain.text', 'You are viewing the CQL file with validation errors. Errors are marked with a red square on the line number.');

        cy.wait(2000);

        cy.get(measurelibrary.cqlLibraryTab).click()

        helper.verifySpinnerAppearsAndDissappears()

    })

    it('FHIR measure: Validate the error message on CQL Library Editor', () => {

        helper.enterText(cqlLibrary.searchInputBox, fhirCqlLibrary)
        cy.get(cqlLibrary.searchBtn).click();

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(cqlLibrary.row1CqlLibrarySearch).dblclick();

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(cqlComposer.functionCQLComposer).click();

        cy.get(cqlComposer.functionNameInput).type('FunctionNameFHIR');
        cy.get(cqlComposer.functionCQLExpressionEditorInput).type('fhlsdfi');
        cy.get(cqlComposer.functionSaveBtn).click();

        cy.wait(2000);

        cy.get(cqlComposer.cqlLibraryEditor).click();
        helper.verifySpinnerAppearsAndDissappears()

        cy.get(cqlComposer.warningMessage).should('contain.text', 'You are viewing the CQL file with validation errors. Errors are marked with a red square on the line number.');

        cy.wait(2000);

        cy.get(measurelibrary.cqlLibraryTab).click()

        helper.verifySpinnerAppearsAndDissappears()

    })

})