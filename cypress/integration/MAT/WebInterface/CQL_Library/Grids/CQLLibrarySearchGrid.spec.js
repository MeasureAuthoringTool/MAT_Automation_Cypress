import * as helper from '../../../../../support/helpers'
import * as measurelibrary from '../../../../../pom/MAT/WI/MeasureLibrary'
import * as cqlLibrary from '../../../../../pom/MAT/WI/CqlLibrary'
import * as cqlComposer from '../../../../../pom/MAT/WI/CQLComposer'
import * as dataCreation from '../../../../../support/MAT/MeasureAndCQLLibraryCreation'
import * as gridRowActions from '../../../../../support/MAT/GridRowActions'
import * as login from '../../../../../support/MAT/Login'

let draftCqlLibraryNotowner = ''
let draftCqlLibraryOwner = ''
let versionedCQLLibary = ''

describe('CQL Library: CQL Library Search Grid', () => {
  before('Login', () => {
    draftCqlLibraryNotowner = dataCreation.loginCreateDraftCqlLibraryNotOwnerLogout()

    login.matLogin()
    draftCqlLibraryOwner = dataCreation.createDraftCqlLibrary('QdmDraft')

    versionedCQLLibary = dataCreation.createDraftCqlLibrary('QdmVersioned')

    helper.enabledWithTimeout(cqlLibrary.searchInputBox, 200000)
    helper.enterText(cqlLibrary.searchInputBox, versionedCQLLibary)
    cy.get(cqlLibrary.searchBtn).click()

    helper.verifySpinnerAppearsAndDissappears()
    helper.verifySpinnerAppearsAndDissappears()

    helper.visibleWithTimeout(cqlLibrary.row1CqlLibrarySearch)
    gridRowActions.selectRow(cqlLibrary.row1CqlLibrarySearch)

    cy.get(cqlLibrary.createVersionCqllibrariesBtn).click()

    helper.verifySpinnerAppearsAndDissappears()

    cy.get(cqlLibrary.majorVersionTypeRadio).click()

    cy.get(cqlLibrary.versionSaveAndContinueBtn).click()

    helper.verifySpinnerAppearsAndDissappears()
    helper.verifySpinnerAppearsAndDissappears()

    login.matLogout()

  })
  beforeEach('Login', () => {
    login.matLogin()

    cy.get(measurelibrary.cqlLibraryTab).click()
    helper.verifySpinnerAppearsAndDissappears()
    helper.verifySpinnerAppearsAndDissappears()
  })
  afterEach('Log Out', () => {
    helper.verifySpinnerAppearsAndDissappears()
    helper.verifySpinnerAppearsAndDissappears()
    login.matLogout()
  })

  it('Row Selection', () => {

    cy.get(measurelibrary.cqlLibraryTab).click()

    helper.verifySpinnerAppearsAndDissappears()
    helper.verifySpinnerAppearsAndDissappears()
    helper.verifySpinnerAppearsAndDissappears()

    helper.visibleWithTimeout(cqlLibrary.row1CqlLibrarySearch)

    cy.get(cqlLibrary.cqlLibrarySearchTable).click()
    cy.wait(1000)
    //gridRowActions.selectRow(cqlLibrary.row1CqlLibrarySearch)
    cy.get(cqlLibrary.row1CqlLibrarySearch).click()

    helper.isChecked(cqlLibrary.row1CqlLibrarySearchCheckbox)

    cy.get(cqlLibrary.row2CqlLibrarySearch).click()

    helper.isChecked(cqlLibrary.row2CqlLibrarySearchCheckbox)
    helper.isNotChecked(cqlLibrary.row1CqlLibrarySearchCheckbox)

    cy.wait(1000)

    cy.get(cqlLibrary.row2CqlLibrarySearch).click()

    helper.isNotChecked(cqlLibrary.row2CqlLibrarySearchCheckbox)
    helper.isNotChecked(cqlLibrary.row1CqlLibrarySearchCheckbox)

  })
  it('Enabled/Disabled Not The Owner', () => {

    helper.enabledWithTimeout(cqlLibrary.searchInputBox, 120000)
    cy.get(cqlLibrary.filterByMyLibrariesChkBox).eq(1).click()
    helper.enterText(cqlLibrary.searchInputBox, draftCqlLibraryNotowner)
    cy.get(cqlLibrary.searchBtn).click()

    helper.verifySpinnerAppearsAndDissappears()
    helper.verifySpinnerAppearsAndDissappears()

    helper.visibleWithTimeout(cqlLibrary.row1CqlLibrarySearch)
    gridRowActions.selectRow(cqlLibrary.row1CqlLibrarySearch)

    helper.disabled(cqlLibrary.createVersionDraftCqllibrariesBtn)
    helper.enabled(cqlLibrary.historyCqllibrariesBtn)
    helper.enabled(cqlLibrary.viewCqllibrariesBtn)
    helper.disabled(cqlLibrary.shareCqllibrariesBtn)
    helper.disabled(cqlLibrary.deleteCqllibrariesBtn)

  })

  it('Enabled/Disabled The Owner', () => {

    helper.enabledWithTimeout(cqlLibrary.searchInputBox, 120000)
    helper.enterText(cqlLibrary.searchInputBox, draftCqlLibraryOwner)
    cy.get(cqlLibrary.searchBtn).click()

    helper.verifySpinnerAppearsAndDissappears()
    helper.verifySpinnerAppearsAndDissappears()

    helper.visibleWithTimeout(cqlLibrary.row1CqlLibrarySearch)
    gridRowActions.selectRow(cqlLibrary.row1CqlLibrarySearch)

    helper.enabled(cqlLibrary.createVersionCqllibrariesBtn)
    helper.enabled(cqlLibrary.historyCqllibrariesBtn)
    helper.enabled(cqlLibrary.editCqllibrariesEnabledBtn)
    helper.enabled(cqlLibrary.shareCqllibrariesBtn)
    helper.enabled(cqlLibrary.deleteCqllibrariesBtn)

    cy.get(cqlLibrary.searchInputBox).clear()

  })

  it('Button Bar Create Version', () => {

    helper.enabledWithTimeout(cqlLibrary.searchInputBox, 120000)
    helper.enterText(cqlLibrary.searchInputBox, draftCqlLibraryOwner)
    cy.get(cqlLibrary.searchBtn).click()

    helper.verifySpinnerAppearsAndDissappears()
    helper.verifySpinnerAppearsAndDissappears()

    helper.visibleWithTimeout(cqlLibrary.row1CqlLibrarySearch)
    gridRowActions.selectRow(cqlLibrary.row1CqlLibrarySearch)

    cy.get(cqlLibrary.createVersionCqllibrariesBtn).click()

    cy.get(cqlLibrary.title).contains('My CQL Library > Create CQL Library Version of Draft')

    cy.get(cqlLibrary.cancelBtn).click()

    helper.verifySpinnerAppearsAndDissappears()

  })
  it('Button Bar Create Draft', () => {

    helper.enabledWithTimeout(cqlLibrary.searchInputBox, 120000)
    helper.enterText(cqlLibrary.searchInputBox, versionedCQLLibary)
    cy.get(cqlLibrary.searchBtn).click()

    helper.verifySpinnerAppearsAndDissappears()
    helper.verifySpinnerAppearsAndDissappears()

    helper.visibleWithTimeout(cqlLibrary.row1CqlLibrarySearch)
    gridRowActions.selectRow(cqlLibrary.row1CqlLibrarySearch)

    cy.get(cqlLibrary.createDraftCqllibrariesBtn).click()

    cy.get(cqlLibrary.title).contains('My CQL Library > Draft CQL Library')

    cy.get(cqlLibrary.draftCancelBtn).click()

    helper.verifySpinnerAppearsAndDissappears()
  })
  it('Button Bar History', () => {

    helper.enabledWithTimeout(cqlLibrary.searchInputBox, 120000)
    helper.enterText(cqlLibrary.searchInputBox, draftCqlLibraryOwner)
    cy.get(cqlLibrary.searchBtn).click()

    helper.verifySpinnerAppearsAndDissappears()
    helper.verifySpinnerAppearsAndDissappears()

    helper.visibleWithTimeout(cqlLibrary.row1CqlLibrarySearch)
    gridRowActions.selectRow(cqlLibrary.row1CqlLibrarySearch)

    cy.get(cqlLibrary.historyCqllibrariesBtn).click()

    cy.get(cqlLibrary.title).contains('My CQL Library > History')

    cy.get(cqlLibrary.returnToCqlLibrary).click()

    helper.verifySpinnerAppearsAndDissappears()

  })

  it('Button Bar View', () => {

    helper.enabledWithTimeout(cqlLibrary.searchInputBox, 120000)
    helper.enterText(cqlLibrary.searchInputBox, versionedCQLLibary)
    cy.get(cqlLibrary.searchBtn).click()

    helper.verifySpinnerAppearsAndDissappears()
    helper.verifySpinnerAppearsAndDissappears()

    helper.visibleWithTimeout(cqlLibrary.row1CqlLibrarySearch)
    gridRowActions.selectRow(cqlLibrary.row1CqlLibrarySearch)

    cy.get(cqlLibrary.viewCqllibrariesBtn).click()

    helper.verifySpinnerAppearsAndDissappears()

    helper.disabled(cqlComposer.saveBtn)

    cy.get(measurelibrary.cqlLibraryTab).click()

    helper.verifySpinnerAppearsAndDissappears()

  })

  it('Button Bar Edit', () => {

    helper.enabledWithTimeout(cqlLibrary.searchInputBox, 120000)
    helper.enterText(cqlLibrary.searchInputBox, draftCqlLibraryOwner)
    cy.get(cqlLibrary.searchBtn).click()

    helper.verifySpinnerAppearsAndDissappears()
    helper.verifySpinnerAppearsAndDissappears()

    helper.visibleWithTimeout(cqlLibrary.row1CqlLibrarySearch)
    gridRowActions.selectRow(cqlLibrary.row1CqlLibrarySearch)

    cy.get(cqlLibrary.editCqllibrariesEnabledBtn).click()

    helper.verifySpinnerAppearsAndDissappears()

    helper.enabled(cqlComposer.saveBtn)

    cy.get(measurelibrary.cqlLibraryTab).click()

    helper.verifySpinnerAppearsAndDissappears()

  })

  it('Button Bar Share', () => {

    helper.enabledWithTimeout(cqlLibrary.searchInputBox, 120000)
    helper.enterText(cqlLibrary.searchInputBox, draftCqlLibraryOwner)
    cy.get(cqlLibrary.searchBtn).click()

    helper.verifySpinnerAppearsAndDissappears()
    helper.verifySpinnerAppearsAndDissappears()

    helper.visibleWithTimeout(cqlLibrary.row1CqlLibrarySearch)
    gridRowActions.selectRow(cqlLibrary.row1CqlLibrarySearch)

    cy.get(cqlLibrary.shareCqllibrariesBtn).click()

    helper.verifySpinnerAppearsAndDissappears()

    cy.get(cqlLibrary.title).contains('My CQL Libraries > CQL Library Sharing')

    cy.get(cqlLibrary.shareCancelBtn).click()

    helper.verifySpinnerAppearsAndDissappears()

  })

  it('Button Bar Delete', () => {

    helper.enabledWithTimeout(cqlLibrary.searchInputBox, 120000)
    helper.enterText(cqlLibrary.searchInputBox, draftCqlLibraryOwner)
    cy.get(cqlLibrary.searchBtn).click()

    helper.verifySpinnerAppearsAndDissappears()
    helper.verifySpinnerAppearsAndDissappears()

    helper.visibleWithTimeout(cqlLibrary.row1CqlLibrarySearch)
    gridRowActions.selectRow(cqlLibrary.row1CqlLibrarySearch)

    cy.get(cqlLibrary.deleteCqllibrariesBtn).click()

    helper.visible(cqlLibrary.modal)

    cy.get(cqlLibrary.modalCloseBtn).click()

    cy.get(cqlLibrary.row1CqlLibrarySearch).click()
  })
})


