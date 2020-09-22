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
    cy.get(measureDetailsPage.patientDeleteBtn).contains('Delete').click()
    
    helper.visibleWithTimeout(measureDetailsPage.measurePageNavigationBtn)

    //navigate to home/measure page
    cy.get(measureDetailsPage.measurePageNavigationBtn).click()

  })

})

// describe('Deleting measure', () => {

//     it('Delete Patient Details', () => {

//     //click and navigate to measure details
//     cy.get(homePage.measure).contains('CMS104_TEST').click()
//     // cy.wait(1000)
//     cy.get(measureDetailsPage.measureDetailsTitle).should('have.text', ' Measure details')

//     //delete measure
//     cy.get(measureDetailsPage.settingBtn).click()
//     cy.get(measureDetailsPage.measureInverseBtn).click()
//     cy.get(measureDetailsPage.measureDeleteBtn).click()

//     helper.visibleWithTimeout(measureDetailsPage.measurePageNavigationBtn)

    // //navigate to home/measure page
    // cy.get(measureDetailsPage.measurePageNavigationBtn).click()
// })
// })