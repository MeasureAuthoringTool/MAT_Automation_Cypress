import * as helper from '../../../../support/helpers'
import * as bonnieLogin from '../../../../support/BonnieFHIR/BonnieLoginLogout'
import * as measureDetailsPage from '../../../../pom/BonnieFHIR/WI/MeasureDetailsPage'
import * as deletePatient from '../../../../support/BonnieFHIR/DeletePatient'
import * as deleteMeasure from '../../../../support/BonnieFHIR/DeleteMeasure'
import * as testPatientPage from '../../../../pom/BonnieFHIR/WI/TestPatientPage'
import * as bonnieUploadMeasure from '../../../../support/BonnieFHIR/BonnieUploadMeasure'

describe('Create and then Edit New Patient', () => {

  let measureName = 'FHIRmeasureCMS347'
  let measureFileToUpload = 'FHIRmeasureCMS347-v0-0-003-FHIR-4-0-1.zip'

  let lastNameSuffix = new Date().getTime()
  let distinctLastName = 'President' + lastNameSuffix

  before('Login', () => {

    bonnieLogin.login()
    bonnieUploadMeasure.UploadMeasureToBonnie(measureFileToUpload,false)
    measureDetailsPage.navigateToMeasureDetails(measureName)

  })
  after('Log Out', () => {

    deleteMeasure.DeleteMeasure(measureName)
    helper.visibleWithTimeout(measureDetailsPage.measurePageNavigationBtn)
    bonnieLogin.logout()

  })

  it('Create and edit patient', () => {

    cy.get(measureDetailsPage.patientListing).then((patientListing) => {
      const initialPatientCount = parseInt(patientListing.text())
      cy.log('patient count was:' + initialPatientCount)

      measureDetailsPage.clickAddPatient()
      testPatientPage.enterPatientCharacteristics(distinctLastName)

      testPatientPage.clickSavePatient()

      testPatientPage.verifyPatientAdded(initialPatientCount, distinctLastName)

      measureDetailsPage.navigateToHomeMeasurePage()

      measureDetailsPage.navigateToMeasureDetails(measureName)

      editPatientCharacteristics(distinctLastName)

      testPatientPage.clickSavePatient()

      testPatientPage.verifyPatientAdded(initialPatientCount, distinctLastName)

      deletePatient.DeletePatient(distinctLastName)
      deletePatient.VerifyPatientRemoved(initialPatientCount)

    })

    measureDetailsPage.navigateToHomeMeasurePage()
    helper.visibleWithTimeout(measureDetailsPage.measurePageNavigationBtn)

  })
})

function editPatientCharacteristics (lastName) {
  cy.log('editPatientCharacteristics')
  cy.get(measureDetailsPage.patientExpandBtn).click()
  cy.get(measureDetailsPage.patientEditBtn).click()

  cy.get(testPatientPage.lastNameTextField).clear().type(lastName)
  cy.get(testPatientPage.firstNameTextField).clear().type('Future')

  cy.get(testPatientPage.patientDescriptionTextField).clear().type('Description after edited on patient')
  cy.get(testPatientPage.dateofBithField).type('01/01/1976')
}