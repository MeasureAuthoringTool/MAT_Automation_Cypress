import * as bonnieLogin from '../../../../../support/Bonnie/BonnieLoginLogout'
import * as measureDetailsPage from '../../../../../pom/BonnieFHIR/WI/MeasureDetailsPage'
import * as testPatientPage from '../../../../../pom/BonnieFHIR/WI/TestPatientPage'
import * as bonnieUploadMeasure from '../../../../../support/Bonnie/BonnieUploadMeasure'

describe('Test Patient: Extensions section', () => {

  const measureName = 'FHIRmeasureCMS347'
  const measureFileToUpload = 'FHIR/SBTESTCMS347-v0-0-016-FHIR-4-0-1.zip'
  const year = new Date().getFullYear()
  const todaysDate = new Date().getMonthFormatted().toString() + '/' + new Date().getDayFormatted().toString() + '/'
    + year.toString()

  beforeEach('Login', () => {
    bonnieLogin.login()
  })
  afterEach('Log Out', () => {
    bonnieLogin.logout()
  })

  it('Validate the Extensions Components', () => {
    bonnieUploadMeasure.UploadMeasureToBonnie(measureFileToUpload)

    measureDetailsPage.navigateToMeasureDetails(measureName)

    const lastNameSuffix = new Date().getTime()
    const distinctLastName = 'President' + lastNameSuffix

    cy.get(measureDetailsPage.patientListing).then((patientListing) => {
      const initialPatientCount = parseInt(patientListing.text(), 10)
      cy.log('patient count was:' + initialPatientCount)

      measureDetailsPage.clickAddPatient()
      testPatientPage.enterPatientCharacteristics(distinctLastName)
      testPatientPage.dragAndDrop('diagnostics', 'Diagnostics: Observation: LDL Cholesterol', 23)

      multipleExtensions()
      testPatientPage.clickSavePatient()
      testPatientPage.verifyPatientAdded(initialPatientCount, distinctLastName)
      measureDetailsPage.navigateToHomeMeasurePage()
    })
  })

  function multipleExtensions () {
    cy.log('validateMultipleExtensions')

    // boolean type
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

    // date type
    cy.get(testPatientPage.modifierExtensionsUrlField).type('https://google.com')
    cy.get(testPatientPage.modifierExtensionsValueDropDown).select('Date')
    cy.get(testPatientPage.extensionsModifierDateCheckbox).click()
    cy.get(testPatientPage.extensionsModifierDateField).should('have.value', todaysDate)
    cy.get(testPatientPage.extensionModifierAddWidgetBtn).eq(0).click()
    cy.get(testPatientPage.exsistingModifierExtension).contains('https://google.com')
    cy.get(testPatientPage.exsistingModifierExtensionUrl).click()
      .then(() => {
        cy.get(testPatientPage.exsistingModifierExtension).contains(todaysDate)
      })
    cy.log('MultipleExtensionsValidation - done')
  }

})
