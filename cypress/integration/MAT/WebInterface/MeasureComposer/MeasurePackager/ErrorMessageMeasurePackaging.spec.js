import * as helper from '../../../../../support/helpers'
import * as measurelibrary from '../../../../../pom/MAT/WI/MeasureLibrary'
import * as measureComposer from '../../../../../pom/MAT/WI/MeasureComposer'
import * as oktaLogin from '../../../../../support/oktaLogin'
import * as dataCreation from '../../../../../support/MAT/MeasureAndCQLLibraryCreation'
import * as createNewMeasure from '../../../../../pom/MAT/WI/CreateNewMeasure'
import * as gridRowActions from '../../../../../support/MAT/GridRowActions'

let fhirMeasure = ''
let qdmMeasure = ''

describe('Measure Packager: Validate before packaging a FHIR measure', () => {
  before('Login', () => {
    oktaLogin.login()

    qdmMeasure = dataCreation.createDraftMeasure('QdmDraftMeasure', 'QDM')
    fhirMeasure = dataCreation.createDraftMeasure('FhirDraftMeasure', 'FHIR')

    helper.verifySpinnerAppearsAndDissappears()

  })
  beforeEach('Preserve Cookies', () => {
    helper.preserveCookies()
  })
  after('Log Out', () => {
    helper.logout()
  })

  it('QDM Measure: Validate cql error message on measure packager page', () => {

    helper.enabledWithTimeout(measurelibrary.searchInputBox)
    helper.enterText(measurelibrary.searchInputBox, qdmMeasure)
    cy.get(measurelibrary.searchBtn).click()

    helper.verifySpinnerAppearsAndDissappears()

    gridRowActions.doubleClickRow(measurelibrary.row1MeasureSearch)

    helper.verifySpinnerAppearsAndDissappears()

    cy.get(measureComposer.cqlWorkspace).click()

    helper.verifySpinnerAppearsAndDissappears()

    // Function
    cy.get(measureComposer.functionMeasureComposer).click()
    helper.waitToContainText(measureComposer.cqlWorkspaceTitleGlobal2, 'Function')

    cy.get(measureComposer.functionNameInput).type('TestForValidationError', { delay: 50 })
    cy.get(measureComposer.functionCQLExpressionEditorInput).type('.dfgfkj', { delay: 50 })
    cy.get(measureComposer.functionSaveBtn).click()

    helper.verifySpinnerAppearsAndDissappears()

    // Measure Packager
    cy.get(measureComposer.measurePackager).click()
    helper.verifySpinnerAppearsAndDissappears()
    cy.get(measureComposer.packageWarningMessage).should('contain.text', 'Your CQL file contains validation errors. Errors must be corrected before proceeding to measure packaging. Please return to the CQL Workspace to make corrections.')

    cy.get(measurelibrary.measureLibraryTab).click()

    helper.verifySpinnerAppearsAndDissappears()

  })

  it('FHIR Measure: Validate error message for cql workspace requirement', () => {

    helper.verifySpinnerAppearsAndDissappears()

    helper.enterText(measurelibrary.searchInputBox, fhirMeasure)
    cy.get(measurelibrary.searchBtn).click()

    helper.verifySpinnerAppearsAndDissappears()

    gridRowActions.doubleClickRow(measurelibrary.row1MeasureSearch)

    helper.verifySpinnerAppearsAndDissappears()

    cy.get(measureComposer.cqlWorkspace).click()

    helper.verifySpinnerAppearsAndDissappears()

    // Function
    cy.get(measureComposer.functionMeasureComposer).click()
    helper.waitToContainText(measureComposer.cqlWorkspaceTitleGlobal2, 'Function')
    cy.get(measureComposer.functionNameInput).type('TestForValidationError', { delay: 50 })
    cy.get(measureComposer.functionCQLExpressionEditorInput).type('{downarrow}.dfgfkj', { delay: 50 })
    cy.get(measureComposer.functionSaveBtn).click()

    helper.verifySpinnerAppearsAndDissappears()

    // Measure Packager
    cy.get(measureComposer.measurePackager).click()
    helper.verifySpinnerAppearsAndDissappears()
    cy.get(measureComposer.packageWarningMessage).should('contain.text', 'Your CQL file contains validation errors. ' +
      'Errors must be corrected before proceeding to measure packaging. Please return to the CQL Workspace to make corrections.')

    cy.get(measurelibrary.measureLibraryTab).click()

    helper.verifySpinnerAppearsAndDissappears()
  })
})

describe('Measure Packager: Validate the error message for details requirement', () => {
  before('Login', () => {
    oktaLogin.login()

  })
  beforeEach('Preserve Cookies', () => {
    helper.preserveCookies()

    helper.verifySpinnerAppearsAndDissappears()

    helper.enabledWithTimeout(measurelibrary.newMeasureButton)
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
  })
  after('Log Out', () => {
    helper.logout()
  })

  it('FHIR Measure: Validate error message for missing meta data', () => {

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

    cy.get(measureComposer.searchInputBox).type('TJCOverallFHIR4', { delay: 50 })
    cy.get(measureComposer.searchBtn).click()
    cy.get(measureComposer.availableLibrariesRow1checkbox).click()
    cy.get(measureComposer.libraryAliasInputBox).type('TJC', { delay: 50 })
    cy.get(measureComposer.saveIncludes).click()

    helper.visibleWithTimeout(measureComposer.warningMessage)

    //Value Sets

    cy.get(measureComposer.valueSets).click()

    helper.verifySpinnerAppearsAndDissappears()

    dataCreation.addValueSet('2.16.840.1.113883.3.666.5.307')
    dataCreation.addValueSet('2.16.840.1.113762.1.4.1182.118')
    dataCreation.addValueSet('2.16.840.1.113762.1.4.1111.161')

    // Codes

    cy.get(measureComposer.valueSets).click()

    helper.verifySpinnerAppearsAndDissappears()

    dataCreation.addCode('CODE:/CodeSystem/SNOMEDCT/Version/2020-03/Code/420523002/Info')
    dataCreation.addCode('CODE:/CodeSystem/SNOMEDCT/Version/2016-03/Code/419099009/Info')
    dataCreation.addCode('CODE:/CodeSystem/SNOMEDCT/Version/2017-09/Code/371828006/Info')

    // Definition

    cy.get(measureComposer.definition).click()

    helper.verifySpinnerAppearsAndDissappears()

    dataCreation.addDefinition('Initial Population', 'TJC."Encounter with Principal Diagnosis and Age"')
    dataCreation.addDefinition('Denominator', 'TJC."Ischemic Stroke Encounter"')
    dataCreation.addDefinition('Numerator', 'true')

    //CQL Library Editor

    cy.get(measureComposer.cqlLibraryEditor).click()

    helper.waitToContainText(measureComposer.cqlWorkspaceTitleCQLLibraryEditor, 'CQL Library Editor')

    helper.visibleWithTimeout(measureComposer.warningMessage)
    helper.waitToContainText(measureComposer.warningMessage, 'You are viewing CQL with no validation errors.')

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

    // Measure Packager
    cy.get(measureComposer.measurePackager).click()
    helper.verifySpinnerAppearsAndDissappears()
    cy.get(measureComposer.packageWarningMessage).should('contain.text', ' Please enter the Measure Description prior to packaging.')

    cy.get(measurelibrary.measureLibraryTab).click()

    helper.verifySpinnerAppearsAndDissappears()

  })

})
