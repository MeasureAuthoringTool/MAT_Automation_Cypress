import * as bonnieLogin from '../../../../../support/Bonnie/BonnieLoginLogout'
import * as measureDetailsPage from '../../../../../pom/BonnieQDM/WI/MeasureDetailsPage'
import * as deletePatient from '../../../../../support/Bonnie/BonnieQDM/DeletePatient'
import * as bonnieUploadMeasure from '../../../../../support/Bonnie/BonnieUploadMeasure'
import * as testPatientPage from '../../../../../pom/BonnieQDM/WI/TestPatientPage'

const measureName = 'JEK_AT_Hormonal Therapy for Breast Cancer Patients within One Year of Diagnosis'
const measureFileToUpload = 'QDM56/Breast HT QCP-BR59 CQL-v1-0-007-QDM-5-6.zip'

const lastNameSuffix = new Date().getTime()
const distinctLastName = 'President' + lastNameSuffix

describe('Related To Attribute', () => {
  beforeEach('Login', () => {
    bonnieLogin.login()
  })

  afterEach('Log Out', () => {
    measureDetailsPage.navigateToHomeMeasurePage()
    measureDetailsPage.navigateToMeasureDetails(measureName)
    deletePatient.DeletePatient(distinctLastName)
    bonnieLogin.logout()
  })

  it('Verify Related To Attribute', () => {
    bonnieUploadMeasure.UploadMeasureToBonnie(measureFileToUpload, false)
    measureDetailsPage.navigateToMeasureDetails(measureName)

    measureDetailsPage.clickAddPatient()
    testPatientPage.enterPatientCharacteristics(distinctLastName)

    // Add Condition
    testPatientPage.dragAndDrop('condition', 'Condition: Diagnosis: Breast Cancer', 1)
    cy.log('Add Condition with Severity Attribute')
    cy.get(testPatientPage.attributeNameSelect).select('Severity')
    cy.get(testPatientPage.valueSetDirectRefSelect).select('M Category')
    cy.get(testPatientPage.addWidgetBtn).eq(0).click()
    testPatientPage.clickSavePatient()
    // Re-open patient verify the attribute is correct
    cy.get(measureDetailsPage.patientExpandBtn).click()
    cy.get(measureDetailsPage.patientEditBtn).click()
    // Expand Condition
    testPatientPage.toggleDataElement(0)
    // Verify the Condition's data element is added
    cy.get(testPatientPage.existingValues).should('contain.text', 'Severity: SNOMEDCT: 277208005')
    cy.log('Condition with Severity Attribute added successfully')

    // Add Medication
    testPatientPage.dragAndDrop('medication', 'Medication: Administered: Tamoxifen or Aromatase Inhibitor Therapy Ingredient', 9)
    cy.log('Add Medication with Dosage Attribute')
    cy.get(testPatientPage.attributeNameSelect).select('Dosage')
    cy.get(testPatientPage.dosageValue).type('5')
    cy.get(testPatientPage.dosageUnit).type('kg')
    cy.get(testPatientPage.addWidgetBtn).eq(0).click()
    testPatientPage.clickSavePatient()
    // Re-open patient verify the attribute is correct
    cy.get(measureDetailsPage.patientExpandBtn).click()
    cy.get(measureDetailsPage.patientEditBtn).click()
    // Expand Medication
    testPatientPage.toggleDataElement(1)
    // Verify the Medication's data element is added
    cy.get(testPatientPage.existingValues).should('contain.text', 'Dosage: 5 \'kg\'')
    cy.log('Medication with Dosage Attribute added successfully')

    // Verify Related To attribute has both Diagnosis and Medication
    testPatientPage.dragAndDrop('encounter', 'Encounter: Performed: Estrogen Receptor or Progesterone Receptor Positive Breast Cancer', 4)
    cy.log('Add Related To attribute with Medication')
    cy.get(testPatientPage.attributeNameSelect).select('Related To')
    cy.get(testPatientPage.relatedToDropdown).eq(2).invoke('val').then((val) => {
      // Select Medication from dropdown
      cy.get(testPatientPage.relatedToSelect).eq(0).select(val)
    })
    cy.get(testPatientPage.addWidgetBtn).eq(0).click()
    testPatientPage.clickSavePatient()
    // Re-open patient verify the attribute is correct
    cy.get(measureDetailsPage.patientExpandBtn).click()
    cy.get(measureDetailsPage.patientEditBtn).click()
    // Expand Encounter
    testPatientPage.toggleDataElement(2)
    // Verify the Encounter's data element is added
    cy.get(testPatientPage.existingValues).should('contain.text', 'Related To: Medication, Administered: Tamoxifen or Aromatase Inhibitor Therapy Ingredient 11/12/2012 8:00 AM - 11/12/2012 8:15 AM')
    cy.log('Related To attribute with Medication added successfully')
  })
})
