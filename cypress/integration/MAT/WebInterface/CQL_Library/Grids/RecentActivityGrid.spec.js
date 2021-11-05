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

describe('CQL Library: Recent Activity Grid', () => {
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
  it('Enabled/Disabled Not The Owner', () => {

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
        //cy.get(cqlLibrary.row1RecentActivity).eq(1).click()
      } else {
        helper.verifySpinnerAppearsAndDissappears()
        cy.get(cqlLibrary.row1RecentActivity).click()
        //cy.get(cqlLibrary.row1RecentActivity).click()
      }

    })

    helper.disabled(cqlLibrary.createVersionDraftRecentActivityBtn)
    helper.enabled(cqlLibrary.historyRecentActivityBtn)
    helper.enabled(cqlLibrary.viewRecentActivityBtn)
    helper.disabled(cqlLibrary.shareRecentActivityBtn)
    helper.disabled(cqlLibrary.deleteRecentActivityBtn)

  })

  it('Enabled/Disabled The Owner', () => {

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
        //cy.get(cqlLibrary.row1RecentActivity).eq(1).click()
      } else {
        helper.verifySpinnerAppearsAndDissappears()
        cy.get(cqlLibrary.row1RecentActivity).click()
        //cy.get(cqlLibrary.row1RecentActivity).click()
      }

    })

    helper.enabled(cqlLibrary.createDraftRecentActivityBtn)
    helper.enabled(cqlLibrary.historyRecentActivityBtn)
    helper.enabled(cqlLibrary.viewRecentActivityBtn)
    helper.enabled(cqlLibrary.shareRecentActivityBtn)
    helper.disabled(cqlLibrary.deleteRecentActivityBtn)

  })

  it('Button Bar Create Version', () => {

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
        // cy.wait(500)
        // cy.get(cqlLibrary.row1RecentActivity).eq(1).click()
      } else {
        helper.verifySpinnerAppearsAndDissappears()
        helper.visibleWithTimeout(cqlLibrary.row1CqlLibrarySearch)
        cy.get(cqlLibrary.row1RecentActivity).click()
        // cy.wait(500)
        // cy.get(cqlLibrary.row1RecentActivity).click()
      }

    })

    cy.get(cqlLibrary.createVersionRecentActivityBtn).click()

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
        //cy.get(cqlLibrary.row1RecentActivity).eq(1).click()
      } else {
        cy.get(cqlLibrary.row1RecentActivity).click()
        //cy.get(cqlLibrary.row1RecentActivity).click()
      }

    })

    cy.get(cqlLibrary.createDraftRecentActivityBtn).click()

    cy.get(cqlLibrary.title).contains('My CQL Library > Draft CQL Library')

    cy.get(cqlLibrary.draftCancelBtn).click()

    helper.verifySpinnerAppearsAndDissappears()
  })

  it('Button Bar History', () => {
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

  it('Button Bar View', () => {

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

  it('Button Bar Edit', () => {

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
        //cy.get(cqlLibrary.row1RecentActivity).eq(1).click()
      } else {
        cy.get(cqlLibrary.row1RecentActivity).click()
        //cy.get(cqlLibrary.row1RecentActivity).click()
      }

    })

    cy.get(cqlLibrary.editRecentActivityEnabledBtn).click()

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
        //cy.get(cqlLibrary.row1RecentActivity).eq(1).click()
      } else {
        cy.get(cqlLibrary.row1RecentActivity).click()
        //cy.get(cqlLibrary.row1RecentActivity).click()
      }

    })

    cy.get(cqlLibrary.shareRecentActivityBtn).click()

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
        //cy.get(cqlLibrary.row1RecentActivity).eq(1).click()
      } else {
        cy.get(cqlLibrary.row1RecentActivity).click()
        //cy.get(cqlLibrary.row1RecentActivity).click()
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
})


