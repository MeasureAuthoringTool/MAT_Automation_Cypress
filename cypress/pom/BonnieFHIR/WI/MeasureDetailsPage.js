import * as homePage from './Homepage'
//import * as string from 'cypress/types/minimatch'

export const addPatientBtn = '.patient-data-col > .btn'
export const measurePageNavigationBtn = '.breadcrumb > :nth-child(1)'
export const measureDetailsTitle = '.measure-title > .short-title'
export const measureTitle = '.full-title'
export const measureSettingBtn = '.measure-title > .settings-container > .btn-settings > .fa'
export const measureInverseBtn = '.settings-container button.btn-danger-inverse[data-call-method="showDelete"]'
export const measureDeleteBtn = '.settings-container button.btn-danger[data-call-method="deleteMeasure"]'

//summary section
export const newStatus = '.status-col > div > .status'
export const measureYearDiv = '.actions-container > .btn'
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
export const patientEditBtn = '.panel-body > a.btn:visible:last'
export const patientInverseBtn = 'button.btn-danger-inverse:visible[data-call-method="showDelete"]'
export const patientDeleteBtn = 'button.btn-danger:visible[data-call-method="deletePatient"]'
export const measureUpdateBtn = 'button:visible[data-call-method="updateMeasure"]'

export function navigateToHomeMeasurePage () {
  cy.log('navigateToHomeMeasurePage')
  cy.get(measurePageNavigationBtn).click()
  cy.log('navigateToHomeMeasurePage - done')
}

export function clickDeleteMeasure () {
  cy.get(measureSettingBtn).click()
  cy.get(measureInverseBtn).click()
  cy.get(measureDeleteBtn).click()
}

export function clickUpdateMeasure () {
  cy.get(measureSettingBtn).click()
  cy.get(measureUpdateBtn).click()
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
