import * as helper from '../../../../support/helpers'
import * as bonnieLogin from '../../../../support/BonnieFHIR/BonnieLoginLogout'
import * as homePage from '../../../../pom/BonnieFHIR/WI/Homepage'
import * as measureDetailsPage from '../../../../pom/BonnieFHIR/WI/MeasureDetailsPage'
import * as testPatientPage from '../../../../pom/BonnieFHIR/WI/TestPatientPage'
import * as bonnieUploadMeasure from '../../../../support/BonnieFHIR/BonnieUploadMeasure'

describe('Patient: Handle Expected Patient Values', () => {

  const measureName = 'FHIRmeasureCMS347'
  const measureFileToUpload = 'FHIRmeasureCMS347-v0-0-003-FHIR-4-0-1.zip'

  beforeEach('Login', () => {
    bonnieLogin.login()
  })
  afterEach('Log Out', () => {
    bonnieLogin.logout()
  })

  it('Expected values for a measure as "episode"', () => {
    runScriptFor('episode', enterExpectedValuesForEpisodeOfCareBasedMeasure, verifyExpectedPatientsForEpisodeOfCareBasedMeasure)
  })

  it('Expected values for a measure as "patient"', () => {
    runScriptFor('patient', enterExpectedValuesForPatientBasedMeasure, verifyExpectedPatientsForPatientBasedMeasure)
  })

  function runScriptFor(calculationType, enterExpectedValues, validateExpectedValues) {
    uploadTestMeasure(calculationType)
    navigateToMeasureDetails(measureName)

    const lastNameSuffix = new Date().getTime()
    const lastName = 'President' + lastNameSuffix

    cy.get(measureDetailsPage.patientListing).then((patientListing) => {
      const initialPatientCount = parseInt(patientListing.text(), 10)
      cy.log('patient count was: ' + initialPatientCount)

      measureDetailsPage.clickAddPatient()
      enterPatientCharacteristics(lastName)
      enterExpectedValues()
      testPatientPage.clickSavePatient()

      cy.log('verifyPatient')
      const patient = getPatientRecord(lastName)
      patient.find(measureDetailsPage.patientExpandBtn).click()
      validateExpectedValues()
      cy.log('verifyPatient - done')

      measureDetailsPage.navigateToHomeMeasurePage()
    })

    helper.visibleWithTimeout(measureDetailsPage.measurePageNavigationBtn)
  }

  function uploadTestMeasure (calculation) {
    bonnieUploadMeasure.UploadMeasureToBonnie(measureFileToUpload, calculation)
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

  function getPatientRecord (lastName) {
    return cy.get(measureDetailsPage.measureCalculationPanel).contains(lastName).parents(measureDetailsPage.patient)
  }

  function verifyPatientRemoved (initialPatientCount) {
    cy.log('verifyPatientRemoved')
    cy.get(measureDetailsPage.newStatus).should('have.text', 'NEW')
    cy.get(measureDetailsPage.patientListing).should('have.text', (initialPatientCount).toString())
    cy.log('verifyPatientRemoved - done')
  }

  function enterExpectedValuesForPatientBasedMeasure () {
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
