import * as helper from '../helpers'
import * as measurelibrary from '../../pom/MAT/WI/MeasureLibrary'
import * as createNewMeasure from '../../pom/MAT/WI/CreateNewMeasure'
import * as measureComposer from '../../pom/MAT/WI/MeasureComposer'
import * as cqlLibrary from '../../pom/MAT/WI/CqlLibrary'
import * as createNewCqlLibrary from '../../pom/MAT/WI/CreateNewCQLLibrary'
import * as cqlComposer from '../../pom/MAT/WI/CQLComposer'
import * as measureDetails from '../../pom/MAT/WI/MeasureDetails'
import * as gridRowActions from './GridRowActions'
import * as login from './Login'
import { selectModelRadioBtn } from '../../pom/MAT/WI/CreateNewMeasure'
import { selectLibraryModelRadioBtn } from '../../pom/MAT/WI/CreateNewCQLLibrary'

const draftMeasure = 'DraftMeasure'

export const loginCreateVersionedMeasureNotOwnerLogout = () => {
  login.matLogin('alternative')

  const name = createMajorVersionMeasure()

  login.matLogout()

  return name
}

export const loginCreateDraftCqlLibraryNotOwnerLogout = () => {
  login.matLogin('alternative')

  const name = createDraftCqlLibrary()

  login.matLogout()

  return name
}

// create Cohort Fhir measure and package

export const createFhirCohortMeasure = () => {
  cy.get(measurelibrary.newMeasureButton).click()
  const measureName = 'CreateFhirCohortMeasure' + Date.now()

  cy.get(createNewMeasure.measureName).type(measureName, { delay: 50 })
  cy.get(createNewMeasure.selectModelRadioBtn).eq(0).click()
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

  // Includes

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

  // Value Sets

  cy.get(measureComposer.valueSets).click()

  helper.verifySpinnerAppearsAndDissappears()

  addValueSet('2.16.840.1.113883.3.666.5.307')
  addValueSet('2.16.840.1.113762.1.4.1182.118')
  addValueSet('2.16.840.1.113762.1.4.1111.161')

  // Codes

  cy.get(measureComposer.valueSets).click()

  helper.verifySpinnerAppearsAndDissappears()

  addCode('CODE:/CodeSystem/LOINC/Version/2.46/Code/21112-8/Info')
  addCode('CODE:/CodeSystem/SNOMEDCT/Version/2016-03/Code/419099009/Info')
  addCode('CODE:/CodeSystem/SNOMEDCT/Version/2017-09/Code/371828006/Info')

  // Definition

  cy.get(measureComposer.definition).click()

  helper.verifySpinnerAppearsAndDissappears()

  addDefinition('Initial Population', 'TJC."Non Elective Inpatient Encounter"')

  // CQL Library Editor

  cy.get(measureComposer.cqlLibraryEditor).click()

  helper.waitToContainText(measureComposer.cqlWorkspaceTitleCQLLibraryEditor, 'CQL Library Editor')

  helper.visibleWithTimeout(measureComposer.warningMessage)
  helper.waitToContainText(measureComposer.warningMessage, 'You are viewing CQL with no validation errors.')

  cy.wait(2000)

  // Population Workspace

  cy.get(measureComposer.populationWorkspace).click()

  helper.verifySpinnerAppearsAndDissappears()

  cy.get(measureComposer.initialPopulation).click()

  helper.verifySpinnerAppearsAndDissappears()

  cy.get(measureComposer.initialPopulationDefinitionListBox).select('Initial Population')
  cy.get(measureComposer.initialPopulationSaveBtn).click()

  helper.visibleWithTimeout(measureComposer.warningMessage)
  helper.waitToContainText(measureComposer.warningMessage, 'Changes to Initial Populations have been successfully saved.')

  // navigate to Measure Packager
  cy.get(measureComposer.measurePackager).click()

  helper.verifySpinnerAppearsAndDissappears()

  // verifying the the Population Workspace data is viewable in the Populations list in Measure Packager
  cy.get(measureComposer.populationsListItems).its('length').should('equal', 1)

  cy.get(measureComposer.populationsListItems).eq(0).should('contain.text', 'Initial Population 1')

  // Package Grouping
  cy.get(measureComposer.addAllItemsToGrouping).click()
  cy.get(measureComposer.saveGrouping).click()

  cy.get(measureComposer.measureGroupingTable).should('contain.text', 'Measure Grouping 1')

  // Create Measure Package
  cy.get(measureComposer.createMeasurePackageBtn).click()

  helper.verifySpinnerAppearsAndDissappears()
  helper.verifySpinnerAppearsAndDissappears()
  helper.verifySpinnerAppearsAndDissappears()

  helper.waitToContainText(measureComposer.packageWarningMessage, 'Measure packaged successfully. Please access the Measure Library to export the measure.')

  cy.get(measurelibrary.measureLibraryTab).click()

  helper.verifySpinnerAppearsAndDissappears()

  return measureName
}

