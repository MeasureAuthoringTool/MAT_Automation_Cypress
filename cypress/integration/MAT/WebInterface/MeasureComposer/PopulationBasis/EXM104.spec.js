import * as helper from '../../../../../support/helpers'
import * as dataCreation from '../../../../../support/MAT/MeasureAndCQLLibraryCreation'
import * as measurelibrary from '../../../../../pom/MAT/WI/MeasureLibrary'
import * as createNewMeasure from '../../../../../pom/MAT/WI/CreateNewMeasure'
import * as measureComposer from '../../../../../pom/MAT/WI/MeasureComposer'
import * as measureDetails from '../../../../../pom/MAT/WI/MeasureDetails'
import * as login from '../../../../../support/MAT/Login'

describe('EXM104: Discharged on Antithrombotic Therapy', () => {
  beforeEach('Login', () => {
    login.matLogin()
  })
  afterEach('Log Out', () => {
    login.matLogout()
  })
  it('Discharged on Antithrombotic Therapy, creation, grouping, and packaging', () => {

    helper.visibleWithTimeout(measurelibrary.newMeasureButton)
    cy.get(measurelibrary.newMeasureButton).click()
    let measureName = 'Discharge' + Date.now()

    cy.get(createNewMeasure.measureName).type(measureName, { delay: 50 })
    cy.get(createNewMeasure.modelradioFHIR).click()
    cy.get(createNewMeasure.cqlLibraryName).type(measureName, { delay: 50 })
    cy.get(createNewMeasure.shortName).type(measureName, { delay: 50 })
    cy.get(createNewMeasure.measureScoringListBox).select('Proportion')
    cy.get(createNewMeasure.patientBasedMeasureListBox).select('No')

    cy.get(createNewMeasure.saveAndContinueBtn).click()

    helper.verifySpinnerAppearsAndDissappears()
    helper.verifySpinnerAppearsAndDissappears()
    helper.verifySpinnerAppearsAndDissappears()

    cy.get(createNewMeasure.confirmationContinueBtn).click()

    helper.verifySpinnerAppearsAndDissappears()

    //select population basis
    cy.get(measureDetails.populationBasisListbox).select('Encounter')
    cy.get(measureDetails.saveBtn).click()

    helper.verifySpinnerAppearsAndDissappears()

    //entering required meta data
    cy.get(measureDetails.measureStewardDeveloper).click()
    helper.verifySpinnerAppearsAndDissappears()
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
    helper.verifySpinnerAppearsAndDissappears()

    helper.waitToContainText(measureComposer.cqlWorkspaceTitleGeneralInformation, 'General Information')

    cy.get(measureComposer.cqlLibraryEditor).click()

    helper.visibleWithTimeout(measureComposer.warningMessage)
    cy.get(measureComposer.warningMessage).should('contain.text', 'You are viewing CQL with no validation errors.')

    helper.verifySpinnerAppearsAndDissappears()

    //adding valueset that this measure requires but cannot retrieve anymore
    cy.get(measureComposer.cqlLibraryEditorInput).type('{uparrow}{uparrow}{uparrow}{uparrow}{uparrow}{uparrow}' +
      'valueset "Antithrombotic Therapy": \'http://cts.nlm.nih.gov/fhir/ValueSet/2.16.840.1.113883.3.117.1.7.1.201\'{enter}{enter}')

    cy.get(measureComposer.cqlEditorSaveBtn).click()

    helper.verifySpinnerAppearsAndDissappears()
    helper.verifySpinnerAppearsAndDissappears()

    helper.visibleWithTimeout(measureComposer.warningMessage)


    //Includes

    cy.get(measureComposer.includes).click()

    cy.get(measureComposer.includesListItems).its('length').should('equal', 3)

    cy.get(measureComposer.includesListItems).eq(0).should('contain.text', 'FHIRHelpers')
    cy.get(measureComposer.includesListItems).eq(1).should('contain.text', 'Global')
    cy.get(measureComposer.includesListItems).eq(2).should('contain.text', 'SDE')

    cy.get(measureComposer.searchInputBox).type('TJCOverallFHIR4', { delay: 50 })
    cy.get(measureComposer.searchBtn).click()
    cy.get(measureComposer.availableLibrariesRow1checkbox).click()
    cy.get(measureComposer.libraryAliasInputBox).type('TJC', { delay: 50 })
    cy.get(measureComposer.saveIncludes).click()

    helper.visibleWithTimeout(measureComposer.warningMessage)

    //Value Sets

    cy.get(measureComposer.valueSets).click()

    helper.verifySpinnerAppearsAndDissappears()

    dataCreation.addValueSet('1.3.6.1.4.1.33895.1.3.0.45')
    dataCreation.addValueSet('2.16.840.1.113883.3.117.1.7.1.87')
    dataCreation.addValueSet('2.16.840.1.113883.3.117.1.7.1.207')
    dataCreation.addValueSet('2.16.840.1.113883.3.117.1.7.1.209')
    dataCreation.addValueSet('2.16.840.1.113883.3.117.1.7.1.292')
    dataCreation.addValueSet('2.16.840.1.113883.3.117.1.7.1.212')
    dataCreation.addValueSet('2.16.840.1.113883.3.117.1.7.1.247')
    dataCreation.addValueSet('2.16.840.1.113883.3.117.1.7.1.215')
    dataCreation.addValueSet('2.16.840.1.113883.3.117.1.7.1.308')
    dataCreation.addValueSet('2.16.840.1.113883.3.117.1.7.1.473')
    dataCreation.addValueSet('2.16.840.1.113883.3.117.1.7.1.424')
    dataCreation.addValueSet('2.16.840.1.113883.3.117.1.7.1.309')
    dataCreation.addValueSet('2.16.840.1.113883.3.117.1.7.1.93')
    dataCreation.addValueSet('2.16.840.1.113762.1.4.1110.42')
    dataCreation.addValueSet('2.16.840.1.113762.1.4.1110.19')

    // Codes

    cy.get(measureComposer.valueSets).click()

    helper.verifySpinnerAppearsAndDissappears()

    dataCreation.addCode('CODE:/CodeSystem/LOINC/Version/2.46/Code/21112-8/Info')

    // Definition

    cy.get(measureComposer.definition).click()

    helper.verifySpinnerAppearsAndDissappears()


    dataCreation.addDefinition('Denominator', 'TJC."Ischemic Stroke Encounter"')

    dataCreation.addDefinition('Denominator Exceptions', '(\n' +
      '      TJC."Ischemic Stroke Encounter" IschemicStrokeEncounter\n' +
      '      \twith "Statin Not Given at Discharge" NoDischargeStatin\n' +
      '      \t\tsuch that NoDischargeStatin.authoredOn during day of IschemicStrokeEncounter.period\n' +
      '  \t) union\n' +
      '  \t (\n' +
      '       TJC."Ischemic Stroke Encounter" IschemicStrokeEncounter\n' +
      '  \t\t   with "Statin Allergy" StatinAllergy\n' +
      '  \t\t\t    such that Global."Normalize Interval"(StatinAllergy.onset) starts on or before end of IschemicStrokeEncounter.period\n' +
      '      ) union\n' +
      '        "Encounter with Max LDL less than 70 mg per dL"')

    dataCreation.addDefinition('Denominator Exclusions', 'TJC."Ischemic Stroke Encounters with Discharge Disposition"\n' +
      '  \t\tunion TJC."Comfort Measures during Hospitalization"')

    dataCreation.addDefinition('Encounter with Max LDL less than 70 mg per dL', 'TJC."Ischemic Stroke Encounter" IschemicStrokeEncounter\n' +
      '  \t\twhere Max(\n' +
      '          ["Observation": "LDL-c"] Ldl\n' +
      '  \t\t\t\t    where Ldl.status in { \'final\', \'amended\' }\n' +
      '                and Ldl.issued during Interval[IschemicStrokeEncounter.period.start - 30 days, IschemicStrokeEncounter.period.end]\n' +
      '  \t\t\t\treturn Ldl.value as Quantity\n' +
      '  \t\t) < 70 \'mg/dL\'')

    dataCreation.addDefinition('Initial Population', 'TJC."Encounter with Principal Diagnosis and Age"')

    dataCreation.addDefinition('Intervention Comfort Measures', '["ServiceRequest": "Comfort Measures"]\n' +
      '      union ["Procedure": "Comfort Measures"]')

    dataCreation.addDefinition('Numerator', 'TJC."Ischemic Stroke Encounter" IschemicStrokeEncounter\n' +
      '  \t\twith "Statin at Discharge" DischargeStatin\n' +
      '  \t\t\tsuch that DischargeStatin.authoredOn during day of Global."Normalize Interval"(IschemicStrokeEncounter.period)')

    dataCreation.addDefinition('Encounter With Pharmacological Contraindications for Antithrombotic Therapy at Discharge', 'TJC."Ischemic Stroke Encounter" IschemicStrokeEncounter\n' +
      '      with "Pharmacological Contraindications for Antithrombotic Therapy at Discharge" DischargePharmacological\n' +
      '        such that DischargePharmacological.authoredOn during IschemicStrokeEncounter.period')

    dataCreation.addDefinition('Numerator', 'TJC."Ischemic Stroke Encounter" IschemicStrokeEncounter\n' +
      '  \t\twith "Antithrombotic Therapy at Discharge" DischargeAntithrombotic\n' +
      '  \t\t\tsuch that DischargeAntithrombotic.authoredOn during Global."Normalize Interval"(IschemicStrokeEncounter.period)')

    dataCreation.addDefinition('Statin Allergy', '["AllergyIntolerance": "Statin Allergen"] StatinAllergy\n' +
      '      where (StatinAllergy.clinicalStatus is null or FHIRHelpers.ToConcept(StatinAllergy.clinicalStatus) ~ Global."allergy-active")\n' +
      '        and FHIRHelpers.ToConcept(StatinAllergy.verificationStatus) in { Global."allergy-unconfirmed", Global."allergy-confirmed" }')

    dataCreation.addDefinition('Statin at Discharge', '["MedicationRequest": medication in "Statin Grouper"] Statin\n' +
      '      where exists (Statin.category C where FHIRHelpers.ToConcept(C) ~ Global."Community" or FHIRHelpers.ToConcept (C) ~ Global."Discharge")\n' +
      '      and Statin.status in { \'active\', \'completed\' }\n' +
      '      and Statin.intent = \'order\'')

    dataCreation.addDefinition('Statin Not Given at Discharge', '["MedicationRequest": medication in "Statin Grouper"] NoStatin\n' +
      '      where NoStatin.doNotPerform is true\n' +
      '        and (\n' +
      '          NoStatin.reasonCode in "Medical Reason"\n' +
      '            or NoStatin.reasonCode in "Patient Refusal"\n' +
      '        )\n' +
      '        and exists (NoStatin.category C where FHIRHelpers.ToConcept(C) ~ Global."Community" or FHIRHelpers.ToConcept(C) ~ Global."Discharge")\n' +
      '        and NoStatin.status = \'completed\'\n' +
      '        and NoStatin.intent = \'order\'')

    //CQL Library Editor

    cy.get(measureComposer.cqlLibraryEditor).click()

    helper.waitToContainText(measureComposer.cqlWorkspaceTitleCQLLibraryEditor, 'CQL Library Editor')

    helper.visibleWithTimeout(measureComposer.warningMessage)
    helper.waitToContainText(measureComposer.warningMessage, 'You are viewing CQL with no validation errors.')

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

    // Denominator Exclusions
    helper.verifySpinnerAppearsAndDissappears()

    cy.get(measureComposer.denominatorExclusions).click()

    helper.verifySpinnerAppearsAndDissappears()

    cy.get(measureComposer.denominatorExclusionsDefinitionListBox).select('Denominator Exclusions')
    cy.get(measureComposer.denominatorExclusionsSaveBtn).click()

    helper.visibleWithTimeout(measureComposer.warningMessage)
    helper.waitToContainText(measureComposer.warningMessage, 'Changes to Denominator Exclusions have been successfully saved.')

    // Denominator Exceptions
    helper.verifySpinnerAppearsAndDissappears()

    cy.get(measureComposer.denominatorExceptions).click()

    helper.verifySpinnerAppearsAndDissappears()

    cy.get(measureComposer.denominatorExceptionsDefinitionListBox).select('Denominator Exceptions')
    cy.get(measureComposer.denominatorExceptionsSaveBtn).click()

    helper.visibleWithTimeout(measureComposer.warningMessage)
    helper.waitToContainText(measureComposer.warningMessage, 'Changes to Denominator Exceptions have been successfully saved.')

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
    helper.waitToContainText(measureComposer.packageWarningMessage, 'Measure packaged successfully. Please access the Measure Library to export the measure.')

    cy.get(measurelibrary.measureLibraryTab).click()

    helper.verifySpinnerAppearsAndDissappears()

  })
})
