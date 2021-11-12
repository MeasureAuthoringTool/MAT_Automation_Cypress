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

//Groups Section
export const adminTab = '.nav-admin > a'
export const groupsTab = '[data-cy=admin-tabs] > .nav > :nth-child(2) > a'
export const newGroupTab = 'h1 > .btn'
export const nameDialogBox = '#name'
export const saveNewGroup = '#save_new_group'
export const closeDialogBox = '.modal-content > .modal-footer > .btn'
export const editGroup = ':nth-child(4) > .btn'
export const addUserEmailToGroup = '#email'
export const addUserBtn = ':nth-child(3) > :nth-child(3) > .btn'
export const saveGroupBtn = '#save_group'
export const suucessDialogBox= '#msgDialog > .modal-dialog > .modal-content > .modal-footer > .btn'
export const dashboard = '.nav-dashboard > a'
export const groupsDropdown = '.nav-account > .dropdown-toggle'
export const switchGroup = ':nth-child(2) > .switch-group-link'

// codeSystem
export const primaryCodeSystem = '.col-md-3 > .form-control'
export const chooseCodeSystem = '.col-md-8 > .form-control'
export const addCodeBtn = '.col-md-1'
export const exsistingCode = '.existing-values'

// attributeWidgets
export const attributeNameSelect = 'select[name="attribute_name"]:visible:last'
export const attributeTypeSelect = 'select[name="attribute_type"]:visible:last'
export const attributeReferenceTypeSelect = 'select[data-cy="referenceType-select"]:visible:last'
export const codeValueSetDirectRefSelect = 'select[name="valueset"]:visible:first'
export const valueSetDirectRefSelect = 'select[name="valueset"]:visible:last'
export const valueSetDirectRefSelectGlobal = 'select[name="valueset"]'
export const valueSetCodeSelect = 'select[name=vs_code]:visible:last'
export const rankInputField = 'input[name="value"]'
export const existingValues = '.form-group > .existing-values > :nth-child(1)'
export const existingResourcesDropdown = 'select[name="valueset"] option'
export const existingResorcesSelect = 'select[name="valueset"]'
export const referenceValueSetDirectRefSelect = 'select[data-cy="valueset-select"]:visible:last'
export const addWidgetBtn = 'button[data-call-method="addValue"]:visible:last'
export const exsistingAttribute = '.form-group > .existing-values:visible'
export const addedAttributeValue = '.form-group > .existing-values [title="value"]:visible'
export const locationSelect = 'select[name="referenceType"]:visible:last'
export const periodStartDate = '[name="start_date_is_defined"]:visible:last'
export const periodEndDate = '[name="end_date_is_defined"]:visible:last'
export const diagnosisCondition = 'select[name="referenceType"]:visible:last'
export const diagnosisRank = '[name="value"]'
export const deleteAttribute = '.form-group > .existing-values > :nth-child(1) > .btn'
export const useValueSetDirectRefSelect = 'select[name="valueset"]:visible:last'
export const dateTimeCheckbox = 'input[name="date_is_defined"]:visible:last'
export const repeatBounds = 'select[name="type"]'
export const repeatBoundsPeriodStartDate = 'input[name="start_date_is_defined"]:visible:first'
export const repeatBoundsPeriodEndDate = 'input[name="end_date_is_defined"]:visible:first'
export const medicationCustomCodeSelect = 'select[name="custom_codesystem_select"]'
export const medicationCustomCode = 'input[name="custom_code"]'
export const identifierNamingSystemField = 'input[name="value"]:visible:first'
export const identifierValueField = 'input[placeholder="value"]'
export const idField = 'input[name="value"]:visible:last'
export const dosageValue = 'input[name="value_value"]'
export const dosageUnit = 'input[name="value_unit"]'
export const relatedToDropdown = 'select[name="related_to"] option'
export const relatedToSelect = 'select[name="related_to"]'
export const componentsResult = 'select[name="type"]'
export const componentsResultValue1 = 'input[name="value_value"]:visible:first'
export const componentsResultUnit1 = 'input[name="value_unit"]:visible:first'
export const componentsResultValue2 = 'input[name="value_value"]:visible:last'
export const componentsResultUnit2 = 'input[name="value_unit"]:visible:last'

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
  cy.get(dateofBithField).type('10/10/1945')
  cy.get(patientDescriptionTextField).click()
  cy.get(raceDropdown).select('Asian')
  cy.get(genderDropdown).select('Male')
  cy.get(ethnicityDropdown).select('Not Hispanic or Latino')
  cy.log('enterPatientCharacteristics - done')
}