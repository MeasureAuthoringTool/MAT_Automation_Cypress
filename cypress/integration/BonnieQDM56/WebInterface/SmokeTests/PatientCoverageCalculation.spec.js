import * as bonnieLogin from '../../../../support/Bonnie/BonnieLoginLogout'
import * as bonnieUploadMeasure from '../../../../support/Bonnie/BonnieUploadMeasure'
import * as measureDetailsPage from '../../../../pom/BonnieFHIR/WI/MeasureDetailsPage'
import * as testPatientPage from '../../../../pom/BonnieFHIR/WI/TestPatientPage'
import * as deletePatient from '../../../../support/Bonnie/BonnieFHIR/DeletePatient'
import * as homePage from '../../../../pom/BonnieFHIR/WI/Homepage'

describe('Patient Coverage Calculation', () => {

  const measureName = 'Core Clinical Data Elements for the Hybrid Hospital-Wide Readmission (HWR) Measure with Claims and Electronic Health Record Data'
  const measureFileToUpload = 'QDM56/CCDE - Lookback-v2-0-004-QDM-5-6.zip'

  beforeEach('Login', () => {
    bonnieLogin.login()
  })
  afterEach('Log Out', () => {
    bonnieLogin.logout()
  })

  it.only('Verify Coverage Calculation for Patient', () => {

    bonnieUploadMeasure.UploadMeasureToBonnie(measureFileToUpload, false)
    measureDetailsPage.navigateToMeasureDetails(measureName)

    const lastNameSuffix = new Date().getTime()
    const distinctLastName = "President" + lastNameSuffix

    //Add Patient

    cy.get(measureDetailsPage.patientListing).then((patientListing) => {
      const initialPatientCount = parseInt(patientListing.text(), 10)
      cy.log('patient count was:' + initialPatientCount)

      measureDetailsPage.clickAddPatient()
      testPatientPage.enterPatientCharacteristics(distinctLastName)
      testPatientPage.enterExpectedResults(["IPP"])
      testPatientPage.dragAndDrop('encounter', 'Encounter: Performed: Encounter Inpatient', 0)
      testPatientPage.dragAndDrop('patient characteristic', 'Patient Characteristic: Patient Characteristic Payer: Payer', 10)
      testPatientPage.clickSavePatient()
      testPatientPage.verifyPatientAdded(initialPatientCount, distinctLastName)
      measureDetailsPage.navigateToHomeMeasurePage()
      navigateToMeasureDetails(measureName)
      cy.get(measureDetailsPage.coverageNumber).invoke('val')
        .then(value => {
          expect(value).to.eql('100')
          cy.log('coverageCalculation - done')
        })
      deletePatient.DeletePatient(distinctLastName)
      deletePatient.VerifyPatientRemoved(initialPatientCount)

    })
  })
  function navigateToMeasureDetails (measureName) {
    cy.log('navigateToMeasureDetails')
    cy.get(homePage.measure).contains(measureName).click({force: true})
    // cy.wait(1000)
    cy.get(measureDetailsPage.measureDetailsTitle).should('contain.text', 'Measure details')
    cy.log('navigateToMeasureDetails - done')
  }
})

