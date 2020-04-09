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

    it('Scenario 2: FHIR/CQL draft exists for that family', () => {

        // Versioning First measure
        helper.enterText(measureLibrary.searchInputBox, measureName)
        cy.get(measureLibrary.searchBtn).click();

        helper.visibleWithTimeout(matheader.progressbar)
        helper.notVisibleWithTimeout(matheader.progressbar)

        cy.get(measureLibrary.row1MeasureSearch).click();

        cy.get(measureLibrary.createVersionDraftMeasureSearchBtn).click();
        cy.get(measureLibrary.majorVersionTypeRadio).click();
        cy.get(measureLibrary.packageAndVersion).click();

        helper.visibleWithTimeout(matheader.progressbar)
        helper.notVisibleWithTimeout(matheader.progressbar)

        cy.get(measureLibrary.continueBtn).click();

        helper.visibleWithTimeout(matheader.progressbar)
        helper.notVisibleWithTimeout(matheader.progressbar)

        // Create First Draft Measure 
        cy.get(measureLibrary.row1MeasureSearch).click();
        cy.get(measureLibrary.createDraftMeasureSearchBtn).click();

        helper.visibleWithTimeout(matheader.progressbar)
        helper.notVisibleWithTimeout(matheader.progressbar)

        cy.get('h1').should('contain.text', 'My Measures > Draft Measure');

        cy.get(measureLibrary.saveAndContinueButtonDraft).click();

        cy.get(measureLibrary.confirmationContinue).click();

        cy.get(measureLibrary.measureLibraryTab).click();

        cy.wait(2000)

        // Versioning draft measure
        cy.get(measureLibrary.row1MeasureSearch).click();
        cy.get(measureLibrary.createVersionDraftMeasureSearchBtn).click();
        cy.get(measureLibrary.majorVersionTypeRadio).click();
        cy.get(measureLibrary.packageAndVersion).click();

        helper.visibleWithTimeout(matheader.progressbar)
        helper.notVisibleWithTimeout(matheader.progressbar)

        cy.get(measureLibrary.continueBtn).click();

        helper.visibleWithTimeout(matheader.progressbar)
        helper.notVisibleWithTimeout(matheader.progressbar)

        // Convert First measure to FHIR 
        cy.get(measureLibrary.row1MeasureSearch).click();
        cy.get(measureLibrary.convertToFhirMeasureSearchBtn).click();

        helper.visibleWithTimeout(matheader.progressbar)
        helper.notVisibleWithTimeout(matheader.progressbar)

        // Convert Second measure to FHIR
        cy.get(measureLibrary.row3MeasureSearch).click();
        cy.get(measureLibrary.convertToFhirMeasureSearchBtn).click();

        // FHIR Warning Dialog
        cy.get(measureLibrary.fhirConversionWarningMessage).should('contain.text', 'Only one draft per measure family should be allowed.');
        cy.get(measureLibrary.fhirConversionReturnBtn).click();

    })

})
