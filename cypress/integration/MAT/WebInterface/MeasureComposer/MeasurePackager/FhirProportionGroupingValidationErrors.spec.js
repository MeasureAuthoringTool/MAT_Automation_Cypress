import * as helper from '../../../../../support/helpers'
import * as measurelibrary from '../../../../../pom/MAT/WI/MeasureLibrary'
import * as measureComposer from '../../../../../pom/MAT/WI/MeasureComposer'
import * as oktaLogin from '../../../../../support/oktaLogin'
import * as dataCreation from '../../../../../support/MAT/MeasureAndCQLLibraryCreation'
import * as measureDetails from '../../../../../pom/MAT/WI/MeasureDetails'
import * as createNewMeasure from '../../../../../pom/MAT/WI/CreateNewMeasure'

describe('Test Proportion Grouping Validation Messages for FHIR Measure in Measure Packager', function () {

  before('Login', () => {
    oktaLogin.login()

  })
  beforeEach('Preserve Cookies', () => {
    helper.preserveCookies()
  })
  after('Log Out', () => {
    helper.logout()
  })

  it('Grouping Validate error Messages for FHIR Proportion Measure', () => {

    //Wait for page to load after login
    helper.verifySpinnerAppearsAndDissappears()

    //MAke a new measure to test, Proportion Fhir measure that is patient based
    helper.enabledWithTimeout(measurelibrary.newMeasureButton)
    cy.get(measurelibrary.newMeasureButton).click()
    let measureName = 'CreateFhirProportionMeasure' + Date.now()

    //Enter metadata
    cy.get(createNewMeasure.measureName).type(measureName, { delay: 50 })
    cy.get(createNewMeasure.modelradioFHIR).click()
    cy.get(createNewMeasure.cqlLibraryName).type(measureName, { delay: 50 })
    cy.get(createNewMeasure.shortName).type(measureName, { delay: 50 })
    cy.get(createNewMeasure.measureScoringListBox).select('Proportion')
    cy.get(createNewMeasure.patientBasedMeasureListBox).select('Yes')
    cy.get(createNewMeasure.saveAndContinueBtn).click()
    cy.get(createNewMeasure.confirmationContinueBtn).click()
    helper.verifySpinnerAppearsAndDissappears()

    //Change Population Basis to Encounter
    cy.get(measureDetails.generalMeasureInformation).click()
    cy.get(measureDetails.populationBasisListbox).select('Encounter')
    cy.get(measureDetails.saveBtn).click()
    helper.visibleWithTimeout(measureDetails.warningMessage)

    helper.verifySpinnerAppearsAndDissappears()

    //select population basis
    cy.get(measureDetails.populationBasisListbox).select('Encounter')
    cy.get(measureDetails.saveBtn).click()

    helper.verifySpinnerAppearsAndDissappears()
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
    dataCreation.addDefinition('Numerator', '"Initial Population"')

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

    //navigate to Measure Packager
    cy.get(measureComposer.measurePackager).click()
    helper.verifySpinnerAppearsAndDissappears()

    //before saving grouping, click the grouping button and validate error appears
    cy.get(measureComposer.saveGrouping).click()
    helper.waitToContainText(measureComposer.packageWarningMessage, 'For a Proportion measure, a grouping must contain exactly one of each of the following: Initial Population, Denominator and Numerator.')
    helper.verifySpinnerAppearsAndDissappears()

    //Add proper items to the grouping and save, should get success message
    cy.get(measureComposer.populationsListItems).eq(0).should('contain.text', 'Initial Population').click()
    cy.get(measureComposer.addClauseButton).click()
    helper.verifySpinnerAppearsAndDissappears()

    cy.get(measureComposer.populationListItemsSecondary).click()
    cy.get(measureComposer.addClauseButton).click()
    helper.verifySpinnerAppearsAndDissappears()

    cy.get(measureComposer.populationListItemsSecondary).click()
    cy.get(measureComposer.addClauseButton).click()
    helper.verifySpinnerAppearsAndDissappears()

    cy.get(measureComposer.saveGrouping).click()
    helper.verifySpinnerAppearsAndDissappears()
    helper.waitToContainText(measureComposer.measureGroupingSuccessMessage, 'Grouping has been saved.')

  })

})
