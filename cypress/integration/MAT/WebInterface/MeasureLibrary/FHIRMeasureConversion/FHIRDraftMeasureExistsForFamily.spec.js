import * as helper from '../../../../../support/helpers';
import * as matheader from "../../../../../pom/MAT/WI/MATheader";
import * as measureLibrary from "../../../../../pom/MAT/WI/MeasureLibrary";

let measureName = ''

describe('Measure Library: Validate Scenario 2 Conversion to FHIR', () => {
    before('Login', () => {
        helper.loginGeneric()

        measureName = helper.createDraftMeasure('qdmCqlMeasure', 'QDM')
    })
    beforeEach('Preserve Cookies', () => {
        helper.preserveCookies()
    })
    after('Log Out', () => {
        helper.logout()
    })

    it('Scenario 2: FHIR/CQL draft measure exists for that family', () => {

        // Versioning First measure
        helper.enterText(measureLibrary.searchInputBox, measureName)
        cy.get(measureLibrary.searchBtn).click();

        cy.wait(1000)

        helper.notVisibleWithTimeout(matheader.spinner)

        cy.get(measureLibrary.row1MeasureSearch).click();

        helper.notVisibleWithTimeout(matheader.spinner)

        cy.get(measureLibrary.createVersionMeasureSearchBtn).click();
        cy.get(measureLibrary.majorVersionTypeRadio).click();
        cy.get(measureLibrary.packageAndVersion).click();

        helper.notVisibleWithTimeout(matheader.spinner)

        cy.get(measureLibrary.continueBtn).click();

        cy.wait(1000)

        helper.notVisibleWithTimeout(matheader.spinner)

        // Create First Draft Measure 
        cy.get(measureLibrary.row1MeasureSearch).click();
        cy.get(measureLibrary.createDraftMeasureSearchBtn).click();

        helper.notVisibleWithTimeout(matheader.spinner)

        cy.get('h1').should('contain.text', 'My Measures > Draft Measure');

        cy.get(measureLibrary.saveAndContinueButtonDraft).click();
        cy.get(measureLibrary.confirmationContinue).click();

        cy.get(measureLibrary.measureLibraryTab).click();

        cy.wait(1000)

        helper.notVisibleWithTimeout(matheader.spinner)

        // Versioning draft measure
        cy.get(measureLibrary.row1MeasureSearch).click();
        cy.get(measureLibrary.createVersionDraftMeasureSearchBtn).click();
        cy.get(measureLibrary.majorVersionTypeRadio).click();
        cy.get(measureLibrary.packageAndVersion).click();

        helper.notVisibleWithTimeout(matheader.spinner)

        cy.get(measureLibrary.continueBtn).click();

        cy.wait(1000)

        helper.notVisibleWithTimeout(matheader.spinner)

        // Convert First measure to FHIR 
        cy.get(measureLibrary.row1MeasureSearch).click();
        cy.get(measureLibrary.convertToFhirMeasureSearchBtn).click();

        cy.wait(4000)

        helper.notVisibleWithTimeout(matheader.spinner)

        // Convert Second measure to FHIR
        cy.get(measureLibrary.row3MeasureSearch).click();
        cy.get(measureLibrary.convertToFhirMeasureSearchBtn).click();

        // FHIR Warning Dialog
        cy.get(measureLibrary.fhirConversionWarningMessage).should('contain.text', 'Only one draft per measure family should be allowed.');
        cy.get(measureLibrary.fhirConversionReturnBtn).click();

    })

})
