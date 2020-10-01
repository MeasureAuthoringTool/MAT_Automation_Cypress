import * as helper from '../../../../support/helpers'
import * as bonnieLogin from '../../../../support/BonnieFHIR/BonnieLoginLogout'
import * as dashboard from '../../../../pom/BonnieFHIR/WI/Dashboard'
import * as bonnieUpload from '../../../../support/BonnieFHIR/BonnieUploadMeasure'
import * as bonnieDelete from '../../../../support/BonnieFHIR/DeleteMeasure'
import * as testPatientPage from '../../../../pom/BonnieFHIR/WI/TestPatientPage'
import * as bonnieDeletePatient from '../../../../support/BonnieFHIR/DeletePatient'

const fileToUpload = "CMS104.zip"

describe('Clone a patient that exists in a measure', () => {

  before('Login', () => {

    bonnieLogin.login()

  })
  after('Log Out', () => {
      bonnieDelete.DeleteMeasureFromBonnie("CMS104")
      bonnieLogin.logout()

  })

  it('Successful Patient Clone', () => {

    //Validate that dashboard page is displayed to user
    helper.enabledWithTimeout(dashboard.uploadBtn)

    //Upload file that contains a patient
    bonnieUpload.UploadMeasureToBonnie(fileToUpload)

    //Click into the measure that was just uploaded
    cy.get(dashboard.measureNameDiv).each(function($el) {
      if ($el.text().includes("CMS104")) {
        cy.wrap($el).click()
      }
    })

    //Validate that one patient exists for the measure and it has the below name
    cy.get(testPatientPage.measureDetailsPagePatientNameDiv).should('have.length', 1).should('contain', 'President Current')

    //Click the arrow Btn to show the patient actions
    helper.click(testPatientPage.measureDetailsPatientArrowBtn)

    //Click the Clone button
    helper.click(testPatientPage.measureDetailsPatientCloneButton)
    helper.verifySpinnerAppearsAndDissappears()

    //Validate Cloned patient attributes
    //First, validate Name was incremented with the (1) value
    helper.enabledWithTimeout(testPatientPage.firstNameTextField)
    cy.get(testPatientPage.firstNameTextField).should('have.value', 'Current (1)')

    //Validate Last Name
    cy.get(testPatientPage.lastNameTextField).should('have.value', 'President')

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

    //Click the save button
    helper.click(testPatientPage.saveBtn)

    //Validate that two patients now exist for the measure and the names are correct
    cy.get(testPatientPage.measureDetailsPagePatientNameDiv)
      .should(($element) => {
        expect($element).to.have.length(2)
        expect($element.first()).to.contain('President Current')
        expect($element[1]).to.contain('President Current (1)')
    })

    //Delete the clone, because cloning is currently outlawed by the Geneva Convention and we don't want to end up in Gitmo
    bonnieDeletePatient.DeletePatientFromMeasure()

    })





})