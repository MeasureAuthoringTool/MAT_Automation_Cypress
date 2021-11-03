import * as helper from '../../../../../support/helpers'
import * as dataCreation from '../../../../../support/MAT/MeasureAndCQLLibraryCreation'
import * as measurelibrary from '../../../../../pom/MAT/WI/MeasureLibrary'
import * as createNewMeasure from '../../../../../pom/MAT/WI/CreateNewMeasure'
import * as measureComposer from '../../../../../pom/MAT/WI/MeasureComposer'
import * as gridRowActions from '../../../../../support/MAT/GridRowActions'
import * as login from '../../../../../support/MAT/Login'

let measureName = ''
let draftMeasure = ''
let versionMeasureNotOwner = ''
let versionMeasure = ''
let fhirMeasure = ''

describe('Measure Library: Recent Activity Grid', () => {
  before('Login, Data creation', () => {
    versionMeasureNotOwner = dataCreation.loginCreateVersionedMeasureNotOwnerLogout()

    login.matLogin()

    //creating new draft measure
    draftMeasure = dataCreation.createDraftMeasure()

    //creating new versioned measure
    versionMeasure = dataCreation.createMajorVersionMeasure()

    fhirMeasure = dataCreation.createDraftMeasure('FhirDraft', 'FHIR')

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

    helper.visibleWithTimeout(measurelibrary.row1RecentActivity)
    cy.get(measurelibrary.row1RecentActivity).click()

    helper.isChecked(measurelibrary.row1RecentActivityCheckbox)

    cy.get(measurelibrary.row2RecentActivity).click()

    helper.isChecked(measurelibrary.row2RecentActivityCheckbox)
    helper.isChecked(measurelibrary.row1RecentActivityCheckbox)

    cy.wait(1000)

    cy.get(measurelibrary.row2RecentActivity).click()

    helper.isNotChecked(measurelibrary.row2RecentActivityCheckbox)

    cy.get(measurelibrary.row1RecentActivity).click()

    helper.isNotChecked(measurelibrary.row1RecentActivityCheckbox)
  })

  it('Enabled/Disabled Not The Owner', () => {

    helper.verifySpinnerAppearsAndDissappears()

    helper.enabledWithTimeout(measurelibrary.searchInputBox)
    cy.get(measurelibrary.filterByMyMeasureChkBox).eq(0).click()
    helper.enterText(measurelibrary.searchInputBox, versionMeasureNotOwner)
    cy.get(measurelibrary.searchBtn).click()

    helper.verifySpinnerAppearsAndDissappears()

    helper.visibleWithTimeout(measurelibrary.row1MeasureSearch)

    cy.wait(2000)

    gridRowActions.doubleClickRow(measurelibrary.row1MeasureSearch)

    helper.verifySpinnerAppearsAndDissappears()

    cy.get(measurelibrary.measureLibraryTab).click()

    helper.verifySpinnerAppearsAndDissappears()

    gridRowActions.selectRow(measurelibrary.row1RecentActivity)

    helper.disabled(measurelibrary.createVersionDraftRecentActivityBtn)
    helper.enabled(measurelibrary.historyRecentActivityBtn)
    helper.enabled(measurelibrary.viewRecentActivityBtn)
    helper.disabled(measurelibrary.shareRecentActivityBtn)
    helper.disabled(measurelibrary.cloneRecentActivityDisabledBtn)
    helper.enabled(measurelibrary.runFhirValidationRecentActivityBtn)
    helper.disabled(measurelibrary.convertToFhirRecentActivityBtn)


    cy.get(measurelibrary.row1RecentActivity).click()

  })

  it('Enabled/Disabled The Owner', () => {

    measureName = dataCreation.createDraftMeasure('TestMeasure')

    helper.enterText(measurelibrary.searchInputBox, measureName)

    cy.get(measurelibrary.searchBtn).click()

    helper.verifySpinnerAppearsAndDissappears()

    helper.visibleWithTimeout(measurelibrary.row1MeasureSearch)

    cy.wait(2000)

    gridRowActions.doubleClickRow(measurelibrary.row1MeasureSearch)

    helper.verifySpinnerAppearsAndDissappears()

    cy.get(measurelibrary.measureLibraryTab).click()

    helper.verifySpinnerAppearsAndDissappears()

    gridRowActions.selectRow(measurelibrary.row1RecentActivity)

    helper.enabled(measurelibrary.createVersionRecentActivityBtn)
    helper.enabled(measurelibrary.historyRecentActivityBtn)
    helper.enabled(measurelibrary.editRecentActivityBtn)
    helper.enabled(measurelibrary.shareRecentActivityBtn)
    helper.enabled(measurelibrary.cloneRecentActivityEnabledBtn)
    helper.disabled(measurelibrary.runFhirValidationRecentActivityBtn)
    helper.disabled(measurelibrary.convertToFhirRecentActivityBtn)

    cy.get(measurelibrary.createVersionRecentActivityBtn).click()

    cy.get(measurelibrary.majorVersionTypeRadio).click()
    cy.get(measurelibrary.packageAndVersion).click()
    cy.get(measurelibrary.continueBtn).click()

    helper.verifySpinnerAppearsAndDissappears()
    helper.verifySpinnerAppearsAndDissappears()

    gridRowActions.selectRow(measurelibrary.row1RecentActivity)

    helper.enabled(measurelibrary.createDraftRecentActivityBtn)
    helper.enabled(measurelibrary.historyRecentActivityBtn)
    helper.enabled(measurelibrary.viewRecentActivityBtn)
    helper.enabled(measurelibrary.shareRecentActivityBtn)
    helper.enabled(measurelibrary.cloneRecentActivityEnabledBtn)
    helper.enabled(measurelibrary.runFhirValidationRecentActivityBtn)
    helper.enabled(measurelibrary.convertToFhirRecentActivityBtn)

    cy.get(measurelibrary.searchInputBox).clear().type(fhirMeasure)

    cy.get(measurelibrary.searchBtn).click()

    helper.verifySpinnerAppearsAndDissappears()

    helper.visibleWithTimeout(measurelibrary.row1MeasureSearch)

    cy.wait(2000)

    gridRowActions.doubleClickRow(measurelibrary.row1MeasureSearch)

    helper.verifySpinnerAppearsAndDissappears()

    cy.get(measurelibrary.measureLibraryTab).click()

    helper.verifySpinnerAppearsAndDissappears()

    gridRowActions.selectRow(measurelibrary.row1RecentActivity)

    helper.enabled(measurelibrary.createVersionRecentActivityBtn)
    helper.enabled(measurelibrary.historyRecentActivityBtn)
    helper.enabled(measurelibrary.editRecentActivityBtn)
    helper.enabled(measurelibrary.shareRecentActivityBtn)
    helper.disabled(measurelibrary.cloneRecentActivityDisabledBtn)
    helper.enabled(measurelibrary.runFhirValidationRecentActivityBtn)
    helper.disabled(measurelibrary.convertToFhirRecentActivityBtn)

    cy.get(measurelibrary.row1RecentActivity).click()

  })

  it('Button bar Create Version', () => {

    //creating new measure
    cy.get(measurelibrary.newMeasureButton).click()

    let localmeasure = 'createProportionMeasure' + Date.now()

    cy.get(createNewMeasure.measureName).type(localmeasure, { delay: 50 })
    cy.get(createNewMeasure.modelradioQDM).click()
    cy.get(createNewMeasure.cqlLibraryName).type(localmeasure, { delay: 50 })
    cy.get(createNewMeasure.shortName).type(localmeasure, { delay: 50 })

    cy.get(createNewMeasure.measureScoringListBox).select('Proportion')
    cy.get(createNewMeasure.patientBasedMeasureListBox).select('Yes')

    cy.get(createNewMeasure.saveAndContinueBtn).click()
    cy.get(createNewMeasure.confirmationContinueBtn).click()

    helper.verifySpinnerAppearsAndDissappears()

    cy.get(measurelibrary.measureLibraryTab).click()

    helper.verifySpinnerAppearsAndDissappears()

    //gridRowActions.selectRow(measurelibrary.row1RecentActivity)
    cy.get(measurelibrary.row1RecentActivity).click()

    cy.get(measurelibrary.createVersionRecentActivityBtn).click()

    cy.get(measurelibrary.title).contains('My Measures > Create Measure Version of Draft')

    cy.get(measurelibrary.cancelBtn).click()

    helper.verifySpinnerAppearsAndDissappears()

  })
  it('Button bar Create Draft', () => {

    helper.verifySpinnerAppearsAndDissappears()

    helper.enabledWithTimeout(measurelibrary.searchInputBox)
    helper.enterText(measurelibrary.searchInputBox, versionMeasure)
    cy.get(measurelibrary.searchBtn).click()

    helper.verifySpinnerAppearsAndDissappears()

    helper.visibleWithTimeout(measurelibrary.row1MeasureSearch)
    gridRowActions.doubleClickRow(measurelibrary.row1MeasureSearch)

    helper.verifySpinnerAppearsAndDissappears()

    cy.get(measurelibrary.measureLibraryTab).click()

    helper.verifySpinnerAppearsAndDissappears()

    gridRowActions.selectRow(measurelibrary.row1RecentActivity)

    cy.get(measurelibrary.createDraftRecentActivityBtn).click()

    helper.verifySpinnerAppearsAndDissappears()

    cy.get(measurelibrary.title).contains('My Measures > Draft Measure')

    cy.get(createNewMeasure.cancelBtn).click()

    helper.verifySpinnerAppearsAndDissappears()

  })
  it('Button bar History', () => {

    cy.get(measurelibrary.row1RecentActivity).click()
    //gridRowActions.selectRow(measurelibrary.row1RecentActivity)

    cy.get(measurelibrary.historyRecentActivityBtn).click()

    cy.get(measurelibrary.title).contains('My Measures > History')

    cy.get(measurelibrary.returnToMeasureLibraryLink).click()

    helper.verifySpinnerAppearsAndDissappears()

  })

  it('Button bar Edit', () => {

    helper.verifySpinnerAppearsAndDissappears()

    helper.enabledWithTimeout(measurelibrary.searchInputBox)
    helper.enterText(measurelibrary.searchInputBox, draftMeasure)
    cy.get(measurelibrary.searchBtn).click()

    helper.verifySpinnerAppearsAndDissappears()

    helper.visibleWithTimeout(measurelibrary.row1MeasureSearch)
    gridRowActions.doubleClickRow(measurelibrary.row1MeasureSearch)

    helper.verifySpinnerAppearsAndDissappears()

    cy.get(measurelibrary.measureLibraryTab).click()

    helper.verifySpinnerAppearsAndDissappears()

    helper.visibleWithTimeout(measurelibrary.row1RecentActivity)
    gridRowActions.selectRow(measurelibrary.row1RecentActivity)

    cy.get(measurelibrary.editRecentActivityBtn).click()

    helper.verifySpinnerAppearsAndDissappears()

    cy.get(measurelibrary.measureComposerTab).should(tab => {
      let value = tab.attr('class')
      expect(value).contains('selected')
    })

    cy.get(measurelibrary.measureLibraryTab).click()

    helper.verifySpinnerAppearsAndDissappears()
  })

  it('Button bar View', () => {

    helper.verifySpinnerAppearsAndDissappears()

    helper.enabledWithTimeout(measurelibrary.searchInputBox)
    helper.enterText(measurelibrary.searchInputBox, versionMeasure)
    cy.get(measurelibrary.searchBtn).click()

    helper.verifySpinnerAppearsAndDissappears()

    helper.visibleWithTimeout(measurelibrary.row1MeasureSearch)
    gridRowActions.doubleClickRow(measurelibrary.row1MeasureSearch)

    helper.verifySpinnerAppearsAndDissappears()

    cy.get(measurelibrary.measureLibraryTab).click()

    helper.verifySpinnerAppearsAndDissappears()

    gridRowActions.selectRow(measurelibrary.row1RecentActivity)

    cy.get(measurelibrary.viewRecentActivityBtn).click()

    helper.verifySpinnerAppearsAndDissappears()

    helper.disabled(measureComposer.measureNameInputBox)

    cy.get(measurelibrary.measureLibraryTab).click()

    helper.verifySpinnerAppearsAndDissappears()
  })

  it('Button bar Share', () => {

    cy.get(measurelibrary.row1RecentActivity).click()
    //gridRowActions.selectRow(measurelibrary.row1RecentActivity)

    cy.get(measurelibrary.shareRecentActivityBtn).click()

    cy.get(measurelibrary.title).contains('My Measures > Measure Sharing')

    cy.get(measurelibrary.shareCancelBtn).click()

    helper.verifySpinnerAppearsAndDissappears()
  })

  it('Button bar Clone', () => {

    cy.get(measurelibrary.row1RecentActivity).click()
    //gridRowActions.selectRow(measurelibrary.row1RecentActivity)

    cy.get(measurelibrary.cloneRecentActivityEnabledBtn).click()

    helper.verifySpinnerAppearsAndDissappears()

    cy.get(measurelibrary.title).contains('My Measures > Clone Measure')

    cy.get(createNewMeasure.cancelBtn).click()

    helper.verifySpinnerAppearsAndDissappears()
  })
})
