import * as helper from "../../../../../support/helpers";
import * as oktaLogin from "../../../../../support/oktaLogin";
import * as measurelibrary from "../../../../../pom/MAT/WI/MeasureLibrary";
import * as cqlLibrary from "../../../../../pom/MAT/WI/CqlLibrary";
import * as cqlComposer from "../../../../../pom/MAT/WI/CQLComposer";
import * as dataCreation from "../../../../../support/MAT/MeasureAndCQLLibraryCreation";

let qdmCqlLibrary = ''
let fhirCqlLibrary = ''

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

