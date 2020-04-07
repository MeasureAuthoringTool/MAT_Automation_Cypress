import * as helper from '../../../../../support/helpers';
import * as matheader from "../../../../../pom/MAT/WI/MATheader";
import * as measureLibrary from "../../../../../pom/MAT/WI/MeasureLibrary";

let measureName = ''

describe('Measure Library: Validate Scenario 1 Conversion to FHIR', () => {
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

    it('Scenario 1: QDM/CQL draft exists for that family', () => {

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

        cy.get(measureLibrary.successfulMessage).should('contain.text', 'has been successfully create');

        cy.get(measureLibrary.row1MeasureSearch).click();
        cy.get(measureLibrary.createDraftMeasureSearchBtn).click();

        helper.visibleWithTimeout(matheader.progressbar)
        helper.notVisibleWithTimeout(matheader.progressbar)

        cy.get('h1').should('contain.text', 'My Measures > Draft Measure');

        cy.get(measureLibrary.saveAndContinueButtonDraft).click();

        cy.get(measureLibrary.confirmationContinue).click();

        cy.get(measureLibrary.measureLibraryTab).click();

        helper.visibleWithTimeout(matheader.progressbar)
        helper.notVisibleWithTimeout(matheader.progressbar)

        cy.get(measureLibrary.row2MeasureSearch).click();
        cy.get(measureLibrary.convertToFhirMeasureSearchBtn).click();

        // FHIR Warning Dialog
        cy.get(measureLibrary.fhirConversionWarningMessage).should('contain.text', 'Only one draft per measure family should be allowed.');
        cy.get(measureLibrary.fhirConversionReturnBtn).click();

    })

})
