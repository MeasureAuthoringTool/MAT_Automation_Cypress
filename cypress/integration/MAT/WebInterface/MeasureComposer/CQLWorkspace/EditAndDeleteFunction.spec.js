import * as helper from '../../../../../support/helpers'
import * as dataCreation from '../../../../../support/MAT/MeasureAndCQLLibraryCreation'
import * as measurelibrary from '../../../../../pom/MAT/WI/MeasureLibrary'
import * as measureComposer from '../../../../../pom/MAT/WI/MeasureComposer'
import * as oktaLogin from '../../../../../support/oktaLogin'
import * as gridRowActions from '../../../../../support/MAT/GridRowActions'

let fhirMeasure = ''
let qdmMeasure = ''

describe('Measure Composer: Edit and Delete Function Argument Lightbox', () => {

  beforeEach('Login', () => {
    oktaLogin.login()
  })

  afterEach('Log Out', () => {
    helper.logout()
  })

  it('QDM Measure: Edit and Delete the classes on Function Argument Lightbox', () => {
    qdmMeasure = dataCreation.createDraftMeasure('EditandDeleteQdmMeasureFunction','QDM')

    helper.verifySpinnerAppearsAndDissappears()

    helper.enterText(measurelibrary.searchInputBox, qdmMeasure)
    cy.get(measurelibrary.searchBtn).click()

    helper.verifySpinnerAppearsAndDissappears()

    gridRowActions.doubleClickRow(measurelibrary.row1MeasureSearch)

    helper.verifySpinnerAppearsAndDissappears()

    cy.get(measureComposer.cqlWorkspace).click()

    helper.verifySpinnerAppearsAndDissappears()

    cy.get(measureComposer.functionMeasureComposer).click()

    helper.waitToContainText(measureComposer.cqlWorkspaceTitleGlobal2,'Function')

    cy.get(measureComposer.addArgument).click()

    cy.get(measureComposer.availableDatatypesListBox).select('QDM Datatype')

    // Verify sub-classes display on Function Argument drop-down
    cy.get(measureComposer.datatypeObjectListBox).select( 'Immunization, Not Administered')
      .invoke('val').should('deep.equal', 'Immunization, Not Administered')

    cy.get(measureComposer.datatypeObjectListBox).select( 'Substance, Not Recommended')
      .invoke('val').should('deep.equal', 'Substance, Not Recommended')

    cy.get(measureComposer.argumentNameInput).type('Encounter')

    cy.get(measureComposer.addBtn).click()

    helper.verifySpinnerAppearsAndDissappears()

    cy.get(measureComposer.functionNameInput).type('Test')
    cy.get(measureComposer.functionCQLExpressionEditorInput).type('true')
    cy.get(measureComposer.functionSaveBtn).click()

    helper.verifySpinnerAppearsAndDissappears()
    helper.verifySpinnerAppearsAndDissappears()

    helper.waitToContainText(measureComposer.warningMessage,'Function Test successfully saved.')

    //Edit QDM Measure Function

    cy.get(measureComposer.functionMeasureComposer).click()
    cy.get(measureComposer.functionLeftList ).select('Test')
    cy.get(measureComposer.functionLeftListOptions).eq(0).dblclick()
    cy.get(measureComposer.editFunction).click()
    cy.get(measureComposer.argumentNameInput).clear().type('EDVisit')
    cy.get(measureComposer.availableDatatypesListBox).select('Ratio')
    cy.get(measureComposer.addBtn).click()
    cy.get(measureComposer.functionSaveBtn).click()

    //Delete QDM Measure Function

    cy.get(measureComposer.functionMeasureComposer).click()
    cy.get(measureComposer.functionLeftList).select('Test')
    cy.get(measureComposer.functionLeftListOptions).eq(0).dblclick()
    cy.get(measureComposer.deleteFunctionArgument).click()
    cy.get(measureComposer.deleteConfirmationYes).click()
    cy.get(measureComposer.functionSaveBtn).click()

    cy.get(measureComposer.cqlLibraryEditor).click()

    helper.verifySpinnerAppearsAndDissappears()

    helper.waitToContainText(measureComposer.warningMessage,'You are viewing CQL with no validation errors.')

    cy.get(measurelibrary.measureLibraryTab).click()

    helper.verifySpinnerAppearsAndDissappears()
    helper.verifySpinnerAppearsAndDissappears()

  })

  it('FHIR Measure: Edit and Delete the classes on Function Argument Lightbox', () => {
    fhirMeasure = dataCreation.createDraftMeasure('EditandDeleteFhirMeasureFunction','FHIR')

    helper.verifySpinnerAppearsAndDissappears()

    helper.enterText(measurelibrary.searchInputBox, fhirMeasure)
    cy.get(measurelibrary.searchBtn).click()

    helper.verifySpinnerAppearsAndDissappears()

    gridRowActions.doubleClickRow(measurelibrary.row1MeasureSearch)

    helper.verifySpinnerAppearsAndDissappears()

    cy.get(measureComposer.cqlWorkspace).click()

    helper.verifySpinnerAppearsAndDissappears()

    cy.get(measureComposer.functionMeasureComposer).click()

    helper.waitToContainText(measureComposer.cqlWorkspaceTitleGlobal2,'Function')

    cy.get(measureComposer.addArgument).click()

    cy.get(measureComposer.availableDatatypesListBox).select('FHIR Datatype')

    // Verify only main-classes display on Function Argument drop-down
    cy.get(measureComposer.datatypeObjectListBox).select( 'AdverseEvent')
      .invoke('val').should('deep.equal', 'AdverseEvent')

    cy.get(measureComposer.datatypeObjectListBox).select( 'AllergyIntolerance')
      .invoke('val').should('deep.equal', 'AllergyIntolerance')

    cy.get(measureComposer.datatypeObjectListBox).select( 'Task')
      .invoke('val').should('deep.equal', 'Task')

    cy.get(measureComposer.argumentNameInput).type('Encounter')

    cy.get(measureComposer.addBtn).click()

    helper.verifySpinnerAppearsAndDissappears()

    cy.get(measureComposer.functionNameInput).type('Test')
    cy.get(measureComposer.functionCQLExpressionEditorInput).type('true')
    cy.get(measureComposer.functionSaveBtn).click()

    helper.verifySpinnerAppearsAndDissappears()
    helper.verifySpinnerAppearsAndDissappears()

    helper.waitToContainText(measureComposer.warningMessage,'Function Test successfully saved.')

    //Edit FHIR Measure Function

    cy.get(measureComposer.functionMeasureComposer).click()
    cy.get(measureComposer.functionLeftList ).select('Test')
    cy.get(measureComposer.functionLeftListOptions).eq(0).dblclick()
    cy.get(measureComposer.editFunction).click()
    cy.get(measureComposer.argumentNameInput).clear().type('EDVisit')
    cy.get(measureComposer.availableDatatypesListBox).select('Ratio')
    cy.get(measureComposer.addBtn).click()
    cy.get(measureComposer.functionSaveBtn).click()

    //Delete FHIR Measure Function

    cy.get(measureComposer.functionMeasureComposer).click()
    cy.get(measureComposer.functionLeftList ).select('Test')
    cy.get(measureComposer.functionLeftListOptions).eq(0).dblclick()
    cy.get(measureComposer.deleteFunctionArgument).click()
    cy.get(measureComposer.deleteConfirmationYes).click()
    cy.get(measureComposer.functionSaveBtn).click()

    helper.verifySpinnerAppearsAndDissappears()

    cy.get(measurelibrary.measureLibraryTab).click()

    helper.verifySpinnerAppearsAndDissappears()
    helper.verifySpinnerAppearsAndDissappears()

  })
})