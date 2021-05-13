import * as helper from '../../../../support/helpers'
import * as measurelibrary from '../../../../pom/MAT/WI/MeasureLibrary'
import * as dataCreation from '../../../../support/MAT/MeasureAndCQLLibraryCreation'
import * as login from '../../../../support/MAT/Login'

let fhirMeasure = ''
let qdmMeasure = ''
let name = ''

describe('Filter', () => {
  before('Login', () => {

    login.matLogin()

    name = 'A' + Date.now()

    fhirMeasure = dataCreation.createDraftMeasure(name + 'Fhir', 'FHIR')
    qdmMeasure = dataCreation.createDraftMeasure(name + 'QDM', 'QDM')

    helper.verifySpinnerAppearsAndDissappears()

  })
  after('Log Out', () => {
    login.matLogout()
  })
  it('QDM/CQL, FHIR/CQL or ALL', () => {
    helper.verifySpinnerAppearsAndDissappears()

    helper.enabledWithTimeout(measurelibrary.searchInputBox)
    helper.enterText(measurelibrary.searchInputBox, name)
    cy.get(measurelibrary.searchBtn).click()

    helper.verifySpinnerAppearsAndDissappears()

    cy.get(measurelibrary.row1MeasureSearchName).eq(2).should('have.text', fhirMeasure)
    cy.get(measurelibrary.row2MeasureSearchName).eq(2).should('have.text', qdmMeasure)

    cy.get(measurelibrary.row1Models).should('contain.text', 'FHIR / CQL')
    cy.get(measurelibrary.row2Models).should('contain.text', 'QDM / CQL')

    cy.get(measurelibrary.modelTypeListBox).select('Model Type: FHIR / CQL Only')
    cy.get(measurelibrary.searchBtn).click()

    helper.verifySpinnerAppearsAndDissappears()

    cy.get(measurelibrary.row1MeasureSearchName).eq(2).should('have.text', fhirMeasure)
    cy.get(measurelibrary.row1Models).should('contain.text', 'FHIR / CQL')
    helper.notExists(measurelibrary.row2MeasureSearch)

    cy.get(measurelibrary.modelTypeListBox).select('Model Type: QDM / CQL Only')
    cy.get(measurelibrary.searchBtn).click()

    helper.verifySpinnerAppearsAndDissappears()

    cy.get(measurelibrary.row1MeasureSearchName).eq(2).should('have.text', qdmMeasure)
    cy.get(measurelibrary.row1Models).should('contain.text', 'QDM / CQL')
    helper.notExists(measurelibrary.row2MeasureSearch)

  })
})



