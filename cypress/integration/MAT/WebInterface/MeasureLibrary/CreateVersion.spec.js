import * as helper from '../../../../support/helpers'
import * as measurelibrary from '../../../../pom/MAT/WI/MeasureLibrary'
import * as measureComposer from '../../../../pom/MAT/WI/MeasureComposer'
import * as dataCreation from '../../../../support/MAT/MeasureAndCQLLibraryCreation'
import * as gridRowActions from '../../../../support/MAT/GridRowActions'
import * as cqlComposer from '../../../../pom/MAT/WI/CQLComposer'
import * as login from '../../../../support/MAT/Login'

let name = ''
let name2 = ''

describe('Measure Library: Create Version', () => {
  beforeEach('Login', () => {
    login.matLogin()
  })
  afterEach('Log Out', () => {
    login.matLogout()
  })
  it('QDM: Create Major Version with Successful Package, Proportion Measure', () => {

    name = dataCreation.createQDMProportionMeasure()

    helper.verifySpinnerAppearsAndDissappears()

    helper.enabledWithTimeout(measurelibrary.searchInputBox)
    helper.enterText(measurelibrary.searchInputBox, name)
    cy.get(measurelibrary.searchBtn).click()

    helper.verifySpinnerAppearsAndDissappears()

    gridRowActions.selectRow(measurelibrary.row1MeasureSearch)

    cy.get(measurelibrary.createVersionMeasureSearchBtn).click()

    cy.get(measurelibrary.majorVersionTypeRadio).click()
    cy.get(measurelibrary.packageAndVersion).click()

    helper.verifySpinnerAppearsAndDissappears()
    helper.verifySpinnerAppearsAndDissappears()

    helper.waitToHaveText(measurelibrary.warningMessage, ' ' + name + ' has been successfully packaged and v1.0.000 has been successfully created.', 120000)

    //Comparing CQL Library Version Number with Draft Version for QDM Measure
    helper.verifySpinnerAppearsAndDissappears()

    helper.enabledWithTimeout(measurelibrary.searchInputBox)
    helper.enterText(measurelibrary.searchInputBox, name)
    cy.get(measurelibrary.searchBtn).click()

    helper.verifySpinnerAppearsAndDissappears()
    gridRowActions.doubleClickRow(measurelibrary.row1MeasureSearch)
    cy.get(measureComposer.cqlWorkspace).click()

    helper.verifySpinnerAppearsAndDissappears()

    cy.get(cqlComposer.cqlLibraryVersionField).should('contain.value', '1.0')

  })

  it('QDM: Create Major Version with Successful Package, Proportion Measure, Unused Included CQL Library', () => {

    name2 = dataCreation.createQDMProportionMeasure()

    helper.verifySpinnerAppearsAndDissappears()

    helper.enabledWithTimeout(measurelibrary.searchInputBox)
    helper.enterText(measurelibrary.searchInputBox, name2)
    cy.get(measurelibrary.searchBtn).click()

    helper.verifySpinnerAppearsAndDissappears()

    gridRowActions.doubleClickRow(measurelibrary.row1MeasureSearch)

    cy.get(measureComposer.cqlWorkspace).click()

    helper.verifySpinnerAppearsAndDissappears()

    //removing the only definition ref for global CQL Library
    cy.get(measureComposer.definition).click()
    helper.waitToContainText(measureComposer.cqlWorkspaceTitleGlobal2, 'Definition')
    cy.get(measureComposer.definitionLeftList).select('ED Visit')
    cy.get(measureComposer.definitionLeftListOptions).eq(2).dblclick()
    helper.verifySpinnerAppearsAndDissappears()
    helper.verifySpinnerAppearsAndDissappears()
    cy.get(measureComposer.definitionDeleteBtn).click()
    cy.get(measureComposer.deleteConfirmationYes).click()

    helper.verifySpinnerAppearsAndDissappears()

    cy.get(measurelibrary.measureLibraryTab).click()

    helper.verifySpinnerAppearsAndDissappears()

    helper.visibleWithTimeout(measurelibrary.row1RecentActivity)
    gridRowActions.selectRow(measurelibrary.row1RecentActivity)

    cy.get(measurelibrary.createVersionRecentActivityBtn).click()
    cy.get(measurelibrary.majorVersionTypeRadio).click()
    cy.get(measurelibrary.packageAndVersion).click()

    helper.verifySpinnerAppearsAndDissappears()
    helper.verifySpinnerAppearsAndDissappears()

    helper.waitToContainText(measurelibrary.warningMessageText, 'You have included libraries ' +
      'that are unused. In order to version ' + name2 + ', these must be removed. Select Continue to have the MAT remove' +
      ' these included libraries or Cancel to stop the version process.')

    cy.get(measurelibrary.continueBtn).click()

    helper.verifySpinnerAppearsAndDissappears()

    helper.waitToHaveText(measurelibrary.warningMessage, ' ' + name2 + ' has been successfully packaged and v1.0.000 has been successfully created.')

  })

  it('FHIR: Create Major Version with Successful Package, Proportion Measure', () => {

    name = dataCreation.createDraftMeasure('FHIRMeasure','FHIR')

    helper.verifySpinnerAppearsAndDissappears()

    helper.enabledWithTimeout(measurelibrary.searchInputBox)
    helper.enterText(measurelibrary.searchInputBox, name)
    cy.get(measurelibrary.searchBtn).click()

    helper.verifySpinnerAppearsAndDissappears()

    gridRowActions.doubleClickRow(measurelibrary.row1MeasureSearch)

    helper.verifySpinnerAppearsAndDissappears()

    cy.get(measureComposer.cqlWorkspace).click()

    helper.verifySpinnerAppearsAndDissappears()

    dataCreation.addDefinition('Initial Population', 'AgeInYearsAt(start of "Measurement Period")> 12')
    dataCreation.addDefinition('Denominator', 'true')
    dataCreation.addDefinition('Numerator', 'true')
    dataCreation.addDefinition('ED Visit', 'Global."ED Encounter"')
    dataCreation.addDefinition('Birthday', 'FHIRHelpers.ToDate(Patient.birthDate)')

    helper.verifySpinnerAppearsAndDissappears()

    // CQL Library Editor

    cy.get(measureComposer.cqlLibraryEditor).click()

    helper.waitToContainText(measureComposer.cqlWorkspaceTitleCQLLibraryEditor, 'CQL Library Editor')

    helper.visibleWithTimeout(measureComposer.warningMessage)
    helper.waitToContainText(measureComposer.warningMessage, 'You are viewing CQL with no validation errors.')


    cy.get(measureComposer.populationWorkspace).click()

    helper.verifySpinnerAppearsAndDissappears()

    cy.get(measureComposer.initialPopulation).click()

    helper.verifySpinnerAppearsAndDissappears()

    cy.get(measureComposer.initialPopulationDefinitionListBox).select('Initial Population')
    cy.get(measureComposer.initialPopulationSaveBtn).click()

    helper.visibleWithTimeout(measureComposer.warningMessage)
    helper.waitToContainText(measureComposer.warningMessage, 'Changes to Initial Populations have been successfully saved.')

    cy.get(measureComposer.denominator).click()

    helper.verifySpinnerAppearsAndDissappears()

    cy.get(measureComposer.denominatorDefinitionListBox).select('Denominator')
    cy.get(measureComposer.denominatorSaveBtn).click()

    helper.visibleWithTimeout(measureComposer.warningMessage)
    helper.waitToContainText(measureComposer.warningMessage, 'Changes to Denominators have been successfully saved.')

    cy.get(measureComposer.numerator).click()

    helper.verifySpinnerAppearsAndDissappears()

    cy.get(measureComposer.numeratorDefinitionListBox).select('Numerator')
    cy.get(measureComposer.numeratorSaveBtn).click()

    helper.visibleWithTimeout(measureComposer.warningMessage)
    helper.waitToContainText(measureComposer.warningMessage, 'Changes to Numerators have been successfully saved.')

    // navigate to Measure Packager
    cy.get(measureComposer.measurePackager).click()

    helper.verifySpinnerAppearsAndDissappears()

    // verifying the the Population Workspace data is viewable in the Populations list in Measure Packager
    cy.get(measureComposer.populationsListItems).its('length').should('equal', 3)

    cy.get(measureComposer.populationsListItems).eq(0).should('contain.text', 'Initial Population 1')
    cy.get(measureComposer.populationsListItems).eq(1).should('contain.text', 'Denominator 1')
    cy.get(measureComposer.populationsListItems).eq(2).should('contain.text', 'Numerator 1')

    // Package Grouping
    cy.get(measureComposer.addAllItemsToGrouping).click()
    cy.get(measureComposer.saveGrouping).click()

    helper.verifySpinnerAppearsAndDissappears()

    cy.get(measureComposer.measureGroupingTable).should('contain.text', 'Measure Grouping 1')

    cy.get(measurelibrary.measureLibraryTab).click()

    helper.verifySpinnerAppearsAndDissappears()

    gridRowActions.selectRow(measurelibrary.row1MeasureSearch)

    cy.get(measurelibrary.createVersionMeasureSearchBtn).click()

    cy.get(measurelibrary.majorVersionTypeRadio).click()
    cy.get(measurelibrary.packageAndVersion).click()

    helper.verifySpinnerAppearsAndDissappears()
    helper.verifySpinnerAppearsAndDissappears()

    helper.waitToHaveText(measurelibrary.warningMessage, ' ' + name + ' has been successfully packaged and v1.0.000 ' +
      'has been successfully created.', 120000)

    //Comparing CQL Library Version Number with Draft Version for FHIR Measure
    helper.verifySpinnerAppearsAndDissappears()

    helper.enabledWithTimeout(measurelibrary.searchInputBox)
    helper.enterText(measurelibrary.searchInputBox, name)
    cy.get(measurelibrary.searchBtn).click()

    helper.verifySpinnerAppearsAndDissappears()
    gridRowActions.doubleClickRow(measurelibrary.row1MeasureSearch)
    cy.get(measureComposer.cqlWorkspace).click()

    helper.verifySpinnerAppearsAndDissappears()

    cy.get(cqlComposer.cqlLibraryVersionField).should('contain.value', '1.0')
  })

  it('FHIR: Create Major Version with Successful Package, Proportion Measure, Unused Included CQL Library', () => {

    createFHIRProportionMeasureUnusedLibraryPackageGroupVersion()

    cy.get(measurelibrary.warningKeepBtn).click()

    helper.verifySpinnerAppearsAndDissappears()

    helper.waitToHaveText(measurelibrary.warningMessage, ' ' + name + ' has been successfully packaged and ' +
      'v1.0.000 has been successfully created.')

    gridRowActions.doubleClickRow(measurelibrary.row1RecentActivity)

    helper.verifySpinnerAppearsAndDissappears()

    cy.get(measureComposer.cqlWorkspace).click()

    helper.verifySpinnerAppearsAndDissappears()

    helper.waitToContainText(measureComposer.includesNumber, '3')
  })

  it('FHIR: Create Major Version with Successful Package, Proportion Measure, Unused Value Set', () => {

    createFHIRProportionMeasureUnusedValueSetPackageGroupVersion()

    cy.get(measurelibrary.warningKeepBtn).click()

    helper.verifySpinnerAppearsAndDissappears()

    helper.waitToHaveText(measurelibrary.warningMessage, ' ' + name + ' has been successfully packaged and ' +
      'v1.0.000 has been successfully created.')

    gridRowActions.doubleClickRow(measurelibrary.row1RecentActivity)

    helper.verifySpinnerAppearsAndDissappears()

    cy.get(measureComposer.cqlWorkspace).click()

    helper.verifySpinnerAppearsAndDissappears()

    helper.waitToContainText(measureComposer.valueSetsNumber, '1')
  })

  it('FHIR: Create Major Version with Successful Package, Proportion Measure, Unused Code', () => {

    createFHIRProportionMeasureUnusedCodePackageGroupVersion()

    cy.get(measurelibrary.warningKeepBtn).click()

    helper.verifySpinnerAppearsAndDissappears()

    helper.waitToHaveText(measurelibrary.warningMessage, ' ' + name + ' has been successfully packaged and ' +
      'v1.0.000 has been successfully created.')

    gridRowActions.doubleClickRow(measurelibrary.row1RecentActivity)

    helper.verifySpinnerAppearsAndDissappears()

    cy.get(measureComposer.cqlWorkspace).click()

    helper.verifySpinnerAppearsAndDissappears()

    helper.waitToContainText(measureComposer.codesNumber, '1')
  })
  it('FHIR: Create Major Version with Successful Package, Proportion Measure, Unused Included CQL Library Removed', () => {

    createFHIRProportionMeasureUnusedLibraryPackageGroupVersion()

    cy.get(measurelibrary.continueBtn).click()

    helper.verifySpinnerAppearsAndDissappears()

    helper.waitToHaveText(measurelibrary.warningMessage, ' ' + name + ' has been successfully packaged and ' +
      'v1.0.000 has been successfully created.')

    gridRowActions.doubleClickRow(measurelibrary.row1RecentActivity)

    helper.verifySpinnerAppearsAndDissappears()

    cy.get(measureComposer.cqlWorkspace).click()

    helper.verifySpinnerAppearsAndDissappears()

    helper.waitToContainText(measureComposer.includesNumber, '2')
  })

  it('FHIR: Create Major Version with Successful Package, Proportion Measure, Unused Value Set Removed', () => {

    createFHIRProportionMeasureUnusedValueSetPackageGroupVersion()

    cy.get(measurelibrary.continueBtn).click()

    helper.verifySpinnerAppearsAndDissappears()

    helper.waitToHaveText(measurelibrary.warningMessage, ' ' + name + ' has been successfully packaged and ' +
      'v1.0.000 has been successfully created.')

    gridRowActions.doubleClickRow(measurelibrary.row1RecentActivity)

    helper.verifySpinnerAppearsAndDissappears()

    cy.get(measureComposer.cqlWorkspace).click()

    helper.verifySpinnerAppearsAndDissappears()

    helper.waitToContainText(measureComposer.valueSetsNumber, '0')
  })

  it('FHIR: Create Major Version with Successful Package, Proportion Measure, Unused Code Removed', () => {

    createFHIRProportionMeasureUnusedCodePackageGroupVersion()

    cy.get(measurelibrary.continueBtn).click()

    helper.verifySpinnerAppearsAndDissappears()

    helper.waitToHaveText(measurelibrary.warningMessage, ' ' + name + ' has been successfully packaged and ' +
      'v1.0.000 has been successfully created.')

    gridRowActions.doubleClickRow(measurelibrary.row1RecentActivity)

    helper.verifySpinnerAppearsAndDissappears()

    cy.get(measureComposer.cqlWorkspace).click()

    helper.verifySpinnerAppearsAndDissappears()

    helper.waitToContainText(measureComposer.codesNumber, '0')
  })
})


