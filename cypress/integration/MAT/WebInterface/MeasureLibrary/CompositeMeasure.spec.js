import * as helper from '../../../../support/helpers'
import * as measurelibrary from '../../../../pom/MAT/WI/MeasureLibrary'
import * as createnewcompositemeasure from '../../../../pom/MAT/WI/CreateNewCompositeMeasure'
import * as measureComposer from '../../../../pom/MAT/WI/MeasureComposer'
import * as dataCreation from '../../../../support/MAT/MeasureAndCQLLibraryCreation'
import * as gridRowActions from '../../../../support/MAT/GridRowActions'
import * as login from '../../../../support/MAT/Login'

let measureNameOne = ''
let measureNameTwo = ''

describe('Measure Library: Composite Measure', () => {
  before('data creation', () => {
    login.matLogin()

    measureNameOne = dataCreation.createDraftMeasure('QdmCqlMeasureOne', 'QDM')
    measureNameTwo = dataCreation.createDraftMeasure('QdmCqlMeasureTwo', 'QDM')

    helper.verifySpinnerAppearsAndDissappears()
  })
  beforeEach('Login', () => {
    login.matLogin()

    helper.verifySpinnerAppearsAndDissappears()

    helper.enabledWithTimeout(measurelibrary.searchInputBox)
    cy.get(measurelibrary.searchInputBox).type(measureNameOne, { delay: 50 })
    cy.get(measurelibrary.searchBtn).click()

    helper.verifySpinnerAppearsAndDissappears()

    gridRowActions.doubleClickRow(measurelibrary.row1MeasureSearch)

    helper.verifySpinnerAppearsAndDissappears()

    cy.get(measureComposer.cqlWorkspace).click()

    helper.verifySpinnerAppearsAndDissappears()

    helper.waitToContainText(measureComposer.cqlWorkspaceTitleGeneralInformation, 'General Information')

    // Definition

    cy.get(measureComposer.definition).click()

    helper.verifySpinnerAppearsAndDissappears()

    dataCreation.addDefinition('Initial Population', 'true')
    dataCreation.addDefinition('Denominator', 'true')
    dataCreation.addDefinition('Numerator', 'true')

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

    //Package Grouping
    cy.get(measureComposer.addAllItemsToGrouping).click()
    cy.get(measureComposer.saveGrouping).click()

    cy.get(measureComposer.measureGroupingTable).should('contain.text', 'Measure Grouping 1')

    //Create Measure Package
    cy.get(measureComposer.createMeasurePackageBtn).click()

    helper.verifySpinnerAppearsAndDissappears()
    helper.verifySpinnerAppearsAndDissappears()

    cy.wait(3000)

    helper.waitToContainText(measureComposer.packageWarningMessage, 'Measure packaged successfully. Please access the Measure Library to export the measure.', 120000)

    cy.get(measurelibrary.measureLibraryTab).click()

    helper.verifySpinnerAppearsAndDissappears()

    cy.get(measurelibrary.searchInputBox).clear().type(measureNameOne, { delay: 50 })
    cy.get(measurelibrary.searchBtn).click()

    helper.verifySpinnerAppearsAndDissappears()

    helper.visibleWithTimeout(measurelibrary.row1MeasureSearch)

    cy.wait(2000)

    gridRowActions.selectRow(measurelibrary.row1MeasureSearch)

    cy.get(measurelibrary.createVersionMeasureSearchBtn).click()

    cy.get(measurelibrary.majorVersionTypeRadio).click()
    cy.get(measurelibrary.packageAndVersion).click()

    helper.verifySpinnerAppearsAndDissappears()
    helper.verifySpinnerAppearsAndDissappears()

    helper.waitForElementEnabled(measurelibrary.searchInputBox)
    cy.get(measurelibrary.searchInputBox).clear().type(measureNameTwo, { delay: 50 })
    cy.get(measurelibrary.searchBtn).click()

    helper.verifySpinnerAppearsAndDissappears()

    gridRowActions.doubleClickRow(measurelibrary.row1MeasureSearch)

    helper.verifySpinnerAppearsAndDissappears()

    cy.get(measureComposer.cqlWorkspace).click()

    helper.verifySpinnerAppearsAndDissappears()

    helper.waitToContainText(measureComposer.cqlWorkspaceTitleGeneralInformation, 'General Information')

    // Definition

    cy.get(measureComposer.definition).click()

    helper.verifySpinnerAppearsAndDissappears()

    dataCreation.addDefinition('Initial Population', 'true')
    dataCreation.addDefinition('Denominator', 'true')
    dataCreation.addDefinition('Numerator', 'true')

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

    //Package Grouping
    cy.get(measureComposer.addAllItemsToGrouping).click()
    cy.get(measureComposer.saveGrouping).click()

    cy.get(measureComposer.measureGroupingTable).should('contain.text', 'Measure Grouping 1')

    //Create Measure Package
    cy.get(measureComposer.createMeasurePackageBtn).click()

    helper.verifySpinnerAppearsAndDissappears()

    cy.wait(3000)

    helper.waitToContainText(measureComposer.packageWarningMessage, 'Measure packaged successfully. Please access the Measure Library to export the measure.')

    cy.get(measurelibrary.measureLibraryTab).click()

    helper.verifySpinnerAppearsAndDissappears()

    cy.get(measurelibrary.searchInputBox).clear().type(measureNameTwo, { delay: 50 })
    cy.get(measurelibrary.searchBtn).click()

    helper.verifySpinnerAppearsAndDissappears()

    helper.visibleWithTimeout(measurelibrary.row1MeasureSearch)

    cy.wait(2000)

    gridRowActions.selectRow(measurelibrary.row1MeasureSearch)

    cy.get(measurelibrary.createVersionMeasureSearchBtn).click()

    cy.get(measurelibrary.majorVersionTypeRadio).click()
    cy.get(measurelibrary.packageAndVersion).click()

    helper.verifySpinnerAppearsAndDissappears()
    helper.verifySpinnerAppearsAndDissappears()

  })
  afterEach('Log Out', () => {
    login.matLogout()
  })

  it('Create Composite measure successfully', () => {

    helper.waitForElementEnabled(measurelibrary.newCompositeMeasureButton)
    cy.get(measurelibrary.newCompositeMeasureButton).click()

    let measureName = 'createCompositeMeasure' + Date.now()

    cy.get(createnewcompositemeasure.measureName).type(measureName, { delay: 50 })
    cy.get(createnewcompositemeasure.modelradioQDM).click()
    cy.get(createnewcompositemeasure.cqlLibraryName).type(measureName, { delay: 50 })
    cy.get(createnewcompositemeasure.shortName).type(measureName, { delay: 50 })

    cy.get(createnewcompositemeasure.compositeScoringMethod).select('All or Nothing')
    cy.get(createnewcompositemeasure.measureScoring).select('Proportion')
    cy.get(createnewcompositemeasure.patientBasedMeasure).select('Yes')

    cy.get(createnewcompositemeasure.saveAndContinueBtn).click()

    // Component Measures
    cy.get(createnewcompositemeasure.searchInputBox).type(measureNameOne, { delay: 50 })
    cy.get(createnewcompositemeasure.searchButton).click()

    cy.get(createnewcompositemeasure.row1ComponentMeasureSearchName).should('contain.text', measureNameOne)
    cy.get(createnewcompositemeasure.row1ComponentMeasureSelect).check({ force: true })

    cy.get(createnewcompositemeasure.searchInputBox).clear()
    cy.get(createnewcompositemeasure.searchInputBox).type(measureNameTwo, { delay: 50 })
    cy.get(createnewcompositemeasure.searchButton).click()

    cy.get(createnewcompositemeasure.row1ComponentMeasureSearchName).should('contain.text', measureNameTwo)
    cy.get(createnewcompositemeasure.row1ComponentMeasureSelect).check({ force: true })

    // Applied Component Measures

    cy.get(createnewcompositemeasure.row1AppliedComponentMeasureAlias).type('alias1')
    cy.get(createnewcompositemeasure.row2AppliedComponentMeasureAlias).type('alias2')

    cy.get(createnewcompositemeasure.saveAndContinueBtnComponent).click()

    // Dialog
    cy.get(createnewcompositemeasure.confirmationContinueBtn).click()

    helper.verifySpinnerAppearsAndDissappears()

    cy.get(measureComposer.cqlWorkspace).click()

    helper.verifySpinnerAppearsAndDissappears()

    helper.waitToContainText(measureComposer.cqlWorkspaceTitleGeneralInformation, 'General Information')

    //Includes
    helper.verifySpinnerAppearsAndDissappears()
    helper.verifySpinnerAppearsAndDissappears()

    cy.get(measureComposer.includes).click()

    helper.waitToContainText(measureComposer.cqlWorkspaceTitleIncludes, 'Includes')

    cy.get(measureComposer.searchInputBox).type('matglobal', { delay: 50 })
    cy.get(measureComposer.searchBtn).click()
    cy.get(measureComposer.availableLibrariesRow1checkbox).click()
    cy.get(measureComposer.libraryAliasInputBox).type('Global', { delay: 50 })
    cy.get(measureComposer.saveIncludes).click()

    helper.visibleWithTimeout(measureComposer.warningMessage)

    //Value Sets

    dataCreation.addValueSet('2.16.840.1.113883.3.117.1.7.1.30')
    dataCreation.addValueSet('2.16.840.1.113883.3.117.1.7.1.27')
    dataCreation.addValueSet('2.16.840.1.113883.3.666.5.307')
    dataCreation.addValueSet('2.16.840.1.114222.4.11.837')
    dataCreation.addValueSet('2.16.840.1.113883.3.117.1.7.1.35')
    dataCreation.addValueSet('2.16.840.1.113762.1.4.1029.205')
    dataCreation.addValueSet('2.16.840.1.113762.1.4.1')
    dataCreation.addValueSet('2.16.840.1.113762.1.4.1029.67')
    dataCreation.addValueSet('2.16.840.1.113883.3.117.1.7.1.38')
    dataCreation.addValueSet('2.16.840.1.114222.4.11.3591')
    dataCreation.addValueSet('2.16.840.1.114222.4.11.836')
    dataCreation.addValueSet('2.16.840.1.113883.3.117.1.7.1.26')

    //Codes

    dataCreation.addCode('CODE:/CodeSystem/CPT/Version/2020/Code/99201/Info')

    //Parameter

    cy.get(measureComposer.parameter).click()

    helper.waitToContainText(measureComposer.cqlWorkspaceTitleGlobal2, 'Parameter')

    cy.get(measureComposer.addNewBtn).click()
    cy.get(measureComposer.parameterNameInput).type('test.Parameter', { delay: 50 })
    cy.get(measureComposer.parameterCQLExpressionEditorInput).type('Interval<DateTime>', { delay: 50 })
    cy.get(measureComposer.parameterSaveBtn).click()

    helper.visibleWithTimeout(measureComposer.warningMessage)

    //Definition

    dataCreation.addDefinition('Initial Population', 'AgeInYearsAt(start of "Measurement Period")> 12')
    dataCreation.addDefinition('Denominator', 'true')
    dataCreation.addDefinition('Numerator', 'true')
    dataCreation.addDefinition('Breast Milk Feeding', '["Substance, Administered": "Breast Milk"] Feeding')
    dataCreation.addDefinition('ED Visit', 'Global."ED Encounter"')

    //Function

    cy.get(measureComposer.functionMeasureComposer).click()

    helper.waitToContainText(measureComposer.cqlWorkspaceTitleGlobal2, 'Function')

    cy.get(measureComposer.addNewBtn).click()
    cy.get(measureComposer.functionNameInput).type('CalendarDayOfOrDayAfter', { delay: 50 })
    cy.get(measureComposer.addArgument).click()
    helper.enterText(measureComposer.argumentNameInput, 'StartValue')
    cy.get(measureComposer.availableDatatypesListBox).select('DateTime')
    cy.get(measureComposer.addBtn).click()
    cy.get(measureComposer.functionCQLExpressionEditorInput).type('Interval[StartValue, ToDate(StartValue + 2 days))', { delay: 50 })
    cy.get(measureComposer.functionSaveBtn).click()

    helper.visibleWithTimeout(measureComposer.warningMessage)

    //CQL Library Editor

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

    //navigate to Measure Packager
    cy.get(measureComposer.measurePackager).click()

    helper.verifySpinnerAppearsAndDissappears()

    //verifying the the Population Workspace data is viewable in the Populations list in Measure Packager
    cy.get(measureComposer.populationsListItems).its('length').should('equal', 3)

    cy.get(measureComposer.populationsListItems).eq(0).should('contain.text', 'Initial Population 1')
    cy.get(measureComposer.populationsListItems).eq(1).should('contain.text', 'Denominator 1')
    cy.get(measureComposer.populationsListItems).eq(2).should('contain.text', 'Numerator 1')

    //Package Grouping
    cy.get(measureComposer.addAllItemsToGrouping).click()
    cy.get(measureComposer.saveGrouping).click()

    helper.verifySpinnerAppearsAndDissappears()
    helper.verifySpinnerAppearsAndDissappears()

    cy.get(measureComposer.measureGroupingTable).should('contain.text', 'Measure Grouping 1')

    //Create Measure Package
    cy.get(measureComposer.createMeasurePackageBtn).click()

    helper.verifySpinnerAppearsAndDissappears()
    helper.verifySpinnerAppearsAndDissappears()

    //error message for expressions
    helper.waitToContainText(measureComposer.packageWarningMessage, ' Expressions must be used from two or more component measures.')

    cy.get(measurelibrary.measureLibraryTab).click()

    helper.verifySpinnerAppearsAndDissappears()

  })

})

describe('Validate FHIR model for Composite measure', () => {
  beforeEach('Login', () => {
    login.matLogin()
  })
  afterEach('Log Out', () => {
    login.matLogout()
  })

  it('Verify that the FHIR model is not accessible for Composite Measure', () => {

    cy.get(measurelibrary.newCompositeMeasureButton).click()
    cy.get(createnewcompositemeasure.modelradioFHIR).should('be.disabled')
    cy.get(createnewcompositemeasure.cancelBtn).click()

  })

  it('Validate the FHIR buttons are grayed out for Composite measure', () => {

    cy.get(createnewcompositemeasure.measureLibraryBtn).click()

    cy.get(measurelibrary.searchInputBox).type('createCompositeMeasure', { delay: 50 })
    cy.get(measurelibrary.searchBtn).click()

    helper.verifySpinnerAppearsAndDissappears()

    cy.get(measurelibrary.row1MeasureSearchName).should('contain.text', 'createCompositeMeasure')
    cy.get(measurelibrary.row1MeasureSearchCheckbox).check({ force: true })

    cy.get(measurelibrary.runFhirValidationRecentActivityBtn).should('be.disabled')
    cy.get(measurelibrary.convertToFhirRecentActivityBtn).should('be.disabled')
  })
})
