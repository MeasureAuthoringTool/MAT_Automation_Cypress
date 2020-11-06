export const measurePageNavigationBtn = '.breadcrumb > :nth-child(1)'
export const measureDetailsPageNavigationBtn = '.breadcrumb > :nth-child(2)'
export const measureDetailsPagePatientNameDiv = '.patient-name'
export const measureDetailsPatientArrowBtn = '.patient-btn'
export const measureDetailsPatientExpandArrowBtn =  '[data-call-method="expandResult"]'
export const measureDetailsPatientCloneButton = 'button[Title="Clone"]'
export const measureDetailsPatientEditBtn = 'a[Title="Edit"]'
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
export const attributeDeleteButton = '[data-call-method="removeCriteria"]'

//codeSystem 
export const primaryCodeSystem = '.col-md-3 > .form-control'
export const chooseCodeSystem = '.col-md-8 > .form-control'
export const addCodeBtn = '.col-md-1'
export const exsistingCode = '.existing-values'

//attributeWidgets
export const attributeNameSelect = '.col-md-7 > [name="attribute_name"]'
export const attributeTypeSelect = '.col-md-5 > [name="attribute_type"]'
export const valueSetDirectRefSelect = '.code-control-valueset > .form-control'
export const addWidgetBtn = '.input-add'
export const exsistingAttribute = '.form-group > .existing-values'

//this element is for rangeWidget
export const lowValueField = '.col-md-6 > [name="low_value"]'
export const highValueField = '.col-md-6 > [name="high_value"]'

//this element is for ratioWidget
export const ratioValueField = '.col-md-6 > [name="value_value"]'

//extensions section
export const extensionsSection = '.form-group > .extension-display-container'
export const extensionsUrlField = 'input[name="url"]'
export const extensionsValueDropDown = 'select[name="value"]'
export const exsistingExtension = '.extension-display-container > .existing-values'
export const exsistingExtensionUrl = '.extension-url > .expand_caret'

//this element is for age extension
export const extensionsAgeValue = 'input[name=value_value]'
export const extensionsAgeUnit = 'input[name=value_unit]'

//this element is for boolean extension
export const extensionsBooleanDropDown = '[data-cy="boolean_select"]'

//this element is for date extension
export const extensionsDateCheckbox = '.col-md-2 > input[type="checkbox"]'
export const extensionsDateField = '.date-control-date > input[name="date"]'

export function clickSavePatient () {
  cy.log('clickSavePatient')
  cy.get(saveBtn).click( {force:true} )
  cy.log('clickSavePatient - done')
}
