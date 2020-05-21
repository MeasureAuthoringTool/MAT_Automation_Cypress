import * as helper from '../../../../../support/helpers';
import * as measureLibrary from "../../../../../pom/MAT/WI/MeasureLibrary";
import * as oktaLogin from '../../../../../support/oktaLogin';

let measureName = ''

describe('Measure Library: Validate Scenario 3b Conversion to FHIR', () => {
    before('Login', () => {
        oktaLogin.login()

        measureName = helper.createDraftMeasure('qdmCqlMeasure', 'QDM')
    })
    beforeEach('Preserve Cookies', () => {
        helper.preserveCookies()
    })
    after('Log Out', () => {
        helper.logout()
    })

    it('Scenario 3b: Reconverting QDM measure: Warning message', () => {

        helper.enterText(measureLibrary.searchInputBox, measureName)
        cy.get(measureLibrary.searchBtn).click();

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(measureLibrary.row1MeasureSearch).click();

        cy.get(measureLibrary.createVersionDraftMeasureSearchBtn).click();
        cy.get(measureLibrary.majorVersionTypeRadio).click();
        cy.get(measureLibrary.packageAndVersion).click();

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(measureLibrary.continueBtn).click();

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(measureLibrary.row1MeasureSearch).click();
        cy.get(measureLibrary.convertToFhirMeasureSearchBtn).click();

        helper.verifySpinnerAppearsAndDissappears()
        
        cy.wait(3000)

        cy.get(measureLibrary.row2MeasureSearch).click();
        cy.get(measureLibrary.convertToFhirMeasureSearchBtn).click();

        // FHIR Warning Dialog
        cy.get(measureLibrary.fhirConversionWarningMessage).should('contain.text', 'Are you sure you want to convert this measure again? The existing FHIR measure will be overwritten.');
        cy.get(measureLibrary.fhirConversionNoBtn).click();

    })

})
