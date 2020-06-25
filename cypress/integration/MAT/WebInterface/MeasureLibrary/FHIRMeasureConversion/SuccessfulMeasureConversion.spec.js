import * as helper from '../../../../../support/helpers';
import * as measureLibrary from "../../../../../pom/MAT/WI/MeasureLibrary";
import * as oktaLogin from '../../../../../support/oktaLogin';
import * as dataCreation from "../../../../../support/MAT/MeasureAndCQLLibraryCreation";

let measureName = ''

describe('Measure Library: Validate Scenario 3a Conversion to FHIR', () => {
    before('Login', () => {
        oktaLogin.login()

        measureName = dataCreation.createDraftMeasure('QdmCqlMeasure', 'QDM')
    })
    beforeEach('Preserve Cookies', () => {
        helper.preserveCookies()
    })
    after('Log Out', () => {
        helper.logout()
    })

    it('Scenario 3a: Convert QDM measure to FHIR successfully', () => {

        helper.verifySpinnerAppearsAndDissappears()

        helper.enabledWithTimeout(measureLibrary.searchInputBox)
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
        helper.verifySpinnerAppearsAndDissappears()

        helper.visibleWithTimeout(measureLibrary.row1MeasureSearch)
        cy.get(measureLibrary.row1MeasureSearch).click();
        cy.get(measureLibrary.convertToFhirMeasureSearchBtn).click();

        helper.verifySpinnerAppearsAndDissappears()
        helper.verifySpinnerAppearsAndDissappears()

        helper.visibleWithTimeout(measureLibrary.row1MeasureSearch)

        cy.get(measureLibrary.row1MeasureSearch).should('contain.text', 'FHIR / CQL')
        cy.get(measureLibrary.row1MeasureSearch).dblclick()

        helper.verifySpinnerAppearsAndDissappears()

        cy.get('h1').should('contain.text', measureName + ' Draft v1.0.000 (FHIR / CQL)')

        cy.get(measureLibrary.measureLibraryTab).click()
        
        helper.verifySpinnerAppearsAndDissappears()
        
    })

})
