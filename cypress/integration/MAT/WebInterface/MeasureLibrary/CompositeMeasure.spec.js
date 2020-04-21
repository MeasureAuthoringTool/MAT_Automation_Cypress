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
        cy.get(createnewcompositemeasure.cancelBtn).click();

    })

    it('Create Composite measure', () => {

        cy.get(measurelibrary.newCompositeMeasureButton).click();

        let measureName = 'createCompositeMeasure' + Date.now()

        cy.get(createnewcompositemeasure.measureName).type(measureName, { delay: 50 })
        cy.get(createnewcompositemeasure.modelradioQDM).click();
        cy.get(createnewcompositemeasure.cqlLibraryName).type(measureName, { delay: 50 })
        cy.get(createnewcompositemeasure.shortName).type(measureName, { delay: 50 })
        
        cy.get(createnewcompositemeasure.compositeScoringMethod).select('Patient-level linear');
        cy.get(createnewcompositemeasure.measureScoring).select('Continuous Variable');
        cy.get(createnewcompositemeasure.patientBasedMeasure).select('No');

        cy.get(createnewcompositemeasure.saveAndContinueBtn).click();

        // Component Measures
        cy.get(createnewcompositemeasure.searchInputBox).type('createProportionMeasure1586529506892', { delay: 50 })
        cy.get(createnewcompositemeasure.searchButton).click();

        cy.get(createnewcompositemeasure.row1ComponentMeasureSearchName).should('contain.text', 'createProportionMeasure1586529506892');
        cy.get(createnewcompositemeasure.row1ComponentMeasureSelect).check({ force: true });
        
        cy.get(createnewcompositemeasure.searchInputBox).clear();
        cy.get(createnewcompositemeasure.searchInputBox).type('createProportionMeasure1586448273544', { delay: 50 })
        cy.get(createnewcompositemeasure.searchButton).click();

        cy.get(createnewcompositemeasure.row1ComponentMeasureSearchName).should('contain.text', 'createProportionMeasure1586448273544');
        cy.get(createnewcompositemeasure.row1ComponentMeasureSelect).check({ force: true });

        // Applied Component Measures
        cy.get(createnewcompositemeasure.row1AppliedComponentMeasureName).should('contain.text', 'createProportionMeasure1586529506892');
        cy.get(createnewcompositemeasure.row2AppliedComponentMeasureName).should('contain.text', 'createProportionMeasure1586448273544');

        cy.get(createnewcompositemeasure.row1AppliedComponentMeasureAlias).type('alias1');
        cy.get(createnewcompositemeasure.row2AppliedComponentMeasureAlias).type('alias2');

        cy.get(createnewcompositemeasure.saveAndContinueBtnComponent).click();

        // Dialog
        cy.get(createnewcompositemeasure.confirmationContinueBtn).click();

    })

    it('Validate the FHIR buttons are grayed out for Composite measure', () => {

        cy.get(createnewcompositemeasure.measureLibraryBtn).click();

        cy.get(measurelibrary.searchInputBox).type('createCompositeMeasure', { delay: 50 })
        cy.get(measurelibrary.searchBtn).click();

        cy.get(measurelibrary.row1MeasureSearchName).should('contain.text', 'createCompositeMeasure');
        cy.get(measurelibrary.row1MeasureSearchCheckbox).check({ force: true });

        cy.get(measurelibrary.runFhirValidationRecentActivityBtn).should('be.disabled');
        cy.get(measurelibrary.convertToFhirRecentActivityBtn).should('be.disabled');
    })
})