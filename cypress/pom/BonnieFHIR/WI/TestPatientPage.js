import * as measureDetailsPage from './MeasureDetailsPage'

export const measurePageNavigationBtn = '.breadcrumb > :nth-child(1)'
export const measureDetailsPageNavigationBtn = '.breadcrumb > :nth-child(2)'
export const measureDetailsPagePatientNameDiv = '.patient-name'
export const measureDetailsPatientArrowBtn = '.patient-btn'

export const measureDetailsPatientExpandArrowBtn =  '[data-call-method="expandResult"]:visible:last'
export const measureDetailsPatientCloneButton = 'button[Title="Clone"]'
export const measureDetailsPatientCopyAndSendButton = 'button[data-call-method="copyPatient"]:visible:last'
export const measureDetailsPatientEditBtn = 'a[Title="Edit"]'
export const testPatientLogo = '.timeline-icon > .fa'
export const warningAlert = '.validation-alerts'
export const patientinverseDangerButton = '[data-call-method="showDelete"]:visible:last'
export const patientdeleteButton = '[data-call-method="deletePatient"]:visible:last'

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

//criteria elements container
export const elementsHeader = '#criteriaElements > .heading-muted'
export const patientHistoryHeader = '.heading-primary'
export const criteriaElementsContainer = '#criteriaElements'
export const elementTitle = '.element-title'
export const criteriaArrowToggle = '.criteria-details .fa-angle-right'

//drag and drop section
export const draggableElement = '.draggable'
export const criteriaSectionBody = '.criteria-body'
export const criteriaSectionData = '.criteria-data'
export const criteriaSectionTitle = '.pull-left > p'
export const criteriaSectionDeleteBtn = '.btn-danger-inverse'

//Attribute Section
export const startDate = 'input[name="start_date"]'
export const dateGeneric = 'input[name="date"]'
export const timeGeneric = 'input[name="time"]'
export const startTime = 'input[name="start_time"]'
export const endDate = 'input[name="end_date"]'
export const endTime = 'input[name="end_time"]'
export const attributeDeleteButton = '[data-call-method="removeCriteria"]:visible:last'
export const dateCheckboxGeneric = 'input[name="date_is_defined"]'
export const timeCheckboxGeneric = 'input[name="time_is_defined"]'
export const booleanSelect = '[data-cy=boolean_select]'
export const rangeLowValueInputbox = '[data-cy=range-low-value-input]'
export const rangeHighValueInputbox = '[data-cy=range-high-value-input]'
export const rangeUnitsInputbox = '[data-cy=range-unit-input]'

// codeSystem
export const primaryCodeSystem = '.col-md-3 > .form-control'
export const chooseCodeSystem = '.col-md-8 > .form-control'
export const addCodeBtn = '.col-md-1'
export const exsistingCode = '.existing-values'

// attributeWidgets
export const attributeNameSelect = 'select[name="attribute_name"]:visible:last'
export const attributeTypeSelect = 'select[name="attribute_type"]:visible:last'
export const attributeReferenceTypeSelect = 'select[data-cy="referenceType-select"]:visible:last'
export const valueSetDirectRefSelect = 'select[name="valueset"]:visible:last'
export const valueSetDirectRefSelectGlobal = 'select[name="valueset"]'
export const valueSetCodeSelect = 'select[name=vs_code]:visible:last'
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


//Device Requested Code Attribute
export const deviceRequestCodeSelect = '[data-cy=attribute-name-select]'
export const deviceRequestCodeTypeSelect = '[data-cy=attribute-type-select]'
export const deviceRequestReferenceTypeSelect = '[data-cy=referenceType-select]'

// this element is for rangeWidget
export const lowValueField = '.col-md-6 > [name="low_value"]'
export const highValueField = '.col-md-6 > [name="high_value"]'

// this element is for ratioWidget
export const ratioValueField = '.col-md-6 > [name="value_value"]'

// SampledData Widget
export const originValueInputbox = '.quantity-control-value'
export const originUnitInputbox = '.quantity-control-unit'
export const periodDecimalInputbox = '[data-view-name="period"]'
export const dimensionsPositiveIntegerInputbox = '[data-cy=positive-integer-input]'
export const showOptionalElementsBtn = '[data-cy=optional_toggle]'
export const factorDecimalInputbox = '[data-view-name="factor"]'
export const lowerLimitDecimalInputbox = '[data-view-name="lower limit"]'
export const upperLimitDecimalInputbox = '[data-view-name="upper limit"]'
export const dataStringInputBox = '[data-view-name="data"]'

