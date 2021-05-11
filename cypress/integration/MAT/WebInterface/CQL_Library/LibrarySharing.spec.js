import * as helper from '../../../../support/helpers'
import * as dataCreation from '../../../../support/MAT/MeasureAndCQLLibraryCreation'
import * as cqlLibrary from '../../../../pom/MAT/WI/CqlLibrary'
import * as gridRowActions from '../../../../support/MAT/GridRowActions'
import * as login from '../../../../support/MAT/Login'
import * as measurelibrary from '../../../../pom/MAT/WI/MeasureLibrary'

let fhirCqlLibrary = ''
let qdmCqlLibrary = ''

describe('Sharing CQL Library with other measure developer', () => {
  before('Data Setup', () => {
    login.matLogin()

    cy.get(measurelibrary.cqlLibraryTab).click()

    helper.verifySpinnerAppearsAndDissappears()

    qdmCqlLibrary = dataCreation.createDraftCqlLibrary('QdmLibrary', 'QDM')
    fhirCqlLibrary = dataCreation.createDraftCqlLibrary('FhirLibrary', 'FHIR')

    helper.verifySpinnerAppearsAndDissappears()
    login.matLogout()
  })
  beforeEach('Login', () => {
    login.matLogin()

    cy.get(measurelibrary.cqlLibraryTab).click()

    helper.verifySpinnerAppearsAndDissappears()
  })
  afterEach('Log Out', () => {
    login.matLogout()
  })
  it('Share the QDM Library', () => {

    helper.verifySpinnerAppearsAndDissappears()

    helper.enabledWithTimeout(cqlLibrary.searchInputBox)
    helper.enterText(cqlLibrary.searchInputBox, qdmCqlLibrary)
    cy.get(cqlLibrary.searchBtn).click()

    helper.verifySpinnerAppearsAndDissappears()

    gridRowActions.selectRow(cqlLibrary.row1CqlLibrarySearch)

    cy.get(cqlLibrary.shareCqllibrariesBtn).click()

    helper.verifySpinnerAppearsAndDissappears()

    cy.get('h1').should('contain.text', 'My CQL Libraries > CQL Library Sharing')

    cy.get(cqlLibrary.shareWithSecondUserCheckBox).check()

    cy.get(cqlLibrary.shareSaveAndContinueBtn).click()

    cy.get(cqlLibrary.shareWarningMessage).should('contain.text', qdmCqlLibrary + ' sharing status has been successfully updated')

  })

  it('Share the FHIR Measure', () => {

    helper.verifySpinnerAppearsAndDissappears()

    helper.enabledWithTimeout(cqlLibrary.searchInputBox)
    helper.enterText(cqlLibrary.searchInputBox, fhirCqlLibrary)
    cy.get(cqlLibrary.searchBtn).click()

    helper.verifySpinnerAppearsAndDissappears()

    gridRowActions.selectRow(cqlLibrary.row1CqlLibrarySearch)

    cy.get(cqlLibrary.shareCqllibrariesBtn).click()

    helper.verifySpinnerAppearsAndDissappears()

    cy.get('h1').should('contain.text', 'My CQL Libraries > CQL Library Sharing')

    cy.get(cqlLibrary.shareWithSecondUserCheckBox).click()

    cy.get(cqlLibrary.shareSaveAndContinueBtn).click()

    cy.get(cqlLibrary.shareWarningMessage).should('contain.text', fhirCqlLibrary + ' sharing status has been successfully updated')
  })
})
