import * as bonnieLogin from '../../../../../support/Bonnie/BonnieLoginLogout'
import * as bonnieUploadMeasure from '../../../../../support/Bonnie/BonnieFHIR/BonnieUploadMeasure'
import * as dashboard from '../../../../../pom/BonnieFHIR/WI/Dashboard'
import * as measureDetailsPage from '../../../../../pom/BonnieFHIR/WI/MeasureDetailsPage'
import * as testPatientPage from '../../../../../pom/BonnieFHIR/WI/TestPatientPage'
import * as helper from '../../../../../support/helpers'

// Can be any measure with Components
const measureName = "SBTESTCMS347"
const measureFileName = "FHIR/SBTESTCMS347-v0-0-008-FHIR-4-0-1 (1).zip"

const lastNameSuffix = new Date().getTime()
const distinctLastName = "President" + lastNameSuffix

describe("Measure with component", () => {
  beforeEach("Login", () => {
    bonnieLogin.login()
  })

  afterEach("Log Out", () => {
    bonnieLogin.logout()
  })

  it("can add code and value to component ", () => {
    bonnieUploadMeasure.UploadMeasureToBonnie(
      measureFileName,
      false
    )

    dashboard.navigateToMeasureDetails(measureName)

    measureDetailsPage.clickAddPatient()
    testPatientPage.enterPatientCharacteristics(distinctLastName)

    // Drag and drop Diagnostics from the left data elements list
    testPatientPage.dragAndDrop('diagnostics', 'Diagnostics: Observation: LDL Cholesterol', '24')

    // Add a code to component
    cy.log('Component.code')
    cy.get(testPatientPage.attributeNameSelect).select('component')
    cy.get(testPatientPage.attributeTypeSelect).select('ObservationComponent')
    cy.get(testPatientPage.valueSetDirectRefSelect).select('LOINCCodes')
    cy.get(testPatientPage.addWidgetBtn).eq(0).click()
    cy.log('Component.code - done')

    // Verify the Component Code is added
    cy.get('.patient-criteria form').should('contain.text', 'component: code')

    // Add a value to component
    cy.log('Component.value')
    cy.get(testPatientPage.attributeNameSelect).select('component')
    cy.get(testPatientPage.attributeTypeSelect).select('ObservationComponent')
    cy.get('select[name="type"]:visible:last').select('CodeableConcept')
    cy.get(testPatientPage.valueSetDirectRefSelect).select('active')
    cy.get(testPatientPage.addWidgetBtn).eq(0).click()
    cy.log('Component.value - done')

    // Verify the Component Value is added
    cy.get('.patient-criteria form').should('contain.text', 'component: value')

    // Add both code and value  to component
    cy.log('Component.code and value')
    cy.get(testPatientPage.attributeNameSelect).select('component')
    cy.get(testPatientPage.attributeTypeSelect).select('ObservationComponent')
    cy.get(testPatientPage.valueSetDirectRefSelect).select('LOINCCodes')
    cy.get('select[name="type"]:visible:last').select('CodeableConcept')
    cy.get(testPatientPage.valueSetDirectRefSelect).select('Birthdate')
    cy.get(testPatientPage.addWidgetBtn).eq(0).click()
    cy.log('Component.code and value - done')

    // Verify the Component code and value are added
    cy.get('.patient-criteria form').should('contain.text', 'component: code: [LOINC: 1-8] | value: [LOINC: 21112-8]')

    // Click cancel button for patient to proceed back to measure details
    helper.click(testPatientPage.cancelBtn)

    helper.visibleWithTimeout(measureDetailsPage.measurePageNavigationBtn)

  })
})
