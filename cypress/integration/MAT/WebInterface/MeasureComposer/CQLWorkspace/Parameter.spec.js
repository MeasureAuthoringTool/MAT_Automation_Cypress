import * as helper from "../../../../../support/helpers";
import * as measurelibrary from "../../../../../pom/MAT/WI/MeasureLibrary";
import * as matheader from "../../../../../pom/MAT/WI/MATheader";
import * as measureComposer from "../../../../../pom/MAT/WI/MeasureComposer";

let fhirMeasure = ''
let qdmMeasure = ''

describe('Measure Composer: CQL Workspace: Parameter', () => {
    before('Login', () => {
        helper.loginGeneric()

        qdmMeasure = helper.createDraftMeasure('qdmDraftMeasure','QDM')
        fhirMeasure = helper.createDraftMeasure('fhirDraftMeasure','FHIR')

    })
    beforeEach('Preserve Cookies', () => {
        helper.preserveCookies()
    })
    after('Log Out', () => {
        helper.logout()
    })
    it('QDM: Verify errors are coming from correct source', () => {

        helper.enterText(measurelibrary.searchInputBox, qdmMeasure)
        cy.get(measurelibrary.searchBtn).click()

        helper.visibleWithTimeout(matheader.progressbar)
        helper.notVisibleWithTimeout(matheader.progressbar)

        cy.get(measurelibrary.row1MeasureSearch).dblclick()

        helper.visibleWithTimeout(matheader.progressbar)
        helper.notVisibleWithTimeout(matheader.progressbar)

        cy.get(measureComposer.cqlWorkspace).click()

        helper.visibleWithTimeout(matheader.progressbar)
        helper.notVisibleWithTimeout(matheader.progressbar)

        cy.get(measureComposer.parameter).click()

        helper.waitToContainText(measureComposer.cqlWorkspaceTitleGlobal2,'Parameter')

        cy.get(measureComposer.parameterListbox).select('Measurement Period')
        cy.get('body').type('{enter}')

        cy.get(measureComposer.parameterEraseBtn).click()
        cy.get(measureComposer.parameterCQLExpressionEditorInput).type('sdffgsdffgsdfg', { delay: 50 })
        cy.get(measureComposer.parameterSaveBtn).click()

        helper.visibleWithTimeout(matheader.progressbar)
        helper.notVisibleWithTimeout(matheader.progressbar)

        helper.visibleWithTimeout(measureComposer.warningMessage)

        //This error is specific to QDM and confirms we are getting errors from QDM source
        cy.get(measureComposer.editorLeftPanel).click()
        cy.get(measureComposer.editorErrorToolTip).should('have.text','ERROR:A named type is required in this context.ERROR:class org.hl7.elm.r1.Null cannot be cast to class org.hl7.elm.r1.TypeSpecifier (org.hl7.elm.r1.Null and org.hl7.elm.r1.TypeSpecifier are in unnamed module of loader org.apache.catalina.loader.ParallelWebappClassLoader @70eb4846)' )

        cy.get(measurelibrary.measureLibraryTab).click()

        helper.visibleWithTimeout(matheader.progressbar)
        helper.notVisibleWithTimeout(matheader.progressbar)

    })
    it('FHIR: Verify errors are coming from correct source', () => {

        helper.enterText(measurelibrary.searchInputBox, fhirMeasure)
        cy.get(measurelibrary.searchBtn).click()

        helper.visibleWithTimeout(matheader.progressbar)
        helper.notVisibleWithTimeout(matheader.progressbar)

        cy.get(measurelibrary.row1MeasureSearch).dblclick()

        helper.visibleWithTimeout(matheader.progressbar)
        helper.notVisibleWithTimeout(matheader.progressbar)

        cy.get(measureComposer.cqlWorkspace).click()

        helper.visibleWithTimeout(matheader.progressbar)
        helper.notVisibleWithTimeout(matheader.progressbar)

        cy.get(measureComposer.parameter).click()

        helper.waitToContainText(measureComposer.cqlWorkspaceTitleGlobal2,'Parameter')

        cy.get(measureComposer.parameterListbox).select('Measurement Period')
        cy.get('body').type('{enter}')

        cy.get(measureComposer.parameterEraseBtn).click()
        cy.get(measureComposer.parameterCQLExpressionEditorInput).type('sdffgsdffgsdfg', { delay: 50 })
        cy.get(measureComposer.parameterSaveBtn).click()

        helper.visibleWithTimeout(matheader.progressbar)
        helper.notVisibleWithTimeout(matheader.progressbar)

        helper.visibleWithTimeout(measureComposer.warningMessage)

        //This error is specific to FHIR and confirms we are getting errors from FHIR source
        cy.get(measureComposer.editorLeftPanel).click()
        cy.get(measureComposer.editorErrorToolTip)
            .should('have.text','ERROR:A named type is required in this context.ERROR:class org.hl7.elm.r1.Null cannot be cast to class org.hl7.elm.r1.TypeSpecifier (org.hl7.elm.r1.Null and org.hl7.elm.r1.TypeSpecifier are in unnamed module of loader org.springframework.boot.loader.LaunchedURLClassLoader @643b1d11)' )

        cy.get(measurelibrary.measureLibraryTab).click()

        helper.visibleWithTimeout(matheader.progressbar)
        helper.notVisibleWithTimeout(matheader.progressbar)

    })

})