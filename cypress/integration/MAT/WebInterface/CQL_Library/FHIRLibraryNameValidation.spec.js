import * as helper from '../../../../support/helpers'
import * as measurelibrary from '../../../../pom/MAT/WI/MeasureLibrary'
import * as cqlLibrary from '../../../../pom/MAT/WI/CqlLibrary'
import * as cqlComposer from '../../../../pom/MAT/WI/CQLComposer'
import * as createNewCqlLibrary from '../../../../pom/MAT/WI/CreateNewCQLLibrary'
import * as login from '../../../../support/MAT/Login'
import { selectLibraryModelRadioBtn } from '../../../../pom/MAT/WI/CreateNewCQLLibrary'

let firstCharacterLowerCase = ''
let firstCharacterUnderscore = ''
let firstCharacterNumeric = ''
let nameWithSpecialSymbols = ''
let nameWithSpaces = ''
let nameWithUnderscore = ''
let firstCharacterUpperCase = ''
let firstCharacterUpperCaseFollowedAlphaNumeric = ''
let fieldLevelError = ' Invalid Library Name. Library names must start with an upper case letter, followed by ' +
  'alpha-numeric character(s) and must not contain spaces, \'_\' (underscores), or other special characters.'

describe('FHIR Library: Validate the library naming rules', () => {
  beforeEach('Login', () => {
    login.matLogin()

    cy.get(measurelibrary.cqlLibraryTab).click()

    helper.verifySpinnerAppearsAndDissappears()

    helper.visibleWithTimeout(cqlLibrary.row1CqlLibrarySearch)

  })
  afterEach('Log Out', () => {
    helper.verifySpinnerAppearsAndDissappears()
    login.matLogout()
  })

  it('Validate the FHIR name requirement: Incorrect First character', () => {

    firstCharacterLowerCase = 'newFhir' + Date.now()
    firstCharacterUnderscore = '_newFhir' + Date.now()
    firstCharacterNumeric = '001New' + Date.now()


    helper.enabledWithTimeout(cqlLibrary.newLibraryBtn)
    cy.get(cqlLibrary.newLibraryBtn).click()

    cy.get(createNewCqlLibrary.cqlLibraryName).type(firstCharacterLowerCase, { delay: 50 })

    cy.get(createNewCqlLibrary.selectLibraryModelRadioBtn).eq(0).click()

    cy.get(createNewCqlLibrary.saveAndContinueBtn).click()

    cy.get(cqlComposer.fieldLevelError).should('contain.text', fieldLevelError)

    cy.get(createNewCqlLibrary.cqlLibraryName).clear().type(firstCharacterUnderscore, { delay: 50 })

    cy.get(createNewCqlLibrary.selectLibraryModelRadioBtn).eq(0).click()

    cy.get(createNewCqlLibrary.saveAndContinueBtn).click()

    cy.get(cqlComposer.fieldLevelError).should('contain.text', fieldLevelError)

    cy.get(createNewCqlLibrary.cqlLibraryName).clear().type(firstCharacterNumeric, { delay: 50 })

    cy.get(createNewCqlLibrary.selectLibraryModelRadioBtn).eq(0).click()

    cy.get(createNewCqlLibrary.saveAndContinueBtn).click()

    cy.get(cqlComposer.fieldLevelError).should('contain.text', fieldLevelError)

    cy.get(createNewCqlLibrary.cancelBtn).click()

    helper.verifySpinnerAppearsAndDissappears()
    helper.verifySpinnerAppearsAndDissappears()

  })

  it('Validate the FHIR name requirement: Incorrect format', () => {

    nameWithSpecialSymbols = 'NewFhir@' + Date.now()
    nameWithSpaces = 'New Fhir' + Date.now()
    nameWithUnderscore = 'New_Fhir' + Date.now()

    helper.verifySpinnerAppearsAndDissappears()

    helper.enabledWithTimeout(cqlLibrary.newLibraryBtn)
    cy.get(cqlLibrary.newLibraryBtn).click()

    cy.get(createNewCqlLibrary.cqlLibraryName).type(nameWithSpecialSymbols, { delay: 50 })

    cy.get(createNewCqlLibrary.selectLibraryModelRadioBtn).eq(0).click()

    cy.get(createNewCqlLibrary.saveAndContinueBtn).click()

    cy.get(cqlComposer.fieldLevelError).should('contain.text', fieldLevelError)

    cy.get(createNewCqlLibrary.cqlLibraryName).clear().type(nameWithSpaces, { delay: 50 })

    cy.get(createNewCqlLibrary.selectLibraryModelRadioBtn).eq(0).click()

    cy.get(createNewCqlLibrary.saveAndContinueBtn).click()

    cy.get(cqlComposer.fieldLevelError).should('contain.text', fieldLevelError)

    cy.get(createNewCqlLibrary.cqlLibraryName).clear().type(nameWithUnderscore, { delay: 50 })

    cy.get(createNewCqlLibrary.selectLibraryModelRadioBtn).eq(0).click()

    cy.get(createNewCqlLibrary.saveAndContinueBtn).click()

    cy.get(cqlComposer.fieldLevelError).should('contain.text', fieldLevelError)

    cy.get(createNewCqlLibrary.cancelBtn).click()

    helper.verifySpinnerAppearsAndDissappears()
    helper.verifySpinnerAppearsAndDissappears()

  })

  it('Successfully create a FHIR Library with Start with an Upper Case', () => {

    firstCharacterUpperCase = 'NewFhirLibrary' + Date.now()

    helper.verifySpinnerAppearsAndDissappears()

    helper.enabledWithTimeout(cqlLibrary.newLibraryBtn)
    cy.get(cqlLibrary.newLibraryBtn).click()

    cy.get(createNewCqlLibrary.cqlLibraryName).type(firstCharacterUpperCase, { delay: 50 })

    cy.get(createNewCqlLibrary.selectLibraryModelRadioBtn).eq(0).click()

    cy.get(createNewCqlLibrary.saveAndContinueBtn).click()

    cy.get(cqlComposer.confirmationContinueBtn).click()

    helper.verifySpinnerAppearsAndDissappears()

    cy.get(measurelibrary.cqlLibraryTab).click()

    helper.verifySpinnerAppearsAndDissappears()
    helper.verifySpinnerAppearsAndDissappears()

  })

  it('Successfully create a FHIR Library with Start with an Upper Case, followed by alpha-numeric', () => {

    firstCharacterUpperCaseFollowedAlphaNumeric = 'NewFhir001Library' + Date.now()

    helper.verifySpinnerAppearsAndDissappears()

    helper.enabledWithTimeout(cqlLibrary.newLibraryBtn)
    cy.get(cqlLibrary.newLibraryBtn).click()

    cy.get(createNewCqlLibrary.cqlLibraryName).type(firstCharacterUpperCaseFollowedAlphaNumeric, { delay: 50 })

    cy.get(createNewCqlLibrary.selectLibraryModelRadioBtn).eq(0).click()

    cy.get(createNewCqlLibrary.saveAndContinueBtn).click()

    cy.get(cqlComposer.confirmationContinueBtn).click()

    helper.verifySpinnerAppearsAndDissappears()

    cy.get(measurelibrary.cqlLibraryTab).click()

    helper.verifySpinnerAppearsAndDissappears()
    helper.verifySpinnerAppearsAndDissappears()

  })
})
