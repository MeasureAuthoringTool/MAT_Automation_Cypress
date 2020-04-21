import * as helper from '../../../../../support/helpers';
import * as matheader from "../../../../../pom/MAT/WI/MATheader";
import * as cqlLibrary from '../../../../../pom/MAT/WI/CqlLibrary';
import * as measureLibrary from "../../../../../pom/MAT/WI/MeasureLibrary";

let libraryName = ''

describe('CQL Library: Validate Scenario 3a Successfull Conversion to FHIR', () => {
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

    it('Scenario 3a: ', () => {

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

        cy.get(cqlLibrary.row1CqlLibrarySearch).click();
        cy.get(cqlLibrary.convertToFhirLibraryBtn).click();

        cy.wait(4000)

        helper.notVisibleWithTimeout(matheader.spinner)

        cy.get(cqlLibrary.row1CqlLibrarySearch).should('contain.text', 'FHIR / CQL')
        cy.get(cqlLibrary.row1CqlLibrarySearch).dblclick();

        helper.notVisibleWithTimeout(matheader.spinner)

        cy.get('h1').should('contain.text', libraryName + ' Draft v1.0.000 (FHIR / CQL)')
        
        cy.get(measureLibrary.cqlLibraryTab).click();

        cy.wait(1000)

        helper.notVisibleWithTimeout(matheader.spinner)

    })

})