import * as measureDetailsPage from '../../../pom/BonnieFHIR/WI/MeasureDetailsPage'

export const EditPatient = (lastName) => {
  cy.log('editPatient')
  const patient = getPatientRecord(lastName)
  patient.find(measureDetailsPage.patientExpandBtn).click()
  cy.get(measureDetailsPage.patientEditBtn).click()
  cy.log('editPatient - done')
}

function getPatientRecord (lastName) {
  return cy.get(measureDetailsPage.measureCalculationPanel).contains(lastName).parents(measureDetailsPage.patient)
}

