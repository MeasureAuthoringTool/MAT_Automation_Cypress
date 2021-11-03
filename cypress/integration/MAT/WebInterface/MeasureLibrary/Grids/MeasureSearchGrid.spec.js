import * as helper from '../../../../../support/helpers'
import * as dataCreation from '../../../../../support/MAT/MeasureAndCQLLibraryCreation'
import * as measurelibrary from '../../../../../pom/MAT/WI/MeasureLibrary'
import * as createNewMeasure from '../../../../../pom/MAT/WI/CreateNewMeasure'
import * as measureComposer from '../../../../../pom/MAT/WI/MeasureComposer'
import * as cqlLibrary from '../../../../../pom/MAT/WI/CqlLibrary'
import * as gridRowActions from '../../../../../support/MAT/GridRowActions'
import * as login from '../../../../../support/MAT/Login'

let measureName = ''
let draftMeasure = ''
let versionMeasureNotOwner = ''
let versionMeasure = ''
let fhirMeasure = ''

describe('Measure Library: Measure Search Grid', () => {
  before('Login, Data creation', () => {

    versionMeasureNotOwner = dataCreation.loginCreateVersionedMeasureNotOwnerLogout()

    login.matLogin()

    helper.verifySpinnerAppearsAndDissappears()

    //creating new draft measure
    draftMeasure = dataCreation.createDraftMeasure()

    helper.verifySpinnerAppearsAndDissappears()

    //creating new versioned measure
    versionMeasure = dataCreation.createMajorVersionMeasure()

    helper.verifySpinnerAppearsAndDissappears()

    fhirMeasure = dataCreation.createDraftMeasure('FhirDraft', 'FHIR')

    helper.verifySpinnerAppearsAndDissappears()

    login.matLogout()

  })
  beforeEach('Login', () => {
    login.matLogin()
  })
  afterEach('Log Out', () => {
    login.matLogout()
  })

  it('Row Selection', () => {
    helper.verifySpinnerAppearsAndDissappears()

    helper.enabledWithTimeout(measurelibrary.searchBtn)
    cy.get(measurelibrary.searchBtn).click()

    helper.verifySpinnerAppearsAndDissappears()

    helper.haveText(measurelibrary.itemSelectedLabel, '0 Items Selected')
    //helper.notVisible(measurelibrary.clearSelectedBtn)

    helper.verifySpinnerAppearsAndDissappears()
    helper.verifySpinnerAppearsAndDissappears()

    helper.visibleWithTimeout(measurelibrary.row1MeasureSearch)
    cy.get(measurelibrary.row1MeasureSearch).click()

    helper.isChecked(measurelibrary.row1MeasureSearchCheckbox)
    helper.haveText(measurelibrary.itemSelectedLabel, '1 Item Selected')
    helper.visible(measurelibrary.clearSelectedBtn)

    helper.visibleWithTimeout(measurelibrary.row2MeasureSearch)
    cy.get(measurelibrary.row2MeasureSearch).click()

    helper.isChecked(measurelibrary.row2MeasureSearchCheckbox)
    helper.isChecked(measurelibrary.row1MeasureSearchCheckbox)
    helper.haveText(measurelibrary.itemSelectedLabel, '2 Items Selected')

    cy.wait(3000)

    cy.get(measurelibrary.row2MeasureSearch).click()

    helper.isNotChecked(measurelibrary.row2MeasureSearchCheckbox)
    helper.haveText(measurelibrary.itemSelectedLabel, '1 Item Selected')

    cy.get(measurelibrary.row1MeasureSearch).click()

    helper.isNotChecked(measurelibrary.row1MeasureSearchCheckbox)
    helper.haveText(measurelibrary.itemSelectedLabel, '0 Items Selected')
    helper.notVisible(measurelibrary.clearSelectedBtn)

    cy.get(measurelibrary.row1MeasureSearch).click()
    cy.get(measurelibrary.row2MeasureSearch).click()

    helper.isChecked(measurelibrary.row2MeasureSearchCheckbox)
    helper.isChecked(measurelibrary.row1MeasureSearchCheckbox)
    helper.haveText(measurelibrary.itemSelectedLabel, '2 Items Selected')

    cy.get(measurelibrary.clearSelectedBtn).click()

    helper.isNotChecked(measurelibrary.row1MeasureSearchCheckbox)
    helper.isNotChecked(measurelibrary.row2MeasureSearchCheckbox)
    helper.haveText(measurelibrary.itemSelectedLabel, '0 Items Selected')
    helper.notVisible(measurelibrary.clearSelectedBtn)

  })
  it('Enabled/Disabled Not The Owner', () => {

    helper.verifySpinnerAppearsAndDissappears()

    helper.enabledWithTimeout(measurelibrary.searchInputBox)
    cy.get(measurelibrary.filterByMyMeasureChkBox).eq(0).click()
    helper.enterText(measurelibrary.searchInputBox, versionMeasureNotOwner)
    cy.get(measurelibrary.searchBtn).click()

    helper.verifySpinnerAppearsAndDissappears()
    helper.verifySpinnerAppearsAndDissappears()

    helper.visibleWithTimeout(measurelibrary.row1MeasureSearch)
    gridRowActions.selectRow(measurelibrary.row1MeasureSearch)

    helper.disabled(measurelibrary.createVersionDraftMeasureSearchBtn)
    helper.enabled(measurelibrary.historyMeasureSearchBtn)
    helper.enabled(measurelibrary.viewMeasureSearchBtn)
    helper.disabled(measurelibrary.shareMeasureSearchBtn)
    helper.disabled(measurelibrary.cloneMeasureSearchDisabledBtn)
    helper.enabled(measurelibrary.runFhirValidationMeasureSearchBtn)
    helper.disabled(measurelibrary.convertToFhirMeasureSearchBtn)

    gridRowActions.selectRow(measurelibrary.row1MeasureSearch)

  })

  it('Enabled/Disabled The Owner', () => {

    measureName = dataCreation.createDraftMeasure('TestMeasure')

    helper.verifySpinnerAppearsAndDissappears()

    helper.enabledWithTimeout(measurelibrary.searchInputBox)
    helper.enterText(measurelibrary.searchInputBox, measureName)
    cy.get(measurelibrary.searchBtn).click()

    helper.verifySpinnerAppearsAndDissappears()
    helper.verifySpinnerAppearsAndDissappears()

    helper.visibleWithTimeout(measurelibrary.row1MeasureSearch)
    gridRowActions.selectRow(measurelibrary.row1MeasureSearch)

    helper.enabled(measurelibrary.createVersionMeasureSearchBtn)
    helper.enabled(measurelibrary.historyMeasureSearchBtn)
    helper.enabled(measurelibrary.editMeasureSearchBtn)
    helper.enabled(measurelibrary.shareMeasureSearchBtn)
    helper.enabled(measurelibrary.cloneMeasureSearchEnabledBtn)
    helper.disabled(measurelibrary.runFhirValidationMeasureSearchBtn)
    helper.disabled(measurelibrary.convertToFhirMeasureSearchBtn)

    cy.get(measurelibrary.createVersionMeasureSearchBtn).click()

    cy.get(measurelibrary.majorVersionTypeRadio).click()
    cy.get(measurelibrary.packageAndVersion).click()
    cy.get(measurelibrary.continueBtn).click()

    helper.verifySpinnerAppearsAndDissappears()
    helper.verifySpinnerAppearsAndDissappears()

    helper.visibleWithTimeout(measurelibrary.row1MeasureSearch)
    gridRowActions.selectRow(measurelibrary.row1MeasureSearch)

    helper.enabled(measurelibrary.createDraftMeasureSearchBtn)
    helper.enabled(measurelibrary.historyMeasureSearchBtn)
    helper.enabled(measurelibrary.viewMeasureSearchBtn)
    helper.enabled(measurelibrary.shareMeasureSearchBtn)
    helper.enabled(measurelibrary.cloneMeasureSearchEnabledBtn)
    helper.enabled(measurelibrary.runFhirValidationMeasureSearchBtn)
    helper.enabled(measurelibrary.convertToFhirMeasureSearchBtn)

    cy.get(measurelibrary.searchInputBox).clear().type(fhirMeasure)
    cy.get(measurelibrary.searchBtn).click()

    helper.verifySpinnerAppearsAndDissappears()
    helper.verifySpinnerAppearsAndDissappears()

    helper.visibleWithTimeout(measurelibrary.row1MeasureSearch)
    gridRowActions.selectRow(measurelibrary.row1MeasureSearch)

    helper.enabled(measurelibrary.createVersionMeasureSearchBtn)
    helper.enabled(measurelibrary.historyMeasureSearchBtn)
    helper.enabled(measurelibrary.editMeasureSearchBtn)
    helper.enabled(measurelibrary.shareMeasureSearchBtn)
    helper.disabled(measurelibrary.cloneMeasureSearchDisabledBtn)
    helper.enabled(measurelibrary.runFhirValidationMeasureSearchBtn)
    helper.disabled(measurelibrary.convertToFhirMeasureSearchBtn)

  })

  it('Button bar Create Version', () => {

    helper.enterText(measurelibrary.searchInputBox, draftMeasure)
    cy.get(measurelibrary.searchBtn).click()

    helper.verifySpinnerAppearsAndDissappears()

    helper.visibleWithTimeout(measurelibrary.row1MeasureSearch)
    gridRowActions.selectRow(measurelibrary.row1MeasureSearch)

    cy.get(measurelibrary.createVersionMeasureSearchBtn).click()

    cy.get(cqlLibrary.title).contains('My Measures > Create Measure Version of Draft')

    cy.get(measurelibrary.cancelBtn).click()

    helper.verifySpinnerAppearsAndDissappears()

  })
  it('Button bar Create Draft', () => {

    helper.enterText(measurelibrary.searchInputBox, versionMeasure)
    cy.get(measurelibrary.searchBtn).click()

    helper.verifySpinnerAppearsAndDissappears()

    gridRowActions.selectRow(measurelibrary.row1MeasureSearch)

    cy.get(measurelibrary.createDraftMeasureSearchBtn).click()

    helper.verifySpinnerAppearsAndDissappears()

    cy.get(measurelibrary.title).contains('My Measures > Draft Measure')

    cy.get(createNewMeasure.cancelBtn).click()

    helper.verifySpinnerAppearsAndDissappears()

  })
  it('Button bar History', () => {

    helper.enterText(measurelibrary.searchInputBox, versionMeasure)
    cy.get(measurelibrary.searchBtn).click()

    helper.verifySpinnerAppearsAndDissappears()

    gridRowActions.selectRow(measurelibrary.row1MeasureSearch)

    cy.get(measurelibrary.historyMeasureSearchBtn).click()

    cy.get(measurelibrary.title).contains('My Measures > History')

    cy.get(measurelibrary.returnToMeasureLibraryLink).click()

    helper.verifySpinnerAppearsAndDissappears()

  })

  it('Button bar Edit', () => {

    helper.enterText(measurelibrary.searchInputBox, draftMeasure)
    cy.get(measurelibrary.searchBtn).click()

    helper.verifySpinnerAppearsAndDissappears()

    gridRowActions.selectRow(measurelibrary.row1MeasureSearch)

    cy.get(measurelibrary.editMeasureSearchBtn).click()

    helper.verifySpinnerAppearsAndDissappears()

    cy.get(measurelibrary.measureComposerTab).should(tab => {
      let value = tab.attr('class')
      expect(value).contains('selected')
    })

    cy.get(measurelibrary.measureLibraryTab).click()

    helper.verifySpinnerAppearsAndDissappears()

  })

  it('Button bar View', () => {

    helper.enterText(measurelibrary.searchInputBox, versionMeasure)
    cy.get(measurelibrary.searchBtn).click()

    helper.verifySpinnerAppearsAndDissappears()

    gridRowActions.selectRow(measurelibrary.row1MeasureSearch)

    cy.get(measurelibrary.viewMeasureSearchBtn).click()

    helper.verifySpinnerAppearsAndDissappears()

    helper.disabled(measureComposer.measureNameInputBox)

    cy.get(measurelibrary.measureLibraryTab).click()

    helper.verifySpinnerAppearsAndDissappears()

  })

  it('Button bar Share', () => {

    helper.enterText(measurelibrary.searchInputBox, draftMeasure)
    cy.get(measurelibrary.searchBtn).click()

    helper.verifySpinnerAppearsAndDissappears()

    gridRowActions.selectRow(measurelibrary.row1MeasureSearch)

    cy.get(measurelibrary.shareMeasureSearchBtn).click()

    cy.get(measurelibrary.title).contains('My Measures > Measure Sharing')

    cy.get(measurelibrary.shareCancelBtn).click()

    helper.verifySpinnerAppearsAndDissappears()

  })
  it('Button bar Clone', () => {

    helper.enterText(measurelibrary.searchInputBox, draftMeasure)
    cy.get(measurelibrary.searchBtn).click()

    helper.verifySpinnerAppearsAndDissappears()

    gridRowActions.selectRow(measurelibrary.row1MeasureSearch)

    cy.get(measurelibrary.cloneMeasureSearchEnabledBtn).click()

    helper.verifySpinnerAppearsAndDissappears()

    cy.get(measurelibrary.title).contains('My Measures > Clone Measure')

    cy.get(createNewMeasure.cancelBtn).click()

    helper.verifySpinnerAppearsAndDissappears()
  })
})
