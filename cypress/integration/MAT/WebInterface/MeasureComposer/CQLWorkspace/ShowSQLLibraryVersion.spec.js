import * as helper from '../../../../../support/helpers'
import * as measurelibrary from '../../../../../pom/MAT/WI/MeasureLibrary'
import * as measureComposer from '../../../../../pom/MAT/WI/MeasureComposer'
import * as oktaLogin from '../../../../../support/oktaLogin'
import * as dataCreation from '../../../../../support/MAT/MeasureAndCQLLibraryCreation'
import * as gridRowActions from '../../../../../support/MAT/GridRowActions'
import * as cqlComposer from '../../../../../pom/MAT/WI/CQLComposer'
import { equal, strictEqual } from 'assert'
import { shouldContainClick } from '../../../../../support/helpers'

let fhirMeasure = ''
let qdmMeasure = ''

describe('Measure: CQL Editor message', () => {
  before('Login, Data creation', () => {

    oktaLogin.login()

    qdmMeasure = dataCreation.createDraftMeasure('QDMCQLVersionNumber', 'QDM')
    fhirMeasure = dataCreation.createDraftMeasure('FHIRCQLVersionNumber', 'FHIR')

    helper.verifySpinnerAppearsAndDissappears()

    helper.logout()

  })
  beforeEach('Login', () => {
    oktaLogin.login()
  })
  afterEach('Log Out', () => {
    helper.logout()
  })

  it('QDM Measure: Verify the CQL Version Library Number in CQL Workspace for QDM Measure', () => {
    helper.verifySpinnerAppearsAndDissappears()

    helper.enabledWithTimeout(measurelibrary.searchInputBox)
    helper.enterText(measurelibrary.searchInputBox, qdmMeasure)
    cy.get(measurelibrary.searchBtn).click()

    helper.verifySpinnerAppearsAndDissappears()
    helper.verifySpinnerAppearsAndDissappears()
    helper.visibleWithTimeout(measurelibrary.row1MeasureSearch)
    gridRowActions.doubleClickRow(measurelibrary.row1MeasureSearch)

    helper.verifySpinnerAppearsAndDissappears()

    cy.get(measureComposer.cqlWorkspace).click()

    helper.verifySpinnerAppearsAndDissappears()

    cy.get(measureComposer.functionMeasureComposer).click()

    cy.get(measureComposer.functionNameInput).type('FunctionNameQDM')
    cy.get(measureComposer.functionCQLExpressionEditorInput).type('true')
    cy.get(measureComposer.functionSaveBtn).click()

    cy.get(measureComposer.generalInformation).click()
    // if('#libraryVersionValue_TextBox').shouldContainClick(0.0.000)
    // {
    //   cy.log('Showing correct Sql version number')
    // }
    // else
    // {
    //   cy.log('Showing incorrect Sql version number')
    // }

    helper.verifySpinnerAppearsAndDissappears()

    helper.verifySpinnerAppearsAndDissappears()

    cy.get(measurelibrary.measureLibraryTab).click()

    helper.verifySpinnerAppearsAndDissappears()

  })

  it('FHIR Measure: Verify the CQL Version Library Number in CQL Workspace for FHIR Measure', () => {
    helper.verifySpinnerAppearsAndDissappears()

    helper.enabledWithTimeout(measurelibrary.searchInputBox)
    helper.enterText(measurelibrary.searchInputBox, fhirMeasure)
    cy.get(measurelibrary.searchBtn).click()

    helper.verifySpinnerAppearsAndDissappears()
    helper.verifySpinnerAppearsAndDissappears()
    helper.visibleWithTimeout(measurelibrary.row1MeasureSearch)
    gridRowActions.doubleClickRow(measurelibrary.row1MeasureSearch)

    helper.verifySpinnerAppearsAndDissappears()

    cy.get(measureComposer.cqlWorkspace).click()

    helper.verifySpinnerAppearsAndDissappears()

    cy.get(measureComposer.functionMeasureComposer).click()

    cy.get(measureComposer.functionNameInput).type('FunctionNameFHIR')
    cy.get(measureComposer.functionCQLExpressionEditorInput).type('true')
    cy.get(measureComposer.functionSaveBtn).click()

    cy.get(measureComposer.generalInformation).click()

    helper.verifySpinnerAppearsAndDissappears()

    helper.verifySpinnerAppearsAndDissappears()

    cy.get(measurelibrary.measureLibraryTab).click()

    helper.verifySpinnerAppearsAndDissappears()

  })
})
