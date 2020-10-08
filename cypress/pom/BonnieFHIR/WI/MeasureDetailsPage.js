export const addPatientBtn = '.patient-data-col > .btn'
export const measurePageNavigationBtn = '.breadcrumb > :nth-child(1)'
export const measureDetailsTitle = '.measure-title > .short-title'
export const measureTitle = '.full-title'
export const measureSettingBtn = '.measure-title > .settings-container > .btn-settings > .fa'
export const measureInverseBtn = '.settings-container button.btn-danger-inverse[data-call-method="showDelete"]'
export const measureDeleteBtn = '.settings-container button.btn-danger[data-call-method="deleteMeasure"]'

//summary section
export const newStatus = '.status-col > div > .status'
// Section with calculation results and patients
export const measureCalculation = '.measure-calculation'
// Section with patients
export const measureCalculationPanel = '.measure-calculation > .panel'
export const patient = '.patient'
export const patientListing = '.patient-listing'
export const patientStatus = '.patient-status'
export const patientName = '.patient-name'
export const patientStatusSection = '.measure-calculation > .panel > .panel-heading'
export const patientExpandBtn = '.close > .fa'
export const patientEditBtn = '.panel-body > a.btn'
export const patientInverseBtn = 'button.btn-danger-inverse:visible[data-call-method="showDelete"]'
export const patientDeleteBtn = 'button.btn-danger:visible[data-call-method="deletePatient"]'

export function navigateToHomeMeasurePage () {
  cy.log('navigateToHomeMeasurePage')
  cy.get(measurePageNavigationBtn).click()
  cy.log('navigateToHomeMeasurePage - done')
}

export function clickDeleteMeasure() {
  cy.get(measureSettingBtn).click()
  cy.get(measureInverseBtn).click()
  cy.get(measureDeleteBtn).click()
}
