import * as helper from '../../../../../support/helpers'
import * as cqlLibrary from '../../../../../pom/MAT/WI/CqlLibrary'
import * as oktaLogin from '../../../../../support/oktaLogin'
import * as dataCreation from '../../../../../support/MAT/MeasureAndCQLLibraryCreation'
import * as gridRowActions from '../../../../../support/MAT/GridRowActions'

let libraryName = ''

describe('CQL Library: Validate Scenario 3b Conversion to FHIR', () => {
  before('Login', () => {
    oktaLogin.login()

    libraryName = dataCreation.createDraftCqlLibrary('qdmCqlLibrary', 'QDM')

    helper.verifySpinnerAppearsAndDissappears()
  })
  beforeEach('Preserve Cookies', () => {
    helper.preserveCookies()
  })
  after('Log Out', () => {
    helper.logout()
  })

  it('Scenario 3b: Reconverting QDM library: Warning message', () => {

    helper.enabledWithTimeout(cqlLibrary.searchInputBox)
    helper.enterText(cqlLibrary.searchInputBox, libraryName)
    cy.get(cqlLibrary.searchBtn).click()

    helper.verifySpinnerAppearsAndDissappears()
    helper.verifySpinnerAppearsAndDissappears()

    helper.visibleWithTimeout(cqlLibrary.row1CqlLibrarySearch)
    gridRowActions.selectRow(cqlLibrary.row1CqlLibrarySearch)

    cy.get(cqlLibrary.createVersionCqllibrariesBtn).click()
    cy.get(cqlLibrary.majorVersionTypeRadio).click()
    cy.get(cqlLibrary.versionSaveAndContinueBtn).click()

    helper.verifySpinnerAppearsAndDissappears()
    helper.verifySpinnerAppearsAndDissappears()

    cy.wait(2000)
    helper.visibleWithTimeout(cqlLibrary.row1CqlLibrarySearch)
    gridRowActions.selectRow(cqlLibrary.row1CqlLibrarySearch)
    cy.get(cqlLibrary.convertToFhirLibrarySearchBtn).click()

    helper.verifySpinnerAppearsAndDissappears()
    helper.verifySpinnerAppearsAndDissappears()

    helper.visibleWithTimeout(cqlLibrary.row2CqlLibrarySearch)
    gridRowActions.selectRow(cqlLibrary.row2CqlLibrarySearch)
    cy.get(cqlLibrary.convertToFhirLibrarySearchBtn).click()

    cy.get(cqlLibrary.modal).should('contain.text', 'Are you sure you want to convert this Cql Library again? The existing FHIR Library will be overwritten.')
    cy.get(cqlLibrary.fhirConversionReturnBtn).click()

  })

})
