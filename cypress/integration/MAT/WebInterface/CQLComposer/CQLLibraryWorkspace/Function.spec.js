import * as helper from '../../../../../support/helpers'
import * as measurelibrary from '../../../../../pom/MAT/WI/MeasureLibrary'
import * as cqlLibrary from '../../../../../pom/MAT/WI/CqlLibrary'
import * as cqlComposer from '../../../../../pom/MAT/WI/CQLComposer'
import * as oktaLogin from '../../../../../support/oktaLogin'
import * as dataCreation from '../../../../../support/MAT/MeasureAndCQLLibraryCreation'
import * as gridRowActions from '../../../../../support/MAT/GridRowActions'

let fhirLibrary = ''
let qdmLibrary = ''

describe('CQL Library: Function Argument Lightbox', () => {

  before('Login', () => {
    oktaLogin.login()
    cy.get(measurelibrary.cqlLibraryTab).click()

    helper.verifySpinnerAppearsAndDissappears()

    qdmLibrary = dataCreation.createDraftCqlLibrary('qdmDraftLibrary', 'QDM')
    fhirLibrary = dataCreation.createDraftCqlLibrary('FhirDraftLibrary', 'FHIR')

    helper.verifySpinnerAppearsAndDissappears()
  })
  beforeEach('Preserve Cookies', () => {
    helper.preserveCookies()
  })
  after('Log Out', () => {
    helper.logout()
  })

  it('QDM Library: Validate the classes on Function Argument Lightbox', () => {

    helper.verifySpinnerAppearsAndDissappears()

    helper.enabledWithTimeout(cqlLibrary.searchInputBox)
    helper.enterText(cqlLibrary.searchInputBox, qdmLibrary)
    cy.get(cqlLibrary.searchBtn).click()

    helper.verifySpinnerAppearsAndDissappears()

    helper.visibleWithTimeout(cqlLibrary.row1CqlLibrarySearch)
    gridRowActions.doubleClickRow(cqlLibrary.row1CqlLibrarySearch)

    helper.verifySpinnerAppearsAndDissappears()

    cy.get(cqlComposer.functionCQLComposer).click()

    helper.waitToContainText(cqlComposer.cqlWorkspaceTitleGlobal2, 'Function')

    cy.get(cqlComposer.addArgument).click()

    cy.get(cqlComposer.availableDatatypesListBox).select('QDM Datatype')

    // Verify sub-classes display on Function Argument drop-down
    cy.get(cqlComposer.datatypeObjectListBox).select('Immunization, Not Administered')
      .invoke('val').should('deep.equal', 'Immunization, Not Administered')

    cy.get(cqlComposer.datatypeObjectListBox).select('Substance, Not Recommended')
      .invoke('val').should('deep.equal', 'Substance, Not Recommended')

    cy.get(cqlComposer.argumentNameInput).type('Encounter')

    cy.get(cqlComposer.addBtn).click()

    helper.verifySpinnerAppearsAndDissappears()

    cy.get(cqlComposer.functionNameInput).type('Test')
    cy.get(cqlComposer.functionCQLExpressionEditorInput).type('true')
    cy.get(cqlComposer.functionSaveBtn).click()

    helper.verifySpinnerAppearsAndDissappears()
    helper.verifySpinnerAppearsAndDissappears()

    helper.waitToContainText(cqlComposer.warningMessage, 'Function Test successfully saved.')

    cy.get(cqlComposer.cqlLibraryEditor).click()

    helper.verifySpinnerAppearsAndDissappears()

    helper.waitToContainText(cqlComposer.warningMessage, 'You are viewing CQL with no validation errors.')

    cy.get(measurelibrary.cqlLibraryTab).click()

    helper.verifySpinnerAppearsAndDissappears()
    helper.verifySpinnerAppearsAndDissappears()

  })

  it('FHIR Library: Validate the classes on Function Argument Lightbox', () => {

    helper.verifySpinnerAppearsAndDissappears()

    helper.enabledWithTimeout(cqlLibrary.searchInputBox)
    helper.enterText(cqlLibrary.searchInputBox, fhirLibrary)
    cy.get(cqlLibrary.searchBtn).click()

    helper.verifySpinnerAppearsAndDissappears()

    helper.visibleWithTimeout(cqlLibrary.row1CqlLibrarySearch)
    gridRowActions.doubleClickRow(cqlLibrary.row1CqlLibrarySearch)

    helper.verifySpinnerAppearsAndDissappears()

    cy.get(cqlComposer.cqlLibraryDescription).type('CQL Library Description text')

    cy.get(cqlComposer.publisher).select('SemanticBits')

    cy.get(cqlComposer.saveBtn).click()

    helper.verifySpinnerAppearsAndDissappears()

    cy.get(cqlComposer.functionCQLComposer).click()

    helper.waitToContainText(cqlComposer.cqlWorkspaceTitleGlobal2, 'Function')

    cy.get(cqlComposer.addArgument).click()

    cy.get(cqlComposer.availableDatatypesListBox).select('FHIR Datatype')

    // Verify only main-classes display on Function Argument drop-down
    cy.get(cqlComposer.datatypeObjectListBox).select('AdverseEvent')
      .invoke('val').should('deep.equal', 'AdverseEvent')

    cy.get(cqlComposer.datatypeObjectListBox).select('AllergyIntolerance')
      .invoke('val').should('deep.equal', 'AllergyIntolerance')

    cy.get(cqlComposer.datatypeObjectListBox).select('Task')
      .invoke('val').should('deep.equal', 'Task')

    cy.get(cqlComposer.argumentNameInput).type('Encounter')

    cy.get(cqlComposer.addBtn).click()

    helper.verifySpinnerAppearsAndDissappears()

    cy.get(cqlComposer.functionNameInput).type('Test')
    cy.get(cqlComposer.functionCQLExpressionEditorInput).type('true')
    cy.get(cqlComposer.functionSaveBtn).click()

    helper.verifySpinnerAppearsAndDissappears()
    helper.verifySpinnerAppearsAndDissappears()

    helper.waitToContainText(cqlComposer.warningMessage, 'Function Test successfully saved.')

    cy.get(cqlComposer.cqlLibraryEditor).click()

    helper.verifySpinnerAppearsAndDissappears()

    helper.waitToContainText(cqlComposer.warningMessage, 'You are viewing CQL with no validation errors.')

    cy.get(measurelibrary.cqlLibraryTab).click()

    helper.verifySpinnerAppearsAndDissappears()
    helper.verifySpinnerAppearsAndDissappears()

  })
})

