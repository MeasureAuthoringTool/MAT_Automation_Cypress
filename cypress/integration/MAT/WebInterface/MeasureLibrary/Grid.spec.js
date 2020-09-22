import * as helper from '../../../../support/helpers'
import * as dataCreation from '../../../../support/MAT/MeasureAndCQLLibraryCreation'
import * as measurelibrary from '../../../../pom/MAT/WI/MeasureLibrary'
import * as createNewMeasure from "../../../../pom/MAT/WI/CreateNewMeasure";
import * as measureComposer from "../../../../pom/MAT/WI/MeasureComposer";
import * as cqlLibrary from "../../../../pom/MAT/WI/CqlLibrary";
import * as oktaLogin from '../../../../support/oktaLogin'


let measureName = ''
let draftMeasure = ''
let versionMeasureNotOwner = ''
let versionMeasure = ''
let fhirMeasure = ''

describe('Measure Library Row Selection', () => {
    before('Login', () => {
        oktaLogin.login()

        //creating new draft measure
        draftMeasure = dataCreation.createDraftMeasure()

        //creating new versioned measure
        versionMeasure = dataCreation.createMajorVersionMeasure()

        cy.get(measurelibrary.row1MeasureSearch).click()

        cy.wait(1000)

        cy.get(measurelibrary.row1MeasureSearch).click()

        helper.verifySpinnerAppearsAndDissappears()
    })
    beforeEach('Preserve Cookies', () => {
        helper.preserveCookies()
    })
    after('Log Out', () => {
        helper.logout()
    })
    it('Recent Activity: Row Selection', () => {

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

    it('Measure Search Table: Row Selection', () => {
        helper.verifySpinnerAppearsAndDissappears()

        helper.enabledWithTimeout(measurelibrary.searchBtn)
        cy.get(measurelibrary.searchBtn).click()

        helper.verifySpinnerAppearsAndDissappears()

        helper.haveText(measurelibrary.itemSelectedLabel, '0 Items Selected')
        helper.notVisible(measurelibrary.clearSelectedBtn)

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

        cy.wait(1000)

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
})

describe('Measure Library Recent Activity Grid', () => {
    before('Login', () => {
        versionMeasureNotOwner = dataCreation.loginCreateVersionedMeasureNotOwnerLogout()

        oktaLogin.login()

        //creating new draft measure
        draftMeasure = dataCreation.createDraftMeasure()

        //creating new versioned measure
        versionMeasure = dataCreation.createMajorVersionMeasure()

        fhirMeasure = dataCreation.createDraftMeasure('FhirDraft','FHIR')
    })
    beforeEach('Preserve Cookies', () => {
        helper.preserveCookies()
    })
    after('Log Out', () => {
        helper.logout()
    })

    it('Enabled/Disabled Recent Activity Not The Owner', () => {

        helper.verifySpinnerAppearsAndDissappears()

        helper.enabledWithTimeout(measurelibrary.searchInputBox)
        cy.get(measurelibrary.filterByMyMeasureChkBox).eq(0).click()
        helper.enterText(measurelibrary.searchInputBox, versionMeasureNotOwner)
        cy.get(measurelibrary.searchBtn).click()

        helper.verifySpinnerAppearsAndDissappears()

        helper.visibleWithTimeout(measurelibrary.row1MeasureSearch)

        cy.wait(2000)

        cy.get(measurelibrary.row1MeasureSearch).dblclick()

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(measurelibrary.measureLibraryTab).click()

        helper.verifySpinnerAppearsAndDissappears()


        cy.get(measurelibrary.row1RecentActivity).click()

        helper.disabled(measurelibrary.createVersionDraftRecentActivityBtn)
        helper.enabled(measurelibrary.historyRecentActivityBtn)
        helper.enabled(measurelibrary.viewRecentActivityBtn)
        helper.disabled(measurelibrary.shareRecentActivityBtn)
        helper.disabled(measurelibrary.cloneRecentActivityDisabledBtn)
        helper.enabled(measurelibrary.runFhirValidationRecentActivityBtn)
        helper.disabled(measurelibrary.convertToFhirRecentActivityBtn)


        //need to figure out export, either have to package a measure or have ability to look up a packaged measure in DB
        //cvasile 11/27/2019

        cy.get(measurelibrary.row1RecentActivity).click()

    })

    it('Enabled/Disabled Recent Activity The Owner', () => {

        measureName = dataCreation.createDraftMeasure('TestMeasure')

        helper.enterText(measurelibrary.searchInputBox, measureName)

        cy.get(measurelibrary.searchBtn).click()

        helper.verifySpinnerAppearsAndDissappears()

        helper.visibleWithTimeout(measurelibrary.row1MeasureSearch)

        cy.wait(2000)

        cy.get(measurelibrary.row1MeasureSearch).dblclick()

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(measurelibrary.measureLibraryTab).click()

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(measurelibrary.row1RecentActivity).click()

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

        cy.get(measurelibrary.row1RecentActivity).click()

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

        cy.get(measurelibrary.row1MeasureSearch).dblclick()

        helper.verifySpinnerAppearsAndDissappears()
 
        cy.get(measurelibrary.measureLibraryTab).click()

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(measurelibrary.row1RecentActivity).click()

        helper.enabled(measurelibrary.createVersionRecentActivityBtn)
        helper.enabled(measurelibrary.historyRecentActivityBtn)
        helper.enabled(measurelibrary.editRecentActivityBtn)
        helper.enabled(measurelibrary.shareRecentActivityBtn)
        helper.disabled(measurelibrary.cloneRecentActivityDisabledBtn)
        helper.enabled(measurelibrary.runFhirValidationRecentActivityBtn)
        helper.disabled(measurelibrary.convertToFhirRecentActivityBtn)

        cy.get(measurelibrary.row1RecentActivity).click()

    })

    it('Recent Activity Button bar Create Version', () => {

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

        cy.get(measurelibrary.row1RecentActivity).click()

        cy.get(measurelibrary.createVersionRecentActivityBtn).click()

        cy.get(measurelibrary.title).contains("My Measures > Create Measure Version of Draft")

        cy.get(measurelibrary.cancelBtn).click()

        helper.verifySpinnerAppearsAndDissappears()

    })
    it('Recent Activity Button bar Create Draft', () => {

        cy.get(measurelibrary.newMeasureButton).click()

        measureName = 'createProportionMeasure' + Date.now()

        cy.get(createNewMeasure.measureName).type(measureName, { delay: 50 })
        cy.get(createNewMeasure.modelradioQDM).click()
        cy.get(createNewMeasure.cqlLibraryName).type(measureName, { delay: 50 })
        cy.get(createNewMeasure.shortName).type(measureName, { delay: 50 })

        cy.get(createNewMeasure.measureScoringListBox).select('Proportion')
        cy.get(createNewMeasure.patientBasedMeasureListBox).select('Yes')

        cy.get(createNewMeasure.saveAndContinueBtn).click()
        cy.get(createNewMeasure.confirmationContinueBtn).click()

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(measurelibrary.measureLibraryTab).click()

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(measurelibrary.row1RecentActivity).click()

        cy.get(measurelibrary.createVersionRecentActivityBtn).click()

        cy.get(measurelibrary.majorVersionTypeRadio).click()
        cy.get(measurelibrary.packageAndVersion).click()
        cy.get(measurelibrary.continueBtn).click()

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(measurelibrary.row1RecentActivity).click()

        cy.get(measurelibrary.createDraftRecentActivityBtn).click()

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(measurelibrary.title).contains("My Measures > Draft Measure")

        cy.get(createNewMeasure.cancelBtn).click()

        helper.verifySpinnerAppearsAndDissappears()

    })
    it('Recent Activity Button bar History', () => {

        cy.get(measurelibrary.row1RecentActivity).click()

        cy.get(measurelibrary.historyRecentActivityBtn).click()

        cy.get(measurelibrary.title).contains("My Measures > History")

        cy.get(measurelibrary.returnToMeasureLibraryLink).click()

        helper.verifySpinnerAppearsAndDissappears()

    })

    it('Recent Activity Button bar Edit', () => {

        cy.get(measurelibrary.row1RecentActivity).click()

        cy.get(measurelibrary.editRecentActivityBtn).click()

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(measurelibrary.measureComposerTab).should(tab => {
            let value = tab.attr('class')
            expect(value).contains("selected")
        })

        cy.get(measurelibrary.measureLibraryTab).click()

        helper.verifySpinnerAppearsAndDissappears()
    })

    it('Recent Activity Button bar View', () => {

        cy.get(measurelibrary.newMeasureButton).click()

        measureName = 'createProportionMeasure' + Date.now()

        cy.get(createNewMeasure.measureName).type(measureName, { delay: 50 })
        cy.get(createNewMeasure.modelradioQDM).click()
        cy.get(createNewMeasure.cqlLibraryName).type(measureName, { delay: 50 })
        cy.get(createNewMeasure.shortName).type(measureName, { delay: 50 })

        cy.get(createNewMeasure.measureScoringListBox).select('Proportion')
        cy.get(createNewMeasure.patientBasedMeasureListBox).select('Yes')

        cy.get(createNewMeasure.saveAndContinueBtn).click()
        cy.get(createNewMeasure.confirmationContinueBtn).click()

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(measurelibrary.measureLibraryTab).click()

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(measurelibrary.row1RecentActivity).click()

        cy.get(measurelibrary.createVersionRecentActivityBtn).click()

        cy.get(measurelibrary.majorVersionTypeRadio).click()
        cy.get(measurelibrary.packageAndVersion).click()
        cy.get(measurelibrary.continueBtn).click()

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(measurelibrary.row1RecentActivity).click()

        cy.get(measurelibrary.viewRecentActivityBtn).click()

        helper.verifySpinnerAppearsAndDissappears()

        helper.disabled(measureComposer.measureNameInputBox)

        cy.get(measurelibrary.measureLibraryTab).click()

        helper.verifySpinnerAppearsAndDissappears()
    })

    it('Recent Activity Button bar Share', () => {

        cy.get(measurelibrary.row1RecentActivity).click()

        cy.get(measurelibrary.shareRecentActivityBtn).click()

        cy.get(measurelibrary.title).contains("My Measures > Measure Sharing")

        cy.get(measurelibrary.shareCancelBtn).click()

        helper.verifySpinnerAppearsAndDissappears()
    })

    it('Recent Activity Button bar Clone', () => {

        cy.get(measurelibrary.row1RecentActivity).click()

        cy.get(measurelibrary.cloneRecentActivityEnabledBtn).click()

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(measurelibrary.title).contains("My Measures > Clone Measure")

        cy.get(createNewMeasure.cancelBtn).click()

        helper.verifySpinnerAppearsAndDissappears()
    })

})

describe('Measure Library Grid Button Bar', () => {
    before('Login', () => {

        versionMeasureNotOwner = dataCreation.loginCreateVersionedMeasureNotOwnerLogout()

        oktaLogin.login()

        helper.verifySpinnerAppearsAndDissappears()

        //creating new draft measure
        draftMeasure = dataCreation.createDraftMeasure()

        helper.verifySpinnerAppearsAndDissappears()

        //creating new versioned measure
        versionMeasure = dataCreation.createMajorVersionMeasure()

        helper.verifySpinnerAppearsAndDissappears()

        fhirMeasure = dataCreation.createDraftMeasure('FhirDraft','FHIR')

        helper.verifySpinnerAppearsAndDissappears()

    })
    beforeEach('Preserve Cookies', () => {
        helper.preserveCookies()
    })
    after('Log Out', () => {
        helper.logout()
    })


    it('Enabled/Disabled Measure Search Table Not The Owner', () => {

        helper.verifySpinnerAppearsAndDissappears()

        helper.enabledWithTimeout(measurelibrary.searchInputBox)
        cy.get(measurelibrary.filterByMyMeasureChkBox).eq(0).click()
        helper.enterText(measurelibrary.searchInputBox, versionMeasureNotOwner)
        cy.get(measurelibrary.searchBtn).click()

        helper.verifySpinnerAppearsAndDissappears()
        helper.verifySpinnerAppearsAndDissappears()

        helper.visibleWithTimeout(measurelibrary.row1MeasureSearch)
        cy.get(measurelibrary.row1MeasureSearch).click()

        helper.disabled(measurelibrary.createVersionDraftMeasureSearchBtn)
        helper.enabled(measurelibrary.historyMeasureSearchBtn)
        helper.enabled(measurelibrary.viewMeasureSearchBtn)
        helper.disabled(measurelibrary.shareMeasureSearchBtn)
        helper.disabled(measurelibrary.cloneMeasureSearchDisabledBtn)
        helper.enabled(measurelibrary.runFhirValidationMeasureSearchBtn)
        helper.disabled(measurelibrary.convertToFhirMeasureSearchBtn)

        cy.get(measurelibrary.row1MeasureSearch).click()

    })

    it('Enabled/Disabled Measure Search Table The Owner', () => {

        measureName = dataCreation.createDraftMeasure('TestMeasure')

        helper.verifySpinnerAppearsAndDissappears()

        helper.enabledWithTimeout(measurelibrary.searchInputBox)
        helper.enterText(measurelibrary.searchInputBox, measureName)
        cy.get(measurelibrary.searchBtn).click()

        helper.verifySpinnerAppearsAndDissappears()
        helper.verifySpinnerAppearsAndDissappears()

        helper.visibleWithTimeout(measurelibrary.row1MeasureSearch)
        cy.get(measurelibrary.row1MeasureSearch).click()

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
        cy.get(measurelibrary.row1MeasureSearch).click()

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
        cy.get(measurelibrary.row1MeasureSearch).click()

        helper.enabled(measurelibrary.createVersionMeasureSearchBtn)
        helper.enabled(measurelibrary.historyMeasureSearchBtn)
        helper.enabled(measurelibrary.editMeasureSearchBtn)
        helper.enabled(measurelibrary.shareMeasureSearchBtn)
        helper.disabled(measurelibrary.cloneMeasureSearchDisabledBtn)
        helper.enabled(measurelibrary.runFhirValidationMeasureSearchBtn)
        helper.disabled(measurelibrary.convertToFhirMeasureSearchBtn)

    })

    it('Measure Search Button bar Create Version', () => {

        helper.enterText(measurelibrary.searchInputBox, draftMeasure)
        cy.get(measurelibrary.searchBtn).click()

        helper.verifySpinnerAppearsAndDissappears()

        helper.visibleWithTimeout(measurelibrary.row1MeasureSearch)
        cy.get(measurelibrary.row1MeasureSearch).click()

        cy.get(measurelibrary.createVersionMeasureSearchBtn).click()

        cy.get(cqlLibrary.title).contains("My Measures > Create Measure Version of Draft")

        cy.get(measurelibrary.cancelBtn).click()

        helper.verifySpinnerAppearsAndDissappears()

    })
    it('Measure Search Button bar Create Draft', () => {

        helper.enterText(measurelibrary.searchInputBox, versionMeasure)
        cy.get(measurelibrary.searchBtn).click()

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(measurelibrary.row1MeasureSearch).click()

        cy.get(measurelibrary.createDraftMeasureSearchBtn).click()

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(measurelibrary.title).contains("My Measures > Draft Measure")

        cy.get(createNewMeasure.cancelBtn).click()

        helper.verifySpinnerAppearsAndDissappears()

    })
    it('Measure Search Button bar History', () => {

        helper.enterText(measurelibrary.searchInputBox, versionMeasure)
        cy.get(measurelibrary.searchBtn).click()

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(measurelibrary.row1MeasureSearch).click()

        cy.get(measurelibrary.historyMeasureSearchBtn).click()

        cy.get(measurelibrary.title).contains("My Measures > History")

        cy.get(measurelibrary.returnToMeasureLibraryLink).click()

        helper.verifySpinnerAppearsAndDissappears()

    })

    it('Measure Search Button bar Edit', () => {

        helper.enterText(measurelibrary.searchInputBox, draftMeasure)
        cy.get(measurelibrary.searchBtn).click()

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(measurelibrary.row1MeasureSearch).click()

        cy.get(measurelibrary.editMeasureSearchBtn).click()

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(measurelibrary.measureComposerTab).should(tab => {
            let value = tab.attr('class')
            expect(value).contains("selected")
        })

        cy.get(measurelibrary.measureLibraryTab).click()

        helper.verifySpinnerAppearsAndDissappears()

    })

    it('Measure Search Button bar View', () => {

        helper.enterText(measurelibrary.searchInputBox, versionMeasure)
        cy.get(measurelibrary.searchBtn).click()

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(measurelibrary.row1MeasureSearch).click()

        cy.get(measurelibrary.viewMeasureSearchBtn).click()

        helper.verifySpinnerAppearsAndDissappears()

        helper.disabled(measureComposer.measureNameInputBox)

        cy.get(measurelibrary.measureLibraryTab).click()

        helper.verifySpinnerAppearsAndDissappears()

    })

    it('Measure Search Button bar Share', () => {

        helper.enterText(measurelibrary.searchInputBox, draftMeasure)
        cy.get(measurelibrary.searchBtn).click()

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(measurelibrary.row1MeasureSearch).click()

        cy.get(measurelibrary.shareMeasureSearchBtn).click()

        cy.get(measurelibrary.title).contains("My Measures > Measure Sharing")

        cy.get(measurelibrary.shareCancelBtn).click()

        helper.verifySpinnerAppearsAndDissappears()

    })
    it('Measure Search Button bar Clone', () => {

        helper.enterText(measurelibrary.searchInputBox, draftMeasure)
        cy.get(measurelibrary.searchBtn).click()

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(measurelibrary.row1MeasureSearch).click()

        cy.get(measurelibrary.cloneMeasureSearchEnabledBtn).click()

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(measurelibrary.title).contains("My Measures > Clone Measure")

        cy.get(createNewMeasure.cancelBtn).click()

        helper.verifySpinnerAppearsAndDissappears()
    })

})
