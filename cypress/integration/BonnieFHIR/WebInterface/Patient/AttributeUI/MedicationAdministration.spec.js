import * as bonnieLogin from '../../../../../support/Bonnie/BonnieLoginLogout'
import * as bonnieUploadMeasure from '../../../../../support/Bonnie/BonnieUploadMeasure'
import * as measureDetailsPage from '../../../../../pom/BonnieFHIR/WI/MeasureDetailsPage'
import * as testPatientPage from '../../../../../pom/BonnieFHIR/WI/TestPatientPage'
import * as deletePatient from '../../../../../support/Bonnie/BonnieFHIR/DeletePatient'

describe('Medication Administration Attribute', () => {
  const measureName = 'EXM108CV'
  const measureFileToUpload = 'FHIR/EXM108CV-v0-2-002-FHIR-4-0-1.zip'

  const lastNameSuffix = new Date().getTime()
  const distinctLastName = 'President' + lastNameSuffix

  beforeEach('Login', () => {
    bonnieLogin.login()
    bonnieUploadMeasure.UploadMeasureToBonnie(measureFileToUpload, false)
    measureDetailsPage.navigateToMeasureDetails(measureName)

    measureDetailsPage.clickAddPatient()
    testPatientPage.enterPatientCharacteristics(distinctLastName)
  })
  afterEach('Log Out', () => {
    measureDetailsPage.navigateToHomeMeasurePage()
    measureDetailsPage.navigateToMeasureDetails(measureName)
    deletePatient.DeletePatient(distinctLastName)
    bonnieLogin.logout()
  })

  it('Add Medication Administration Attribute and verify it saves in Patient History successfully', () => {

    testPatientPage.dragAndDrop('medications', 'Medications: MedicationAdministration: Low Dose Unfractionated Heparin for VTE Prophylaxis', 23)

    MedicationAdministrationWithDosageroute()
    testPatientPage.clickSavePatient()
    // Re-open patient verify the attribute is correct
    cy.get(measureDetailsPage.patientExpandBtn).click()
    cy.get(measureDetailsPage.patientEditBtn).click()
    // Expand MedicationAdministration
    testPatientPage.toggleDataElement(0)
    // Verify the Medication Administration's data element is added
    cy.get(testPatientPage.exsistingAttribute).contains('dosage.route: [ConditionClinicalStatusCodes: active]')
    // Remove Medication Administration with Dosage.route
    cy.get(testPatientPage.deleteAttribute).click()
    cy.log('Medication Administration with Dosage.route removed successfully')

    MedicationAdministrationWithReasonCode()
    testPatientPage.clickSavePatient()
    // Re-open patient verify the attribute is correct
    cy.get(measureDetailsPage.patientExpandBtn).click()
    cy.get(measureDetailsPage.patientEditBtn).click()
    // Expand MedicationAdministration
    testPatientPage.toggleDataElement(0)
    // Verify the Medication Administration's data element is added
    cy.get(testPatientPage.exsistingAttribute).contains('reasonCode: [DiagnosisRole: billing]')
    // Remove Medication Administration with Dosage.route
    cy.get(testPatientPage.deleteAttribute).click()
    cy.log('Medication Administration with ReasonCode removed successfully')

    MedicationAdministrationWithStatus()
    testPatientPage.clickSavePatient()
    // Re-open patient verify the attribute is correct
    cy.get(measureDetailsPage.patientExpandBtn).click()
    cy.get(measureDetailsPage.patientEditBtn).click()
    // Expand MedicationAdministration
    testPatientPage.toggleDataElement(0)
    // Verify the Medication Administration's data element is added
    cy.get(testPatientPage.exsistingAttribute).contains('status: completed')
    // Remove Medication Administration with Dosage.route
    cy.get(testPatientPage.deleteAttribute).click()
    cy.log('Medication Administration with Status removed successfully')

    MedicationAdministrationWithStatusReason()
    testPatientPage.clickSavePatient()
    // Re-open patient verify the attribute is correct
    cy.get(measureDetailsPage.patientExpandBtn).click()
    cy.get(measureDetailsPage.patientEditBtn).click()
    // Expand MedicationAdministration
    testPatientPage.toggleDataElement(0)
    // Verify the Medication Administration's data element is added
    cy.get(testPatientPage.exsistingAttribute).contains('statusReason: [AllergyIntoleranceClinicalStatusCodes: active]')
    // Remove Medication Administration with Dosage.route
    cy.get(testPatientPage.deleteAttribute).click()
    cy.log('Medication Administration with StatusReason removed successfully')
  })
})

function MedicationAdministrationWithDosageroute () {
  cy.log('Add Medication Administration with Dosage.route')
  cy.get(testPatientPage.attributeNameSelect).select('dosage.route')
  cy.get(testPatientPage.valueSetDirectRefSelect).select('active')
  cy.get(testPatientPage.addWidgetBtn).eq(0).click()
  cy.log('Medication Administration with Dosage.route added successfully')
}

function MedicationAdministrationWithReasonCode () {
  cy.log('Add Medication Administration with ReasonCode')
  cy.get(testPatientPage.attributeNameSelect).select('reasonCode')
  cy.get(testPatientPage.valueSetDirectRefSelect).select('Billing')
  cy.get(testPatientPage.addWidgetBtn).eq(0).click()
  cy.log('Medication Administration with ReasonCode added successfully')
}

function MedicationAdministrationWithStatus () {
  cy.log('Add Medication Administration with Status')
  cy.get(testPatientPage.attributeNameSelect).select('status')
  cy.get(testPatientPage.valueSetDirectRefSelectGlobal).select('MedicationAdministration Status Codes')
  cy.get(testPatientPage.addWidgetBtn).eq(0).click()
  cy.log('MedicationAdministration with Status added successfully')
}

function MedicationAdministrationWithStatusReason () {
  cy.log('Add Medication Administration with StatusReason')
  cy.get(testPatientPage.attributeNameSelect).select('statusReason')
  cy.get(testPatientPage.valueSetDirectRefSelect).select('allergy-active')
  cy.get(testPatientPage.addWidgetBtn).eq(0).click()
  cy.log('MedicationAdministration with StatusReason added successfully')
}