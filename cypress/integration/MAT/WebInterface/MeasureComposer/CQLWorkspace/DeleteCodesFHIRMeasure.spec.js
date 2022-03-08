import * as helper from '../../../../../support/helpers'
import * as measurelibrary from '../../../../../pom/MAT/WI/MeasureLibrary'
import * as gridRowActions from '../../../../../support/MAT/GridRowActions'
import * as measureComposer from '../../../../../pom/MAT/WI/MeasureComposer'
import * as cqlComposer from '../../../../../pom/MAT/WI/CQLComposer'
import * as dataCreation from '../../../../../support/MAT/MeasureAndCQLLibraryCreation'
import * as login from '../../../../../support/MAT/Login'

let fhirMeasure = ''

describe('FHIR Measure: Add code directly on CQL Library Editor', () => {
  before('Login, Data creation', () => {
    login.matLogin()

    fhirMeasure = dataCreation.createDraftMeasure('FhirDraftMeasure', 'FHIR')

    login.matLogout()
  })
  beforeEach('Login', () => {
    login.matLogin()
  })
  afterEach('Log Out', () => {
    login.matLogout()
  })

  it('FHIR Measure: Validate the successful when editing directly on CQL Library Editor', () => {
    helper.verifySpinnerAppearsAndDissappears()

    helper.enabledWithTimeout(measurelibrary.searchInputBox)
    helper.enterText(measurelibrary.searchInputBox, fhirMeasure)
    cy.get(measurelibrary.searchBtn).click()

    helper.verifySpinnerAppearsAndDissappears()

    gridRowActions.doubleClickRow(measurelibrary.selectMeasureCheckbox)

    helper.verifySpinnerAppearsAndDissappears()

    cy.get(measureComposer.cqlWorkspace).click()

    helper.verifySpinnerAppearsAndDissappears()

    // CQL Library Editor

    cy.get(measureComposer.cqlLibraryEditor).click()

    cy.get(measureComposer.warningMessage).should('contain.text', 'You are viewing CQL with no validation errors.')

    helper.verifySpinnerAppearsAndDissappears()

    cy.get(measureComposer.cqlLibraryEditorInput).type('{uparrow}{uparrow}{uparrow}{uparrow}{uparrow}{uparrow}{uparrow}codesystem "SNOMEDCT": \'http://snomed.info/sct\'{enter}{enter}')

    cy.get(measureComposer.cqlLibraryEditorInput).type('{uparrow}{uparrow}{uparrow}{uparrow}{uparrow}{uparrow}code "Dead (finding)": \'419099009\' from "SNOMEDCT" display \'Dead (finding)\'')
    cy.get(measureComposer.cqlEditorSaveBtn).click()

    cy.get(measureComposer.warningMessage).should('contain.text', 'Changes to the CQL File have been successfully saved.')

    cy.get(cqlComposer.codes).click()

    cy.get(measureComposer.codeDeleteBtn).click()

    cy.get(measureComposer.deleteConfirmationYes).click()

    cy.get(measurelibrary.measureLibraryTab).click()

    helper.verifySpinnerAppearsAndDissappears()
  })
})
