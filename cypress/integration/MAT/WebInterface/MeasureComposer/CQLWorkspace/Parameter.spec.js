import * as helper from '../../../../../support/helpers'
import * as measurelibrary from '../../../../../pom/MAT/WI/MeasureLibrary'
import * as measureComposer from '../../../../../pom/MAT/WI/MeasureComposer'
import * as dataCreation from '../../../../../support/MAT/MeasureAndCQLLibraryCreation'
import * as gridRowActions from '../../../../../support/MAT/GridRowActions'
import * as login from '../../../../../support/MAT/Login'

let fhirMeasure = ''
let qdmMeasure = ''

describe('Measure Composer: CQL Workspace: Parameter', () => {
  before('Login, Data creation', () => {
    login.matLogin()

    qdmMeasure = dataCreation.createDraftMeasure('QdmDraftMeasure', 'QDM')
    fhirMeasure = dataCreation.createDraftMeasure('FhirDraftMeasure', 'FHIR')

    login.matLogout()
  })
  beforeEach('Login', () => {
    login.matLogin()
  })
  afterEach('Log Out', () => {
    login.matLogout()
  })
  it('QDM: Verify errors are coming from correct source', () => {

    helper.enabledWithTimeout(measurelibrary.searchInputBox)
    helper.enterText(measurelibrary.searchInputBox, qdmMeasure)
    cy.get(measurelibrary.searchBtn).click()

    helper.verifySpinnerAppearsAndDissappears()

    gridRowActions.doubleClickRow(measurelibrary.row1MeasureSearch)

    helper.verifySpinnerAppearsAndDissappears()

    cy.get(measureComposer.cqlWorkspace).click()

    helper.verifySpinnerAppearsAndDissappears()

    cy.get(measureComposer.parameter).click()

    helper.waitToContainText(measureComposer.cqlWorkspaceTitleGlobal2, 'Parameter')

    cy.get(measureComposer.parameterListbox).select('Measurement Period')
    cy.get('body').type('{enter}')

    cy.get(measureComposer.parameterNameInput).should('have.value', 'Measurement Period')
    cy.get(measureComposer.parameterEraseBtn).click()
    cy.get(measureComposer.parameterCQLExpressionEditorInput).type('sdffgsdffgsdfg', { delay: 50 })
    cy.get(measureComposer.parameterSaveBtn).click()

    helper.verifySpinnerAppearsAndDissappears()

    helper.visibleWithTimeout(measureComposer.warningMessage)

    //This error is specific to QDM and confirms we are getting errors from QDM source
    cy.get(measureComposer.editorLeftPanel).click()
    cy.get(measureComposer.editorErrorToolTip).should('contain.text', 'ERROR:A named type is required in this context.ERROR:class org.hl7.elm.r1.Null cannot be cast to class org.hl7.elm.r1.TypeSpecifier (org.hl7.elm.r1.Null and org.hl7.elm.r1.TypeSpecifier are in unnamed module of loader org.apache.catalina.loader.ParallelWebappClassLoader')

    cy.get(measurelibrary.measureLibraryTab).click()

    helper.verifySpinnerAppearsAndDissappears()

  })
  it('FHIR: Verify errors are coming from correct source', () => {

    helper.enabledWithTimeout(measurelibrary.searchInputBox)
    helper.enterText(measurelibrary.searchInputBox, fhirMeasure)
    cy.get(measurelibrary.searchBtn).click()

    helper.verifySpinnerAppearsAndDissappears()

    gridRowActions.doubleClickRow(measurelibrary.row1MeasureSearch)

    helper.verifySpinnerAppearsAndDissappears()

    cy.get(measureComposer.cqlWorkspace).click()

    helper.verifySpinnerAppearsAndDissappears()

    cy.get(measureComposer.parameter).click()

    helper.waitToContainText(measureComposer.cqlWorkspaceTitleGlobal2, 'Parameter')

    cy.get(measureComposer.parameterListbox).select('Measurement Period')
    cy.get('body').type('{enter}')

    cy.get(measureComposer.parameterEraseBtn).click()
    cy.get(measureComposer.parameterCQLExpressionEditorInput).type('sdffgsdffgsdfg', { delay: 50 })
    cy.get(measureComposer.parameterSaveBtn).click()

    helper.verifySpinnerAppearsAndDissappears()

    helper.visibleWithTimeout(measureComposer.warningMessage)

    //This error is specific to FHIR and confirms we are getting errors from FHIR source
    cy.get(measureComposer.editorLeftPanel).click()
    cy.get(measureComposer.editorErrorToolTip)
      .should('contain.text', 'ERROR:class org.hl7.elm.r1.Null cannot be cast to class org.hl7.elm.r1.TypeSpecifier (org.hl7.elm.r1.Null and org.hl7.elm.r1.TypeSpecifier are in unnamed module of loader org.springframework.boot.loader.LaunchedURLClassLoader')

    cy.get(measurelibrary.measureLibraryTab).click()

    helper.verifySpinnerAppearsAndDissappears()

  })

})
