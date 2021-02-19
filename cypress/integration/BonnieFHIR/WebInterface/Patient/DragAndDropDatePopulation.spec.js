import * as helper from '../../../../support/helpers'
import * as bonnieLogin from '../../../../support/BonnieFHIR/BonnieLoginLogout'
import * as measureDetailsPage from '../../../../pom/BonnieFHIR/WI/MeasureDetailsPage'
import * as testPatientPage from '../../../../pom/BonnieFHIR/WI/TestPatientPage'
import * as bonnieUploadMeasure from '../../../../support/BonnieFHIR/BonnieUploadMeasure'

const measureName = 'FHIRmeasureCMS347'
const measureFileToUpload = 'FHIRmeasureCMS347-v0-0-003-FHIR-4-0-1.zip'

const lastNameSuffix = new Date().getTime()
const distinctLastName = 'President' + lastNameSuffix

const expectedStartDate = '01/01/2019'
const expectedStartTime = '11:00 AM'
const expectedEndDate = '01/01/2019'
const expectedEndTime = '12:00 PM'

describe('Patient: Elements', () => {

  before('Login', () => {

    bonnieLogin.login()
    bonnieUploadMeasure.UploadMeasureToBonnie(measureFileToUpload, false)
    measureDetailsPage.navigateToMeasureDetails(measureName)

  })
  after('Log Out', () => {

    bonnieLogin.logout()

  })

  it('Verify Drag and Drop date population', () => {

    cy.get(measureDetailsPage.patientListing).then((patientListing) => {
      const initialPatientCount = parseInt(patientListing.text(), 10)
      cy.log('patient count was:' + initialPatientCount)

      measureDetailsPage.clickAddPatient()
      testPatientPage.enterPatientCharacteristics(distinctLastName)


      testPatientPage.dragAndDrop('financial support', 'Financial Support: Coverage: Payer', 24)

      populateStartEndDates()

      testPatientPage.dragAndDrop('management', 'Encounter: Annual Wellness Visit', 25)

      verifyStartAndEndDates()

      cy.get(testPatientPage.cancelBtn).click()

    })

    helper.visibleWithTimeout(measureDetailsPage.measurePageNavigationBtn)
  })

  function populateStartEndDates () {
    cy.log('populating the start and end dates/time')

    helper.enterText(testPatientPage.startDate, expectedStartDate)
    helper.enterText(testPatientPage.startTime, expectedStartTime)

    helper.enterText(testPatientPage.endDate, expectedEndDate)
    helper.enterText(testPatientPage.endTime, expectedEndTime)

    cy.log('Date population - done')
  }

  function verifyStartAndEndDates () {
    cy.log('verify the start and end dates/time with expected values')

    cy.get(testPatientPage.startDate).eq(1).should('have.value', expectedStartDate)
    cy.get(testPatientPage.startTime).eq(1).should('have.value', expectedStartTime)

    cy.get(testPatientPage.endDate).eq(1).should('have.value', expectedEndDate)
    cy.get(testPatientPage.endTime).eq(1).should('have.value', expectedEndTime)


    cy.log('Verification - done')
  }

})
