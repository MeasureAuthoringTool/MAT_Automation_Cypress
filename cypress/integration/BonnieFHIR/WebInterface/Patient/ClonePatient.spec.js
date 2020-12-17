import * as helper from '../../../../support/helpers'
import * as bonnieLogin from '../../../../support/BonnieFHIR/BonnieLoginLogout'
import * as measureDetailsPage from '../../../../pom/BonnieFHIR/WI/MeasureDetailsPage'
import * as deletePatient from '../../../../support/BonnieFHIR/DeletePatient'
import * as deleteMeasure from '../../../../support/BonnieFHIR/DeleteMeasure'
import * as testPatientPage from '../../../../pom/BonnieFHIR/WI/TestPatientPage'
import * as bonnieUploadMeasure from '../../../../support/BonnieFHIR/BonnieUploadMeasure'

const measureName = 'FHIRmeasureCMS347'
const measureFileToUpload = 'FHIRmeasureCMS347v603-Artifacts.zip'

const lastNameSuffix = new Date().getTime()
const distinctLastName = 'President' + lastNameSuffix

describe('Patient: Clone Patient', () => {

  before('Login', () => {

    bonnieLogin.login()
    bonnieUploadMeasure.UploadMeasureToBonnie(measureFileToUpload,false)
    measureDetailsPage.navigateToMeasureDetails(measureName)

  })
  after('Log Out', () => {

    deleteMeasure.DeleteMeasure(measureName)
    helper.visibleWithTimeout(measureDetailsPage.measurePageNavigationBtn)
    bonnieLogin.logout()

  })

  it('Verify the ability to clone a Patient', () => {

    cy.get(measureDetailsPage.patientListing).then((patientListing) => {
      const initialPatientCount = parseInt(patientListing.text())
      cy.log('patient count was:' + initialPatientCount)

      measureDetailsPage.clickAddPatient()
      testPatientPage.enterPatientCharacteristics(distinctLastName)

      testPatientPage.clickSavePatient()

      //Click the arrow Btn to show the patient actions
      helper.click(testPatientPage.measureDetailsPatientArrowBtn)

      //Click the Clone button
      helper.click(testPatientPage.measureDetailsPatientCloneButton)

      //Validate Cloned patient attributes
      //First, validate Name was incremented with the (1) value
      helper.enabledWithTimeout(testPatientPage.firstNameTextField)
      cy.get(testPatientPage.firstNameTextField).should('have.value', 'Current (1)')

      //Validate Last Name
      cy.get(testPatientPage.lastNameTextField).should('have.value', distinctLastName)
      //Change last name value to help delete method
      helper.enterText(testPatientPage.lastNameTextField, 'ClonedPatient')

      //Validate Patient Description
      cy.get(testPatientPage.patientDescriptionTextField).should('have.value', 'Patient is very special')

      //Validate Date of Birth
      cy.get(testPatientPage.dateofBithField).should('have.value', '01/01/1950')

      //Validate Race Dropdown Option
      cy.get(testPatientPage.raceDropdown).find(':selected').contains('Asian')

      //Validate ethnicity selection
      cy.get(testPatientPage.ethnicityDropdown).find(':selected').contains('Not Hispanic or Latino')

      //Validate Gender selection
      cy.get(testPatientPage.genderDropdown).find(':selected').contains('Male')

      testPatientPage.clickSavePatient()

      cy.get(measureDetailsPage.patientListing).should('have.text', (initialPatientCount + 2).toString())
      testPatientPage.getPatientRecord(distinctLastName).find(measureDetailsPage.patientStatus).should('contain.text', 'pass')
      testPatientPage.getPatientRecord('ClonedPatient').find(measureDetailsPage.patientStatus).should('contain.text', 'pass')

      helper.visibleWithTimeout(measureDetailsPage.measurePageNavigationBtn)

      deletePatient.DeletePatient(distinctLastName)

      helper.visibleWithTimeout(measureDetailsPage.measurePageNavigationBtn)

      deletePatient.DeletePatient('ClonedPatient')

      deletePatient.VerifyPatientRemoved(initialPatientCount)
    })

    helper.visibleWithTimeout(measureDetailsPage.measurePageNavigationBtn)

  })
})
