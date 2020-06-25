import * as helper from "../../../../../support/helpers";
import * as measurelibrary from "../../../../../pom/MAT/WI/MeasureLibrary";
import * as measureComposer from "../../../../../pom/MAT/WI/MeasureComposer";
import * as oktaLogin from "../../../../../support/oktaLogin";
import * as dataCreation from "../../../../../support/MAT/MeasureAndCQLLibraryCreation";

let fhirMeasure = ''
let qdmMeasure = ''

describe('Measure Packager: Validate before packaging a FHIR measure', () => {
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

    it('QDM Measure: Validate error message on measure packager page', () => {

        helper.enabledWithTimeout(measurelibrary.searchInputBox)
        helper.enterText(measurelibrary.searchInputBox, qdmMeasure)
        cy.get(measurelibrary.searchBtn).click()

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(measurelibrary.row1MeasureSearch).dblclick()

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(measureComposer.cqlWorkspace).click()

        helper.verifySpinnerAppearsAndDissappears()

        // Function
        cy.get(measureComposer.functionMeasureComposer).click()
        helper.waitToContainText(measureComposer.cqlWorkspaceTitleGlobal2, 'Function')
        cy.get(measureComposer.functionNameInput).type('TestForValidationError', { delay: 50 })
        cy.get(measureComposer.functionCQLExpressionEditorInput).type('dfgfkj', { delay: 50 })
        cy.pause()
        cy.get(measureComposer.functionSaveBtn).click()
cy.pause()
        helper.verifySpinnerAppearsAndDissappears()

        // Measure Packager 
        cy.get(measureComposer.measurePackager).click()
        helper.verifySpinnerAppearsAndDissappears()
        cy.get(measureComposer.packageWarningMessage).should('contain.text', 'Your CQL file contains validation errors. Errors must be corrected before proceeding to measure packaging. Please return to the CQL Workspace to make corrections.');

        cy.get(measurelibrary.measureLibraryTab).click()

        helper.verifySpinnerAppearsAndDissappears()

    })

    it('FHIR Measure: Validate error message on measure packager page', () => {

        helper.enterText(measurelibrary.searchInputBox, fhirMeasure)
        cy.get(measurelibrary.searchBtn).click();

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(measurelibrary.row1MeasureSearch).dblclick();

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(measureComposer.cqlWorkspace).click();

        helper.verifySpinnerAppearsAndDissappears()

        // Function
        cy.get(measureComposer.functionMeasureComposer).click();
        helper.waitToContainText(measureComposer.cqlWorkspaceTitleGlobal2, 'Function')
        cy.get(measureComposer.functionNameInput).type('TestForValidationError', { delay: 50 });
        cy.get(measureComposer.functionCQLExpressionEditorInput).type('{downarrow}dfgfkj', { delay: 50 });
        cy.get(measureComposer.functionSaveBtn).click();

        helper.verifySpinnerAppearsAndDissappears()

        // Measure Packager 
        cy.get(measureComposer.measurePackager).click();
        helper.verifySpinnerAppearsAndDissappears()
        cy.get(measureComposer.packageWarningMessage).should('contain.text', 'Your CQL file contains validation errors. Errors must be corrected before proceeding to measure packaging. Please return to the CQL Workspace to make corrections.');

    })

})
