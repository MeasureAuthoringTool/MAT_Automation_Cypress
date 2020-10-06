import * as helper from '../../../../support/helpers'
import * as measurelibrary from '../../../../pom/MAT/WI/MeasureLibrary'
import * as cqlLibrary from '../../../../pom/MAT/WI/CqlLibrary'
import * as oktaLogin from '../../../../support/oktaLogin'
import * as createNewMeasure from '../../../../pom/MAT/WI/CreateNewMeasure'
import * as measureComposer from '../../../../pom/MAT/WI/MeasureComposer'
import * as cqlComposer from "../../../../pom/MAT/WI/CQLComposer";
import * as dataCreation from "../../../../support/MAT/MeasureAndCQLLibraryCreation";

let qdmLibraryName = ''
let fhirLibraryName = ''

describe('QDM Standalone Library: Version and include with measure', () => {
    before('Login', () => {
        oktaLogin.login()

        cy.get(measurelibrary.cqlLibraryTab).click()

        helper.verifySpinnerAppearsAndDissappears()

        qdmLibraryName = dataCreation.createDraftCqlLibrary('qdmCqlLibrary', 'QDM')

        helper.verifySpinnerAppearsAndDissappears()

    })
    beforeEach('Preserve Cookies', () => {
        helper.preserveCookies()
    })
    after('Log Out', () => {
        helper.logout()
    })

    it('QDM Standalone Library: Version and include with QDM measure', () => {

        helper.verifySpinnerAppearsAndDissappears()

        helper.enabledWithTimeout(cqlLibrary.searchInputBox)
        helper.enterText(cqlLibrary.searchInputBox, qdmLibraryName)
        cy.get(cqlLibrary.searchBtn).click()

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(cqlLibrary.row1CqlLibrarySearch).dblclick();

        helper.waitToContainText(measureComposer.cqlWorkspaceTitleGeneralInformation, 'General Information')

        // Valuesets
        cy.get(cqlComposer.valueSets).click()

        helper.verifySpinnerAppearsAndDissappears()

        dataCreation.addValueSet('2.16.840.1.113883.3.666.5.307')
        dataCreation.addValueSet('2.16.840.1.113762.1.4.1182.118')
        dataCreation.addValueSet('2.16.840.1.113762.1.4.1111.161')

        // Navigate to CQL Library
        cy.get(measurelibrary.cqlLibraryTab).click()

        helper.verifySpinnerAppearsAndDissappears()

        helper.enabledWithTimeout(cqlLibrary.searchInputBox)
        helper.enterText(cqlLibrary.searchInputBox, qdmLibraryName)
        cy.get(cqlLibrary.searchBtn).click();

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(cqlLibrary.row1CqlLibrarySearch).click();

        cy.get(cqlLibrary.createVersionCqllibrariesBtn).click();
        helper.visibleWithTimeout(cqlLibrary.majorVersionTypeRadio)
        cy.get(cqlLibrary.majorVersionTypeRadio).click();
        cy.get(cqlLibrary.versionSaveAndContinueBtn).click();

        helper.verifySpinnerAppearsAndDissappears()

        // Navigate to Measure Library and create new qdm measure
        cy.get(measurelibrary.measureLibraryTab).click()

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(measurelibrary.newMeasureButton).click()
        let measureName = 'createQDMMeasure' + Date.now()

        cy.get(createNewMeasure.measureName).type(measureName, { delay: 50 })
        cy.get(createNewMeasure.modelradioQDM).click()
        cy.get(createNewMeasure.cqlLibraryName).type(measureName, { delay: 50 })
        cy.get(createNewMeasure.shortName).type(measureName, { delay: 50 })
        cy.get(createNewMeasure.measureScoringListBox).select('Cohort')
        cy.get(createNewMeasure.patientBasedMeasureListBox).select('Yes')

        cy.get(createNewMeasure.saveAndContinueBtn).click()

        cy.get(createNewMeasure.confirmationContinueBtn).click()

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(measureComposer.cqlWorkspace).click()

        helper.verifySpinnerAppearsAndDissappears()

        helper.waitToContainText(measureComposer.cqlWorkspaceTitleGeneralInformation, 'General Information')

        //Includes

        cy.get(measureComposer.includes).click()

        cy.get(measureComposer.searchInputBox).type(qdmLibraryName, { delay: 50 })
        cy.get(measureComposer.searchBtn).click()
        cy.get(measureComposer.availableLibrariesRow1checkbox).click()
        cy.get(measureComposer.libraryAliasInputBox).type('Test', { delay: 50 })
        cy.get(measureComposer.saveIncludes).click()

        helper.visibleWithTimeout(measureComposer.warningMessage)

        //CQL Library Editor

        cy.get(measureComposer.cqlLibraryEditor).click()

        helper.waitToContainText(measureComposer.cqlWorkspaceTitleCQLLibraryEditor,'CQL Library Editor')

        helper.visibleWithTimeout(measureComposer.warningMessage)
        helper.waitToContainText(measureComposer.warningMessage,'You are viewing CQL with no validation errors.')

        cy.get(measurelibrary.cqlLibraryTab).click()

        helper.verifySpinnerAppearsAndDissappears()

    })

})

