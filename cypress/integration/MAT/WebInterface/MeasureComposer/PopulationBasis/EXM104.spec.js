import * as helper from '../../../../../support/helpers'
import * as dataCreation from '../../../../../support/MAT/MeasureAndCQLLibraryCreation'
import * as measurelibrary from '../../../../../pom/MAT/WI/MeasureLibrary'
import * as createNewMeasure from '../../../../../pom/MAT/WI/CreateNewMeasure'
import * as measureComposer from '../../../../../pom/MAT/WI/MeasureComposer'
import * as oktaLogin from '../../../../../support/oktaLogin'
import * as measureDetails from '../../../../../pom/MAT/WI/MeasureDetails'

describe('EXM104: Discharged on Antithrombotic Therapy', () => {
  beforeEach('Login', () => {
    oktaLogin.login()
  })
  afterEach('Log Out', () => {
    helper.logout()
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

    cy.get(measureComposer.searchInputBox).type('TJCOverallFHIR4', { delay: 50 })
    cy.get(measureComposer.searchBtn).click()
    cy.get(measureComposer.availableLibrariesRow1checkbox).click()
    cy.get(measureComposer.libraryAliasInputBox).type('TJC', { delay: 50 })
    cy.get(measureComposer.saveIncludes).click()

    helper.visibleWithTimeout(measureComposer.warningMessage)

    //Value Sets

    cy.get(measureComposer.valueSets).click()

    helper.verifySpinnerAppearsAndDissappears()

    dataCreation.addValueSet('2.16.840.1.113883.3.117.1.7.1.201')
    dataCreation.addValueSet('1.3.6.1.4.1.33895.1.3.0.45')
    dataCreation.addValueSet('2.16.840.1.113883.3.117.1.7.1.87')
    dataCreation.addValueSet('2.16.840.1.113883.3.117.1.7.1.207')
    dataCreation.addValueSet('2.16.840.1.113883.3.117.1.7.1.209')
    dataCreation.addValueSet('2.16.840.1.113883.3.117.1.7.1.292')
    dataCreation.addValueSet('2.16.840.1.114222.4.11.837')
    dataCreation.addValueSet('2.16.840.1.113883.3.117.1.7.1.212')
    dataCreation.addValueSet('2.16.840.1.113883.3.117.1.7.1.247')
    dataCreation.addValueSet('2.16.840.1.113883.3.117.1.7.1.308')
    dataCreation.addValueSet('2.16.840.1.113883.3.117.1.7.1.473')
    dataCreation.addValueSet('2.16.840.1.113883.3.117.1.7.1.424')
    dataCreation.addValueSet('2.16.840.1.113762.1.4.1111.143')
    dataCreation.addValueSet('2.16.840.1.113762.1.4.1')
    dataCreation.addValueSet('2.16.840.1.113883.3.117.1.7.1.309')
    dataCreation.addValueSet('2.16.840.1.113883.3.117.1.7.1.93')
    dataCreation.addValueSet('2.16.840.1.114222.4.11.3591')
    dataCreation.addValueSet('2.16.840.1.114222.4.11.836')
    dataCreation.addValueSet('2.16.840.1.113762.1.4.1110.39')

    // Codes

    cy.get(measureComposer.valueSets).click()

    helper.verifySpinnerAppearsAndDissappears()

    dataCreation.addCode('CODE:/CodeSystem/LOINC/Version/2.46/Code/21112-8/Info')

    // Definition

    cy.get(measureComposer.definition).click()

    helper.verifySpinnerAppearsAndDissappears()

    dataCreation.addDefinition('Initial Population', 'TJC."Encounter with Principal Diagnosis and Age"')
    dataCreation.addDefinition('Denominator', 'TJC."Ischemic Stroke Encounter"')

    dataCreation.addDefinition('Denominator Exception', '"Encounter With No Antithrombotic At Discharge"\n' +
      '\tunion "Encounter With Ticagrelor at Discharge"')

    dataCreation.addDefinition('Denominator Exclusion', 'TJC."Ischemic Stroke Encounters with Discharge Disposition"\n' +
      '\tunion TJC."Comfort Measures during Hospitalization"')

    dataCreation.addDefinition('Antithrombotic Not Given at Discharge', '["MedicationRequest": medication in "Antithrombotic Therapy"] NoAntithromboticDischarge\n' +
      '\twhere NoAntithromboticDischarge.doNotPerform is true\n' +
      '\tand ( NoAntithromboticDischarge.reasonCode in "Medical Reason"\n' +
      '\tor NoAntithromboticDischarge.reasonCode in "Patient Refusal"\n' +
      ')\n' +
      '//Note: expressed as an or with equivalence semantics pending resolution of potential CQL issue.\n' +
      'and exists ( NoAntithromboticDischarge.category C\n' +
      '\twhere FHIRHelpers.ToConcept ( C ) ~ Global."Community"\n' +
      '\tor FHIRHelpers.ToConcept ( C ) ~ Global."Discharge"\n' +
      ')\n' +
      'and NoAntithromboticDischarge.status = \'completed\'\n' +
      'and NoAntithromboticDischarge.intent = \'order\'\n')

    dataCreation.addDefinition('Numerator', 'TJC."Ischemic Stroke Encounter" IschemicStrokeEncounter\n' +
      '\twith "Antithrombotic Therapy at Discharge" DischargeAntithrombotic\n' +
      '\tsuch that DischargeAntithrombotic.authoredOn during Global."Normalize Interval"( IschemicStrokeEncounter.period )')

    dataCreation.addDefinition('Antithrombotic Therapy at Discharge', '["MedicationRequest": medication in "Antithrombotic Therapy"] Antithrombotic\n' +
      '//Note: expressed as an or with equivalence semantics pending resolution of potential CQL issue.\n' +
      'where exists ( Antithrombotic.category C\n' +
      'where FHIRHelpers.ToConcept ( C ) ~ Global."Community"\n' +
      '\tor FHIRHelpers.ToConcept ( C ) ~ Global."Discharge"\n' +
      ')\n' +
      'and Antithrombotic.status in {{} \'active\', \'completed\' }\n' +
      'and Antithrombotic.intent.value = \'order\'')

    dataCreation.addDefinition('Encounter With No Antithrombotic At Discharge', 'TJC."Ischemic Stroke Encounter" IschemicStrokeEncounter\n' +
      'with "Antithrombotic Not Given at Discharge" NoDischargeAntithrombotic\n' +
      'such that NoDischargeAntithrombotic.authoredOn during IschemicStrokeEncounter.period')

    dataCreation.addDefinition('Encounter With Ticagrelor at Discharge', 'TJC."Ischemic Stroke Encounter" IschemicStrokeEncounter\n' +
      'with "Ticagrelor Therapy at Discharge" DischargeTicagrelor\n' +
      '\tsuch that DischargeTicagrelor.authoredOn during IschemicStrokeEncounter.period')

    dataCreation.addDefinition('Ticagrelor Therapy at Discharge', '["MedicationRequest": medication in TJC."Ticagrelor Therapy"] Ticagrelor\n' +
      '//Note: expressed as an or with equivalence semantics pending resolution of potential CQL issue.\n' +
      'where exists ( Ticagrelor.category C\n' +
      '\twhere FHIRHelpers.ToConcept ( C ) ~ Global."Community"\n' +
      '\tor FHIRHelpers.ToConcept ( C ) ~ Global."Discharge"\n' +
      ')\n' +
      'and Ticagrelor.status in {{} \'active\', \'completed\' }\n' +
      'and Ticagrelor.intent = \'order\'')

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

    cy.get(measureComposer.denominatorExclusionsDefinitionListBox).select('Denominator Exclusion')
    cy.get(measureComposer.denominatorExclusionsSaveBtn).click()

    helper.visibleWithTimeout(measureComposer.warningMessage)
    helper.waitToContainText(measureComposer.warningMessage, 'Changes to Denominator Exclusions have been successfully saved.')

    // Denominator Exceptions
    helper.verifySpinnerAppearsAndDissappears()

    cy.get(measureComposer.denominatorExceptions).click()

    helper.verifySpinnerAppearsAndDissappears()

    cy.get(measureComposer.denominatorExceptionsDefinitionListBox).select('Denominator Exception')
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
