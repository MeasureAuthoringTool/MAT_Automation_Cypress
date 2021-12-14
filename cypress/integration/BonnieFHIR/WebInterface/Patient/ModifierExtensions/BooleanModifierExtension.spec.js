import * as bonnieLogin from '../../../../../support/Bonnie/BonnieLoginLogout'
import * as measureDetailsPage from '../../../../../pom/BonnieFHIR/WI/MeasureDetailsPage'
import * as testPatientPage from '../../../../../pom/BonnieFHIR/WI/TestPatientPage'
import * as bonnieUploadMeasure from '../../../../../support/Bonnie/BonnieUploadMeasure'

describe('Test Patient: Modifier Extensions section', () => {

  const measureName = 'SBTESTCMS347'
  const measureFileToUpload = 'FHIR/SBTESTCMS347-v0-0-016-FHIR-4-0-1.zip'

  beforeEach('Login', () => {
    bonnieLogin.login()
  })
  afterEach('Log Out', () => {
    bonnieLogin.logout()
  })

  it.only('Validate the Extensions Components boolean', () => {
    bonnieUploadMeasure.UploadMeasureToBonnie(measureFileToUpload, false)

    measureDetailsPage.navigateToMeasureDetails(measureName)

    const lastNameSuffix = new Date().getTime()
    const distinctLastName = 'President' + lastNameSuffix

    cy.get(measureDetailsPage.patientListing).then((patientListing) => {
      const initialPatientCount = parseInt(patientListing.text(), 10)
      cy.log('patient count was:' + initialPatientCount)

      measureDetailsPage.clickAddPatient()
      testPatientPage.enterPatientCharacteristics(distinctLastName)

      testPatientPage.dragAndDrop('diagnostics', 'Diagnostics: Observation: LDL Cholesterol', 25)

      booleanExtension()
      testPatientPage.clickSavePatient()
      testPatientPage.verifyPatientAdded(initialPatientCount, distinctLastName)
      measureDetailsPage.navigateToHomeMeasurePage()
    })
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