function createFHIRProportionMeasureUnusedLibraryPackageGroupVersion () {
  name = dataCreation.createDraftMeasure('FHIRMeasure','FHIR')

  helper.verifySpinnerAppearsAndDissappears()

  helper.enabledWithTimeout(measurelibrary.searchInputBox)
  helper.enterText(measurelibrary.searchInputBox, name)
  cy.get(measurelibrary.searchBtn).click()

  helper.verifySpinnerAppearsAndDissappears()

  gridRowActions.doubleClickRow(measurelibrary.row1MeasureSearch)

  helper.verifySpinnerAppearsAndDissappears()

  cy.get(measureComposer.cqlWorkspace).click()

  helper.verifySpinnerAppearsAndDissappears()

  dataCreation.addDefinition('Initial Population', 'AgeInYearsAt(start of "Measurement Period")> 12')
  dataCreation.addDefinition('Denominator', 'true')
  dataCreation.addDefinition('Numerator', 'true')
  dataCreation.addDefinition('Birthday', 'FHIRHelpers.ToDate(Patient.birthDate)')

  helper.verifySpinnerAppearsAndDissappears()

  // CQL Library Editor

  cy.get(measureComposer.cqlLibraryEditor).click()

  helper.waitToContainText(measureComposer.cqlWorkspaceTitleCQLLibraryEditor, 'CQL Library Editor')

  helper.visibleWithTimeout(measureComposer.warningMessage)
  helper.waitToContainText(measureComposer.warningMessage, 'You are viewing CQL with no validation errors.')


  cy.get(measureComposer.populationWorkspace).click()

  helper.verifySpinnerAppearsAndDissappears()

  cy.get(measureComposer.initialPopulation).click()

  helper.verifySpinnerAppearsAndDissappears()

  cy.get(measureComposer.initialPopulationDefinitionListBox).select('Initial Population')
  cy.get(measureComposer.initialPopulationSaveBtn).click()

  helper.visibleWithTimeout(measureComposer.warningMessage)
  helper.waitToContainText(measureComposer.warningMessage, 'Changes to Initial Populations have been successfully saved.')

  cy.get(measureComposer.denominator).click()

  helper.verifySpinnerAppearsAndDissappears()

  cy.get(measureComposer.denominatorDefinitionListBox).select('Denominator')
  cy.get(measureComposer.denominatorSaveBtn).click()

  helper.visibleWithTimeout(measureComposer.warningMessage)
  helper.waitToContainText(measureComposer.warningMessage, 'Changes to Denominators have been successfully saved.')

  cy.get(measureComposer.numerator).click()

  helper.verifySpinnerAppearsAndDissappears()

  cy.get(measureComposer.numeratorDefinitionListBox).select('Numerator')
  cy.get(measureComposer.numeratorSaveBtn).click()

  helper.visibleWithTimeout(measureComposer.warningMessage)
  helper.waitToContainText(measureComposer.warningMessage, 'Changes to Numerators have been successfully saved.')

  // navigate to Measure Packager
  cy.get(measureComposer.measurePackager).click()

  helper.verifySpinnerAppearsAndDissappears()

  // verifying the the Population Workspace data is viewable in the Populations list in Measure Packager
  cy.get(measureComposer.populationsListItems).its('length').should('equal', 3)

  cy.get(measureComposer.populationsListItems).eq(0).should('contain.text', 'Initial Population 1')
  cy.get(measureComposer.populationsListItems).eq(1).should('contain.text', 'Denominator 1')
  cy.get(measureComposer.populationsListItems).eq(2).should('contain.text', 'Numerator 1')

  // Package Grouping
  cy.get(measureComposer.addAllItemsToGrouping).click()
  cy.get(measureComposer.saveGrouping).click()

  helper.verifySpinnerAppearsAndDissappears()

  cy.get(measureComposer.measureGroupingTable).should('contain.text', 'Measure Grouping 1')

  cy.get(measurelibrary.measureLibraryTab).click()

  helper.verifySpinnerAppearsAndDissappears()

  gridRowActions.selectRow(measurelibrary.row1MeasureSearch)

  cy.get(measurelibrary.createVersionMeasureSearchBtn).click()

  cy.get(measurelibrary.majorVersionTypeRadio).click()
  cy.get(measurelibrary.packageAndVersion).click()

  helper.verifySpinnerAppearsAndDissappears()
  helper.verifySpinnerAppearsAndDissappears()

  helper.waitToContainText(measurelibrary.warningMessageText, 'There are included libraries, codes or value sets ' +
    'that are unused in measure ' + name + '.')

  helper.waitToContainText(measurelibrary.warningMessageText, 'Select Continue to have the MAT remove these ' +
    'unused elements, Keep to retain the unused elements or Cancel to ' +
    'stop the version process.')
}