// create Proportion QDM Draft Measure

export const createQDMProportionMeasure = () => {
  cy.get(measurelibrary.newMeasureButton).click()
  const measureName = 'QdmProportionMeasure' + Date.now()

  cy.get(createNewMeasure.measureName).type(measureName, { delay: 50 })
  cy.get(createNewMeasure.selectModelRadioBtn).eq(1).click()
  cy.get(createNewMeasure.cqlLibraryName).type(measureName, { delay: 50 })
  cy.get(createNewMeasure.shortName).type(measureName, { delay: 50 })
  cy.get(createNewMeasure.measureScoringListBox).select('Proportion')
  cy.get(createNewMeasure.patientBasedMeasureListBox).select('Yes')

  cy.get(createNewMeasure.saveAndContinueBtn).click()

  cy.get(createNewMeasure.confirmationContinueBtn).click()

  helper.verifySpinnerAppearsAndDissappears()

  cy.get(measureComposer.cqlWorkspace).click()

  helper.verifySpinnerAppearsAndDissappears()

  helper.waitToContainText(measureComposer.cqlWorkspaceTitleGeneralInformation, 'General Information')

  // Includes

  cy.get(measureComposer.includes).click()

  helper.waitToContainText(measureComposer.cqlWorkspaceTitleIncludes, 'Includes')

  cy.get(measureComposer.searchInputBox).type('matglobal', { delay: 50 })
  cy.get(measureComposer.searchBtn).click()
  cy.get(measureComposer.availableLibrariesRow1checkbox).click()
  cy.get(measureComposer.libraryAliasInputBox).type('Global', { delay: 50 })
  cy.get(measureComposer.saveIncludes).click()

  helper.visibleWithTimeout(measureComposer.warningMessage)

  // Value Sets

  addValueSet('2.16.840.1.113883.3.117.1.7.1.30')
  addValueSet('2.16.840.1.113883.3.117.1.7.1.27')
  addValueSet('2.16.840.1.113883.3.666.5.307')
  addValueSet('2.16.840.1.114222.4.11.837')
  addValueSet('2.16.840.1.113883.3.117.1.7.1.35')
  addValueSet('2.16.840.1.113762.1.4.1029.205')
  addValueSet('2.16.840.1.113762.1.4.1')
  addValueSet('2.16.840.1.113762.1.4.1029.67')
  addValueSet('2.16.840.1.113883.3.117.1.7.1.38')
  addValueSet('2.16.840.1.114222.4.11.3591')
  addValueSet('2.16.840.1.114222.4.11.836')
  addValueSet('2.16.840.1.113883.3.117.1.7.1.26')

  // Codes

  addCode('CODE:/CodeSystem/CPT/Version/2020/Code/99201/Info')

  // Parameter

  cy.get(measureComposer.parameter).click()

  helper.waitToContainText(measureComposer.cqlWorkspaceTitleGlobal2, 'Parameter')

  cy.get(measureComposer.addNewBtn).click()
  cy.get(measureComposer.parameterNameInput).type('test.Parameter', { delay: 50 })
  cy.get(measureComposer.parameterCQLExpressionEditorInput).type('Interval<DateTime>', { delay: 50 })
  cy.get(measureComposer.parameterSaveBtn).click()

  helper.visibleWithTimeout(measureComposer.warningMessage)

  // Definition

  addDefinition('Initial Population', 'AgeInYearsAt(start of "Measurement Period")> 12')
  addDefinition('Denominator', 'true')
  addDefinition('Numerator', 'true')
  addDefinition('Breast Milk Feeding', '["Substance, Administered": "Breast Milk"] Feeding')
  addDefinition('ED Visit', 'Global."ED Encounter"')

  // Function

  cy.get(measureComposer.functionMeasureComposer).click()

  helper.waitToContainText(measureComposer.cqlWorkspaceTitleGlobal2, 'Function')

  cy.get(measureComposer.addNewBtn).click()
  cy.get(measureComposer.functionNameInput).type('CalendarDayOfOrDayAfter', { delay: 50 })
  cy.get(measureComposer.addArgument).click()
  helper.visibleWithTimeout(measureComposer.argumentNameInput)
  helper.enterText(measureComposer.argumentNameInput, 'StartValue')
  cy.get(measureComposer.availableDatatypesListBox).select('DateTime')
  cy.get(measureComposer.addBtn).click()
  cy.get(measureComposer.functionCQLExpressionEditorInput).type('Interval[StartValue, ToDate(StartValue + 2 days))', { delay: 50 })
  cy.get(measureComposer.functionSaveBtn).click()

  helper.visibleWithTimeout(measureComposer.warningMessage)

  // CQL Library Editor

  cy.get(measureComposer.cqlLibraryEditor).click()

  helper.waitToContainText(measureComposer.cqlWorkspaceTitleCQLLibraryEditor, 'CQL Library Editor')

  helper.visibleWithTimeout(measureComposer.warningMessage)
  helper.waitToContainText(measureComposer.warningMessage, 'You are viewing CQL with no validation errors.')

  cy.wait(2000)

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

  // Create Measure Package
  cy.get(measureComposer.createMeasurePackageBtn).click()

  helper.verifySpinnerAppearsAndDissappears()
  helper.verifySpinnerAppearsAndDissappears()
  helper.verifySpinnerAppearsAndDissappears()

  helper.waitToContainText(measureComposer.packageWarningMessage, 'Measure packaged successfully. Please access the Measure Library to export the measure.')

  cy.get(measurelibrary.measureLibraryTab).click()

  helper.verifySpinnerAppearsAndDissappears()

  return measureName
}

