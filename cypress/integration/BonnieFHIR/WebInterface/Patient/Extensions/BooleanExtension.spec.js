import * as helper from '../../../../../support/helpers'
import * as bonnieLogin from '../../../../../support/BonnieFHIR/BonnieLoginLogout'
import * as measureDetailsPage from '../../../../../pom/BonnieFHIR/WI/MeasureDetailsPage'
import * as testPatientPage from '../../../../../pom/BonnieFHIR/WI/TestPatientPage'
import * as bonnieUploadMeasure from '../../../../../support/BonnieFHIR/BonnieUploadMeasure'

describe('Test Patient: Extensions section', () => {

  const measureName = 'FHIRmeasureCMS347'
  const measureFileToUpload = 'FHIRmeasureCMS347-v0-0-003-FHIR-4-0-1.zip'

  before('Login', () => {
    bonnieLogin.login()
  })
  after('Log Out', () => {
    bonnieLogin.logout()
  })

  it('Validate the Extensions Components', () => {
    bonnieUploadMeasure.UploadMeasureToBonnie(measureFileToUpload, false)

    measureDetailsPage.navigateToMeasureDetails(measureName)

    const lastNameSuffix = new Date().getTime()
    const distinctLastName = 'President' + lastNameSuffix

    cy.get(measureDetailsPage.patientListing).then((patientListing) => {
      const initialPatientCount = parseInt(patientListing.text())
      cy.log('patient count was:' + initialPatientCount)

      measureDetailsPage.clickAddPatient()
      testPatientPage.enterPatientCharacteristics(distinctLastName)

      testPatientPage.dragAndDrop('diagnostics', 'Diagnostics: Observation: LDL Cholesterol', 23)

      booleanExtension()
      testPatientPage.clickSavePatient()
      testPatientPage.verifyPatientAdded(initialPatientCount, distinctLastName)
      measureDetailsPage.navigateToHomeMeasurePage()
      measureDetailsPage.navigateToMeasureDetails(measureName)
    })

    helper.visibleWithTimeout(measureDetailsPage.measurePageNavigationBtn)

  })

  function booleanExtension () {
    cy.log('validateBooleanExtension')
    cy.get(testPatientPage.extensionsShow).click()
    cy.get(testPatientPage.extensionsUrlField).type('https://google.com')
    cy.get(testPatientPage.extensionsValueDropDown).select('Boolean')
    cy.get(testPatientPage.extensionsBooleanDropDown).select('True')
    cy.get(testPatientPage.extensionAddWidgetBtn).eq(0).click()
    cy.get(testPatientPage.exsistingExtension).contains('https://google.com')
    cy.get(testPatientPage.exsistingExtensionUrl).click()
      .then(() => {
        cy.get(testPatientPage.exsistingExtension).contains('true')
      })
    cy.log('BooleanExtensionValidation - done')
  }
})