function createFHIRProportionMeasureUnusedValueSetPackageGroupVersion () {
  name = dataCreation.createDraftMeasure('FHIRMeasure','FHIR')

  helper.verifySpinnerAppearsAndDissappears()

  helper.enabledWithTimeout(measurelibrary.searchInputBox)
  helper.enterText(measurelibrary.searchInputBox, name)
  cy.get(measurelibrary.searchBtn).click()

  helper.verifySpinnerAppearsAndDissappears()

  gridRowActions.doubleClickRow(measurelibrary.row1MeasureSearch)

  helper.verifySpinnerAppearsAndDissappears()

  cy.get(measureComposer.cqlWorkspace).click()

  //adding Value set that is not Used
  dataCreation.addValueSet('2.16.840.1.113883.3.117.1.7.1.299')

  helper.verifySpinnerAppearsAndDissappears()


  //adding definitions
  dataCreation.addDefinition('Initial Population', 'AgeInYearsAt(start of "Measurement Period")> 12')
  dataCreation.addDefinition('Denominator', 'true')
  dataCreation.addDefinition('Numerator', 'true')
  dataCreation.addDefinition('ED Visit', 'Global."ED Encounter"')
  dataCreation.addDefinition('Birthday', 'FHIRHelpers.ToDate(Patient.birthDate)')

  helper.verifySpinnerAppearsAndDissappears()

  // CQL Library Editor

  cy.get(measureComposer.cqlLibraryEditor).click()

  helper.waitToContainText(measureComposer.cqlWorkspaceTitleCQLLibraryEditor, 'CQL Library Editor')

  helper.visibleWithTimeout(measureComposer.warningMessage)
  helper.waitToContainText(measureComposer.warningMessage, 'You are viewing CQL with no validation errors.')


  cy.get(measureComposer.populationWorkspace).click()

  helper.verifySpinnerAppearsAndDissappears()

  cy.get(measureComposer.initialPopulation).click()

  helper.verifySpinnerAppearsAndDissappears()

  cy.get(measureComposer.initialPopulationDefinitionListBox).select('Initial Population')
  cy.get(measureComposer.initialPopulationSaveBtn).click()

  helper.visibleWithTimeout(measureComposer.warningMessage)
  helper.waitToContainText(measureComposer.warningMessage, 'Changes to Initial Populations have been successfully saved.')

  cy.get(measureComposer.denominator).click()

  helper.verifySpinnerAppearsAndDissappears()

  cy.get(measureComposer.denominatorDefinitionListBox).select('Denominator')
  cy.get(measureComposer.denominatorSaveBtn).click()

  helper.visibleWithTimeout(measureComposer.warningMessage)
  helper.waitToContainText(measureComposer.warningMessage, 'Changes to Denominators have been successfully saved.')

  cy.get(measureComposer.numerator).click()

  helper.verifySpinnerAppearsAndDissappears()

  cy.get(measureComposer.numeratorDefinitionListBox).select('Numerator')
  cy.get(measureComposer.numeratorSaveBtn).click()

  helper.visibleWithTimeout(measureComposer.warningMessage)
  helper.waitToContainText(measureComposer.warningMessage, 'Changes to Numerators have been successfully saved.')

  // navigate to Measure Packager
  cy.get(measureComposer.measurePackager).click()

  helper.verifySpinnerAppearsAndDissappears()

  // verifying the the Population Workspace data is viewable in the Populations list in Measure Packager
  cy.get(measureComposer.populationsListItems).its('length').should('equal', 3)

  cy.get(measureComposer.populationsListItems).eq(0).should('contain.text', 'Initial Population 1')
  cy.get(measureComposer.populationsListItems).eq(1).should('contain.text', 'Denominator 1')
  cy.get(measureComposer.populationsListItems).eq(2).should('contain.text', 'Numerator 1')

  // Package Grouping
  cy.get(measureComposer.addAllItemsToGrouping).click()
  cy.get(measureComposer.saveGrouping).click()

  helper.verifySpinnerAppearsAndDissappears()

  cy.get(measureComposer.measureGroupingTable).should('contain.text', 'Measure Grouping 1')

  cy.get(measurelibrary.measureLibraryTab).click()

  helper.verifySpinnerAppearsAndDissappears()

  gridRowActions.selectRow(measurelibrary.row1MeasureSearch)

  cy.get(measurelibrary.createVersionMeasureSearchBtn).click()

  cy.get(measurelibrary.majorVersionTypeRadio).click()
  cy.get(measurelibrary.packageAndVersion).click()

  helper.verifySpinnerAppearsAndDissappears()
  helper.verifySpinnerAppearsAndDissappears()

  helper.waitToContainText(measurelibrary.warningMessageText, 'There are included libraries, codes or value sets ' +
    'that are unused in measure ' + name + '.')

  helper.waitToContainText(measurelibrary.warningMessageText, 'Select Continue to have the MAT remove these ' +
    'unused elements, Keep to retain the unused elements or Cancel to ' +
    'stop the version process.')
}

