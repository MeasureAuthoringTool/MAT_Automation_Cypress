import * as helper from '../../../../../support/helpers'
import * as bonnieLogin from '../../../../../support/BonnieFHIR/BonnieLoginLogout'
import * as homePage from '../../../../../pom/BonnieFHIR/WI/Homepage'
import * as measureDetailsPage from '../../../../../pom/BonnieFHIR/WI/MeasureDetailsPage'
import * as testPatientPage from '../../../../../pom/BonnieFHIR/WI/TestPatientPage'
import * as bonnieUploadMeasure from '../../../../../support/BonnieFHIR/BonnieUploadMeasure'

describe('Attribute UI: Ratio Widget', () => {

  const measureName = 'FHIRmeasureCMS347'
  const measureFileToUpload = 'FHIRmeasureCMS347-v0-0-003-FHIR-4-0-1.zip'

  before('Login', () => {
    bonnieLogin.login()
  })
  after('Log Out', () => {
    bonnieLogin.logout()
  })

  it('Verify the Ratio Widget', () => {
    uploadTestMeasure()

    navigateToMeasureDetails(measureName)

    const lastNameSuffix = new Date().getTime()
    const distinctLastName = 'President' + lastNameSuffix

    cy.get(measureDetailsPage.patientListing).then((patientListing) => {
      const initialPatientCount = parseInt(patientListing.text())
      cy.log('patient count was:' + initialPatientCount)

      measureDetailsPage.clickAddPatient()
      enterPatientCharacteristics(distinctLastName)

      testPatientPage.dragAndDrop('medications', 'Medications: MedicationRequest: Low Intensity Statin Therapy', 40)

      ratioWidget()
      testPatientPage.clickSavePatient()
      testPatientPage.verifyPatientAdded(initialPatientCount, distinctLastName)
      measureDetailsPage.navigateToHomeMeasurePage()
      navigateToMeasureDetails(measureName)
    })

    helper.visibleWithTimeout(measureDetailsPage.measurePageNavigationBtn)

  })

  function uploadTestMeasure () {
    bonnieUploadMeasure.UploadMeasureToBonnie(measureFileToUpload)
  }

  function navigateToMeasureDetails (measureName) {
    cy.log('navigateToMeasureDetails')
    cy.get(homePage.measure).contains(measureName).click()
    cy.get(measureDetailsPage.measureDetailsTitle).should('contain.text', 'Measure details')
    cy.log('navigateToMeasureDetails - done')
  }

  function enterPatientCharacteristics (lastName) {
    cy.log('enterPatientCharacteristics')
    cy.get(testPatientPage.lastNameTextField).type(lastName)
    cy.get(testPatientPage.firstNameTextField).type('Current')
    cy.get(testPatientPage.patientDescriptionTextField).type('Patient is very special')
    cy.get(testPatientPage.dateofBithField).type('01/01/1950')
    cy.get(testPatientPage.patientDescriptionTextField).click()
    cy.get(testPatientPage.raceDropdown).select('Asian')
    cy.get(testPatientPage.genderDropdown).select('Male')
    cy.get(testPatientPage.ethnicityDropdown).select('Not Hispanic or Latino')
    cy.log('enterPatientCharacteristics - done')
  }

  function ratioWidget () {
    cy.log('addRatioWidget')
    cy.get(testPatientPage.attributeNameSelect).select('dosageInstruction.doseAndRate.rate')
    cy.get(testPatientPage.attributeTypeSelect).select('Ratio')
    cy.get(testPatientPage.ratioValueField).eq(0).type(13)
    cy.get(testPatientPage.ratioValueField).eq(1).type(25)
    cy.get(testPatientPage.addWidgetBtn).eq(0).click()
    cy.get(testPatientPage.exsistingAttribute).contains('dosageInstruction.doseAndRate.rate: 13 \'\' : 25 \'\'')
    cy.log('AddRatioWidget - done')
  }

})
