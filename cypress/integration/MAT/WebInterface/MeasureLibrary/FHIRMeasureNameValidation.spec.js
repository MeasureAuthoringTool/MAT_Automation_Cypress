import * as helper from '../../../../support/helpers'
import * as oktaLogin from '../../../../support/oktaLogin'
import * as createNewMeasure from "../../../../pom/MAT/WI/createNewMeasure"
import * as measurelibrary from "../../../../pom/MAT/WI/MeasureLibrary"
import * as measureComposer from "../../../../pom/MAT/WI/MeasureComposer"
import * as measureDetails from '../../../../pom/MAT/WI/MeasureDetails'
import { describe } from 'mocha'

let name = ''
let cqlLibraryName = ''
let nameWithUnderscore = ''


describe('FHIR Measure: Validate the naming rules', () => {

    before('Login', () => {
        oktaLogin.login()

    })
    beforeEach('Preserve Cookies', () => {
        helper.preserveCookies()
    })
    after('Log Out', () => {
        helper.logout()
    })

    it('Validate the FHIR measure name requirement: Error message for underscore', () => {

        nameWithUnderscore = 'New_Fhir' + Date.now()
        cqlLibraryName = 'CQLlibrary' + Date.now()

        //special symbols
        helper.enabledWithTimeout(measurelibrary.newMeasureButton)
        cy.get(measurelibrary.newMeasureButton).click()

        cy.get(createNewMeasure.measureName).type(nameWithUnderscore, { delay: 50 })

        cy.get(createNewMeasure.modelradioFHIR).click()

        cy.get(createNewMeasure.cqlLibraryName).type(cqlLibraryName, { delay: 50 })
        cy.get(createNewMeasure.shortName).type(cqlLibraryName, { delay: 50 })

        cy.get(createNewMeasure.measureScoringListBox).select('Proportion')
        cy.get(createNewMeasure.patientBasedMeasureListBox).select('Yes')

        cy.get(createNewMeasure.saveAndContinueBtn).click()

        cy.get(measurelibrary.warningMessage).should('contain.text', "Measure Name must not contain '_' (underscores).")

        cy.get(createNewMeasure.cancelBtn).click()

        helper.verifySpinnerAppearsAndDissappears()

    })

})
 
describe('Measure Conversion with incorrect measure name format', () => {

    before('Login', () => {
        oktaLogin.login()

    })
    beforeEach('Preserve Cookies', () => {
        helper.preserveCookies()
    })
    after('Log Out', () => {
        helper.logout()
    })

    it('Fhir measure name format: Validate the incorrect error message on measure details page', () => {

        name = 'New_Measure_Fhir' + Date.now()
        cqlLibraryName = 'CQLlibrary' + Date.now()

        //qdm measure with incorrect cql library name format
        helper.enabledWithTimeout(measurelibrary.newMeasureButton)
        cy.get(measurelibrary.newMeasureButton).click()

        cy.get(createNewMeasure.measureName).type(name, { delay: 50 })

        cy.get(createNewMeasure.modelradioQDM).click()

        cy.get(createNewMeasure.cqlLibraryName).type(cqlLibraryName, { delay: 50 })
        cy.get(createNewMeasure.shortName).type(cqlLibraryName, { delay: 50 })

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

        cy.get(measurelibrary.row1MeasureSearch).click();

        cy.get(measurelibrary.createVersionDraftMeasureSearchBtn).click();
        cy.get(measurelibrary.majorVersionTypeRadio).click();
        cy.get(measurelibrary.packageAndVersion).click();

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(measurelibrary.continueBtn).click();

        helper.verifySpinnerAppearsAndDissappears()
        helper.verifySpinnerAppearsAndDissappears()

        //convert to FHIR measure
        helper.visibleWithTimeout(measurelibrary.row1MeasureSearch)
        cy.get(measurelibrary.row1MeasureSearch).click();
        cy.get(measurelibrary.convertToFhirMeasureSearchBtn).click();

        helper.verifySpinnerAppearsAndDissappears()
        helper.verifySpinnerAppearsAndDissappears()
        helper.verifySpinnerAppearsAndDissappears()

        helper.visibleWithTimeout(measurelibrary.row1MeasureSearch)
        cy.get(measurelibrary.row1MeasureSearch).dblclick();

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(measureDetails.saveBtn).click()

        helper.verifySpinnerAppearsAndDissappears()
        helper.verifySpinnerAppearsAndDissappears()

        cy.get(measureComposer.warningMessage).should('contain.text', "Measure Name must not contain '_' (underscores).")

        cy.get(measurelibrary.measureLibraryTab).click()
    
        helper.verifySpinnerAppearsAndDissappears()

    })

})

describe('Measure Conversion with incorrect measure name and CQL library name format', () => {

    before('Login', () => {
        oktaLogin.login()

    })
    beforeEach('Preserve Cookies', () => {
        helper.preserveCookies()
    })
    after('Log Out', () => {
        helper.logout()
    })

    it('Fhir measure name format: Validate the incorrect error message on measure details page', () => {

        name = 'New_Measure_Fhir' + Date.now()
        cqlLibraryName = 'CQL_library' + Date.now()

        //qdm measure with incorrect cql library name format
        helper.enabledWithTimeout(measurelibrary.newMeasureButton)
        cy.get(measurelibrary.newMeasureButton).click()

        cy.get(createNewMeasure.measureName).type(name, { delay: 50 })

        cy.get(createNewMeasure.modelradioQDM).click()

        cy.get(createNewMeasure.cqlLibraryName).type(cqlLibraryName, { delay: 50 })
        cy.get(createNewMeasure.shortName).type(cqlLibraryName, { delay: 50 })

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

        cy.get(measurelibrary.row1MeasureSearch).click();

        cy.get(measurelibrary.createVersionDraftMeasureSearchBtn).click();
        cy.get(measurelibrary.majorVersionTypeRadio).click();
        cy.get(measurelibrary.packageAndVersion).click();

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(measurelibrary.continueBtn).click();

        helper.verifySpinnerAppearsAndDissappears()
        helper.verifySpinnerAppearsAndDissappears()

        //convert to FHIR measure
        helper.visibleWithTimeout(measurelibrary.row1MeasureSearch)
        cy.get(measurelibrary.row1MeasureSearch).click();
        cy.get(measurelibrary.convertToFhirMeasureSearchBtn).click();

        helper.verifySpinnerAppearsAndDissappears()
        helper.verifySpinnerAppearsAndDissappears()
        helper.verifySpinnerAppearsAndDissappears()

        helper.visibleWithTimeout(measurelibrary.row1MeasureSearch)
        cy.get(measurelibrary.row1MeasureSearch).dblclick();

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(measureDetails.saveBtn).click()

        helper.verifySpinnerAppearsAndDissappears()
        helper.verifySpinnerAppearsAndDissappears()

        cy.get(measureComposer.warningMessage).should('contain.text', "Measure Name must not contain '_' (underscores).")
        .and('contain.text', "Invalid Library Name. Library names must start with an upper case letter, followed by an alpha-numeric character(s) and must not contain spaces or  '_' (underscores).")

        cy.get(measurelibrary.measureLibraryTab).click()
    
        helper.verifySpinnerAppearsAndDissappears()

    })

})