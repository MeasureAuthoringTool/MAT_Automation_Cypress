import * as helper from "../../../../support/helpers";
import * as oktaLogin from "../../../../support/oktaLogin";
import * as cqlLibrary from "../../../../pom/MAT/WI/CqlLibrary";
import * as dataCreation from "../../../../support/MAT/MeasureAndCQLLibraryCreation";
import * as measureLibrary from "../../../../pom/MAT/WI/MeasureLibrary";
import * as cqlComposer from "../../../../pom/MAT/WI/CQLComposer";

let fhirCqlLibrary = ''
let fhirCQLVersionLibrary = ''
let qdmCqlLibrary = ''
let qdmCQLVersionLibrary = ''

describe('FHIR Library: Deletion', () => {
    before('Login', () => {
        oktaLogin.login()

        fhirCqlLibrary = dataCreation.createDraftCqlLibrary('FhirCqlLibrary', 'FHIR')

        helper.verifySpinnerAppearsAndDissappears()
    })
    beforeEach('Preserve Cookies', () => {
        helper.preserveCookies()
    })
    after('Log Out', () => {
        helper.logout()
    })

    it('Validate the Fhir draft library deletion', () => {

        helper.verifySpinnerAppearsAndDissappears()

        helper.enabledWithTimeout(cqlLibrary.searchInputBox)
        helper.enterText(cqlLibrary.searchInputBox, fhirCqlLibrary)
        cy.get(cqlLibrary.searchBtn).click()

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(cqlLibrary.row1CqlLibrarySearch).click()

        cy.get(cqlLibrary.deleteCqllibrariesBtn).click()

        cy.get(cqlLibrary.confirmDeleteText).type('DELETE', { force: true })
        cy.get(cqlLibrary.confirmDeleteBtn).click()

        helper.verifySpinnerAppearsAndDissappears()

    })

    it('Validate the Delete button has disabled for Versioned FHIR Library', () => {

        fhirCQLVersionLibrary = dataCreation.createDraftCqlLibrary('FhirCqlLibrary', 'FHIR')

        helper.verifySpinnerAppearsAndDissappears()

        helper.enabledWithTimeout(cqlLibrary.searchInputBox)
        helper.enterText(cqlLibrary.searchInputBox, fhirCQLVersionLibrary)
        cy.get(cqlLibrary.searchBtn).click()

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(cqlLibrary.row1CqlLibrarySearch).dblclick()  
        
        helper.verifySpinnerAppearsAndDissappears()

        // General Information
        cy.get(cqlComposer.cqlLibraryNameField).should('contain.value', name)
        cy.get(cqlComposer.cqlLibraryVersionField).should('contain.value', '0.0.000')
        cy.get(cqlComposer.cqlLibraryDescriptionField).type('This is library description text to validate')
        cy.get(cqlComposer.cqlLibraryCommentsField).type('This is library comment text to validate')
        cy.get(cqlComposer.cqlLibraryUsingModel).should('contain.value', 'FHIR / CQL')
        cy.get(cqlComposer.cqlLibraryModelVersion).should('contain.value', '4.0.1')
        cy.get(cqlComposer.cqlLibraryPublisherDropDown).select('Allscripts')
        cy.get(cqlComposer.cqlLibraryExperimentalCheckbox).click()
        cy.get(cqlComposer.saveBtn).click()
        helper.verifySpinnerAppearsAndDissappears()

        // Navigate back to CQL Library Tab
        cy.get(measureLibrary.cqlLibraryTab).click()

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(cqlLibrary.row1CqlLibrarySearch).click()  

        helper.verifySpinnerAppearsAndDissappears()

        // Versioning
        cy.get(cqlLibrary.createVersionCqllibrariesBtn).click();
        cy.get(cqlLibrary.majorVersionTypeRadio).click();
        cy.get(cqlLibrary.versionSaveAndContinueBtn).click();

        helper.verifySpinnerAppearsAndDissappears()
        helper.verifySpinnerAppearsAndDissappears()

        helper.enabledWithTimeout(cqlLibrary.searchInputBox)
        helper.enterText(cqlLibrary.searchInputBox, fhirCQLVersionLibrary)
        cy.get(cqlLibrary.searchBtn).click()

        helper.verifySpinnerAppearsAndDissappears()
        helper.verifySpinnerAppearsAndDissappears()

        cy.get(cqlLibrary.row1CqlLibrarySearch).click() 
        
        cy.get(cqlLibrary.deleteCqllibrariesBtn).should('be.disabled')

    })
})

describe('QDM Library: Deletion', () => {
    before('Login', () => {
        oktaLogin.login()

        qdmCqlLibrary = dataCreation.createDraftCqlLibrary('qdmCqlLibrary', 'QDM')

        helper.verifySpinnerAppearsAndDissappears()
    })
    beforeEach('Preserve Cookies', () => {
        helper.preserveCookies()
    })
    after('Log Out', () => {
        helper.logout()
    })

    it('Validate the QDM draft library deletion', () => {

        helper.verifySpinnerAppearsAndDissappears()

        helper.enabledWithTimeout(cqlLibrary.searchInputBox)
        helper.enterText(cqlLibrary.searchInputBox, qdmCqlLibrary)
        cy.get(cqlLibrary.searchBtn).click()

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(cqlLibrary.row1CqlLibrarySearch).click()

        cy.get(cqlLibrary.deleteCqllibrariesBtn).click()

        cy.get(cqlLibrary.confirmDeleteText).type('DELETE', { force: true })
        cy.get(cqlLibrary.confirmDeleteBtn).click()

    })

    it('Validate the Delete button has disabled for Versioned QDM Library', () => {

        qdmCQLVersionLibrary = dataCreation.createDraftCqlLibrary('qdmCqlLibrary', 'QDM')

        helper.verifySpinnerAppearsAndDissappears()

        helper.enabledWithTimeout(cqlLibrary.searchInputBox)
        helper.enterText(cqlLibrary.searchInputBox, qdmCQLVersionLibrary)
        cy.get(cqlLibrary.searchBtn).click()

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(cqlLibrary.row1CqlLibrarySearch).click()     
        
        cy.get(cqlLibrary.createVersionCqllibrariesBtn).click();
        cy.get(cqlLibrary.majorVersionTypeRadio).click();
        cy.get(cqlLibrary.versionSaveAndContinueBtn).click();

        helper.verifySpinnerAppearsAndDissappears()

        helper.enabledWithTimeout(cqlLibrary.searchInputBox)
        helper.enterText(cqlLibrary.searchInputBox, qdmCQLVersionLibrary)
        cy.get(cqlLibrary.searchBtn).click()

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(cqlLibrary.row1CqlLibrarySearch).click() 
        
        cy.get(cqlLibrary.deleteCqllibrariesBtn).should('be.disabled')

    })
})