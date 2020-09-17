import * as helper from '../../../../../support/helpers';
import * as measureLibrary from "../../../../../pom/MAT/WI/MeasureLibrary";
import * as oktaLogin from '../../../../../support/oktaLogin';
import * as dataCreation from "../../../../../support/MAT/MeasureAndCQLLibraryCreation";
import * as measureComposer from "../../../../../pom/MAT/WI/MeasureComposer";
import * as measureDetails from '../../../../../pom/MAT/WI/MeasureDetails'

let measureName = ''

describe('Measure Library: FHIR Measure Conversion: Conversion to FHIR', () => {
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

    it('Convert QDM measure to FHIR successfully, verify measure history', () => {

        helper.verifySpinnerAppearsAndDissappears()

        helper.enabledWithTimeout(measureLibrary.searchInputBox)
        helper.enterText(measureLibrary.searchInputBox, measureName)
        cy.get(measureLibrary.searchBtn).click();

        helper.verifySpinnerAppearsAndDissappears()
        helper.verifySpinnerAppearsAndDissappears()

        //assert model version for QDM Measure
        cy.get(measureLibrary.measureSearchTable).should('contain.text', 'Model Version')
        cy.get(measureLibrary.row1MeasureModelVersion).should('contain.text', '5.5')

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

        //assert model version for FHIR Measure
        cy.get(measureLibrary.measureSearchTable).should('contain.text', 'Model Version')
        cy.get(measureLibrary.row1MeasureModelVersion).should('contain.text', '4.0.1')

        cy.get(measureLibrary.row1MeasureSearch).should('contain.text', 'FHIR / CQL')
        cy.get(measureLibrary.row1MeasureSearch).dblclick()

        helper.verifySpinnerAppearsAndDissappears()

        cy.get('h1').should('contain.text', measureName + ' Draft v1.0.000 (FHIR / CQL)')

        //navigation to measure packager to validate error message
        cy.get(measureComposer.measurePackager).click();
        helper.verifySpinnerAppearsAndDissappears()
        cy.get(measureComposer.packageWarningMessage).should('contain.text', ' Please select the measure\'s Population basis prior to packaging.')

        //measure library tab
        cy.get(measureLibrary.measureLibraryTab).click()
        
        helper.verifySpinnerAppearsAndDissappears()

        helper.visibleWithTimeout(measureLibrary.row1MeasureSearch)
        cy.get(measureLibrary.row1MeasureSearch).click()

        cy.get(measureLibrary.historyMeasureSearchBtn).click()

        //verifying the log entries
        helper.visibleWithTimeout(measureLibrary.historyConvertToFHIRUserActionLogEntry)
        helper.visibleWithTimeout(measureLibrary.historyMeasureCreatedUserActionLogEntry)

        cy.get(measureLibrary.returnToMeasureLibraryLink).click()

        helper.verifySpinnerAppearsAndDissappears()
        
    })

})
