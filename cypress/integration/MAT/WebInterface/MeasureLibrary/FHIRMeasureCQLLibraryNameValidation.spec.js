import * as helper from '../../../../support/helpers'
import * as oktaLogin from '../../../../support/oktaLogin'
import * as createNewMeasure from '../../../../pom/MAT/WI/createNewMeasure'
import * as measurelibrary from '../../../../pom/MAT/WI/MeasureLibrary'
import * as measureComposer from '../../../../pom/MAT/WI/MeasureComposer'
import * as gridRowActions from '../../../../support/MAT/GridRowActions'

let firstCharacterLowerCase = ''
let firstCharacterUnderscore = ''
let firstCharacterNumeric = ''
let nameWithSpecialSymbols = ''
let nameWithSpaces = ''
let nameWithUnderscore = ''
let name = ''
let fieldLevelError = ' Invalid Library Name. Library names must start with an upper case letter, followed by ' +
  'alpha-numeric character(s) and must not contain spaces, \'_\' (underscores), or other special characters.'

describe('FHIR Measure: Validate the CQL library naming rules', () => {

  beforeEach('Login', () => {
    oktaLogin.login()

  })
  afterEach('Log Out', () => {
    helper.logout()
  })

  it('Validate the FHIR CQL Library name requirement: Incorrect First character', () => {

    name = 'newFhir' + Date.now()
    firstCharacterLowerCase = 'newFhir' + Date.now()
    firstCharacterUnderscore = '_newFhir' + Date.now()
    firstCharacterNumeric = '001New' + Date.now()

    //lower case for first character
    helper.enabledWithTimeout(measurelibrary.newMeasureButton)
    cy.get(measurelibrary.newMeasureButton).click()

    helper.verifySpinnerAppearsAndDissappears()

    cy.get(createNewMeasure.measureName).type(name, { delay: 50 })

    cy.get(createNewMeasure.modelradioFHIR).click()

    cy.get(createNewMeasure.cqlLibraryName).type(firstCharacterLowerCase, { delay: 50 })
    cy.get(createNewMeasure.shortName).type(name, { delay: 50 })

    cy.get(createNewMeasure.measureScoringListBox).select('Proportion')
    cy.get(createNewMeasure.patientBasedMeasureListBox).select('Yes')

    cy.get(createNewMeasure.saveAndContinueBtn).click()

    helper.verifySpinnerAppearsAndDissappears()

    cy.get(measurelibrary.fieldLevelError).should('contain.text', fieldLevelError)

    //underscore for first character
    cy.get(createNewMeasure.cqlLibraryName).clear().type(firstCharacterUnderscore, { delay: 50 })

    cy.get(createNewMeasure.saveAndContinueBtn).click()

    cy.get(measurelibrary.fieldLevelError).should('contain.text', fieldLevelError)

    //number for first character
    cy.get(createNewMeasure.cqlLibraryName).clear().type(firstCharacterNumeric, { delay: 50 })

    cy.get(createNewMeasure.saveAndContinueBtn).click()

    cy.get(measurelibrary.fieldLevelError).should('contain.text', fieldLevelError)

    cy.get(createNewMeasure.cancelBtn).click()

    helper.verifySpinnerAppearsAndDissappears()

  })

  it('Validate the FHIR CQL Library name requirement: Incorrect format', () => {

    name = 'newFhir' + Date.now()
    nameWithSpecialSymbols = 'NewFhir@' + Date.now()
    nameWithSpaces = 'New Fhir' + Date.now()
    nameWithUnderscore = 'New_Fhir' + Date.now()

    //special symbols
    helper.enabledWithTimeout(measurelibrary.newMeasureButton)
    cy.get(measurelibrary.newMeasureButton).click()

    helper.verifySpinnerAppearsAndDissappears()

    cy.get(createNewMeasure.measureName).type(name, { delay: 50 })

    cy.get(createNewMeasure.modelradioFHIR).click()

    cy.get(createNewMeasure.cqlLibraryName).type(nameWithSpecialSymbols, { delay: 50 })
    cy.get(createNewMeasure.shortName).type(name, { delay: 50 })

    cy.get(createNewMeasure.measureScoringListBox).select('Proportion')
    cy.get(createNewMeasure.patientBasedMeasureListBox).select('Yes')

    cy.get(createNewMeasure.saveAndContinueBtn).click()

    cy.get(measurelibrary.fieldLevelError).should('contain.text', fieldLevelError)

    //spaces
    cy.get(createNewMeasure.cqlLibraryName).clear().type(nameWithSpaces, { delay: 50 })

    cy.get(createNewMeasure.saveAndContinueBtn).click()

    cy.get(measurelibrary.fieldLevelError).should('contain.text', fieldLevelError)

    //underscore
    cy.get(createNewMeasure.cqlLibraryName).clear().type(nameWithUnderscore, { delay: 50 })

    cy.get(createNewMeasure.saveAndContinueBtn).click()

    cy.get(measurelibrary.fieldLevelError).should('contain.text', fieldLevelError)

    cy.get(createNewMeasure.cancelBtn).click()

    helper.verifySpinnerAppearsAndDissappears()

  })

  it('Validate the FHIR CQL Library name requirement: Correct format with alpha-numeric', () => {

    name = 'NewFhirMeasureCQLLibrary001' + Date.now()

    //correct format
    helper.enabledWithTimeout(measurelibrary.newMeasureButton)
    cy.get(measurelibrary.newMeasureButton).click()

    helper.verifySpinnerAppearsAndDissappears()

    cy.get(createNewMeasure.measureName).type(name, { delay: 50 })

    cy.get(createNewMeasure.modelradioFHIR).click()

    cy.get(createNewMeasure.cqlLibraryName).type(name, { delay: 50 })
    cy.get(createNewMeasure.shortName).type(name, { delay: 50 })

    cy.get(createNewMeasure.measureScoringListBox).select('Proportion')
    cy.get(createNewMeasure.patientBasedMeasureListBox).select('Yes')

    cy.get(createNewMeasure.saveAndContinueBtn).click()

    cy.get(createNewMeasure.confirmationContinueBtn).click()

    helper.verifySpinnerAppearsAndDissappears()

    cy.get(measurelibrary.measureLibraryTab).click()

    helper.verifySpinnerAppearsAndDissappears()

  })
})

