import * as helper from '../../../../support/helpers'
import * as bonnieLogin from '../../../../support/BonnieFHIR/BonnieLoginLogout'
import * as homePage from '../../../../pom/BonnieFHIR/WI/Homepage'
import * as measureDetailsPage from '../../../../pom/BonnieFHIR/WI/MeasureDetailsPage'
import * as deletePatient from '../../../../support/BonnieFHIR/DeletePatient'
import * as deleteMeasure from '../../../../support/BonnieFHIR/DeleteMeasure'
import * as testPatientPage from '../../../../pom/BonnieFHIR/WI/TestPatientPage'
import * as bonnieUploadMeasure from '../../../../support/BonnieFHIR/BonnieUploadMeasure'

describe('Upload Continuous Variable Measure', () => {

  let continuousVariableMeasureName = 'CMS111TestMeasureNK'
  let continuousVariableMeasureFileToUpload = 'ContinuousVariableCMS111.zip'

  before('Login', () => {
    bonnieLogin.login()
  })
  // after('Log Out', () => {
  //   bonnieLogin.logout()
  // })

  it('Successfully upload Continuous Variable measure', () => {
    uploadContinuousVariableTestMeasure()

    navigateToMeasureDetails(continuousVariableMeasureName)

    const lastNameSuffix = new Date().getTime()
    const distinctLastName = 'President' + lastNameSuffix

    cy.get(measureDetailsPage.patientListing).then((patientListing) => {
      const initialPatientCount = parseInt(patientListing.text())
      cy.log('patient count was:' + initialPatientCount)

      measureDetailsPage.clickAddPatient()
      enterPatientCharacteristics(distinctLastName)
      testPatientPage.clickSavePatient()
      verifyPatientAdded(initialPatientCount, distinctLastName)
      measureDetailsPage.navigateToHomeMeasurePage()
      navigateToMeasureDetails(continuousVariableMeasureName)
      deletePatient.DeletePatient(distinctLastName)
      verifyPatientRemoved(initialPatientCount)
    })

    helper.visibleWithTimeout(measureDetailsPage.measurePageNavigationBtn)

    deleteMeasure.DeleteMeasure(continuousVariableMeasureName)

    helper.visibleWithTimeout(measureDetailsPage.measurePageNavigationBtn)
  })

  function uploadContinuousVariableTestMeasure () {
    bonnieUploadMeasure.UploadMeasureToBonnie(continuousVariableMeasureFileToUpload)
  }

  function navigateToMeasureDetails (continuousVariableMeasureName) {
    cy.log('navigateToMeasureDetails')
    cy.get(homePage.measure).contains(continuousVariableMeasureName).click()
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

})

describe('Upload Cohort Measure', () => {

    let cohortMeasureName = 'CMS529CohortMeasure'
    let cohortMeasureFileToUpload = 'CohortCMS529.zip'
  
    before('Login', () => {
      bonnieLogin.login()
    })
    after('Log Out', () => {
      bonnieLogin.logout()
    })

  it('Successfully upload Cohort measure', () => {
    uploadCohortTestMeasure()

    navigateToMeasureDetails(cohortMeasureName)

    const lastNameSuffix = new Date().getTime()
    const distinctLastName = 'President' + lastNameSuffix

    cy.get(measureDetailsPage.patientListing).then((patientListing) => {
      const initialPatientCount = parseInt(patientListing.text())
      cy.log('patient count was:' + initialPatientCount)

      measureDetailsPage.clickAddPatient()
      enterPatientCharacteristics(distinctLastName)
      testPatientPage.clickSavePatient()
      verifyPatientAdded(initialPatientCount, distinctLastName)
      measureDetailsPage.navigateToHomeMeasurePage()
      navigateToMeasureDetails(cohortMeasureName)
      deletePatient.DeletePatient(distinctLastName)
      verifyPatientRemoved(initialPatientCount)
    })

    helper.visibleWithTimeout(measureDetailsPage.measurePageNavigationBtn)

    deleteMeasure.DeleteMeasure(cohortMeasureName)

    helper.visibleWithTimeout(measureDetailsPage.measurePageNavigationBtn)
  })

  function uploadCohortTestMeasure () {
    bonnieUploadMeasure.UploadMeasureToBonnie(cohortMeasureFileToUpload)
  }

  function navigateToMeasureDetails (cohortMeasureName) {
    cy.log('navigateToMeasureDetails')
    cy.get(homePage.measure).contains(cohortMeasureName).click()
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

})

describe('Upload Proportion Measure multigroup', () => {

    let proportionMeasureName = 'FHIRcms104TestingMeasure'
    let proportionMeasureFileToUpload = 'ProportionMultiGroup.zip'
  
    before('Login', () => {
      bonnieLogin.login()
    })
    after('Log Out', () => {
      bonnieLogin.logout()
    })

  it('Successfully upload Proportion measure with multigroup', () => {
    uploadProportionTestMeasure()

    navigateToMeasureDetails(proportionMeasureName)

    const lastNameSuffix = new Date().getTime()
    const distinctLastName = 'President' + lastNameSuffix

    cy.get(measureDetailsPage.patientListing).then((patientListing) => {
      const initialPatientCount = parseInt(patientListing.text())
      cy.log('patient count was:' + initialPatientCount)

      measureDetailsPage.clickAddPatient()
      enterPatientCharacteristics(distinctLastName)
      testPatientPage.clickSavePatient()
      verifyPatientAdded(initialPatientCount, distinctLastName)
      measureDetailsPage.navigateToHomeMeasurePage()
      navigateToMeasureDetails(proportionMeasureName)
      deletePatient.DeletePatient(distinctLastName)
      verifyPatientRemoved(initialPatientCount)
    })

    helper.visibleWithTimeout(measureDetailsPage.measurePageNavigationBtn)

    deleteMeasure.DeleteMeasure(proportionMeasureName)

    helper.visibleWithTimeout(measureDetailsPage.measurePageNavigationBtn)
  })

  function uploadProportionTestMeasure () {
    bonnieUploadMeasure.UploadMeasureToBonnie(proportionMeasureFileToUpload)
  }

  function navigateToMeasureDetails (proportionMeasureName) {
    cy.log('navigateToMeasureDetails')
    cy.get(homePage.measure).contains(proportionMeasureName).click()
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

})
