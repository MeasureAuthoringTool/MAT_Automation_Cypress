import * as helper from '../../../../../support/helpers'
import * as dataCreation from '../../../../../support/MAT/MeasureAndCQLLibraryCreation'
import * as measurelibrary from '../../../../../pom/MAT/WI/MeasureLibrary'
import * as createNewMeasure from '../../../../../pom/MAT/WI/CreateNewMeasure'
import * as measureComposer from '../../../../../pom/MAT/WI/MeasureComposer'
import * as oktaLogin from '../../../../../support/oktaLogin'
import * as measureDetails from '../../../../../pom/MAT/WI/MeasureDetails'


describe('EXM105: Discharged on Statin Medication', () => {
    before('Login', () => {
        oktaLogin.login()
    })
    beforeEach('Preserve Cookies', () => {
        helper.preserveCookies()
    })
    after('Log Out', () => {
        helper.logout()
    })
    it('Discharged on Statin Medication, creation, grouping, and packaging', () => {

        cy.get(measurelibrary.newMeasureButton).click()
        let measureName = 'DischargeStatinMedication' + Date.now()

        cy.get(createNewMeasure.measureName).type(measureName, { delay: 50 })
        cy.get(createNewMeasure.modelradioFHIR).click()
        cy.get(createNewMeasure.cqlLibraryName).type(measureName, { delay: 50 })
        cy.get(createNewMeasure.shortName).type(measureName, { delay: 50 })
        cy.get(createNewMeasure.measureScoringListBox).select('Proportion')
        cy.get(createNewMeasure.patientBasedMeasureListBox).select('No')

        cy.get(createNewMeasure.saveAndContinueBtn).click()

        cy.get(createNewMeasure.confirmationContinueBtn).click()

        helper.verifySpinnerAppearsAndDissappears()

        //select population basis
        cy.get(measureDetails.populationBasisListbox).select('Encounter')
        cy.get(measureDetails.saveBtn).click()

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

         cy.get(measureComposer.searchInputBox).type('tjc', { delay: 50 })
         cy.get(measureComposer.searchBtn).click()
         cy.get(measureComposer.availableLibrariesRow1checkbox).click()
         cy.get(measureComposer.libraryAliasInputBox).type('TJC', { delay: 50 })
         cy.get(measureComposer.saveIncludes).click()

         helper.visibleWithTimeout(measureComposer.warningMessage)

        //Value Sets

        cy.get(measureComposer.valueSets).click();

        helper.verifySpinnerAppearsAndDissappears()

        dataCreation.addValueSet('1.3.6.1.4.1.33895.1.3.0.45')
        dataCreation.addValueSet('2.16.840.1.113883.3.117.1.7.1.87')
        dataCreation.addValueSet('2.16.840.1.113883.3.117.1.7.1.207')
        dataCreation.addValueSet('2.16.840.1.113883.3.117.1.7.1.209')
        dataCreation.addValueSet('2.16.840.1.113883.3.117.1.7.1.292')
        dataCreation.addValueSet('2.16.840.1.114222.4.11.837')
        dataCreation.addValueSet('2.16.840.1.113883.3.117.1.7.1.212')
        dataCreation.addValueSet('2.16.840.1.113883.3.117.1.7.1.247')
        dataCreation.addValueSet('2.16.840.1.113883.3.117.1.7.1.215')
        dataCreation.addValueSet('2.16.840.1.113883.3.117.1.7.1.308')
        dataCreation.addValueSet('2.16.840.1.113883.3.117.1.7.1.473')
        dataCreation.addValueSet('2.16.840.1.113883.3.117.1.7.1.424')
        dataCreation.addValueSet('2.16.840.1.113762.1.4.1111.143')
        dataCreation.addValueSet('2.16.840.1.113762.1.4.1')
        dataCreation.addValueSet('2.16.840.1.113883.3.117.1.7.1.309')
        dataCreation.addValueSet('2.16.840.1.113883.3.117.1.7.1.93')
        dataCreation.addValueSet('2.16.840.1.114222.4.11.3591')
        dataCreation.addValueSet('2.16.840.1.114222.4.11.836')
        dataCreation.addValueSet('2.16.840.1.113883.3.117.1.7.1.423')
        dataCreation.addValueSet('2.16.840.1.113762.1.4.1110.19')

        // Codes

        cy.get(measureComposer.valueSets).click()

        helper.verifySpinnerAppearsAndDissappears()

        dataCreation.addCode('CODE:/CodeSystem/LOINC/Version/2.46/Code/21112-8/Info')
        dataCreation.addCode('CODE:/CodeSystem/SNOMEDCT/Version/2016-03/Code/419099009/Info')

        // Definition

        cy.get(measureComposer.definition).click()

        helper.verifySpinnerAppearsAndDissappears()

        dataCreation.addDefinition('Initial Population', 'TJC."Encounter with Principal Diagnosis and Age"')
        dataCreation.addDefinition('Denominator', 'TJC."Ischemic Stroke Encounter"')

        dataCreation.addDefinition('Denominator Exception', '( TJC."Ischemic Stroke Encounter" IschemicStrokeEncounter\n' + 
            '\twith "Statin Not Given at Discharge" NoDischargeStatin\n' +
            '\tsuch that NoDischargeStatin.authoredOn during day of IschemicStrokeEncounter.period\n' +
            ')\n' +
        'union ( TJC."Ischemic Stroke Encounter" IschemicStrokeEncounter\n' +
            '\twith "Statin Allergy" StatinAllergy\n' +
                '\tsuch that Global."Normalize Interval" ( StatinAllergy.onset ) starts on or before\n' + 
                '\tend of IschemicStrokeEncounter.period\n' +
        ')\n' +
        'union "Encounter with Max LDL less than 70 mg per dL"\n' +
        '// NOTE: Added status check and category check, consider define Statin Medication Request for reuse')

        dataCreation.addDefinition('Denominator Exclusion', 'TJC."Ischemic Stroke Encounters with Discharge Disposition"\n' +
            '\tunion TJC."Comfort Measures during Hospitalization"')

        dataCreation.addDefinition('Encounter with Max LDL less than 70 mg per dL', 'TJC."Ischemic Stroke Encounter" IschemicStrokeEncounter\n' +
        '\twhere Max(["Observation": "LDL-c"] Ldl\n' +
            '\twhere Ldl.status in {{} \'final\', \'amended\' }\n' +
                '\tand Ldl.issued during Interval[IschemicStrokeEncounter.period.start - 30 days, IschemicStrokeEncounter.period.\n' +
                '\tend]\n' +
            '\treturn Ldl.value as Quantity\n' +
        '\t)< 70 \'mg/dL\'')

        dataCreation.addDefinition('Numerator', 'TJC."Ischemic Stroke Encounter" IschemicStrokeEncounter\n' +
        '\twith "Statin at Discharge" DischargeStatin\n' +
            '\tsuch that DischargeStatin.authoredOn during day of Global."Normalize Interval" ( IschemicStrokeEncounter.period )\n' +

        '// NOTE: Added check for Statin.status in {{} \'active\', \'completed\' }\n' +
        '// Discussion about whether to check for both active and completed, versus just specifying active\n' +
        '// Also discussion about whether to use "Community" or "Discharge"\n' +
        '// Suggest using both since there is potential overlap and even some instances that would have both codes\n' +
        '// Will keep both and followup with Pharmacy to verify the approach\n' +
        '// NOTE: Changed intent to only "order", since we\'re specifically looking for authorized prescriptions')

        dataCreation.addDefinition('Statin Allergy', '["AllergyIntolerance": "Statin Allergen"] StatinAllergy\n' +
        '\twhere ( StatinAllergy.clinicalStatus is null\n' +
            '\tor FHIRHelpers.ToConcept ( StatinAllergy.clinicalStatus ) ~ Global."allergy-active"\n' +
        ')\n' +
            '\tand FHIRHelpers.ToConcept ( StatinAllergy.verificationStatus ) in {{} Global."allergy-unconfirmed", Global."allergy-confirmed" }\n' +
        '// NOTE: Added check for status in final or amended')

        dataCreation.addDefinition('Statin at Discharge', '["MedicationRequest": medication in "Statin Grouper"] Statin\n' +
            '\t//Note: expressed as an or with equivalence semantics pending resolution of potential CQL issue.\n' +
        '\twhere exists ( Statin.category C\n' +
            '\twhere FHIRHelpers.ToConcept ( C ) ~ Global."Community"\n' +
                '\tor FHIRHelpers.ToConcept ( C ) ~ Global."Discharge"\n' +
        ')\n' +
            '\tand Statin.status in {{} \'active\', \'completed\' }\n' +
            '\tand Statin.intent = \'order\'')

        dataCreation.addDefinition('Statin Not Given at Discharge', '["MedicationRequest": medication in "Statin Grouper"] NoStatin\n' +
        '\twhere NoStatin.doNotPerform is true\n' +
            '\tand ( NoStatin.reasonCode in "Medical Reason"\n' +
                '\tor NoStatin.reasonCode in "Patient Refusal"\n' +
            ')\n' +
            '//Note: expressed as an or with equivalence semantics pending resolution of potential CQL issue.\n' +
            '\tand exists ( NoStatin.category C\n' +
                '\twhere FHIRHelpers.ToConcept ( C ) ~ Global."Community"\n' +
                '\tor FHIRHelpers.ToConcept ( C ) ~ Global."Discharge"\n' +
            ')\n' +
            '\tand NoStatin.status = \'completed\'\n' +
            '\tand NoStatin.intent = \'order\'\n' +
        '// NOTE: Added clinicalStatus and verificationStatus check')    
        
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
