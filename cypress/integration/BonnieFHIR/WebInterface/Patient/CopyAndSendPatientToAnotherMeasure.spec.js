import * as helper from '../../../../support/helpers'
import * as bonnieLogin from '../../../../support/Bonnie/BonnieLoginLogout'
import * as measureDetailsPage from '../../../../pom/BonnieFHIR/WI/MeasureDetailsPage'
import * as editPatient from '../../../../support/Bonnie/BonnieFHIR/EditPatient'
import * as deletePatient from '../../../../support/Bonnie/BonnieFHIR/DeletePatient'
import * as testPatientPage from '../../../../pom/BonnieFHIR/WI/TestPatientPage'
import * as bonnieUploadMeasure from '../../../../support/Bonnie/BonnieUploadMeasure'

const measureName = 'FHIRmeasureCMS347'
const measureFileToUpload = 'FHIR/FHIRmeasureCMS347-v0-0-003-FHIR-4-0-1.zip'

const anotherMeasureName = "Cms111testingMeasure"
const anotherFileToUpload = "FHIR/Cms111testingMeasure-v0-0-004-FHIR-4-0-1.zip"


const lastNameSuffix = new Date().getTime()
const distinctLastName = 'President' + lastNameSuffix

describe('Patient: Copy to another measure', () => {

  beforeEach('Login', () => {
    bonnieLogin.login()
    bonnieUploadMeasure.UploadMeasureToBonnie(anotherFileToUpload)
    bonnieUploadMeasure.UploadMeasureToBonnie(measureFileToUpload, false, true)
  })

  afterEach('Log Out', () => {
    bonnieLogin.logout()
  })

  it('Can send a patient to another measure', () => {
    measureDetailsPage.navigateToMeasureDetails(measureName)
    cy.get(measureDetailsPage.patientListing).then((patientListing) => {
      const initialPatientCount = parseInt(patientListing.text(), 10)
      cy.log('The source measure\'s patient count was:' + initialPatientCount)
      measureDetailsPage.clickAddPatient()
      testPatientPage.enterPatientCharacteristics(distinctLastName)
      // Enter expected results
      cy.get('input[name="IPP"][type="checkbox"]').check({ force: true }).and('have.prop', 'checked')
      cy.get('input[name="DENOM"][type="checkbox"]').check({ force: true }).and('have.prop', 'checked')
      cy.get('input[name="DENEX"][type="checkbox"]').check({ force: true }).and('have.prop', 'checked')
      cy.get('input[name="NUMER"][type="checkbox"]').check({ force: true }).and('have.prop', 'checked')
      cy.get('input[name="DENEXCEP"][type="checkbox"]').check({ force: true }).and('have.prop', 'checked')

      testPatientPage.clickSavePatient()


      // Click the arrow Btn to show the patient actions
      cy.get(testPatientPage.measureDetailsPatientArrowBtn).contains(distinctLastName).click()

      // Click the Copy and Send button
      helper.click(testPatientPage.measureDetailsPatientCopyAndSendButton)

      // Select the target measure
      cy.contains('#copyPatientDialog div.checkbox', anotherMeasureName).find('input[type=checkbox]').check({ force: true }).and('have.prop', 'checked')
      cy.get('#copyPatientDialog button#copyPatientSubmit').click()

      // Remove from the source measure
      measureDetailsPage.navigateToMeasureDetails(measureName)
      deletePatient.DeletePatient(distinctLastName)
      helper.visibleWithTimeout(measureDetailsPage.measurePageNavigationBtn)
      deletePatient.VerifyPatientRemoved(initialPatientCount)
      helper.visibleWithTimeout(measureDetailsPage.measurePageNavigationBtn)

    })

    measureDetailsPage.navigateToHomeMeasurePage()

    // Remove from the target measure
    measureDetailsPage.navigateToMeasureDetails(anotherMeasureName)
    cy.get(measureDetailsPage.patientListing).then((patientListing) => {
      const initialPatientCount = parseInt(patientListing.text(), 10)
      cy.log('The target measure\'s patient count was:' + initialPatientCount)
      validateTargetPatient()
      deletePatient.DeletePatient(distinctLastName)
      helper.visibleWithTimeout(measureDetailsPage.measurePageNavigationBtn)
      // Initial number is +1 because the patient had already been copied by the time it's counted
      deletePatient.VerifyPatientRemoved(initialPatientCount - 1)
      helper.visibleWithTimeout(measureDetailsPage.measurePageNavigationBtn)
    })
  })

  function validateTargetPatient() {
    editPatient.EditPatient(distinctLastName)

    // Validate copied patient attributes
    // First, validate Name
    helper.enabledWithTimeout(testPatientPage.firstNameTextField)
    cy.get(testPatientPage.firstNameTextField).should('have.value', 'Current')

    // Validate Last Name
    cy.get(testPatientPage.lastNameTextField).should('have.value', distinctLastName)


    // Validate Patient Description
    cy.get(testPatientPage.patientDescriptionTextField).should('have.value', 'Patient is very special')

    // Validate Date of Birth
    cy.get(testPatientPage.dateofBithField).should('have.value', '01/01/1950')

    // Validate Race Dropdown Option
    cy.get(testPatientPage.raceDropdown).find(':selected').contains('Asian')

    // Validate ethnicity selection
    cy.get(testPatientPage.ethnicityDropdown).find(':selected').contains('Not Hispanic or Latino')

    // Validate Gender selection
    cy.get(testPatientPage.genderDropdown).find(':selected').contains('Male')

    // Validate expected results on the target measure's patient
    cy.get('input[name=IPP]').should('not.be.checked')
    cy.get('input[name=MSRPOPL]').should('not.be.checked')
    cy.get('input[name=MSRPOPLEX]').should('not.be.checked')

    testPatientPage.clickSavePatient()
  }

})
