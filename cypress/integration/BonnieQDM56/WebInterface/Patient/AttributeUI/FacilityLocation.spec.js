import * as bonnieLogin from '../../../../../support/Bonnie/BonnieLoginLogout'
import * as measureDetailsPage from '../../../../../pom/BonnieQDM/WI/MeasureDetailsPage'
import * as deletePatient from '../../../../../support/Bonnie/BonnieQDM/DeletePatient'
import * as bonnieUploadMeasure from '../../../../../support/Bonnie/BonnieUploadMeasure'
import * as testPatientPage from '../../../../../pom/BonnieQDM/WI/TestPatientPage'

const measureName = 'Excessive Radiation Dose or Inadequate Image Quality for Diagnostic Computed Tomography (CT) in Adults (Facility OQR)'
const measureFileToUpload = 'QDM56/CMS1206-v0-1-006-QDM-5-6.zip'

const lastNameSuffix = new Date().getTime()
const distinctLastName = 'President' + lastNameSuffix

describe('Facility Location Attribute', () => {
  beforeEach('Login', () => {
    bonnieLogin.login()
  })

  afterEach('Log Out', () => {
    measureDetailsPage.navigateToHomeMeasurePage()
    measureDetailsPage.navigateToMeasureDetails(measureName)
    deletePatient.DeletePatient(distinctLastName)
    bonnieLogin.logout()
  })

  it('Add Facility Location to diagnostic study and verify it saves in Patient History successfully', () => {
    bonnieUploadMeasure.UploadMeasureToBonnie(measureFileToUpload, false)
    measureDetailsPage.navigateToMeasureDetails(measureName)

    measureDetailsPage.clickAddPatient()
    testPatientPage.enterPatientCharacteristics(distinctLastName)

    // Add Components
    testPatientPage.dragAndDrop('diagnostic study', 'Diagnostic Study: Performed: CT dose and image quality category', 0)
    cy.log('Add Components Attribute')
    cy.get(testPatientPage.attributeNameSelect).select('Facility Location')
    cy.get(testPatientPage.valueSetDirectRefSelect).select('Outpatient Encounter Locations')
    //cy.get(testPatientPage.componentsResult).select('Ratio')
    cy.get(testPatientPage.addWidgetBtn).eq(0).click()
    testPatientPage.clickSavePatient()
    // Re-open patient verify the attribute is correct
    cy.get(measureDetailsPage.patientExpandBtn).click()
    cy.get(measureDetailsPage.patientEditBtn).click()
    // Expand Laboratory Test
    testPatientPage.toggleDataElement(0)

    // Verify the Components data element is added
    cy.get(testPatientPage.existingValues).should('contain.text', 'Facility Location: [FacilityLocation] Code: SNOMEDCT: 14866005, Location Period: null - null')
    cy.log('Components Attribute added successfully')
  })
})
