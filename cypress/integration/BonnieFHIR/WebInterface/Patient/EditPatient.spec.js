import * as helper from '../../../../support/helpers'
import * as bonnieLogin from '../../../../support/Bonnie/BonnieLoginLogout'
import * as measureDetailsPage from '../../../../pom/BonnieFHIR/WI/MeasureDetailsPage'
import * as testPatientPage from '../../../../pom/BonnieFHIR/WI/TestPatientPage'
import * as bonnieUploadMeasure from '../../../../support/Bonnie/BonnieUploadMeasure'

describe('Create and then Edit New Patient', () => {

  let measureName = 'SBTESTCMS347'
  let measureFileToUpload = 'FHIR/SBTESTCMS347-v0-0-016-FHIR-4-0-1.zip'

  let lastNameSuffix = new Date().getTime()
  let distinctLastName = 'President' + lastNameSuffix

  beforeEach('Login', () => {

    bonnieLogin.login()
    bonnieUploadMeasure.UploadMeasureToBonnie(measureFileToUpload,false)
    measureDetailsPage.navigateToMeasureDetails(measureName)

  })
  afterEach('Log Out', () => {

    bonnieLogin.logout()

  })

  it('Create and edit patient', () => {

    cy.get(measureDetailsPage.patientListing).then((patientListing) => {
      const initialPatientCount = parseInt(patientListing.text(), 10)
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