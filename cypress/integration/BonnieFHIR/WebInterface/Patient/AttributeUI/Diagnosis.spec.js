import * as bonnieLogin from '../../../../../support/Bonnie/BonnieLoginLogout'
import * as bonnieUploadMeasure from '../../../../../support/Bonnie/BonnieUploadMeasure'
import * as measureDetailsPage from '../../../../../pom/BonnieFHIR/WI/MeasureDetailsPage'
import * as testPatientPage from '../../../../../pom/BonnieFHIR/WI/TestPatientPage'
import * as deletePatient from '../../../../../support/Bonnie/BonnieFHIR/DeletePatient'

const measureName = 'SBTESTCMS347'
const measureFileToUpload = 'FHIR/SBTESTCMS347-v0-0-016-FHIR-4-0-1.zip'

const lastNameSuffix = new Date().getTime()
const distinctLastName = 'President' + lastNameSuffix

describe('Diagnosis Attribute', () => {
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

  it('Add Diagnosis to Encounter and verify it saves in Patient History successfully', () => {

    addDiagnosisWithCondition()
    testPatientPage.clickSavePatient()

    // Re-open patient verify the attribute is correct
    cy.get(measureDetailsPage.patientExpandBtn).click()
    cy.get(measureDetailsPage.patientEditBtn).click()
    // Verify the Encounter's data element is collapsed
    cy.get('.patient-criteria .criteria-details').should('be.visible')
    cy.get('.patient-criteria .criteria-details').should('contain.text', 'Encounter: Emergency Department Visit')

    // Collapse Diagnosis
    testPatientPage.toggleDataElement(1)

    // Expand Encounter
    testPatientPage.toggleDataElement(0)

    // Verify the Location's data element is added
    cy.get('.patient-criteria form').should('contain.text', 'diagnosis: condition: Condition/birth-date')

    // Remove Diagnosis attribute with Condition
    cy.get(testPatientPage.deleteAttribute).click()
    cy.log('Diagnosis attribute with Condition removed successfully')

    addDiagnosisWithRank()
    testPatientPage.clickSavePatient()

    // Re-open patient verify the attribute is correct
    cy.get(measureDetailsPage.patientExpandBtn).click()
    cy.get(measureDetailsPage.patientEditBtn).click()
    // Verify the Encounter's data element is collapsed
    cy.get('.patient-criteria .criteria-details').should('be.visible')
    cy.get('.patient-criteria .criteria-details').should('contain.text', 'Encounter: Emergency Department Visit')

    // Expand Encounter
    testPatientPage.toggleDataElement(0)
    // Verify the Diagnosis's data element is added
    cy.get('.patient-criteria form').should('contain.text', 'diagnosis: rank: 10')

    // Remove Diagnosis attribute with Rank
    cy.get(testPatientPage.deleteAttribute).click()
    cy.log('Diagnosis attribute with Rank removed successfully')

    addDiagnosisWithUse()
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
    cy.get('.patient-criteria form').should('contain.text', 'diagnosis: use')

    // Remove Location attribute with Period
    cy.get(testPatientPage.deleteAttribute).click()
    cy.log('Diagnosis attribute with Use removed successfully')

    addDiagnosisWithConditionRankAndUse()
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
    cy.get('.patient-criteria form').should('contain.text', 'diagnosis: condition')

    // Remove Diagnosis attribute with Condition, Rank and Use
    cy.get(testPatientPage.deleteAttribute).click()
    cy.log('Diagnosis attribute with Condition, Rank and Use removed successfully')
  })
})

// Add Diagnosis attribute with Condition
function addDiagnosisWithCondition () {
  cy.log('Diagnosis.Condition')
  cy.get(testPatientPage.attributeNameSelect).select('diagnosis')
  cy.get(testPatientPage.diagnosisCondition).select('Condition')
  cy.get(testPatientPage.referenceValueSetDirectRefSelect).select('Birthdate')
  cy.get(testPatientPage.addWidgetBtn).eq(0).click()
  cy.log('Diagnosis attribute with Condition added successfully')
}

// Add Diagnosis Attribute with Rank
function addDiagnosisWithRank () {
  cy.log('Diagnosis.Rank')
  // Collapse Diagnosis
  testPatientPage.toggleDataElement(1)
  cy.get(testPatientPage.attributeNameSelect).select('diagnosis')
  cy.get(testPatientPage.diagnosisRank).type(10)
  cy.get(testPatientPage.addWidgetBtn).eq(0).click()
  cy.log('Diagnosis attribute with Rank added successfully')
}

// Add Diagnosis Attribute with Use
function addDiagnosisWithUse () {
  cy.log('Diagnosis.Use')
  cy.get(testPatientPage.attributeNameSelect).select('diagnosis')
  cy.get(testPatientPage.useValueSetDirectRefSelect).select('active')
  cy.get(testPatientPage.addWidgetBtn).eq(0).click()
  cy.log('Diagnosis attribute with Use added successfully')
}

//Add Diagnosis attribute with condition, rank and use
function addDiagnosisWithConditionRankAndUse () {
  cy.log('Diagnosis.Condition,rank and use')
  cy.get(testPatientPage.attributeNameSelect).select('diagnosis')
  cy.get(testPatientPage.diagnosisCondition).select('Condition')
  cy.get(testPatientPage.referenceValueSetDirectRefSelect).select('allergy-active')
  cy.get(testPatientPage.diagnosisRank).type(100)
  cy.get(testPatientPage.useValueSetDirectRefSelect).select('Billing')
  cy.get(testPatientPage.addWidgetBtn).eq(0).click()
  cy.log('Diagnosis attribute with Condition, Rank and Use added successfully')
}
