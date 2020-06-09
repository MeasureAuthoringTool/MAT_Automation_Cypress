import * as helper from '../../../../../support/helpers';
import * as measureLibrary from "../../../../../pom/MAT/WI/MeasureLibrary";
import * as oktaLogin from '../../../../../support/oktaLogin';
import * as cqlLibrary from "../../../../../pom/MAT/WI/CqlLibrary";
import * as measureComposer from "../../../../../pom/MAT/WI/MeasureComposer";


let measureName = ''
let libraryName = ''

describe('FHIR: Standalone Library', () => {
    before('Login', () => {
        oktaLogin.login()

    })
    beforeEach('Preserve Cookies', () => {
        helper.preserveCookies()
    })
    after('Log Out', () => {
        helper.logout()
    })

    it('Create Standalone Library and include it with FHIR Measure', () => {

        // Create FHIR Library and version it 

        libraryName = helper.createDraftCqlLibrary('FhirCqlLibrary', 'FHIR')

        helper.enterText(cqlLibrary.searchInputBox, libraryName)
        cy.get(cqlLibrary.searchBtn).click();

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(cqlLibrary.row1CqlLibrarySearch).click();

        cy.get(cqlLibrary.createVersionCqllibrariesBtn).click();
        cy.get(cqlLibrary.majorVersionTypeRadio).click();
        cy.get(cqlLibrary.versionSaveAndContinueBtn).click();

        helper.verifySpinnerAppearsAndDissappears()

        // cy.get(measureLibrary.cqlLibraryTab).click();

        cy.get(measureLibrary.measureLibraryTab).click();

        helper.verifySpinnerAppearsAndDissappears()

        // Create FHIR Measure
        
        measureName = helper.createDraftMeasure('FhirMeasure', 'FHIR')

        helper.enterText(measureLibrary.searchInputBox, measureName)
        cy.get(measureLibrary.searchBtn).click();

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(measureLibrary.row1MeasureSearch).dblclick();

        cy.get(measureComposer.cqlWorkspace).click();

        helper.verifySpinnerAppearsAndDissappears()

        helper.waitToContainText(measureComposer.cqlWorkspaceTitleGeneralInformation, 'General Information')

        // Includes

        cy.get(measureComposer.includes).click()

        cy.get(measureComposer.includesListItems).its('length').should('equal', 3)

        cy.get(measureComposer.includesListItems).eq(0).should('contain.text', 'FHIRHelpers')
        cy.get(measureComposer.includesListItems).eq(1).should('contain.text', 'Global')
        cy.get(measureComposer.includesListItems).eq(2).should('contain.text', 'SDE')

        cy.get(measureComposer.searchInputBox).type(libraryName, { delay: 50 })
        cy.get(measureComposer.searchBtn).click()
        cy.get(measureComposer.availableLibrariesRow1checkbox).click()
        cy.get(measureComposer.libraryAliasInputBox).type('Test', { delay: 50 })
        cy.get(measureComposer.saveIncludes).click()

        helper.visibleWithTimeout(measureComposer.warningMessage)

        //CQL Library Editor

        cy.get(measureComposer.cqlLibraryEditor).click()

        helper.waitToContainText(measureComposer.cqlWorkspaceTitleCQLLibraryEditor, 'CQL Library Editor')

        helper.visibleWithTimeout(measureComposer.warningMessage)
        helper.waitToContainText(measureComposer.warningMessage, 'You are viewing CQL with no validation errors.')

        cy.get(measureLibrary.measureLibraryTab).click();

        helper.verifySpinnerAppearsAndDissappears()
        
    })
})

describe('QDM: Standalone Library', () => {
    before('Login', () => {
        oktaLogin.login()

    })
    beforeEach('Preserve Cookies', () => {
        helper.preserveCookies()
    })
    after('Log Out', () => {
        helper.logout()
    })

    it('Create Standalone Library and include it with QDM Measure', () => {

        // Create QDM Library and version it 

        libraryName = helper.createDraftCqlLibrary('QdmCqlLibrary', 'QDM')

        helper.enterText(cqlLibrary.searchInputBox, libraryName)
        cy.get(cqlLibrary.searchBtn).click();

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(cqlLibrary.row1CqlLibrarySearch).click();

        cy.get(cqlLibrary.createVersionCqllibrariesBtn).click();
        cy.get(cqlLibrary.majorVersionTypeRadio).click();
        cy.get(cqlLibrary.versionSaveAndContinueBtn).click();

        helper.verifySpinnerAppearsAndDissappears()

        // cy.get(measureLibrary.cqlLibraryTab).click();

        cy.get(measureLibrary.measureLibraryTab).click();

        helper.verifySpinnerAppearsAndDissappears()

        // Create QDM Measure
        
        measureName = helper.createDraftMeasure('QdmMeasure', 'QDM')

        helper.enterText(measureLibrary.searchInputBox, measureName)
        cy.get(measureLibrary.searchBtn).click();

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(measureLibrary.row1MeasureSearch).dblclick();

        cy.get(measureComposer.cqlWorkspace).click();

        helper.verifySpinnerAppearsAndDissappears()

        helper.waitToContainText(measureComposer.cqlWorkspaceTitleGeneralInformation, 'General Information')

        // Includes

        cy.get(measureComposer.includes).click()

        cy.get(measureComposer.searchInputBox).type(libraryName, { delay: 50 })
        cy.get(measureComposer.searchBtn).click()
        cy.get(measureComposer.availableLibrariesRow1checkbox).click()
        cy.get(measureComposer.libraryAliasInputBox).type('Test', { delay: 50 })
        cy.get(measureComposer.saveIncludes).click()

        helper.visibleWithTimeout(measureComposer.warningMessage)

        //CQL Library Editor

        cy.get(measureComposer.cqlLibraryEditor).click()

        helper.waitToContainText(measureComposer.cqlWorkspaceTitleCQLLibraryEditor, 'CQL Library Editor')

        helper.visibleWithTimeout(measureComposer.warningMessage)
        helper.waitToContainText(measureComposer.warningMessage, 'You are viewing CQL with no validation errors.')

        cy.get(measureLibrary.measureLibraryTab).click();

        helper.verifySpinnerAppearsAndDissappears()

    })
})