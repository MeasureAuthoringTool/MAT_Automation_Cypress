import * as helper from "../../../../../support/helpers";
import * as measurelibrary from "../../../../../pom/MAT/WI/MeasureLibrary";
import * as measureComposer from "../../../../../pom/MAT/WI/MeasureComposer";
import * as oktaLogin from "../../../../../support/oktaLogin";
import * as dataCreation from "../../../../../support/MAT/MeasureAndCQLLibraryCreation"
import * as gridRowActions from '../../../../../support/MAT/GridRowActions'

let qdmMeasure = ''

describe('Measure CQL Editor', () => {
    before('Login', () => {
        oktaLogin.login()

        qdmMeasure = dataCreation.createDraftMeasure('FhirDraftMeasure', 'QDM')

    })
    beforeEach('Preserve Cookies', () => {
        helper.preserveCookies()
    })
    after('Log Out', () => {
        helper.logout()
    })

    it('QDM Measure: Validate no errors are displayed on a new measure after clicking save', () => {

        helper.enterText(measurelibrary.searchInputBox, qdmMeasure)
        cy.get(measurelibrary.searchBtn).click()

        helper.verifySpinnerAppearsAndDissappears()

        gridRowActions.doubleClickRow(measurelibrary.row1MeasureSearch)

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(measureComposer.cqlWorkspace).click()

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(measureComposer.cqlLibraryEditor).click()

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(measureComposer.cqlEditorSaveBtn).click()

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(measureComposer.warningMessage).should('contain.text', 'Changes to the CQL File have been successfully saved.')
    })
})