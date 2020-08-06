import * as helper from "../../../../../support/helpers"
import * as measurelibrary from "../../../../../pom/MAT/WI/MeasureLibrary"
import * as cqlLibrary from "../../../../../pom/MAT/WI/CqlLibrary"
import * as cqlComposer from "../../../../../pom/MAT/WI/CQLComposer"
import * as oktaLogin from "../../../../../support/oktaLogin"
import * as dataCreation from "../../../../../support/MAT/MeasureAndCQLLibraryCreation"
import * as createNewMeasure from "../../../../../pom/MAT/WI/CreateNewMeasure"
import * as measureComposer from "../../../../../pom/MAT/WI/MeasureComposer"


let fhircqlLibrary = ''

describe('CQL Composer: Validate the components on General Information page', () => {
    before('Login', () => {
        oktaLogin.login()

        cy.get(measurelibrary.cqlLibraryTab).click()

        helper.verifySpinnerAppearsAndDissappears()

        fhircqlLibrary = dataCreation.createDraftCqlLibrary('FhirDraftLibrary','FHIR')

        helper.verifySpinnerAppearsAndDissappears()
    })
    beforeEach('Preserve Cookies', () => {
        helper.preserveCookies()
    })
    after('Log Out', () => {
        helper.logout()
    })
    it('FHIR: Verify the General Information components', () => {
        helper.verifySpinnerAppearsAndDissappears()

        helper.enabledWithTimeout(cqlLibrary.searchInputBox)
        helper.enterText(cqlLibrary.searchInputBox, fhircqlLibrary)
        cy.get(cqlLibrary.searchBtn).click()

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(cqlLibrary.row1CqlLibrarySearch).dblclick()

        helper.verifySpinnerAppearsAndDissappears()

        // General Information
        cy.get(cqlComposer.cqlLibraryNameField).should('contain.value', fhircqlLibrary)
        cy.get(cqlComposer.cqlLibraryVersionField).should('contain.value', '0.0.000')
        cy.get(cqlComposer.cqlLibraryDescriptionField).type('This is library description text to validate')
        cy.get(cqlComposer.cqlLibraryCommentsField).type('This is library comment text to validate')
        cy.get(cqlComposer.cqlLibraryUsingModel).should('contain.value', 'FHIR / CQL')
        cy.get(cqlComposer.cqlLibraryModelVersion).should('contain.value', '4.0.1')
        cy.get(cqlComposer.cqlLibraryPublisherDropDown).select('Allscripts')
        cy.get(cqlComposer.cqlLibraryExperimentalCheckbox).click()

        cy.get(cqlComposer.saveBtn).click()

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(measurelibrary.cqlLibraryTab).click()

        helper.verifySpinnerAppearsAndDissappears()

        helper.enabledWithTimeout(cqlLibrary.searchInputBox)
        helper.enterText(cqlLibrary.searchInputBox, fhircqlLibrary)
        cy.get(cqlLibrary.searchBtn).click()

        helper.verifySpinnerAppearsAndDissappears()

       // Versioning draft library
       helper.enabledWithTimeout(cqlLibrary.searchInputBox)
       helper.visibleWithTimeout(cqlLibrary.row1CqlLibrarySearch)
       cy.get(cqlLibrary.row1CqlLibrarySearch).click();
       cy.get(cqlLibrary.createVersionCqllibrariesBtn).click();
       cy.get(cqlLibrary.majorVersionTypeRadio).click();
       cy.get(cqlLibrary.versionSaveAndContinueBtn).click();

       helper.verifySpinnerAppearsAndDissappears()

       cy.get(measurelibrary.measureLibraryTab).click()

       helper.verifySpinnerAppearsAndDissappears()

       // Include library with new FHIR Measure
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

       cy.get(measureComposer.searchInputBox).type(fhircqlLibrary, { delay: 50 })
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

