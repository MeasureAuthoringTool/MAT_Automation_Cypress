import * as measureDetailsPage from '../../BonnieQDM/WI/MeasureDetailsPage'

export const measureDetailsPatientExpandArrowBtn =  '[data-call-method="expandResult"]:visible:last'

//first and last name section
export const lastNameTextField = '#last'
export const firstNameTextField = '#first'
//patient details section
export const patientDescriptionLabel = '.col-sm-12 > .form-group > .control-label'
export const patientDescriptionTextField = '#notes'
export const dateOfBirtLabel = ':nth-child(2) > :nth-child(1) > .control-label'
export const dateofBithField = '#birthdate'
export const livingStatusLabel = ':nth-child(6) > .form-group > .control-label'
export const deceasedLabel = '.checkbox'
export const deceasedCheckBox = '#expired'
export const dateOfDeathLabel = '.indented > .control-label'
export const deathDateField = '#deathdate'
export const deathDateOptionaLabel = ':nth-child(1) > .help-block'
export const deathTimeField = '#deathtime'
export const deathTimeOptionalLabel = ':nth-child(2) > .help-block'
export const raceLabel = ':nth-child(2) > :nth-child(2) > .control-label'
export const raceDropdown = '#race'
export const genderLabel = ':nth-child(3) > :nth-child(2) > .control-label'
export const genderDropdown = '#gender'
export const ethnicityLabel = ':nth-child(2) > :nth-child(3) > .control-label'
export const ethnicityDropdown = '#ethnicity'

export const saveBtn = '.pull-right > .btn-primary'
export const cancelBtn = '.pull-right > .btn-default'

//drag and drop section
export const draggableElement = '.draggable'
export const criteriaSectionBody = '.criteria-body'
export const criteriaSectionData = '.criteria-data'
export const criteriaSectionTitle = '.pull-left > p'
export const criteriaSectionDeleteBtn = '.btn-danger-inverse'

//criteria elements container
export const criteriaElementsContainer = '#criteriaElements'

export const enterExpectedResults = (expected) => {
  for (let pop of expected) {
    cy.get('input[name="' + pop + '"][type="checkbox"]').check({ force: true }).and('have.prop', 'checked')
  }
}

export const clickSavePatient = () => {
  cy.log('clickSavePatient')
  cy.get(saveBtn).click({ force: true })
  cy.wait(1000)
  cy.log('clickSavePatient - done')

}
export const verifyPatientAdded = (initialPatientCount, lastName) => {
  cy.log('verifyPatientAdded')
  cy.get(measureDetailsPage.patientListing).should('have.text', (initialPatientCount + 1).toString())
  getPatientRecord(lastName).find(measureDetailsPage.patientStatus).should('contain.text', 'pass')
  cy.log('verifyPatientAdded - done')
}

export const getPatientRecord = (lastName) => {
  return cy.get(measureDetailsPage.measureCalculationPanel).contains(lastName).parents(measureDetailsPage.patient)
}

// Toggles a data element by its 0 based index
export const toggleDataElement = (index) => {
  cy.get('button[data-call-method="toggleDetails"]:visible:eq(' + index + ')').click()
}

export const dragAndDrop = (element, elementTitle, draggableIndex) => {
  cy.log('dragAndDropAttribute')
  cy.get(criteriaElementsContainer).contains(element).click()
  cy.get('.draggable').eq(draggableIndex)
    .trigger('mousedown', { which: 1, pageX: 600, pageY: 100, })
    .trigger('mousemove', { which: 1, pageX: 1000, pageY: 100, })
    .trigger('mouseup',)
  let title = cy.get(criteriaSectionTitle).valueOf()
  cy.log('title is ' + title)
  cy.get(criteriaSectionTitle)
    .should('contain.text', elementTitle)
  cy.log('DragAndDropMedicationAttribute - done')
}
export const enterPatientCharacteristics = (lastName) => {
  cy.log('enterPatientCharacteristics')
  cy.get(lastNameTextField).type(lastName)
  cy.get(firstNameTextField).type('Current')
  cy.get(patientDescriptionTextField).type('Patient is very special')
  cy.get(dateofBithField).type('01/01/1945')
  cy.get(patientDescriptionTextField).click()
  cy.get(raceDropdown).select('Asian')
  cy.get(genderDropdown).select('Male')
  cy.get(ethnicityDropdown).select('Not Hispanic or Latino')
  cy.log('enterPatientCharacteristics - done')
}