// Timing Attribute
export const boundsDropdown = '.timing-repeat-bounds-view select[name="type"]'
export const unitsInputbox = '.timing-repeat-bounds-view input[data-cy=range-unit-input]'
export const countInputbox = '.timing-repeat-count-view input[data-cy=positive-integer-input]'
export const countmaxInputbox = '.timing-repeat-count-max-view input[data-cy=positive-integer-input]'
export const durationInputbox = '.timing-repeat-duration-view input[data-cy=decimal-input]'
export const durationmaxInputbox = '.timing-repeat-duration-max-view input[data-cy=decimal-input]'
export const durationUnitSelect = '.timing-repeat-duration-unit-view select[name="valueset"]'
export const frequencyInputbox = '.timing-repeat-frequency-view input[data-cy=positive-integer-input]'
export const frequencymaxInputbox = '.timing-repeat-frequency-max-view input[data-cy=positive-integer-input]'
export const periodInputbox = '.timing-repeat-period-view input[data-cy=decimal-input]'
export const periodmaxInputbox = '.timing-repeat-period-max-view input[data-cy=decimal-input]'
export const periodUnitSelect = '.timing-repeat-period-unit-view select[name="valueset"]'
export const dayofweekSelect = '.timing-repeat-dayofweek-view select[name="valueset"]'
export const whenSelect = '.timing-repeat-when-view select[name="valueset"]'
export const offsetInputbox = '.timing-repeat-offset-view input[data-cy=unsigned-integer-input]'

//dosageInstruction Dosage
export const sequenceInputbox = '[data-cy=integer-input]'
export const textInputbox = '[data-view-name="text"] > .row > .string-control-value > [data-cy=string-input]'
export const additionalInstructionSelect = '[data-cy=additional-instruction-view] select'
export const patientInstructionInputbox = '[data-view-name="patientInstruction"] > .row > .string-control-value > [data-cy=string-input]'
export const asNeededSelect = '[data-cy=as-needed-view] Select'
export const siteSelect = '[data-cy=site-view] select'
export const routeSelect = '[data-cy=route-view] select'
export const methodSelect = '[data-cy=method-view] select'
export const typeSelect = '[data-cy=type-view] select'
export const doseSelect = '[data-cy=dose-view] Select'
export const rateSelect = '[data-cy=rate-view] Select'
export const rateInputBox = '[data-cy=rate-view] input'
export const maxDosePerPeriodValueInputBox = '[data-view-name="maxDosePerPeriod"] [name="value_value"]'
export const maxDosePerPeriodUnitInputBox = '[data-view-name="maxDosePerPeriod"] [name="value_unit"]'
export const maxDosePerAdministrationValueInputBox = '[data-view-name="maxDosePerAdministration"] [name="value_value"]'
export const maxDosePerAdministrationUnitInputBox = '[data-view-name="maxDosePerAdministration"] [name="value_unit"]'
export const maxDosePerLifetimeValueInputBox = '[data-view-name="maxDosePerLifetime"] [name="value_value"]'
export const maxDosePerLifetimeUnitInputBox = '[data-view-name="maxDosePerLifetime"] [name="value_unit"]'

//Identifier Attribute
export const identifierUseSelect = '[data-cy=identifier-use-view] select[name="valueset"]'
export const identifierUseCodeSelect = '[data-cy=identifier-use-view] select[name="vs_code"]'
export const identifierTypeSelect = '[data-cy=identifier-type-view] select[name="valueset"]'
export const identifierTypeCodeSelect = '[data-cy=identifier-type-view] select[name="vs_code"]'
export const identifierSystemInput = '[data-cy=identifier-system-view] [data-cy=string-input]'
export const identifierValueInput = '[data-cy=identifier-value-view] [data-cy=string-input]'
export const identifierPeriodStartCheckbox = '[data-cy=identifier-period-view] [name=start_date_is_defined]'
export const identifierPeriodEndCheckbox = '[data-cy=identifier-period-view] [name=end_date_is_defined]'
export const identifierAssignerInput = '[data-cy=identifier-assigner-view] [data-cy=string-input]'