describe('CQL Library: Function Insert Attribute Lightbox', () => {

  before('Login', () => {
    oktaLogin.login()
    cy.get(measurelibrary.cqlLibraryTab).click()

    helper.verifySpinnerAppearsAndDissappears()

    qdmLibrary = dataCreation.createDraftCqlLibrary('qdmDraftLibrary', 'QDM')
    fhirLibrary = dataCreation.createDraftCqlLibrary('FhirDraftLibrary', 'FHIR')

    helper.verifySpinnerAppearsAndDissappears()
  })
  beforeEach('Preserve Cookies', () => {
    helper.preserveCookies()
  })
  after('Log Out', () => {
    helper.logout()
  })

  it('QDM Library: Validate the classes on Function Insert Attribute Lightbox', () => {

    helper.verifySpinnerAppearsAndDissappears()

    helper.enabledWithTimeout(cqlLibrary.searchInputBox)
    helper.enterText(cqlLibrary.searchInputBox, qdmLibrary)
    cy.get(cqlLibrary.searchBtn).click()

    helper.verifySpinnerAppearsAndDissappears()

    helper.visibleWithTimeout(cqlLibrary.row1CqlLibrarySearch)
    gridRowActions.doubleClickRow(cqlLibrary.row1CqlLibrarySearch)

    helper.verifySpinnerAppearsAndDissappears()

    cy.get(cqlComposer.functionCQLComposer).click()

    helper.waitToContainText(cqlComposer.cqlWorkspaceTitleGlobal2, 'Function')

    cy.get(cqlComposer.insertBtn).click()

    cy.get(cqlComposer.selectItemType).select('Attributes')

    // Verify sub-classes display on Function Insert Attribute drop-down
    cy.get(cqlComposer.selectAttributesDataType).select('Immunization, Not Administered')
      .invoke('val').should('deep.equal', 'Immunization, Not Administered')

    cy.get(cqlComposer.selectAttributesDataType).select('Substance, Not Recommended')
      .invoke('val').should('deep.equal', 'Substance, Not Recommended')

    cy.get(cqlComposer.attributeCancelBtn).click()

    helper.verifySpinnerAppearsAndDissappears()

    cy.get(measurelibrary.cqlLibraryTab).click()

    helper.verifySpinnerAppearsAndDissappears()
    helper.verifySpinnerAppearsAndDissappears()

  })

  it('FHIR Library: Validate the classes on Function Insert Attribute Lightbox', () => {

    helper.verifySpinnerAppearsAndDissappears()

    helper.enabledWithTimeout(cqlLibrary.searchInputBox)
    helper.enterText(cqlLibrary.searchInputBox, fhirLibrary)
    cy.get(cqlLibrary.searchBtn).click()

    helper.verifySpinnerAppearsAndDissappears()

    helper.visibleWithTimeout(cqlLibrary.row1CqlLibrarySearch)
    gridRowActions.doubleClickRow(cqlLibrary.row1CqlLibrarySearch)

    helper.verifySpinnerAppearsAndDissappears()

    cy.get(cqlComposer.cqlLibraryDescription).type('CQL Library Description text')

    cy.get(cqlComposer.publisher).select('SemanticBits')

    cy.get(cqlComposer.saveBtn).click()

    helper.verifySpinnerAppearsAndDissappears()

    cy.get(cqlComposer.functionCQLComposer).click()

    helper.waitToContainText(cqlComposer.cqlWorkspaceTitleGlobal2, 'Function')

    cy.get(cqlComposer.insertBtn).click()

    cy.get(cqlComposer.selectItemType).select('Attributes')

    // Verify sub-classes display on Function Insert Attribute drop-down
    cy.get(cqlComposer.selectAttributesDataType).select('AdverseEvent.SuspectEntity')
      .invoke('val').should('deep.equal', 'AdverseEvent.SuspectEntity')

    cy.get(cqlComposer.selectAttributesDataType).select('CareTeam.Participant')
      .invoke('val').should('deep.equal', 'CareTeam.Participant')

    cy.get(cqlComposer.selectAttributesDataType).select('Encounter.Diagnosis')
      .invoke('val').should('deep.equal', 'Encounter.Diagnosis')

    cy.get(cqlComposer.attributeCancelBtn).click()
    cy.get(cqlComposer.attributeCancelBtn).click()

    helper.verifySpinnerAppearsAndDissappears()

    cy.get(measurelibrary.cqlLibraryTab).click()

    helper.verifySpinnerAppearsAndDissappears()

  })
})
