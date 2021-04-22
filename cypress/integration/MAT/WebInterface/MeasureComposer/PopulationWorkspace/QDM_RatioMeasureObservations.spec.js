import * as helper from '../../../../../support/helpers'
import * as dataCreation from '../../../../../support/MAT/MeasureAndCQLLibraryCreation'
import * as measurelibrary from '../../../../../pom/MAT/WI/MeasureLibrary'
import * as createNewMeasure from '../../../../../pom/MAT/WI/CreateNewMeasure'
import * as measureComposer from '../../../../../pom/MAT/WI/MeasureComposer'
import * as oktaLogin from '../../../../../support/oktaLogin'
import * as measureDetails from '../../../../../pom/MAT/WI/MeasureDetails'
import * as gridRowActions from '../../../../../support/MAT/GridRowActions'

let measureName = ''

describe('MeasureComposer: QDM Ratio Measure Observation', () => {
    before('Data Setup', () => {

        oktaLogin.login()

        measureName = dataCreation.createDraftMeasure('QDMRatioFunctions', 'QDM', 'Ratio')

        dataCreation.createDraftMeasure(measureName, 'QDM', 'Ratio')

        AddFunctions()

        helper.logout()

    })
    beforeEach('Login', () => {
        oktaLogin.login()
    })
    afterEach('Log Out', () => {
        helper.logout()
    })
    it('Measure Observations: Patient Based: Verify the correct Functions appear in Function Dropdown based ' +
    'on Argument number', () => {

        helper.enabledWithTimeout(measurelibrary.searchInputBox)
        helper.enterText(measurelibrary.searchInputBox, measureName)
        cy.get(measurelibrary.searchBtn).click()

        helper.verifySpinnerAppearsAndDissappears()

        gridRowActions.doubleClickRow(measurelibrary.row1MeasureSearch)

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(measureDetails.patientBasedMeasureListbox).select('Yes')

        cy.get(measureDetails.saveBtn).click()

        helper.verifySpinnerAppearsAndDissappears()

        helper.visibleWithTimeout(measureDetails.warningMessage)

        // Population Workspace

        cy.get(measureComposer.populationWorkspace).click()

        helper.verifySpinnerAppearsAndDissappears()


        cy.get(measureComposer.measureObservations).click()

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(measureComposer.measureObservationsAggregateFunctionListBox).select('Count')

        cy.get(measureComposer.measureObservationsFunctionListBox).find('option').should('have.length', 2)

        cy.get(measureComposer.measureObservationsFunctionListBox).select('No Arguments')

        cy.get(measureComposer.measureObservationsSaveBtn).click()

        helper.verifySpinnerAppearsAndDissappears()

        helper.visibleWithTimeout(measureComposer.warningMessage)
        helper.waitToContainText(measureComposer.warningMessage, 'Changes to Measure Observations have been successfully saved.')

        cy.get(measurelibrary.measureLibraryTab).click()
    })
    it('Measure Observations: NOT Patient Based: Verify the correct Functions appear in Function Dropdown based ' +
      'on Argument number', () => {

        helper.enabledWithTimeout(measurelibrary.searchInputBox)
        helper.enterText(measurelibrary.searchInputBox, measureName)
        cy.get(measurelibrary.searchBtn).click()

        helper.verifySpinnerAppearsAndDissappears()

        gridRowActions.doubleClickRow(measurelibrary.row1MeasureSearch)

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(measureDetails.patientBasedMeasureListbox).select('No')

        cy.get(measureDetails.saveBtn).click()

        helper.verifySpinnerAppearsAndDissappears()

        helper.visibleWithTimeout(measureDetails.warningMessage)

        // Population Workspace

        cy.get(measureComposer.populationWorkspace).click()

        helper.verifySpinnerAppearsAndDissappears()


        cy.get(measureComposer.measureObservations).click()

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(measureComposer.measureObservationsAggregateFunctionListBox).select('Count')

        cy.get(measureComposer.measureObservationsFunctionListBox).find('option').should('have.length', 2)
        cy.get(measureComposer.measureObservationsFunctionListBox).select('One Argument')

        cy.get(measureComposer.measureObservationsSaveBtn).click()

        helper.verifySpinnerAppearsAndDissappears()

        helper.visibleWithTimeout(measureComposer.warningMessage)
        helper.waitToContainText(measureComposer.warningMessage, 'Changes to Measure Observations have been successfully saved.')

        cy.get(measurelibrary.measureLibraryTab).click()
    })
})

