import * as helper from "../../../../../support/helpers";
import * as measurelibrary from "../../../../../pom/MAT/WI/MeasureLibrary";
import * as measureDetails from "../../../../../pom/MAT/WI/MeasureDetails";
import * as oktaLogin from "../../../../../support/oktaLogin";
import * as dataCreation from "../../../../../support/MAT/MeasureAndCQLLibraryCreation";

let fhirMeasure = ''

describe('FHIR Measure: Improvement Notation', () => {
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

    it('Validate the Improvement Notation has updated drop-down', () => {

        helper.enterText(measurelibrary.searchInputBox, fhirMeasure)
        cy.get(measurelibrary.searchBtn).click();

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(measurelibrary.row1MeasureSearch).dblclick();

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(measureDetails.improvementNotation).click()

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(measureDetails.improvementNotationTitle).should('have.text', 'Improvement Notation')

        cy.get(measureDetails.improvementNotationDropDown).should('contain.text', 'increase')

        cy.get(measureDetails.improvementNotationDropDown).select('decrease')

        cy.get(measureDetails.improvementNotationSaveBtn).click()

        cy.get(measurelibrary.measureLibraryTab).click()

        helper.verifySpinnerAppearsAndDissappears()

    })

})