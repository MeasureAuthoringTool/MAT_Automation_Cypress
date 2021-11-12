import * as bonnieLogin from '../../../../../support/Bonnie/BonnieLoginLogout'
import * as measureDetailsPage from '../../../../../pom/BonnieQDM/WI/MeasureDetailsPage'
import * as testPatientPage from '../../../../../pom/BonnieQDM/WI/TestPatientPage'
import * as bonnieUploadMeasure from '../../../../../support/Bonnie/BonnieUploadMeasure'
import * as deletePatient from '../../../../../support/Bonnie/BonnieQDM/DeletePatient'

describe('Test Patient: Adding Code', () => {
  const measureName = 'Risk-Standardized Inpatient Respiratory Depression Rate Following Elective ' +
    'Primary Total Hip Arthroplasty (THA) And/Or Total Knee Arthroplasty (TKA) eCQM'
  const measureFileToUpload = 'QDM56/RSIRDR-eCQM-v1-1-QDM-5-6.zip'

  const lastNameSuffix = new Date().getTime()
  const distinctLastName = 'President' + lastNameSuffix

  beforeEach('Login', () => {
    bonnieLogin.login()
  })
  afterEach('Log Out', () => {
    measureDetailsPage.navigateToHomeMeasurePage()
    measureDetailsPage.navigateToMeasureDetails(measureName)
    deletePatient.DeletePatient(distinctLastName)
    bonnieLogin.logout()
  })

  it('Verify the patient code', () => {
    bonnieUploadMeasure.UploadMeasureToBonnie(measureFileToUpload, false)
    measureDetailsPage.navigateToMeasureDetails(measureName)
    measureDetailsPage.clickAddPatient()
    testPatientPage.enterPatientCharacteristics(distinctLastName)
    testPatientPage.dragAndDrop('encounter', 'Encounter: Performed: Encounter Inpatient', 8)
    addCode()
  })

  function addCode () {
    cy.log('Add Code System')
    cy.get(testPatientPage.primaryCodeSystem).select('SNOMEDCT')
    cy.get(testPatientPage.chooseCodeSystem).select('183452005 (Emergency hospital admission (procedure))')
    cy.get(testPatientPage.addCodeBtn).eq(0).click()
    cy.get(testPatientPage.exsistingCode).contains('SNOMEDCT: 183452005')
    testPatientPage.clickSavePatient()
    cy.log('AddCode - done')
  }
})