// Create Draft Measure

export const createDraftMeasure = (measure, model, scoring) => {
  let name = ''

  if (measure === undefined) {
    name = draftMeasure + Date.now()
  } else {
    name = measure + Date.now()
  }
  if (scoring === undefined) {
    scoring = 'Proportion'
  }

  // creating new measure
  helper.enabledWithTimeout(measurelibrary.newMeasureButton)
  cy.get(measurelibrary.newMeasureButton).click()

  cy.get(createNewMeasure.measureName).type(name, { delay: 50 })

  if (model === 'QDM' || model === undefined) {
    cy.get(createNewMeasure.selectModelRadioBtn).eq(1).click()
  } else {
    cy.get(createNewMeasure.selectModelRadioBtn).eq(0).click()
  }

  cy.get(createNewMeasure.cqlLibraryName).type(name, { delay: 50 })
  cy.get(createNewMeasure.shortName).type(name, { delay: 50 })

  cy.get(createNewMeasure.measureScoringListBox).select(scoring)
  cy.get(createNewMeasure.patientBasedMeasureListBox).select('Yes')

  cy.get(createNewMeasure.saveAndContinueBtn).click()

  helper.verifySpinnerAppearsAndDissappears()
  helper.verifySpinnerAppearsAndDissappears()

  helper.visibleWithTimeout(createNewMeasure.confirmationContinueBtn)
  cy.get(createNewMeasure.confirmationContinueBtn).click()

  helper.verifySpinnerAppearsAndDissappears()
  helper.verifySpinnerAppearsAndDissappears()

  cy.get(measureDetails.measureStewardDeveloper).click()
  cy.get(measureDetails.measureStewardListBox).select('SemanticBits')
  cy.get(measureDetails.measureDeveloperList).click()
  cy.get(measureDetails.saveBtn).click()
  helper.verifySpinnerAppearsAndDissappears()
  helper.visibleWithTimeout(measureDetails.warningMessage)

  cy.get(measureDetails.description).click()
  helper.enterText(measureDetails.textAreaInput, 'description')
  cy.get(measureDetails.saveBtn).click()
  helper.verifySpinnerAppearsAndDissappears()
  helper.visibleWithTimeout(measureDetails.warningMessage)

  cy.get(measureDetails.measureType).click()
  cy.get(measureDetails.measureTypeList).click()
  cy.get(measureDetails.saveBtn).click()

  helper.verifySpinnerAppearsAndDissappears()
  helper.verifySpinnerAppearsAndDissappears()

  helper.visibleWithTimeout(measureDetails.warningMessage)

  cy.get(measurelibrary.measureLibraryTab).click()

  helper.verifySpinnerAppearsAndDissappears()
  helper.verifySpinnerAppearsAndDissappears()

  return name
}

