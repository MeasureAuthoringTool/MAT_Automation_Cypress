import * as helper from '../../../../../support/helpers'
import * as bonnieLogin from '../../../../../support/BonnieFHIR/BonnieLoginLogout'
import * as homePage from '../../../../../pom/BonnieFHIR/WI/Homepage'
import * as measureDetailsPage from '../../../../../pom/BonnieFHIR/WI/MeasureDetailsPage'
import * as deletePatient from '../../../../../support/BonnieFHIR/DeletePatient'
import * as deleteMeasure from '../../../../../support/BonnieFHIR/DeleteMeasure'
import * as testPatientPage from '../../../../../pom/BonnieFHIR/WI/TestPatientPage'
import * as bonnieUploadMeasure from '../../../../../support/BonnieFHIR/BonnieUploadMeasure'

describe('Test Patient: Adding Code', () => {

  const measureName = 'FHIRmeasureCMS347'
  const measureFileToUpload = 'FHIRmeasureCMS347v603-Artifacts.zip'

  before('Login', () => {
    bonnieLogin.login()
  })
  after('Log Out', () => {
    bonnieLogin.logout()
  })

  //skipping this test until we get a chance to work on it
  it('Verify the patient code', () => {
    uploadTestMeasure()

    navigateToMeasureDetails(measureName)

    const lastNameSuffix = new Date().getTime()
    const distinctLastName = 'President' + lastNameSuffix

    cy.get(measureDetailsPage.patientListing).then((patientListing) => {
      const initialPatientCount = parseInt(patientListing.text())
      cy.log('patient count was:' + initialPatientCount)

      measureDetailsPage.clickAddPatient()
      enterPatientCharacteristics(distinctLastName)
      testPatientPage.dragAndDrop('medications', 'Medications: MedicationAdministration: Low Intensity Statin Therapy', 37)
      addCode()
      testPatientPage.clickSavePatient()
      testPatientPage.verifyPatientAdded(initialPatientCount, distinctLastName)
      measureDetailsPage.navigateToHomeMeasurePage()
      navigateToMeasureDetails(measureName)
      deletePatient.DeletePatient(distinctLastName)
      deletePatient.VerifyPatientRemoved(initialPatientCount)
    })

    helper.visibleWithTimeout(measureDetailsPage.measurePageNavigationBtn)

    deleteMeasure.DeleteMeasure(measureName)

    helper.visibleWithTimeout(measureDetailsPage.measurePageNavigationBtn)
  })

  function uploadTestMeasure () {
    bonnieUploadMeasure.UploadMeasureToBonnie(measureFileToUpload)
  }

  function navigateToMeasureDetails (measureName) {
    cy.log('navigateToMeasureDetails')
    cy.get(homePage.measure).contains(measureName).click()
    // cy.wait(1000)
    cy.get(measureDetailsPage.measureDetailsTitle).should('contain.text', 'Measure details')
    cy.log('navigateToMeasureDetails - done')
  }

  function enterPatientCharacteristics (lastName) {
    cy.log('enterPatientCharacteristics')
    cy.get(testPatientPage.lastNameTextField).type(lastName)
    cy.get(testPatientPage.firstNameTextField).type('Current')
    cy.get(testPatientPage.patientDescriptionTextField).type('Patient is very special')
    cy.get(testPatientPage.dateofBithField).type('01/01/1950')
    cy.get(testPatientPage.patientDescriptionTextField).click()
    cy.get(testPatientPage.raceDropdown).select('Asian')
    cy.get(testPatientPage.genderDropdown).select('Male')
    cy.get(testPatientPage.ethnicityDropdown).select('Not Hispanic or Latino')
    cy.log('enterPatientCharacteristics - done')
  }

  function addCode () {
    cy.log('addCodeSystem')
    cy.get(testPatientPage.primaryCodeSystem).select('RXNORM')
    cy.get(testPatientPage.chooseCodeSystem).select('1944264 (Simvastatin 8 MG/ML Oral Suspension)')
    cy.get(testPatientPage.addCodeBtn).eq(0).click()
    cy.get(testPatientPage.exsistingCode).contains('RXNORM: 1944264')
    cy.log('AddCode - done')
  }

})
