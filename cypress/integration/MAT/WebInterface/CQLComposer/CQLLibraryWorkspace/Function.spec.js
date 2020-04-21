import * as helper from "../../../../../support/helpers";
import * as measurelibrary from "../../../../../pom/MAT/WI/MeasureLibrary";
import * as cqlLibrary from "../../../../../pom/MAT/WI/CqlLibrary";
import * as cqlComposer from "../../../../../pom/MAT/WI/CQLComposer";

let fhirLibrary = ''
let qdmLibrary = ''

describe('CQL Composer: CQL Library Workspace: Function', () => {
    before('Login', () => {
        helper.loginGeneric()

        cy.get(measurelibrary.cqlLibraryTab).click()

        helper.verifySpinnerAppearsAndDissappears()

        qdmLibrary = helper.createDraftCqlLibrary('qdmDraftLibrary','QDM')
        fhirLibrary = helper.createDraftCqlLibrary('fhirDraftLibrary','FHIR')
    })
    beforeEach('Preserve Cookies', () => {
        helper.preserveCookies()
    })
    after('Log Out', () => {
        helper.logout()
    })

    it('QDM Add Argument: Select QDM Datatype Object Data population', () => {

        helper.enterText(cqlLibrary.searchInputBox, qdmLibrary)
        cy.get(cqlLibrary.searchBtn).click()

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(cqlLibrary.row1CqlLibrarySearch).dblclick()

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(cqlComposer.functionCQLComposer).click()

        helper.waitToContainText(cqlComposer.cqlWorkspaceTitleGlobal2,'Function')

        cy.get(cqlComposer.addArgument).click()

        cy.get(cqlComposer.availableDatatypesListBox).select('QDM Datatype')

        //verifying a unique datatype and attribute based on model type QDM, this ensures the correct data has been populated
        cy.get(cqlComposer.datatypeObjectListBox).select('Assessment, Not Ordered')
            .should('have.value', 'Assessment, Not Ordered')

        cy.get(cqlComposer.closeBtn).click()
        cy.get(measurelibrary.cqlLibraryTab).click()
        cy.get(cqlComposer.yesBtn).click()

        helper.verifySpinnerAppearsAndDissappears()
    })

    it('FHIR Add Argument: Select FHIR Datatype Object Data population', () => {

        helper.enterText(cqlLibrary.searchInputBox, fhirLibrary)
        cy.get(cqlLibrary.searchBtn).click()

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(cqlLibrary.row1CqlLibrarySearch).dblclick()

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(cqlComposer.functionCQLComposer).click()

        helper.waitToContainText(cqlComposer.cqlWorkspaceTitleGlobal2,'Function')

        cy.get(cqlComposer.addArgument).click()

        cy.get(cqlComposer.availableDatatypesListBox).select('FHIR Datatype')

        //verifying a unique datatype and attribute based on model type QDM, this ensures the correct data has been populated
        cy.get(cqlComposer.datatypeObjectListBox).select('Condition')
            .should('have.value', 'Condition')

        cy.get(cqlComposer.closeBtn).click()
        cy.get(measurelibrary.cqlLibraryTab).click()
        cy.get(cqlComposer.yesBtn).click()

        helper.verifySpinnerAppearsAndDissappears()
    })
})