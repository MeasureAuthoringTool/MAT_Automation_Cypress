import * as helper from '../../../../../support/helpers'
import * as dataCreation from '../../../../../support/MAT/MeasureAndCQLLibraryCreation'
import * as measurelibrary from '../../../../../pom/MAT/WI/MeasureLibrary'
import * as createNewMeasure from '../../../../../pom/MAT/WI/CreateNewMeasure'
import * as measureComposer from '../../../../../pom/MAT/WI/MeasureComposer'
import * as login from '../../../../../support/MAT/Login'
import * as gridRowActions from '../../../../../support/MAT/GridRowActions'


let measureName = ''

describe('Measure Composer: Measure Packager: Score Unit UCUM Control', () => {
  before('Data Setup', () => {

    login.matLogin()

    createMeasure()

    login.matLogout()

  })
  beforeEach('Login', () => {
    login.matLogin()
  })
  afterEach('Log Out', () => {
    login.matLogout()
  })
  it('Verify Type Ahead is working as expected', () => {

    helper.verifySpinnerAppearsAndDissappears()

    helper.enterText(measurelibrary.searchInputBox, measureName)
    cy.get(measurelibrary.searchBtn).click()

    helper.verifySpinnerAppearsAndDissappears()

    gridRowActions.doubleClickRow(measurelibrary.row1MeasureSearch)

    helper.verifySpinnerAppearsAndDissappears()

    // navigate to Measure Packager
    cy.get(measureComposer.measurePackager).click()

    helper.verifySpinnerAppearsAndDissappears()

    cy.get(measureComposer.scoreUnitUcumInputBox).type('light')

    helper.visibleWithTimeout(measureComposer.scoreUnitSuggestions)
    cy.get(measureComposer.scoreUnitSuggestions).find('tr').should('have.length', 3)

    helper.enterText(measureComposer.scoreUnitUcumInputBox, 'a')

    cy.get(measureComposer.scoreUnitSuggestions).find('tr').should('have.length', 8)
  })
  it('Verify Type Ahead See More Options is displaying', () => {

    helper.verifySpinnerAppearsAndDissappears()

    helper.enterText(measurelibrary.searchInputBox, measureName)
    cy.get(measurelibrary.searchBtn).click()

    helper.verifySpinnerAppearsAndDissappears()

    gridRowActions.doubleClickRow(measurelibrary.row1MeasureSearch)

    helper.verifySpinnerAppearsAndDissappears()

    // navigate to Measure Packager
    cy.get(measureComposer.measurePackager).click()

    helper.verifySpinnerAppearsAndDissappears()

    helper.enterText(measureComposer.scoreUnitUcumInputBox, 'a')

    helper.visibleWithTimeout(measureComposer.scoreUnitMoreItems)

    cy.get(measureComposer.scoreUnitUcumInputBox).type('{ctrl}', { release: false })
    cy.get(measureComposer.scoreUnitUcumInputBox).type('{enter}')
    cy.get(measureComposer.scoreUnitSuggestions).find('tr').should('have.length', 117)
  })
  it('Verify Packaging error message with Invalid UCUM unit', () => {

    helper.verifySpinnerAppearsAndDissappears()

    helper.enterText(measurelibrary.searchInputBox, measureName)
    cy.get(measurelibrary.searchBtn).click()

    helper.verifySpinnerAppearsAndDissappears()

    gridRowActions.doubleClickRow(measurelibrary.row1MeasureSearch)

    helper.verifySpinnerAppearsAndDissappears()

    // navigate to Measure Packager
    cy.get(measureComposer.measurePackager).click()

    helper.verifySpinnerAppearsAndDissappears()

    cy.get(measureComposer.addAllItemsToGrouping).click()

    helper.enterText(measureComposer.scoreUnitUcumInputBox, 'asdfasdf')

    cy.get(measureComposer.saveGrouping).click()
    helper.waitToContainText(measureComposer.groupingErrorOne, 'asdfasdf is not a valid UCUM code.')
  })
})

function createMeasure () {
  cy.get(measurelibrary.newMeasureButton).click()
  measureName = 'ScoreUnitUcum' + Date.now()

  cy.get(createNewMeasure.measureName).type(measureName, { delay: 50 })
  cy.get(createNewMeasure.modelradioQDM).click()
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

  // Definition

  dataCreation.addDefinition('Initial Population', 'AgeInYearsAt(start of "Measurement Period")> 12')
  dataCreation.addDefinition('Denominator', 'true')
  dataCreation.addDefinition('Numerator', 'true')
  // dataCreation.addDefinition('Breast Milk Feeding', '["Substance, Administered": "Breast Milk"] Feeding')
  // dataCreation.addDefinition('ED Visit', 'Global."ED Encounter"')

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
}
