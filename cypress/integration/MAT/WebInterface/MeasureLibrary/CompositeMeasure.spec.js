import * as helper from '../../../../support/helpers'
import * as measurelibrary from '../../../../pom/MAT/WI/MeasureLibrary'
import * as createnewcompositemeasure from '../../../../pom/MAT/WI/CreateNewCompositeMeasure'
import * as measureComposer from '../../../../pom/MAT/WI/MeasureComposer'
import * as oktaLogin from '../../../../support/oktaLogin'
import * as dataCreation from "../../../../support/MAT/MeasureAndCQLLibraryCreation";

let measureNameOne = ''
let measureNameTwo = ''

describe('Creating New Composite Measure', () => {
    before('Login', () => {
        oktaLogin.login()

        measureNameOne = dataCreation.createDraftMeasure('qdmCqlMeasureOne', 'QDM')
        measureNameTwo = dataCreation.createDraftMeasure('qdmCqlMeasureTwo', 'QDM')

        helper.verifySpinnerAppearsAndDissappears()

    })

    beforeEach('Preserve Cookies', () => {
        helper.preserveCookies()
    })

    after('Log Out', () => {
        helper.logout()
    })

    it('Packaging and versioning the first Proportion measure', () => {

        helper.enabledWithTimeout(measurelibrary.searchInputBox)
        cy.get(measurelibrary.searchInputBox).type(measureNameOne, { delay: 50 })
        cy.get(measurelibrary.searchBtn).click()

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(measurelibrary.row1MeasureSearch).dblclick();

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(measureComposer.cqlWorkspace).click();

        helper.verifySpinnerAppearsAndDissappears()

        helper.waitToContainText(measureComposer.cqlWorkspaceTitleGeneralInformation, 'General Information')

        // Definition

        cy.get(measureComposer.definition).click()

        helper.verifySpinnerAppearsAndDissappears()

        dataCreation.addDefinition('Initial Population', 'true')
        dataCreation.addDefinition('Denominator', 'true')
        dataCreation.addDefinition('Numerator', 'true')

         // Population Workspace

         cy.get(measureComposer.populationWorkspace).click()

         helper.verifySpinnerAppearsAndDissappears()
 
         // Initial Population
         cy.get(measureComposer.initialPopulation).click()
 
         helper.verifySpinnerAppearsAndDissappears()
 
         cy.get(measureComposer.initialPopulationDefinitionListBox).select('Initial Population')
         cy.get(measureComposer.initialPopulationSaveBtn).click()
 
         helper.visibleWithTimeout(measureComposer.warningMessage)
         helper.waitToContainText(measureComposer.warningMessage, 'Changes to Initial Populations have been successfully saved.')
 
         // Denominator
         cy.get(measureComposer.denominator).click()
 
         helper.verifySpinnerAppearsAndDissappears()
 
         cy.get(measureComposer.denominatorDefinitionListBox).select('Denominator')
         cy.get(measureComposer.denominatorSaveBtn).click()
 
         helper.visibleWithTimeout(measureComposer.warningMessage)
         helper.waitToContainText(measureComposer.warningMessage, 'Changes to Denominators have been successfully saved.')
 
         // Numerator
         cy.get(measureComposer.numerator).click()
 
         helper.verifySpinnerAppearsAndDissappears()
 
         cy.get(measureComposer.numeratorDefinitionListBox).select('Numerator')
         cy.get(measureComposer.numeratorSaveBtn).click()
 
         helper.visibleWithTimeout(measureComposer.warningMessage)
         helper.waitToContainText(measureComposer.warningMessage, 'Changes to Numerators have been successfully saved.')
 
        //navigate to Measure Packager
        cy.get(measureComposer.measurePackager).click()

        helper.verifySpinnerAppearsAndDissappears()

        //Package Grouping
        cy.get(measureComposer.addAllItemsToGrouping).click()
        cy.get(measureComposer.saveGrouping).click()

        cy.get(measureComposer.measureGroupingTable).should('contain.text', 'Measure Grouping 1')

        //Create Measure Package
        cy.get(measureComposer.createMeasurePackageBtn).click()

        helper.verifySpinnerAppearsAndDissappears()

        cy.wait(3000)

        helper.waitToContainText(measureComposer.packageWarningMessage, 'Measure packaged successfully. Please access the Measure Library to export the measure.')

        cy.get(measurelibrary.measureLibraryTab).click()

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(measurelibrary.searchInputBox).clear().type(measureNameOne, { delay: 50 })
        cy.get(measurelibrary.searchBtn).click()

        helper.verifySpinnerAppearsAndDissappears()

        helper.visibleWithTimeout(measurelibrary.row1MeasureSearch)

        cy.wait(2000)
      
        cy.get(measurelibrary.row1MeasureSearch).click()
      
        cy.get(measurelibrary.createVersionMeasureSearchBtn).click()
      
        cy.get(measurelibrary.majorVersionTypeRadio).click()
        cy.get(measurelibrary.packageAndVersion).click()
      
        helper.verifySpinnerAppearsAndDissappears()

    })

    it('Packaging and versioning the second Proportion measure', () => {

        cy.get(measurelibrary.searchInputBox).clear().type(measureNameTwo, { delay: 50 })
        cy.get(measurelibrary.searchBtn).click()

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(measurelibrary.row1MeasureSearch).dblclick();

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(measureComposer.cqlWorkspace).click();

        helper.verifySpinnerAppearsAndDissappears()

        helper.waitToContainText(measureComposer.cqlWorkspaceTitleGeneralInformation, 'General Information')

        // Definition

        cy.get(measureComposer.definition).click()

        helper.verifySpinnerAppearsAndDissappears()

        dataCreation.addDefinition('Initial Population', 'true')
        dataCreation.addDefinition('Denominator', 'true')
        dataCreation.addDefinition('Numerator', 'true')

         // Population Workspace

         cy.get(measureComposer.populationWorkspace).click()

         helper.verifySpinnerAppearsAndDissappears()
 
         // Initial Population
         cy.get(measureComposer.initialPopulation).click()
 
         helper.verifySpinnerAppearsAndDissappears()
 
         cy.get(measureComposer.initialPopulationDefinitionListBox).select('Initial Population')
         cy.get(measureComposer.initialPopulationSaveBtn).click()
 
         helper.visibleWithTimeout(measureComposer.warningMessage)
         helper.waitToContainText(measureComposer.warningMessage, 'Changes to Initial Populations have been successfully saved.')
 
         // Denominator
         cy.get(measureComposer.denominator).click()
 
         helper.verifySpinnerAppearsAndDissappears()
 
         cy.get(measureComposer.denominatorDefinitionListBox).select('Denominator')
         cy.get(measureComposer.denominatorSaveBtn).click()
 
         helper.visibleWithTimeout(measureComposer.warningMessage)
         helper.waitToContainText(measureComposer.warningMessage, 'Changes to Denominators have been successfully saved.')
 
         // Numerator
         cy.get(measureComposer.numerator).click()
 
         helper.verifySpinnerAppearsAndDissappears()
 
         cy.get(measureComposer.numeratorDefinitionListBox).select('Numerator')
         cy.get(measureComposer.numeratorSaveBtn).click()
 
         helper.visibleWithTimeout(measureComposer.warningMessage)
         helper.waitToContainText(measureComposer.warningMessage, 'Changes to Numerators have been successfully saved.')
 
        //navigate to Measure Packager
        cy.get(measureComposer.measurePackager).click()

        helper.verifySpinnerAppearsAndDissappears()

        //Package Grouping
        cy.get(measureComposer.addAllItemsToGrouping).click()
        cy.get(measureComposer.saveGrouping).click()

        cy.get(measureComposer.measureGroupingTable).should('contain.text', 'Measure Grouping 1')

        //Create Measure Package
        cy.get(measureComposer.createMeasurePackageBtn).click()

        helper.verifySpinnerAppearsAndDissappears()

        cy.wait(3000)

        helper.waitToContainText(measureComposer.packageWarningMessage, 'Measure packaged successfully. Please access the Measure Library to export the measure.')

        cy.get(measurelibrary.measureLibraryTab).click()

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(measurelibrary.searchInputBox).clear().type(measureNameTwo, { delay: 50 })
        cy.get(measurelibrary.searchBtn).click()

        helper.verifySpinnerAppearsAndDissappears()

        helper.visibleWithTimeout(measurelibrary.row1MeasureSearch)

        cy.wait(2000)
      
        cy.get(measurelibrary.row1MeasureSearch).click()
      
        cy.get(measurelibrary.createVersionMeasureSearchBtn).click()
      
        cy.get(measurelibrary.majorVersionTypeRadio).click()
        cy.get(measurelibrary.packageAndVersion).click()
      
        helper.verifySpinnerAppearsAndDissappears()

    })

    it('Create Composite measure', () => {

        cy.get(measurelibrary.newCompositeMeasureButton).click();

        let measureName = 'createCompositeMeasure' + Date.now()

        cy.get(createnewcompositemeasure.measureName).type(measureName, { delay: 50 })
        cy.get(createnewcompositemeasure.modelradioQDM).click();
        cy.get(createnewcompositemeasure.cqlLibraryName).type(measureName, { delay: 50 })
        cy.get(createnewcompositemeasure.shortName).type(measureName, { delay: 50 })

        cy.get(createnewcompositemeasure.compositeScoringMethod).select('All or Nothing');
        cy.get(createnewcompositemeasure.measureScoring).select('Proportion');
        cy.get(createnewcompositemeasure.patientBasedMeasure).select('Yes');

        cy.get(createnewcompositemeasure.saveAndContinueBtn).click();

        // Component Measures
        cy.get(createnewcompositemeasure.searchInputBox).type(measureNameOne, { delay: 50 })
        cy.get(createnewcompositemeasure.searchButton).click();

        cy.get(createnewcompositemeasure.row1ComponentMeasureSearchName).should('contain.text', measureNameOne);
        cy.get(createnewcompositemeasure.row1ComponentMeasureSelect).check({ force: true });

        cy.get(createnewcompositemeasure.searchInputBox).clear();
        cy.get(createnewcompositemeasure.searchInputBox).type(measureNameTwo, { delay: 50 })
        cy.get(createnewcompositemeasure.searchButton).click();

        cy.get(createnewcompositemeasure.row1ComponentMeasureSearchName).should('contain.text', measureNameTwo);
        cy.get(createnewcompositemeasure.row1ComponentMeasureSelect).check({ force: true });

        // Applied Component Measures

        cy.get(createnewcompositemeasure.row1AppliedComponentMeasureAlias).type('alias1');
        cy.get(createnewcompositemeasure.row2AppliedComponentMeasureAlias).type('alias2');

        cy.get(createnewcompositemeasure.saveAndContinueBtnComponent).click();

        // Dialog
        cy.get(createnewcompositemeasure.confirmationContinueBtn).click();

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(measurelibrary.measureLibraryTab).click()

        helper.verifySpinnerAppearsAndDissappears()

    })

})

describe('Validate FHIR model for Composite measure', () => {
    before('Login', () => {
        oktaLogin.login()

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
