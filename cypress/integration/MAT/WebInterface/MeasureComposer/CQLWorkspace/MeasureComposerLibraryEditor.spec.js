import * as helper from '../../../../../support/helpers'
import * as measurelibrary from '../../../../../pom/MAT/WI/MeasureLibrary'
import * as measureComposer from '../../../../../pom/MAT/WI/MeasureComposer'
import * as oktaLogin from '../../../../../support/oktaLogin'
import * as dataCreation from '../../../../../support/MAT/MeasureAndCQLLibraryCreation'
import * as gridRowActions from '../../../../../support/MAT/GridRowActions'
import * as cqlComposer from '../../../../../pom/MAT/WI/CQLComposer'

let fhirMeasure = ''
let qdmMeasure = ''

describe('Measure: CQL Editor message', () => {
  before('Login, Data creation', () => {

    oktaLogin.login()

    qdmMeasure = dataCreation.createDraftMeasure('QdmDraftMeasure', 'QDM')
    fhirMeasure = dataCreation.createDraftMeasure('FhirDraftMeasure', 'FHIR')

    helper.verifySpinnerAppearsAndDissappears()

    helper.logout()

  })
  beforeEach('Login', () => {
    oktaLogin.login()
  })
  afterEach('Log Out', () => {
    helper.logout()
  })

  it('QDM Measure: Validate the error message on CQL Editor', () => {
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
    cy.get(measureComposer.functionCQLExpressionEditorInput).type('.fhlsdfi')
    cy.get(measureComposer.functionSaveBtn).click()

    helper.verifySpinnerAppearsAndDissappears()

    cy.get(measureComposer.cqlLibraryEditor).click()
    helper.verifySpinnerAppearsAndDissappears()

    cy.get(measureComposer.warningMessage).should('contain.text', 'You are viewing the CQL file with validation errors. Errors are marked with a red square on the line number.')

    helper.verifySpinnerAppearsAndDissappears()

    cy.get(measurelibrary.measureLibraryTab).click()

    helper.verifySpinnerAppearsAndDissappears()

  })

  it('FHIR Measure: Validate the error message on CQL Editor', () => {
    helper.verifySpinnerAppearsAndDissappears()

    helper.enabledWithTimeout(measurelibrary.searchInputBox)
    helper.enterText(measurelibrary.searchInputBox, fhirMeasure)
    cy.get(measurelibrary.searchBtn).click()

    helper.verifySpinnerAppearsAndDissappears()

    gridRowActions.doubleClickRow(measurelibrary.row1MeasureSearch)

    helper.verifySpinnerAppearsAndDissappears()

    cy.get(measureComposer.cqlWorkspace).click()

    helper.verifySpinnerAppearsAndDissappears()

    cy.get(measureComposer.functionMeasureComposer).click()

    cy.get(measureComposer.functionNameInput).type('FunctionNameFHIR')
    cy.get(measureComposer.functionCQLExpressionEditorInput).type('.fhlsdfi')
    cy.get(measureComposer.functionSaveBtn).click()

    helper.verifySpinnerAppearsAndDissappears()

    cy.get(measureComposer.cqlLibraryEditor).click()
    helper.verifySpinnerAppearsAndDissappears()

    cy.get(cqlComposer.warningMessage).should('contain.text', 'The CQL does not conform to the ANTLR grammar: https://cql.hl7.org/grammar.html')
    cy.get(cqlComposer.warningMessage).should('contain.text', 'Until the CQL conforms, the tabs on the left for Includes, ValueSets, Codes, ' +
      'Parameters, Definitions, and Functions will be disabled.')
    cy.get(cqlComposer.warningMessage).should('contain.text', 'Commenting out offending defines and functions is an easy temporary fix.')

    helper.verifySpinnerAppearsAndDissappears()

    cy.get(measurelibrary.measureLibraryTab).click()

    helper.verifySpinnerAppearsAndDissappears()

  })
})

describe('FHIR Measure: Version error message', () => {
  before('Login, Data creation', () => {
    oktaLogin.login()

    fhirMeasure = dataCreation.createDraftMeasure('FhirDraftMeasure', 'FHIR')

    helper.logout()
  })
  beforeEach('Preserve Cookies', () => {
    oktaLogin.login()
  })
  afterEach('Log Out', () => {
    helper.logout()
  })

  it('FHIR Measure: Invalid version error message on CQL Editor', () => {
    helper.verifySpinnerAppearsAndDissappears()

    helper.enabledWithTimeout(measurelibrary.searchInputBox)
    helper.enterText(measurelibrary.searchInputBox, fhirMeasure)
    cy.get(measurelibrary.searchBtn).click()

    helper.verifySpinnerAppearsAndDissappears()

    gridRowActions.doubleClickRow(measurelibrary.row1MeasureSearch)

    helper.verifySpinnerAppearsAndDissappears()

    cy.get(measureComposer.cqlWorkspace).click()

    helper.verifySpinnerAppearsAndDissappears()

    // CQL Library Editor
    cy.get(measureComposer.cqlLibraryEditor).click()
    helper.verifySpinnerAppearsAndDissappears()
    cy.get(measureComposer.cqlLibraryEditorInput).type('{uparrow}{uparrow}{uparrow}{uparrow}{uparrow}{uparrow}{uparrow}{uparrow}{uparrow}include Hospice_FHIR4 version \'1.0\' called Hospice{enter}')
    cy.get(measureComposer.cqlEditorSaveBtn).click()

    helper.verifySpinnerAppearsAndDissappears()

    cy.get(cqlComposer.warningMessage).should('contain.text', 'The CQL does not conform to the ANTLR grammar: https://cql.hl7.org/grammar.html')
    cy.get(cqlComposer.warningMessage).should('contain.text', 'Until the CQL conforms, the tabs on the left for Includes, ValueSets, Codes, ' +
      'Parameters, Definitions, and Functions will be disabled.')
    cy.get(cqlComposer.warningMessage).should('contain.text', 'Commenting out offending defines and functions is an easy temporary fix.')

    cy.get(measurelibrary.measureLibraryTab).click()

    helper.verifySpinnerAppearsAndDissappears()

    cy.get(measurelibrary.measureLibraryTab).click()

    helper.verifySpinnerAppearsAndDissappears()

  })
})

