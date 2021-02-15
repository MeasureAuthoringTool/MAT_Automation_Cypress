import * as helper from '../../../../../support/helpers'
import * as bonnieLogin from '../../../../../support/BonnieFHIR/BonnieLoginLogout'
import * as bonnieUpload from '../../../../../support/BonnieFHIR/BonnieUploadMeasure'
import * as deleteMeasure from '../../../../../support/BonnieFHIR/DeleteMeasure'
import * as testPatientPage from '../../../../../pom/BonnieFHIR/WI/TestPatientPage'
import * as deletePatient from '../../../../../support/BonnieFHIR/DeletePatient'
import * as measureDetailsPage from '../../../../../pom/BonnieFHIR/WI/MeasureDetailsPage'

describe('Attribute UI: Value: DateTime', () => {

  const measureName = 'FHIRmeasureCMS347'
  const measureFileToUpload = 'FHIRmeasureCMS347-v0-0-003-FHIR-4-0-1.zip'

  const lastNameSuffix = new Date().getTime()
  const distinctLastName = 'President' + lastNameSuffix

  before('Login', () => {

    bonnieLogin.login()
    bonnieUpload.UploadMeasureToBonnie(measureFileToUpload, false)
    measureDetailsPage.navigateToMeasureDetails(measureName)

  })
  after('Log Out', () => {

    deleteMeasure.DeleteMeasure(measureName)
    helper.visibleWithTimeout(measureDetailsPage.measurePageNavigationBtn)
    bonnieLogin.logout()

  })

  it('Verify the DateTime Widget is working and saving as expected', () => {

    cy.get(measureDetailsPage.patientListing).then((patientListing) => {
      const initialPatientCount = parseInt(patientListing.text())
      cy.log('patient count was:' + initialPatientCount)

      measureDetailsPage.clickAddPatient()
      testPatientPage.enterPatientCharacteristics(distinctLastName)

      //add Observation Element
      testPatientPage.dragAndDrop('diagnostics', 'Diagnostics: Observation: LDL Cholesterol', 23)

      //verify DateTime Widget
      verifyDateTimeWidget()

      testPatientPage.clickSavePatient()

      //Click the arrow Btn to show the patient actions
      helper.click(testPatientPage.measureDetailsPatientArrowBtn)

      //Click the Edit button For the patient
      helper.click(testPatientPage.measureDetailsPatientEditBtn)

      //open the patient history criteria, this will only work with one patient history criteria in the list, otherwise you will need to index
      cy.get(testPatientPage.criteriaArrowToggle).click()

      //verify Value SampledData attribute is still viewable on the Observation Criteria in Patient History
      cy.get(testPatientPage.exsistingAttribute).invoke('text').then((text) => {
        expect(text).to.include('value: 12/01/2000 8:00 AM')
      })

      cy.get(testPatientPage.cancelBtn).click()

      helper.visibleWithTimeout(measureDetailsPage.measurePageNavigationBtn)

      deletePatient.DeletePatient(distinctLastName)
      deletePatient.VerifyPatientRemoved(initialPatientCount)
    })

    helper.visibleWithTimeout(measureDetailsPage.measurePageNavigationBtn)
  })

  function verifyDateTimeWidget () {

    cy.get(testPatientPage.attributeNameSelect).select('value')
    cy.get(testPatientPage.attributeTypeSelect).select('DateTime')

    cy.get(testPatientPage.dateCheckboxGeneric).eq(1).click()

    cy.get(testPatientPage.dateGeneric).eq(1).clear()
    cy.get(testPatientPage.dateGeneric).eq(1).type('12/01/2000')

    cy.get(testPatientPage.addWidgetBtn).eq(0).click()

  }
})
