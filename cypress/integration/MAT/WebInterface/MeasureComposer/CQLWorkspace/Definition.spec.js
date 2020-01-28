import * as helper from "../../../../../support/helpers";
import * as measurelibrary from "../../../../../pom/MAT/WI/MeasureLibrary";
import * as createNewMeasure from "../../../../../pom/MAT/WI/CreateNewMeasure";
import * as matheader from "../../../../../pom/MAT/WI/MATheader";
import * as measureComposer from "../../../../../pom/MAT/WI/MeasureComposer";

let measureName = ''

describe('Measure Composer: CQL Workspace: Definition', () => {
    before('Login', () => {
        helper.loginGeneric()
    })
    beforeEach('Preserve Cookies', () => {
        helper.preserveCookies()
    })
    after('Log Out', () => {
        helper.logout()
    })
    it('Enabled/Disabled QDM Measure Owner', () => {

        cy.get(measurelibrary.newMeasureButton).click()

        measureName = 'createProportionMeasure' + Date.now()

        cy.get(createNewMeasure.measureName).type(measureName, { delay: 50 })
        cy.get(createNewMeasure.modelradioQDM).click()
        cy.get(createNewMeasure.cqlLibraryName).type(measureName, { delay: 50 })
        cy.get(createNewMeasure.shortName).type(measureName, { delay: 50 })

        cy.get(createNewMeasure.measureScoringListBox).select('Proportion')
        cy.get(createNewMeasure.patientBasedMeasureListBox).select('Yes')

        cy.get(createNewMeasure.saveAndContinueBtn).click()
        cy.get(createNewMeasure.confirmationContinueBtn).click()

        helper.visibleWithTimeout(matheader.progressbar)
        helper.notVisibleWithTimeout(matheader.progressbar)

        cy.get(measureComposer.cqlWorkspace).click()

        helper.visibleWithTimeout(matheader.progressbar)
        helper.notVisibleWithTimeout(matheader.progressbar)

        cy.get(measureComposer.definition).click()

        helper.enabled(measureComposer.definitionAddNewBtn)
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

        cy.get(measurelibrary.newMeasureButton).click()

        measureName = 'createProportionMeasure' + Date.now()

        cy.get(createNewMeasure.measureName).type(measureName, { delay: 50 })
        cy.get(createNewMeasure.modelradioFHIR).click()
        cy.get(createNewMeasure.cqlLibraryName).type(measureName, { delay: 50 })
        cy.get(createNewMeasure.shortName).type(measureName, { delay: 50 })

        cy.get(createNewMeasure.measureScoringListBox).select('Proportion')
        cy.get(createNewMeasure.patientBasedMeasureListBox).select('Yes')

        cy.get(createNewMeasure.saveAndContinueBtn).click()
        cy.get(createNewMeasure.confirmationContinueBtn).click()

        helper.visibleWithTimeout(matheader.progressbar)
        helper.notVisibleWithTimeout(matheader.progressbar)

        cy.get(measureComposer.cqlWorkspace).click()

        helper.visibleWithTimeout(matheader.progressbar)
        helper.notVisibleWithTimeout(matheader.progressbar)

        cy.get(measureComposer.definition).click()

        helper.enabled(measureComposer.definitionAddNewBtn)
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
})