describe('FHIR Measure: Add code directly on CQL Library Editor', () => {
  before('Login, Data creation', () => {
    oktaLogin.login()

    fhirMeasure = dataCreation.createDraftMeasure('FhirDraftMeasure', 'FHIR')

    helper.logout()
  })
  beforeEach('Login', () => {
    oktaLogin.login()
  })
  afterEach('Log Out', () => {
    helper.logout()
  })

  it('FHIR Measure: Validate the successful when editing directly on CQL Library Editor', () => {

    helper.verifySpinnerAppearsAndDissappears()

    helper.enabledWithTimeout(measurelibrary.searchInputBox)
    helper.enterText(measurelibrary.searchInputBox, fhirMeasure)
    cy.get(measurelibrary.searchBtn).click()

    helper.verifySpinnerAppearsAndDissappears()

    gridRowActions.doubleClickRow(measurelibrary.row1MeasureSearch)

    helper.verifySpinnerAppearsAndDissappears()

    cy.get(measureComposer.cqlWorkspace).click()

    helper.verifySpinnerAppearsAndDissappears()

    //CQL Library Editor

    cy.get(measureComposer.cqlLibraryEditor).click()

    cy.get(measureComposer.warningMessage).should('contain.text', 'You are viewing CQL with no validation errors.')

    helper.verifySpinnerAppearsAndDissappears()

    cy.get(measureComposer.cqlLibraryEditorInput).type('{uparrow}{uparrow}{uparrow}{uparrow}{uparrow}{uparrow}{uparrow}{uparrow}{uparrow}valueset "Annual Wellness Visit": \'http://cts.nlm.nih.gov/fhir/ValueSet/2.16.840.1.113883.3.526.3.1240\'{enter}')

    cy.get(measureComposer.cqlEditorSaveBtn).click()

    cy.get(measureComposer.warningMessage).should('contain.text', ' Changes to the CQL File have been successfully saved.')

    cy.get(measurelibrary.measureLibraryTab).click()

    helper.verifySpinnerAppearsAndDissappears()

  })
})

describe('FHIR Measure: Add codesystems and valusets without UMLS', () => {
  before('Login, Data Creation', () => {
    oktaLogin.loginWithoutUMLS()
    fhirMeasure = dataCreation.createDraftMeasure('FhirMeasure', 'FHIR')
    helper.verifySpinnerAppearsAndDissappears()

    helper.logout()
  })
  beforeEach('Login', () => {
    oktaLogin.loginWithoutUMLS()
  })
  afterEach('Log Out', () => {
    helper.logout()
  })

  it('Validate the error message for adding codesystems and valuesets without UMLS', () => {

    helper.verifySpinnerAppearsAndDissappears()

    helper.enabledWithTimeout(measurelibrary.searchInputBox)
    helper.enterText(measurelibrary.searchInputBox, fhirMeasure)

    cy.get(measurelibrary.searchBtn).click()

    helper.verifySpinnerAppearsAndDissappears()

    gridRowActions.doubleClickRow(measurelibrary.row1MeasureSearch)

    helper.verifySpinnerAppearsAndDissappears()

    cy.get(measureComposer.cqlWorkspace).click()

    helper.verifySpinnerAppearsAndDissappears()

    helper.waitToContainText(measureComposer.cqlWorkspaceTitleGeneralInformation, 'General Information')

    //CQL Library Editor
    cy.get(measureComposer.cqlLibraryEditor).click()

    helper.verifySpinnerAppearsAndDissappears()
    helper.verifySpinnerAppearsAndDissappears()

    cy.get(measureComposer.warningMessage).should('contain.text', 'You are viewing CQL with no validation errors.')

    cy.get(cqlComposer.cqlLibraryEditorBox).type('{downarrow}{downarrow}{downarrow}codesystem "LOINC": \'http://loinc.org\' version \'2.67\'{enter}')
    cy.get(cqlComposer.cqlLibraryEditorBox).type('{downarrow}code "Birth date": \'21112-8\' from "LOINC" display \'Birth date\'{enter}')
    cy.get(cqlComposer.cqlLibraryEditorBox).type('valueset "AAN - Encounter Codes Grouping": \'http://cts.nlm.nih.gov/fhir/ValueSet/2.16.840.1.113883.3.666.5.307\'{enter}')

    cy.get(cqlComposer.cqlEditorSaveBtn).click()

    cy.get(cqlComposer.warningMessage).should('contain.text', 'The CQL does not conform to the ANTLR grammar: https://cql.hl7.org/grammar.html')
    cy.get(cqlComposer.warningMessage).should('contain.text', 'Until the CQL conforms, the tabs on the left for Includes, ValueSets, Codes, ' +
      'Parameters, Definitions, and Functions will be disabled.')
    cy.get(cqlComposer.warningMessage).should('contain.text', 'Commenting out offending defines and functions is an easy temporary fix.')

    cy.get(measurelibrary.measureLibraryTab).click()

    helper.verifySpinnerAppearsAndDissappears()
  })
})


