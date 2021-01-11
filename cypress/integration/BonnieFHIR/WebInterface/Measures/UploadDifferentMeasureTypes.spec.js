import * as helper from "../../../../support/helpers"
import * as bonnieLogin from "../../../../support/BonnieFHIR/BonnieLoginLogout"
import * as measureDetailsPage from "../../../../pom/BonnieFHIR/WI/MeasureDetailsPage"
import * as deletePatient from "../../../../support/BonnieFHIR/DeletePatient"
import * as deleteMeasure from "../../../../support/BonnieFHIR/DeleteMeasure"
import * as testPatientPage from "../../../../pom/BonnieFHIR/WI/TestPatientPage"
import * as bonnieUploadMeasure from "../../../../support/BonnieFHIR/BonnieUploadMeasure"
import * as dashboard from "../../../../pom/BonnieFHIR/WI/Dashboard"

const continuousVariableMeasureName = "Cms111testingMeasure"
const continuousVariableMeasureFileToUpload =
  "Cms111testingMeasurev603-Artifacts.zip"

const cohortMeasureName = "EXM529"
const cohortMeasureFileToUpload = "EXM529v603-Artifacts.zip"

const proportionMultiGroupMeasureName = "SBTESTCMS347"
const proportionMultiGroupMeasureFileToUpload =
  "SBTESTCMS347v603-Artifacts.zip"

const measureWithStratificationsMeasureName = "CMS111Test"
const measureWithStratificationsFileToUpload = "CMS111Test_v6_02_Artifacts.zip"

const lastNameSuffix = new Date().getTime()
const distinctLastName = "President" + lastNameSuffix

describe("Measure Upload", () => {
  beforeEach("Login", () => {
    bonnieLogin.login()
  })

  afterEach("Log Out", () => {
    bonnieLogin.logout()
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

    deleteMeasure.DeleteMeasure(continuousVariableMeasureName)

    helper.visibleWithTimeout(measureDetailsPage.measurePageNavigationBtn)
  })

  it("Cohort Measure: Successful Upload", () => {
    bonnieUploadMeasure.UploadMeasureToBonnie(cohortMeasureFileToUpload, false)

    dashboard.navigateToMeasureDetails(cohortMeasureName)

    cy.get(measureDetailsPage.patientListing).then((patientListing) => {
      const initialPatientCount = parseInt(patientListing.text())
      cy.log("patient count was:" + initialPatientCount)

      measureDetailsPage.clickAddPatient()
      testPatientPage.enterPatientCharacteristics(distinctLastName)

      testPatientPage.clickSavePatient()

      helper.visibleWithTimeout(measureDetailsPage.measurePageNavigationBtn)

      deletePatient.DeletePatient(distinctLastName)
      deletePatient.VerifyPatientRemoved(initialPatientCount)
    })
    helper.visibleWithTimeout(measureDetailsPage.measurePageNavigationBtn)

    deleteMeasure.DeleteMeasure(cohortMeasureName)

    helper.visibleWithTimeout(measureDetailsPage.measurePageNavigationBtn)
  })

  it("Multi-Group Proportion Measure: Successful Upload", () => {
    helper.visibleWithTimeout(measureDetailsPage.measurePageNavigationBtn)

    bonnieUploadMeasure.UploadMeasureToBonnie(
      proportionMultiGroupMeasureFileToUpload,
      false
    )

    dashboard.navigateToMeasureDetails(proportionMultiGroupMeasureName)

    cy.get(measureDetailsPage.patientListing).then((patientListing) => {
      const initialPatientCount = parseInt(patientListing.text())
      cy.log("patient count was:" + initialPatientCount)

      measureDetailsPage.clickAddPatient()
      testPatientPage.enterPatientCharacteristics(distinctLastName)

      testPatientPage.clickSavePatient()

      helper.visibleWithTimeout(measureDetailsPage.measurePageNavigationBtn)

      deletePatient.DeletePatient(distinctLastName)
      deletePatient.VerifyPatientRemoved(initialPatientCount)
    })
    helper.visibleWithTimeout(measureDetailsPage.measurePageNavigationBtn)

    deleteMeasure.DeleteMeasure(proportionMultiGroupMeasureName)

    helper.visibleWithTimeout(measureDetailsPage.measurePageNavigationBtn)
  })

  it("Uploads a measure with stratifications", () => {
    bonnieUploadMeasure.UploadMeasureToBonnie(
      measureWithStratificationsFileToUpload,
      false
    )

    // First navigate to measure, then count the patients within the measure
    dashboard.navigateToMeasureDetails(measureWithStratificationsMeasureName)

    cy.get(measureDetailsPage.patientListing).then((patientListing) => {
      const initialPatientCount = parseInt(patientListing.text())
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

      deletePatient.DeletePatient(distinctLastName)
      deletePatient.VerifyPatientRemoved(initialPatientCount)
    })
    helper.visibleWithTimeout(measureDetailsPage.measurePageNavigationBtn)

    deleteMeasure.DeleteMeasure(measureWithStratificationsMeasureName)

    helper.visibleWithTimeout(measureDetailsPage.measurePageNavigationBtn)
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
