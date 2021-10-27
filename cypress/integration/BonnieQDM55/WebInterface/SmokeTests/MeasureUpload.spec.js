import * as bonnieLogin from '../../../../support/Bonnie/BonnieLoginLogout'
import * as measureDetailsPage from '../../../../pom/BonnieFHIR/WI/MeasureDetailsPage'
import * as bonnieUploadMeasure from '../../../../support/Bonnie/BonnieUploadMeasure'
import * as testPatientPage from '../../../../pom/BonnieFHIR/WI/TestPatientPage'
import * as deletePatient from '../../../../support/Bonnie/BonnieFHIR/DeletePatient'
import * as homePage from '../../../../pom/BonnieFHIR/WI/Homepage'

const lastNameSuffix = new Date().getTime()
const distinctLastName = 'President' + lastNameSuffix
let measureName = ''
let measureFileToUpload = ''

describe('Smoke Test: Measure Upload', () => {

  beforeEach('Login', () => {

    bonnieLogin.login()

  })
  afterEach('Log Out', () => {

    bonnieLogin.logout()

  })

   it('Verify successful upload Proportion Patient Based Measure and add patient', () => {

    measureName = 'Adult Major Depressive Disorder (MDD): Suicide Risk Assessment'
    measureFileToUpload = 'QDM55/CMS161-v10-0-QDM-5-5.zip'

    bonnieUploadMeasure.UploadMeasureToBonnie(measureFileToUpload, false)
    measureDetailsPage.navigateToMeasureDetails(measureName)
    cy.log('Measure upload successful')

    //Add Patient to the Patient based Measure

    cy.get(measureDetailsPage.patientListing).then((patientListing) => {
      const initialPatientCount = parseInt(patientListing.text(), 10)
      cy.log('patient count was:' + initialPatientCount)
      measureDetailsPage.clickAddPatient()
      testPatientPage.enterPatientCharacteristics(distinctLastName)
      testPatientPage.dragAndDrop('encounter', 'Encounter: Performed: Outpatient Consultation', 0)
      testPatientPage.clickSavePatient()
      testPatientPage.verifyPatientAdded(initialPatientCount, distinctLastName)
      measureDetailsPage.navigateToHomeMeasurePage()
      navigateToMeasureDetails(measureName)
      deletePatient.DeletePatient(distinctLastName)
      deletePatient.VerifyPatientRemoved(initialPatientCount)

    })

  })

   it('Verify successful upload Proportion Episode of Care Measure', () => {

    measureName = 'Venous Thromboembolism Prophylaxis'
    measureFileToUpload = 'QDM55/CMS108-v10-2-QDM-5-5.zip'

    bonnieUploadMeasure.UploadMeasureToBonnie(measureFileToUpload, 'episode')
    measureDetailsPage.navigateToMeasureDetails(measureName)
    cy.log('Measure upload successful')

    //Add Patient to the Patient based Measure

    cy.get(measureDetailsPage.patientListing).then((patientListing) => {
      const initialPatientCount = parseInt(patientListing.text(), 10)
      cy.log('patient count was:' + initialPatientCount)
      measureDetailsPage.clickAddPatient()
      testPatientPage.enterPatientCharacteristics(distinctLastName)
      testPatientPage.dragAndDrop('encounter', 'Encounter: Performed: Emergency Department Visit', 9)
      testPatientPage.clickSavePatient()
      testPatientPage.verifyPatientAdded(initialPatientCount, distinctLastName)
      measureDetailsPage.navigateToHomeMeasurePage()
      navigateToMeasureDetails(measureName)
      deletePatient.DeletePatient(distinctLastName)
      deletePatient.VerifyPatientRemoved(initialPatientCount)

    })

  })

  function navigateToMeasureDetails (measureName) {
    cy.log('navigateToMeasureDetails')
    cy.get(homePage.measure).contains(measureName).click({force: true})
    cy.get(measureDetailsPage.measureDetailsTitle).should('contain.text', 'Measure details')
    cy.log('navigateToMeasureDetails - done')
  }

})
