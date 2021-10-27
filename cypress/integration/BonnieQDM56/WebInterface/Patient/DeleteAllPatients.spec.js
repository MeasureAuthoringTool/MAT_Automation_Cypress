import * as bonnieLogin from '../../../../support/Bonnie/BonnieLoginLogout'
import * as bonnieUploadMeasure from '../../../../support/Bonnie/BonnieUploadMeasure'
import * as measureDetailsPage from '../../../../pom/BonnieQDM/WI/MeasureDetailsPage'
import * as homePage from '../../../../pom/BonnieQDM/WI/Homepage'
import * as dashboard from '../../../../pom/BonnieFHIR/WI/Dashboard'
import * as importMeasureDialog from '../../../../pom/BonnieFHIR/WI/ImportMeasureDialog'
import * as helper from '../../../../support/helpers'

describe('Delete All Patients', () => {
  const patientsZipFile = 'QDM56/patients_80A68BBF-38B5-426A-AA9D-C1B202EE9291_QDM_56_1634146000.zip'
  const measureName = 'Core Clinical Data Elements for the Hybrid Hospital-Wide Readmission (HWR) Measure with Claims and Electronic Health Record Data'
  const measureFileToUpload = 'QDM56/CCDE - Lookback-v2-0-004-QDM-5-6.zip'
  const secondMeasureFileToUpload = 'QDM56/ePC-01-Elective Delivery-v10-1-001-QDM-5-6.zip'

  beforeEach('Login', () => {
    bonnieLogin.login()
  })
  afterEach('Log Out', () => {
    bonnieLogin.logout()
  })

  it('Verify Delete All Patients from a Measure', () => {
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

    // Delete All Patients from a measure
    cy.get(measureDetailsPage.measureSettingsBtn).click()
    cy.get(measureDetailsPage.deleteAllPatientsBtn).click()
    cy.get(measureDetailsPage.deleteConfirmCheckBox).click()
    cy.get(measureDetailsPage.deletePatientsConfirmBtn).click()

    // Verify the success message after deleting all patients
    cy.get(measureDetailsPage.deletePatientsSuccessMsg).should('contain.text', 'Success')
    cy.get(measureDetailsPage.deletePatientsSuccessMsgConfirmBtn).click()
    cy.log('Successfully deleted all patients from a measure')
  })

  // Verify the error message for a portfolio user
  it.only('Verify error message while deleting patients for a portfolio user', () => {
    bonnieUploadMeasure.UploadMeasureToBonnie(measureFileToUpload, false)
    navigateToMeasureDetails(measureName)

    // Import patients to first measure
    cy.get(measureDetailsPage.measureSettingsBtn).click()
    cy.get(measureDetailsPage.importPatientBtn).click()
    cy.get(measureDetailsPage.chooseInputFile).attachFile(patientsZipFile)
    cy.get(measureDetailsPage.importFileSubmitBtn).click()
    cy.wait(1000)
    cy.get(measureDetailsPage.importPatientSuccessmsg).should('contain.text', 'QDM PATIENT IMPORT COMPLETED')
    cy.get(measureDetailsPage.successMsgCloseBtn).click()
    cy.get(measureDetailsPage.patientListing).should('not.equal', 0)
    cy.log('Successfully imported patients to a measure')

    // Upload second measure to Bonnie
    cy.get(homePage.dashboard).click()
    cy.get(dashboard.uploadBtn).click()
    cy.get(importMeasureDialog.fileImportInput).attachFile(secondMeasureFileToUpload)
    helper.enabled(importMeasureDialog.importLoadBtn)
    helper.click(importMeasureDialog.importLoadBtn)
    cy.wait(2000)
    cy.log('UploadSecondMeasureToBonnie - done')

    // Navigate to second Measure
    cy.log('navigateToMeasureDetails')
    cy.get(homePage.measure).contains(measureName).click({ force: true })
    cy.get(measureDetailsPage.measureDetailsTitle).should('contain.text', 'Measure details')
    cy.log('navigateToMeasureDetails - done')
    cy.get(measureDetailsPage.measureSettingsBtn).click()

    // Share patients with the Second Measure
    cy.get(measureDetailsPage.sharePatientsBtn).click()
    cy.get(measureDetailsPage.sharePatientsConfirmationBtn).click()

    // Verify error message while trying to delete all patients from the first measure
    navigateToMeasureDetails(measureName)
    cy.get(measureDetailsPage.measureSettingsBtn).click()
    cy.get(measureDetailsPage.deleteAllPatientsBtn).click()
    cy.get(measureDetailsPage.deleteAllPatientsErrorMsg).should('contain.text', 'Cannot delete Patients. Some of your Patients are shared with other measures.')
    cy.get(measureDetailsPage.deleteAllPatientsErrorMsgCloseBtn).click()
  })

  function navigateToMeasureDetails (measureName) {
    cy.log('navigateToMeasureDetails')
    cy.get(homePage.measure).contains(measureName).click({ force: true })
    // cy.wait(1000)
    cy.get(measureDetailsPage.measureDetailsTitle).should('contain.text', 'Measure details')
    cy.log('navigateToMeasureDetails - done')
  }
})
