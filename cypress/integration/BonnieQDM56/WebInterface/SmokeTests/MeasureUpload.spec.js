import * as bonnieLogin from '../../../../support/Bonnie/BonnieLoginLogout'
import * as measureDetailsPage from '../../../../pom/BonnieFHIR/WI/MeasureDetailsPage'
import * as bonnieUploadMeasure from '../../../../support/Bonnie/BonnieUploadMeasure'
import * as testPatientPage from '../../../../pom/BonnieFHIR/WI/TestPatientPage'
import * as deletePatient from '../../../../support/Bonnie/BonnieFHIR/DeletePatient'
import * as homePage from '../../../../pom/BonnieFHIR/WI/Homepage'

let measureName = ''
let measureFileToUpload = ''

const lastNameSuffix = new Date().getTime()
const distinctLastName = "President" + lastNameSuffix

describe('Smoke Test: Measure Upload', () => {

  beforeEach('Login', () => {

    bonnieLogin.login()

  })
  afterEach('Log Out', () => {

    bonnieLogin.logout()

  })

  it.only('Verify successful upload Proportion Patient Based Measure and add patient', () => {

    measureName = 'Risk-Standardized Inpatient Respiratory Depression Rate Following Elective ' +
      'Primary Total Hip Arthroplasty (THA) And/Or Total Knee Arthroplasty (TKA) eCQM'
    measureFileToUpload = 'QDM56/RSIRDR-eCQM-v1-1-QDM-5-6.zip'

    bonnieUploadMeasure.UploadMeasureToBonnie(measureFileToUpload, false)
    measureDetailsPage.navigateToMeasureDetails(measureName)

    //Add Patient to the Patient based Measure

    cy.get(measureDetailsPage.patientListing).then((patientListing) => {
      const initialPatientCount = parseInt(patientListing.text(), 10)
      cy.log('patient count was:' + initialPatientCount)

      measureDetailsPage.clickAddPatient()
      testPatientPage.enterPatientCharacteristics(distinctLastName)
      testPatientPage.clickSavePatient()
      testPatientPage.verifyPatientAdded(initialPatientCount, distinctLastName)
      measureDetailsPage.navigateToHomeMeasurePage()
      navigateToMeasureDetails(measureName)
      deletePatient.DeletePatient(distinctLastName)
      deletePatient.VerifyPatientRemoved(initialPatientCount)

    })
  })

  it('Verify successful upload Proportion Episode of Care Measure and add patient', () => {

    measureName = 'Elective Delivery'
    measureFileToUpload = 'QDM56/ePC-01-Elective Delivery-v10-1-001-QDM-5-6.zip'

    bonnieUploadMeasure.UploadMeasureToBonnie(measureFileToUpload, 'episode')
    measureDetailsPage.navigateToMeasureDetails(measureName)

    //Add Patient to the Episode of care Measure

    cy.get(measureDetailsPage.patientListing).then((patientListing) => {
      const initialPatientCount = parseInt(patientListing.text(), 10)
      cy.log('patient count was:' + initialPatientCount)
      measureDetailsPage.clickAddPatient()
      testPatientPage.enterPatientCharacteristics(distinctLastName)
      testPatientPage.clickSavePatient()
      testPatientPage.verifyPatientAdded(initialPatientCount, distinctLastName)
      measureDetailsPage.navigateToHomeMeasurePage()
      navigateToMeasureDetails(measureName)
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
