import * as helper from '../../../../../support/helpers';
import * as oktaLogin from '../../../../../support/oktaLogin';
import * as measureLibrary from "../../../../../pom/MAT/WI/MeasureLibrary";
import * as dataCreation from "../../../../../support/MAT/MeasureAndCQLLibraryCreation"
import * as gridRowActions from '../../../../../support/MAT/GridRowActions'

let measureName = ''

describe('Measure Library: Validate Scenario 2 Conversion to FHIR', () => {
    before('Login', () => {
        oktaLogin.login()

        measureName = dataCreation.createDraftMeasure('qdmCqlMeasure', 'QDM')
    })
    beforeEach('Preserve Cookies', () => {
        helper.preserveCookies()
    })
    after('Log Out', () => {
        helper.logout()
    })

    it('Scenario 2: FHIR/CQL draft exists for that family', () => {

        helper.verifySpinnerAppearsAndDissappears()

        // Versioning First measure
        helper.enabledWithTimeout(measureLibrary.searchInputBox)
        helper.enterText(measureLibrary.searchInputBox, measureName)
        cy.get(measureLibrary.searchBtn).click();

        helper.verifySpinnerAppearsAndDissappears()

        gridRowActions.selectRow(measureLibrary.row1MeasureSearch)

        cy.get(measureLibrary.createVersionMeasureSearchBtn).click();
        cy.get(measureLibrary.majorVersionTypeRadio).click();
        cy.get(measureLibrary.packageAndVersion).click();

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(measureLibrary.continueBtn).click();

        helper.verifySpinnerAppearsAndDissappears()

        // Create First Draft Measure
        helper.visibleWithTimeout(measureLibrary.row1MeasureSearch)
        gridRowActions.selectRow(measureLibrary.row1MeasureSearch)
        cy.get(measureLibrary.createDraftMeasureSearchBtn).click();

        helper.verifySpinnerAppearsAndDissappears()

        cy.get('h1').should('contain.text', 'My Measures > Draft Measure');

        cy.get(measureLibrary.saveAndContinueButtonDraft).click();

        cy.get(measureLibrary.confirmationContinue).click();

        cy.get(measureLibrary.measureLibraryTab).click();

        helper.verifySpinnerAppearsAndDissappears()
        helper.verifySpinnerAppearsAndDissappears()

        // Versioning draft measure
        helper.visibleWithTimeout(measureLibrary.row1MeasureSearch)
        gridRowActions.selectRow(measureLibrary.row1MeasureSearch)
        cy.get(measureLibrary.createVersionMeasureSearchBtn).click();
        cy.get(measureLibrary.majorVersionTypeRadio).click();
        cy.get(measureLibrary.packageAndVersion).click();

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(measureLibrary.continueBtn).click();

        helper.verifySpinnerAppearsAndDissappears()
        helper.verifySpinnerAppearsAndDissappears()
        helper.verifySpinnerAppearsAndDissappears()

        // Convert First measure to FHIR
        helper.visibleWithTimeout(measureLibrary.row1MeasureSearch)
        gridRowActions.selectRow(measureLibrary.row1MeasureSearch)
        cy.get(measureLibrary.convertToFhirMeasureSearchBtn).click();

        helper.verifySpinnerAppearsAndDissappears()
        helper.verifySpinnerAppearsAndDissappears()
        helper.verifySpinnerAppearsAndDissappears()

        // Convert Second measure to FHIR
        helper.visibleWithTimeout(measureLibrary.row3MeasureSearch)
        gridRowActions.selectRow(measureLibrary.row3MeasureSearch)
        cy.get(measureLibrary.convertToFhirMeasureSearchBtn).click()

        // FHIR Warning Dialog
        cy.get(measureLibrary.fhirConversionWarningMessage).should('contain.text', 'Only one draft per measure family should be allowed.');
        cy.get(measureLibrary.fhirConversionReturnBtn).click();

    })

})
