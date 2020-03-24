import * as helper from '../../../../support/helpers'
import * as measurelibrary from '../../../../pom/MAT/WI/MeasureLibrary'
import * as createnewcompositemeasure from '../../../../pom/MAT/WI/CreateNewCompositeMeasure'


describe('Creating New Composite Measure', () => {
    before('Login', () => {
        helper.loginGeneric()
    })

    beforeEach('Preserve Cookies', () => {
        helper.preserveCookies()
    })
    after('Log Out', () => {
        helper.logout()
    })

    it('Verify that the FHIR model is not accessible for Composite Measure', () => {

        cy.get(measurelibrary.newCompositeMeasureButton).click();

        cy.get(createnewcompositemeasure.modelradioFHIR).should('be.disabled');

    })
})