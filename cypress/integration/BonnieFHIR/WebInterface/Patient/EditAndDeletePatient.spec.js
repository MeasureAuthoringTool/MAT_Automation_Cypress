import * as helper from '../../../../support/helpers'
import * as bonnieLogin from '../../../../support/BonnieFHIR/BonnieLoginLogout'
import * as dashboard from '../../../../pom/BonnieFHIR/WI/Dashboard'
import * as importMeasureDialog from '../../../../pom/BonnieFHIR/WI/ImportMeasureDialog'
import * as homePage from '../../../../pom/BonnieFHIR/WI/Homepage'
import * as measureDetailsPage from '../../../../pom/BonnieFHIR/WI/MeasureDetailsPage'
import * as testPatientPage from '../../../../pom/BonnieFHIR/WI/TestPatientPage'

describe('Patient: Create New Patient', () => {
    before('Login', () => {

        bonnieLogin.login()

    })
    
    after('Log Out', () => {

        bonnieLogin.logout()

    })

it('Edit Patient Details', () => {

    //click and navigate to measure details
    cy.get(homePage.measure).contains('CMS104_TEST').click()
    cy.get(measureDetailsPage.measureDetailsTitle).should('have.text', ' Measure details')

    //edit 
    cy.get(measureDetailsPage.patientExpandBtn).click()
    cy.get(measureDetailsPage.patientEditBtn).click()

    helper.visibleWithTimeout(testPatientPage.patientDescriptionTextField)

    cy.get(testPatientPage.patientDescriptionTextField).clear().type('He is recovered now')


    //deceased section

    //assert label
    cy.get(testPatientPage.livingStatusLabel).should('contain.text', 'Living Status')

    //check deceased
    cy.get(testPatientPage.deceasedCheckBox).check().then(() => {
        cy.get(testPatientPage.dateOfDeathLabel).should('have.text', 'Date of Death')

        cy.get(testPatientPage.deathDateField).should('be.visible')
        cy.get(testPatientPage.deathDateOptionalLabel).should('contain.text', 'optional')
        cy.get(testPatientPage.deathTimeField).should('be.visible')
        cy.get(testPatientPage.deathTimeOptionalLabel).should('contain.text', 'optional')

    })

    //enter death date and time
    cy.get(testPatientPage.deathDateField).clear().type('05/02/2020')
    cy.get(testPatientPage.deathTimeField).clear().type('10:30 PM')

    //uncheck deceased
    cy.get(testPatientPage.deceasedCheckBox).uncheck().then(() => {
        
        cy.get(testPatientPage.deathDateField).should('not.be.visible')
        
        cy.get(testPatientPage.deathTimeField).should('not.be.visible')
        
    })

    //save
    cy.get(testPatientPage.saveBtn).click()

    helper.visibleWithTimeout(measureDetailsPage.newStatus)

    //summary section
    cy.get(measureDetailsPage.newStatus).should('have.text', 'NEW')
    cy.get(measureDetailsPage.patientListing).should('have.text', '1')

    //status section
    cy.get(measureDetailsPage.patientStatusSection).should('contain.text', 'Pass')

    helper.visibleWithTimeout(measureDetailsPage.measurePageNavigationBtn)

    //navigate to home/measure page
    cy.get(measureDetailsPage.measurePageNavigationBtn).click()

})

it('Delete Patient Details', () => {

    //click and navigate to measure details
    cy.get(homePage.measure).contains('CMS104_TEST').click()
    cy.get(measureDetailsPage.measureDetailsTitle).should('have.text', ' Measure details')

    //delete patient
    cy.get(measureDetailsPage.patientExpandBtn).click()
    cy.get(measureDetailsPage.patientInverseBtn).click()
    cy.get(measureDetailsPage.patientDeleteBtn).click()
    
    helper.visibleWithTimeout(measureDetailsPage.measurePageNavigationBtn)

    //navigate to home/measure page
    cy.get(measureDetailsPage.measurePageNavigationBtn).click()

  })

})