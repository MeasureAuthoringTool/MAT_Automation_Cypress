import * as helper from '../../../../../support/helpers';
import * as matheader from "../../../../../pom/MAT/WI/MATheader";
import * as measureLibrary from "../../../../../pom/MAT/WI/MeasureLibrary";

let measureName = ''

describe('Measure Library: Validate Convert to FHIR', () => {
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

    it('Convert QDM measure to FHIR successfully', () => {

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
        cy.get(measureLibrary.convertToFhirMeasureSearchBtn).click();

        helper.visibleWithTimeout(matheader.progressbar)
        helper.notVisibleWithTimeout(matheader.progressbar)

        cy.get(measureLibrary.successfulMessage).should('contain.text', 'has been successfully create');        

    })

})
