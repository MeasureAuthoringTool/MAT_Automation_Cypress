import * as helper from "../../../../../support/helpers";
import * as measurelibrary from "../../../../../pom/MAT/WI/MeasureLibrary";
import * as cqlLibrary from "../../../../../pom/MAT/WI/CqlLibrary";
import * as cqlComposer from "../../../../../pom/MAT/WI/CQLComposer";
import * as oktaLogin from "../../../../../support/oktaLogin";
import * as dataCreation from "../../../../../support/MAT/MeasureAndCQLLibraryCreation";

let fhircqlLibrary = ''
let qdmcqlLibrary = ''

describe('CQL Composer: CQL Library Workspace: Parameter', () => {
    before('Login', () => {
        oktaLogin.login()

        cy.get(measurelibrary.cqlLibraryTab).click()

        helper.verifySpinnerAppearsAndDissappears()

        qdmcqlLibrary = dataCreation.createDraftCqlLibrary('qdmDraftLibrary','QDM')
        fhircqlLibrary = dataCreation.createDraftCqlLibrary('FhirDraftLibrary','FHIR')

        helper.verifySpinnerAppearsAndDissappears()
    })
    beforeEach('Preserve Cookies', () => {
        helper.preserveCookies()
    })
    after('Log Out', () => {
        helper.logout()
    })
    it('QDM: Verify errors are coming from correct source', () => {
        helper.verifySpinnerAppearsAndDissappears()

        helper.enabledWithTimeout(cqlLibrary.searchInputBox)
        helper.enterText(cqlLibrary.searchInputBox, qdmcqlLibrary)
        cy.get(cqlLibrary.searchBtn).click()

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(cqlLibrary.row1CqlLibrarySearch).dblclick()

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(cqlComposer.parameter).click()

        helper.waitToContainText(cqlComposer.cqlWorkspaceTitleGlobal2,'Parameter')

        cy.get(cqlComposer.parameterListbox).select('Measurement Period')
        cy.get(cqlComposer.parameterListbox).contains('Measurement Period').dblclick()

        cy.get(cqlComposer.parameterEraseBtn).click()
        cy.get(cqlComposer.parameterCQLExpressionEditorInput).type('sdffgsdffgsdfg', { delay: 50 })
        cy.get(cqlComposer.parameterSaveBtn).click()

        helper.verifySpinnerAppearsAndDissappears()

        helper.visibleWithTimeout(cqlComposer.warningMessage)

        //This error is specific to QDM and confirms we are getting errors from QDM source
        cy.get(cqlComposer.editorLeftPanel).click()
        cy.get(cqlComposer.editorErrorToolTip).should('contain.text','ERROR:A named type is required in this context.ERROR:class org.hl7.elm.r1.Null cannot be cast to class org.hl7.elm.r1.TypeSpecifier (org.hl7.elm.r1.Null and org.hl7.elm.r1.TypeSpecifier are in unnamed module of loader org.apache.catalina.loader.ParallelWebappClassLoader' )

        cy.get(measurelibrary.cqlLibraryTab).click()

        helper.verifySpinnerAppearsAndDissappears()

    })
    it('FHIR: Verify errors are coming from correct source', () => {
        helper.verifySpinnerAppearsAndDissappears()

        helper.enabledWithTimeout(cqlLibrary.searchInputBox)
        helper.enterText(cqlLibrary.searchInputBox, fhircqlLibrary)
        cy.get(cqlLibrary.searchBtn).click()

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(cqlLibrary.row1CqlLibrarySearch).dblclick()

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(cqlComposer.parameter).click()

        helper.waitToContainText(cqlComposer.cqlWorkspaceTitleGlobal2,'Parameter')

        cy.get(cqlComposer.parameterListbox).select('Measurement Period')
        cy.get(cqlComposer.parameterListbox).contains('Measurement Period').dblclick()

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(cqlComposer.parameterEraseBtn).click()
        helper.verifySpinnerAppearsAndDissappears()
        cy.get(cqlComposer.parameterCQLExpressionEditorInput).type('sdffgsdffgsdfg', { delay: 50 })
        cy.get(cqlComposer.parameterSaveBtn).click()

        helper.verifySpinnerAppearsAndDissappears()

        helper.visibleWithTimeout(cqlComposer.warningMessage)

        //This error is specific to FHIR and confirms we are getting errors from FHIR source
        cy.get(cqlComposer.editorLeftPanel).click()
        cy.get(cqlComposer.editorErrorToolTip)
            .should('contain.text','ERROR:class org.hl7.elm.r1.Null cannot be cast to class org.hl7.elm.r1.TypeSpecifier (org.hl7.elm.r1.Null and org.hl7.elm.r1.TypeSpecifier are in unnamed module of loader org.springframework.boot.loader.LaunchedURLClassLoader' )

        cy.get(measurelibrary.cqlLibraryTab).click()

        helper.verifySpinnerAppearsAndDissappears()

    })

})