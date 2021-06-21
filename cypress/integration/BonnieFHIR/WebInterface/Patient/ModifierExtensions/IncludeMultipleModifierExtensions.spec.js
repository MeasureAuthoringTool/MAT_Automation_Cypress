import * as bonnieLogin from '../../../../../support/Bonnie/BonnieFHIR/BonnieLoginLogout'
import * as measureDetailsPage from '../../../../../pom/BonnieFHIR/WI/MeasureDetailsPage'
import * as testPatientPage from '../../../../../pom/BonnieFHIR/WI/TestPatientPage'
import * as bonnieUploadMeasure from '../../../../../support/Bonnie/BonnieFHIR/BonnieUploadMeasure'

describe('Test Patient: Extensions section', () => {

  const measureName = 'FHIRmeasureCMS347'
  const measureFileToUpload = 'FHIRmeasureCMS347-v0-0-003-FHIR-4-0-1.zip'
  const todaysDate = Cypress.moment().format('MM/DD/YYYY')

  before('Login', () => {
    bonnieLogin.login()
  })
  after('Log Out', () => {
    bonnieLogin.logout()
  })

  //skipping this test as it is currently failing
  it.skip('Validate the Extensions Components', () => {
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
    cy.get(testPatientPage.extensionsShow).click()
    cy.get(testPatientPage.extensionsUrlField).type('https://google.com')
    cy.get(testPatientPage.extensionsValueDropDown).select('Boolean')
    cy.get(testPatientPage.extensionsModifierBooleanDropDown).select('True')
    cy.get(testPatientPage.extensionModifierAddWidgetBtn).eq(0).click()
    cy.get(testPatientPage.exsistingModifierExtension).contains('https://google.com')
    cy.get(testPatientPage.exsistingModifierExtensionUrl).click()
      .then(() => {
        cy.get(testPatientPage.exsistingModifierExtension).contains('true')
      })

    // date type
    cy.get(testPatientPage.extensionsUrlField).type('https://google.com')
    cy.get(testPatientPage.extensionsValueDropDown).select('Date')
    cy.get(testPatientPage.extensionsModifierDateCheckbox).click()
    cy.get(testPatientPage.extensionsModifierDateField).should('have.value', todaysDate)
    cy.get(testPatientPage.extensionModifierAddWidgetBtn).eq(0).click()
    cy.get(testPatientPage.exsistingModifierExtension).contains('https://google.com')
    cy.get(testPatientPage.exsistingModifierExtensionUrl).eq(1).click()
      .then(() => {
        cy.get(testPatientPage.exsistingModifierExtension).contains(todaysDate)
      })
    cy.log('MultipleExtensionsValidation - done')
  }

})
