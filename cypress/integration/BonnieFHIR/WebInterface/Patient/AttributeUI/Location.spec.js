import * as bonnieLogin from '../../../../../support/Bonnie/BonnieLoginLogout'
import * as bonnieUploadMeasure from '../../../../../support/Bonnie/BonnieUploadMeasure'
import * as dashboard from '../../../../../pom/BonnieFHIR/WI/Dashboard'
import * as measureDetailsPage from '../../../../../pom/BonnieFHIR/WI/MeasureDetailsPage'
import * as testPatientPage from '../../../../../pom/BonnieFHIR/WI/TestPatientPage'
import * as helper from '../../../../../support/helpers'

const lastNameSuffix = new Date().getTime()
const distinctLastName = "President" + lastNameSuffix

const measureNameWithLocation = "SBTESTCMS347"
const measureFileNameWithLocation = "FHIR/SBTESTCMS347-v0-0-008-FHIR-4-0-1 (1).zip"

describe("Measure with Loaction", () => {
  beforeEach("Login", () => {
    bonnieLogin.login()
  })

  afterEach("Log Out", () => {
    bonnieLogin.logout()
  })

  it("can add Location to Encounter", () => {
    bonnieUploadMeasure.UploadMeasureToBonnie(
      measureFileNameWithLocation,
      false
    )

    dashboard.navigateToMeasureDetails(measureNameWithLocation)

    measureDetailsPage.clickAddPatient()
    testPatientPage.enterPatientCharacteristics(distinctLastName)

    // Drag and drop Encounter from the left data elements list
    testPatientPage.dragAndDrop('management', 'Management: Encounter: Emergency Department Visit', '36')

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

   //Add location attribute with Location and Period
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

    // Click cancel button for patient to proceed back to measure details
    helper.click(testPatientPage.cancelBtn)

    helper.visibleWithTimeout(measureDetailsPage.measurePageNavigationBtn)

  })
})
