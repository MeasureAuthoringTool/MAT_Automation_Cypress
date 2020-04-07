import * as helper from '../../../../support/helpers'
import * as measurelibrary from '../../../../pom/MAT/WI/MeasureLibrary'
import * as matheader from "../../../../pom/MAT/WI/MATheader";
import * as cqlLibrary from '../../../../pom/MAT/WI/CqlLibrary'
import * as createNewCqlLibrary from '../../../../pom/MAT/WI/CreateNewCQLLibrary'
import * as cqlComposer from "../../../../pom/MAT/WI/CQLComposer"

let draftCqlLibraryNotowner = ''


describe('CQL Library Grid Selection', () => {
    before('Login', () => {
        helper.loginGeneric()

        cy.get(measurelibrary.cqlLibraryTab).click()

        helper.visibleWithTimeout(matheader.progressbar)
        helper.notVisibleWithTimeout(matheader.progressbar)

        //populating search table
        cy.get(cqlLibrary.filterByMyLibrariesChkBox).eq(1).click()
        cy.get(cqlLibrary.searchBtn).click()

        helper.visibleWithTimeout(matheader.progressbar)
        helper.notVisibleWithTimeout(matheader.progressbar)
    })
    beforeEach('Preserve Cookies', () => {
        helper.preserveCookies()
    })
    after('Log Out', () => {
        helper.logout()
    })
    it('Recent Activity', () => {

        //populating recent activity grid
        cy.get(cqlLibrary.row1CqlLibrarySearch).dblclick()

        helper.visibleWithTimeout(matheader.progressbar)
        helper.notVisibleWithTimeout(matheader.progressbar)

        cy.get(measurelibrary.cqlLibraryTab).click()

        helper.visibleWithTimeout(matheader.progressbar)
        helper.notVisibleWithTimeout(matheader.progressbar)

        cy.get(cqlLibrary.row2CqlLibrarySearch).dblclick()

        helper.visibleWithTimeout(matheader.progressbar)
        helper.notVisibleWithTimeout(matheader.progressbar)

        cy.get(measurelibrary.cqlLibraryTab).click()

        helper.visibleWithTimeout(matheader.progressbar)
        helper.notVisibleWithTimeout(matheader.progressbar)

        helper.visibleWithTimeout(cqlLibrary.row1RecentActivity)

        cy.get(cqlLibrary.row1RecentActivity).then(elm => {

            if (Cypress.$(elm).length === 2)
            {
                cy.get(cqlLibrary.row1RecentActivity).eq(1).click()
            }
            else
            {
                cy.get(cqlLibrary.row1RecentActivity).click()
            }

        })

        cy.wait(1000)

        helper.isChecked(cqlLibrary.row1RecentActivityCheckbox)

        cy.get(cqlLibrary.row2RecentActivity).then(elm => {

            if (Cypress.$(elm).length === 2)
            {
                cy.get(cqlLibrary.row2RecentActivity).eq(1).click()
            }
            else
            {
                cy.get(cqlLibrary.row2RecentActivity).click()
            }

        })

        helper.isChecked(cqlLibrary.row2RecentActivityCheckbox)
        helper.isNotChecked(cqlLibrary.row1RecentActivityCheckbox)

        cy.wait(1000)

        cy.get(cqlLibrary.row2RecentActivity).then(elm => {

            if (Cypress.$(elm).length === 2)
            {
                cy.get(cqlLibrary.row2RecentActivity).eq(1).click()
            }
            else
            {
                cy.get(cqlLibrary.row2RecentActivity).click()
            }

        })

        helper.isNotChecked(cqlLibrary.row2RecentActivityCheckbox)
        helper.isNotChecked(cqlLibrary.row1RecentActivityCheckbox)

    })

    it('CQL Library Search Table', () => {

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

describe('CQL Library Grid Button Bar', () => {
    before('Login', () => {

        draftCqlLibraryNotowner = helper.loginCreateDraftCqlLibraryNotOwnerLogout()

        helper.loginGeneric()
        cy.get(measurelibrary.cqlLibraryTab).click()

        helper.visibleWithTimeout(matheader.progressbar)
        helper.notVisibleWithTimeout(matheader.progressbar)

        //populating search table
        cy.get(cqlLibrary.filterByMyLibrariesChkBox).eq(1).click()
        cy.get(cqlLibrary.searchBtn).click()

        helper.visibleWithTimeout(matheader.progressbar)
        helper.notVisibleWithTimeout(matheader.progressbar)
    })
    beforeEach('Preserve Session', () => {
        helper.preserveCookies()
    })
    after('Log Out', () => {
        helper.logout()
    })
    it('Enabled/Disabled Recent Activity Not The Owner', () => {

        //populating recent activity grid
        helper.enterText(cqlLibrary.searchInputBox, draftCqlLibraryNotowner)
        cy.get(cqlLibrary.searchBtn).click()

        helper.visibleWithTimeout(matheader.progressbar)
        helper.notVisibleWithTimeout(matheader.progressbar)

        cy.get(cqlLibrary.row1CqlLibrarySearch).dblclick()

        helper.visibleWithTimeout(matheader.progressbar)
        helper.notVisibleWithTimeout(matheader.progressbar)

        cy.get(measurelibrary.cqlLibraryTab).click()

        helper.visibleWithTimeout(matheader.progressbar)
        helper.notVisibleWithTimeout(matheader.progressbar)

        helper.visibleWithTimeout(cqlLibrary.row1RecentActivity)

        cy.get(cqlLibrary.row1RecentActivity).then(elm => {

            if (Cypress.$(elm).length === 2)
            {
                cy.get(cqlLibrary.row1RecentActivity).eq(1).click()
            }
            else
            {
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

        cy.get(cqlLibrary.newLibraryBtn).click()

        let cqlLibraryName = 'CQLLibraryTest' + Date.now()

        cy.get(createNewCqlLibrary.cqlLibraryName).type(cqlLibraryName, { delay: 50 })

        cy.get(createNewCqlLibrary.modelQDMRadio).click()

        cy.get(createNewCqlLibrary.saveAndContinueBtn).click()

        cy.get(cqlComposer.confirmationContinueBtn).click()

        helper.visibleWithTimeout(matheader.progressbar)
        helper.notVisibleWithTimeout(matheader.progressbar)

        cy.get(measurelibrary.cqlLibraryTab).click()

        helper.visibleWithTimeout(matheader.progressbar)
        helper.notVisibleWithTimeout(matheader.progressbar)

        cy.get(cqlLibrary.row1RecentActivity).then(elm => {

            if (Cypress.$(elm).length === 2)
            {
                cy.get(cqlLibrary.row1RecentActivity).eq(1).click()
            }
            else
            {
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
        cy.get(cqlLibrary.saveAndContinueBtn).click()

        helper.visibleWithTimeout(matheader.progressbar)
        helper.notVisibleWithTimeout(matheader.progressbar)

        cy.get(cqlLibrary.row1RecentActivity).then(elm => {

            if (Cypress.$(elm).length === 2)
            {
                cy.get(cqlLibrary.row1RecentActivity).eq(1).click()
            }
            else
            {
                cy.get(cqlLibrary.row1RecentActivity).click()
            }

        })

        helper.enabled(cqlLibrary.createDraftRecentActivityBtn)
        helper.enabled(cqlLibrary.historyRecentActivityBtn)
        helper.enabled(cqlLibrary.viewRecentActivityBtn)
        helper.enabled(cqlLibrary.shareRecentActivityBtn)
        helper.disabled(cqlLibrary.deleteRecentActivityBtn)

    })

    it('Enabled/Disabled All CQL Libraries Not The Owner', () => {

        cy.get(cqlLibrary.row1CqlLibrarySearch).click()

        helper.disabled(cqlLibrary.createVersionDraftCqllibrariesBtn)
        helper.enabled(cqlLibrary.historyCqllibrariesBtn)
        helper.enabled(cqlLibrary.viewCqllibrariesBtn)
        helper.disabled(cqlLibrary.shareCqllibrariesBtn)
        helper.disabled(cqlLibrary.deleteCqllibrariesBtn)

    })

    it('Enabled/Disabled All CQL Libraries The Owner', () => {

        cy.get(cqlLibrary.newLibraryBtn).click()

        let cqlLibraryName = 'CQLLibraryTest' + Date.now()

        cy.get(createNewCqlLibrary.cqlLibraryName).type(cqlLibraryName, { delay: 50 })

        cy.get(createNewCqlLibrary.modelQDMRadio).click()

        cy.get(createNewCqlLibrary.saveAndContinueBtn).click()

        cy.get(cqlComposer.confirmationContinueBtn).click()

        helper.visibleWithTimeout(matheader.progressbar)
        helper.notVisibleWithTimeout(matheader.progressbar)

        cy.get(measurelibrary.cqlLibraryTab).click()

        helper.visibleWithTimeout(matheader.progressbar)
        helper.notVisibleWithTimeout(matheader.progressbar)

        cy.get(cqlLibrary.searchInputBox).clear()
        cy.get(cqlLibrary.searchInputBox).type(cqlLibraryName, { delay: 50 })
        cy.get(cqlLibrary.searchBtn).click()

        helper.visibleWithTimeout(matheader.progressbar)
        helper.notVisibleWithTimeout(matheader.progressbar)

        cy.get(cqlLibrary.row1CqlLibrarySearch).click()

        helper.enabled(cqlLibrary.createVersionCqllibrariesBtn)
        helper.enabled(cqlLibrary.historyCqllibrariesBtn)
        helper.enabled(cqlLibrary.editCqllibrariesEnabledBtn)
        helper.enabled(cqlLibrary.shareCqllibrariesBtn)
        helper.enabled(cqlLibrary.deleteCqllibrariesBtn)

        cy.get(cqlLibrary.searchInputBox).clear()

    })

    it('Recent Activity Button Bar Create Version', () => {

        cy.get(cqlLibrary.newLibraryBtn).click()

        let cqlLibraryName = 'CQLLibraryTest' + Date.now()

        cy.get(createNewCqlLibrary.cqlLibraryName).type(cqlLibraryName, { delay: 50 })

        cy.get(createNewCqlLibrary.modelQDMRadio).click()

        cy.get(createNewCqlLibrary.saveAndContinueBtn).click()

        cy.get(cqlComposer.confirmationContinueBtn).click()

        helper.visibleWithTimeout(matheader.progressbar)
        helper.notVisibleWithTimeout(matheader.progressbar)

        cy.get(measurelibrary.cqlLibraryTab).click()

        helper.visibleWithTimeout(matheader.progressbar)
        helper.notVisibleWithTimeout(matheader.progressbar)

        cy.get(cqlLibrary.row1RecentActivity).then(elm => {

            if (Cypress.$(elm).length === 2)
            {
                cy.get(cqlLibrary.row1RecentActivity).eq(1).click()
            }
            else
            {
                cy.get(cqlLibrary.row1RecentActivity).click()
            }

        })

        cy.get(cqlLibrary.createVersionRecentActivityBtn).click()

        cy.get(cqlLibrary.title).contains("My CQL Library > Create CQL Library Version of Draft")

        cy.get(cqlLibrary.cancelBtn).click()

        helper.visibleWithTimeout(matheader.progressbar)
        helper.notVisibleWithTimeout(matheader.progressbar)


    })
    it('Recent Activity Button Bar Create Draft', () => {

        cy.get(cqlLibrary.newLibraryBtn).click()

        let cqlLibraryName = 'CQLLibraryTest' + Date.now()

        cy.get(createNewCqlLibrary.cqlLibraryName).type(cqlLibraryName, { delay: 50 })

        cy.get(createNewCqlLibrary.modelQDMRadio).click()

        cy.get(createNewCqlLibrary.saveAndContinueBtn).click()

        cy.get(cqlComposer.confirmationContinueBtn).click()

        helper.visibleWithTimeout(matheader.progressbar)
        helper.notVisibleWithTimeout(matheader.progressbar)

        cy.get(measurelibrary.cqlLibraryTab).click()

        helper.visibleWithTimeout(matheader.progressbar)
        helper.notVisibleWithTimeout(matheader.progressbar)

        cy.get(cqlLibrary.row1RecentActivity).then(elm => {

            if (Cypress.$(elm).length === 2)
            {
                cy.get(cqlLibrary.row1RecentActivity).eq(1).click()
            }
            else
            {
                cy.get(cqlLibrary.row1RecentActivity).click()
            }

        })

        cy.get(cqlLibrary.createVersionRecentActivityBtn).click()

        cy.get(cqlLibrary.majorVersionTypeRadio).click()

        cy.get(cqlLibrary.saveAndContinueBtn).click()

        helper.visibleWithTimeout(matheader.progressbar)
        helper.notVisibleWithTimeout(matheader.progressbar)

        cy.get(cqlLibrary.row1RecentActivity).then(elm => {

            if (Cypress.$(elm).length === 2)
            {
                cy.get(cqlLibrary.row1RecentActivity).eq(1).click()
            }
            else
            {
                cy.get(cqlLibrary.row1RecentActivity).click()
            }

        })

        cy.get(cqlLibrary.createDraftRecentActivityBtn).click()

        cy.get(cqlLibrary.title).contains("My CQL Library > Draft CQL Library")

        cy.get(cqlLibrary.draftCancelBtn).click()

        helper.visibleWithTimeout(matheader.progressbar)
        helper.notVisibleWithTimeout(matheader.progressbar)
    })

    it('Recent Activity Button Bar History', () => {

        cy.get(cqlLibrary.row1CqlLibrarySearch).dblclick()

        helper.visibleWithTimeout(matheader.progressbar)
        helper.notVisibleWithTimeout(matheader.progressbar)

        cy.get(measurelibrary.cqlLibraryTab).click()

        helper.visibleWithTimeout(matheader.progressbar)
        helper.notVisibleWithTimeout(matheader.progressbar)

        cy.get(cqlLibrary.row1RecentActivity).then(elm => {

            if (Cypress.$(elm).length === 2)
            {
                cy.get(cqlLibrary.row1RecentActivity).eq(1).click()
            }
            else
            {
                cy.get(cqlLibrary.row1RecentActivity).click()
            }

        })

        cy.get(cqlLibrary.historyRecentActivityBtn).click()

        cy.get(cqlLibrary.title).contains("My CQL Library > History")

        cy.get(cqlLibrary.returnToCqlLibrary).click()

        helper.visibleWithTimeout(matheader.progressbar)
        helper.notVisibleWithTimeout(matheader.progressbar)

    })

    it('Recent Activity Button Bar View', () => {

        cy.get(cqlLibrary.newLibraryBtn).click()

        let cqlLibraryName = 'CQLLibraryTest' + Date.now()

        cy.get(createNewCqlLibrary.cqlLibraryName).type(cqlLibraryName, { delay: 50 })

        cy.get(createNewCqlLibrary.modelQDMRadio).click()

        cy.get(createNewCqlLibrary.saveAndContinueBtn).click()

        cy.get(cqlComposer.confirmationContinueBtn).click()

        helper.visibleWithTimeout(matheader.progressbar)
        helper.notVisibleWithTimeout(matheader.progressbar)

        cy.get(measurelibrary.cqlLibraryTab).click()

        helper.visibleWithTimeout(matheader.progressbar)
        helper.notVisibleWithTimeout(matheader.progressbar)

        cy.get(cqlLibrary.row1RecentActivity).then(elm => {

            if (Cypress.$(elm).length === 2)
            {
                cy.get(cqlLibrary.row1RecentActivity).eq(1).click()
            }
            else
            {
                cy.get(cqlLibrary.row1RecentActivity).click()
            }

        })

        cy.get(cqlLibrary.createVersionRecentActivityBtn).click()

        cy.get(cqlLibrary.majorVersionTypeRadio).click()

        cy.get(cqlLibrary.saveAndContinueBtn).click()

        helper.visibleWithTimeout(matheader.progressbar)
        helper.notVisibleWithTimeout(matheader.progressbar)

        cy.get(cqlLibrary.row1RecentActivity).then(elm => {

            if (Cypress.$(elm).length === 2)
            {
                cy.get(cqlLibrary.row1RecentActivity).eq(1).click()
            }
            else
            {
                cy.get(cqlLibrary.row1RecentActivity).click()
            }

        })

        cy.get(cqlLibrary.viewRecentActivityBtn).click()

        helper.visibleWithTimeout(matheader.progressbar)
        helper.notVisibleWithTimeout(matheader.progressbar)

        helper.disabled(cqlComposer.saveBtn)

        cy.get(measurelibrary.cqlLibraryTab).click()

        helper.visibleWithTimeout(matheader.progressbar)
        helper.notVisibleWithTimeout(matheader.progressbar)

    })

    it('Recent Activity Button Bar Edit', () => {

        cy.get(cqlLibrary.newLibraryBtn).click()

        let cqlLibraryName = 'CQLLibraryTest' + Date.now()

        cy.get(createNewCqlLibrary.cqlLibraryName).type(cqlLibraryName, { delay: 50 })

        cy.get(createNewCqlLibrary.modelQDMRadio).click()

        cy.get(createNewCqlLibrary.saveAndContinueBtn).click()

        cy.get(cqlComposer.confirmationContinueBtn).click()

        helper.visibleWithTimeout(matheader.progressbar)
        helper.notVisibleWithTimeout(matheader.progressbar)

        cy.get(measurelibrary.cqlLibraryTab).click()

        helper.visibleWithTimeout(matheader.progressbar)
        helper.notVisibleWithTimeout(matheader.progressbar)

        cy.get(cqlLibrary.row1RecentActivity).then(elm => {

            if (Cypress.$(elm).length === 2)
            {
                cy.get(cqlLibrary.row1RecentActivity).eq(1).click()
            }
            else
            {
                cy.get(cqlLibrary.row1RecentActivity).click()
            }

        })

        cy.get(cqlLibrary.editRecentActivityEnabledBtn).click()

        helper.visibleWithTimeout(matheader.progressbar)
        helper.notVisibleWithTimeout(matheader.progressbar)

        helper.enabled(cqlComposer.saveBtn)

        cy.get(measurelibrary.cqlLibraryTab).click()

        helper.visibleWithTimeout(matheader.progressbar)
        helper.notVisibleWithTimeout(matheader.progressbar)

    })

    it('Recent Activity Button Bar Share', () => {

        cy.get(cqlLibrary.newLibraryBtn).click()

        let cqlLibraryName = 'CQLLibraryTest' + Date.now()

        cy.get(createNewCqlLibrary.cqlLibraryName).type(cqlLibraryName, { delay: 50 })

        cy.get(createNewCqlLibrary.modelQDMRadio).click()

        cy.get(createNewCqlLibrary.saveAndContinueBtn).click()

        cy.get(cqlComposer.confirmationContinueBtn).click()

        helper.visibleWithTimeout(matheader.progressbar)
        helper.notVisibleWithTimeout(matheader.progressbar)

        cy.get(measurelibrary.cqlLibraryTab).click()

        helper.visibleWithTimeout(matheader.progressbar)
        helper.notVisibleWithTimeout(matheader.progressbar)

        cy.get(cqlLibrary.row1RecentActivity).then(elm => {

            if (Cypress.$(elm).length === 2)
            {
                cy.get(cqlLibrary.row1RecentActivity).eq(1).click()
            }
            else
            {
                cy.get(cqlLibrary.row1RecentActivity).click()
            }

        })

        cy.get(cqlLibrary.shareRecentActivityBtn).click()

        helper.visibleWithTimeout(matheader.progressbar)
        helper.notVisibleWithTimeout(matheader.progressbar)

        cy.get(cqlLibrary.title).contains("My CQL Libraries > CQL Library Sharing")

        cy.get(cqlLibrary.shareCancelBtn).click()

        helper.visibleWithTimeout(matheader.progressbar)
        helper.notVisibleWithTimeout(matheader.progressbar)

    })

    it('Recent Activity Button Bar Delete', () => {

        cy.get(cqlLibrary.newLibraryBtn).click()

        let cqlLibraryName = 'CQLLibraryTest' + Date.now()

        cy.get(createNewCqlLibrary.cqlLibraryName).type(cqlLibraryName, { delay: 50 })

        cy.get(createNewCqlLibrary.modelQDMRadio).click()

        cy.get(createNewCqlLibrary.saveAndContinueBtn).click()

        cy.get(cqlComposer.confirmationContinueBtn).click()

        helper.visibleWithTimeout(matheader.progressbar)
        helper.notVisibleWithTimeout(matheader.progressbar)

        cy.get(measurelibrary.cqlLibraryTab).click()

        helper.visibleWithTimeout(matheader.progressbar)
        helper.notVisibleWithTimeout(matheader.progressbar)

        cy.get(cqlLibrary.row1RecentActivity).then(elm => {

            if (Cypress.$(elm).length === 2)
            {
                cy.get(cqlLibrary.row1RecentActivity).eq(1).click()
            }
            else
            {
                cy.get(cqlLibrary.row1RecentActivity).click()
            }

        })

        cy.get(cqlLibrary.deleteRecentActivityBtn).click()

        helper.visible(cqlLibrary.modal)

        cy.get(cqlLibrary.modalCloseBtn).click()

        cy.get(cqlLibrary.row1RecentActivity).then(elm => {

            if (Cypress.$(elm).length === 2)
            {
                cy.get(cqlLibrary.row1RecentActivity).eq(1).click()
            }
            else
            {
                cy.get(cqlLibrary.row1RecentActivity).click()
            }

        })

    })

    it('CQL Libraries Button Bar Create Version', () => {

        cy.get(cqlLibrary.newLibraryBtn).click()

        let cqlLibraryName = 'CQLLibraryTest' + Date.now()

        cy.get(createNewCqlLibrary.cqlLibraryName).type(cqlLibraryName, { delay: 50 })

        cy.get(createNewCqlLibrary.modelQDMRadio).click()

        cy.get(createNewCqlLibrary.saveAndContinueBtn).click()

        cy.get(cqlComposer.confirmationContinueBtn).click()

        helper.visibleWithTimeout(matheader.progressbar)
        helper.notVisibleWithTimeout(matheader.progressbar)

        cy.get(measurelibrary.cqlLibraryTab).click()

        helper.visibleWithTimeout(matheader.progressbar)
        helper.notVisibleWithTimeout(matheader.progressbar)

        cy.get(cqlLibrary.searchInputBox).clear()
        cy.get(cqlLibrary.searchInputBox).type(cqlLibraryName, { delay: 50 })
        cy.get(cqlLibrary.searchBtn).click()

        helper.visibleWithTimeout(matheader.progressbar)
        helper.notVisibleWithTimeout(matheader.progressbar)

        cy.get(cqlLibrary.row1CqlLibrarySearch).click()

        cy.get(cqlLibrary.createVersionCqllibrariesBtn).click()

        cy.get(cqlLibrary.title).contains("My CQL Library > Create CQL Library Version of Draft")

        cy.get(cqlLibrary.cancelBtn).click()

        helper.visibleWithTimeout(matheader.progressbar)
        helper.notVisibleWithTimeout(matheader.progressbar)

    })
    it('CQL Libraries Button Bar Create Draft', () => {

        cy.get(cqlLibrary.newLibraryBtn).click()

        let cqlLibraryName = 'CQLLibraryTest' + Date.now()

        cy.get(createNewCqlLibrary.cqlLibraryName).type(cqlLibraryName, { delay: 50 })

        cy.get(createNewCqlLibrary.modelQDMRadio).click()

        cy.get(createNewCqlLibrary.saveAndContinueBtn).click()

        cy.get(cqlComposer.confirmationContinueBtn).click()

        helper.visibleWithTimeout(matheader.progressbar)
        helper.notVisibleWithTimeout(matheader.progressbar)

        cy.get(measurelibrary.cqlLibraryTab).click()

        helper.visibleWithTimeout(matheader.progressbar)
        helper.notVisibleWithTimeout(matheader.progressbar)

        cy.get(cqlLibrary.searchInputBox).clear()
        cy.get(cqlLibrary.searchInputBox).type(cqlLibraryName, { delay: 50 })
        cy.get(cqlLibrary.searchBtn).click()

        helper.visibleWithTimeout(matheader.progressbar)
        helper.notVisibleWithTimeout(matheader.progressbar)

        cy.get(cqlLibrary.row1CqlLibrarySearch).click()

        cy.get(cqlLibrary.createVersionCqllibrariesBtn).click()

        cy.get(cqlLibrary.majorVersionTypeRadio).click()

        cy.get(cqlLibrary.saveAndContinueBtn).click()

        helper.visibleWithTimeout(matheader.progressbar)
        helper.notVisibleWithTimeout(matheader.progressbar)

        cy.get(cqlLibrary.row1CqlLibrarySearch).click()

        cy.get(cqlLibrary.createDraftCqllibrariesBtn).click()

        cy.get(cqlLibrary.title).contains("My CQL Library > Draft CQL Library")

        cy.get(cqlLibrary.draftCancelBtn).click()

        helper.visibleWithTimeout(matheader.progressbar)
        helper.notVisibleWithTimeout(matheader.progressbar)
    })
    it('CQL Libraries Button Bar History', () => {

        cy.get(cqlLibrary.row1CqlLibrarySearch).click()

        cy.get(cqlLibrary.historyCqllibrariesBtn).click()

        cy.get(cqlLibrary.title).contains("My CQL Library > History")

        cy.get(cqlLibrary.returnToCqlLibrary).click()

        helper.visibleWithTimeout(matheader.progressbar)
        helper.notVisibleWithTimeout(matheader.progressbar)

    })

    it('CQL Libraries Button Bar View', () => {

        cy.get(cqlLibrary.row1CqlLibrarySearch).click()

        cy.get(cqlLibrary.viewCqllibrariesBtn).click()

        helper.visibleWithTimeout(matheader.progressbar)
        helper.notVisibleWithTimeout(matheader.progressbar)

        helper.disabled(cqlComposer.saveBtn)

        cy.get(measurelibrary.cqlLibraryTab).click()

        helper.visibleWithTimeout(matheader.progressbar)
        helper.notVisibleWithTimeout(matheader.progressbar)

    })

    it('CQL Libraries Button Bar Edit', () => {

        cy.get(cqlLibrary.newLibraryBtn).click()

        let cqlLibraryName = 'CQLLibraryTest' + Date.now()

        cy.get(createNewCqlLibrary.cqlLibraryName).type(cqlLibraryName, { delay: 50 })

        cy.get(createNewCqlLibrary.modelQDMRadio).click()

        cy.get(createNewCqlLibrary.saveAndContinueBtn).click()

        cy.get(cqlComposer.confirmationContinueBtn).click()

        helper.visibleWithTimeout(matheader.progressbar)
        helper.notVisibleWithTimeout(matheader.progressbar)

        cy.get(measurelibrary.cqlLibraryTab).click()

        helper.visibleWithTimeout(matheader.progressbar)
        helper.notVisibleWithTimeout(matheader.progressbar)

        cy.get(cqlLibrary.searchInputBox).clear()
        cy.get(cqlLibrary.searchInputBox).type(cqlLibraryName, { delay: 50 })

        cy.get(cqlLibrary.searchBtn).click()

        helper.visibleWithTimeout(matheader.progressbar)
        helper.notVisibleWithTimeout(matheader.progressbar)

        cy.get(cqlLibrary.row1CqlLibrarySearch).click()

        cy.get(cqlLibrary.editCqllibrariesEnabledBtn).click()

        helper.visibleWithTimeout(matheader.progressbar)
        helper.notVisibleWithTimeout(matheader.progressbar)

        helper.enabled(cqlComposer.saveBtn)

        cy.get(measurelibrary.cqlLibraryTab).click()

        helper.visibleWithTimeout(matheader.progressbar)
        helper.notVisibleWithTimeout(matheader.progressbar)

    })

    it('CQL Libraries Button Bar Share', () => {

        cy.get(cqlLibrary.newLibraryBtn).click()

        let cqlLibraryName = 'CQLLibraryTest' + Date.now()

        cy.get(createNewCqlLibrary.cqlLibraryName).type(cqlLibraryName, { delay: 50 })

        cy.get(createNewCqlLibrary.modelQDMRadio).click()

        cy.get(createNewCqlLibrary.saveAndContinueBtn).click()

        cy.get(cqlComposer.confirmationContinueBtn).click()

        helper.visibleWithTimeout(matheader.progressbar)
        helper.notVisibleWithTimeout(matheader.progressbar)

        cy.get(measurelibrary.cqlLibraryTab).click()

        helper.visibleWithTimeout(matheader.progressbar)
        helper.notVisibleWithTimeout(matheader.progressbar)

        cy.get(cqlLibrary.searchInputBox).clear()
        cy.get(cqlLibrary.searchInputBox).type(cqlLibraryName, { delay: 50 })

        cy.get(cqlLibrary.searchBtn).click()

        helper.visibleWithTimeout(matheader.progressbar)
        helper.notVisibleWithTimeout(matheader.progressbar)

        cy.get(cqlLibrary.row1CqlLibrarySearch).click()

        cy.get(cqlLibrary.shareCqllibrariesBtn).click()

        helper.visibleWithTimeout(matheader.progressbar)
        helper.notVisibleWithTimeout(matheader.progressbar)

        cy.get(cqlLibrary.title).contains("My CQL Libraries > CQL Library Sharing")

        cy.get(cqlLibrary.shareCancelBtn).click()

        helper.visibleWithTimeout(matheader.progressbar)
        helper.notVisibleWithTimeout(matheader.progressbar)

    })

    it('CQL Libraries Button Bar Delete', () => {

        cy.get(cqlLibrary.newLibraryBtn).click()

        let cqlLibraryName = 'CQLLibraryTest' + Date.now()

        cy.get(createNewCqlLibrary.cqlLibraryName).type(cqlLibraryName, { delay: 50 })

        cy.get(createNewCqlLibrary.modelQDMRadio).click()

        cy.get(createNewCqlLibrary.saveAndContinueBtn).click()

        cy.get(cqlComposer.confirmationContinueBtn).click()

        helper.visibleWithTimeout(matheader.progressbar)
        helper.notVisibleWithTimeout(matheader.progressbar)

        cy.get(measurelibrary.cqlLibraryTab).click()

        helper.visibleWithTimeout(matheader.progressbar)
        helper.notVisibleWithTimeout(matheader.progressbar)

        cy.get(cqlLibrary.searchInputBox).clear()
        cy.get(cqlLibrary.searchInputBox).type(cqlLibraryName, { delay: 50 })

        cy.get(cqlLibrary.searchBtn).click()

        helper.visibleWithTimeout(matheader.progressbar)
        helper.notVisibleWithTimeout(matheader.progressbar)

        cy.get(cqlLibrary.row1CqlLibrarySearch).click()

        cy.get(cqlLibrary.deleteCqllibrariesBtn).click()

        helper.visible(cqlLibrary.modal)

        cy.get(cqlLibrary.modalCloseBtn).click()

        cy.get(cqlLibrary.row1CqlLibrarySearch).click()
    })
})

