import * as helper from "../../../../../support/helpers";
import * as measurelibrary from "../../../../../pom/MAT/WI/MeasureLibrary";
import * as matheader from "../../../../../pom/MAT/WI/MATheader";
import * as measureComposer from "../../../../../pom/MAT/WI/MeasureComposer";

let fhirMeasure = ''
let qdmMeasure = ''

describe('Measure Composer: CQL Workspace: Definition', () => {
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
    it('Enabled/Disabled QDM Measure Owner', () => {

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

        cy.get(measureComposer.definition).click()

        helper.waitToContainText(measureComposer.cqlWorkspaceTitleGlobal2,'Definition')

        helper.enabled(measureComposer.addNewBtn)
        helper.enabled(measureComposer.definitionInformationBtn)
        helper.enabled(measureComposer.definitionInsertBtn)
        helper.enabled(measureComposer.definitionExpressionBuilderBtn)
        helper.enabled(measureComposer.definitionSaveBtn)
        helper.enabled(measureComposer.definitionEraseBtn)
        helper.disabled(measureComposer.definitionDeleteBtn)

        cy.get(measurelibrary.measureLibraryTab).click()

        helper.visibleWithTimeout(matheader.progressbar)
        helper.notVisibleWithTimeout(matheader.progressbar)

    })
    it('Enabled/Disabled FHIR Measure Owner', () => {

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

        cy.get(measureComposer.definition).click()

        helper.waitToContainText(measureComposer.cqlWorkspaceTitleGlobal2,'Definition')

        helper.enabled(measureComposer.addNewBtn)
        helper.enabled(measureComposer.definitionInformationBtn)
        helper.enabled(measureComposer.definitionInsertBtn)
        helper.disabled(measureComposer.definitionExpressionBuilderBtn)
        helper.enabled(measureComposer.definitionSaveBtn)
        helper.enabled(measureComposer.definitionEraseBtn)
        helper.disabled(measureComposer.definitionDeleteBtn)

        cy.get(measurelibrary.measureLibraryTab).click()

        helper.visibleWithTimeout(matheader.progressbar)
        helper.notVisibleWithTimeout(matheader.progressbar)

    })
    it('QDM Insert Attribute Data population', () => {

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

        cy.get(measureComposer.definition).click()

        helper.waitToContainText(measureComposer.cqlWorkspaceTitleGlobal2,'Definition')

        cy.get(measureComposer.definitionInsertBtn).click()
        cy.get(measureComposer.itemTypeListBox).select('Attributes')

        //verifying a unique datatype and attribute based on model type QDM, this ensures the correct data has been populated
        cy.get(measureComposer.attributesListBox).select('activeDatetime').should('have.value', 'activeDatetime')
        cy.get(measureComposer.attributesDataTypeListBox).select('Assessment, Not Ordered').should('have.value', 'Assessment, Not Ordered')

        cy.get(measureComposer.cancelBtn).click()

        cy.get(measurelibrary.measureLibraryTab).click()

        helper.visibleWithTimeout(matheader.progressbar)
        helper.notVisibleWithTimeout(matheader.progressbar)

    })
    it('FHIR Insert Attribute Data population', () => {

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

        cy.get(measureComposer.definition).click()

        helper.waitToContainText(measureComposer.cqlWorkspaceTitleGlobal2,'Definition')

        cy.get(measureComposer.definitionInsertBtn).click()
        cy.get(measureComposer.itemTypeListBox).select('Attributes')

        //verifying a unique datatype and attribute based on model type FHIR, this ensures the correct data has been populated
        cy.get(measureComposer.attributesListBox).select('addresses').should('have.value', 'addresses')
        cy.get(measureComposer.attributesDataTypeListBox).select('Condition').should('have.value', 'Condition')

        cy.get(measureComposer.cancelBtn).click()

        cy.get(measurelibrary.measureLibraryTab).click()

        helper.visibleWithTimeout(matheader.progressbar)
        helper.notVisibleWithTimeout(matheader.progressbar)

    })
})