export const measurePageNavigationBtn = '.breadcrumb > :nth-child(1)'
export const measureDetailsPageNavigationBtn = '.breadcrumb > :nth-child(2)'
export const measureDetailsPagePatientNameDiv = '.patient-name'
export const measureDetailsPatientArrowBtn = '.patient-btn'
export const measureDetailsPatientExpandArrowBtn =  '[data-call-method="expandResult"]'
export const measureDetailsPatientCloneButton = 'button[Title="Clone"]'
export const testPatientLogo = '.timeline-icon > .fa'
export const warningAlert = '.validation-alerts'
export const patientinverseDangerButton = '[data-call-method="showDelete"]'
export const patientdeleteButton = '[data-call-method="deletePatient"]'

//first and last name section
export const lastNameLabel = '.col-left > :nth-child(1) > .control-label'
export const firstNameLabel = '.col-left > :nth-child(2) > .control-label'
export const lastNameTextField = '#last'
export const firstNameTextField = '#first'

//patient details section
export const patientDescriptionLabel = '.col-sm-12 > .form-group > .control-label'
export const patientDescriptionTextField = '#notes'
export const dateOfBirtLabel = ':nth-child(2) > :nth-child(1) > .control-label'
export const dateofBithField = '#birthdate'
export const livingStatusLabel = ':nth-child(3) > :nth-child(1) > .control-label'
export const deceasedLabel = '.checkbox'
export const deceasedCheckBox = '#expired'
export const dateOfDeathLabel = ':nth-child(3) > :nth-child(1) > .control-label'
export const deathDateField = '#deathdate'
export const deathTime = '#deathtime'
export const raceLabel = ':nth-child(2) > :nth-child(2) > .control-label'
export const raceDropdown = '#race'
export const genderLabel = ':nth-child(3) > :nth-child(2) > .control-label'
export const genderDropdown = '#gender'
export const ethnicityLabel = ':nth-child(2) > :nth-child(3) > .control-label'
export const ethnicityDropdown = '#ethnicity'

export const saveBtn = '.pull-right > .btn-primary'
export const cancelBtn = '.pull-right > .btn-default'

//criteria elements container
export const elementsHeader = '#criteriaElements > .heading-muted'
export const patientHistoryHeader = '.heading-primary'
export const criteriaElementsContainer = '#criteriaElements'

//drag and drop section
export const draggableElement = '.draggable'
export const criteriaSectionBody = '.criteria-body'
export const criteriaSectionData = '.criteria-data'
export const criteriaSectionTitle = '.pull-left > p'
export const criteriaSectionDeleteBtn = '.btn-danger-inverse'

export function clickSavePatient () {
  cy.log('clickSavePatient')
  cy.get(saveBtn).click()
  cy.log('clickSavePatient - done')
}
