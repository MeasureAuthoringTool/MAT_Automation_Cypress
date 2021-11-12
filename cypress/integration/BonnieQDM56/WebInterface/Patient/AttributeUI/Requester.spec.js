import * as bonnieLogin from '../../../../../support/Bonnie/BonnieLoginLogout'
import * as measureDetailsPage from '../../../../../pom/BonnieQDM/WI/MeasureDetailsPage'
import * as deletePatient from '../../../../../support/Bonnie/BonnieQDM/DeletePatient'
import * as bonnieUploadMeasure from '../../../../../support/Bonnie/BonnieUploadMeasure'
import * as testPatientPage from '../../../../../pom/BonnieQDM/WI/TestPatientPage'

const measureName = 'Anticoagulation Therapy for Atrial Fibrillation/Flutter'
const measureFileToUpload = 'QDM56/CMS71-v11-4-004-QDM-5-6.zip'

const lastNameSuffix = new Date().getTime()
const distinctLastName = 'President' + lastNameSuffix

describe('Requester Attribute', () => {
  beforeEach('Login', () => {
    bonnieLogin.login()
  })

  afterEach('Log Out', () => {
    measureDetailsPage.navigateToHomeMeasurePage()
    measureDetailsPage.navigateToMeasureDetails(measureName)
    deletePatient.DeletePatient(distinctLastName)
    bonnieLogin.logout()
  })

  it('Add Requester to Intervention and verify it saves in Patient History successfully', () => {
    bonnieUploadMeasure.UploadMeasureToBonnie(measureFileToUpload, false)
    measureDetailsPage.navigateToMeasureDetails(measureName)

    measureDetailsPage.clickAddPatient()
    testPatientPage.enterPatientCharacteristics(distinctLastName)

    // Add Requester
    testPatientPage.dragAndDrop('intervention', 'Intervention: Order: Comfort Measures', 4)
    cy.log('Add Requester Attribute')
    cy.get(testPatientPage.attributeNameSelect).select('Requester')
    cy.get(testPatientPage.identifierNamingSystemField).type('Name')
    cy.get(testPatientPage.identifierValueField).type('123')
    cy.get(testPatientPage.idField).type('Identifier')
    cy.get(testPatientPage.addWidgetBtn).eq(0).click()
    testPatientPage.clickSavePatient()
    // Re-open patient verify the attribute is correct
    cy.get(measureDetailsPage.patientExpandBtn).click()
    cy.get(measureDetailsPage.patientEditBtn).click()
    // Expand Intervention
    testPatientPage.toggleDataElement(0)

    // Verify the Requester's data element is added
    cy.get(testPatientPage.existingValues).should('contain.text', 'Requester: [PatientEntity] Identifier: { Naming System: Name, Value: 123 }, id: Identifier')
    cy.log('Requester Attribute added successfully')
  })
})
