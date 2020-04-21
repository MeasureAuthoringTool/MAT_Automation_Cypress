import * as helper from '../../../../../support/helpers';
import * as matheader from "../../../../../pom/MAT/WI/MATheader";
import * as cqlLibrary from '../../../../../pom/MAT/WI/CqlLibrary';
import * as measureLibrary from "../../../../../pom/MAT/WI/MeasureLibrary";

let libraryName = ''

describe('CQL Library: Validate Scenario 2 Conversion to FHIR', () => {
    before('Login', () => {
        helper.loginGeneric()

        libraryName = helper.createDraftCqlLibrary('qdmCqlLibrary', 'QDM')
    })
    beforeEach('Preserve Cookies', () => {
        helper.preserveCookies()
    })
    after('Log Out', () => {
        helper.logout()
    })

    it('Scenario 2: FHIR/CQL draft Library exists for that family', () => {

        // Versioning First library
        helper.enterText(cqlLibrary.searchInputBox, libraryName)
        cy.get(cqlLibrary.searchBtn).click();

        cy.wait(1000)

        helper.notVisibleWithTimeout(matheader.spinner)

        cy.get(cqlLibrary.row1CqlLibrarySearch).click();

        cy.get(cqlLibrary.createVersionDraftCqllibrariesBtn).click();
        cy.get(cqlLibrary.majorVersionTypeRadio).click();
        cy.get(cqlLibrary.saveAndContinueVersionBtn).click();

        cy.wait(1000)

        helper.notVisibleWithTimeout(matheader.spinner)

        // Create First Draft library
        cy.get(cqlLibrary.row1CqlLibrarySearch).click();
        cy.get(cqlLibrary.createDraftCqllibrariesBtn).click();

        helper.notVisibleWithTimeout(matheader.spinner)

        cy.get('h1').should('contain.text', 'My CQL Library > Draft CQL Library');

        cy.get(cqlLibrary.saveAndContinueDraftBtn).click();
        cy.get(cqlLibrary.confirmationContinue).click();

        helper.notVisibleWithTimeout(matheader.spinner)

        cy.get(measureLibrary.cqlLibraryTab).click();

        cy.wait(1000)

        helper.notVisibleWithTimeout(matheader.spinner)

        // Versioning draft library
        cy.get(cqlLibrary.row1CqlLibrarySearch).click();
        cy.get(cqlLibrary.createVersionDraftCqllibrariesBtn).click();
        cy.get(cqlLibrary.majorVersionTypeRadio).click();
        cy.get(cqlLibrary.saveAndContinueVersionBtn).click();

        helper.notVisibleWithTimeout(matheader.spinner)

        cy.get(measureLibrary.cqlLibraryTab).click();

        cy.wait(1000)

        helper.notVisibleWithTimeout(matheader.spinner)

        // Convert First library to FHIR
        cy.get(cqlLibrary.row1CqlLibrarySearch).click();
        cy.get(cqlLibrary.convertToFhirLibraryBtn).click();

        cy.wait(4000)

        helper.notVisibleWithTimeout(matheader.spinner)

        // Convert Second library to FHIR
        cy.get(cqlLibrary.row3CqlLibrarySearch).click();
        cy.get(cqlLibrary.convertToFhirLibraryBtn).click();

        // FHIR Warning Dialog
        cy.get(cqlLibrary.fhirConversionWarningMessage).should('contain.text', ' Are you sure you want to convert this Cql Library again? The existing FHIR Library will be overwritten.');
        cy.get(cqlLibrary.fhirConversionReturnBtn).click();

    })

})