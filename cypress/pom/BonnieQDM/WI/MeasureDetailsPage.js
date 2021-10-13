import * as homePage from '../../BonnieQDM/WI/Homepage'

export const addPatientBtn = '.patient-data-col > .btn'
export const measurePageNavigationBtn = '.breadcrumb > :nth-child(1)'
export const measureDetailsTitle = '.measure-title > .short-title'
export const measureTitle = '.full-title'
export const measureSettingBtn = '.measure-title > .settings-container > .btn-settings > .fa'
export const measureInverseBtn = '.settings-container button.btn-danger-inverse[data-call-method="showDelete"]'
export const measureDeleteBtn = '.settings-container button.btn-danger[data-call-method="deleteMeasure"]'
export const coverageNumber = '#coverage'

//Export Patient
export const measureSettingsBtn = '.patients-title > .settings-container > .btn-settings > .fa'
export const exportPatientBtn= '[data-call-method="exportJsonPatients"]'
export const exportPatientPopup = '#exportJsonSucceededDialog > .modal-dialog > .modal-content > .modal-header'
export const exportPatientPopupCloseBtn = '#exportJsonSucceededDialog > .modal-dialog > .modal-content > .modal-footer > .btn'
// Number of passed patients
export const patientListing = '.patient-listing'
// Total number of patients (fraction)
export const patientFraction = '.fraction'
export const patientStatus = '.patient-status'

//summary section
export const newStatus = '.status-col > div > .status'
export const measureYearDiv = '.actions-container > .btn'
// Section with calculation results and patients
export const measureCalculation = '.measure-calculation'
// Section with patients
export const measureCalculationPanel = '.measure-calculation > .panel'
export const patient = '.patient'

// Total number of patients (fraction)
export const patientName = '.patient-name'
export const patientStatusSection = '.measure-calculation > .panel > .panel-heading'
export const patientExpandBtn = '.close > .fa'
export const patientEditBtn = '.panel-body > a.btn:visible:last'
export const patientInverseBtn = 'button.btn-danger-inverse:visible[data-call-method="showDelete"]'
export const patientDeleteBtn = 'button.btn-danger:visible[data-call-method="deletePatient"]'
export const measureUpdateBtn = 'button:visible[data-call-method="updateMeasure"]'

export function navigateToHomeMeasurePage () {
  cy.log('navigateToHomeMeasurePage')
  cy.get(measurePageNavigationBtn).click()
  cy.wait(1000)
  cy.log('navigateToHomeMeasurePage - done')
}

export function clickAddPatient () {
  cy.log('clickAddPatient')
  cy.get(addPatientBtn).click()
  cy.log('clickAddPatient - done')
}

export function navigateToMeasureDetails (measureName) {
  cy.log('navigateToMeasureDetails')
  cy.get(homePage.measure).contains(measureName).click()
  cy.wait(1000)
  cy.get(measureDetailsTitle).should('contain.text', 'Measure details')
  cy.log('navigateToMeasureDetails - done')
}

