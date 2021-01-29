import * as helper from '../../../../support/helpers'
import * as measurelibrary from '../../../../pom/MAT/WI/MeasureLibrary'
import * as cqlLibrary from '../../../../pom/MAT/WI/CqlLibrary'
import * as oktaLogin from '../../../../support/oktaLogin'
import * as dataCreation from '../../../../support/MAT/MeasureAndCQLLibraryCreation'

let fhirCqlLibrary = ''
let qdmCqlLibrary = ''
let name = ''

describe('Filter', () => {
  before('Login', () => {

    oktaLogin.login()

    cy.get(measurelibrary.cqlLibraryTab).click()

    helper.verifySpinnerAppearsAndDissappears()

    name = 'A' + Date.now()

    fhirCqlLibrary = dataCreation.createDraftCqlLibrary(name + 'Fhir', 'fhir')
    qdmCqlLibrary = dataCreation.createDraftCqlLibrary(name + 'QDM', 'QDM')

  })
  beforeEach('Preserve Cookies', () => {
    helper.preserveCookies()
  })
  after('Log Out', () => {
    helper.logout()
  })
  it('QDM/CQL, FHIR/CQL or ALL', () => {

    helper.enabledWithTimeout(cqlLibrary.searchInputBox)
    helper.enterText(cqlLibrary.searchInputBox, name)
    cy.get(cqlLibrary.searchBtn).click()

    helper.verifySpinnerAppearsAndDissappears()

    cy.get(cqlLibrary.row1CqlLibraryName).should('have.text', fhirCqlLibrary)
    cy.get(cqlLibrary.row2CqlLibraryName).should('have.text', qdmCqlLibrary)

    cy.get(cqlLibrary.row1Models).should('contain.text', 'FHIR / CQL')
    cy.get(cqlLibrary.row2Models).should('contain.text', 'QDM / CQL')

    cy.get(cqlLibrary.modelTypeListBox).select('Model Type: FHIR / CQL Only')
    cy.get(cqlLibrary.searchBtn).click()

    cy.get(cqlLibrary.row1CqlLibraryName).should('have.text', fhirCqlLibrary)
    cy.get(cqlLibrary.row1Models).should('contain.text', 'FHIR / CQL')
    helper.notExists(cqlLibrary.row2CqlLibrarySearch)

    cy.get(cqlLibrary.modelTypeListBox).select('Model Type: QDM / CQL Only')
    cy.get(cqlLibrary.searchBtn).click()

    cy.get(cqlLibrary.row1CqlLibraryName).should('have.text', qdmCqlLibrary)
    cy.get(cqlLibrary.row1Models).should('contain.text', 'QDM / CQL')
    helper.notExists(cqlLibrary.row2CqlLibrarySearch)

  })
})



