import * as helper from '../../../../../support/helpers'
import * as bonnieLogin from '../../../../../support/Bonnie/BonnieLoginLogout'
import * as measureDetailsPage from '../../../../../pom/BonnieFHIR/WI/MeasureDetailsPage'
import * as testPatientPage from '../../../../../pom/BonnieFHIR/WI/TestPatientPage'
import * as bonnieUploadMeasure from '../../../../../support/Bonnie/BonnieUploadMeasure'

const measureName = ''
const measureFileToUpload = 'FHIR/'

const lastNameSuffix = new Date().getTime()
const distinctLastName = 'President' + lastNameSuffix
const year = new Date().getFullYear() -1
const date = new Date().getMonthFormatted().toString() + '/' + new Date().getDayFormatted().toString() + '/'
  + year.toString()

describe('Attribute UI: identifier: Identifier', () => {

  beforeEach('Login', () => {

    bonnieLogin.login()
    bonnieUploadMeasure.UploadMeasureToBonnie(measureFileToUpload, false)
    measureDetailsPage.navigateToMeasureDetails(measureName)

  })
  afterEach('Log Out', () => {

    bonnieLogin.logout()

  })

  it.skip('Verify the Identifier Attribute can be added to patient history successfully', () => {

    measureDetailsPage.clickAddPatient()
    testPatientPage.enterPatientCharacteristics(distinctLastName)

    //add Encounter Element
    testPatientPage.dragAndDrop('management', 'Management: Encounter: Encounter Inpatient', 7)

    identifierAttribute()

    testPatientPage.clickSavePatient()

    //Click the arrow Btn to show the patient actions
    helper.click(testPatientPage.measureDetailsPatientArrowBtn)

    //Click the Edit button For the patient
    helper.click(testPatientPage.measureDetailsPatientEditBtn)

    //open the patient history criteria, this will only work with one patient history criteria in the list, otherwise you will need to index
    cy.get(testPatientPage.criteriaArrowToggle).click()

    //verify Value Identifier attribute is still viewable in Patient History
    cy.get(testPatientPage.exsistingAttribute).invoke('text').then((text) => {
      expect(text).to.include('identifier: use: usual | type: [IdentifierType: TAX] | system: test | value: test | ' +
        'period: ' + date + ' 8:00 AM - ' + date + ' 8:15 AM | assigner: test')
    })

    cy.get(testPatientPage.cancelBtn).click()

    helper.visibleWithTimeout(measureDetailsPage.measurePageNavigationBtn)
  })
})

function identifierAttribute () {
  cy.log('Identifier Add and Verify Attribute is added correctly')

  cy.get(testPatientPage.attributeNameSelect).select('identifier')
  cy.get(testPatientPage.attributeTypeSelect).select('Identifier')

  cy.get(testPatientPage.identifierUseSelect).select('IdentifierUse')
  cy.get(testPatientPage.identifierUseCodeSelect).select('usual - Usual')

  cy.get(testPatientPage.identifierTypeSelect).select('Identifier Type Codes')
  cy.get(testPatientPage.identifierTypeCodeSelect).select('TAX - Tax ID number')

  cy.get(testPatientPage.identifierSystemInput).type('test')
  cy.get(testPatientPage.identifierValueInput).type('test')

  cy.get(testPatientPage.identifierPeriodStartCheckbox).click()
  cy.get(testPatientPage.identifierPeriodEndCheckbox).click()

  cy.get(testPatientPage.identifierAssignerInput).type('test')

  cy.get(testPatientPage.addWidgetBtn).eq(0).click()

  cy.get(testPatientPage.exsistingAttribute).invoke('text').then((text) => {
    expect(text).to.include('identifier: use: usual | type: [IdentifierType: TAX] | system: test | value: test | ' +
      'period: ' + date + ' 8:00 AM - ' + date + ' 8:15 AM | assigner: test')
  })

  cy.log('Identifier - done')
}
