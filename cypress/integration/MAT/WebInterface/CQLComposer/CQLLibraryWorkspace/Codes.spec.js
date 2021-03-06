import * as helper from '../../../../../support/helpers'
import * as measurelibrary from '../../../../../pom/MAT/WI/MeasureLibrary'
import * as cqlLibrary from '../../../../../pom/MAT/WI/CqlLibrary'
import * as cqlComposer from '../../../../../pom/MAT/WI/CQLComposer'
import * as dataCreation from '../../../../../support/MAT/MeasureAndCQLLibraryCreation'
import * as gridRowActions from '../../../../../support/MAT/GridRowActions'
import * as login from '../../../../../support/MAT/Login'

let fhirLibrary = ''

describe('CQLLibrary Workspace: Codes: Validate the system version', () => {
  before('Login', () => {
    login.matLogin()

    fhirLibrary = dataCreation.createDraftCqlLibrary('FhirDraftLibrary', 'FHIR')

    login.matLogout()
  })
  beforeEach('Login', () => {
    login.matLogin()

    cy.get(measurelibrary.cqlLibraryTab).click()

    helper.verifySpinnerAppearsAndDissappears()

    helper.visibleWithTimeout(cqlLibrary.row1CqlLibrarySearch)
  })
  afterEach('Log Out', () => {
    login.matLogout()
  })

  it('FHIR Measure: Add correct version for code system', () => {

    helper.visibleWithTimeout(cqlLibrary.searchInputBox)
    helper.enterText(cqlLibrary.searchInputBox, fhirLibrary)
    cy.get(cqlLibrary.searchBtn).click()

    helper.verifySpinnerAppearsAndDissappears()
    helper.verifySpinnerAppearsAndDissappears()

    gridRowActions.doubleClickRow(cqlLibrary.row1CqlLibrarySearch)

    helper.verifySpinnerAppearsAndDissappears()

    // CQL Library Editor
    cy.get(cqlComposer.cqlLibraryEditor).click()

    helper.verifySpinnerAppearsAndDissappears()

    cy.get(cqlComposer.warningMessage).should('contain.text', 'You are viewing CQL with no validation errors.')

    helper.verifySpinnerAppearsAndDissappears()

    cy.get(cqlComposer.cqlLibraryEditorBox).type('{uparrow}{uparrow}{uparrow}{uparrow}{uparrow}{uparrow}codesystem "LOINC": \'http://loinc.org\' version \'2.67\'{enter}{enter}')

    cy.get(cqlComposer.cqlLibraryEditorBox).type('{uparrow}{uparrow}{uparrow}{uparrow}code "Birth date": \'21112-8\' from "LOINC" display \'Birth date\'')

    cy.get(cqlComposer.cqlEditorSaveBtn).click()

    cy.get(cqlComposer.warningMessage).should('contain.text', ' Changes to the CQL File have been successfully saved.')

    cy.get(measurelibrary.cqlLibraryTab).click()

    helper.verifySpinnerAppearsAndDissappears()

  })

  it('FHIR Measure: Add incorrect version for code system', () => {

    helper.visibleWithTimeout(cqlLibrary.searchInputBox)
    helper.enterText(cqlLibrary.searchInputBox, fhirLibrary)
    cy.get(cqlLibrary.searchBtn).click()

    helper.verifySpinnerAppearsAndDissappears()
    helper.verifySpinnerAppearsAndDissappears()

    gridRowActions.doubleClickRow(cqlLibrary.row1CqlLibrarySearch)

    helper.verifySpinnerAppearsAndDissappears()

    // Delete exisiting code system
    cy.get(cqlComposer.codes).click()

    cy.get(cqlComposer.codeDeleteBtn).click()

    helper.visibleWithTimeout(cqlComposer.deleteConfirmationYes)
    cy.get(cqlComposer.deleteConfirmationYes).click()

    helper.verifySpinnerAppearsAndDissappears()
    helper.verifySpinnerAppearsAndDissappears()
    helper.verifySpinnerAppearsAndDissappears()

    // CQL Library Editor
    cy.get(cqlComposer.cqlLibraryEditor).click()

    helper.verifySpinnerAppearsAndDissappears()

    cy.get(cqlComposer.warningMessage).should('contain.text', 'You are viewing CQL with no validation errors.')

    helper.verifySpinnerAppearsAndDissappears()

    cy.get(cqlComposer.cqlLibraryEditorBox).type('{uparrow}{uparrow}{uparrow}{uparrow}{uparrow}{uparrow}codesystem "LOINC": \'http://loinc.org\' version \'3.00\'{enter}{enter}')

    cy.get(cqlComposer.cqlLibraryEditorBox).type('{uparrow}{uparrow}{uparrow}{uparrow}code "Birth date": \'21112-8\' from "LOINC" display \'Birth date\'')

    cy.get(cqlComposer.cqlEditorSaveBtn).click()

    cy.get(cqlComposer.warningMessage).should('contain.text', 'The CQL file was saved with errors.')

    cy.get(measurelibrary.measureLibraryTab).click()

    helper.verifySpinnerAppearsAndDissappears()

  })
})