describe('FHIR Standalone Library: Version and include with measure', () => {
    before('Login', () => {
        oktaLogin.login()

        cy.get(measurelibrary.cqlLibraryTab).click()

        helper.verifySpinnerAppearsAndDissappears()

        fhirLibraryName = dataCreation.createDraftCqlLibrary('FhirCqlLibrary', 'FHIR')

        helper.verifySpinnerAppearsAndDissappears()

    })
    beforeEach('Preserve Cookies', () => {
        helper.preserveCookies()
    })
    after('Log Out', () => {
        helper.logout()
    })

    it('FHIR Standalone Library: Version and include with FHIR measure', () => {

        helper.verifySpinnerAppearsAndDissappears()

        helper.enabledWithTimeout(cqlLibrary.searchInputBox)
        helper.visibleWithTimeout(cqlLibrary.searchInputBox)
        helper.enterText(cqlLibrary.searchInputBox, fhirLibraryName)
        cy.get(cqlLibrary.searchBtn).click()

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(cqlLibrary.row1CqlLibrarySearch).dblclick()

        helper.verifySpinnerAppearsAndDissappears()

        // General Information
        cy.get(cqlComposer.cqlLibraryNameField).should('contain.value', fhirLibraryName)
        cy.get(cqlComposer.cqlLibraryVersionField).should('contain.value', '0.0.000')
        cy.get(cqlComposer.cqlLibraryDescriptionField).type('This is library description text to validate')
        cy.get(cqlComposer.cqlLibraryCommentsField).type('This is library comment text to validate')
        cy.get(cqlComposer.cqlLibraryUsingModel).should('contain.value', 'FHIR / CQL')
        cy.get(cqlComposer.cqlLibraryModelVersion).should('contain.value', '4.0.1')
        cy.get(cqlComposer.cqlLibraryPublisherDropDown).select('Allscripts')
        cy.get(cqlComposer.cqlLibraryExperimentalCheckbox).click()

        cy.get(cqlComposer.saveBtn).click()

        helper.verifySpinnerAppearsAndDissappears()

        // Valuesets
        cy.get(cqlComposer.valueSets).click()

        helper.verifySpinnerAppearsAndDissappears()

        dataCreation.addValueSet('2.16.840.1.113883.3.666.5.307')
        dataCreation.addValueSet('2.16.840.1.113762.1.4.1182.118')
        dataCreation.addValueSet('2.16.840.1.113762.1.4.1111.161')

        //Navigate to CQL Library
        cy.get(measurelibrary.cqlLibraryTab).click()

        helper.verifySpinnerAppearsAndDissappears()

        helper.enabledWithTimeout(cqlLibrary.searchInputBox)
        helper.enterText(cqlLibrary.searchInputBox, fhirLibraryName)
        cy.get(cqlLibrary.searchBtn).click();

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(cqlLibrary.row1CqlLibrarySearch).click();

        cy.get(cqlLibrary.createVersionCqllibrariesBtn).click();
        cy.get(cqlLibrary.majorVersionTypeRadio).click();
        cy.get(cqlLibrary.versionSaveAndContinueBtn).click();

        helper.verifySpinnerAppearsAndDissappears()

        // Navigate to Measure Library and create new qdm measure
        cy.get(measurelibrary.measureLibraryTab).click()

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(measurelibrary.newMeasureButton).click()
        let measureName = 'CreateFHIRMeasure' + Date.now()

        cy.get(createNewMeasure.measureName).type(measureName, { delay: 50 })
        cy.get(createNewMeasure.modelradioFHIR).click()
        cy.get(createNewMeasure.cqlLibraryName).type(measureName, { delay: 50 })
        cy.get(createNewMeasure.shortName).type(measureName, { delay: 50 })
        cy.get(createNewMeasure.measureScoringListBox).select('Cohort')
        cy.get(createNewMeasure.patientBasedMeasureListBox).select('Yes')

        cy.get(createNewMeasure.saveAndContinueBtn).click()

        cy.get(createNewMeasure.confirmationContinueBtn).click()

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(measureComposer.cqlWorkspace).click()

        helper.verifySpinnerAppearsAndDissappears()

        helper.waitToContainText(measureComposer.cqlWorkspaceTitleGeneralInformation, 'General Information')

        //Includes

        cy.get(measureComposer.includes).click()

        cy.get(measureComposer.searchInputBox).type(fhirLibraryName, { delay: 50 })
        cy.get(measureComposer.searchBtn).click()
        cy.get(measureComposer.availableLibrariesRow1checkbox).click()
        cy.get(measureComposer.libraryAliasInputBox).type('Test', { delay: 50 })
        cy.get(measureComposer.saveIncludes).click()

        helper.visibleWithTimeout(measureComposer.warningMessage)

        //CQL Library Editor

        cy.get(measureComposer.cqlLibraryEditor).click()

        helper.waitToContainText(measureComposer.cqlWorkspaceTitleCQLLibraryEditor,'CQL Library Editor')

        helper.visibleWithTimeout(measureComposer.warningMessage)
        helper.waitToContainText(measureComposer.warningMessage,'You are viewing CQL with no validation errors.')

        cy.get(measurelibrary.measureLibraryTab).click()

        helper.verifySpinnerAppearsAndDissappears()
    })

}) 

