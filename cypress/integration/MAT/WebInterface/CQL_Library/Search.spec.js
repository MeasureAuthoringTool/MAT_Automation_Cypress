import * as helper from '../../../../support/helpers'
import * as measurelibrary from '../../../../pom/MAT/WI/MeasureLibrary'
import * as matheader from "../../../../pom/MAT/WI/MATheader";
import * as cqlLibrary from '../../../../pom/MAT/WI/CqlLibrary'

let fhirCqlLibrary = ''
let qdmCqlLibrary = ''
let name = ''

describe('Filter', () => {
    before('Login', () => {

        helper.loginGeneric()

        cy.get(measurelibrary.cqlLibraryTab).click()

        helper.visibleWithTimeout(matheader.progressbar)
        helper.notVisibleWithTimeout(matheader.progressbar)

        name = '_' + Date.now()

        fhirCqlLibrary = helper.createDraftCqlLibrary(name+'fhir','fhir');
        qdmCqlLibrary = helper.createDraftCqlLibrary(name+'QDM','QDM')

    })
    beforeEach('Preserve Cookies', () => {
        helper.preserveCookies()
    })
    after('Log Out', () => {
        helper.logout()
    })
    it('QDM/CQL, FHIR/CQL or ALL', () => {

        helper.enterText(cqlLibrary.searchInputBox,name)
        cy.get(cqlLibrary.searchBtn).click()

        helper.visibleWithTimeout(matheader.progressbar)
        helper.notVisibleWithTimeout(matheader.progressbar)

        cy.get(cqlLibrary.row1CqlLibraryName).should('have.text', fhirCqlLibrary)
        cy.get(cqlLibrary.row2CqlLibraryName).should('have.text', qdmCqlLibrary)

        cy.get(cqlLibrary.row1Models).should('contain.text', 'FHIR / CQL')
        cy.get(cqlLibrary.row2Models).should('contain.text',  'QDM / CQL')

        cy.get(cqlLibrary.modelTypeListBox).select('Model Type: FHIR / CQL Only')
        cy.get(cqlLibrary.searchBtn).click()

        cy.get(cqlLibrary.row1CqlLibraryName).should('have.text', fhirCqlLibrary)
        cy.get(cqlLibrary.row1Models).should('contain.text', 'FHIR / CQL')
        helper.notExists(cqlLibrary.row2CqlLibrarySearch)

        cy.get(cqlLibrary.modelTypeListBox).select('Model Type: QDM / CQL Only')
        cy.get(cqlLibrary.searchBtn).click()

        cy.get(cqlLibrary.row1CqlLibraryName).should('have.text', qdmCqlLibrary)
        cy.get(cqlLibrary.row1Models).should('contain.text', 'QDM / CQL')
        helper.notExists(cqlLibrary.row2CqlLibrarySearch)

    })
})



