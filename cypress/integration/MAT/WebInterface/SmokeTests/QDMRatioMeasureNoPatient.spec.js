import * as dataCreation from '../../../../support/MAT/MeasureAndCQLLibraryCreation'
import * as login from '../../../../support/MAT/Login'
import * as helper from '../../../../support/helpers'
import * as measurelibrary from '../../../../pom/MAT/WI/MeasureLibrary'
import * as createNewMeasure from '../../../../pom/MAT/WI/CreateNewMeasure'
import * as measureComposer from '../../../../pom/MAT/WI/MeasureComposer'
import { selectModelRadioBtn } from '../../../../pom/MAT/WI/CreateNewMeasure'

//Smoke test for QDM Ratio Measure NOT Patient Based. Create Draft measure and Package

describe('QDM Ratio Measure No Patient', () => {
  beforeEach('Login', () => {
    login.matLogin()
  })
  afterEach('Log Out', () => {
    login.matLogout()
  })
  it('Ratio QDM No Patient, create Draft measure and package', () => {

    helper.verifySpinnerAppearsAndDissappears()

    helper.enabledWithTimeout(measurelibrary.newMeasureButton)
    cy.get(measurelibrary.newMeasureButton).click()

    let measureName = 'QDMRatioNoPatient' + Date.now()

    cy.get(createNewMeasure.measureName).type(measureName, { delay: 50 })
    cy.get(createNewMeasure.selectModelRadioBtn).eq(1).click()
    cy.get(createNewMeasure.cqlLibraryName).type(measureName, { delay: 50 })
    cy.get(createNewMeasure.shortName).type(measureName, { delay: 50 })

    cy.get(createNewMeasure.measureScoringListBox).select('Ratio')
    cy.get(createNewMeasure.patientBasedMeasureListBox).select('No')

    cy.get(createNewMeasure.saveAndContinueBtn).click()
    cy.get(createNewMeasure.confirmationContinueBtn).click()

    helper.verifySpinnerAppearsAndDissappears()

    cy.get(measureComposer.cqlWorkspace).click()

    helper.verifySpinnerAppearsAndDissappears()

    helper.waitToContainText(measureComposer.cqlWorkspaceTitleGeneralInformation, 'General Information')

    //Includes

    cy.get(measureComposer.includes).click()

    helper.waitToContainText(measureComposer.cqlWorkspaceTitleIncludes, 'Includes')

    cy.get(measureComposer.searchInputBox).type('Global', { delay: 50 })
    cy.get(measureComposer.searchBtn).click()
    cy.get(measureComposer.availableLibrariesRow1checkbox).click()
    cy.get(measureComposer.libraryAliasInputBox).type('Global', { delay: 50 })
    cy.get(measureComposer.saveIncludes).click()

    helper.visibleWithTimeout(measureComposer.warningMessage)

    //Value Sets

    dataCreation.addValueSet('2.16.840.1.113883.3.117.1.7.1.292')
    dataCreation.addValueSet('2.16.840.1.113883.3.666.5.307')
    dataCreation.addValueSet('2.16.840.1.113762.1.4.1147.119')
    dataCreation.addValueSet('2.16.840.1.113762.1.4.1147.120')
    dataCreation.addValueSet('2.16.840.1.113762.1.4.1111.143')

    //codes

    dataCreation.addCode('CODE:/CodeSystem/LOINC/Version/2.46/Code/21112-8/Info')

    //Definition

    dataCreation.addDefinition('Denominator', '"Initial Population"')

    dataCreation.addDefinition('Encounters With Falls with Major Injury', 'from\n' +
      '  ["Assessment, Performed": "Inpatient Falls"] DxFall,\n' +
      '  ["Diagnosis": "Major Injuries"] DxMajorInjury,\n' +
      '  "Denominator" EncounterWithQualifyingAge\n' +
      '  where DxFall.relevantDatetime during Global."HospitalizationWithObservation" ( EncounterWithQualifyingAge )\n' +
      '    and DxMajorInjury.prevalencePeriod starts during Global."HospitalizationWithObservation" ' +
      '( EncounterWithQualifyingAge )\n' +
      '    and DxMajorInjury.prevalencePeriod starts on or after DxFall.relevantDatetime\n' +
      '  return EncounterWithQualifyingAge')

    dataCreation.addDefinition('Falls With Major Injury', '["Assessment, Performed": "Inpatient ' +
      'Falls"] DxFall\n' +
      '  with ["Diagnosis": "Major Injuries"] DxMajorInjury\n' +
      '    such that DxMajorInjury.prevalencePeriod starts on or after DxFall.relevantDatetime')

    dataCreation.addDefinition('Initial Population', '"Qualifying Encounters"')

    dataCreation.addDefinition('Numerator', '"Encounters With Falls with Major Injury"')

    dataCreation.addDefinition('Qualifying Encounters', '["Encounter, Performed": ' +
      '"Encounter Inpatient"] InpatientEncounter\n' +
      '  with ["Patient Characteristic Birthdate": "Birth date"] BirthDate\n' +
      '    such that 34 >= 18\n' +
      '  where InpatientEncounter.relevantPeriod ends during "Measurement Period"')

    //Function

    dataCreation.addFunction('Denominator Observation', 'duration in hours of ' +
      'Global.HospitalizationWithObservation ( QualifyingEncounter ) / 24')
    dataCreation.addSingleFunctionArgument('QualifyingEncounter', 'QDM Datatype',
      'Encounter, Performed')

    dataCreation.addFunction('Numerator Observation', 'Count("Falls With Major Injury" Falls\n' +
      '    where Falls.relevantDatetime during Global.HospitalizationWithObservation(QualifyingEncounter)\n' +
      ')')
    dataCreation.addSingleFunctionArgument('QualifyingEncounter', 'QDM Datatype',
      'Encounter, Performed')

    //CQL Library Editor

    cy.get(measureComposer.cqlLibraryEditor).click()

    helper.waitToContainText(measureComposer.cqlWorkspaceTitleCQLLibraryEditor, 'CQL Library Editor')

    helper.visibleWithTimeout(measureComposer.warningMessage)
    helper.waitToContainText(measureComposer.warningMessage, 'You are viewing CQL with no validation errors.')

    cy.get(measureComposer.populationWorkspace).click()

    helper.verifySpinnerAppearsAndDissappears()

    //Initial Population
    cy.get(measureComposer.initialPopulation).click()

    helper.verifySpinnerAppearsAndDissappears()

    cy.get(measureComposer.initialPopulationDefinitionListBox).select('Initial Population')
    cy.get(measureComposer.initialPopulationSaveBtn).click()

    helper.visibleWithTimeout(measureComposer.warningMessage)
    helper.waitToContainText(measureComposer.warningMessage, 'Changes to Initial Populations have been successfully saved.')

    cy.get(measureComposer.initialPopulationAddNew).click()

    cy.get(measureComposer.initialPopulationDefinitionListBox2).select('Qualifying Encounters')

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


    // Measure Observations

    cy.get(measureComposer.measureObservations).click()

    helper.verifySpinnerAppearsAndDissappears()

    cy.get(measureComposer.measureObservationsAggregateFunctionListBox).select('Count')

    cy.get(measureComposer.measureObservationsFunctionListBox).find('option').should('have.length', 3)
    cy.get(measureComposer.measureObservationsFunctionListBox).select('Numerator Observation')

    cy.get(measureComposer.measureObservationsSaveBtn).click()

    helper.verifySpinnerAppearsAndDissappears()

    helper.visibleWithTimeout(measureComposer.warningMessage)
    helper.waitToContainText(measureComposer.warningMessage, 'Changes to Measure Observations have been successfully saved.')

    cy.get(measureComposer.measureObservationsAddNew).click()

    cy.get(measureComposer.measureObservationsAggregateFunctionListBox2).select('Count')

    cy.get(measureComposer.measureObservationsFunctionListBox2).find('option').should('have.length', 3)
    cy.get(measureComposer.measureObservationsFunctionListBox2).select('Denominator Observation')

    cy.get(measureComposer.measureObservationsSaveBtn).click()

    helper.verifySpinnerAppearsAndDissappears()

    helper.visibleWithTimeout(measureComposer.warningMessage)
    helper.waitToContainText(measureComposer.warningMessage, 'Changes to Measure Observations have been successfully saved.')

    //navigate to Measure Packager
    cy.get(measureComposer.measurePackager).click()

    helper.verifySpinnerAppearsAndDissappears()

    //verifying the the Population Workspace data is viewable in the Populations list in Measure Packager
    cy.get(measureComposer.populationsListItems).its('length').should('equal', 6)

    cy.get(measureComposer.populationsListItems).eq(0).should('contain.text', 'Initial Population 1')
    cy.get(measureComposer.populationsListItems).eq(1).should('contain.text', 'Initial Population 2')
    cy.get(measureComposer.populationsListItems).eq(2).should('contain.text', 'Denominator 1')
    cy.get(measureComposer.populationsListItems).eq(3).should('contain.text', 'Numerator 1')
    cy.get(measureComposer.populationsListItems).eq(4).should('contain.text', 'Measure Observation 1')
    cy.get(measureComposer.populationsListItems).eq(5).should('contain.text', 'Measure Observation 2')

    //Package Grouping
    cy.get(measureComposer.addAllItemsToGrouping).click()

    //Add Associations and Score Unit

    cy.get(measureComposer.scoreUnitUcumInputBox).type('[ly]')

    cy.get(measureComposer.associationMeasureObservation1).find('option').should('have.length', 3)
    cy.get(measureComposer.associationMeasureObservation1).select('Numerator 1')

    cy.get(measureComposer.associationMeasureObservation2).find('option').should('have.length', 3)
    cy.get(measureComposer.associationMeasureObservation2).select('Denominator 1')

    cy.get(measureComposer.groupingAssociationDenominatorSelect).select('Initial Population 1')
    cy.get(measureComposer.groupingAssociationNumeratorSelect).select('Initial Population 2')

    cy.get(measureComposer.saveGrouping).click()

    cy.get(measureComposer.measureGroupingTable).should('contain.text', 'Measure Grouping 1')

    //Create Measure Package
    cy.get(measureComposer.createMeasurePackageBtn).click()

    helper.verifySpinnerAppearsAndDissappears()
    helper.verifySpinnerAppearsAndDissappears()
    helper.verifySpinnerAppearsAndDissappears()

    helper.visibleWithTimeout(measureComposer.packageWarningMessage)
    helper.waitToContainText(measureComposer.packageWarningMessage, 'Measure packaged successfully. Please access the Measure Library to export the measure.')

  })
})
