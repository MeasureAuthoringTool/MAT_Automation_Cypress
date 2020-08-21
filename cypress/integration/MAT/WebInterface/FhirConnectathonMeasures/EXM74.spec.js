import * as helper from '../../../../../support/helpers'
import * as dataCreation from '../../../../../support/MAT/MeasureAndCQLLibraryCreation'
import * as measurelibrary from '../../../../../pom/MAT/WI/MeasureLibrary'
import * as createNewMeasure from '../../../../../pom/MAT/WI/CreateNewMeasure'
import * as measureComposer from '../../../../../pom/MAT/WI/MeasureComposer'
import * as oktaLogin from '../../../../../support/oktaLogin'
import * as measureDetails from '../../../../../pom/MAT/WI/MeasureDetails'


describe('EXM74: Measure', () => {
    before('Login', () => {
        oktaLogin.login()
    })
    beforeEach('Preserve Cookies', () => {
        helper.preserveCookies()
    })
    // after('Log Out', () => {
    //     helper.logout()
    // })
    it('Continuous Variable FHIR, creation', () => {

        cy.get(measurelibrary.newMeasureButton).click()
        let measureName = 'Measure_EXM74' + Date.now()

        cy.get(createNewMeasure.measureName).type(measureName, { delay: 50 })
        cy.get(createNewMeasure.modelradioFHIR).click()
        cy.get(createNewMeasure.cqlLibraryName).type(measureName, { delay: 50 })
        cy.get(createNewMeasure.shortName).type(measureName, { delay: 50 })
        cy.get(createNewMeasure.measureScoringListBox).select('Proportion')
        cy.get(createNewMeasure.patientBasedMeasureListBox).select('Yes')

        cy.get(createNewMeasure.saveAndContinueBtn).click()

        cy.get(createNewMeasure.confirmationContinueBtn).click()

        helper.verifySpinnerAppearsAndDissappears()

        //entering required meta data
        cy.get(measureDetails.measureStewardDeveloper).click()
        cy.get(measureDetails.measureStewardListBox).select('SemanticBits')
        cy.get(measureDetails.row1CheckBox).click()
        cy.get(measureDetails.saveBtn).click()
        helper.visibleWithTimeout(measureDetails.warningMessage)

        cy.get(measureDetails.description).click()
        helper.enterText(measureDetails.textAreaInput, 'description')
        cy.get(measureDetails.saveBtn).click()
        helper.visibleWithTimeout(measureDetails.warningMessage)

        cy.get(measureDetails.measureType).click()
        cy.get(measureDetails.row1CheckBox).click()
        cy.get(measureDetails.saveBtn).click()
        helper.visibleWithTimeout(measureDetails.warningMessage)

        cy.get(measureComposer.cqlWorkspace).click()

        helper.verifySpinnerAppearsAndDissappears()

        helper.waitToContainText(measureComposer.cqlWorkspaceTitleGeneralInformation, 'General Information')

        //Includes

        cy.get(measureComposer.includes).click()

        cy.get(measureComposer.includesListItems).its('length').should('equal', 3)

        cy.get(measureComposer.includesListItems).eq(0).should('contain.text', 'FHIRHelpers')
        cy.get(measureComposer.includesListItems).eq(1).should('contain.text', 'Global')
        cy.get(measureComposer.includesListItems).eq(2).should('contain.text', 'SDE')

         cy.get(measureComposer.searchInputBox).type('hospice', { delay: 50 })
         cy.get(measureComposer.searchBtn).click()
         cy.get(measureComposer.availableLibrariesRow1checkbox).click()
         cy.get(measureComposer.libraryAliasInputBox).type('Hospice', { delay: 50 })
         cy.get(measureComposer.saveIncludes).click()

         helper.visibleWithTimeout(measureComposer.warningMessage)

        //Value Sets

        cy.get(measureComposer.valueSets).click();

        helper.verifySpinnerAppearsAndDissappears()

        dataCreation.addValueSet('2.16.840.1.113883.3.464.1003.125.12.1003')
        dataCreation.addValueSet('2.16.840.1.113883.3.464.1003.125.12.1002')
        dataCreation.addValueSet('2.16.840.1.113883.3.464.1003.101.12.1001')
        dataCreation.addValueSet('2.16.840.1.113883.3.464.1003.101.12.1024')
        dataCreation.addValueSet('2.16.840.1.113883.3.464.1003.101.12.1025')
        dataCreation.addValueSet('2.16.840.1.113883.3.464.1003.101.12.1023')
        dataCreation.addValueSet('2.16.840.1.113883.3.464.1003.101.12.1022')

        // Codes

        cy.get(measureComposer.valueSets).click()

        helper.verifySpinnerAppearsAndDissappears()

        dataCreation.addCode('CODE:/CodeSystem/LOINC/Version/2.46/Code/21112-8/Info')

        // Definition

        cy.get(measureComposer.definition).click()

        helper.verifySpinnerAppearsAndDissappears()

        dataCreation.addDefinition('Initial Population', 'exists ( ["Patient"] BirthDate\n' +
        '\twhere Global."CalendarAgeInMonthsAt" ( FHIRHelpers.ToDate ( BirthDate.birthDate ), start of "Measurement Period" ) >= 6\n' +
          '\tand Global."CalendarAgeInYearsAt" ( FHIRHelpers.ToDate ( BirthDate.birthDate ), start of "Measurement Period" ) < 20)\n' +
      'and exists ( "Qualifying Encounters" )')

        dataCreation.addDefinition('Denominator', '"Initial Population"')
        dataCreation.addDefinition('Denominator Exclusion', 'Hospice."Has Hospice"')

        dataCreation.addDefinition('Numerator', 'exists ["Procedure": "Fluoride Varnish Application for Children"] FluorideApplication\n' +
        '\twhere FluorideApplication.performed during "Measurement Period"\n' +
          '\tand FluorideApplication.status = \'completed\'')
       
        dataCreation.addDefinition('Qualifying Encounters', '( ["Encounter": "Office Visit"]\n' +
        '\tunion ["Encounter": "Preventive Care - Established Office Visit, 0 to 17"]\n' +
        'union ["Encounter": "Preventive Care- Initial Office Visit, 0 to 17"]\n' +
        'union ["Encounter": "Preventive Care Services - Established Office Visit, 18 and Up"]\n' +
        'union ["Encounter": "Preventive Care Services-Initial Office Visit, 18 and Up"]\n' +
        'union ["Encounter": "Clinical Oral Evaluation"] ) ValidEncounter\n' +
        'where Global."Normalize Interval" ( ValidEncounter.period ) during "Measurement Period"\n' +
          '\tand ValidEncounter.status = \'finished\'')

        dataCreation.addDefinition('Stratification 1', 'exists ( ["Patient"] BirthDate\n' +
        '\twhere Global."CalendarAgeInMonthsAt" ( FHIRHelpers.ToDate ( BirthDate.birthDate ), start of "Measurement Period" ) >= 6\n' +
          '\tand Global."CalendarAgeInYearsAt" ( FHIRHelpers.ToDate ( BirthDate.birthDate ), start of "Measurement Period" ) <= 4\n' +
        ')')

        dataCreation.addDefinition('Stratification 2', 'exists ["Patient"] BirthDate\n' +
            '\twhere Global."CalendarAgeInYearsAt" ( FHIRHelpers.ToDate ( BirthDate\n' +
        '.birthDate ), start of "Measurement Period" ) in Interval[5, 11]') 

        dataCreation.addDefinition('Stratification 3', 'exists ["Patient"] BirthDate\n' +
            '\twhere Global."CalendarAgeInYearsAt" ( FHIRHelpers.ToDate ( BirthDate\n' +
        '.birthDate ), start of "Measurement Period" ) in Interval[12, 20]')    
        
        //CQL Library Editor

        cy.get(measureComposer.cqlLibraryEditor).click()

        helper.waitToContainText(measureComposer.cqlWorkspaceTitleCQLLibraryEditor,'CQL Library Editor')

        helper.visibleWithTimeout(measureComposer.warningMessage)
        helper.waitToContainText(measureComposer.warningMessage,'You are viewing CQL with no validation errors.')

        helper.verifySpinnerAppearsAndDissappears()
        helper.verifySpinnerAppearsAndDissappears()

        // Population Workspace

        cy.get(measureComposer.populationWorkspace).click()

        helper.verifySpinnerAppearsAndDissappears()

        // Initial Population
        cy.get(measureComposer.initialPopulation).click()

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(measureComposer.initialPopulationDefinitionListBox).select('Initial Population')
        cy.get(measureComposer.initialPopulationSaveBtn).click()

        helper.visibleWithTimeout(measureComposer.warningMessage)
        helper.waitToContainText(measureComposer.warningMessage,'Changes to Initial Populations have been successfully saved.')

        // Denominator
        cy.get(measureComposer.denominator).click()

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(measureComposer.denominatorDefinitionListBox).select('Denominator')
        cy.get(measureComposer.denominatorSaveBtn).click()

        helper.visibleWithTimeout(measureComposer.warningMessage)
        helper.waitToContainText(measureComposer.warningMessage,'Changes to Denominators have been successfully saved.')

        // Numerator
        cy.get(measureComposer.numerator).click()

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(measureComposer.numeratorDefinitionListBox).select('Numerator')
        cy.get(measureComposer.numeratorSaveBtn).click()

        helper.visibleWithTimeout(measureComposer.warningMessage)
        helper.waitToContainText(measureComposer.warningMessage,'Changes to Numerators have been successfully saved.')       

        // Denominator Exclusions
        helper.verifySpinnerAppearsAndDissappears()

        cy.get(measureComposer.denominatorExclusions).click()

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(measureComposer.denominatorExclusionsDefinitionListBox).select('Denominator Exclusion')
        cy.get(measureComposer.denominatorExclusionsSaveBtn).click()

        helper.visibleWithTimeout(measureComposer.warningMessage)
        helper.waitToContainText(measureComposer.warningMessage,'Changes to Denominator Exclusions have been successfully saved.')

        // Denominator Exceptions
        helper.verifySpinnerAppearsAndDissappears()

        cy.get(measureComposer.denominatorExceptions).click()

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(measureComposer.denominatorExceptionsDefinitionListBox).select('Denominator Exception')
        cy.get(measureComposer.denominatorExceptionsSaveBtn).click()

        helper.visibleWithTimeout(measureComposer.warningMessage)
        helper.waitToContainText(measureComposer.warningMessage,'Changes to Denominator Exceptions have been successfully saved.')

        //navigate to Measure Packager
        helper.verifySpinnerAppearsAndDissappears()

        cy.get(measureComposer.measurePackager).click()

        helper.verifySpinnerAppearsAndDissappears()

        //verifying the the Population Workspace data is viewable in the Populations list in Measure Packager
        cy.get(measureComposer.populationsListItems).its('length').should('equal', 5)

        cy.get(measureComposer.populationsListItems).eq(0).should('contain.text', 'Initial Population 1')
        cy.get(measureComposer.populationsListItems).eq(1).should('contain.text', 'Denominator 1')
        cy.get(measureComposer.populationsListItems).eq(2).should('contain.text', 'Denominator Exclusions 1')
        cy.get(measureComposer.populationsListItems).eq(3).should('contain.text', 'Denominator Exceptions 1')
        cy.get(measureComposer.populationsListItems).eq(4).should('contain.text', 'Numerator 1')
        //Package Grouping

        cy.get(measureComposer.addAllItemsToGrouping).click()
        cy.get(measureComposer.saveGrouping).click()

        cy.get(measureComposer.measureGroupingTable).should('contain.text', 'Measure Grouping 1')

        //Create Measure Package
        cy.get(measureComposer.createMeasurePackageBtn).click()

        helper.verifySpinnerAppearsAndDissappears()
        helper.verifySpinnerAppearsAndDissappears()

        helper.visibleWithTimeout(measureComposer.packageWarningMessage)
        helper.waitToContainText(measureComposer.packageWarningMessage,'Measure packaged successfully. Please access the Measure Library to export the measure.')

        cy.get(measurelibrary.measureLibraryTab).click()

        helper.verifySpinnerAppearsAndDissappears()

    })
})
