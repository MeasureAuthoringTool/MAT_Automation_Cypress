import * as bonnieLogin from '../../../../../support/Bonnie/BonnieLoginLogout'
import * as bonnieUploadMeasure from '../../../../../support/Bonnie/BonnieUploadMeasure'
import * as measureDetailsPage from '../../../../../pom/BonnieFHIR/WI/MeasureDetailsPage'
import * as testPatientPage from '../../../../../pom/BonnieFHIR/WI/TestPatientPage'
import * as helper from '../../../../../support/helpers'
import * as deletePatient from '../../../../../support/Bonnie/BonnieFHIR/DeletePatient'
import * as homePage from '../../../../../pom/BonnieFHIR/WI/Homepage'

const measureName = 'SBTESTCMS347'
const measureFileToUpload = 'FHIR/SBTESTCMS347-v0-0-008-FHIR-4-0-1 (1).zip'

describe('Measure with Loaction', () => {
  beforeEach('Login', () => {
    bonnieLogin.login()
  })

  afterEach('Log Out', () => {
    bonnieLogin.logout()
  })

  it('can add Location to Encounter', () => {
    uploadTestMeasure()

    navigateToMeasureDetails(measureName)

    const lastNameSuffix = new Date().getTime()
    const distinctLastName = 'President' + lastNameSuffix

    cy.get(measureDetailsPage.patientListing).then((patientListing) => {
      const initialPatientCount = parseInt(patientListing.text(), 10)
      cy.log('patient count was:' + initialPatientCount)

      measureDetailsPage.clickAddPatient()
      enterPatientCharacteristics(distinctLastName)
      testPatientPage.dragAndDrop('management', 'Management: Encounter: Emergency Department Visit', 36)
      addLocation()
      testPatientPage.clickSavePatient()
      testPatientPage.verifyPatientAdded(initialPatientCount, distinctLastName)
      measureDetailsPage.navigateToHomeMeasurePage()
      navigateToMeasureDetails(measureName)
      deletePatient.DeletePatient(distinctLastName)
      deletePatient.VerifyPatientRemoved(initialPatientCount)
    })

    helper.visibleWithTimeout(measureDetailsPage.measurePageNavigationBtn)
  })

  function uploadTestMeasure () {
    bonnieUploadMeasure.UploadMeasureToBonnie(measureFileToUpload)
  }

  function navigateToMeasureDetails (measureName) {
    cy.log('navigateToMeasureDetails')
    cy.get(homePage.measure).contains(measureName).click()
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

  function addLocation () {
    // Add location Attribute with Location
    cy.log('location.Location')
    cy.get(testPatientPage.attributeNameSelect).select('location')
    cy.get(testPatientPage.locationSelect).select('Location')
    cy.get(testPatientPage.referenceValueSetDirectRefSelect).select('Birthdate')
    cy.get(testPatientPage.addWidgetBtn).eq(0).click()
    cy.log('location.Location - done')

    // Verify the Encounter's data element is collapsed
    cy.get('.patient-criteria .criteria-details').should('be.visible')
    cy.get('.patient-criteria .criteria-details').should('contain.text', 'Encounter: Emergency Department Visit')

    // Collapse location
    testPatientPage.toggleDataElement(1)

    // Expand Encounter
    testPatientPage.toggleDataElement(0)

    // Verify the Location's data element is added
    cy.get('.patient-criteria form').should('contain.text', 'location: location: Location/birth-date')

    // Add location Attribute with Period
    cy.log('location.Period')
    cy.get(testPatientPage.attributeNameSelect).select('location')
    cy.get(testPatientPage.periodStartDate).click()
    cy.get(testPatientPage.periodEndDate).click()
    cy.get(testPatientPage.addWidgetBtn).eq(0).click()
    cy.log('location.Period - done')

    // Verify the Encounter's data element is collapsed
    cy.get('.patient-criteria .criteria-details').should('be.visible')
    cy.get('.patient-criteria .criteria-details').should('contain.text', 'Encounter: Emergency Department Visit')

    // Verify the Location's data element is added
    cy.get('.patient-criteria form').should('contain.text', 'location: period')

    // Add location attribute with Location and Period
    cy.log('location.Location')
    cy.get(testPatientPage.attributeNameSelect).select('location')
    cy.get(testPatientPage.locationSelect).select('Location')
    cy.get(testPatientPage.referenceValueSetDirectRefSelect).select('active')
    cy.get(testPatientPage.periodStartDate).click()
    cy.get(testPatientPage.periodEndDate).click()
    cy.get(testPatientPage.addWidgetBtn).eq(0).click()
    cy.log('location.Location and location.Period - done')

    // Verify the Encounter's data element is collapsed
    cy.get('.patient-criteria .criteria-details').should('be.visible')
    cy.get('.patient-criteria .criteria-details').should('contain.text', 'Encounter: Emergency Department Visit')

    // Collapse location
    testPatientPage.toggleDataElement(2)

    // Expand Encounter
    testPatientPage.toggleDataElement(0)
  }
})
