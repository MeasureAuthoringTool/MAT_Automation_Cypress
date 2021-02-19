import * as helper from "../../../../support/helpers"
import * as bonnieLogin from "../../../../support/BonnieFHIR/BonnieLoginLogout"
import * as measureDetailsPage from "../../../../pom/BonnieFHIR/WI/MeasureDetailsPage"
import * as deletePatient from "../../../../support/BonnieFHIR/DeletePatient"
import * as deleteMeasure from "../../../../support/BonnieFHIR/DeleteMeasure"
import * as testPatientPage from "../../../../pom/BonnieFHIR/WI/TestPatientPage"
import * as bonnieUploadMeasure from "../../../../support/BonnieFHIR/BonnieUploadMeasure"
import * as dashboard from "../../../../pom/BonnieFHIR/WI/Dashboard"
import * as homePage from "../../../../pom/BonnieFHIR/WI/Homepage"
import * as importMeasureDialog from '../../../../pom/BonnieFHIR/WI/ImportMeasureDialog'

const continuousVariableMeasureName = "Cms111testingMeasure"
const continuousVariableMeasureFileToUpload =
  "Cms111testingMeasure-v0-0-004-FHIR-4-0-1.zip"

const cohortMeasureName = "EXM529"
const cohortMeasureFileToUpload = "EXM529-v0-0-004-FHIR-4-0-1.zip"

const proportionMultiGroupMeasureName = "SBTESTCMS347"
const proportionMultiGroupMeasureFileToUpload =
  "SBTESTCMS347-v0-0-008-FHIR-4-0-1 (1).zip"

const measureWithStratificationsMeasureName = "CMS111Test"
const measureWithStratificationsFileToUpload = "CMS111Test-v0-0-016-FHIR-4-0-1.zip"

const lastNameSuffix = new Date().getTime()
const distinctLastName = "President" + lastNameSuffix

