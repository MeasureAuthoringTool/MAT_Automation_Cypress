import * as helper from '../../../../../support/helpers'
import * as bonnieLogin from '../../../../../support/Bonnie/BonnieLoginLogout'
import * as measureDetailsPage from '../../../../../pom/BonnieFHIR/WI/MeasureDetailsPage'
import * as testPatientPage from '../../../../../pom/BonnieFHIR/WI/TestPatientPage'
import * as bonnieUploadMeasure from '../../../../../support/Bonnie/BonnieUploadMeasure'

const measureName = 'SBTESTCMS347'
const measureFileToUpload = 'FHIR/SBTESTCMS347-v0-0-016-FHIR-4-0-1.zip'

const lastNameSuffix = new Date().getTime()
const distinctLastName = 'President' + lastNameSuffix

describe('Attribute UI: Value: SampledData', () => {

  beforeEach('Login', () => {

    bonnieLogin.login()
    bonnieUploadMeasure.UploadMeasureToBonnie(measureFileToUpload, false)
    measureDetailsPage.navigateToMeasureDetails(measureName)

  })
  afterEach('Log Out', () => {

    bonnieLogin.logout()

  })

  it('Verify the SampledData Widget', () => {

    cy.get(measureDetailsPage.patientListing).then((patientListing) => {
      const initialPatientCount = parseInt(patientListing.text(), 10)
      cy.log('patient count was:' + initialPatientCount)

      measureDetailsPage.clickAddPatient()
      testPatientPage.enterPatientCharacteristics(distinctLastName)

      //add Observation Element
      testPatientPage.dragAndDrop('diagnostics', 'Diagnostics: Observation: LDL Cholesterol', 23)

      //verify adding SampledData
      valueSampledData()

      testPatientPage.clickSavePatient()

      //Click the arrow Btn to show the patient actions
      helper.click(testPatientPage.measureDetailsPatientArrowBtn)

      //Click the Edit button For the patient
      helper.click(testPatientPage.measureDetailsPatientEditBtn)

      //open the patient history criteria, this will only work with one patient history criteria in the list, otherwise you will need to index
      cy.get(testPatientPage.criteriaArrowToggle).click()

      //verify Value SampledData attribute is still viewable on the Observation Criteria in Patient History
      cy.get(testPatientPage.exsistingAttribute).invoke('text').then((text) => {
        expect(text).to.include('value: origin : 3462346234.0 \'Mg\' | period : 50000.61261 | dimensions : 568578362346 | ' +
          'factor : 8000.2154 | lower limit : 15.5 | upper limit : 37.2 | data : This is a test string value')
      })

      cy.get(testPatientPage.cancelBtn).click()

      helper.visibleWithTimeout(measureDetailsPage.measurePageNavigationBtn)
    })
  })

  function valueSampledData () {
    cy.log('valueSampledData Add and Verify Attribute is added correctly')
    cy.get(testPatientPage.attributeNameSelect).select('value')
    cy.get(testPatientPage.attributeTypeSelect).select('SampledData')

    cy.get(testPatientPage.originValueInputbox).type('3462346234')
    cy.get(testPatientPage.originUnitInputbox).type('Mg')
    cy.get(testPatientPage.periodDecimalInputbox).type('50000.61261')
    cy.get(testPatientPage.dimensionsPositiveIntegerInputbox).type('568578362346')

    cy.get(testPatientPage.showOptionalElementsBtn).click()

    cy.get(testPatientPage.factorDecimalInputbox).type('8000.2154')
    cy.get(testPatientPage.lowerLimitDecimalInputbox).type('15.5')
    cy.get(testPatientPage.upperLimitDecimalInputbox).type('37.2')
    cy.get(testPatientPage.dataStringInputBox).type('This is a test string value')

    cy.get(testPatientPage.addWidgetBtn).eq(0).click()

    cy.get(testPatientPage.exsistingAttribute).contains('value: origin : 3462346234 \'Mg\' | period : ' +
      '50000.61261 | dimensions : 568578362346 | factor : 8000.2154 | lower limit : 15.5 | upper limit : 37.2 | data : ' +
      'This is a test string value')
    cy.log('valueSampledData - done')
  }

})
