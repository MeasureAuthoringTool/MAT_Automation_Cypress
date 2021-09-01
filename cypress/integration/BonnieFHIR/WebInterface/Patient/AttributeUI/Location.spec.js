import * as bonnieLogin from '../../../../../support/Bonnie/BonnieLoginLogout'
import * as bonnieUploadMeasure from '../../../../../support/Bonnie/BonnieUploadMeasure'
import * as measureDetailsPage from '../../../../../pom/BonnieFHIR/WI/MeasureDetailsPage'
import * as testPatientPage from '../../../../../pom/BonnieFHIR/WI/TestPatientPage'
import * as deletePatient from '../../../../../support/Bonnie/BonnieFHIR/DeletePatient'

const measureName = 'SBTESTCMS347'
const measureFileToUpload = 'FHIR/SBTESTCMS347-v0-0-008-FHIR-4-0-1 (1).zip'

const lastNameSuffix = new Date().getTime()
const distinctLastName = 'President' + lastNameSuffix

describe('Location Attribute', () => {
  beforeEach('Login', () => {
    bonnieLogin.login()
    bonnieUploadMeasure.UploadMeasureToBonnie(measureFileToUpload, false)
    measureDetailsPage.navigateToMeasureDetails(measureName)

    measureDetailsPage.clickAddPatient()
    testPatientPage.enterPatientCharacteristics(distinctLastName)

    testPatientPage.dragAndDrop('management', 'Management: Encounter: Emergency Department Visit', 36)
  })

  afterEach('Log Out', () => {
    measureDetailsPage.navigateToHomeMeasurePage()
    measureDetailsPage.navigateToMeasureDetails(measureName)
    deletePatient.DeletePatient(distinctLastName)
    bonnieLogin.logout()
  })

  it('Add Location to Encounter and verify it saves in Patient History successfully', () => {

    addLocationWithLocationAndPeriod()
    testPatientPage.clickSavePatient()

    // Re-open patient verify the attribute is correct
    cy.get(measureDetailsPage.patientExpandBtn).click()
    cy.get(measureDetailsPage.patientEditBtn).click()
    // Verify the Encounter's data element is collapsed
    cy.get('.patient-criteria .criteria-details').should('be.visible')
    cy.get('.patient-criteria .criteria-details').should('contain.text', 'Encounter: Emergency Department Visit')

    // Expand Encounter
    testPatientPage.toggleDataElement(0)

    // Verify the Location's data element is added
    cy.get('.patient-criteria form').should('contain.text', 'location: location: Location/active')

    // Remove location attribute with Location and Period
    cy.get(testPatientPage.deleteAttribute).click()
    cy.log('location attribute with Location and Period removed successfully')

    addLocationWithLocation()
    testPatientPage.clickSavePatient()

    // Re-open patient verify the attribute is correct
    cy.get(measureDetailsPage.patientExpandBtn).click()
    cy.get(measureDetailsPage.patientEditBtn).click()
    // Verify the Encounter's data element is collapsed
    cy.get('.patient-criteria .criteria-details').should('be.visible')
    cy.get('.patient-criteria .criteria-details').should('contain.text', 'Encounter: Emergency Department Visit')

    // Collapse location
    testPatientPage.toggleDataElement(1)

    // Expand Encounter
    testPatientPage.toggleDataElement(0)

    // Verify the Location's data element is added
    cy.get('.patient-criteria form').should('contain.text', 'location: location: Location/birth-date')

    // Remove Location attribute with Location
    cy.get(testPatientPage.deleteAttribute).click()
    cy.log('Location attribute with Location removed successfully')

    addLocationWithPeriod()
    testPatientPage.clickSavePatient()

    // Re-open patient verify the attribute is correct
    cy.get(measureDetailsPage.patientExpandBtn).click()
    cy.get(measureDetailsPage.patientEditBtn).click()
    // Verify the Encounter's data element is collapsed
    cy.get('.patient-criteria .criteria-details').should('be.visible')
    cy.get('.patient-criteria .criteria-details').should('contain.text', 'Encounter: Emergency Department Visit')

    // Expand Encounter
    testPatientPage.toggleDataElement(0)

    // Verify the Location's data element is added
    cy.get('.patient-criteria form').should('contain.text', 'location: period')

    // Remove Location attribute with Period
    cy.get(testPatientPage.deleteAttribute).click()
    cy.log('Location attribute with Period removed successfully')
  })
})

// Add location attribute with Location and Period
function addLocationWithLocationAndPeriod () {
  cy.log('location.Location + location.Period ')
  cy.get(testPatientPage.attributeNameSelect).select('location')
  cy.get(testPatientPage.locationSelect).select('Location')
  cy.get(testPatientPage.referenceValueSetDirectRefSelect).select('active')
  cy.get(testPatientPage.periodStartDate).click()
  cy.get(testPatientPage.periodEndDate).click()
  cy.get(testPatientPage.addWidgetBtn).eq(0).click()
  cy.log('location attribute with Location and Period added successfully')
}

// Add location Attribute with Location
function addLocationWithLocation () {
  cy.log('location.Location')
  cy.get(testPatientPage.attributeNameSelect).select('location')
  cy.get(testPatientPage.locationSelect).select('Location')
  cy.get(testPatientPage.referenceValueSetDirectRefSelect).select('Birthdate')
  cy.get(testPatientPage.addWidgetBtn).eq(0).click()
  cy.log('Location attribute with Location added successfully')
}

// Add location Attribute with Period
function addLocationWithPeriod () {
  cy.log('location.Period')
  cy.get(testPatientPage.attributeNameSelect).select('location')
  cy.get(testPatientPage.periodStartDate).click()
  cy.get(testPatientPage.periodEndDate).click()
  cy.get(testPatientPage.addWidgetBtn).eq(0).click()
  cy.log('Location attribute with Period added successfully')
}