describe("Measure Upload", () => {
  beforeEach("Login", () => {
    bonnieLogin.login()
  })

  afterEach("Log Out", () => {
    bonnieLogin.logout()
  })

  it('Handles duplicate measure error', () => {

    // Can be any measure
    const duplicateMeasureFileName = continuousVariableMeasureFileToUpload
    const duplicateMeasureName = continuousVariableMeasureName

    bonnieUploadMeasure.UploadMeasureToBonnie(
      duplicateMeasureFileName,
      false
    )
    bonnieUploadMeasure.UploadMeasureToBonnie(
      duplicateMeasureFileName,
      false,
      true
    )
    
    // Error is displayed
    cy.get(homePage.errorDialog).should('have.attr', 'aria-hidden', 'false')
    cy.get(homePage.errorDialog).should('be.visible')
    cy.get(homePage.errorDialog).should('contain.text', 'A version of this measure is already loaded.')
    cy.get(homePage.errorDialog).should(
      'contain.text', 
      'You have a version of this measure loaded already. Either update that measure with the update button, or delete that measure and re-upload it.')
    cy.get(homePage.errorDialog).should('contain.text', 'If the problem continues, please report the issue on the BONNIE Issue Tracker.')

    // Close error dialog
    cy.get(homePage.errorDialogCloseButton).click()

    helper.visibleWithTimeout(measureDetailsPage.measurePageNavigationBtn)

    deleteMeasure.DeleteMeasure(duplicateMeasureName)

    helper.visibleWithTimeout(measureDetailsPage.measurePageNavigationBtn)

    helper.visibleWithTimeout(importMeasureDialog.importMeasureDialog)

    cy.get(importMeasureDialog.closeBtn).click()

    helper.notVisibleWithTimeout(importMeasureDialog.importMeasureDialog)
  })

  it('can update an existing measure', () => {

    // Can be any measure
    const measureFileName = continuousVariableMeasureFileToUpload
    const measureName = continuousVariableMeasureName

    bonnieUploadMeasure.UploadMeasureToBonnie(
      measureFileName,
      false
    )

    dashboard.navigateToMeasureDetails(measureName)
    
    bonnieUploadMeasure.UpdateMeasure(measureFileName)

    helper.visibleWithTimeout(measureDetailsPage.measurePageNavigationBtn)

    deleteMeasure.DeleteMeasure(measureName)

    helper.visibleWithTimeout(measureDetailsPage.measurePageNavigationBtn)

    helper.visibleWithTimeout(importMeasureDialog.importMeasureDialog)

    cy.get(importMeasureDialog.closeBtn).click()

    helper.notVisibleWithTimeout(importMeasureDialog.importMeasureDialog)
  })  

  it("Continuous Variable Measure: Successful Upload", () => {
    bonnieUploadMeasure.UploadMeasureToBonnie(
      continuousVariableMeasureFileToUpload,
      false
    )

    // First navigate to measure, then count the patients within the measure
    dashboard.navigateToMeasureDetails(continuousVariableMeasureName)

    cy.get(measureDetailsPage.patientListing).then((patientListing) => {
      const initialPatientCount = parseInt(patientListing.text(), 10)
      cy.log("patient count was:" + initialPatientCount)

      measureDetailsPage.clickAddPatient()
      testPatientPage.enterPatientCharacteristics(distinctLastName)

      testPatientPage.clickSavePatient()

      helper.visibleWithTimeout(measureDetailsPage.measurePageNavigationBtn)

      deletePatient.DeletePatient(distinctLastName)
      deletePatient.VerifyPatientRemoved(initialPatientCount)
    })
    helper.visibleWithTimeout(measureDetailsPage.measurePageNavigationBtn)

  })


  it("Cohort Measure: Successful Upload", () => {
    bonnieUploadMeasure.UploadMeasureToBonnie(cohortMeasureFileToUpload, false)

    dashboard.navigateToMeasureDetails(cohortMeasureName)

    cy.get(measureDetailsPage.patientListing).then((patientListing) => {
      const initialPatientCount = parseInt(patientListing.text(), 10)
      cy.log("patient count was:" + initialPatientCount)

      measureDetailsPage.clickAddPatient()
      testPatientPage.enterPatientCharacteristics(distinctLastName)

      testPatientPage.clickSavePatient()

      helper.visibleWithTimeout(measureDetailsPage.measurePageNavigationBtn)

    })
  })

  it("Multi-Group Proportion Measure: Successful Upload", () => {
    helper.visibleWithTimeout(measureDetailsPage.measurePageNavigationBtn)

    bonnieUploadMeasure.UploadMeasureToBonnie(
      proportionMultiGroupMeasureFileToUpload,
      false
    )

    dashboard.navigateToMeasureDetails(proportionMultiGroupMeasureName)

    cy.get(measureDetailsPage.patientListing).then((patientListing) => {
      const initialPatientCount = parseInt(patientListing.text(), 10)
      cy.log("patient count was:" + initialPatientCount)

      measureDetailsPage.clickAddPatient()
      testPatientPage.enterPatientCharacteristics(distinctLastName)

      testPatientPage.clickSavePatient()

      helper.visibleWithTimeout(measureDetailsPage.measurePageNavigationBtn)

    })
  })

  it("Uploads a measure with stratifications", () => {
    bonnieUploadMeasure.UploadMeasureToBonnie(
      measureWithStratificationsFileToUpload,
      false
    )

    // First navigate to measure, then count the patients within the measure
    dashboard.navigateToMeasureDetails(measureWithStratificationsMeasureName)

    cy.get(measureDetailsPage.patientListing).then((patientListing) => {
      const initialPatientCount = parseInt(patientListing.text(), 10)
      cy.log("patient count was:" + initialPatientCount)

      measureDetailsPage.clickAddPatient()
      testPatientPage.enterPatientCharacteristics(distinctLastName)

      // Verify populations are present
      cy.get("div.patient-builder div.expected-values li > a").should(
        "contain.text",
        "Population Criteria Section"
      )
      cy.get("div.patient-builder div.expected-values li > a").should(
        "contain.text",
        "PopSet1 Stratification 1"
      )
      cy.get("div.patient-builder div.expected-values li > a").should(
        "contain.text",
        "PopSet1 Stratification 2"
      )

      // ---  Population Criteria Section ---
      // Check Population Criteria Section (it is active by default)
      cy.get(".expected-values ul > li:first > a").should(
        "contain.text",
        "Population Criteria Section"
      )
      checkPopulations()

      //  --- PopSet1 Stratification 1 ---
      // Click 1st strat
      cy.get(".expected-values ul > li:nth-child(2) > a")
        .contains("PopSet1 Stratification 1")
        .click()
      checkPopulations()

      //  --- PopSet2 Stratification 2 ---
      // Click 2nd strat
      cy.get(".expected-values ul > li:nth-child(3) > a")
        .contains("PopSet1 Stratification 2")
        .click()
      checkPopulations()

      testPatientPage.clickSavePatient()

      helper.visibleWithTimeout(measureDetailsPage.measurePageNavigationBtn)

    })
  })

  function checkPopulations() {
    cy.get("div.active input[name=IPP][type=checkbox]").should(
      "not.be.checked"
    )
    cy.get("div.active input[name=MSRPOPL][type=checkbox]").should(
      "not.be.checked"
    )
    cy.get("div.active input[name=MSRPOPLEX][type=checkbox]").should(
      "not.be.checked"
    )
    cy.get("div.active input[name=MSRPOPL][type=checkbox]").check({
      force: true,
    })
    cy.get("div.active input[name=IPP][type=checkbox]").should("be.checked")
    cy.get("div.active input[name=MSRPOPL][type=checkbox]").should(
      "be.checked"
    )
    cy.get('div.active input[name="OBSERV"][type=number]').type(13)
    cy.get('div.active input[name="OBSERV"][type=number]').should(
      "have.value",
      "013"
    )
  }
})
