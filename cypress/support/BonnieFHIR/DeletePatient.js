import * as measureDetailsPage from '../../pom/BonnieFHIR/WI/MeasureDetailsPage'

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
