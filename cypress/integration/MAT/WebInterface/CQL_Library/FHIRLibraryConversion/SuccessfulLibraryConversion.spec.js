import * as helper from '../../../../../support/helpers'
import * as cqlLibrary from '../../../../../pom/MAT/WI/CqlLibrary'
import * as dataCreation from '../../../../../support/MAT/MeasureAndCQLLibraryCreation'
import * as gridRowActions from '../../../../../support/MAT/GridRowActions'
import * as cqlLibraryHelper from '../../../../../support/MAT/CqlLibraryHelper'
import * as login from '../../../../../support/MAT/Login'

let qdmCqlLibraryName = ''

describe('CQL Library: FHIR Library Conversion: Successful Conversion to FHIR', () => {
  beforeEach('Login', () => {
    login.matLogin()
  })
  after('Clean Up', () => {
    login.matLogin()
    cqlLibraryHelper.deleteCqlLibrary(qdmCqlLibraryName + 'FHIR')
    login.matLogout()
  })
  afterEach('Log Out', () => {
    login.matLogout()
  })

  it('Convert QDM CQL Library to FHIR successfully', () => {
    qdmCqlLibraryName = dataCreation.createDraftCqlLibrary('QdmCqlLibrary', 'QDM')
    // Search for created draft QDM lib
    helper.enabledWithTimeout(cqlLibrary.searchInputBox)
    helper.enterText(cqlLibrary.searchInputBox, qdmCqlLibraryName)
    cy.get(cqlLibrary.searchBtn).click()

    helper.verifySpinnerAppearsAndDissappears()

    helper.visibleWithTimeout(cqlLibrary.row1CqlLibrarySearch)

    // assert model version for QDM Library
    cy.get(cqlLibrary.cqlLibrarySearchTable).should('contain.text', 'Model Version')
    cy.get(cqlLibrary.row1CqlLibraryModelVersion).should('contain.text', '5.6')

    // Select the Qdm Cql library created and version it
    gridRowActions.selectRow(cqlLibrary.row1CqlLibrarySearch)
    cqlLibraryHelper.createCqlLibraryVersionAndVerify()

    cqlLibraryHelper.convertCqlLibraryToFHIRAndVerify(qdmCqlLibraryName)
  })

  it('Verify FHIR reconversion and cql library history', () => {
    gridRowActions.selectRow(cqlLibrary.row2CqlLibrarySearch)
    helper.disabledWithTimeout(cqlLibrary.convertToFhirLibrarySearchBtn)

    cy.get(cqlLibrary.editCqllibrariesEnabledBtn).should('be.visible')

    cy.get(cqlLibrary.historyCqllibrariesBtn).click()

    // verifying the log entries
    helper.visibleWithTimeout(cqlLibrary.historyConvertToFHIRUserActionLogEntry)
    helper.visibleWithTimeout(cqlLibrary.historyCQLLibraryCreatedUserActionLogEntry)

    cy.get(cqlLibrary.returnToCqlLibrary).click()

    helper.verifySpinnerAppearsAndDissappears()
  })

  it('Verify QDM Cql library reconversion and Cql library history', () => {
    // Verify to see if reconversion is disabled
    gridRowActions.selectRow(cqlLibrary.row1CqlLibrarySearch)
    helper.disabledWithTimeout(cqlLibrary.convertToFhirLibrarySearchBtn)

    cy.get(cqlLibrary.historyCqllibrariesBtn).click()

    // verifying the log entries
    helper.visibleWithTimeout(cqlLibrary.historyConvertToFHIRUserActionLogEntry)

    cy.get(cqlLibrary.returnToCqlLibrary).click()

    helper.verifySpinnerAppearsAndDissappears()
  })

  it('Delete converted FHIR library and reconvert', () => {
    cqlLibraryHelper.deleteCqlLibrary(qdmCqlLibraryName + 'FHIR')

    helper.verifySpinnerAppearsAndDissappears()

    gridRowActions.selectRow(cqlLibrary.row1CqlLibrarySearch)
    cqlLibraryHelper.convertCqlLibraryToFHIRAndVerify(qdmCqlLibraryName)
  })
})