function createFHIRProportionMeasureUnusedCodePackageGroupVersion () {
  name = dataCreation.createDraftMeasure('FHIRMeasure','FHIR')

  helper.verifySpinnerAppearsAndDissappears()

  helper.enabledWithTimeout(measurelibrary.searchInputBox)
  helper.enterText(measurelibrary.searchInputBox, name)
  cy.get(measurelibrary.searchBtn).click()

  helper.verifySpinnerAppearsAndDissappears()

  gridRowActions.doubleClickRow(measurelibrary.row1MeasureSearch)

  helper.verifySpinnerAppearsAndDissappears()

  cy.get(measureComposer.cqlWorkspace).click()

  //adding Code that is not Used
  dataCreation.addCode('CODE:/CodeSystem/LOINC/Version/2.46/Code/21112-8/Info')

  helper.verifySpinnerAppearsAndDissappears()

  //adding definitions
  dataCreation.addDefinition('Initial Population', 'AgeInYearsAt(start of "Measurement Period")> 12')
  dataCreation.addDefinition('Denominator', 'true')
  dataCreation.addDefinition('Numerator', 'true')
  dataCreation.addDefinition('ED Visit', 'Global."ED Encounter"')
  dataCreation.addDefinition('Birthday', 'FHIRHelpers.ToDate(Patient.birthDate)')

  helper.verifySpinnerAppearsAndDissappears()

  // CQL Library Editor

  cy.get(measureComposer.cqlLibraryEditor).click()

  helper.waitToContainText(measureComposer.cqlWorkspaceTitleCQLLibraryEditor, 'CQL Library Editor')

  helper.visibleWithTimeout(measureComposer.warningMessage)
  helper.waitToContainText(measureComposer.warningMessage, 'You are viewing CQL with no validation errors.')

  cy.get(measureComposer.populationWorkspace).click()

  helper.verifySpinnerAppearsAndDissappears()

  cy.get(measureComposer.initialPopulation).click()

  helper.verifySpinnerAppearsAndDissappears()

  cy.get(measureComposer.initialPopulationDefinitionListBox).select('Initial Population')
  cy.get(measureComposer.initialPopulationSaveBtn).click()

  helper.visibleWithTimeout(measureComposer.warningMessage)
  helper.waitToContainText(measureComposer.warningMessage, 'Changes to Initial Populations have been successfully saved.')

  cy.get(measureComposer.denominator).click()

  helper.verifySpinnerAppearsAndDissappears()

  cy.get(measureComposer.denominatorDefinitionListBox).select('Denominator')
  cy.get(measureComposer.denominatorSaveBtn).click()

  helper.visibleWithTimeout(measureComposer.warningMessage)
  helper.waitToContainText(measureComposer.warningMessage, 'Changes to Denominators have been successfully saved.')

  cy.get(measureComposer.numerator).click()

  helper.verifySpinnerAppearsAndDissappears()

  cy.get(measureComposer.numeratorDefinitionListBox).select('Numerator')
  cy.get(measureComposer.numeratorSaveBtn).click()

  helper.visibleWithTimeout(measureComposer.warningMessage)
  helper.waitToContainText(measureComposer.warningMessage, 'Changes to Numerators have been successfully saved.')

  // navigate to Measure Packager
  cy.get(measureComposer.measurePackager).click()

  helper.verifySpinnerAppearsAndDissappears()

  // verifying the the Population Workspace data is viewable in the Populations list in Measure Packager
  cy.get(measureComposer.populationsListItems).its('length').should('equal', 3)

  cy.get(measureComposer.populationsListItems).eq(0).should('contain.text', 'Initial Population 1')
  cy.get(measureComposer.populationsListItems).eq(1).should('contain.text', 'Denominator 1')
  cy.get(measureComposer.populationsListItems).eq(2).should('contain.text', 'Numerator 1')

  // Package Grouping
  cy.get(measureComposer.addAllItemsToGrouping).click()
  cy.get(measureComposer.saveGrouping).click()

  helper.verifySpinnerAppearsAndDissappears()

  cy.get(measureComposer.measureGroupingTable).should('contain.text', 'Measure Grouping 1')

  cy.get(measurelibrary.measureLibraryTab).click()

  helper.verifySpinnerAppearsAndDissappears()

  gridRowActions.selectRow(measurelibrary.row1MeasureSearch)

  cy.get(measurelibrary.createVersionMeasureSearchBtn).click()

  cy.get(measurelibrary.majorVersionTypeRadio).click()
  cy.get(measurelibrary.packageAndVersion).click()

  helper.verifySpinnerAppearsAndDissappears()
  helper.verifySpinnerAppearsAndDissappears()

  helper.waitToContainText(measurelibrary.warningMessageText, 'There are included libraries, codes or value sets ' +
    'that are unused in measure ' + name + '.')

  helper.waitToContainText(measurelibrary.warningMessageText, 'Select Continue to have the MAT remove these ' +
    'unused elements, Keep to retain the unused elements or Cancel to ' +
    'stop the version process.')
}
