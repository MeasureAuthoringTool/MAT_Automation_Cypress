import * as helper from '../../../../support/helpers'
import * as dataCreation from '../../../../support/MAT/MeasureAndCQLLibraryCreation'
import * as measurelibrary from '../../../../pom/MAT/WI/MeasureLibrary'
import * as gridRowActions from '../../../../support/MAT/GridRowActions'
import * as login from '../../../../support/MAT/Login'

let fhirMeasure = ''
let qdmMeasure = ''

describe('Measure Library: Measure Sharing', () => {
  before('Login, Data creation', () => {
    login.matLogin()

    qdmMeasure = dataCreation.createDraftMeasure('QdmDraftMeasure', 'QDM')
    fhirMeasure = dataCreation.createDraftMeasure('FhirDraftMeasure', 'FHIR')

    helper.verifySpinnerAppearsAndDissappears()

    login.matLogout()
  })
  beforeEach('Login', () => {
    login.matLogin()
  })
  afterEach('Log Out', () => {
    login.matLogout()
  })
  it('Sharing QDM Measure', () => {

    helper.verifySpinnerAppearsAndDissappears()

    helper.enabledWithTimeout(measurelibrary.searchInputBox)
    helper.enterText(measurelibrary.searchInputBox, qdmMeasure)
    cy.get(measurelibrary.searchBtn).click()

    helper.verifySpinnerAppearsAndDissappears()
    helper.verifySpinnerAppearsAndDissappears()

    helper.visibleWithTimeout(measurelibrary.row1MeasureSearch)
    gridRowActions.selectRow(measurelibrary.row1MeasureSearch)

    cy.get(measurelibrary.shareMeasureSearchBtn).click()

    helper.verifySpinnerAppearsAndDissappears()

    cy.get('h1').should('contain.text', 'My Measures > Measure Sharing')

    cy.get(measurelibrary.shareWithSecondUserCheckBox).check()

    cy.get(measurelibrary.shareSaveAndContinueBtn).click()

    cy.get(measurelibrary.shareWarningMessage).should('contain.text', qdmMeasure + ' sharing status has been successfully updated')

  })

  it('Sharing FHIR Measure', () => {

    helper.verifySpinnerAppearsAndDissappears()

    helper.enabledWithTimeout(measurelibrary.searchInputBox)
    helper.enterText(measurelibrary.searchInputBox, fhirMeasure)
    cy.get(measurelibrary.searchBtn).click()

    helper.verifySpinnerAppearsAndDissappears()
    helper.verifySpinnerAppearsAndDissappears()

    helper.visibleWithTimeout(measurelibrary.row1MeasureSearch)
    gridRowActions.selectRow(measurelibrary.row1MeasureSearch)

    cy.get(measurelibrary.shareMeasureSearchBtn).click()

    helper.verifySpinnerAppearsAndDissappears()

    cy.get('h1').should('contain.text', 'My Measures > Measure Sharing')

    cy.get(measurelibrary.shareWithSecondUserCheckBox).click()

    cy.get(measurelibrary.shareSaveAndContinueBtn).click()

    cy.get(measurelibrary.shareWarningMessage).should('contain.text', fhirMeasure + ' sharing status has been successfully updated')
  })
})
