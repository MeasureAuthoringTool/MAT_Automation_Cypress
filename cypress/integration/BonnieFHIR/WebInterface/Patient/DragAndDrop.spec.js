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

        // helper.enabledWithTimeout(dashboard.uploadBtn)
        cy.get(dashboard.uploadBtn).click()

        //upload the file to the modal
        helper.visibleWithTimeout(importMeasureDialog.importMeasureDialog)
        const fileToUpload = "FHIRmeasureCMS347.zip"
        helper.enabledWithTimeout(importMeasureDialog.fileImportInput)

        cy.get(importMeasureDialog.fileImportInput).attachFile(fileToUpload)

        //wait for VSAC Key field to display for the user, and enter Key
        helper.visibleWithTimeout(importMeasureDialog.vsacApiKeyTextBox)
        helper.enabledWithTimeout(importMeasureDialog.vsacApiKeyTextBox)
        helper.enterText(importMeasureDialog.vsacApiKeyTextBox, '57d1a36d-c0f0-4f51-a1c0-4ae38e51806d')

        //click load button to import the measure
        helper.enabled(importMeasureDialog.importLoadBtn)
        helper.click(importMeasureDialog.importLoadBtn)

        //click and navigate to measure details
        cy.get(homePage.measure).contains('FHIRmeasureCMS347').click()
        // cy.wait(1000)
        cy.get(measureDetailsPage.measureDetailsTitle).should('have.text', ' Measure details')

        //click on add patient 
        cy.get(measureDetailsPage.addPatientBtn).click()

        //enter last name and first name 
        cy.get(testPatientPage.lastNameTextField).type('President')
        cy.get(testPatientPage.firstNameTextField).type('Current')

        cy.get(testPatientPage.patientDescriptionTextField).type('Patient is very special')
        cy.get(testPatientPage.dateofBithField).type('01/01/1950')
        cy.get(testPatientPage.patientDescriptionTextField).click()
        cy.get(testPatientPage.raceDropdown).select('Asian')
        cy.get(testPatientPage.genderDropdown).select('Male')
        cy.get(testPatientPage.ethnicityDropdown).select('Not Hispanic or Latino')

        helper.visibleWithTimeout(testPatientPage.elementsHeader)

        //criteria elements section
        cy.get(testPatientPage.elementsHeader).should('have.text', 'Elements')
        cy.get(testPatientPage.patientHistoryHeader).should('contain.text', 'Patient History')
       
        //drag and drop section
        cy.get(testPatientPage.criteriaElementsContainer).contains('care provision').click()

        //service request
        cy.get('.draggable').eq(0)
        .trigger('mousedown', { which: 1, pageX: 600, pageY: 100 })
        .trigger('mousemove', { which: 1, pageX: 1000, pageY: 100 })
        .trigger('mouseup')
        
        cy.get(testPatientPage.criteriaSectionTitle)
        .should('contain.text', 'Care Provision: ServiceRequest: Comfort Measures')

        //save
        cy.get(testPatientPage.saveBtn).click()

        //summary section
        cy.get(measureDetailsPage.newStatus).should('have.text', 'NEW')
        cy.get(measureDetailsPage.patientListing).should('have.text', '1')

        //status section
        cy.get(measureDetailsPage.patientStatusSection).should('contain.text', 'Pass')

        //navigate to test patient page
        helper.visibleWithTimeout(measureDetailsPage.patientExpandBtn)

        cy.get(measureDetailsPage.patientExpandBtn).click()
        cy.get(measureDetailsPage.patientEditBtn).click()

        //validate added criteria is visible
        cy.get(testPatientPage.criteriaSectionData).should('contain.text', 'Care Provision')

        //navigate to homepage
        cy.get(testPatientPage.measurePageNavigationBtn).click()

    })

})