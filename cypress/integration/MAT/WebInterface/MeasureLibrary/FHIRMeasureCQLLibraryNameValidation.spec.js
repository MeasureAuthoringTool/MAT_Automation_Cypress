import * as helper from '../../../../support/helpers'
import * as oktaLogin from '../../../../support/oktaLogin'
import * as createNewMeasure from "../../../../pom/MAT/WI/createNewMeasure"
import * as measurelibrary from "../../../../pom/MAT/WI/MeasureLibrary"
import * as measureComposer from "../../../../pom/MAT/WI/MeasureComposer"
import * as gridRowActions from '../../../../support/MAT/GridRowActions'

let firstCharacterLowerCase = ''
let firstCharacterUnderscore = ''
let firstCharacterNumeric = ''
let nameWithSpecialSymbols = ''
let nameWithSpaces = ''
let nameWithUnderscore = ''
let name = ''

describe('FHIR Measure: Validate the CQL library naming rules', () => {

    before('Login', () => {
        oktaLogin.login()

    })
    beforeEach('Preserve Cookies', () => {
        helper.preserveCookies()
    })
    after('Log Out', () => {
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

        cy.get(createNewMeasure.measureName).type(name, { delay: 50 })

        cy.get(createNewMeasure.modelradioFHIR).click()

        cy.get(createNewMeasure.cqlLibraryName).type(firstCharacterLowerCase, { delay: 50 })
        cy.get(createNewMeasure.shortName).type(name, { delay: 50 })

        cy.get(createNewMeasure.measureScoringListBox).select('Proportion')
        cy.get(createNewMeasure.patientBasedMeasureListBox).select('Yes')

        cy.get(createNewMeasure.saveAndContinueBtn).click()

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(measurelibrary.warningMessage).should('contain.text', "Invalid Library Name. Library names must start with an upper case letter, followed by an alpha-numeric character(s) and must not contain spaces or  '_' (underscores).")

        //underscore for first character
        cy.get(createNewMeasure.cqlLibraryName).clear().type(firstCharacterUnderscore, { delay: 50 })

        cy.get(createNewMeasure.saveAndContinueBtn).click()

        cy.get(measurelibrary.warningMessage).should('contain.text', "Invalid Library Name. Library names must start with an upper case letter, followed by an alpha-numeric character(s) and must not contain spaces or  '_' (underscores).")

        //number for first character
        cy.get(createNewMeasure.cqlLibraryName).clear().type(firstCharacterNumeric, { delay: 50 })

        cy.get(createNewMeasure.saveAndContinueBtn).click()

        cy.get(measurelibrary.warningMessage).should('contain.text', "Invalid Library Name. Library names must start with an upper case letter, followed by an alpha-numeric character(s) and must not contain spaces or  '_' (underscores).")

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

        cy.get(createNewMeasure.measureName).type(name, { delay: 50 })

        cy.get(createNewMeasure.modelradioFHIR).click()

        cy.get(createNewMeasure.cqlLibraryName).type(nameWithSpecialSymbols, { delay: 50 })
        cy.get(createNewMeasure.shortName).type(name, { delay: 50 })

        cy.get(createNewMeasure.measureScoringListBox).select('Proportion')
        cy.get(createNewMeasure.patientBasedMeasureListBox).select('Yes')

        cy.get(createNewMeasure.saveAndContinueBtn).click()

        cy.get(measurelibrary.warningMessage).should('contain.text', "Invalid Library Name. Library names must start with an upper case letter, followed by an alpha-numeric character(s) and must not contain spaces or  '_' (underscores).")

        //spaces
        cy.get(createNewMeasure.cqlLibraryName).clear().type(nameWithSpaces, { delay: 50 })

        cy.get(createNewMeasure.saveAndContinueBtn).click()

        cy.get(measurelibrary.warningMessage).should('contain.text', "Invalid Library Name. Library names must start with an upper case letter, followed by an alpha-numeric character(s) and must not contain spaces or  '_' (underscores).")

        //underscore
        cy.get(createNewMeasure.cqlLibraryName).clear().type(nameWithUnderscore, { delay: 50 })

        cy.get(createNewMeasure.saveAndContinueBtn).click()

        cy.get(measurelibrary.warningMessage).should('contain.text', "Invalid Library Name. Library names must start with an upper case letter, followed by an alpha-numeric character(s) and must not contain spaces or  '_' (underscores).")

        cy.get(createNewMeasure.cancelBtn).click()

        helper.verifySpinnerAppearsAndDissappears()

    })

    it('Validate the FHIR CQL Library name requirement: Correct format with alpha-numeric', () => {

        name = 'NewFhirMeasureCQLLibrary001' + Date.now()
        
        //correct format
        helper.enabledWithTimeout(measurelibrary.newMeasureButton)
        cy.get(measurelibrary.newMeasureButton).click()

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

    before('Login', () => {
        oktaLogin.login()

    })
    beforeEach('Preserve Cookies', () => {
        helper.preserveCookies()
    })
    after('Log Out', () => {
        helper.logout()
    })

    it('CQL Library name format: Validate the incorrect error message on CQL Workspace', () => {

        name = 'NewMeasureCQLLibrary001' + Date.now()
        firstCharacterLowerCase = 'newMeasure' + Date.now()

        //qdm measure with incorrect cql library name format
        helper.enabledWithTimeout(measurelibrary.newMeasureButton)
        cy.get(measurelibrary.newMeasureButton).click()

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
        cy.get(measurelibrary.searchBtn).click();

        helper.verifySpinnerAppearsAndDissappears()

        gridRowActions.selectRow(measurelibrary.row1MeasureSearch)

        cy.get(measurelibrary.createVersionDraftMeasureSearchBtn).click();
        cy.get(measurelibrary.majorVersionTypeRadio).click();
        cy.get(measurelibrary.packageAndVersion).click();

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(measurelibrary.continueBtn).click();

        helper.verifySpinnerAppearsAndDissappears()
        helper.verifySpinnerAppearsAndDissappears()

        //convert to FHIR measure
        helper.visibleWithTimeout(measurelibrary.row1MeasureSearch)
        gridRowActions.selectRow(measurelibrary.row1MeasureSearch)
        cy.get(measurelibrary.convertToFhirMeasureSearchBtn).click();

        helper.verifySpinnerAppearsAndDissappears()
        helper.verifySpinnerAppearsAndDissappears()
        helper.verifySpinnerAppearsAndDissappears()

        helper.visibleWithTimeout(measurelibrary.row1MeasureSearch)
        gridRowActions.doubleClickRow(measurelibrary.row1MeasureSearch)

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(measureComposer.cqlWorkspace).click()

        cy.get(measureComposer.saveBtnGeneralInfo).click()

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(measureComposer.warningMessage).should('contain.text', "Invalid Library Name. Library names must start with an upper case letter, followed by an alpha-numeric character(s) and must not contain spaces or  '_' (underscores).")

        cy.get(measureComposer.cqlLibraryEditor).click()

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(measureComposer.warningMessage).should('contain.text', ' You are viewing the CQL file with validation errors. Errors are marked with a red square on the line number. Please correct the syntax errors so the CQL can be validated.')

        cy.get(measurelibrary.measureLibraryTab).click()
    
        helper.verifySpinnerAppearsAndDissappears()

    })

})