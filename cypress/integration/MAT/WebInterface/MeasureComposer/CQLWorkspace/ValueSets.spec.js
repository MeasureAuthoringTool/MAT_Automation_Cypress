import * as helper from "../../../../../support/helpers";
import * as measurelibrary from "../../../../../pom/MAT/WI/MeasureLibrary";
import * as measureComposer from "../../../../../pom/MAT/WI/MeasureComposer";

let fhirMeasure = ''

describe('CQL Editor: Validate the Valueset Format', () => {
    before('Login', () => {
        helper.loginGeneric()

        fhirMeasure = helper.createDraftMeasure('fhirDraftMeasure', 'FHIR')

    })
    beforeEach('Preserve Cookies', () => {
        helper.preserveCookies()
    })
    after('Log Out', () => {
        helper.logout()
    })

    it('FHIR Measure: Valueset Format', () => {

        helper.enterText(measurelibrary.searchInputBox, fhirMeasure)
        cy.get(measurelibrary.searchBtn).click();

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(measurelibrary.row1MeasureSearch).dblclick();

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(measureComposer.cqlWorkspace).click();

        helper.verifySpinnerAppearsAndDissappears()

        // Add OID on Value Sets
        cy.get(measureComposer.valueSets).click();
        helper.verifySpinnerAppearsAndDissappears()
        cy.get(measureComposer.OIDInput).type('2.16.840.1.113883.3.666.5.307');
        cy.get(measureComposer.retrieveOIDBtn).click();
        helper.verifySpinnerAppearsAndDissappears()
        cy.get(measureComposer.warningMessage).should('contain.text', 'Value set Encounter Inpatient successfully retrieved from VSAC.');
        cy.get(measureComposer.applyBtn).click();
        cy.get(measureComposer.warningMessage).should('contain.text', 'Value set Encounter Inpatient has been successfully applied.')

        // CQL Library Editor
        cy.get(measureComposer.cqlLibraryEditor).click();
        helper.verifySpinnerAppearsAndDissappears()
        cy.get(measureComposer.cqlLibraryEditorInput).should('contain.text', 'http://cts.nlm.nih.gov/fhir/ValueSet/2.16.840.1.113883.3.666.5.307');
    
        cy.get(measurelibrary.measureLibraryTab).click();

        helper.verifySpinnerAppearsAndDissappears()
    })
})