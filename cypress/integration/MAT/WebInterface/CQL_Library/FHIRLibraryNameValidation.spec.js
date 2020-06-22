import * as helper from '../../../../support/helpers'
import * as measurelibrary from '../../../../pom/MAT/WI/MeasureLibrary'
import * as cqlLibrary from '../../../../pom/MAT/WI/CqlLibrary'
import * as oktaLogin from '../../../../support/oktaLogin'
import * as cqlComposer from "../../../../pom/MAT/WI/CQLComposer";
import * as createNewCqlLibrary from "../../../../pom/MAT/WI/CreateNewCQLLibrary"

let firstCharacterLowerCase = ''
let firstCharacterUnderscore = ''
let firstCharacterNumeric = ''
let nameWithSpecialSymbols = ''
let nameWithSpaces = ''
let firstCharacterUpperCase = ''
let firstCharacterUpperCaseFollowedAlphaNumeric = ''
let firstCharacterUpperCaseFollowedUnderscore = ''

describe('FHIR Library: Validate the library naming rules', () => {
    before('Login', () => {
        oktaLogin.login()

    })
    beforeEach('Preserve Cookies', () => {
        helper.preserveCookies()
    })
    after('Log Out', () => {
        helper.logout()
    })

    it('Validate the FHIR name requirement: Incorrect First character', () => {

        firstCharacterLowerCase = 'newFhir' + Date.now()
        firstCharacterUnderscore = '_newFhir' + Date.now()
        firstCharacterNumeric = '001New' + Date.now()

        cy.get(measurelibrary.cqlLibraryTab).click()

        helper.verifySpinnerAppearsAndDissappears()

        helper.enabledWithTimeout(cqlLibrary.newLibraryBtn)
        cy.get(cqlLibrary.newLibraryBtn).click()

        cy.get(createNewCqlLibrary.cqlLibraryName).type(firstCharacterLowerCase, { delay: 50 })

        cy.get(createNewCqlLibrary.modelFHIRRadio).click()

        cy.get(createNewCqlLibrary.saveAndContinueBtn).click()

        cy.get(cqlComposer.warningMessage).should('have.text', ' Invalid Library Name. Library names must start with an upper case letter, followed by an alpha-numeric character(s) or underscore(s), and must not contain spaces.')

        cy.get(createNewCqlLibrary.cqlLibraryName).clear().type(firstCharacterUnderscore, { delay: 50 })

        cy.get(createNewCqlLibrary.modelFHIRRadio).click()

        cy.get(createNewCqlLibrary.saveAndContinueBtn).click()

        cy.get(cqlComposer.warningMessage).should('have.text', ' Invalid Library Name. Library names must start with an upper case letter, followed by an alpha-numeric character(s) or underscore(s), and must not contain spaces.')

        cy.get(createNewCqlLibrary.cqlLibraryName).clear().type(firstCharacterNumeric, { delay: 50 })

        cy.get(createNewCqlLibrary.modelFHIRRadio).click()

        cy.get(createNewCqlLibrary.saveAndContinueBtn).click()

        cy.get(cqlComposer.warningMessage).should('have.text', ' Invalid Library Name. Library names must start with an upper case letter, followed by an alpha-numeric character(s) or underscore(s), and must not contain spaces.')

        cy.get(createNewCqlLibrary.cancelBtn).click()

        helper.verifySpinnerAppearsAndDissappears()
        helper.verifySpinnerAppearsAndDissappears()

        cy.get(measurelibrary.measureLibraryTab).click()

        helper.verifySpinnerAppearsAndDissappears()

    })

    it('Validate the FHIR name requirement: Incorrect format', () => {

        nameWithSpecialSymbols = 'NewFhir@' + Date.now()
        nameWithSpaces = 'New Fhir' + Date.now()

        cy.get(measurelibrary.cqlLibraryTab).click()

        helper.verifySpinnerAppearsAndDissappears()

        helper.enabledWithTimeout(cqlLibrary.newLibraryBtn)
        cy.get(cqlLibrary.newLibraryBtn).click()

        cy.get(createNewCqlLibrary.cqlLibraryName).type(nameWithSpecialSymbols, { delay: 50 })

        cy.get(createNewCqlLibrary.modelFHIRRadio).click()

        cy.get(createNewCqlLibrary.saveAndContinueBtn).click()

        cy.get(cqlComposer.warningMessage).should('have.text', ' Invalid Library Name. Library names must start with an upper case letter, followed by an alpha-numeric character(s) or underscore(s), and must not contain spaces.')

        cy.get(createNewCqlLibrary.cqlLibraryName).clear().type(nameWithSpaces, { delay: 50 })

        cy.get(createNewCqlLibrary.modelFHIRRadio).click()

        cy.get(createNewCqlLibrary.saveAndContinueBtn).click()

        cy.get(cqlComposer.warningMessage).should('have.text', ' Invalid Library Name. Library names must start with an upper case letter, followed by an alpha-numeric character(s) or underscore(s), and must not contain spaces.')

        cy.get(createNewCqlLibrary.cancelBtn).click()

        helper.verifySpinnerAppearsAndDissappears()
        helper.verifySpinnerAppearsAndDissappears()

        cy.get(measurelibrary.measureLibraryTab).click()

        helper.verifySpinnerAppearsAndDissappears()

    })

    it('Successfully create a FHIR Library with Start with an Upper Case', () => {

        firstCharacterUpperCase = 'NewFhirLibrary' + Date.now()

        cy.get(measurelibrary.cqlLibraryTab).click()

        helper.verifySpinnerAppearsAndDissappears()

        helper.enabledWithTimeout(cqlLibrary.newLibraryBtn)
        cy.get(cqlLibrary.newLibraryBtn).click()

        cy.get(createNewCqlLibrary.cqlLibraryName).type(firstCharacterUpperCase, { delay: 50 })

        cy.get(createNewCqlLibrary.modelFHIRRadio).click()

        cy.get(createNewCqlLibrary.saveAndContinueBtn).click()

        cy.get(cqlComposer.confirmationContinueBtn).click()

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(measurelibrary.measureLibraryTab).click()

        helper.verifySpinnerAppearsAndDissappears()

    })

    it('Successfully create a FHIR Library with Start with an Upper Case, followed by alpha-numeric', () => {

        firstCharacterUpperCaseFollowedAlphaNumeric = 'NewFhir001Library' + Date.now()

        cy.get(measurelibrary.cqlLibraryTab).click()

        helper.verifySpinnerAppearsAndDissappears()

        helper.enabledWithTimeout(cqlLibrary.newLibraryBtn)
        cy.get(cqlLibrary.newLibraryBtn).click()

        cy.get(createNewCqlLibrary.cqlLibraryName).type(firstCharacterUpperCaseFollowedAlphaNumeric, { delay: 50 })

        cy.get(createNewCqlLibrary.modelFHIRRadio).click()

        cy.get(createNewCqlLibrary.saveAndContinueBtn).click()

        cy.get(cqlComposer.confirmationContinueBtn).click()

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(measurelibrary.measureLibraryTab).click()

        helper.verifySpinnerAppearsAndDissappears()

    })

    it('Successfully create a FHIR Library with Start with an Upper Case, followed by underscore', () => {

        firstCharacterUpperCaseFollowedUnderscore = 'New_Fhir_Library' + Date.now()

        cy.get(measurelibrary.cqlLibraryTab).click()

        helper.verifySpinnerAppearsAndDissappears()

        helper.enabledWithTimeout(cqlLibrary.newLibraryBtn)
        cy.get(cqlLibrary.newLibraryBtn).click()

        cy.get(createNewCqlLibrary.cqlLibraryName).type(firstCharacterUpperCaseFollowedUnderscore, { delay: 50 })

        cy.get(createNewCqlLibrary.modelFHIRRadio).click()

        cy.get(createNewCqlLibrary.saveAndContinueBtn).click()

        cy.get(cqlComposer.confirmationContinueBtn).click()

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(measurelibrary.measureLibraryTab).click()

        helper.verifySpinnerAppearsAndDissappears()

    })
})