// create FHIR Measure, specifying measure type
export const createFHIRMeasureByType = (measure, type, patient_based) => {
  let name = ''

  if (measure === undefined) {
    name = draftMeasure + Date.now()
  } else {
    name = measure + Date.now()
  }

  // creating new measure
  helper.enabledWithTimeout(measurelibrary.newMeasureButton)
  cy.get(measurelibrary.newMeasureButton).click()

  cy.get(createNewMeasure.measureName).type(name, { delay: 50 })

  cy.get(createNewMeasure.cqlLibraryName).type(name, { delay: 50 })
  cy.get(createNewMeasure.shortName).type(name, { delay: 50 })

  cy.get(createNewMeasure.measureScoringListBox).select(type)
  cy.get(createNewMeasure.patientBasedMeasureListBox).select(patient_based)

  cy.get(createNewMeasure.saveAndContinueBtn).click()

  helper.verifySpinnerAppearsAndDissappears()
  helper.verifySpinnerAppearsAndDissappears()

  cy.get(createNewMeasure.confirmationContinueBtn).click()

  helper.verifySpinnerAppearsAndDissappears()
  helper.verifySpinnerAppearsAndDissappears()

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

  helper.verifySpinnerAppearsAndDissappears()

  helper.visibleWithTimeout(measureDetails.warningMessage)

  cy.get(measurelibrary.measureLibraryTab).click()

  helper.verifySpinnerAppearsAndDissappears()

  return name
}

export const createDraftCqlLibrary = (library, model) => {
  let name = ''

  if (library === undefined) {
    name = 'DraftCqllibrary' + Date.now()
  } else {
    name = library + Date.now()
  }

  cy.get(measurelibrary.cqlLibraryTab).then(tab => {
    const value = tab.attr('class')

    if (value.toString() === 'gwt-TabBarItem') {
      cy.get(measurelibrary.cqlLibraryTab).click()
      helper.verifySpinnerAppearsAndDissappears()
      helper.verifySpinnerAppearsAndDissappears()
      helper.visibleWithTimeout(cqlLibrary.row1RecentActivity, 150000)
      helper.visibleWithTimeout(cqlLibrary.row1CqlLibrarySearch, 150000)
    }
  })
  helper.verifySpinnerAppearsAndDissappears()
  helper.verifySpinnerAppearsAndDissappears()
  helper.enabledWithTimeout(cqlLibrary.newLibraryBtn)
  cy.get(cqlLibrary.newLibraryBtn).click()

  helper.verifySpinnerAppearsAndDissappears()

  cy.get(createNewCqlLibrary.cqlLibraryName).type(name, { delay: 50 })

  if (model === 'QDM' || model === undefined) {
    cy.get(createNewCqlLibrary.selectLibraryModelRadioBtn).eq(1).click()
  } else {
    cy.get(createNewCqlLibrary.selectLibraryModelRadioBtn).eq(0).click()
  }

  cy.get(createNewCqlLibrary.saveAndContinueBtn).click()

  helper.verifySpinnerAppearsAndDissappears()
  helper.verifySpinnerAppearsAndDissappears()

  helper.visibleWithTimeout((cqlLibrary.confirmationContinue))
  cy.get(cqlComposer.confirmationContinueBtn).click()

  helper.verifySpinnerAppearsAndDissappears()

  cy.get(measurelibrary.cqlLibraryTab).click()

  helper.verifySpinnerAppearsAndDissappears()
  helper.verifySpinnerAppearsAndDissappears()
  helper.verifySpinnerAppearsAndDissappears()
  helper.visibleWithTimeout(cqlLibrary.row1RecentActivity, 120000)
  helper.visibleWithTimeout(cqlLibrary.row1CqlLibrarySearch, 120000)

  return name
}

export const createMajorVersionMeasure = (measure, model) => {
  let name = ''

  if (measure === undefined) {
    name = draftMeasure + Date.now()
  } else {
    name = measure + Date.now()
  }

  if (model === undefined || 'QDM') {
    name = createDraftMeasure(name, 'QDM')
  }
  else {
    name = createDraftMeasure(name, 'FHIR')
  }

  cy.get(measurelibrary.searchInputBox).type(name, { delay: 50 })
  cy.get(measurelibrary.searchBtn).click()

  helper.verifySpinnerAppearsAndDissappears()
  helper.verifySpinnerAppearsAndDissappears()

  helper.enabledWithTimeout(measurelibrary.searchInputBox)
  helper.visibleWithTimeout(measurelibrary.row1MeasureSearch)

  gridRowActions.selectRow(measurelibrary.row1MeasureSearch)

  cy.get(measurelibrary.createVersionMeasureSearchBtn).click()

  cy.get(measurelibrary.majorVersionTypeRadio).click()
  cy.get(measurelibrary.packageAndVersion).click()

  helper.verifySpinnerAppearsAndDissappears()
  helper.verifySpinnerAppearsAndDissappears()

  cy.get(measurelibrary.continueBtn).click()

  helper.verifySpinnerAppearsAndDissappears()

  helper.verifySpinnerAppearsAndDissappears()

  cy.get(measurelibrary.searchInputBox).clear()

  return name
}

