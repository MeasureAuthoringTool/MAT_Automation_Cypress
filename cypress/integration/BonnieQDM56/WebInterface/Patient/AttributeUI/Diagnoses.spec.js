import * as bonnieLogin from '../../../../../support/Bonnie/BonnieLoginLogout'
import * as bonnieUploadMeasure from '../../../../../support/Bonnie/BonnieUploadMeasure'
import * as measureDetailsPage from '../../../../../pom/BonnieQDM/WI/MeasureDetailsPage'
import * as testPatientPage from '../../../../../pom/BonnieQDM/WI/TestPatientPage'
import * as deletePatient from '../../../../../support/Bonnie/BonnieQDM/DeletePatient'

const measureName = 'JEK_AT_Hormonal Therapy for Breast Cancer Patients within One Year of Diagnosis'
const measureFileToUpload = 'QDM56/Breast HT QCP-BR59 CQL-v1-0-007-QDM-5-6.zip'

const lastNameSuffix = new Date().getTime()
const distinctLastName = 'President' + lastNameSuffix

describe('Diagnoses Attribute', () => {
  beforeEach('Login', () => {
    bonnieLogin.login()
  })

  afterEach('Log Out', () => {
    measureDetailsPage.navigateToHomeMeasurePage()
    measureDetailsPage.navigateToMeasureDetails(measureName)
    deletePatient.DeletePatient(distinctLastName)
    bonnieLogin.logout()
  })

  it('Add Diagnoses to Encounter and verify it saves in Patient History successfully', () => {

    bonnieUploadMeasure.UploadMeasureToBonnie(measureFileToUpload, false)
    measureDetailsPage.navigateToMeasureDetails(measureName)

    measureDetailsPage.clickAddPatient()
    testPatientPage.enterPatientCharacteristics(distinctLastName)

    testPatientPage.dragAndDrop('encounter', 'Encounter: Performed: Estrogen Receptor or Progesterone Receptor Positive Breast Cancer', 4)

    // Diagnoses with code
    addDiagnosesWithCode()
    testPatientPage.clickSavePatient()
    // Re-open patient verify the attribute is correct
    cy.get(measureDetailsPage.patientExpandBtn).click()
    cy.get(measureDetailsPage.patientEditBtn).click()
    // Expand Encounter
    testPatientPage.toggleDataElement(0)
    // Verify the Diagnoses data element is added
    cy.get(testPatientPage.existingValues).should('contain.text', 'Diagnoses: [DiagnosisComponent] Code: SNOMEDCT: 109886000, Present on Admission Indicator: null, Rank: null')
    // Remove Diagnoses attribute with Code
    cy.get(testPatientPage.deleteAttribute).click()
    cy.log('Diagnoses attribute with Code removed successfully')

    // Diagnoses with Present on Admission Indicator
    addDiagnosesWithPresentonAdmissionIndicator()
    testPatientPage.clickSavePatient()
    // Re-open patient verify the attribute is correct
    cy.get(measureDetailsPage.patientExpandBtn).click()
    cy.get(measureDetailsPage.patientEditBtn).click()
    // Expand Encounter
    testPatientPage.toggleDataElement(0)
    // Verify the Diagnoses data element is added
    cy.get(testPatientPage.existingValues).should('contain.text', 'Diagnoses: [DiagnosisComponent] Code: SNOMEDCT: 109886000, Present on Admission Indicator: SNOMEDCT: 419099009, Rank: null')
    // Remove Diagnoses attribute with Present on Admission Indicator
    cy.get(testPatientPage.deleteAttribute).click()
    cy.log('Diagnoses attribute with Present on Admission Indicator removed successfully')

    // Add Diagnoses with Rank
    addDiagnosesWithRank()
    testPatientPage.clickSavePatient()
    // Re-open patient verify the attribute is correct
    cy.get(measureDetailsPage.patientExpandBtn).click()
    cy.get(measureDetailsPage.patientEditBtn).click()
    // Expand Encounter
    testPatientPage.toggleDataElement(0)
    // Verify the Diagnoses data element is added
    cy.get(testPatientPage.existingValues).should('contain.text', 'Diagnoses: [DiagnosisComponent] Code: SNOMEDCT: 109886000, Present on Admission Indicator: null, Rank: 2')
    // Remove Diagnoses attribute with Rank
    cy.get(testPatientPage.deleteAttribute).click()
    cy.log('Diagnoses attribute with Rank removed successfully')

    // Diagnoses with Code, Present on Admission Indicator and Rank
    addDiagnosesWithCodePresentonAdmissionIndicatorAndRank()
    testPatientPage.clickSavePatient()
    // Re-open patient verify the attribute is correct
    cy.get(measureDetailsPage.patientExpandBtn).click()
    cy.get(measureDetailsPage.patientEditBtn).click()
    // Expand Encounter
    testPatientPage.toggleDataElement(0)
    // Verify the Diagnoses data element is added
    cy.get(testPatientPage.existingValues).should('contain.text', 'Diagnoses: [DiagnosisComponent] Code: CDCREC: 2135-2, Present on Admission Indicator: ICD9CM: V86.0, Rank: 100')
    // Remove Diagnoses attribute with Code, Present on Admission Indicator and Rank
    cy.get(testPatientPage.deleteAttribute).click()
    cy.log('Diagnoses attribute with Code, Present on Admission Indicator and Rank removed successfully')
  })
})

// Add Diagnoses attribute with Code
function addDiagnosesWithCode () {
  cy.log('Diagnoses.Code')
  cy.get(testPatientPage.attributeNameSelect).select('diagnoses')
  cy.get(testPatientPage.codeValueSetDirectRefSelect).select('Breast Cancer')
  cy.get(testPatientPage.addWidgetBtn).eq(0).click()
  cy.log('Diagnoses attribute with Code added successfully')
}

// Add Diagnoses Attribute with Present on Admission Indicator
function addDiagnosesWithPresentonAdmissionIndicator () {
  cy.log('Diagnoses.PresentonAdmissionIndicator')
  cy.get(testPatientPage.attributeNameSelect).select('diagnoses')
  cy.get(testPatientPage.codeValueSetDirectRefSelect).select('Breast Cancer')
  cy.get(testPatientPage.valueSetDirectRefSelect).select('Dead')
  cy.get(testPatientPage.addWidgetBtn).eq(0).click()
  cy.log('Diagnoses attribute with Present on Admission Indicator added successfully')
}

// Add Diagnoses Attribute with Rank
function addDiagnosesWithRank () {
  cy.log('Diagnoses.Rank')
  cy.get(testPatientPage.attributeNameSelect).select('diagnoses')
  cy.get(testPatientPage.codeValueSetDirectRefSelect).select('Breast Cancer')
  cy.get(testPatientPage.rankInputField).type(2)
  cy.get(testPatientPage.addWidgetBtn).eq(0).click()
  cy.log('Diagnoses attribute with Rank added successfully')
}

// Add Diagnoses attribute with Code, Present on Admission Indicator and Rank
function addDiagnosesWithCodePresentonAdmissionIndicatorAndRank () {
  cy.log('Diagnoses.Code,Present on Admission Indicator and Rank')
  cy.get(testPatientPage.attributeNameSelect).select('diagnoses')
  cy.get(testPatientPage.codeValueSetDirectRefSelect).select('Ethnicity')
  cy.get(testPatientPage.valueSetDirectRefSelect).select('Breast Cancer ER Positive')
  cy.get(testPatientPage.rankInputField).type(100)
  cy.get(testPatientPage.addWidgetBtn).eq(0).click()
  cy.log('Diagnoses attribute with Code,Present on Admission Indicator and Rank added successfully')
}
