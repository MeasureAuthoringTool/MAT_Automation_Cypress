import * as helper from '../../../../support/helpers'
import * as cqlLibrary from '../../../../pom/MAT/WI/CqlLibrary'
import * as dataCreation from '../../../../support/MAT/MeasureAndCQLLibraryCreation'
import * as gridRowActions from '../../../../support/MAT/GridRowActions'
import * as measurelibrary from '../../../../pom/MAT/WI/MeasureLibrary'
import * as login from '../../../../support/MAT/Login'

let fhirCqlLibrary = ''
let qdmCqlLibrary = ''


describe('Library Deletion', () => {
  before('Login, create data', () => {
    login.matLogin()

    cy.get(measurelibrary.cqlLibraryTab).click()
    helper.verifySpinnerAppearsAndDissappears()
    helper.visibleWithTimeout(cqlLibrary.row1CqlLibrarySearch)

    fhirCqlLibrary = dataCreation.createDraftCqlLibrary('FhirCqlLibrary', 'FHIR')

    qdmCqlLibrary = dataCreation.createDraftCqlLibrary('QdmCqlLibrary', 'QDM')

    helper.verifySpinnerAppearsAndDissappears()

    login.matLogout()
  })
  beforeEach('Login', () => {
    login.matLogin()

    cy.get(measurelibrary.cqlLibraryTab).click()
    helper.verifySpinnerAppearsAndDissappears()

    helper.visibleWithTimeout(cqlLibrary.row1CqlLibrarySearch)
  })
  afterEach('Log Out', () => {
    login.matLogout()
  })

  it('Validate the Fhir draft library deletion', () => {

    helper.verifySpinnerAppearsAndDissappears()

    helper.enabledWithTimeout(cqlLibrary.searchInputBox)
    helper.enterText(cqlLibrary.searchInputBox, fhirCqlLibrary)
    cy.get(cqlLibrary.searchBtn).click()

    helper.verifySpinnerAppearsAndDissappears()
    helper.verifySpinnerAppearsAndDissappears()

    gridRowActions.selectRow(cqlLibrary.row1CqlLibrarySearch)

    cy.get(cqlLibrary.deleteCqllibrariesBtn).click()

    cy.get(cqlLibrary.confirmDeleteText).type('DELETE', { force: true })
    cy.get(cqlLibrary.confirmDeleteBtn).click()

    helper.verifySpinnerAppearsAndDissappears()

  })
  it('Validate the QDM draft library deletion', () => {

    helper.verifySpinnerAppearsAndDissappears()

    helper.enabledWithTimeout(cqlLibrary.searchInputBox)
    helper.enterText(cqlLibrary.searchInputBox, qdmCqlLibrary)
    cy.get(cqlLibrary.searchBtn).click()

    helper.verifySpinnerAppearsAndDissappears()

    gridRowActions.selectRow(cqlLibrary.row1CqlLibrarySearch)

    cy.get(cqlLibrary.deleteCqllibrariesBtn).click()

    cy.get(cqlLibrary.confirmDeleteText).type('DELETE', { force: true })
    cy.get(cqlLibrary.confirmDeleteBtn).click()

  })
})