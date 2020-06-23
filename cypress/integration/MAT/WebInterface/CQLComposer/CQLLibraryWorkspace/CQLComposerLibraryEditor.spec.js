import * as helper from "../../../../../support/helpers";
import * as oktaLogin from "../../../../../support/oktaLogin";
import * as measurelibrary from "../../../../../pom/MAT/WI/MeasureLibrary";
import * as cqlLibrary from "../../../../../pom/MAT/WI/CqlLibrary";
import * as cqlComposer from "../../../../../pom/MAT/WI/CQLComposer";

let qdmCqlLibrary = ''
let fhirCqlLibrary = ''

describe('CQL Composer: CQL Editor message', () => {
    before('Login', () => {
        oktaLogin.login()


        qdmCqlLibrary = helper.createDraftCqlLibrary('qdmCqlLibrary', 'QDM')
        fhirCqlLibrary = helper.createDraftCqlLibrary('FhirCqlLibrary', 'FHIR')

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

        cy.wait(2000);

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

        cy.wait(2000);

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

        cy.wait(2000);

        cy.get(cqlComposer.cqlLibraryEditor).click();
        helper.verifySpinnerAppearsAndDissappears()

        cy.get(cqlComposer.warningMessage).should('contain.text', 'You are viewing the CQL file with validation errors. Errors are marked with a red square on the line number.');

        cy.wait(2000);

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

        cy.wait(2000);

        cy.get(cqlComposer.cqlLibraryEditor).click();
        helper.verifySpinnerAppearsAndDissappears()

        cy.get(cqlComposer.warningMessage).should('contain.text', 'You are viewing the CQL file with validation errors. Errors are marked with a red square on the line number.');

        cy.wait(2000);

        cy.get(measurelibrary.cqlLibraryTab).click()

        helper.verifySpinnerAppearsAndDissappears()

    })

})

describe('FHIR Library: Add code directly on CQL Library Editor', () => {
    before('Login', () => {
        oktaLogin.login()

        fhirCqlLibrary = helper.createDraftCqlLibrary('FhirCqlLibrary', 'FHIR')

        helper.verifySpinnerAppearsAndDissappears()
    })
    beforeEach('Preserve Cookies', () => {
        helper.preserveCookies()
    })
    after('Log Out', () => {
        helper.logout()
    })


    it('FHIR Library: Validate the warning message when editing directly on CQL Library Editor', () => {

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

        helper.addValueSet('2.16.840.1.113883.3.666.5.307')

        //CQL Library Editor

        cy.get(cqlComposer.cqlLibraryEditor).click()

        cy.get(cqlComposer.warningMessage).should('contain.text', 'You are viewing CQL with no validation errors.');

        cy.get(cqlComposer.cqlLibraryEditorBox).type("{downarrow}{downarrow}{downarrow}valueset \"Annual Wellness Visit\": 'http://cts.nlm.nih.gov/fhir/ValueSet/2.16.840.1.113883.3.526.3.1240'")

        cy.get(cqlComposer.cqlEditorSaveBtn).click()

        cy.get(cqlComposer.warningMessage).should('contain.text', 'Changes made to the CQL library declaration and model declaration can not be saved through the CQL Library Editor. Please make those changes in the appropriate areas of the CQL Workspace.')
    
        cy.get(measurelibrary.cqlLibraryTab).click()

        helper.verifySpinnerAppearsAndDissappears()
    })

}) 
