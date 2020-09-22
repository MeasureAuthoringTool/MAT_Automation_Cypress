import * as helper from '../../../../support/helpers'
import * as bonnieLogin from '../../../../support/BonnieFHIR/BonnieLoginLogout'
import * as dashboard from '../../../../pom/BonnieFHIR/WI/Dashboard'
import * as importMeasureDialog from '../../../../pom/BonnieFHIR/WI/ImportMeasureDialog'
import * as homePage from '../../../../pom/BonnieFHIR/WI/Homepage'
import * as measureDetailsPage from '../../../../pom/BonnieFHIR/WI/MeasureDetailsPage'
import * as testPatientPage from '../../../../pom/BonnieFHIR/WI/TestPatientPage'

let VsacApiKey = Cypress.env('VSAC_API_KEY')


describe('Patient: Create New Patient', () => {
    before('Login', () => {

        bonnieLogin.login()

    })
    after('Log Out', () => {

        bonnieLogin.logout()

    })

    it('Successful Patient creation: Basic Information Only', () => {

        helper.enabledWithTimeout(dashboard.uploadBtn)
        cy.get(dashboard.uploadBtn).click()

        //upload the file to the modal
        helper.visibleWithTimeout(importMeasureDialog.importMeasureDialog)
        const fileToUpload = "CMS104.zip"
        helper.enabledWithTimeout(importMeasureDialog.fileImportInput)

        cy.get(importMeasureDialog.fileImportInput).attachFile(fileToUpload)

        //wait for VSAC Key field to display for the user, and enter Key
        helper.visibleWithTimeout(importMeasureDialog.vsacApiKeyTextBox)
        helper.enabledWithTimeout(importMeasureDialog.vsacApiKeyTextBox)
        helper.enterText(importMeasureDialog.vsacApiKeyTextBox, VsacApiKey)

        //click load button to import the measure
        helper.enabled(importMeasureDialog.importLoadBtn)
        helper.click(importMeasureDialog.importLoadBtn)

        //click and navigate to measure details
        cy.get(homePage.measure).contains('CMS104_TEST').click()
        // cy.wait(1000)
        cy.get(measureDetailsPage.measureDetailsTitle).should('have.text', ' Measure details')

        //click on add patient 
        cy.get(measureDetailsPage.addPatientBtn).click()


        //verify warning message for required field
        cy.get(testPatientPage.saveBtn).click()
        cy.get(testPatientPage.warningAlert).should('have.text', 'Name fields cannot be blank; Date of birth cannot be blank')

        //enter last name and first name 
        cy.get(testPatientPage.lastNameTextField).type('President')
        cy.get(testPatientPage.firstNameTextField).type('Current')

        cy.get(testPatientPage.patientDescriptionTextField).type('Patient is very special')
        cy.get(testPatientPage.dateofBithField).type('01/01/1950')
        cy.get(testPatientPage.patientDescriptionTextField).click()
        cy.get(testPatientPage.raceDropdown).select('Asian')
        cy.get(testPatientPage.genderDropdown).select('Male')
        cy.get(testPatientPage.ethnicityDropdown).select('Not Hispanic or Latino')

        //save
        cy.get(testPatientPage.saveBtn).click()

        //summary section
        cy.get(measureDetailsPage.newStatus).should('have.text', 'NEW')
        cy.get(measureDetailsPage.patientListing).should('have.text', '1')

        //status section
        cy.get(measureDetailsPage.patientStatusSection).should('contain.text', 'Pass')

        //navigate to home/measure page
        cy.get(measureDetailsPage.measurePageNavigationBtn).click()

    })

})