describe('FHIR Standalone Library: Meta data requirement to version', () => {
    before('Login', () => {
        oktaLogin.login()

        cy.get(measurelibrary.cqlLibraryTab).click()

        helper.verifySpinnerAppearsAndDissappears()

        fhirLibraryName = dataCreation.createDraftCqlLibrary('FhirCqlLibrary', 'FHIR')

        helper.verifySpinnerAppearsAndDissappears()

    })
    beforeEach('Preserve Cookies', () => {
        helper.preserveCookies()
    })
    after('Log Out', () => {
        helper.logout()
    })

    it('Validate error message for required meta data while versioning', () => {

        helper.verifySpinnerAppearsAndDissappears()

        helper.enabledWithTimeout(cqlLibrary.searchInputBox)
        helper.visibleWithTimeout(cqlLibrary.searchInputBox)
        helper.enterText(cqlLibrary.searchInputBox, fhirLibraryName)
        cy.get(cqlLibrary.searchBtn).click()

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(cqlLibrary.row1CqlLibrarySearch).click();

        cy.get(cqlLibrary.createVersionCqllibrariesBtn).click();
        cy.get(cqlLibrary.majorVersionTypeRadio).click();
        cy.get(cqlLibrary.versionSaveAndContinueBtn).click();

        cy.get(cqlComposer.warningMessageVersionPage).should('have.text', ' Description is required for Standalone Libraries. Please populate it in General Information.')

        cy.get(cqlLibrary.cancelBtn).click()

    })

})