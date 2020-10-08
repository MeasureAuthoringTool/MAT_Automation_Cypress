import * as helper from '../../../../support/helpers'
import * as bonnieLogin from '../../../../support/BonnieFHIR/BonnieLoginLogout'
import * as dashboard from '../../../../pom/BonnieFHIR/WI/Dashboard'
import * as importMeasureDialog from '../../../../pom/BonnieFHIR/WI/ImportMeasureDialog'
import * as homePage from '../../../../pom/BonnieFHIR/WI/Homepage'
import * as measureDetailsPage from '../../../../pom/BonnieFHIR/WI/MeasureDetailsPage'
import * as testPatientPage from '../../../../pom/BonnieFHIR/WI/TestPatientPage'

const VsacApiKey = Cypress.env('VSAC_API_KEY')

describe('Patient: Create and then Delete New Patient', () => {

  const measureName = 'CMS104_TEST'
  const measureFileToUpload = 'CMS104.zip'

  before('Login', () => {
    bonnieLogin.login()
  })
  after('Log Out', () => {
    bonnieLogin.logout()
  })

  it('Create and delete patient', () => {
    uploadTestMeasure()

    navigateToMeasureDetails(measureName)

    const lastNameSuffix = new Date().getTime()
    const distinctLastName = 'President' + lastNameSuffix

    cy.get(measureDetailsPage.patientListing).then((patientListing) => {
      const initialPatientCount = parseInt(patientListing.text())
      cy.log('patient count was:' + initialPatientCount)

      clickAddPatient()
      enterPatientCharacteristics(distinctLastName)
      clickSavePatient()
      verifyPatientAdded(initialPatientCount, distinctLastName)
      measureDetailsPage.navigateToHomeMeasurePage()
      navigateToMeasureDetails(measureName)
      deletePatient(distinctLastName)
      verifyPatientRemoved(initialPatientCount)
    })

    helper.visibleWithTimeout(measureDetailsPage.measurePageNavigationBtn)

    deleteMeasure(measureName)

    helper.visibleWithTimeout(measureDetailsPage.measurePageNavigationBtn)
  })

  function uploadTestMeasure () {
    cy.log('uploadTestMeasure')
    helper.enabledWithTimeout(dashboard.uploadBtn)
    cy.get(dashboard.uploadBtn).click()

    // upload the file to the modal
    helper.visibleWithTimeout(importMeasureDialog.importMeasureDialog)
    helper.enabledWithTimeout(importMeasureDialog.fileImportInput)

    cy.get(importMeasureDialog.fileImportInput).attachFile(measureFileToUpload)

    // wait for VSAC Key field to display for the user, and enter Key
    helper.visibleWithTimeout(importMeasureDialog.vsacApiKeyTextBox)
    helper.enabledWithTimeout(importMeasureDialog.vsacApiKeyTextBox)
    helper.enterText(importMeasureDialog.vsacApiKeyTextBox, VsacApiKey)

    // click load button to import the measure
    helper.enabled(importMeasureDialog.importLoadBtn)
    helper.click(importMeasureDialog.importLoadBtn)
    cy.log('uploadTestMeasure - done')
  }

  function navigateToMeasureDetails (measureName) {
    cy.log('navigateToMeasureDetails')
    cy.get(homePage.measure).contains(measureName).click()
    // cy.wait(1000)
    cy.get(measureDetailsPage.measureDetailsTitle).should('contain.text', 'Measure details')
    cy.log('navigateToMeasureDetails - done')
  }

  function deletePatient (lastName) {
    cy.log('deletePatient')
    const patient = getPatientRecord(lastName)
    patient.find(measureDetailsPage.patientExpandBtn).click()
    cy.get(measureDetailsPage.patientInverseBtn).click()
    cy.get(measureDetailsPage.patientDeleteBtn).click()
    cy.log('deletePatient - done')
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

  function getPatientRecord (lastName) {
    return cy.get(measureDetailsPage.measureCalculationPanel).contains(lastName).parents(measureDetailsPage.patient)
  }

  function clickAddPatient () {
    cy.log('clickAddPatient')
    cy.get(measureDetailsPage.addPatientBtn).click()
    cy.log('clickAddPatient - done')
  }

  function clickSavePatient () {
    cy.log('clickSavePatient')
    cy.get(testPatientPage.saveBtn).click()
    cy.log('clickAddPatient - done')
  }

  function verifyPatientAdded (initialPatientCount, lastName) {
    cy.log('verifyPatientAdded')
    cy.get(measureDetailsPage.newStatus).should('have.text', 'NEW')
    cy.get(measureDetailsPage.patientListing).should('have.text', (initialPatientCount + 1).toString())
    getPatientRecord(lastName).find(measureDetailsPage.patientStatus).should('contain.text', 'pass')
    cy.log('verifyPatientAdded - done')
  }

  function verifyPatientRemoved (initialPatientCount) {
    cy.log('verifyPatientRemoved')
    cy.get(measureDetailsPage.newStatus).should('have.text', 'NEW')
    cy.get(measureDetailsPage.patientListing).should('have.text', (initialPatientCount).toString())
    cy.log('verifyPatientRemoved - done')
  }

  function deleteMeasure (measureName) {
    cy.log('deleteMeasure')
    measureDetailsPage.navigateToHomeMeasurePage()
    navigateToMeasureDetails(measureName)

    measureDetailsPage.clickDeleteMeasure()
    cy.log('deleteMeasure - done')
  }

})
