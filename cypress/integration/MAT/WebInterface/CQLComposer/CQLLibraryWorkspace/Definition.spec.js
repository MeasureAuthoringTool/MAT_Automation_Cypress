import * as helper from "../../../../../support/helpers";
import * as measurelibrary from "../../../../../pom/MAT/WI/MeasureLibrary";
import * as cqlLibrary from "../../../../../pom/MAT/WI/CqlLibrary";
import * as matheader from "../../../../../pom/MAT/WI/MATheader";
import * as createNewCqlLibrary from "../../../../../pom/MAT/WI/CreateNewCQLLibrary";
import * as cqlComposer from "../../../../../pom/MAT/WI/CQLComposer";
import * as measureComposer from "../../../../../pom/MAT/WI/MeasureComposer";

describe('CQL Composer: CQL Library Workspace: Definition', () => {
    before('Login', () => {
        helper.loginGeneric()

        cy.get(measurelibrary.cqlLibraryTab).click()

        helper.visibleWithTimeout(matheader.progressbar)
        helper.notVisibleWithTimeout(matheader.progressbar)
    })
    beforeEach('Preserve Cookies', () => {
        helper.preserveCookies()
    })
    after('Log Out', () => {
        helper.logout()
    })
    it('Enabled/Disabled QDM CQL Library Owner', () => {

        cy.get(cqlLibrary.newLibraryBtn).click()

        let cqlLibraryName = 'CQLLibraryTest' + Date.now()

        cy.get(createNewCqlLibrary.cqlLibraryName).type(cqlLibraryName, { delay: 50 })

        cy.get(createNewCqlLibrary.modelQDMRadio).click()

        cy.get(createNewCqlLibrary.saveAndContinueBtn).click()

        cy.get(cqlComposer.confirmationContinueBtn).click()

        helper.visibleWithTimeout(matheader.progressbar)
        helper.notVisibleWithTimeout(matheader.progressbar)

        cy.get(cqlComposer.definition).click()

        helper.waitToContainText(measureComposer.cqlWorkspaceTitleGlobal2,'Definition')

        helper.enabled(cqlComposer.addNewBtn)
        helper.enabled(cqlComposer.definitionInformationBtn)
        helper.enabled(cqlComposer.definitionInsertBtn)
        helper.enabled(cqlComposer.definitionExpressionBuilderBtn)
        helper.enabled(cqlComposer.definitionSaveBtn)
        helper.enabled(cqlComposer.definitionEraseBtn)
        helper.disabled(cqlComposer.definitionDeleteBtn)

        cy.get(measurelibrary.cqlLibraryTab).click()

        helper.visibleWithTimeout(matheader.progressbar)
        helper.notVisibleWithTimeout(matheader.progressbar)

    })

    it('Enabled/Disabled FHIR CQL Library Owner', () => {

        cy.get(cqlLibrary.newLibraryBtn).click()

        let cqlLibraryName = 'CQLLibraryTest' + Date.now()

        cy.get(createNewCqlLibrary.cqlLibraryName).type(cqlLibraryName, { delay: 50 })

        cy.get(createNewCqlLibrary.modelFHIRRadio).click()

        cy.get(createNewCqlLibrary.saveAndContinueBtn).click()

        cy.get(cqlComposer.confirmationContinueBtn).click()

        helper.visibleWithTimeout(matheader.progressbar)
        helper.notVisibleWithTimeout(matheader.progressbar)

        cy.get(cqlComposer.definition).click()

        helper.waitToContainText(measureComposer.cqlWorkspaceTitleGlobal2,'Definition')

        helper.enabled(cqlComposer.addNewBtn)
        helper.enabled(cqlComposer.definitionInformationBtn)
        helper.enabled(cqlComposer.definitionInsertBtn)
        helper.disabled(cqlComposer.definitionExpressionBuilderBtn)
        helper.enabled(cqlComposer.definitionSaveBtn)
        helper.enabled(cqlComposer.definitionEraseBtn)
        helper.disabled(cqlComposer.definitionDeleteBtn)

        cy.get(measurelibrary.measureLibraryTab).click()

        helper.visibleWithTimeout(matheader.progressbar)
        helper.notVisibleWithTimeout(matheader.progressbar)

    })

})