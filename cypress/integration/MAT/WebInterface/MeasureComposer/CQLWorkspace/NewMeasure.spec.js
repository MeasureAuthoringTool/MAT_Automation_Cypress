import * as helper from '../../../../../support/helpers'
import * as measurelibrary from '../../../../../pom/MAT/WI/MeasureLibrary'
import * as measureComposer from '../../../../../pom/MAT/WI/MeasureComposer'
import * as dataCreation from '../../../../../support/MAT/MeasureAndCQLLibraryCreation'
import * as gridRowActions from '../../../../../support/MAT/GridRowActions'
import * as login from '../../../../../support/MAT/Login'

let qdmMeasure = ''

describe('Measure Composer: CQL Workspace: New Measure', () => {
  before('Login, data Creation', () => {
    login.matLogin()

    qdmMeasure = dataCreation.createDraftMeasure('FhirDraftMeasure', 'QDM')

    login.matLogout()
  })
  beforeEach('Login', () => {
    login.matLogin()
  })
  afterEach('Log Out', () => {
    login.matLogout()
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
