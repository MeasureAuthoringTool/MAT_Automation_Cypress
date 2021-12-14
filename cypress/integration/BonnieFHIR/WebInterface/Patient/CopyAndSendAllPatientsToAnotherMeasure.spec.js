import * as helper from '../../../../support/helpers'
import * as bonnieLogin from '../../../../support/Bonnie/BonnieLoginLogout'
import * as measureDetailsPage from '../../../../pom/BonnieFHIR/WI/MeasureDetailsPage'
import * as testPatientPage from '../../../../pom/BonnieFHIR/WI/TestPatientPage'
import * as bonnieUploadMeasure from '../../../../support/Bonnie/BonnieUploadMeasure'

const measureName = 'SBTESTCMS347'
const measureFileToUpload = 'FHIR/SBTESTCMS347-v0-0-016-FHIR-4-0-1.zip'

const anotherMeasureName = "Cms111testingMeasure"
const anotherFileToUpload = "FHIR/Cms111testingMeasure-v0-0-004-FHIR-4-0-1.zip"


const lastNameSuffix = new Date().getTime()
const distinctLastName = 'President' + lastNameSuffix

describe('Patient: Copy all to another measure', () => {

  beforeEach('Login', () => {
    bonnieLogin.login()
    bonnieUploadMeasure.UploadMeasureToBonnie(anotherFileToUpload)

    bonnieUploadMeasure.UploadMeasureToBonnie(measureFileToUpload, false, true)
  })

  afterEach('Log Out', () => {

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