function AddFunctions(){

    helper.enabledWithTimeout(measurelibrary.searchInputBox)
    helper.enterText(measurelibrary.searchInputBox, measureName)
    cy.get(measurelibrary.searchBtn).click()

    helper.verifySpinnerAppearsAndDissappears()

    gridRowActions.doubleClickRow(measurelibrary.row1MeasureSearch)

    cy.get(measureComposer.cqlWorkspace).click()

    helper.verifySpinnerAppearsAndDissappears()

    //Functions
    cy.get(measureComposer.functionMeasureComposer).click()

    helper.verifySpinnerAppearsAndDissappears()

    helper.waitToContainText(measureComposer.cqlWorkspaceTitleGlobal2, 'Function')

    cy.get(measureComposer.addNewBtn).click()
    cy.get(measureComposer.functionNameInput).type('One Argument', { delay: 50 })
    cy.get(measureComposer.addArgument).click()
    helper.enabledWithTimeout(measureComposer.argumentNameInput)
    helper.enterText(measureComposer.argumentNameInput, 'OneArgument')
    cy.get(measureComposer.availableDatatypesListBox).select('Boolean')
    cy.get(measureComposer.addBtn).click()
    cy.get(measureComposer.functionCQLExpressionEditorInput).type('true', { delay: 50 })
    cy.get(measureComposer.functionSaveBtn).click()

    helper.verifySpinnerAppearsAndDissappears()
    helper.visibleWithTimeout(measureComposer.warningMessage)

    cy.get(measureComposer.addNewBtn).click()
    helper.enterText(measureComposer.functionNameInput, 'Two Arguments')
    cy.get(measureComposer.addArgument).click()
    helper.enabledWithTimeout(measureComposer.argumentNameInput)
    helper.enterText(measureComposer.argumentNameInput, 'FirstArgument')
    cy.get(measureComposer.availableDatatypesListBox).select('Boolean')
    cy.get(measureComposer.addBtn).click()
    cy.get(measureComposer.addArgument).click()
    helper.enabledWithTimeout(measureComposer.argumentNameInput)
    helper.enterText(measureComposer.argumentNameInput, 'SecondArgument')
    cy.get(measureComposer.availableDatatypesListBox).select('Boolean')
    cy.get(measureComposer.addBtn).click()
    cy.get(measureComposer.functionCQLExpressionEditorInput).type('true', { delay: 50 })
    cy.get(measureComposer.functionSaveBtn).click()

    helper.verifySpinnerAppearsAndDissappears()
    helper.visibleWithTimeout(measureComposer.warningMessage)

    cy.get(measureComposer.addNewBtn).click()
    helper.enterText(measureComposer.functionNameInput, 'No Arguments')
    cy.get(measureComposer.functionCQLExpressionEditorInput).type('true', { delay: 50 })
    cy.get(measureComposer.functionSaveBtn).click()

    helper.verifySpinnerAppearsAndDissappears()
    helper.visibleWithTimeout(measureComposer.warningMessage)

    //CQL Library Editor

    cy.get(measureComposer.cqlLibraryEditor).click()

    helper.waitToContainText(measureComposer.cqlWorkspaceTitleCQLLibraryEditor, 'CQL Library Editor')

    helper.visibleWithTimeout(measureComposer.warningMessage)
    helper.waitToContainText(measureComposer.warningMessage, 'You are viewing CQL with no validation errors.')

    helper.verifySpinnerAppearsAndDissappears()
    helper.verifySpinnerAppearsAndDissappears()

    cy.get(measurelibrary.measureLibraryTab).click()

    helper.verifySpinnerAppearsAndDissappears()
}
