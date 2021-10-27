import * as bonnieLogin from '../../../../support/Bonnie/BonnieLoginLogout'
import * as bonnieUploadMeasure from '../../../../support/Bonnie/BonnieUploadMeasure'
import * as measureDetailsPage from '../../../../pom/BonnieFHIR/WI/MeasureDetailsPage'
import * as testPatientPage from '../../../../pom/BonnieFHIR/WI/TestPatientPage'
import * as deletePatient from '../../../../support/Bonnie/BonnieFHIR/DeletePatient'
import * as homePage from '../../../../pom/BonnieFHIR/WI/Homepage'

describe('Patient Coverage Calculation', () => {

  const measureName = 'FHIR Medication Testing'
  const measureFileToUpload = 'FHIR/FMT-v0-0-001-FHIR-4-0-1.zip'

  beforeEach('Login', () => {
    bonnieLogin.login()
  })
  afterEach('Log Out', () => {
    bonnieLogin.logout()
  })

  it.only('Verify Coverage Calculation for FHIR Patient', () => {

    bonnieUploadMeasure.UploadMeasureToBonnie(measureFileToUpload, false)
    measureDetailsPage.navigateToMeasureDetails(measureName)

    const lastNameSuffix = new Date().getTime()
    const distinctLastName = "President" + lastNameSuffix

    //Add Patient

    cy.get(measureDetailsPage.patientListing).then((patientListing) => {
      const initialPatientCount = parseInt(patientListing.text(), 10)
      cy.log('patient count was:' + initialPatientCount)

      measureDetailsPage.clickAddPatient()
      testPatientPage.enterPatientCharacteristics(distinctLastName)
      testPatientPage.enterExpectedResults(["IPP", "DENOM", "NUMER"])
      testPatientPage.dragAndDrop('management', 'Management: Encounter: Office Visit', 2)
      status()
      testPatientPage.dragAndDrop('clinical summary', 'Clinical Summary: Condition: Diabetes', 0)
      clinicalStatus()
      testPatientPage.dragAndDrop('medications', 'Medications: MedicationDispense: insulin aspart protamine, human / insulin aspart, human', 6)
      medications()
      testPatientPage.clickSavePatient()
      testPatientPage.verifyPatientAdded(initialPatientCount, distinctLastName)
      measureDetailsPage.navigateToHomeMeasurePage()
      navigateToMeasureDetails(measureName)
      cy.get(measureDetailsPage.coverageNumber).invoke('val')
        .then(value => {
          expect(value).to.eql('100')
        })
      deletePatient.DeletePatient(distinctLastName)
      deletePatient.VerifyPatientRemoved(initialPatientCount)

    })
  })
  function navigateToMeasureDetails (measureName) {
    cy.log('navigateToMeasureDetails')
    cy.get(homePage.measure).contains(measureName).click({force: true})
    // cy.wait(1000)
    cy.get(measureDetailsPage.measureDetailsTitle).should('contain.text', 'Measure details')
    cy.log('navigateToMeasureDetails - done')
  }
  function status () {
    cy.log('addStatus')
    cy.get(testPatientPage.attributeNameSelect).select('status')
    cy.get(testPatientPage.attributeTypeSelect).should('contain.text', 'Code')
    cy.get(testPatientPage.valueSetDirectRefSelect).select('EncounterStatus')
    cy.get(testPatientPage.status).select('finished - Finished')
    cy.get(testPatientPage.addWidgetBtn).eq(0).click()
    cy.get(testPatientPage.exsistingAttribute).contains('status: finished')
    cy.log('Status added successfully')
  }
  function clinicalStatus () {
    cy.log('addClinicalStatus')
    cy.get(testPatientPage.attributeNameSelect).select('clinicalStatus')
    cy.get(testPatientPage.valueSetDirectRefSelect).select('ConditionClinicalStatusCodes')
    cy.get(testPatientPage.status).select('active - Active')
    cy.get(testPatientPage.addWidgetBtn).eq(0).click()
    cy.get(testPatientPage.exsistingAttribute).contains('clinicalStatus: [ConditionClinicalStatusCodes: active]')
    cy.get(testPatientPage.attributeNameSelect).select('onset')
    cy.get(testPatientPage.attributeTypeSelect).select('DateTime')
    cy.get(testPatientPage.dateTimeCheckbox).click()
    cy.get(testPatientPage.addWidgetBtn).eq(0).click()
    cy.get(testPatientPage.exsistingAttribute).contains('onset:')
    cy.get(testPatientPage.attributeNameSelect).select('verificationStatus')
    cy.get(testPatientPage.valueSetDirectRefSelect).select('ConditionVerificationStatus')
    cy.get(testPatientPage.addWidgetBtn).eq(0).click()
    cy.get(testPatientPage.exsistingAttribute).contains('verificationStatus: [ConditionVerificationStatus: confirmed]')
    cy.log('Clinical Status added successfully')
  }
  function medications() {
    cy.log('addMedications')
    cy.get(testPatientPage.attributeNameSelect).select('dosageInstruction.timing')
    cy.get(testPatientPage.repeatBounds).select('Period')
    cy.get(testPatientPage.repeatBoundsPeriodStartDate).click()
    cy.get(testPatientPage.repeatBoundsPeriodEndDate).click()
    cy.get(testPatientPage.addWidgetBtn).eq(0).click()
    cy.get(testPatientPage.exsistingAttribute).contains('dosageInstruction: ')
    cy.get(testPatientPage.exsistingAttribute).contains('dosageInstruction.timing: repeat.bounds :')
    cy.get(testPatientPage.attributeNameSelect).select('medication')
    cy.get(testPatientPage.valueSetDirectRefSelect).select('Custom Code')
    cy.get(testPatientPage.medicationCustomCodeSelect).select('RXNORM')
    cy.get(testPatientPage.medicationCustomCode).type('1007184')
    cy.get(testPatientPage.addWidgetBtn).eq(0).click()
    cy.get(testPatientPage.exsistingAttribute).contains('medication: [RXNORM: 1007184] ')
    cy.log('Medications added successfully')
  }
})
