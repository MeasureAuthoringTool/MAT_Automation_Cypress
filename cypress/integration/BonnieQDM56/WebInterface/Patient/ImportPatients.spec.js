import * as bonnieLogin from '../../../../support/Bonnie/BonnieLoginLogout'
import * as bonnieUploadMeasure from '../../../../support/Bonnie/BonnieUploadMeasure'
import * as measureDetailsPage from '../../../../pom/BonnieQDM/WI/MeasureDetailsPage'
import * as deletePatient from '../../../../support/Bonnie/BonnieQDM/DeletePatient'
import * as homePage from '../../../../pom/BonnieQDM/WI/Homepage'

describe('Import Patients', () => {
  const patientsZipFile = 'QDM56/patients_80A68BBF-38B5-426A-AA9D-C1B202EE9291_QDM_56_1634146000.zip'
  const measureName = 'Core Clinical Data Elements for the Hybrid Hospital-Wide Readmission (HWR) Measure with Claims and Electronic Health Record Data'
  const measureFileToUpload = 'QDM56/CCDE - Lookback-v2-0-004-QDM-5-6.zip'
  const patientJsonFile = 'QDM56/patients_4C668D33-C469-485E-90E3-F34164D0E62D_QDM_56_1633979173.json'

  before('Login', () => {
    bonnieLogin.login()
  })
  after('Log Out', () => {
    bonnieLogin.logout()
  })

  it('Verify successful Patient Import', () => {
    bonnieUploadMeasure.UploadMeasureToBonnie(measureFileToUpload, false)
    navigateToMeasureDetails(measureName)

    // Import patients to a measure
    cy.get(measureDetailsPage.measureSettingsBtn).click()
    cy.get(measureDetailsPage.importPatientBtn).click()
    cy.get(measureDetailsPage.chooseInputFile).attachFile(patientsZipFile)
    cy.get(measureDetailsPage.importFileSubmitBtn).click()
    cy.wait(1000)
    cy.get(measureDetailsPage.importPatientSuccessmsg).should('contain.text', 'QDM PATIENT IMPORT COMPLETED')
    cy.get(measureDetailsPage.successMsgCloseBtn).click()
    cy.get(measureDetailsPage.patientListing).should('not.equal', 0)
    cy.log('Successfully imported patients to a measure')
    deletePatient.DeleteAllPatientsFromMeasure(measureName)
  })

  // Verify error message on Importing zip file other than patient file
  it('Verify error message on importing non patient file', () => {
    navigateToMeasureDetails(measureName)

    // Import non patient file to a measure
    cy.get(measureDetailsPage.measureSettingsBtn).click()
    cy.get(measureDetailsPage.importPatientBtn).click()
    cy.get(measureDetailsPage.chooseInputFile).attachFile(measureFileToUpload)
    cy.get(measureDetailsPage.importFileSubmitBtn).click()
    cy.wait(1000)
    cy.get(measureDetailsPage.importPatientErrormsg).should('contain.text', 'The file you are trying to be uploaded cannot be uploaded at this time. Please re-export your patients and try to import them again.')
    cy.get(measureDetailsPage.errorMsgCloseBtn).click()
  })

  // Verify error message on Importing patient json file
  it('Verify error message on importing json patient file', () => {
    cy.get('[class="nav-dashboard active"]').click()
    navigateToMeasureDetails(measureName)

    // import patient json file to a measure
    cy.get(measureDetailsPage.measureSettingsBtn).click()
    cy.get(measureDetailsPage.importPatientBtn).click()
    cy.get(measureDetailsPage.chooseInputFile).attachFile(patientJsonFile)
    cy.get(measureDetailsPage.importFileSubmitBtn).click()
    cy.wait(1000)
    cy.get(measureDetailsPage.importPatientErrormsg).should('contain.text', 'You have uploaded a file that is not a zip file.')
    cy.get(measureDetailsPage.errorMsgCloseBtn).click()
  })

  function navigateToMeasureDetails (measureName) {
    cy.log('navigateToMeasureDetails')
    cy.get(homePage.measure).contains(measureName).click({ force: true })
    // cy.wait(1000)
    cy.get(measureDetailsPage.measureDetailsTitle).should('contain.text', 'Measure details')
    cy.log('navigateToMeasureDetails - done')
  }
})
