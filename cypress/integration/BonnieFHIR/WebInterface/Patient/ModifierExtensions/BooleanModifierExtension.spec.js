import * as helper from '../../../../../support/helpers'
import * as bonnieLogin from '../../../../../support/BonnieFHIR/BonnieLoginLogout'
import * as measureDetailsPage from '../../../../../pom/BonnieFHIR/WI/MeasureDetailsPage'
import * as deletePatient from '../../../../../support/BonnieFHIR/DeletePatient'
import * as deleteMeasure from '../../../../../support/BonnieFHIR/DeleteMeasure'
import * as testPatientPage from '../../../../../pom/BonnieFHIR/WI/TestPatientPage'
import * as bonnieUploadMeasure from '../../../../../support/BonnieFHIR/BonnieUploadMeasure'

describe('Test Patient: Extensions section', () => {

  const measureName = 'FHIRmeasureCMS347'
  const measureFileToUpload = 'FHIRmeasureCMS347v603-Artifacts.zip'

  before('Login', () => {
    bonnieLogin.login()
  })
  after('Log Out', () => {
    bonnieLogin.logout()
  })

  it.only('Validate the Extensions Components', () => {
    bonnieUploadMeasure.UploadMeasureToBonnie(measureFileToUpload,false)

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
      deletePatient.DeletePatient(distinctLastName)
      deletePatient.VerifyPatientRemoved(initialPatientCount)
    })

    helper.visibleWithTimeout(measureDetailsPage.measurePageNavigationBtn)

    deleteMeasure.DeleteMeasure(measureName)

    helper.visibleWithTimeout(measureDetailsPage.measurePageNavigationBtn)
  })

  function booleanExtension () {
    cy.log('validateBooleanExtension')
    cy.get(testPatientPage.modifierExtensionsShow).click()
    cy.get(testPatientPage.modifierExtensionsUrlField).type('https://google.com')
    cy.get(testPatientPage.modifierExtensionsValueDropDown).select('Boolean')
    cy.get(testPatientPage.extensionsModifierBooleanDropDown).select('True')
    cy.get(testPatientPage.extensionModifierAddWidgetBtn).eq(0).click()
    cy.get(testPatientPage.exsistingModifierExtension).contains('https://google.com')
    cy.get(testPatientPage.exsistingModifierExtensionUrl).click()
    .then(() => {
    cy.get(testPatientPage.exsistingModifierExtension).contains('true')
    })
    cy.log('BooleanExtensionValidation - done')
  }
})