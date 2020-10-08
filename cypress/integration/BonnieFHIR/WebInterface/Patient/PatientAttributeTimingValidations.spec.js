import * as helper from '../../../../support/helpers'
import * as bonnieLogin from '../../../../support/BonnieFHIR/BonnieLoginLogout'
import * as dashboard from '../../../../pom/BonnieFHIR/WI/Dashboard'
import * as bonnieUpload from '../../../../support/BonnieFHIR/BonnieUploadMeasure'
import * as bonnieDelete from '../../../../support/BonnieFHIR/DeleteMeasure'
import * as testPatientPage from '../../../../pom/BonnieFHIR/WI/TestPatientPage'
import * as bonnieDeletePatient from '../../../../support/BonnieFHIR/DeletePatient'

const fileToUpload = "TestImmun_v6_0_Artifacts.zip"
const todaysDate = Cypress.moment().format('MM/DD/YYYY')

describe('Valiidate DateTime for Attributes from Patient', () => {


  before('Login', () => {

    bonnieLogin.login()

  })
  after('Log Out', () => {
    bonnieDelete.DeleteMeasureFromBonnie("TestImmun")
    bonnieLogin.logout()

  })

  it('Successful Patient Clone', () => {

    //Validate that dashboard page is displayed to user
    helper.enabledWithTimeout(dashboard.uploadBtn)

    //Upload file that contains a patient
    bonnieUpload.UploadMeasureToBonnie(fileToUpload)

    //Click into the measure that was just uploaded
    cy.get(dashboard.measureNameDiv).each(function($el) {
      if ($el.text().includes("TestImmun")) {
        cy.wrap($el).click()
      }
    })

    //Validate that one patient exists for the measure and it has the below name
    //cy.get(testPatientPage.measureDetailsPagePatientNameDiv).should('have.length', 1).should('contain', 'President Current')

    //Click the arrow Btn to show the patient actions
    helper.click(testPatientPage.measureDetailsPatientArrowBtn)

    //Click the Edit button For the patient
    helper.click(testPatientPage.measureDetailsPatientEditBtn)

    //criteria elements section
    helper.verifySpinnerAppearsAndDissappears()
    cy.get(testPatientPage.elementsHeader).should('have.text', 'Elements')

    //drag and drop financial support attribute
    cy.get(testPatientPage.elementTitle).contains('financial support').click()

    //service request
    cy.get('.draggable').eq(1)
      .trigger('mousedown', { which: 1, pageX: 600, pageY: 100 })
      .trigger('mousemove', { which: 1, pageX: 1000, pageY: 100 })
      .trigger('mouseup')

    //get Start Date from generated control and validate the date
    helper.verifySpinnerAppearsAndDissappears()
    cy.get(testPatientPage.startDate).should('have.value', todaysDate)

    //Get Start time and validate it equals 8am
    cy.get(testPatientPage.startTime).should('have.value', "8:00 AM")

    //Get end Date and validate the data
    cy.get(testPatientPage.endDate).should('have.value', todaysDate)

    //Get the End time and validate the end time
    cy.get(testPatientPage.endTime).should('have.value', "8:15 AM")

    //Delete attribute now that it has been validated
    helper.click(testPatientPage.patientinverseDangerButton)
    helper.click(testPatientPage.attributeDeleteButton)

    //drag and drop financial support attribute
    cy.get(testPatientPage.elementTitle).contains('management').click()

    //service request
    cy.get('.draggable').eq(2)
      .trigger('mousedown', { which: 1, pageX: 600, pageY: 100 })
      .trigger('mousemove', { which: 1, pageX: 1000, pageY: 100 })
      .trigger('mouseup')

    //get Start Date from generated control and validate the date
    helper.verifySpinnerAppearsAndDissappears()
    cy.get(testPatientPage.startDate).should('have.value', todaysDate)

    //Get Start time and validate it equals 8am
    cy.get(testPatientPage.startTime).should('have.value', "8:00 AM")

    //Get end Date and validate the data
    cy.get(testPatientPage.endDate).should('have.value', todaysDate)

    //Get the End time and validate the end time
    cy.get(testPatientPage.endTime).should('have.value', "8:15 AM")

    //Delete attribute now that it has been validated
    helper.click(testPatientPage.patientinverseDangerButton)
    helper.click(testPatientPage.attributeDeleteButton)

    //drag and drop financial support attribute
    cy.get(testPatientPage.elementTitle).contains('medications').click()

    //service request
    cy.get('.draggable').eq(5)
      .trigger('mousedown', { which: 1, pageX: 600, pageY: 100 })
      .trigger('mousemove', { which: 1, pageX: 1000, pageY: 100 })
      .trigger('mouseup')

    //get Start Date from generated control and validate the date
    helper.verifySpinnerAppearsAndDissappears()
    cy.get(testPatientPage.dateGeneric).eq(0).should('have.value', todaysDate)

    //Get Start time and validate it equals 8am
    cy.get(testPatientPage.timeGeneric).should('have.value', "8:00 AM")

    //Get end Date and validate the data
    cy.get(testPatientPage.dateGeneric).eq(1).should('have.value', todaysDate)

    //Delete attribute now that it has been validated
    helper.click(testPatientPage.patientinverseDangerButton)
    helper.click(testPatientPage.attributeDeleteButton)

    //Click save button for patient to proceed back to measure details
    helper.click(testPatientPage.saveBtn)

  })

})