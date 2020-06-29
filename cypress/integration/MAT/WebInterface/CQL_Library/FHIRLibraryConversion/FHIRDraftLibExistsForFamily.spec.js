import * as helper from '../../../../../support/helpers';
import * as cqlLibrary from '../../../../../pom/MAT/WI/CqlLibrary';
import * as measureLibrary from "../../../../../pom/MAT/WI/MeasureLibrary";
import * as oktaLogin from '../../../../../support/oktaLogin';

let libraryName = ''

describe('CQL Library: Validate Scenario 2 Conversion to FHIR', () => {
    before('Login', () => {
        oktaLogin.login()

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

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(cqlLibrary.row1CqlLibrarySearch).click();

        cy.get(cqlLibrary.createVersionCqllibrariesBtn).click();
        cy.get(cqlLibrary.majorVersionTypeRadio).click();
        cy.get(cqlLibrary.versionSaveAndContinueBtn).click();

        helper.verifySpinnerAppearsAndDissappears()

        // Create First Draft library
        cy.get(cqlLibrary.row1CqlLibrarySearch).click();
        cy.get(cqlLibrary.createDraftCqllibrariesBtn).click();

        helper.verifySpinnerAppearsAndDissappears()

        cy.get('h1').should('contain.text', 'My CQL Library > Draft CQL Library');

        cy.get(cqlLibrary.draftSaveAndContinueBtn).click();
        cy.get(cqlLibrary.confirmationContinue).click();

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(measureLibrary.cqlLibraryTab).click();

        helper.verifySpinnerAppearsAndDissappears()

        // Versioning draft library
        cy.get(cqlLibrary.row1CqlLibrarySearch).click();
        cy.get(cqlLibrary.createVersionCqllibrariesBtn).click();
        cy.get(cqlLibrary.majorVersionTypeRadio).click();
        cy.get(cqlLibrary.versionSaveAndContinueBtn).click();

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(measureLibrary.cqlLibraryTab).click();

        helper.verifySpinnerAppearsAndDissappears()

        // Convert First library to FHIR
        cy.get(cqlLibrary.row1CqlLibrarySearch).click();
        cy.get(cqlLibrary.convertToFhirLibrarySearchBtn).click();

        helper.verifySpinnerAppearsAndDissappears()

        cy.wait(3000)

        // Convert Second library to FHIR
        cy.get(cqlLibrary.row3CqlLibrarySearch).click();
        cy.get(cqlLibrary.convertToFhirLibrarySearchBtn).click();

        // FHIR Warning Dialog
        cy.get(cqlLibrary.fhirConversionWarningMessage).should('contain.text', ' Are you sure you want to convert this Cql Library again? The existing FHIR Library will be overwritten.');
        cy.get(cqlLibrary.fhirConversionReturnBtn).click();

     })
})