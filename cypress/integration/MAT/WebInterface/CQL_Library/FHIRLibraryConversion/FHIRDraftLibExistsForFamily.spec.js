import * as helper from '../../../../../support/helpers'
import * as cqlLibrary from '../../../../../pom/MAT/WI/CqlLibrary'
import * as measureLibrary from '../../../../../pom/MAT/WI/MeasureLibrary'
import * as oktaLogin from '../../../../../support/oktaLogin'
import * as dataCreation from '../../../../../support/MAT/MeasureAndCQLLibraryCreation'
import * as gridRowActions from '../../../../../support/MAT/GridRowActions'

let libraryName = ''

describe('CQL Library: Validate Scenario 2 Conversion to FHIR', () => {
  before('Login', () => {
    oktaLogin.login()

    helper.verifySpinnerAppearsAndDissappears()

    libraryName = dataCreation.createDraftCqlLibrary('qdmCqlLibrary', 'QDM')

    helper.verifySpinnerAppearsAndDissappears()

  })
  beforeEach('Preserve Cookies', () => {
    helper.preserveCookies()
  })
  after('Log Out', () => {
    helper.logout()
  })

  it('Scenario 2: FHIR/CQL draft Library exists for that family', () => {

    helper.verifySpinnerAppearsAndDissappears()

    // Versioning First library
    helper.enabledWithTimeout(cqlLibrary.searchInputBox)
    helper.enterText(cqlLibrary.searchInputBox, libraryName)
    cy.get(cqlLibrary.searchBtn).click()

    helper.verifySpinnerAppearsAndDissappears()

    helper.visibleWithTimeout(cqlLibrary.row1CqlLibrarySearch)
    gridRowActions.selectRow(cqlLibrary.row1CqlLibrarySearch)

    cy.get(cqlLibrary.createVersionCqllibrariesBtn).click()
    cy.get(cqlLibrary.majorVersionTypeRadio).click()
    cy.get(cqlLibrary.versionSaveAndContinueBtn).click()

    helper.verifySpinnerAppearsAndDissappears()

    // Create First Draft library
    helper.visibleWithTimeout(cqlLibrary.row1CqlLibrarySearch)
    gridRowActions.selectRow(cqlLibrary.row1CqlLibrarySearch)
    cy.get(cqlLibrary.createDraftCqllibrariesBtn).click()

    helper.verifySpinnerAppearsAndDissappears()

    cy.get('h1').should('contain.text', 'My CQL Library > Draft CQL Library')

    cy.get(cqlLibrary.draftSaveAndContinueBtn).click()
    cy.get(cqlLibrary.confirmationContinue).click()

    cy.get(measureLibrary.cqlLibraryTab).click()

    helper.verifySpinnerAppearsAndDissappears()

    helper.enabledWithTimeout(cqlLibrary.searchInputBox)
    helper.enterText(cqlLibrary.searchInputBox, libraryName)
    cy.get(measureLibrary.cqlLibraryTab).click()

    helper.verifySpinnerAppearsAndDissappears()
    helper.verifySpinnerAppearsAndDissappears()

    // Versioning draft library
    helper.enabledWithTimeout(cqlLibrary.searchInputBox)
    helper.visibleWithTimeout(cqlLibrary.row1CqlLibrarySearch)
    gridRowActions.selectRow(cqlLibrary.row1CqlLibrarySearch)
    cy.get(cqlLibrary.createVersionCqllibrariesBtn).click()
    cy.get(cqlLibrary.majorVersionTypeRadio).click()
    cy.get(cqlLibrary.versionSaveAndContinueBtn).click()

    helper.verifySpinnerAppearsAndDissappears()

    cy.get(measureLibrary.cqlLibraryTab).click()

    helper.verifySpinnerAppearsAndDissappears()

    // Convert First library to FHIR
    helper.visibleWithTimeout(cqlLibrary.row1CqlLibrarySearch)
    helper.enabledWithTimeout(cqlLibrary.searchInputBox)
    gridRowActions.selectRow(cqlLibrary.row1CqlLibrarySearch)
    cy.get(cqlLibrary.convertToFhirLibrarySearchBtn).click()

    helper.verifySpinnerAppearsAndDissappears()
    helper.verifySpinnerAppearsAndDissappears()

    // Convert Second library to FHIR
    helper.visibleWithTimeout(cqlLibrary.row3CqlLibrarySearch)
    gridRowActions.selectRow(cqlLibrary.row3CqlLibrarySearch)
    cy.get(cqlLibrary.convertToFhirLibrarySearchBtn).click()

    // FHIR Warning Dialog
    cy.get(cqlLibrary.fhirConversionWarningMessage).should('contain.text', ' Are you sure you want to convert this Cql Library again? The existing FHIR Library will be overwritten.')
    cy.get(cqlLibrary.fhirConversionReturnBtn).click()

  })
})
