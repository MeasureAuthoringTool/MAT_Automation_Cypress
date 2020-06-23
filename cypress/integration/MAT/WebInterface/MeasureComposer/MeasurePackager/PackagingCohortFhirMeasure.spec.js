import * as helper from '../../../../../support/helpers';
import * as measurelibrary from '../../../../../pom/MAT/WI/MeasureLibrary'
import * as oktaLogin from '../../../../../support/oktaLogin'
import * as createNewMeasure from '../../../../../pom/MAT/WI/CreateNewMeasure'
import * as measureComposer from '../../../../../pom/MAT/WI/MeasureComposer'

describe('Packaging: Cohort Measure', () => {
    before('Login', () => {
        oktaLogin.login()
    })
    beforeEach('Preserve Cookies', () => {
        helper.preserveCookies()
    })
    after('Log Out', () => {
        helper.logout()
    })

    it('Validate the measure packaging for Cohort FHIR Measure', () => {

        cy.get(measurelibrary.newMeasureButton).click()
        let measureName = 'CreateFhirCohortMeasure' + Date.now()

        cy.get(createNewMeasure.measureName).type(measureName, { delay: 50 })
        cy.get(createNewMeasure.modelradioFHIR).click()
        cy.get(createNewMeasure.cqlLibraryName).type(measureName, { delay: 50 })
        cy.get(createNewMeasure.shortName).type(measureName, { delay: 50 })
        cy.get(createNewMeasure.measureScoringListBox).select('Cohort')
        cy.get(createNewMeasure.patientBasedMeasureListBox).select('Yes')

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

         cy.get(measureComposer.searchInputBox).type('tjc', { delay: 50 })
         cy.get(measureComposer.searchBtn).click()
         cy.get(measureComposer.availableLibrariesRow1checkbox).click()
         cy.get(measureComposer.libraryAliasInputBox).type('TJC', { delay: 50 })
         cy.get(measureComposer.saveIncludes).click()

         helper.visibleWithTimeout(measureComposer.warningMessage)

         //Value Sets

        cy.get(measureComposer.valueSets).click()

        helper.verifySpinnerAppearsAndDissappears()

        helper.addValueSet('2.16.840.1.113883.3.666.5.307')
        helper.addValueSet('2.16.840.1.113762.1.4.1182.118')
        helper.addValueSet('2.16.840.1.113762.1.4.1111.161')

        // Codes

        cy.get(measureComposer.valueSets).click()

        helper.verifySpinnerAppearsAndDissappears()

        helper.addCode('CODE:/CodeSystem/LOINC/Version/2.46/Code/21112-8/Info')
        helper.addCode('CODE:/CodeSystem/SNOMEDCT/Version/2016-03/Code/419099009/Info')
        helper.addCode('CODE:/CodeSystem/SNOMEDCT/Version/2017-09/Code/371828006/Info')

        // Definition

        cy.get(measureComposer.definition).click()

        helper.verifySpinnerAppearsAndDissappears()

        helper.addDefinition('Initial Population', 'TJC."Encounter with Principal Diagnosis and Age"')

        //CQL Library Editor

        cy.get(measureComposer.cqlLibraryEditor).click()

        helper.waitToContainText(measureComposer.cqlWorkspaceTitleCQLLibraryEditor,'CQL Library Editor')

        helper.visibleWithTimeout(measureComposer.warningMessage)
        helper.waitToContainText(measureComposer.warningMessage,'You are viewing CQL with no validation errors.')

        cy.wait(2000)

        // Population Workspace

        cy.get(measureComposer.populationWorkspace).click()

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(measureComposer.initialPopulation).click()

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(measureComposer.initialPopulationDefinitionListBox).select('Initial Population')
        cy.get(measureComposer.initialPopulationSaveBtn).click()

        helper.visibleWithTimeout(measureComposer.warningMessage)
        helper.waitToContainText(measureComposer.warningMessage,'Changes to Initial Populations have been successfully saved.')

        //navigate to Measure Packager
        cy.get(measureComposer.measurePackager).click()

        helper.verifySpinnerAppearsAndDissappears()

        //verifying the the Population Workspace data is viewable in the Populations list in Measure Packager
        cy.get(measureComposer.populationsListItems).its('length').should('equal', 1)

        cy.get(measureComposer.populationsListItems).eq(0).should('contain.text', 'Initial Population 1')

        //Package Grouping
        cy.get(measureComposer.addAllItemsToGrouping).click()
        cy.get(measureComposer.saveGrouping).click()

        cy.get(measureComposer.measureGroupingTable).should('contain.text', 'Measure Grouping 1')

        //Create Measure Package
        cy.get(measureComposer.createMeasurePackageBtn).click()

        helper.verifySpinnerAppearsAndDissappears()

        cy.wait(3000)

        helper.waitToContainText(measureComposer.packageWarningMessage,'Measure packaged successfully. Please access the Measure Library to export the measure.')

        cy.get(measurelibrary.measureLibraryTab).click()

        helper.verifySpinnerAppearsAndDissappears()

    })
}) 