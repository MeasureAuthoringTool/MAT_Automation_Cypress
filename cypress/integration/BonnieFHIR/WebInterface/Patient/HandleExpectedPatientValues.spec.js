import * as helper from '../../../../support/helpers'
import * as bonnieLogin from '../../../../support/BonnieFHIR/BonnieLoginLogout'
import * as dashboard from '../../../../pom/BonnieFHIR/WI/Dashboard'
import * as importMeasureDialog from '../../../../pom/BonnieFHIR/WI/ImportMeasureDialog'
import * as homePage from '../../../../pom/BonnieFHIR/WI/Homepage'
import * as measureDetailsPage from '../../../../pom/BonnieFHIR/WI/MeasureDetailsPage'
import * as testPatientPage from '../../../../pom/BonnieFHIR/WI/TestPatientPage'

const VsacApiKey = Cypress.env('VSAC_API_KEY')

describe('Patient: Handle Expected Patient Values', () => {

  const measureName = 'CMS104_TEST'
  const measureFileToUpload = 'CMS104.zip'

  beforeEach('Login', () => {
    bonnieLogin.login()
  })
  afterEach('Log Out', () => {
    bonnieLogin.logout()
  })

  it('Load measure as "episode"', () => {
    uploadTestMeasure('episode')
    navigateToMeasureDetails(measureName)

    const lastNameSuffix = new Date().getTime()
    const lastName = 'President' + lastNameSuffix

    cy.get(measureDetailsPage.patientListing).then((patientListing) => {
      const initialPatientCount = parseInt(patientListing.text())
      cy.log('patient count was: ' + initialPatientCount)

      clickAddPatient()
      enterPatientCharacteristics(lastName)
      enterExpectedValuesForEpisodeOfCareBasedMeasure()

      clickSavePatient()

      cy.log('verifyPatient')

      const patient = getPatientRecord(lastName)
      patient.find(measureDetailsPage.patientExpandBtn).click()
      verifyExpectedPatientsForEpisodeOfCareBasedMeasure()

      cy.log('verifyPatient - done')

      measureDetailsPage.navigateToHomeMeasurePage()
      navigateToMeasureDetails(measureName)
      deletePatient(lastName)
      verifyPatientRemoved(initialPatientCount)
    })

    helper.visibleWithTimeout(measureDetailsPage.measurePageNavigationBtn)
    deleteMeasure(measureName)
    helper.visibleWithTimeout(measureDetailsPage.measurePageNavigationBtn)
  })

  it('Load measure as "patient"', () => {
    uploadTestMeasure('patient')
    navigateToMeasureDetails(measureName)

    const lastNameSuffix = new Date().getTime()
    const lastName = 'President' + lastNameSuffix

    cy.get(measureDetailsPage.patientListing).then((patientListing) => {
      const initialPatientCount = parseInt(patientListing.text())
      cy.log('patient count was: ' + initialPatientCount)

      clickAddPatient()
      enterPatientCharacteristics(lastName)
      enterExpectedValuesForPatientBasedMeasure()

      clickSavePatient()

      cy.log('verifyPatient')
      const patient = getPatientRecord(lastName)
      patient.find(measureDetailsPage.patientExpandBtn).click()
      verifyExpectedPatientsForPatientBasedMeasure()
      cy.log('verifyPatient - done')

      measureDetailsPage.navigateToHomeMeasurePage()
      navigateToMeasureDetails(measureName)
      deletePatient(lastName)
      verifyPatientRemoved(initialPatientCount)
    })

    helper.visibleWithTimeout(measureDetailsPage.measurePageNavigationBtn)
    deleteMeasure(measureName)
    helper.visibleWithTimeout(measureDetailsPage.measurePageNavigationBtn)
  })



  function uploadTestMeasure (calculation) {
    cy.log('uploadTestMeasure')
    helper.enabledWithTimeout(dashboard.uploadBtn)
    cy.get(dashboard.uploadBtn).click()

    if (calculation) {
      changeMeasureCalculation(calculation)
    }

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

  function changeMeasureCalculation (calculation) {
    let radio = calculation === 'episode' ? importMeasureDialog.episodeOfCareCalculation : importMeasureDialog.patientCalculation
    cy.get(radio).check({ force: true })
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

  function enterExpectedValuesForPatientBasedMeasure () {
    // Verify Expected input values are displayed
    cy.get('input[name="IPP"][type="checkbox"]').should('be.visible')
    cy.get('input[name="DENOM"][type="checkbox"]').should('be.visible')
    cy.get('input[name="DENEX"][type="checkbox"]').should('be.visible')
    cy.get('input[name="NUMER"][type="checkbox"]').should('be.visible')
    cy.get('input[name="DENEXCEP"][type="checkbox"]').should('be.visible')

    cy.get('input[name="IPP"][type="checkbox"]').check({ force: true }).and('have.prop', 'checked')
    cy.get('input[name="DENOM"][type="checkbox"]').check({ force: true }).and('have.prop', 'checked')
    cy.get('input[name="DENEX"][type="checkbox"]').check({ force: true }).and('have.prop', 'checked')
    cy.get('input[name="NUMER"][type="checkbox"]').check({ force: true }).and('have.prop', 'checked')
    cy.get('input[name="DENEXCEP"][type="checkbox"]').check({ force: true }).and('have.prop', 'checked')
  }

  function verifyExpectedPatientsForPatientBasedMeasure () {
    cy.get('.patient tr:nth-child(2)')
      .should('contain.text', 'IPP')
      .and('contain.text', 'checked')
      .and('contain.text', 'unchecked')
    cy.get('.patient tr:nth-child(3)')
      .should('contain.text', 'DENOM')
      .and('contain.text', 'checked')
      .and('contain.text', 'unchecked')
    cy.get('.patient tr:nth-child(4)')
      .should('contain.text', 'DENEX')
      .and('contain.text', 'checked')
      .and('contain.text', 'unchecked')
    cy.get('.patient tr:nth-child(5)')
      .should('contain.text', 'NUMER')
      .and('contain.text', 'checked')
      .and('contain.text', 'unchecked')
    cy.get('.patient tr:nth-child(6)')
      .should('contain.text', 'DENEXCEP')
      .and('contain.text', 'checked')
      .and('contain.text', 'unchecked')
  }

  function enterExpectedValuesForEpisodeOfCareBasedMeasure () {
    // Verify Expected input values are displayed
    cy.get('input[name="IPP"][type="number"]').should('be.visible')
    cy.get('input[name="DENOM"][type="number"]').should('be.visible')
    cy.get('input[name="DENEX"][type="number"]').should('be.visible')
    cy.get('input[name="NUMER"][type="number"]').should('be.visible')
    cy.get('input[name="DENEXCEP"][type="number"]').should('be.visible')

    cy.get('input[name="IPP"][type="number"]').type(1)
    cy.get('input[name="DENOM"][type="number"]').type(2)
    cy.get('input[name="DENEX"][type="number"]').type(3)
    cy.get('input[name="NUMER"][type="number"]').type(4)
    cy.get('input[name="DENEXCEP"][type="number"]').type(5)
  }

  function verifyExpectedPatientsForEpisodeOfCareBasedMeasure () {
    cy.get('.patient tr:nth-child(2)').should('contain.text', 'IPP').and('contain.text', '5')
    cy.get('.patient tr:nth-child(3)').should('contain.text', 'DENOM').and('contain.text', '5')
    cy.get('.patient tr:nth-child(4)').should('contain.text', 'DENEX').and('contain.text', '3')
    cy.get('.patient tr:nth-child(5)').should('contain.text', 'NUMER').and('contain.text', '4')
    cy.get('.patient tr:nth-child(6)').should('contain.text', 'DENEXCEP').and('contain.text', '5')
  }
})