describe('Measure Conversion with incorrect CQL Library name format', () => {

  beforeEach('Login', () => {
    oktaLogin.login()

  })
  afterEach('Log Out', () => {
    helper.logout()
  })

  it('CQL Library name format: Validate the incorrect error message on CQL Workspace', () => {

    name = 'NewMeasureCQLLibrary001' + Date.now()
    firstCharacterLowerCase = 'newMeasure' + Date.now()

    //qdm measure with incorrect cql library name format
    helper.enabledWithTimeout(measurelibrary.newMeasureButton)
    cy.get(measurelibrary.newMeasureButton).click()

    helper.verifySpinnerAppearsAndDissappears()

    cy.get(createNewMeasure.measureName).type(name, { delay: 50 })

    cy.get(createNewMeasure.modelradioQDM).click()

    cy.get(createNewMeasure.cqlLibraryName).type(firstCharacterLowerCase, { delay: 50 })
    cy.get(createNewMeasure.shortName).type(name, { delay: 50 })

    cy.get(createNewMeasure.measureScoringListBox).select('Proportion')
    cy.get(createNewMeasure.patientBasedMeasureListBox).select('Yes')

    cy.get(createNewMeasure.saveAndContinueBtn).click()

    cy.get(createNewMeasure.confirmationContinueBtn).click()

    helper.verifySpinnerAppearsAndDissappears()

    cy.get(measurelibrary.measureLibraryTab).click()

    helper.verifySpinnerAppearsAndDissappears()

    //versioning the qdm measure
    helper.enabledWithTimeout(measurelibrary.searchInputBox)
    helper.enterText(measurelibrary.searchInputBox, name)
    cy.get(measurelibrary.searchBtn).click()

    helper.verifySpinnerAppearsAndDissappears()

    helper.visibleWithTimeout(measurelibrary.row1MeasureSearch)
    gridRowActions.selectRow(measurelibrary.row1MeasureSearch)

    cy.get(measurelibrary.createVersionMeasureSearchBtn).click()
    cy.get(measurelibrary.majorVersionTypeRadio).click()
    cy.get(measurelibrary.packageAndVersion).click()

    helper.verifySpinnerAppearsAndDissappears()

    cy.get(measurelibrary.continueBtn).click()

    helper.verifySpinnerAppearsAndDissappears()
    helper.verifySpinnerAppearsAndDissappears()

    //convert to FHIR measure
    helper.visibleWithTimeout(measurelibrary.row1MeasureSearch)
    gridRowActions.selectRow(measurelibrary.row1MeasureSearch)
    cy.get(measurelibrary.convertToFhirMeasureSearchBtn).click()

    helper.verifySpinnerAppearsAndDissappears()
    helper.verifySpinnerAppearsAndDissappears()
    helper.verifySpinnerAppearsAndDissappears()

    helper.visibleWithTimeout(measurelibrary.row2MeasureSearch)
    gridRowActions.doubleClickRow(measurelibrary.row2MeasureSearch)

    helper.verifySpinnerAppearsAndDissappears()
    helper.verifySpinnerAppearsAndDissappears()

    helper.visibleWithTimeout(measureComposer.cqlWorkspaceTitleGeneralInformation)

    cy.get(measureComposer.cqlWorkspace).click()

    helper.verifySpinnerAppearsAndDissappears()

    helper.visibleWithTimeout(measureComposer.saveBtnGeneralInfo)
    cy.get(measureComposer.saveBtnGeneralInfo).click()

    helper.verifySpinnerAppearsAndDissappears()

    cy.get(measureComposer.fieldLevelError).should('contain.text', fieldLevelError)

    cy.get(measureComposer.cqlLibraryEditor).click()

    helper.verifySpinnerAppearsAndDissappears()

    cy.get(measureComposer.warningMessage).should('contain.text', 'The CQL does not conform to the ANTLR ' +
      'grammar: https://cql.hl7.org/grammar.html')
    cy.get(measureComposer.warningMessage).should('contain.text', 'Until the CQL conforms, the tabs on the ' +
      'left for Includes, ValueSets, Codes, Parameters, Definitions, and Functions will be disabled.')
    cy.get(measureComposer.warningMessage).should('contain.text', 'Commenting out offending defines and ' +
      'functions is an easy temporary fix.')

    cy.get(measurelibrary.measureLibraryTab).click()

    helper.verifySpinnerAppearsAndDissappears()

  })

})
