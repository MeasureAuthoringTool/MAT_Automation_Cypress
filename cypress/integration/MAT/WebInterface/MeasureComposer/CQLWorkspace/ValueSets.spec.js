import * as helper from '../../../../../support/helpers'
import * as measurelibrary from '../../../../../pom/MAT/WI/MeasureLibrary'
import * as measureComposer from '../../../../../pom/MAT/WI/MeasureComposer'
import * as oktaLogin from '../../../../../support/oktaLogin'
import * as dataCreation from '../../../../../support/MAT/MeasureAndCQLLibraryCreation'
import * as gridRowActions from '../../../../../support/MAT/GridRowActions'

let fhirMeasure = ''
let qdmMeasure = ''

describe('CQL Editor: Validate the Valueset Format', () => {
  before('Login', () => {
    oktaLogin.login()

    fhirMeasure = dataCreation.createDraftMeasure('FhirDraftMeasure', 'FHIR')

  })
  beforeEach('Preserve Cookies', () => {
    helper.preserveCookies()
  })
  after('Log Out', () => {
    helper.logout()
  })

  it('FHIR Measure: Valueset Format', () => {

    helper.enterText(measurelibrary.searchInputBox, fhirMeasure)
    cy.get(measurelibrary.searchBtn).click()

    helper.verifySpinnerAppearsAndDissappears()

    gridRowActions.doubleClickRow(measurelibrary.row1MeasureSearch)

    helper.verifySpinnerAppearsAndDissappears()

    cy.get(measureComposer.cqlWorkspace).click()

    helper.verifySpinnerAppearsAndDissappears()

    // Add OID on Value Sets
    cy.get(measureComposer.valueSets).click()
    helper.verifySpinnerAppearsAndDissappears()
    cy.get(measureComposer.OIDInput).type('2.16.840.1.113883.3.666.5.307')
    cy.get(measureComposer.retrieveOIDBtn).click()
    helper.verifySpinnerAppearsAndDissappears()
    cy.get(measureComposer.warningMessage).should('contain.text', 'Value set Encounter Inpatient successfully retrieved from VSAC.')
    cy.get(measureComposer.applyBtn).click()
    cy.get(measureComposer.warningMessage).should('contain.text', 'Value set Encounter Inpatient has been successfully applied.')

    // CQL Library Editor
    cy.get(measureComposer.cqlLibraryEditor).click()
    helper.verifySpinnerAppearsAndDissappears()
    cy.get(measureComposer.cqlLibraryEditorInput).should('contain.text', 'http://cts.nlm.nih.gov/fhir/ValueSet/2.16.840.1.113883.3.666.5.307')

    cy.get(measurelibrary.measureLibraryTab).click()

    helper.verifySpinnerAppearsAndDissappears()
  })
})

describe('Measure Composer:CQLWorkspace: Add Value Sets', () => {
  before('Login', () => {
    oktaLogin.login()

    qdmMeasure = dataCreation.createDraftMeasure('QDmDraftMeasure', 'QDM')

  })
  beforeEach('Preserve Cookies', () => {
    helper.preserveCookies()
  })
  after('Log Out', () => {
    helper.logout()
  })

  it('QDM Measure: Add Draft Value Set successfully', () => {

    helper.enterText(measurelibrary.searchInputBox, qdmMeasure)
    cy.get(measurelibrary.searchBtn).click()

    helper.verifySpinnerAppearsAndDissappears()

    gridRowActions.doubleClickRow(measurelibrary.row1MeasureSearch)

    helper.verifySpinnerAppearsAndDissappears()

    cy.get(measureComposer.cqlWorkspace).click()

    helper.verifySpinnerAppearsAndDissappears()

    cy.get(measureComposer.valueSets).click()
    helper.verifySpinnerAppearsAndDissappears()
    cy.get(measureComposer.OIDInput).type('2.16.840.1.113762.1.4.1217.1')
    cy.get(measureComposer.retrieveOIDBtn).click()
    helper.verifySpinnerAppearsAndDissappears()

    cy.get(measureComposer.warningMessage).should('contain.text', 'Value set TestTelehealth successfully retrieved from VSAC.')
    cy.get(measureComposer.applyBtn).click()
    cy.get(measureComposer.warningMessage).should('contain.text', 'Value set TestTelehealth has been successfully applied.')

    cy.get(measureComposer.cqlLibraryEditor).click()

    helper.verifySpinnerAppearsAndDissappears()

    helper.waitToContainText(measureComposer.warningMessage, 'You are viewing CQL with no validation errors.')
    cy.get(measureComposer.cqlLibraryEditorInput).should('contain.text', 'TestTelehealth')
    cy.get(measureComposer.cqlLibraryEditorInput).should('contain.text', '2.16.840.1.113762.1.4.1217.1')
    cy.get(measurelibrary.measureLibraryTab).click()

    helper.verifySpinnerAppearsAndDissappears()

    cy.get(measurelibrary.measureLibraryTab).click()

    helper.verifySpinnerAppearsAndDissappears()
  })

  it('QDM Measure: Add Published Value Set with Program and Release Successfully', () => {

    helper.enterText(measurelibrary.searchInputBox, qdmMeasure)
    cy.get(measurelibrary.searchBtn).click()

    helper.verifySpinnerAppearsAndDissappears()

    gridRowActions.doubleClickRow(measurelibrary.row1MeasureSearch)

    helper.verifySpinnerAppearsAndDissappears()

    cy.get(measureComposer.cqlWorkspace).click()

    helper.verifySpinnerAppearsAndDissappears()

    // Add OID on Value Sets
    cy.get(measureComposer.valueSets).click()

    helper.verifySpinnerAppearsAndDissappears()

    cy.get(measureComposer.OIDInput).type('2.16.840.1.113883.3.464.1003.101.12.1061')
    cy.get(measureComposer.programListBox).select('CMS eCQM and Hybrid Measure')
    cy.get(measureComposer.releaseListBox).select('MU2 Update 2012-10-25')
    cy.get(measureComposer.retrieveOIDBtn).click()

    helper.verifySpinnerAppearsAndDissappears()

    cy.get(measureComposer.warningMessage).should('contain.text', 'Value set Ambulatory/ED Visit successfully retrieved from VSAC.')
    cy.get(measureComposer.applyBtn).click()
    cy.get(measureComposer.warningMessage).should('contain.text', 'Value set Ambulatory/ED Visit has been successfully applied.')

    //Applied value set table verification

    cy.get(measureComposer.row1AppliedQDMTable).should('contain.text', 'Ambulatory/ED Visit (G)')
    cy.get(measureComposer.row1AppliedQDMTable).should('contain.text', '2.16.840.1.113883.3.464.1003.101.12.1061')
    cy.get(measureComposer.row1AppliedQDMTable).should('contain.text', 'CMS eCQM and Hybrid Measure')
    cy.get(measureComposer.row1AppliedQDMTable).should('contain.text', 'MU2 Update 2012-10-25')

    cy.get(measureComposer.cqlLibraryEditor).click()

    helper.verifySpinnerAppearsAndDissappears()

    helper.waitToContainText(measureComposer.warningMessage, 'You are viewing CQL with no validation errors.')
    cy.get(measureComposer.cqlLibraryEditorInput).should('contain.text', 'Ambulatory')
    cy.get(measureComposer.cqlLibraryEditorInput).should('contain.text', 'urn:oid:2.16.840.1.113883.3.464.1003.101.12.1061')

    cy.get(measurelibrary.measureLibraryTab).click()

    helper.verifySpinnerAppearsAndDissappears()
  })
})
