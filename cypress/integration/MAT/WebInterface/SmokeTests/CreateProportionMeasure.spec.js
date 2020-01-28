import * as helper from '../../../../support/helpers'
import * as measurelibrary from '../../../../pom/MAT/WI/MeasureLibrary'
import * as createNewMeasure from '../../../../pom/MAT/WI/CreateNewMeasure'
import * as measureComposer from '../../../../pom/MAT/WI/MeasureComposer'
import * as matheader from "../../../../pom/MAT/WI/MATheader";



describe('Create Proportion Measure', () => {
    before('Login', () => {
        helper.loginGeneric()
    })
    beforeEach('Preserve Cookies', () => {
        helper.preserveCookies()
    })
    afterEach('Pass/Fail', function () {
        if (this.currentTest.state === 'failed') {
            helper.stopRun()
        }
    })
    after('Log Out', () => {
        //helper.logout()
    })
    it('Create Proportion Measure', () => {


        cy.get(measurelibrary.newMeasureButton).click()

        var measureName = 'createProportionMeasure' + Date.now()

        cy.get(createNewMeasure.measureName).type(measureName, { delay: 50 })
        cy.get(createNewMeasure.cqlLibraryName).type(measureName, { delay: 50 })
        cy.get(createNewMeasure.shortName).type(measureName, { delay: 50 })

        cy.get(createNewMeasure.measureScoringListBox).select('Proportion')
        cy.get(createNewMeasure.patientBasedMeasureListBox).select('Yes')

        cy.get(createNewMeasure.saveAndContinueBtn).click()
        cy.get(createNewMeasure.confirmationContinueBtn).click()

        helper.visibleWithTimeout(matheader.progressbar)
        helper.notVisibleWithTimeout(matheader.progressbar)

        cy.get(measureComposer.cqlWorkspace).click()

        cy.get(measureComposer.includes).click()


        //cy.get(measurelibrary.measureLibraryTab).click()

        //cy.get(measurelibrary.newMeasureButton).click()



    })
})