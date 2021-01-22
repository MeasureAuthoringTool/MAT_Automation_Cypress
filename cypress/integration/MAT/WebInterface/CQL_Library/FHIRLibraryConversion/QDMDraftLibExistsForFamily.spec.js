import * as helper from '../../../../../support/helpers'
import * as cqlLibrary from '../../../../../pom/MAT/WI/CqlLibrary'
import * as measureLibrary from '../../../../../pom/MAT/WI/MeasureLibrary'
import * as oktaLogin from '../../../../../support/oktaLogin'
import * as dataCreation from '../../../../../support/MAT/MeasureAndCQLLibraryCreation'
import * as gridRowActions from '../../../../../support/MAT/GridRowActions'

let libraryName = ''

describe('CQL Library: Validate Scenario 1 Conversion to FHIR', () => {
  before('Login', () => {
    oktaLogin.login()

    libraryName = dataCreation.createDraftCqlLibrary('qdmCqlLibrary', 'QDM')
  })
  beforeEach('Preserve Cookies', () => {
    helper.preserveCookies()
  })
  after('Log Out', () => {
    helper.logout()
  })

  it('Scenario 1: QDM/CQL draft Library exists for that family', () => {

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
    helper.verifySpinnerAppearsAndDissappears()

    helper.visibleWithTimeout(cqlLibrary.row1CqlLibrarySearch)
    gridRowActions.selectRow(cqlLibrary.row1CqlLibrarySearch)
    cy.get(cqlLibrary.createDraftCqllibrariesBtn).click()

    helper.verifySpinnerAppearsAndDissappears()

    cy.get('h1').should('contain.text', 'My CQL Library > Draft CQL Library')

    cy.get(cqlLibrary.draftSaveAndContinueBtn).click()
    cy.get(cqlLibrary.confirmationContinue).click()

    helper.verifySpinnerAppearsAndDissappears()

    cy.get(measureLibrary.cqlLibraryTab).click()

    helper.verifySpinnerAppearsAndDissappears()

    helper.visibleWithTimeout(cqlLibrary.row2CqlLibrarySearch)
    gridRowActions.selectRow(cqlLibrary.row2CqlLibrarySearch)
    cy.get(cqlLibrary.convertToFhirLibrarySearchBtn).click()

    // FHIR Warning Dialog
    cy.get(cqlLibrary.fhirConversionWarningMessage).should('contain.text', 'Only one draft per Library family should be allowed.')
    cy.get(cqlLibrary.fhirConversionReturnBtn).click()

    helper.verifySpinnerAppearsAndDissappears()

  })

})
