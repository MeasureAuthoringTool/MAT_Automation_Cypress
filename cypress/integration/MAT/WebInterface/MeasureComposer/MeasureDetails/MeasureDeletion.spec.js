import * as helper from '../../../../../support/helpers'
import * as measurelibrary from '../../../../../pom/MAT/WI/MeasureLibrary'
import * as measureDetails from '../../../../../pom/MAT/WI/MeasureDetails'
import * as dataCreation from '../../../../../support/MAT/MeasureAndCQLLibraryCreation'
import * as gridRowActions from '../../../../../support/MAT/GridRowActions'
import * as login from '../../../../../support/MAT/Login'

let fhirMeasure = ''
let fhirVersionMeasure = ''
let qdmMeasure = ''
let qdmVersionMeasure = ''

describe('Measure Composer: Measure Details: FHIR Measure Deletion', () => {
  before('Prepare data', () => {
    login.matLogin()
    fhirMeasure = dataCreation.createDraftMeasure('FhirDraftMeasure', 'FHIR')
    login.matLogout()
  })
  beforeEach('Login', () => {
    login.matLogin()
  })
  afterEach('Log Out', () => {
    login.matLogin()
  })

  it('Validate the Fhir draft measure deletion', () => {

    helper.enterText(measurelibrary.searchInputBox, fhirMeasure)
    cy.get(measurelibrary.searchBtn).click()

    helper.verifySpinnerAppearsAndDissappears()

    gridRowActions.doubleClickRow(measurelibrary.row1MeasureSearch)

    helper.verifySpinnerAppearsAndDissappears()

    cy.get(measureDetails.deleteBtn).click()

    cy.get(measureDetails.confirmDeleteText).clear().type('DELETE', { force: true })
    cy.get(measureDetails.confirmDeleteBtn).click()

  })

  it('Validate the Fhir versioned measure deletion', () => {

    fhirVersionMeasure = dataCreation.createDraftMeasure('FhirVersionMeasure', 'FHIR')

    helper.enterText(measurelibrary.searchInputBox, fhirVersionMeasure)
    cy.get(measurelibrary.searchBtn).click()

    helper.verifySpinnerAppearsAndDissappears()

    gridRowActions.selectRow(measurelibrary.row1MeasureSearch)
    cy.get(measurelibrary.createVersionMeasureSearchBtn).click()
    cy.get(measurelibrary.majorVersionTypeRadio).click()
    cy.get(measurelibrary.packageAndVersion).click()

    helper.verifySpinnerAppearsAndDissappears()

    cy.get(measurelibrary.continueBtn).click()

    helper.verifySpinnerAppearsAndDissappears()

    cy.get(measurelibrary.warningKeepBtn).click()

    helper.verifySpinnerAppearsAndDissappears()

    helper.enterText(measurelibrary.searchInputBox, fhirVersionMeasure)
    cy.get(measurelibrary.searchBtn).click()

    helper.verifySpinnerAppearsAndDissappears()

    gridRowActions.doubleClickRow(measurelibrary.row1MeasureSearch)

    helper.verifySpinnerAppearsAndDissappears()

    cy.get(measureDetails.deleteBtn).click()

    cy.get(measureDetails.confirmDeleteText).clear().type('DELETE', { force: true })
    cy.get(measureDetails.confirmDeleteBtn).click()

  })

})

describe('Measure Composer: Measure Details: QDM Measure Deletion', () => {
  before('Prepare Data', () => {
    login.matLogin()
    qdmMeasure = dataCreation.createDraftMeasure('QdmDraftMeasure', 'QDM')
    login.matLogout()
  })
  beforeEach('Login', () => {
    login.matLogin()
  })
  afterEach('Log Out', () => {
    login.matLogout()
  })
  it('Validate the QDM draft measure deletion', () => {

    helper.enterText(measurelibrary.searchInputBox, qdmMeasure)
    cy.get(measurelibrary.searchBtn).click()

    helper.verifySpinnerAppearsAndDissappears()

    gridRowActions.doubleClickRow(measurelibrary.row1MeasureSearch)

    helper.verifySpinnerAppearsAndDissappears()

    cy.get(measureDetails.deleteBtn).click()

    cy.get(measureDetails.confirmDeleteText).clear().type('DELETE', { force: true })
    cy.get(measureDetails.confirmDeleteBtn).click()

  })

  it('Validate the QDM versioned measure deletion', () => {

    qdmVersionMeasure = dataCreation.createDraftMeasure('QdmVersionMeasure', 'QDM')

    helper.enterText(measurelibrary.searchInputBox, qdmVersionMeasure)
    cy.get(measurelibrary.searchBtn).click()

    helper.verifySpinnerAppearsAndDissappears()

    gridRowActions.selectRow(measurelibrary.row1MeasureSearch)
    cy.get(measurelibrary.createVersionMeasureSearchBtn).click()
    cy.get(measurelibrary.majorVersionTypeRadio).click()
    cy.get(measurelibrary.packageAndVersion).click()

    helper.verifySpinnerAppearsAndDissappears()

    cy.get(measurelibrary.continueBtn).click()

    helper.verifySpinnerAppearsAndDissappears()

    helper.enterText(measurelibrary.searchInputBox, qdmVersionMeasure)
    cy.get(measurelibrary.searchBtn).click()

    helper.verifySpinnerAppearsAndDissappears()

    gridRowActions.doubleClickRow(measurelibrary.row1MeasureSearch)

    helper.verifySpinnerAppearsAndDissappears()

    cy.get(measureDetails.deleteBtn).click()

    cy.get(measureDetails.confirmDeleteText).clear().type('DELETE', { force: true })
    cy.get(measureDetails.confirmDeleteBtn).click()

  })

})
