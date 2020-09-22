import * as helper from '../../../../../support/helpers';
import * as oktaLogin from '../../../../../support/oktaLogin';
import * as cqlLibrary from '../../../../../pom/MAT/WI/CqlLibrary';
import * as measureLibrary from "../../../../../pom/MAT/WI/MeasureLibrary";
import * as dataCreation from "../../../../../support/MAT/MeasureAndCQLLibraryCreation";

let libraryName = ''

describe('CQL Library: FHIR Library Conversion: Successfull Conversion to FHIR', () => {
    before('Login', () => {
        oktaLogin.login()

        libraryName = dataCreation.createDraftCqlLibrary('qdmCqlLibrary', 'QDM')
    })
    beforeEach('Preserve Cookies', () => {
        helper.preserveCookies()
    })
    after('Log Out', () => {
        helper.logout()
    })

    it('Convert QDM CQL Library to FHIR successfully, verify CQL Library history', () => {

        helper.enabledWithTimeout(cqlLibrary.searchInputBox)
        helper.enterText(cqlLibrary.searchInputBox, libraryName)
        cy.get(cqlLibrary.searchBtn).click();

        helper.verifySpinnerAppearsAndDissappears()

        helper.visibleWithTimeout(cqlLibrary.row1CqlLibrarySearch)

        //assert model version for QDM Library
        cy.get(cqlLibrary.cqlLibrarySearchTable).should('contain.text', 'Model Version')
        cy.get(cqlLibrary.row1CqlLibraryModelVersion).should('contain.text', '5.5')

        cy.get(cqlLibrary.row1CqlLibrarySearch).click();

        cy.get(cqlLibrary.createVersionCqllibrariesBtn).click();
        cy.get(cqlLibrary.majorVersionTypeRadio).click();
        cy.get(cqlLibrary.versionSaveAndContinueBtn).click();

        helper.verifySpinnerAppearsAndDissappears()

        helper.visibleWithTimeout(cqlLibrary.row1CqlLibrarySearch)
        cy.get(cqlLibrary.row1CqlLibrarySearch).click();
        cy.get(cqlLibrary.convertToFhirLibrarySearchBtn).click();

        helper.verifySpinnerAppearsAndDissappears()
        helper.verifySpinnerAppearsAndDissappears()
        helper.verifySpinnerAppearsAndDissappears()

        helper.visibleWithTimeout(cqlLibrary.row1CqlLibrarySearch)

         //assert model version for FHIR Library
         cy.get(cqlLibrary.cqlLibrarySearchTable).should('contain.text', 'Model Version')
         cy.get(cqlLibrary.row1CqlLibraryModelVersion).should('contain.text', '4.0.1')

        cy.get(cqlLibrary.row1CqlLibrarySearch).should('contain.text', 'FHIR / CQL')
        helper.visibleWithTimeout(cqlLibrary.row1CqlLibrarySearch)
        cy.get(cqlLibrary.row1CqlLibrarySearch).dblclick();

        helper.verifySpinnerAppearsAndDissappears()

        cy.get('h1').should('contain.text', libraryName + ' Draft v1.0.000 (FHIR / CQL)')
        
        cy.get(measureLibrary.cqlLibraryTab).click()

        helper.verifySpinnerAppearsAndDissappears()

        helper.visibleWithTimeout(cqlLibrary.row1CqlLibrarySearch)
        cy.get(cqlLibrary.row1CqlLibrarySearch).click()

        cy.get(cqlLibrary.historyCqllibrariesBtn).click()

        //verifying the log entries
        helper.visibleWithTimeout(cqlLibrary.historyConvertToFHIRUserActionLogEntry)
        helper.visibleWithTimeout(cqlLibrary.historyCQLLibraryCreatedUserActionLogEntry)

        cy.get(cqlLibrary.returnToCqlLibrary).click()

        helper.verifySpinnerAppearsAndDissappears()

    })

})