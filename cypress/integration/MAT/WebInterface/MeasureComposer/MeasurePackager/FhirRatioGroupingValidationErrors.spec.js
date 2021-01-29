import * as helper from '../../../../../support/helpers'
import * as dataCreation from '../../../../../support/MAT/MeasureAndCQLLibraryCreation'
import * as measurelibrary from '../../../../../pom/MAT/WI/MeasureLibrary'
import * as oktaLogin from '../../../../../support/oktaLogin'
import * as createNewMeasure from '../../../../../pom/MAT/WI/CreateNewMeasure'
import * as measureComposer from '../../../../../pom/MAT/WI/MeasureComposer'
import * as measureDetails from '../../../../../pom/MAT/WI/MeasureDetails'

//let measureName = ''

describe('Grouping Validate error Messages for FHIR Ratio Measure', () => {
  before('Login', () => {
    oktaLogin.login()
  })
  beforeEach('Preserve Cookies', () => {
    helper.preserveCookies()
  })
  after('Log Out', () => {
    helper.logout()
  })

  it('Validate the Grouping Error Messages for Ratio FHIR Measure', () => {

    helper.verifySpinnerAppearsAndDissappears()

    //Create a new measure
    helper.enabledWithTimeout(measurelibrary.newMeasureButton)
    cy.get(measurelibrary.newMeasureButton).click()
    let measureName = 'CreateFhirRatioMeasure' + Date.now()
    cy.get(createNewMeasure.measureName).type(measureName, { delay: 50 })
    cy.get(createNewMeasure.modelradioFHIR).click()
    cy.get(createNewMeasure.cqlLibraryName).type(measureName, { delay: 50 })
    cy.get(createNewMeasure.shortName).type(measureName, { delay: 50 })
    cy.get(createNewMeasure.measureScoringListBox).select('Ratio')
    cy.get(createNewMeasure.patientBasedMeasureListBox).select('Yes')
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

    //Add needed data for grouping
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

    //add the Value Sets
    cy.get(measureComposer.valueSets).click()
    helper.verifySpinnerAppearsAndDissappears()
    dataCreation.addValueSet('2.16.840.1.113883.3.666.5.307')
    dataCreation.addValueSet('2.16.840.1.113762.1.4.1182.118')
    dataCreation.addValueSet('2.16.840.1.113762.1.4.1111.161')

    //Add the Codes for the groupings
    cy.get(measureComposer.valueSets).click()
    helper.verifySpinnerAppearsAndDissappears()
    dataCreation.addCode('CODE:/CodeSystem/LOINC/Version/2.46/Code/21112-8/Info')
    dataCreation.addCode('CODE:/CodeSystem/SNOMEDCT/Version/2016-03/Code/419099009/Info')
    dataCreation.addCode('CODE:/CodeSystem/SNOMEDCT/Version/2017-09/Code/371828006/Info')

    //Add the Definitions
    cy.get(measureComposer.definition).click()
    helper.verifySpinnerAppearsAndDissappears()
    dataCreation.addDefinition('Initial Population', 'TJC."Encounter with Principal Diagnosis and Age"')
    dataCreation.addDefinition('Denominator', 'TJC."Ischemic Stroke Encounter"')
    dataCreation.addDefinition('Numerator', '"Initial Population"')

    //Add Initial Population, Denominator, and Numerator in Population Workspace
    cy.get(measureComposer.populationWorkspace).click()
    helper.verifySpinnerAppearsAndDissappears()

    //Add Initial Population
    cy.get(measureComposer.initialPopulation).click()
    helper.verifySpinnerAppearsAndDissappears()
    cy.get(measureComposer.initialPopulationDefinitionListBox).select('Initial Population')
    cy.get(measureComposer.initialPopulationSaveBtn).click()
    helper.visibleWithTimeout(measureComposer.warningMessage)
    helper.waitToContainText(measureComposer.warningMessage, 'Changes to Initial Populations have been successfully saved.')

    //Add Denominator
    cy.get(measureComposer.denominator).click()
    helper.verifySpinnerAppearsAndDissappears()
    cy.get(measureComposer.denominatorDefinitionListBox).select('Denominator')
    cy.get(measureComposer.denominatorSaveBtn).click()
    helper.visibleWithTimeout(measureComposer.warningMessage)
    helper.waitToContainText(measureComposer.warningMessage, 'Changes to Denominators have been successfully saved.')

    //Add Numerator
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
    helper.waitToContainText(measureComposer.groupingErrorOne, 'For a Ratio measure, a grouping must contain exactly one of each of the following: Denominator and Numerator.')
    helper.waitToContainText(measureComposer.groupingErrorTwo, 'For a Ratio measure, a grouping must contain at least one Initial Population.')
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
