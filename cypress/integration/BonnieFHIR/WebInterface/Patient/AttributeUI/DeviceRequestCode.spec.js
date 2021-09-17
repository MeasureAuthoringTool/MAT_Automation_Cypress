import * as helper from '../../../../../support/helpers'
import * as bonnieLogin from '../../../../../support/Bonnie/BonnieLoginLogout'
import * as homePage from '../../../../../pom/BonnieFHIR/WI/Homepage'
import * as measureDetailsPage from '../../../../../pom/BonnieFHIR/WI/MeasureDetailsPage'
import * as deletePatient from '../../../../../support/Bonnie/BonnieFHIR/DeletePatient'
import * as testPatientPage from '../../../../../pom/BonnieFHIR/WI/TestPatientPage'
import * as bonnieUploadMeasure from '../../../../../support/Bonnie/BonnieUploadMeasure'

describe('Device Request: Code', () => {

  const measureName = 'CMS130FHIRv'
  const measureFileToUpload = 'FHIR/CMS130FHIR-v0-0-003-FHIR-4-0-1 .zip'

  beforeEach('Login', () => {
    bonnieLogin.login()
  })
  afterEach('Log Out', () => {
    bonnieLogin.logout()
  })

  it('Add code to Device Request', () => {
    uploadTestMeasure()

    navigateToMeasureDetails(measureName)

    const lastNameSuffix = new Date().getTime()
    const distinctLastName = 'President' + lastNameSuffix

    cy.get(measureDetailsPage.patientListing).then((patientListing) => {
      const initialPatientCount = parseInt(patientListing.text(), 10)
      cy.log('patient count was:' + initialPatientCount)

      measureDetailsPage.clickAddPatient()
      testPatientPage.enterPatientCharacteristics(distinctLastName)
      testPatientPage.dragAndDrop('request response', 'Request Response: DeviceRequest: Frailty Device', 36)
      DeviceRequestCode()
      testPatientPage.clickSavePatient()
      testPatientPage.verifyPatientAdded(initialPatientCount, distinctLastName)
      measureDetailsPage.navigateToHomeMeasurePage()
      navigateToMeasureDetails(measureName)
      deletePatient.DeletePatient(distinctLastName)
      deletePatient.VerifyPatientRemoved(initialPatientCount)
    })

    helper.visibleWithTimeout(measureDetailsPage.measurePageNavigationBtn)

  })

  function uploadTestMeasure () {
    bonnieUploadMeasure.UploadMeasureToBonnie(measureFileToUpload)
  }

  function navigateToMeasureDetails (measureName) {
    cy.log('navigateToMeasureDetails')
    cy.get(homePage.measure).contains(measureName).click({force: true})
    // cy.wait(1000)
    cy.get(measureDetailsPage.measureDetailsTitle).should('contain.text', 'Measure details')
    cy.log('navigateToMeasureDetails - done')
  }

  // Add Codeable Concept and Reference to Code
  function DeviceRequestCode () {
    cy.log('deviceRequestCode')
    //Add Codeable Concept to Code
    cy.get(testPatientPage.deviceRequestCodeSelect).select('code')
    cy.get(testPatientPage.deviceRequestCodeTypeSelect).select('CodeableConcept')
    cy.get(testPatientPage.valueSetDirectRefSelect).select('active')
    cy.get(testPatientPage.addWidgetBtn).eq(0).click()
    cy.get(testPatientPage.exsistingAttribute).contains('code: [ConditionClinicalStatusCodes: active]')
    cy.log('Codeable Concept Code- done')
    //Add Reference to Code
    cy.get(testPatientPage.deviceRequestCodeSelect).select('code')
    cy.get(testPatientPage.deviceRequestCodeTypeSelect).select('Reference')
    cy.get(testPatientPage.deviceRequestReferenceTypeSelect).select('Device')
    cy.get(testPatientPage.valueSetDirectRefSelect).select('Acute Inpatient')
    cy.get(testPatientPage.addWidgetBtn).eq(0).click()
    // Collapse Code
    testPatientPage.toggleDataElement(1)
    // Expand Encounter
    testPatientPage.toggleDataElement(0)
    cy.get(testPatientPage.exsistingAttribute).contains('code: Device/acute-inpatient')
    cy.log('Codeable Concept Reference- done')

  }

})
