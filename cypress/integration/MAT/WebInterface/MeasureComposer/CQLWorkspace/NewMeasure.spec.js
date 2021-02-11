import * as helper from '../../../../../support/helpers'
import * as measurelibrary from '../../../../../pom/MAT/WI/MeasureLibrary'
import * as measureComposer from '../../../../../pom/MAT/WI/MeasureComposer'
import * as oktaLogin from '../../../../../support/oktaLogin'
import * as dataCreation from '../../../../../support/MAT/MeasureAndCQLLibraryCreation'
import * as gridRowActions from '../../../../../support/MAT/GridRowActions'

let qdmMeasure = ''

describe('Measure Composer: CQL Workspace: New Measure', () => {
  before('Login, data Creation', () => {
    oktaLogin.login()

    qdmMeasure = dataCreation.createDraftMeasure('FhirDraftMeasure', 'QDM')

    helper.logout()
  })
  beforeEach('Login', () => {
    oktaLogin.login()
  })
  afterEach('Log Out', () => {
    helper.logout()
  })

  it('QDM Measure: Validate no errors are displayed on a new measure after clicking save', () => {

    helper.visibleWithTimeout(measurelibrary.searchInputBox)
    helper.enterText(measurelibrary.searchInputBox, qdmMeasure)
    cy.get(measurelibrary.searchBtn).click()

    helper.verifySpinnerAppearsAndDissappears()

    gridRowActions.doubleClickRow(measurelibrary.row1MeasureSearch)

    helper.verifySpinnerAppearsAndDissappears()

    cy.get(measureComposer.cqlWorkspace).click()

    helper.verifySpinnerAppearsAndDissappears()

    cy.get(measureComposer.cqlLibraryEditor).click()

    helper.verifySpinnerAppearsAndDissappears()

    cy.get(measureComposer.cqlEditorSaveBtn).click()

    helper.verifySpinnerAppearsAndDissappears()

    cy.get(measureComposer.warningMessage).should('contain.text', 'Changes to the CQL File have been successfully saved.')
  })
})
