import * as helper from "../../../../../support/helpers"
import * as measurelibrary from "../../../../../pom/MAT/WI/MeasureLibrary"
import * as measureDetails from "../../../../../pom/MAT/WI/MeasureDetails"
import * as oktaLogin from "../../../../../support/oktaLogin"
import * as dataCreation from "../../../../../support/MAT/MeasureAndCQLLibraryCreation";

let fhirMeasure = ''
let fhirVersionMeasure = ''
let qdmMeasure = ''
let qdmVersionMeasure = ''

describe('FHIR Measure: Deletion', () => {
    before('Login', () => {
        oktaLogin.login()
        fhirMeasure = dataCreation.createDraftMeasure('FhirDraftMeasure', 'FHIR')
    })
    beforeEach('Preserve Cookies', () => {
        helper.preserveCookies()
    })
    after('Log Out', () => {
        helper.logout()
    })

    it('Validate the Fhir draft measure deletion', () => {

        helper.enterText(measurelibrary.searchInputBox, fhirMeasure)
        cy.get(measurelibrary.searchBtn).click();

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(measurelibrary.row1MeasureSearch).dblclick();

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(measureDetails.deleteBtn).click();
        
        cy.get(measureDetails.confirmDeleteText).clear().type('DELETE', { force: true })
        cy.get(measureDetails.confirmDeleteBtn).click()

    })

    it('Validate the Fhir versioned measure deletion', () => {

        fhirVersionMeasure = dataCreation.createDraftMeasure('FhirVersionMeasure', 'FHIR')

        helper.enterText(measurelibrary.searchInputBox, fhirVersionMeasure)
        cy.get(measurelibrary.searchBtn).click();

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(measurelibrary.row1MeasureSearch).click();
        cy.get(measurelibrary.createVersionMeasureSearchBtn).click()
        cy.get(measurelibrary.majorVersionTypeRadio).click()
        cy.get(measurelibrary.packageAndVersion).click()
        
        helper.verifySpinnerAppearsAndDissappears()

        cy.get(measurelibrary.continueBtn).click()

        helper.verifySpinnerAppearsAndDissappears()

        helper.enterText(measurelibrary.searchInputBox, fhirVersionMeasure)
        cy.get(measurelibrary.searchBtn).click();

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(measurelibrary.row1MeasureSearch).dblclick();

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(measureDetails.deleteBtn).click();
               
        cy.get(measureDetails.confirmDeleteText).clear().type('DELETE', { force: true })
        cy.get(measureDetails.confirmDeleteBtn).click()
    
    })

})

describe('QDM Measure: Deletion', () => {
    before('Login', () => {
        oktaLogin.login()
        qdmMeasure = dataCreation.createDraftMeasure('qdmDraftMeasure', 'FHIR')
    })
    beforeEach('Preserve Cookies', () => {
        helper.preserveCookies()
    })
    after('Log Out', () => {
        helper.logout()
    })

    it('Validate the QDM draft measure deletion', () => {

        helper.enterText(measurelibrary.searchInputBox, qdmMeasure)
        cy.get(measurelibrary.searchBtn).click();

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(measurelibrary.row1MeasureSearch).dblclick();

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(measureDetails.deleteBtn).click();
        
        cy.get(measureDetails.confirmDeleteText).clear().type('DELETE', { force: true })
        cy.get(measureDetails.confirmDeleteBtn).click()

    })

    it('Validate the QDM versioned measure deletion', () => {

        qdmVersionMeasure = dataCreation.createDraftMeasure('qdmVersionMeasure', 'FHIR')

        helper.enterText(measurelibrary.searchInputBox, qdmVersionMeasure)
        cy.get(measurelibrary.searchBtn).click();

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(measurelibrary.row1MeasureSearch).click();
        cy.get(measurelibrary.createVersionMeasureSearchBtn).click()
        cy.get(measurelibrary.majorVersionTypeRadio).click()
        cy.get(measurelibrary.packageAndVersion).click()
        
        helper.verifySpinnerAppearsAndDissappears()

        cy.get(measurelibrary.continueBtn).click()

        helper.verifySpinnerAppearsAndDissappears()

        helper.enterText(measurelibrary.searchInputBox, qdmVersionMeasure)
        cy.get(measurelibrary.searchBtn).click();

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(measurelibrary.row1MeasureSearch).dblclick();

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(measureDetails.deleteBtn).click();
               
        cy.get(measureDetails.confirmDeleteText).clear().type('DELETE', { force: true })
        cy.get(measureDetails.confirmDeleteBtn).click()
    
    })

})