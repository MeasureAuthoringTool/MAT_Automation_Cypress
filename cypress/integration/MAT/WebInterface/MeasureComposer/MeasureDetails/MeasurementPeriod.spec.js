import * as helper from "../../../../../support/helpers";
import * as measurelibrary from "../../../../../pom/MAT/WI/MeasureLibrary";
import * as measureDetails from "../../../../../pom/MAT/WI/MeasureDetails";
import * as oktaLogin from "../../../../../support/oktaLogin";
import * as dataCreation from "../../../../../support/MAT/MeasureAndCQLLibraryCreation";

let fhirMeasure = ''
let qdmMeasure = ''

describe('Validate the Measure Period', () => {
    before('Login', () => {
        oktaLogin.login()

        fhirMeasure = dataCreation.createDraftMeasure('FhirDraftMeasure', 'FHIR')
        qdmMeasure = dataCreation.createDraftMeasure('qdmDraftMeasure', 'QDM')

    })
    beforeEach('Preserve Cookies', () => {
        helper.preserveCookies()
    })
    after('Log Out', () => {
        helper.logout()
    })

    it('FHIR Measure: Validate the default behavior and next calendar year', () => {

        helper.enterText(measurelibrary.searchInputBox, fhirMeasure)
        cy.get(measurelibrary.searchBtn).click();

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(measurelibrary.row1MeasureSearch).dblclick();

        helper.verifySpinnerAppearsAndDissappears()

        // Initial visit
        cy.get(measureDetails.measurePeriodHeaderLabel).should('contain.text', 'Measurement Period')

        cy.get(measureDetails.measurementPeriodCheckbox).should('be.checked')

        cy.get(measureDetails.checkboxLabel).should('contain.text', 'Next Calendar Year')

        cy.get(measureDetails.measurementPeriodFromInputBox).should('be.disabled')
        cy.get(measureDetails.measurementPeriodToInputBox).should('be.disabled')

        // Uncheck default measure period
        cy.get(measureDetails.measurementPeriodCheckbox).uncheck()

        cy.get(measureDetails.measurementPeriodFromInputBox).should('contain.value', '01/01/2021')
        cy.get(measureDetails.measurementPeriodToInputBox).should('contain.value', '12/31/2021')

        cy.get(measureDetails.saveBtn).click()

        cy.get(measurelibrary.measureLibraryTab).click()

        helper.verifySpinnerAppearsAndDissappears()

    })

    it('QDM Measure: Validate the default behavior and next calendar year', () => {

        helper.enterText(measurelibrary.searchInputBox, qdmMeasure)
        cy.get(measurelibrary.searchBtn).click();

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(measurelibrary.row1MeasureSearch).dblclick();

        helper.verifySpinnerAppearsAndDissappears()

        // Initial visit
        cy.get(measureDetails.measurePeriodHeaderLabel).should('contain.text', 'Measurement Period')

        cy.get(measureDetails.measurementPeriodCheckbox).should('be.checked')

        cy.get(measureDetails.checkboxLabel).should('contain.text', 'Calendar Year (January 1, 20XX through December 31, 20XX)')

        cy.get(measureDetails.measurementPeriodFromInputBox).should('be.disabled')
        cy.get(measureDetails.measurementPeriodToInputBox).should('be.disabled')

        // Uncheck default measure period
        cy.get(measureDetails.measurementPeriodCheckbox).uncheck()

        cy.get(measureDetails.measurementPeriodFromInputBox).type('01/01/2020')
        cy.get(measureDetails.measurementPeriodToInputBox).type('12/31/2020')

        cy.get(measureDetails.saveBtn).click()

        cy.get(measurelibrary.measureLibraryTab).click()

        helper.verifySpinnerAppearsAndDissappears()

    })

    it('Validate the measure period after conversion', () => {

        helper.enterText(measurelibrary.searchInputBox, qdmMeasure)
        cy.get(measurelibrary.searchBtn).click();

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(measurelibrary.row1MeasureSearch).click();

        cy.get(measurelibrary.createVersionDraftMeasureSearchBtn).click();
        cy.get(measurelibrary.majorVersionTypeRadio).click();
        cy.get(measurelibrary.packageAndVersion).click();

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(measurelibrary.continueBtn).click();

        helper.verifySpinnerAppearsAndDissappears()
        helper.verifySpinnerAppearsAndDissappears()

        helper.visibleWithTimeout(measurelibrary.row1MeasureSearch)
        cy.get(measurelibrary.row1MeasureSearch).click();
        cy.get(measurelibrary.convertToFhirMeasureSearchBtn).click();

        helper.verifySpinnerAppearsAndDissappears()
        helper.verifySpinnerAppearsAndDissappears()

        cy.get(measurelibrary.row1MeasureSearch).dblclick();

        helper.verifySpinnerAppearsAndDissappears()

        // Initial visit
        cy.get(measureDetails.measurePeriodHeaderLabel).should('contain.text', 'Measurement Period')

        cy.get(measureDetails.measurementPeriodCheckbox).should('not.to.be.checked')

        cy.get(measureDetails.checkboxLabel).should('contain.text', 'Next Calendar Year')

        cy.get(measureDetails.measurementPeriodFromInputBox).should('contain.value','01/01/2020')
        cy.get(measureDetails.measurementPeriodToInputBox).should('contain.value', '12/31/2020')

        // check default measure period
        cy.get(measureDetails.measurementPeriodCheckbox).check()

        cy.get(measureDetails.measurementPeriodFromInputBox).should('be.disabled')
        cy.get(measureDetails.measurementPeriodToInputBox).should('be.disabled')

        // uncheck default measure period
        cy.get(measureDetails.measurementPeriodCheckbox).uncheck()

        cy.get(measureDetails.measurementPeriodFromInputBox).type('01/01/2020')
        cy.get(measureDetails.measurementPeriodToInputBox).type('12/31/2020')

        cy.get(measureDetails.saveBtn).click()

        cy.get(measurelibrary.measureLibraryTab).click()

        helper.verifySpinnerAppearsAndDissappears()

    })

})