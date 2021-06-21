import * as measureDetailsPage from '../../../pom/BonnieFHIR/WI/MeasureDetailsPage'
import * as testPatientPage from '../../../pom/BonnieFHIR/WI/TestPatientPage'

export const DeletePatient = (lastName) => {

  cy.log('deletePatient')
  const patient = getPatientRecord(lastName)
  patient.find(measureDetailsPage.patientExpandBtn).click()
  cy.get(measureDetailsPage.patientInverseBtn).click()
  cy.get(measureDetailsPage.patientDeleteBtn).click()
  cy.log('deletePatient - done')

  function getPatientRecord (lastName) {
    return cy.get(measureDetailsPage.measureCalculationPanel).contains(lastName).parents(measureDetailsPage.patient)
  }
}

export const VerifyPatientRemoved = (initialPatientCount) => {
  cy.log('verifyPatientRemoved')
  cy.get(measureDetailsPage.patientListing).should('have.text', (initialPatientCount).toString())
  cy.log('verifyPatientRemoved - done')
}

export const DeleteAllPatientsFromMeasure = (measureName) => {
  cy.log('DeleteAllPatientsFromMeasure')
  measureDetailsPage.navigateToHomeMeasurePage()
  measureDetailsPage.navigateToMeasureDetails(measureName)
  cy.get(measureDetailsPage.patientFraction).then((patientListing) => {
    const initialPatientCount = parseInt(patientListing.text().substring(1), 10)
    cy.log('DeleteAllPatientsFromMeasure going to delete ' + initialPatientCount + ' patients')

    for (let index = 0; index < initialPatientCount; index++) {
      cy.get(testPatientPage.measureDetailsPatientExpandArrowBtn).click() 
      cy.get(measureDetailsPage.patientInverseBtn).click()
      cy.get(measureDetailsPage.patientDeleteBtn).click()
    }
  })
  measureDetailsPage.navigateToHomeMeasurePage()
  cy.log('DeleteAllPatientsFromMeasure - done')
}