// extensions section
export const extensionsShow = '[data-cy="extensions-form-group"] > .collapsed > .control-label'
export const extensionsSection = '[data-cy="extensions-form-group"] .extension-display-container'
export const extensionsUrlField = '[data-cy="extensions-form-group"] input[name="url"]'
export const extensionsValueDropDown = '[data-cy="extensions-form-group"] select[name="value_type"]'
export const exsistingExtension = '[data-cy="extensions-form-group"] .extension-display-container .existing-values'
export const exsistingExtensionUrl = '[data-cy="extensions-form-group"] .extension-url > .expand_caret'
export const extensionAddWidgetBtn = '[data-cy="extensions-form-group"] .input-add'
export const extensionsAgeValue = '[data-cy="extensions-form-group"] input[name=value_value]'
export const extensionsAgeUnit = '[data-cy="extensions-form-group"] input[name=value_unit]'
// this element is for boolean extension
export const extensionsBooleanDropDown = '[data-cy="extensions-form-group"] [data-cy="boolean_select"]'
// this element is for date extension
export const extensionsDateCheckbox = '[data-cy="extensions-form-group"] .col-md-2 > input[type="checkbox"]'
export const extensionsDateField = '[data-cy="extensions-form-group"] .date-control-date > input[name="date"]'

// modifier extensions section
export const modifierExtensionsShow = '[data-cy="modifier-extensions-form-group"] > .collapsed > .control-label'
export const modifierExtensionsSection = '[data-cy="modifier-extensions-form-group"] .extension-display-container'
export const modifierExtensionsUrlField = '[data-cy="modifier-extensions-form-group"] input[name="url"]'
export const modifierExtensionsValueDropDown = '[data-cy="modifier-extensions-form-group"] select[name="value_type"]'
export const exsistingModifierExtension = '[data-cy="modifier-extensions-form-group"] .extension-display-container .existing-values'
export const exsistingModifierExtensionUrl = '[data-cy="modifier-extensions-form-group"] .extension-url > .expand_caret'
export const extensionModifierAddWidgetBtn = '[data-cy="modifier-extensions-form-group"] .input-add'
export const extensionsModifierAgeValue = '[data-cy="modifier-extensions-form-group"] input[name=value_value]'
export const extensionsModifierAgeUnit = '[data-cy="modifier-extensions-form-group"] input[name=value_unit]'
export const extensionsModifierBooleanDropDown = '[data-cy="modifier-extensions-form-group"] [data-cy="boolean_select"]'
export const extensionsModifierDateCheckbox = '[data-cy="modifier-extensions-form-group"] .col-md-2 > input[type="checkbox"]'
export const extensionsModifierDateField = '[data-cy="modifier-extensions-form-group"] .date-control-date > input[name="date"]'

//Groups Section
export const adminTab = '.nav-admin > a'
export const groupsTab = '[data-cy=admin-tabs] > .nav > :nth-child(2) > a'
export const newGroupTab = 'h1 > .btn'
export const nameDialogBox = '#name'
export const saveNewGroup = '#save_new_group'
export const closeDialogBox = '.modal-content > .modal-footer > .btn'
export const editGroup = ':nth-child(4) > .btn'
export const addUserEmailToGroup = '#email'
export const addUserBtn = '#addUser'
export const saveGroupBtn = '#save_group'
export const suucessDialogBox= '#msgDialog > .modal-dialog > .modal-content > .modal-footer > .btn'
export const dashboard = '.nav-dashboard > a'
export const groupsDropdown = '.nav-account > .dropdown-toggle'
export const switchGroup = ':nth-child(2) > .switch-group-link'

//CQL Calculation Results
export const calcResultSDEEthnicity = '[data-define-name="SDE Ethnicity"] [data-ref-id="10"]'
export const calcResultSDEPayer = '[data-define-name="SDE Payer"] [data-ref-id="13"]'
export const calcResultSDERace = '[data-define-name="SDE Race"] [data-ref-id="16"]'
export const calcResultSDESex = '[data-define-name="SDE Sex"] [data-ref-id="19"]'

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
