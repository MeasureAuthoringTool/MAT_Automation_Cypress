import * as helper from '../../../../../support/helpers'
import * as cqlLibrary from '../../../../../pom/MAT/WI/CqlLibrary'
import * as dataCreation from '../../../../../support/MAT/MeasureAndCQLLibraryCreation'
import * as gridRowActions from '../../../../../support/MAT/GridRowActions'
import * as cqlLibraryHelper from '../../../../../support/MAT/CqlLibraryHelper'
import * as login from '../../../../../support/MAT/Login'
import * as measurelibrary from '../../../../../pom/MAT/WI/MeasureLibrary'

let qdmCqlLibraryName = ''

describe('CQL Library: FHIR Library Conversion: Successful Conversion to FHIR', () => {
  beforeEach('Login', () => {
    login.matLogin()

    cy.get(measurelibrary.cqlLibraryTab).click()

    helper.verifySpinnerAppearsAndDissappears()
  })
  afterEach('Log Out', () => {
    login.matLogout()
  })

  it('Convert QDM CQL Library to FHIR successfully and reconversion', () => {
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

    //Verify FHIR reconversion and cql library history
    cy.get(cqlLibrary.row1RecentActivity).then(elm => {

      if (Cypress.$(elm).length === 2) {
        helper.verifySpinnerAppearsAndDissappears()
        cy.get(cqlLibrary.row1RecentActivity).eq(1).click()
      } else {
        helper.verifySpinnerAppearsAndDissappears()
        cy.get(cqlLibrary.row1RecentActivity).click()
      }

    })

    helper.disabledWithTimeout(cqlLibrary.convertToFHIRRecentActivityBtn)

    cy.get(cqlLibrary.editRecentActivityEnabledBtn).should('be.visible')
    cy.get(cqlLibrary.historyRecentActivityBtn).click()

    helper.verifySpinnerAppearsAndDissappears()
    helper.verifySpinnerAppearsAndDissappears()

    // verifying the log entries
    helper.visibleWithTimeout(cqlLibrary.historyConvertToFHIRUserActionLogEntry, 100000)
    helper.visibleWithTimeout(cqlLibrary.historyCQLLibraryCreatedUserActionLogEntry)

    cy.get(cqlLibrary.returnToCqlLibrary).click()

    helper.verifySpinnerAppearsAndDissappears()

    //Delete and reconvert

    helper.enabledWithTimeout(cqlLibrary.searchInputBox, 200000)
    helper.enterText(cqlLibrary.searchInputBox, qdmCqlLibraryName)
    cy.get(cqlLibrary.searchBtn).click()

    helper.verifySpinnerAppearsAndDissappears()
    cqlLibraryHelper.deleteCqlLibrary(qdmCqlLibraryName + 'FHIR')

    helper.verifySpinnerAppearsAndDissappears()

    gridRowActions.selectRow(cqlLibrary.row1CqlLibrarySearch)
    cqlLibraryHelper.convertCqlLibraryToFHIRAndVerify(qdmCqlLibraryName)

  })
})
