import * as helper from '../../../../support/helpers'
import * as measurelibrary from '../../../../pom/MAT/WI/MeasureLibrary'
import * as cqlLibrary from '../../../../pom/MAT/WI/CqlLibrary'
import * as cqlComposer from '../../../../pom/MAT/WI/CQLComposer'
import * as oktaLogin from '../../../../support/oktaLogin'
import * as dataCreation from '../../../../support/MAT/MeasureAndCQLLibraryCreation'
import * as gridRowActions from '../../../../support/MAT/GridRowActions'

let draftCqlLibraryNotowner = ''
let draftCqlLibraryOwner = ''
let versionedCQLLibary = ''

describe('CQL Library Grid Selection', () => {
  before('Login', () => {
    oktaLogin.login()

    cy.get(measurelibrary.cqlLibraryTab).click()

    helper.verifySpinnerAppearsAndDissappears()

    dataCreation.createDraftCqlLibrary('QdmDraft')

    dataCreation.createDraftCqlLibrary('FhirDraft', 'FHIR')

    helper.verifySpinnerAppearsAndDissappears()
    helper.verifySpinnerAppearsAndDissappears()

    helper.logout()

  })
  beforeEach('Login', () => {
    oktaLogin.login()
  })
  afterEach('Log Out', () => {
    helper.verifySpinnerAppearsAndDissappears()
    helper.verifySpinnerAppearsAndDissappears()
    helper.logout()
  })
  it('Recent Activity', () => {

    helper.verifySpinnerAppearsAndDissappears()

    cy.get(measurelibrary.cqlLibraryTab).click()

    helper.verifySpinnerAppearsAndDissappears()

    helper.visibleWithTimeout(cqlLibrary.row1RecentActivity)

    cy.get(cqlLibrary.row1RecentActivity).then(elm => {

      if (Cypress.$(elm).length === 2) {
        helper.verifySpinnerAppearsAndDissappears()
        cy.get(cqlLibrary.row1RecentActivity).eq(1).click()
        //cy.get(cqlLibrary.row1RecentActivity).eq(1).click()
      } else {
        helper.verifySpinnerAppearsAndDissappears()
        cy.get(cqlLibrary.row1RecentActivity).click()
        //cy.get(cqlLibrary.row1RecentActivity).click()
      }

    })

    cy.wait(1000)

    helper.isChecked(cqlLibrary.row1RecentActivityCheckbox)

    cy.get(cqlLibrary.row2RecentActivity).then(elm => {

      if (Cypress.$(elm).length === 2) {
        cy.get(cqlLibrary.row2RecentActivity).eq(1).click()
      } else {
        cy.get(cqlLibrary.row2RecentActivity).click()
      }

    })

    helper.isChecked(cqlLibrary.row2RecentActivityCheckbox)
    helper.isNotChecked(cqlLibrary.row1RecentActivityCheckbox)

    cy.wait(1000)

    cy.get(cqlLibrary.row2RecentActivity).then(elm => {

      if (Cypress.$(elm).length === 2) {
        cy.get(cqlLibrary.row2RecentActivity).eq(1).click()
      } else {
        cy.get(cqlLibrary.row2RecentActivity).click()
      }

    })

    helper.isNotChecked(cqlLibrary.row2RecentActivityCheckbox)
    helper.isNotChecked(cqlLibrary.row1RecentActivityCheckbox)

  })

  it('CQL Library Search Table', () => {

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
})

describe('CQL Library Recent Activity and My CQL Libraries Grid Button Bar', () => {
  before('Login', () => {

    draftCqlLibraryNotowner = dataCreation.loginCreateDraftCqlLibraryNotOwnerLogout()

    oktaLogin.login()
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

    helper.logout()

  })
  beforeEach('Login', () => {
    oktaLogin.login()

    cy.get(measurelibrary.cqlLibraryTab).click()
    helper.verifySpinnerAppearsAndDissappears()
    helper.verifySpinnerAppearsAndDissappears()
  })
  afterEach('Log Out', () => {
    helper.verifySpinnerAppearsAndDissappears()
    helper.verifySpinnerAppearsAndDissappears()
    helper.logout()
  })

  it('Enabled/Disabled Recent Activity Not The Owner', () => {

    helper.verifySpinnerAppearsAndDissappears()
    helper.verifySpinnerAppearsAndDissappears()

    //populating recent activity grid
    helper.enabledWithTimeout(cqlLibrary.searchInputBox, 120000)
    cy.get(cqlLibrary.filterByMyLibrariesChkBox).eq(1).click()
    helper.enterText(cqlLibrary.searchInputBox, draftCqlLibraryNotowner)
    cy.get(cqlLibrary.searchBtn).click()

    helper.verifySpinnerAppearsAndDissappears()
    helper.verifySpinnerAppearsAndDissappears()

    gridRowActions.doubleClickRow(cqlLibrary.row1CqlLibrarySearch)

    helper.verifySpinnerAppearsAndDissappears()

    cy.get(measurelibrary.cqlLibraryTab).click()

    helper.verifySpinnerAppearsAndDissappears()
    helper.verifySpinnerAppearsAndDissappears()

    helper.visibleWithTimeout(cqlLibrary.row1RecentActivity)

    cy.get(cqlLibrary.row1RecentActivity).then(elm => {

      if (Cypress.$(elm).length === 2) {
        helper.verifySpinnerAppearsAndDissappears()
        cy.get(cqlLibrary.row1RecentActivity).eq(1).click()
        cy.get(cqlLibrary.row1RecentActivity).eq(1).click()
      } else {
        helper.verifySpinnerAppearsAndDissappears()
        cy.get(cqlLibrary.row1RecentActivity).click()
        cy.get(cqlLibrary.row1RecentActivity).click()
      }

    })

    helper.disabled(cqlLibrary.createVersionDraftRecentActivityBtn)
    helper.enabled(cqlLibrary.historyRecentActivityBtn)
    helper.enabled(cqlLibrary.viewRecentActivityBtn)
    helper.disabled(cqlLibrary.shareRecentActivityBtn)
    helper.disabled(cqlLibrary.deleteRecentActivityBtn)

  })

  it('Enabled/Disabled Recent Activity The Owner', () => {

    dataCreation.createDraftCqlLibrary('MYQdmDraft')

    helper.verifySpinnerAppearsAndDissappears()
    helper.verifySpinnerAppearsAndDissappears()

    helper.visibleWithTimeout(cqlLibrary.row1CqlLibrarySearch)

    cy.get(cqlLibrary.row1RecentActivity).then(elm => {

      if (Cypress.$(elm).length === 2) {
        helper.verifySpinnerAppearsAndDissappears()
        cy.get(cqlLibrary.row1RecentActivity).eq(1).click()
      } else {
        helper.verifySpinnerAppearsAndDissappears()
        cy.get(cqlLibrary.row1RecentActivity).click()
      }

    })

    helper.enabled(cqlLibrary.createVersionRecentActivityBtn)
    helper.enabled(cqlLibrary.historyRecentActivityBtn)
    helper.enabled(cqlLibrary.editRecentActivityEnabledBtn)
    helper.enabled(cqlLibrary.shareRecentActivityBtn)
    helper.enabled(cqlLibrary.deleteRecentActivityBtn)

    cy.get(cqlLibrary.createVersionRecentActivityBtn).click()
    cy.get(cqlLibrary.majorVersionTypeRadio).click()
    cy.get(cqlLibrary.versionSaveAndContinueBtn).click()

    helper.verifySpinnerAppearsAndDissappears()
    helper.visibleWithTimeout(cqlLibrary.row1CqlLibrarySearch)

    cy.get(cqlLibrary.row1RecentActivity).then(elm => {

      if (Cypress.$(elm).length === 2) {
        helper.verifySpinnerAppearsAndDissappears()
        cy.get(cqlLibrary.row1RecentActivity).eq(1).click()
        cy.get(cqlLibrary.row1RecentActivity).eq(1).click()
      } else {
        helper.verifySpinnerAppearsAndDissappears()
        cy.get(cqlLibrary.row1RecentActivity).click()
        cy.get(cqlLibrary.row1RecentActivity).click()
      }

    })

    helper.enabled(cqlLibrary.createDraftRecentActivityBtn)
    helper.enabled(cqlLibrary.historyRecentActivityBtn)
    helper.enabled(cqlLibrary.viewRecentActivityBtn)
    helper.enabled(cqlLibrary.shareRecentActivityBtn)
    helper.disabled(cqlLibrary.deleteRecentActivityBtn)

  })

  it('Recent Activity Button Bar Create Version', () => {

    helper.enabledWithTimeout(cqlLibrary.searchInputBox, 120000)
    helper.enterText(cqlLibrary.searchInputBox, draftCqlLibraryOwner)
    cy.get(cqlLibrary.searchBtn).click()

    helper.verifySpinnerAppearsAndDissappears()
    helper.verifySpinnerAppearsAndDissappears()

    helper.visibleWithTimeout(cqlLibrary.row1CqlLibrarySearch, 120000)

    gridRowActions.doubleClickRow(cqlLibrary.row1CqlLibrarySearch)

    helper.verifySpinnerAppearsAndDissappears()

    cy.get(measurelibrary.cqlLibraryTab).click()

    helper.verifySpinnerAppearsAndDissappears()
    helper.visibleWithTimeout(cqlLibrary.row1CqlLibrarySearch)

    cy.get(cqlLibrary.row1RecentActivity).then(elm => {

      if (Cypress.$(elm).length === 2) {
        helper.verifySpinnerAppearsAndDissappears()
        helper.visibleWithTimeout(cqlLibrary.row1CqlLibrarySearch)
        cy.get(cqlLibrary.row1RecentActivity).eq(1).click()
        cy.wait(500)
        cy.get(cqlLibrary.row1RecentActivity).eq(1).click()
      } else {
        helper.verifySpinnerAppearsAndDissappears()
        helper.visibleWithTimeout(cqlLibrary.row1CqlLibrarySearch)
        cy.get(cqlLibrary.row1RecentActivity).click()
        cy.wait(500)
        cy.get(cqlLibrary.row1RecentActivity).click()
      }

    })

    cy.get(cqlLibrary.createVersionRecentActivityBtn).click()

    cy.get(cqlLibrary.title).contains('My CQL Library > Create CQL Library Version of Draft')

    cy.get(cqlLibrary.cancelBtn).click()

    helper.verifySpinnerAppearsAndDissappears()

  })

  it('Recent Activity Button Bar Create Draft', () => {

    helper.enabledWithTimeout(cqlLibrary.searchInputBox, 120000)
    helper.enterText(cqlLibrary.searchInputBox, versionedCQLLibary)
    cy.get(cqlLibrary.searchBtn).click()

    helper.verifySpinnerAppearsAndDissappears()
    helper.verifySpinnerAppearsAndDissappears()

    helper.visibleWithTimeout(cqlLibrary.row1CqlLibrarySearch, 120000)

    gridRowActions.doubleClickRow(cqlLibrary.row1CqlLibrarySearch)

    helper.verifySpinnerAppearsAndDissappears()
    helper.verifySpinnerAppearsAndDissappears()
    helper.visibleWithTimeout(cqlComposer.cqlWorkspaceTitleGeneralInformation)

    cy.get(measurelibrary.cqlLibraryTab).click()

    helper.verifySpinnerAppearsAndDissappears()
    helper.visibleWithTimeout(cqlLibrary.row1CqlLibrarySearch, 120000)

    helper.visibleWithTimeout(cqlLibrary.row1RecentActivity)
    cy.get(cqlLibrary.row1RecentActivity).then(elm => {

      if (Cypress.$(elm).length === 2) {
        cy.get(cqlLibrary.row1RecentActivity).eq(1).click()
        cy.get(cqlLibrary.row1RecentActivity).eq(1).click()
      } else {
        cy.get(cqlLibrary.row1RecentActivity).click()
        cy.get(cqlLibrary.row1RecentActivity).click()
      }

    })

    cy.get(cqlLibrary.createDraftRecentActivityBtn).click()

    cy.get(cqlLibrary.title).contains('My CQL Library > Draft CQL Library')

    cy.get(cqlLibrary.draftCancelBtn).click()

    helper.verifySpinnerAppearsAndDissappears()
  })

  it('Recent Activity Button Bar History', () => {
    helper.verifySpinnerAppearsAndDissappears()
    helper.visibleWithTimeout(cqlLibrary.row1CqlLibrarySearch)

    gridRowActions.doubleClickRow(cqlLibrary.row1CqlLibrarySearch)

    helper.verifySpinnerAppearsAndDissappears()

    cy.get(measurelibrary.cqlLibraryTab).click()

    helper.verifySpinnerAppearsAndDissappears()
    helper.verifySpinnerAppearsAndDissappears()
    helper.visibleWithTimeout(cqlLibrary.row1CqlLibrarySearch, 120000)

    cy.get(cqlLibrary.row1RecentActivity).then(elm => {

      if (Cypress.$(elm).length === 2) {
        cy.get(cqlLibrary.row1RecentActivity).eq(1).click()
      } else {
        cy.get(cqlLibrary.row1RecentActivity).click()
      }

    })

    cy.get(cqlLibrary.historyRecentActivityBtn).click()

    cy.get(cqlLibrary.title).contains('My CQL Library > History')

    cy.get(cqlLibrary.returnToCqlLibrary).click()

    helper.verifySpinnerAppearsAndDissappears()

  })

  it('Recent Activity Button Bar View', () => {

    dataCreation.createDraftCqlLibrary('MYQdmDraft')

    helper.verifySpinnerAppearsAndDissappears()

    helper.visibleWithTimeout(cqlLibrary.row1CqlLibrarySearch)

    cy.get(cqlLibrary.row1RecentActivity).then(elm => {

      if (Cypress.$(elm).length === 2) {
        cy.get(cqlLibrary.row1RecentActivity).eq(1).click()
      } else {
        cy.get(cqlLibrary.row1RecentActivity).click()
      }

    })

    cy.get(cqlLibrary.createVersionRecentActivityBtn).click()

    cy.get(cqlLibrary.majorVersionTypeRadio).click()

    cy.get(cqlLibrary.versionSaveAndContinueBtn).click()

    helper.verifySpinnerAppearsAndDissappears()

    helper.visibleWithTimeout(cqlLibrary.row1CqlLibrarySearch)

    cy.get(cqlLibrary.row1RecentActivity).then(elm => {

      if (Cypress.$(elm).length === 2) {
        cy.get(cqlLibrary.row1RecentActivity).eq(1).click()
      } else {
        cy.get(cqlLibrary.row1RecentActivity).click()
      }

    })

    cy.get(cqlLibrary.viewRecentActivityBtn).click()

    helper.verifySpinnerAppearsAndDissappears()

    helper.disabled(cqlComposer.saveBtn)

    cy.get(measurelibrary.cqlLibraryTab).click()

    helper.verifySpinnerAppearsAndDissappears()
    helper.verifySpinnerAppearsAndDissappears()

    helper.visibleWithTimeout(cqlLibrary.row1CqlLibrarySearch)

  })

  it('Recent Activity Button Bar Edit', () => {

    helper.enabledWithTimeout(cqlLibrary.searchInputBox, 120000)
    helper.enterText(cqlLibrary.searchInputBox, draftCqlLibraryOwner)
    cy.get(cqlLibrary.searchBtn).click()

    helper.verifySpinnerAppearsAndDissappears()
    helper.verifySpinnerAppearsAndDissappears()

    helper.visibleWithTimeout(cqlLibrary.row1CqlLibrarySearch, 120000)

    gridRowActions.doubleClickRow(cqlLibrary.row1CqlLibrarySearch)

    helper.verifySpinnerAppearsAndDissappears()
    helper.verifySpinnerAppearsAndDissappears()
    helper.visibleWithTimeout(cqlComposer.cqlWorkspaceTitleGeneralInformation)

    cy.get(measurelibrary.cqlLibraryTab).click()

    helper.verifySpinnerAppearsAndDissappears()
    helper.visibleWithTimeout(cqlLibrary.row1CqlLibrarySearch, 120000)

    helper.visibleWithTimeout(cqlLibrary.row1RecentActivity, 120000)
    cy.get(cqlLibrary.row1RecentActivity).then(elm => {

      if (Cypress.$(elm).length === 2) {
        cy.get(cqlLibrary.row1RecentActivity).eq(1).click()
        cy.get(cqlLibrary.row1RecentActivity).eq(1).click()
      } else {
        cy.get(cqlLibrary.row1RecentActivity).click()
        cy.get(cqlLibrary.row1RecentActivity).click()
      }

    })

    cy.get(cqlLibrary.editRecentActivityEnabledBtn).click()

    helper.verifySpinnerAppearsAndDissappears()

    helper.enabled(cqlComposer.saveBtn)

    cy.get(measurelibrary.cqlLibraryTab).click()

    helper.verifySpinnerAppearsAndDissappears()

  })

  it('Recent Activity Button Bar Share', () => {

    helper.enabledWithTimeout(cqlLibrary.searchInputBox, 120000)
    helper.enterText(cqlLibrary.searchInputBox, draftCqlLibraryOwner)
    cy.get(cqlLibrary.searchBtn).click()

    helper.verifySpinnerAppearsAndDissappears()
    helper.verifySpinnerAppearsAndDissappears()

    helper.visibleWithTimeout(cqlLibrary.row1CqlLibrarySearch, 120000)

    gridRowActions.doubleClickRow(cqlLibrary.row1CqlLibrarySearch)

    helper.verifySpinnerAppearsAndDissappears()

    cy.get(measurelibrary.cqlLibraryTab).click()

    helper.verifySpinnerAppearsAndDissappears()
    helper.visibleWithTimeout(cqlLibrary.row1CqlLibrarySearch, 120000)

    helper.visibleWithTimeout(cqlLibrary.row1RecentActivity, 120000)
    cy.get(cqlLibrary.row1RecentActivity).then(elm => {

      if (Cypress.$(elm).length === 2) {
        cy.get(cqlLibrary.row1RecentActivity).eq(1).click()
        cy.get(cqlLibrary.row1RecentActivity).eq(1).click()
      } else {
        cy.get(cqlLibrary.row1RecentActivity).click()
        cy.get(cqlLibrary.row1RecentActivity).click()
      }

    })

    cy.get(cqlLibrary.shareRecentActivityBtn).click()

    helper.verifySpinnerAppearsAndDissappears()

    cy.get(cqlLibrary.title).contains('My CQL Libraries > CQL Library Sharing')

    cy.get(cqlLibrary.shareCancelBtn).click()

    helper.verifySpinnerAppearsAndDissappears()

  })

  it('Recent Activity Button Bar Delete', () => {

    helper.enabledWithTimeout(cqlLibrary.searchInputBox, 120000)
    helper.enterText(cqlLibrary.searchInputBox, draftCqlLibraryOwner)
    cy.get(cqlLibrary.searchBtn).click()

    helper.verifySpinnerAppearsAndDissappears()
    helper.verifySpinnerAppearsAndDissappears()

    helper.visibleWithTimeout(cqlLibrary.row1CqlLibrarySearch, 120000)

    gridRowActions.doubleClickRow(cqlLibrary.row1CqlLibrarySearch)

    helper.verifySpinnerAppearsAndDissappears()

    cy.get(measurelibrary.cqlLibraryTab).click()

    helper.verifySpinnerAppearsAndDissappears()
    helper.visibleWithTimeout(cqlLibrary.row1CqlLibrarySearch, 120000)

    helper.visibleWithTimeout(cqlLibrary.row1RecentActivity, 120000)
    cy.get(cqlLibrary.row1RecentActivity).then(elm => {

      if (Cypress.$(elm).length === 2) {
        cy.get(cqlLibrary.row1RecentActivity).eq(1).click()
        cy.get(cqlLibrary.row1RecentActivity).eq(1).click()
      } else {
        cy.get(cqlLibrary.row1RecentActivity).click()
        cy.get(cqlLibrary.row1RecentActivity).click()
      }

    })

    cy.get(cqlLibrary.deleteRecentActivityBtn).click()

    helper.visible(cqlLibrary.modal)

    cy.get(cqlLibrary.modalCloseBtn).click()

    cy.get(cqlLibrary.row1RecentActivity).then(elm => {

      if (Cypress.$(elm).length === 2) {
        cy.get(cqlLibrary.row1RecentActivity).eq(1).click()
      } else {
        cy.get(cqlLibrary.row1RecentActivity).click()
      }

    })
  })

  it('Enabled/Disabled All CQL Libraries Not The Owner', () => {

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

  it('Enabled/Disabled All CQL Libraries The Owner', () => {

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

  it('CQL Libraries Button Bar Create Version', () => {

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
  it('CQL Libraries Button Bar Create Draft', () => {

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
  it('CQL Libraries Button Bar History', () => {

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

  it('CQL Libraries Button Bar View', () => {

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

  it('CQL Libraries Button Bar Edit', () => {

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

  it('CQL Libraries Button Bar Share', () => {

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

  it('CQL Libraries Button Bar Delete', () => {

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



