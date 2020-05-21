import * as helper from '../../../../support/helpers'
import * as measurelibrary from '../../../../pom/MAT/WI/MeasureLibrary'
import * as createNewMeasure from '../../../../pom/MAT/WI/CreateNewMeasure'
import * as measureComposer from '../../../../pom/MAT/WI/MeasureComposer'
import * as oktaLogin from '../../../../support/oktaLogin'


describe('FHIR Continuous Variable Measure', () => {
    before('Login', () => {
        oktaLogin.login()
    })
    beforeEach('Preserve Cookies', () => {
        helper.preserveCookies()
    })
    after('Log Out', () => {
        helper.logout()
    })
    it('Continuous Variable FHIR, creation', () => {

        cy.get(measurelibrary.newMeasureButton).click()
        let measureName = 'createFhirContinuousMeasure' + Date.now()

        cy.get(createNewMeasure.measureName).type(measureName, { delay: 50 })
        cy.get(createNewMeasure.modelradioFHIR).click()
        cy.get(createNewMeasure.cqlLibraryName).type(measureName, { delay: 50 })
        cy.get(createNewMeasure.shortName).type(measureName, { delay: 50 })
        cy.get(createNewMeasure.measureScoringListBox).select('Continuous Variable')
        cy.get(createNewMeasure.patientBasedMeasureListBox).select('No')

        cy.get(createNewMeasure.saveAndContinueBtn).click()

        cy.get(createNewMeasure.confirmationContinueBtn).click()

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(measureComposer.cqlWorkspace).click()

        helper.verifySpinnerAppearsAndDissappears()

        helper.waitToContainText(measureComposer.cqlWorkspaceTitleGeneralInformation, 'General Information')

        //Includes

        cy.get(measureComposer.includes).click()

        cy.get(measureComposer.includesListItems).its('length').should('equal', 3)

        cy.get(measureComposer.includesListItems).eq(0).should('contain.text', 'FHIRHelpers')
        cy.get(measureComposer.includesListItems).eq(1).should('contain.text', 'Global')
        cy.get(measureComposer.includesListItems).eq(2).should('contain.text', 'SDE')

        //Value Sets

        cy.get(measureComposer.valueSets).click();

        helper.verifySpinnerAppearsAndDissappears()

        helper.addValueSet('2.16.840.1.113883.3.666.5.307')
        helper.addValueSet('2.16.840.1.113762.1.4.1182.118')
        helper.addValueSet('2.16.840.1.113762.1.4.1111.161')
        helper.addValueSet('2.16.840.1.113883.3.666.5.307')
        helper.addValueSet('2.16.840.1.114222.4.11.837')
        helper.addValueSet('2.16.840.1.113883.3.3157.1004.20')
        helper.addValueSet('2.16.840.1.113762.1.4.1')
        helper.addValueSet('2.16.840.1.113762.1.4.1111.162')
        helper.addValueSet('2.16.840.1.114222.4.11.3591')
        helper.addValueSet('2.16.840.1.114222.4.11.836')
        helper.addValueSet('2.16.840.1.113762.1.4.1125.2')        

        //CQL Library Editor

        cy.get(measureComposer.cqlLibraryEditor).click();

        helper.waitToContainText(measureComposer.cqlWorkspaceTitleCQLLibraryEditor,'CQL Library Editor')
       
        helper.visibleWithTimeout(measureComposer.warningMessage)
        helper.waitToContainText(measureComposer.warningMessage,'You are viewing CQL with no validation errors.')

        cy.get(measureComposer.cqlLibraryEditorInput).should('contain.text', 'http://cts.nlm.nih.gov/fhir/ValueSet/2.16.840.1.113883.3.666.5.307');
        cy.get(measureComposer.cqlLibraryEditorInput).should('contain.text', 'http://cts.nlm.nih.gov/fhir/ValueSet/2.16.840.1.113762.1.4.1182.118');

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(measurelibrary.measureLibraryTab).click()
        
        helper.verifySpinnerAppearsAndDissappears()
    })
})
