import * as helper from "../../../../support/helpers"
import * as bonnieLogin from "../../../../support/Bonnie/BonnieFHIR/BonnieLoginLogout"
import * as measureDetailsPage from "../../../../pom/BonnieFHIR/WI/MeasureDetailsPage"
import * as testPatientPage from "../../../../pom/BonnieFHIR/WI/TestPatientPage"
import * as bonnieUploadMeasure from "../../../../support/Bonnie/BonnieFHIR/BonnieUploadMeasure"
import * as dashboard from "../../../../pom/BonnieFHIR/WI/Dashboard"

// Can be any measure with Encounters
const measureName = "Cms111testingMeasure"
const measureFileName = "Cms111testingMeasure-v0-0-004-FHIR-4-0-1.zip"

const lastNameSuffix = new Date().getTime()
const distinctLastName = "President" + lastNameSuffix

describe("Measure with references", () => {
  beforeEach("Login", () => {
    bonnieLogin.login()
  })

  afterEach("Log Out", () => {
    bonnieLogin.logout()
  })

  it("can add a condition Reference with  Resource to Encounter", () => {
    bonnieUploadMeasure.UploadMeasureToBonnie(
      measureFileName,
      false
    )

    dashboard.navigateToMeasureDetails(measureName)

    measureDetailsPage.clickAddPatient()
    testPatientPage.enterPatientCharacteristics(distinctLastName)

    // Drag and drop Encounter from the left data elements list
    testPatientPage.dragAndDrop('management', 'Management: Encounter: Emergency Department Visit', '3')
    helper.verifySpinnerAppearsAndDissappears()

    // Add a reference to a condition
    cy.log('Reference')
    cy.get(testPatientPage.attributeNameSelect).select('diagnosis.condition')
    cy.get(testPatientPage.attributeTypeSelect).select('Reference')
    cy.get(testPatientPage.attributeReferenceTypeSelect).select('Condition')
    cy.get(testPatientPage.referenceValueSetDirectRefSelect).select('Dead')
    cy.get(testPatientPage.addWidgetBtn).eq(0).click()
    cy.log('Reference - done')

    // Verify the Encounter's data element is collapsed
    cy.get('.patient-criteria .criteria-details').should('be.visible')
    cy.get('.patient-criteria .criteria-details').should('contain.text', 'Encounter: Emergency Department Visit')

    // Verify the Condition's data element is expanded
    cy.get('.patient-criteria criteria-details hide').should('not.be.visible')
    cy.get('.patient-criteria form').should('contain.text', 'Clinical Summary: Condition: Dead')

    // Enter something into condition
    cy.get(testPatientPage.attributeNameSelect).select('verificationStatus')
    cy.get(testPatientPage.valueSetDirectRefSelect).select('ConditionVerificationStatus')
    cy.get(testPatientPage.valueSetCodeSelect).select('unconfirmed')
    cy.get(testPatientPage.addWidgetBtn).eq(0).click()
    cy.get(testPatientPage.exsistingAttribute).contains("verificationStatus: ConditionVerificationStatus: unconfirmed")

    // Collapse condition
    testPatientPage.toggleDataElement(1) 

    // Expand Encounter
    testPatientPage.toggleDataElement(0)

    // Verify there is a reference to the Condition resource
    cy.get(testPatientPage.exsistingAttribute).contains("diagnosis.condition: Condition/")

    // Click to drop the reference but the referenced Condition should still exist
    cy.get('button[data-attribute-name="diagnosis.condition"][data-call-method="removeValue"]').click()

    // Drop Encounter
    helper.click(testPatientPage.patientinverseDangerButton)
    helper.click(testPatientPage.attributeDeleteButton)

    // Expand Condition and remove
    testPatientPage.toggleDataElement(0)
    helper.click(testPatientPage.patientinverseDangerButton)
    helper.click(testPatientPage.attributeDeleteButton)

    // Click cancel button for patient to proceed back to measure details
    helper.click(testPatientPage.cancelBtn)

    helper.visibleWithTimeout(measureDetailsPage.measurePageNavigationBtn)

  })


})
