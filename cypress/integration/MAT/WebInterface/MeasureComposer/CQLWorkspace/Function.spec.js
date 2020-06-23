import * as helper from "../../../../../support/helpers";
import * as measurelibrary from "../../../../../pom/MAT/WI/MeasureLibrary";
import * as measureComposer from "../../../../../pom/MAT/WI/MeasureComposer";
import * as oktaLogin from "../../../../../support/oktaLogin";

let fhirMeasure = ''
let qdmMeasure = ''

describe('Measure Composer: CQL Workspace: Function', () => {
    before('Login', () => {
        oktaLogin.login()

        qdmMeasure = helper.createDraftMeasure('qdmDraftMeasure','QDM')
        fhirMeasure = helper.createDraftMeasure('FhirDraftMeasure','FHIR')
    })
    beforeEach('Preserve Cookies', () => {
        helper.preserveCookies()
    })
    after('Log Out', () => {
        helper.logout()
    })

    it('QDM Add Argument: Select QDM Datatype Object Data population', () => {

        helper.enterText(measurelibrary.searchInputBox, qdmMeasure)
        cy.get(measurelibrary.searchBtn).click()

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(measurelibrary.row1MeasureSearch).dblclick()

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(measureComposer.cqlWorkspace).click()

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(measureComposer.functionMeasureComposer).click()

        helper.waitToContainText(measureComposer.cqlWorkspaceTitleGlobal2,'Function')

        cy.get(measureComposer.addArgument).click()

        cy.get(measureComposer.availableDatatypesListBox).select('QDM Datatype')

        //verifying a unique datatype and attribute based on model type QDM, this ensures the correct data has been populated
        cy.get(measureComposer.datatypeObjectListBox).select('Assessment, Not Ordered')
            .should('have.value', 'Assessment, Not Ordered')

        cy.get(measureComposer.closeBtn).click()
        cy.get(measurelibrary.measureLibraryTab).click()
        cy.get(measureComposer.yesBtn).click()

        helper.verifySpinnerAppearsAndDissappears()
    })

    it('FHIR Add Argument: Select FHIR Datatype Object Data population', () => {

        helper.enterText(measurelibrary.searchInputBox, fhirMeasure)
        cy.get(measurelibrary.searchBtn).click()

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(measurelibrary.row1MeasureSearch).dblclick()

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(measureComposer.cqlWorkspace).click()

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(measureComposer.functionMeasureComposer).click()

        helper.waitToContainText(measureComposer.cqlWorkspaceTitleGlobal2,'Function')

        cy.get(measureComposer.addArgument).click()

        cy.get(measureComposer.availableDatatypesListBox).select('FHIR Datatype')

        //verifying a unique datatype and attribute based on model type FHIR, this ensures the correct data has been populated
        cy.get(measureComposer.datatypeObjectListBox).select('Condition')
            .should('have.value', 'Condition')

        cy.get(measureComposer.closeBtn).click()
        cy.get(measurelibrary.measureLibraryTab).click()
        cy.get(measureComposer.yesBtn).click()

        helper.verifySpinnerAppearsAndDissappears()
    })
})