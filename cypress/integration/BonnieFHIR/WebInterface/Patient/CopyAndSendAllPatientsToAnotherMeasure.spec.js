import * as helper from '../../../../support/helpers'
import * as bonnieLogin from '../../../../support/BonnieFHIR/BonnieLoginLogout'
import * as measureDetailsPage from '../../../../pom/BonnieFHIR/WI/MeasureDetailsPage'
import * as editPatient from '../../../../support/BonnieFHIR/EditPatient'
import * as deletePatient from '../../../../support/BonnieFHIR/DeletePatient'
import * as deleteMeasure from '../../../../support/BonnieFHIR/DeleteMeasure'
import * as testPatientPage from '../../../../pom/BonnieFHIR/WI/TestPatientPage'
import * as bonnieUploadMeasure from '../../../../support/BonnieFHIR/BonnieUploadMeasure'

const measureName = 'FHIRmeasureCMS347'
const measureFileToUpload = 'FHIRmeasureCMS347v603-Artifacts.zip'

const anotherMeasureName = "Cms111testingMeasure"
const anotherFileToUpload = "Cms111testingMeasurev603-Artifacts.zip"


const lastNameSuffix = new Date().getTime()
const distinctLastName = 'President' + lastNameSuffix

describe('Patient: Copy all to another measure', () => {

  beforeEach('Login', () => {
    bonnieLogin.login()
    bonnieUploadMeasure.UploadMeasureToBonnie(anotherFileToUpload)
    deletePatient.DeleteAllPatientsFromMeasure(anotherMeasureName)

    bonnieUploadMeasure.UploadMeasureToBonnie(measureFileToUpload, false, true)
    deletePatient.DeleteAllPatientsFromMeasure(measureName)
  })

  afterEach('Log Out', () => {
    deletePatient.DeleteAllPatientsFromMeasure(anotherMeasureName)
    deleteMeasure.DeleteMeasure(anotherMeasureName)
    helper.visibleWithTimeout(measureDetailsPage.measurePageNavigationBtn)

    deletePatient.DeleteAllPatientsFromMeasure(measureName)
    deleteMeasure.DeleteMeasure(measureName)
    helper.visibleWithTimeout(measureDetailsPage.measurePageNavigationBtn)
    bonnieLogin.logout()
  })

  it('Can send all patients to another measure', () => {
    measureDetailsPage.navigateToMeasureDetails(measureName)

    const numOfPatients = 3
    for (let index = 0; index < numOfPatients; index++) {
      measureDetailsPage.clickAddPatient()
      testPatientPage.enterPatientCharacteristics(distinctLastName)
      testPatientPage.enterExpectedResults(["IPP", "DENOM", "DENEX", "NUMER", "DENEXCEP"])
      testPatientPage.clickSavePatient()  
    }

    cy.get('[data-call-method="patientsSettings"]:visible').click()
    cy.get('button[data-call-method="copyAllPatients"]').click()

    // Select the target measure
    cy.contains('#copyPatientDialog div.checkbox', anotherMeasureName).find('input[type=checkbox]').check({ force: true }).and('have.prop', 'checked')
    cy.get('#copyPatientDialog button#copyPatientSubmit').click()

    measureDetailsPage.navigateToMeasureDetails(anotherMeasureName)

    // Verify number patients (both passed and total). Total should be the same as passed, since expected values are not sent.
    cy.get(measureDetailsPage.patientFraction).should("contain.text", "/" + numOfPatients)
    cy.get(measureDetailsPage.patientListing).should("contain.text", numOfPatients.toString())
  })

})