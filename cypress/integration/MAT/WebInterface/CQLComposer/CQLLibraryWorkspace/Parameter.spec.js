import * as helper from "../../../../../support/helpers";
import * as measurelibrary from "../../../../../pom/MAT/WI/MeasureLibrary";
import * as cqlLibrary from "../../../../../pom/MAT/WI/CqlLibrary";
import * as matheader from "../../../../../pom/MAT/WI/MATheader";
import * as cqlComposer from "../../../../../pom/MAT/WI/CQLComposer";

let fhircqlLibrary = ''
let qdmcqlLibrary = ''

describe('CQL Composer: CQL Library Workspace: Parameter', () => {
    before('Login', () => {
        helper.loginGeneric()

        cy.get(measurelibrary.cqlLibraryTab).click()

        helper.visibleWithTimeout(matheader.progressbar)
        helper.notVisibleWithTimeout(matheader.progressbar)

        qdmcqlLibrary = helper.createDraftCqlLibrary('qdmDraftMeasure','QDM')
        fhircqlLibrary = helper.createDraftCqlLibrary('fhirDraftMeasure','FHIR')

    })
    beforeEach('Preserve Cookies', () => {
        helper.preserveCookies()
    })
    after('Log Out', () => {
        helper.logout()
    })
    it('QDM: Verify errors are coming from correct source', () => {

        helper.enterText(cqlLibrary.searchInputBox, 'qdmDraftMeasure1583163665948')
        cy.get(cqlLibrary.searchBtn).click()

        helper.visibleWithTimeout(matheader.progressbar)
        helper.notVisibleWithTimeout(matheader.progressbar)

        cy.get(cqlLibrary.row1CqlLibrarySearch).dblclick()

        helper.visibleWithTimeout(matheader.progressbar)
        helper.notVisibleWithTimeout(matheader.progressbar)

        cy.get(cqlComposer.parameter).click()

        helper.waitToContainText(cqlComposer.cqlWorkspaceTitleGlobal2,'Parameter')

        cy.get(cqlComposer.parameterListbox).select('Measurement Period')
        cy.get(cqlComposer.parameterListbox).contains('Measurement Period').dblclick()

        cy.get(cqlComposer.parameterEraseBtn).click()
        cy.get(cqlComposer.parameterCQLExpressionEditorInput).type('Interval<DateTime>Test', { delay: 50 })
        cy.get(cqlComposer.parameterSaveBtn).click()

        helper.visibleWithTimeout(matheader.progressbar)
        helper.notVisibleWithTimeout(matheader.progressbar)

        helper.visibleWithTimeout(cqlComposer.warningMessage)

        //This error is specific to QDM and confirms we are getting errors from QDM source
        cy.get(cqlComposer.editorLeftPanel).click()
        cy.get(cqlComposer.editorErrorToolTip).should('have.text','ERROR:Syntax error at Test' )

        cy.get(measurelibrary.cqlLibraryTab).click()

        helper.visibleWithTimeout(matheader.progressbar)
        helper.notVisibleWithTimeout(matheader.progressbar)

    })
    it('FHIR: Verify errors are coming from correct source', () => {

        helper.enterText(cqlLibrary.searchInputBox, fhircqlLibrary)
        cy.get(cqlLibrary.searchBtn).click()

        helper.visibleWithTimeout(matheader.progressbar)
        helper.notVisibleWithTimeout(matheader.progressbar)

        cy.get(cqlLibrary.row1CqlLibrarySearch).dblclick()

        helper.visibleWithTimeout(matheader.progressbar)
        helper.notVisibleWithTimeout(matheader.progressbar)

        cy.get(cqlComposer.parameter).click()

        helper.waitToContainText(cqlComposer.cqlWorkspaceTitleGlobal2,'Parameter')

        cy.get(cqlComposer.parameterListbox).select('Measurement Period')
        cy.get(cqlComposer.parameterListbox).contains('Measurement Period').dblclick()

        cy.get(cqlComposer.parameterEraseBtn).click()
        cy.get(cqlComposer.parameterCQLExpressionEditorInput).type('Interval<DateTime>Test', { delay: 50 })
        cy.get(cqlComposer.parameterSaveBtn).click()

        helper.visibleWithTimeout(matheader.progressbar)
        helper.notVisibleWithTimeout(matheader.progressbar)

        helper.visibleWithTimeout(cqlComposer.warningMessage)

        //This error is specific to FHIR and confirms we are getting errors from FHIR source
        cy.get(cqlComposer.editorLeftPanel).click()
        cy.get(cqlComposer.editorErrorToolTip)
            .should('have.text','ERROR:extraneous input \'Test\' expecting {<EOF>, \'public\', \'private\', \'parameter\', \'define\', \'context\'}' )

        cy.get(measurelibrary.cqlLibraryTab).click()

        helper.visibleWithTimeout(matheader.progressbar)
        helper.notVisibleWithTimeout(matheader.progressbar)

    })

})