export const addValueSet = (OID) => {
  helper.verifySpinnerAppearsAndDissappears()

  cy.get(measureComposer.valueSets).click()

  helper.waitToContainText(measureComposer.cqlWorkspaceTitleGlobal, 'Value Sets')

  cy.get(measureComposer.OIDInput).type(OID, { delay: 50 })
  cy.get(measureComposer.retrieveOIDBtn).click()

  helper.verifySpinnerAppearsAndDissappears()
  helper.verifySpinnerAppearsAndDissappears()

  helper.waitForElementEnabled(measureComposer.applyBtn)
  cy.get(measureComposer.applyBtn).click()

  helper.verifySpinnerAppearsAndDissappears()
  helper.verifySpinnerAppearsAndDissappears()

  helper.visibleWithTimeout(measureComposer.warningMessage)
}

export const addCode = (codeUrl) => {
  cy.get(measureComposer.codes).click()

  helper.waitToContainText(measureComposer.cqlWorkspaceTitleGlobal, 'Codes')

  helper.visibleWithTimeout(measureComposer.codeUrlInput)
  helper.enabledWithTimeout(measureComposer.codeUrlInput)
  cy.get(measureComposer.codeUrlInput).click()
  cy.get(measureComposer.codeUrlInput).type(codeUrl, { delay: 50 })
  cy.get(measureComposer.retrieveBtn).click()
  helper.verifySpinnerAppearsAndDissappears()
  cy.get(measureComposer.applyBtn).click()
  helper.verifySpinnerAppearsAndDissappears()

  helper.visibleWithTimeout(measureComposer.warningMessage)
}

export const addDefinition = (definitionName, CQL) => {
  cy.get(measureComposer.definition).click()
  helper.verifySpinnerAppearsAndDissappears()
  helper.waitToContainText(measureComposer.cqlWorkspaceTitleGlobal2, 'Definition')

  cy.get(measureComposer.addNewBtn).click()
  helper.verifySpinnerAppearsAndDissappears()
  cy.get(measureComposer.definitionNameInput).type(definitionName, { delay: 50 })

  helper.visibleWithTimeout(measureComposer.definitionCQLExpressionEditorInput)

  cy.wait(1500)
  helper.verifySpinnerAppearsAndDissappears()

  cy.get(measureComposer.definitionCQLExpressionEditorInput).type(CQL, { delay: 50, parseSpecialCharSequences: false })
  cy.get(measureComposer.definitionSaveBtn).click()

  helper.verifySpinnerAppearsAndDissappears()

  helper.visibleWithTimeout(measureComposer.warningMessage)

  cy.get(measureComposer.warningMessage).contains('successfully saved')
}

export const addFunction = (functionName, CQL) => {
  cy.get(measureComposer.functionMeasureComposer).click()

  helper.waitToContainText(measureComposer.cqlWorkspaceTitleGlobal2, 'Function')

  cy.get(measureComposer.addNewBtn).click()
  cy.get(measureComposer.functionNameInput).type(functionName, { delay: 50 })
  cy.get(measureComposer.functionCQLExpressionEditorInput).type(CQL, { delay: 50, parseSpecialCharSequences: false })
  cy.get(measureComposer.functionSaveBtn).click()

  helper.visibleWithTimeout(measureComposer.warningMessage)
}

export const addSingleFunctionArgument = (argumentName, argumentDatatype, qdmDatatypeObject) => {
//must be on the Function helper UI

  cy.get(measureComposer.addArgument).click()
  cy.get(measureComposer.argumentNameInput).click()
  helper.enterText(measureComposer.argumentNameInput, argumentName)
  cy.get(measureComposer.availableDatatypesListBox).select(argumentDatatype)

  if (qdmDatatypeObject === undefined) {
    //do nothing
  }
  else {
    cy.get(measureComposer.selectQDMDatatypeObject).select(qdmDatatypeObject)
  }
  cy.get(measureComposer.addBtn).click()

  cy.get(measureComposer.functionSaveBtn).click()

  helper.visibleWithTimeout(measureComposer.warningMessage)
}
