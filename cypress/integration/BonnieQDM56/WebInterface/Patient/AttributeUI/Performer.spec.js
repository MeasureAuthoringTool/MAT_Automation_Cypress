import * as bonnieLogin from '../../../../../support/Bonnie/BonnieLoginLogout'
import * as measureDetailsPage from '../../../../../pom/BonnieQDM/WI/MeasureDetailsPage'
import * as deletePatient from '../../../../../support/Bonnie/BonnieQDM/DeletePatient'
import * as bonnieUploadMeasure from '../../../../../support/Bonnie/BonnieUploadMeasure'
import * as testPatientPage from '../../../../../pom/BonnieQDM/WI/TestPatientPage'

const measureName = 'JEK_AT_Hormonal Therapy for Breast Cancer Patients within One Year of Diagnosis'
const measureFileToUpload = 'QDM56/Breast HT QCP-BR59 CQL-v1-0-007-QDM-5-6.zip'

const lastNameSuffix = new Date().getTime()
const distinctLastName = 'President' + lastNameSuffix

describe('Performer Attribute', () => {
  beforeEach('Login', () => {
    bonnieLogin.login()
  })

  afterEach('Log Out', () => {
    measureDetailsPage.navigateToHomeMeasurePage()
    measureDetailsPage.navigateToMeasureDetails(measureName)
    deletePatient.DeletePatient(distinctLastName)
    bonnieLogin.logout()
  })

  it('Add Performer to Care Goal and verify it saves in Patient History successfully', () => {
    bonnieUploadMeasure.UploadMeasureToBonnie(measureFileToUpload, false)
    measureDetailsPage.navigateToMeasureDetails(measureName)

    measureDetailsPage.clickAddPatient()
    testPatientPage.enterPatientCharacteristics(distinctLastName)

    // Add Performer
    testPatientPage.dragAndDrop('care goal', 'Care Goal: Clinical Trial Participant', 0)
    cy.log('Add Performer Attribute')
    cy.get(testPatientPage.attributeNameSelect).select('Performer')
    cy.get(testPatientPage.identifierNamingSystemField).type('Test')
    cy.get(testPatientPage.identifierValueField).type('345')
    cy.get(testPatientPage.idField).type('Identifier')
    cy.get(testPatientPage.addWidgetBtn).eq(0).click()
    testPatientPage.clickSavePatient()
    // Re-open patient verify the attribute is correct
    cy.get(measureDetailsPage.patientExpandBtn).click()
    cy.get(measureDetailsPage.patientEditBtn).click()
    // Expand Care Goal
    testPatientPage.toggleDataElement(0)
    // Verify the Performer's data element is added
    cy.get(testPatientPage.existingValues).should('contain.text', 'Performer: [PatientEntity] Identifier: { Naming System: Test, Value: 345 }, id: Identifier')
    cy.log('Performer Attribute added successfully')
  })
})
