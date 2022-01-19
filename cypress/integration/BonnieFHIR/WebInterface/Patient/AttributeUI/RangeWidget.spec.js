import * as helper from '../../../../../support/helpers'
import * as bonnieLogin from '../../../../../support/Bonnie/BonnieLoginLogout'
import * as homePage from '../../../../../pom/BonnieFHIR/WI/Homepage'
import * as measureDetailsPage from '../../../../../pom/BonnieFHIR/WI/MeasureDetailsPage'
import * as deletePatient from '../../../../../support/Bonnie/BonnieFHIR/DeletePatient'
import * as testPatientPage from '../../../../../pom/BonnieFHIR/WI/TestPatientPage'
import * as bonnieUploadMeasure from '../../../../../support/Bonnie/BonnieUploadMeasure'

describe('Attribute UI: Range Widget', () => {

  const measureName = 'SBTESTCMS347'
  const measureFileToUpload = 'FHIR/SBTESTCMS347-v0-0-016-FHIR-4-0-1.zip'

  beforeEach('Login', () => {
    bonnieLogin.login()
  })
  afterEach('Log Out', () => {
    bonnieLogin.logout()
  })

  it('Verify the Range Widget', () => {
    uploadTestMeasure()

    navigateToMeasureDetails(measureName)

    const lastNameSuffix = new Date().getTime()
    const distinctLastName = 'President' + lastNameSuffix

    cy.get(measureDetailsPage.patientListing).then((patientListing) => {
      const initialPatientCount = parseInt(patientListing.text(), 10)
      cy.log('patient count was:' + initialPatientCount)

      measureDetailsPage.clickAddPatient()
      enterPatientCharacteristics(distinctLastName)

      testPatientPage.dragAndDrop('clinical summary', 'Clinical Summary: AllergyIntolerance: Statin Allergen', 15)

      rangeWidget()
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

  function rangeWidget () {
    cy.log('addRangeWidget')
    cy.get(testPatientPage.attributeNameSelect).select('onset')
    cy.get(testPatientPage.attributeTypeSelect).select('Range')
    cy.get(testPatientPage.lowValueField).type(13)
    cy.get(testPatientPage.highValueField).type(25)
    cy.get(testPatientPage.rangeUnitsInputbox).type('min')
    cy.get(testPatientPage.addWidgetBtn).eq(0).click()
    cy.get(testPatientPage.exsistingAttribute).contains('onset: 13 - 25 min')
    cy.log('AddRangeWidget - done')
  }
})
