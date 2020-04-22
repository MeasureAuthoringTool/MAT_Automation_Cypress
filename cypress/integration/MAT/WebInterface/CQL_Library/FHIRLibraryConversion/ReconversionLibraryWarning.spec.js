import * as helper from '../../../../../support/helpers';
import * as matheader from "../../../../../pom/MAT/WI/MATheader";
import * as cqlLibrary from '../../../../../pom/MAT/WI/CqlLibrary';
import * as measureLibrary from "../../../../../pom/MAT/WI/MeasureLibrary";

let libraryName = ''

describe('CQL Library: Validate Scenario 3b Conversion to FHIR', () => {
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

    it('Scenario 3b: Reconverting QDM library: Warning message', () => {

        helper.enterText(cqlLibrary.searchInputBox, libraryName)
        cy.get(cqlLibrary.searchBtn).click();

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(cqlLibrary.row1CqlLibrarySearch).click();

        cy.get(cqlLibrary.createVersionCqllibrariesBtn).click();
        cy.get(cqlLibrary.majorVersionTypeRadio).click();
        cy.get(cqlLibrary.versionSaveAndContinueBtn).click();

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(cqlLibrary.row1CqlLibrarySearch).click();
        cy.get(cqlLibrary.convertToFhirLibrarySearchBtn).click();

        helper.verifySpinnerAppearsAndDissappears()
        cy.wait(3000)

        cy.get(cqlLibrary.row2CqlLibrarySearch).click();
        cy.get(cqlLibrary.convertToFhirLibrarySearchBtn).click();

        cy.get(cqlLibrary.fhirConversionWarningMessage).should('contain.text', 'Are you sure you want to convert this measure again? The existing FHIR measure will be overwritten.');
        cy.get(cqlLibrary.fhirConversionReturnBtn).click();

    })

})