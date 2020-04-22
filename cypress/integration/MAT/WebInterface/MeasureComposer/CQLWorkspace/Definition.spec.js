import * as helper from "../../../../../support/helpers";
import * as measurelibrary from "../../../../../pom/MAT/WI/MeasureLibrary";
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

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(measurelibrary.row1MeasureSearch).dblclick()

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(measureComposer.cqlWorkspace).click()

        helper.verifySpinnerAppearsAndDissappears()

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

        helper.verifySpinnerAppearsAndDissappears()

    })
    it('Enabled/Disabled FHIR Measure Owner', () => {

        helper.enterText(measurelibrary.searchInputBox, fhirMeasure)
        cy.get(measurelibrary.searchBtn).click()

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(measurelibrary.row1MeasureSearch).dblclick()

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(measureComposer.cqlWorkspace).click()

        helper.verifySpinnerAppearsAndDissappears()

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

        helper.verifySpinnerAppearsAndDissappears()

    })
    it('QDM Insert Attribute Data population', () => {

        helper.enterText(measurelibrary.searchInputBox, qdmMeasure)
        cy.get(measurelibrary.searchBtn).click()

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(measurelibrary.row1MeasureSearch).dblclick()

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(measureComposer.cqlWorkspace).click()

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(measureComposer.definition).click()

        helper.waitToContainText(measureComposer.cqlWorkspaceTitleGlobal2,'Definition')

        cy.get(measureComposer.definitionInsertBtn).click()
        cy.get(measureComposer.itemTypeListBox).select('Attributes')

        //verifying a unique datatype and attribute based on model type QDM, this ensures the correct data has been populated
        cy.get(measureComposer.attributesListBox).select('activeDatetime').should('have.value', 'activeDatetime')
        cy.get(measureComposer.attributesDataTypeListBox).select('Assessment, Not Ordered').should('have.value', 'Assessment, Not Ordered')

        cy.get(measureComposer.cancelBtn).click()

        cy.get(measurelibrary.measureLibraryTab).click()

        helper.verifySpinnerAppearsAndDissappears()

    })
    it('FHIR Insert Attribute Data population', () => {

        helper.enterText(measurelibrary.searchInputBox, fhirMeasure)
        cy.get(measurelibrary.searchBtn).click()

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(measurelibrary.row1MeasureSearch).dblclick()

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(measureComposer.cqlWorkspace).click()

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(measureComposer.definition).click()

        helper.waitToContainText(measureComposer.cqlWorkspaceTitleGlobal2,'Definition')

        cy.get(measureComposer.definitionInsertBtn).click()
        cy.get(measureComposer.itemTypeListBox).select('Attributes')

        //verifying a unique datatype and attribute based on model type FHIR, this ensures the correct data has been populated
        cy.get(measureComposer.attributesDataTypeListBox).select('Condition').should('have.value', 'Condition')
        cy.get(measureComposer.attributesListBox).select('recorder').should('have.value', 'recorder')

        cy.get(measureComposer.cancelBtn).click()

        cy.get(measurelibrary.measureLibraryTab).click()

        helper.verifySpinnerAppearsAndDissappears()

    })

    
    it('FHIR Measure: Validate the Attribute drop down is disabled', () => {

        helper.enterText(measurelibrary.searchInputBox, fhirMeasure)
        cy.get(measurelibrary.searchBtn).click()

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(measurelibrary.row1MeasureSearch).dblclick()

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(measureComposer.cqlWorkspace).click()

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(measureComposer.definition).click()

        helper.waitToContainText(measureComposer.cqlWorkspaceTitleGlobal2,'Definition')

        cy.get(measureComposer.definitionNameInput).type('Id')

        cy.get(measureComposer.definitionInsertBtn).click()

        cy.get(measureComposer.itemTypeListBox).select('Attributes')

        cy.get(measureComposer.attributesListBox).should('be.disabled')

        cy.get(measureComposer.attributesDataTypeListBox).select('Communication')
        cy.get(measureComposer.attributesListBox).should('be.enabled').select('id')

        cy.get(measureComposer.insertDialogInsertBtn).click()

        cy.get(measureComposer.definitionSaveBtn).click()

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(measureComposer.definitionLeftList).eq(0).should('have.text', 'Id')

        cy.get(measurelibrary.measureLibraryTab).click()

        helper.verifySpinnerAppearsAndDissappears()

    })
})