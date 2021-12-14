import * as helper from '../../../../support/helpers'
import * as bonnieLogin from '../../../../support/Bonnie/BonnieLoginLogout'
import * as measureDetailsPage from '../../../../pom/BonnieFHIR/WI/MeasureDetailsPage'
import * as testPatientPage from '../../../../pom/BonnieFHIR/WI/TestPatientPage'
import * as bonnieUploadMeasure from '../../../../support/Bonnie/BonnieUploadMeasure'

const measureName = 'SBTESTCMS347'
const measureFileToUpload = 'FHIR/SBTESTCMS347-v0-0-016-FHIR-4-0-1.zip'

const lastNameSuffix = new Date().getTime()
const distinctLastName = 'President' + lastNameSuffix

describe('Patient: Clone Patient', () => {

  beforeEach('Login', () => {

    bonnieLogin.login()
    bonnieUploadMeasure.UploadMeasureToBonnie(measureFileToUpload,false)
    measureDetailsPage.navigateToMeasureDetails(measureName)

  })
  afterEach('Log Out', () => {

    bonnieLogin.logout()

  })

  it('Verify the ability to clone a Patient', () => {

    cy.get(measureDetailsPage.patientListing).then((patientListing) => {
      const initialPatientCount = parseInt(patientListing.text(), 10)
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
      cy.get(testPatientPage.dateofBithField).should('have.value', '01/01/1945')

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
    })
  })
})
