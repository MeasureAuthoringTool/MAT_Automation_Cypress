import * as helper from "../../../../../support/helpers";
import * as measurelibrary from "../../../../../pom/MAT/WI/MeasureLibrary";
import * as measureComposer from "../../../../../pom/MAT/WI/MeasureComposer";

let fhirMeasure = ''
let qdmMeasure = ''

describe('CQL Editor: Validate invalid version error message', () => {
    before('Login', () => {
        helper.loginGeneric()

        // qdmMeasure = helper.createDraftMeasure('qdmDraftMeasure', 'QDM')
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
        cy.get(measureComposer.cqlLibraryEditorInput).type("{downarrow}include Hospice_FHIR4 version '1.0' called Hospice");
        cy.get(measureComposer.cqlEditorSaveBtn).eq(1).click();

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(measureComposer.warningMessage).should('contain.text', "The MAT was unable to save the changes. Errors: Invalid version , 1.0, for lib Hospice_FHIR4. Must be in MAT version format, e.g. '1.0.000'.");

        cy.get(measurelibrary.measureLibraryTab).click();

        helper.verifySpinnerAppearsAndDissappears()

    })

})