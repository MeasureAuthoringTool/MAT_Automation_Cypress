import * as bonnieLogin from '../../../../../support/Bonnie/BonnieLoginLogout'
import * as measureDetailsPage from '../../../../../pom/BonnieQDM/WI/MeasureDetailsPage'
import * as deletePatient from '../../../../../support/Bonnie/BonnieQDM/DeletePatient'
import * as bonnieUploadMeasure from '../../../../../support/Bonnie/BonnieUploadMeasure'
import * as testPatientPage from '../../../../../pom/BonnieQDM/WI/TestPatientPage'

const measureName = 'Antithrombotic Therapy By End of Hospital Day 2'
const measureFileToUpload = 'QDM56/CMS72-v10-6-010-QDM-5-6.zip'

const lastNameSuffix = new Date().getTime()
const distinctLastName = 'President' + lastNameSuffix

describe('Components Attribute', () => {
  beforeEach('Login', () => {
    bonnieLogin.login()
  })

  afterEach('Log Out', () => {
    measureDetailsPage.navigateToHomeMeasurePage()
    measureDetailsPage.navigateToMeasureDetails(measureName)
    deletePatient.DeletePatient(distinctLastName)
    bonnieLogin.logout()
  })

  it('Add Components to laboratory test and verify it saves in Patient History successfully', () => {
    bonnieUploadMeasure.UploadMeasureToBonnie(measureFileToUpload, false)
    measureDetailsPage.navigateToMeasureDetails(measureName)

    measureDetailsPage.clickAddPatient()
    testPatientPage.enterPatientCharacteristics(distinctLastName)

    // Add Components
    testPatientPage.dragAndDrop('laboratory test', 'Laboratory Test: Performed: INR', 6)
    cy.log('Add Components Attribute')
    cy.get(testPatientPage.attributeNameSelect).select('Components')
    cy.get(testPatientPage.valueSetDirectRefSelect).select('Pharmacological Contraindications For Antithrombotic Therapy')
    cy.get(testPatientPage.componentsResult).select('Ratio')
    cy.get(testPatientPage.componentsResultValue1).type('4')
    cy.get(testPatientPage.componentsResultUnit1).type('kg')
    cy.get(testPatientPage.componentsResultValue2).type('50')
    cy.get(testPatientPage.componentsResultUnit2).type('ml')
    cy.get(testPatientPage.addWidgetBtn).eq(0).click()
    testPatientPage.clickSavePatient()
    // Re-open patient verify the attribute is correct
    cy.get(measureDetailsPage.patientExpandBtn).click()
    cy.get(measureDetailsPage.patientEditBtn).click()
    // Expand Laboratory Test
    testPatientPage.toggleDataElement(0)

    // Verify the Components data element is added
    cy.get(testPatientPage.existingValues).should('contain.text', 'Components: [Component] Code: RXNORM: 1116635, Result: 4 \'kg\' : 50 \'ml\'')
    cy.log('Components Attribute added successfully')
  })
})
