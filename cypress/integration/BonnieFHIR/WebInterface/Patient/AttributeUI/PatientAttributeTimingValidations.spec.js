import * as helper from '../../../../../support/helpers'
import * as bonnieLogin from '../../../../../support/BonnieFHIR/BonnieLoginLogout'
import * as dashboard from '../../../../../pom/BonnieFHIR/WI/Dashboard'
import * as bonnieUpload from '../../../../../support/BonnieFHIR/BonnieUploadMeasure'
import * as measureDetailsPage from '../../../../../pom/BonnieFHIR/WI/MeasureDetailsPage'
import * as bonnieDelete from '../../../../../support/BonnieFHIR/DeleteMeasure'
import * as testPatientPage from '../../../../../pom/BonnieFHIR/WI/TestPatientPage'
import * as bonnieDeletePatient from '../../../../../support/BonnieFHIR/DeletePatient'
import { measureYearDiv } from '../../../../../pom/BonnieFHIR/WI/MeasureDetailsPage'

const fileToUpload = "FHIRmeasureCMS347.zip"
const todaysDate = Cypress.moment().format('MM/DD/YYYY')

describe('Valiidate DateTime for Attributes from Patient', () => {


  before('Login', () => {

    bonnieLogin.login()

  })
  after('Log Out', () => {
    bonnieDelete.DeleteMeasure("FHIRmeasureCMS347")
    bonnieLogin.logout()

  })

  it('Verify Date Timings in Resources', () => {

    //Validate that dashboard page is displayed to user
    helper.enabledWithTimeout(dashboard.uploadBtn)

    //Upload file that contains a patient
    bonnieUpload.UploadMeasureToBonnie(fileToUpload)

    //Click into the measure that was just uploaded
    cy.get(dashboard.measureNameDiv).each(function($el) {
      if ($el.text().includes("FHIRmeasureCMS347")) {
        cy.wrap($el).click()
      }
    })

    //Retrieve the year of the measure from the page
    /*
    var year = ''
    cy.get(measureDetailsPage.measureYearDiv)
      .invoke('text')
      .then((text) => {
       year = text.replace(/\D/g, '')
        cy.log ("returned year is " + year)
      })

    cy.pause()
    cy.log("year after is " + year)
    */

    //Create New Patient for the measure
    measureDetailsPage.clickAddPatient()

    //enter in patient data before proceeding
    testPatientPage.enterPatientCharacteristics("distinctLastName")

    //criteria elements section
    helper.verifySpinnerAppearsAndDissappears()
    cy.get(testPatientPage.elementsHeader).should('have.text', 'Elements')

    //Caclulate the expected date values to be used
    var oneYearFromNow = new Date();
    oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);
    var dd = String(oneYearFromNow.getDate()).padStart(2, '0');
    var mm = String(oneYearFromNow.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = oneYearFromNow.getFullYear();

    var expectedDate = mm + '/' + dd + '/' + yyyy;
    cy.log("expected date is " + expectedDate)

    //drag and drop financial support attribute
    testPatientPage.dragAndDrop('financial support', 'Financial Support: Coverage: Payer', '24')

    //get Start Date from generated control and validate the date
    helper.verifySpinnerAppearsAndDissappears()
    cy.get(testPatientPage.startDate).should('have.value', expectedDate)

    //Get Start time and validate it equals 8am
    cy.get(testPatientPage.startTime).should('have.value', "8:00 AM")

    //Get end Date and validate the data
    cy.get(testPatientPage.endDate).should('have.value', expectedDate)

    //Get the End time and validate the end time
    cy.get(testPatientPage.endTime).should('have.value', "8:15 AM")

    //Delete attribute now that it has been validated
    helper.click(testPatientPage.patientinverseDangerButton)
    helper.click(testPatientPage.attributeDeleteButton)

    //drag and drop management attribute
    testPatientPage.dragAndDrop('management', 'Management: Encounter: Annual Wellness Visit', '25')

    //get Start Date from generated control and validate the date
    helper.verifySpinnerAppearsAndDissappears()
    cy.get(testPatientPage.startDate).should('have.value', expectedDate)

    //Get Start time and validate it equals 8am
    cy.get(testPatientPage.startTime).should('have.value', "8:00 AM")

    //Get end Date and validate the data
    cy.get(testPatientPage.endDate).should('have.value', expectedDate)

    //Get the End time and validate the end time
    cy.get(testPatientPage.endTime).should('have.value', "8:15 AM")

    //Delete attribute now that it has been validated
    helper.click(testPatientPage.patientinverseDangerButton)
    helper.click(testPatientPage.attributeDeleteButton)

    //drag and drop medication attribute
    testPatientPage.dragAndDrop('medications', 'Medications: MedicationRequest: Low Intensity Statin Therapy', '40')

    //get Start Date from generated control and validate the date
    helper.verifySpinnerAppearsAndDissappears()
    cy.get(testPatientPage.dateGeneric).eq(0).should('have.value', expectedDate)

    //Get Start time and validate it equals 8am
    cy.get(testPatientPage.timeGeneric).should('have.value', "8:00 AM")

    //Delete attribute now that it has been validated
    helper.click(testPatientPage.patientinverseDangerButton)
    helper.click(testPatientPage.attributeDeleteButton)

    //Click save button for patient to proceed back to measure details
    helper.click(testPatientPage.cancelBtn)

  })

})