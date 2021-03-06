import * as helper from "../../../../support/helpers"
import * as bonnieLogin from "../../../../support/Bonnie/BonnieFHIR/BonnieLoginLogout"
import * as measureDetailsPage from "../../../../pom/BonnieFHIR/WI/MeasureDetailsPage"
import * as deletePatient from "../../../../support/Bonnie/BonnieFHIR/DeletePatient"
import * as deleteMeasure from "../../../../support/Bonnie/BonnieFHIR/DeleteMeasure"
import * as testPatientPage from "../../../../pom/BonnieFHIR/WI/TestPatientPage"
import * as bonnieUploadMeasure from "../../../../support/Bonnie/BonnieFHIR/BonnieUploadMeasure"
import * as dashboard from "../../../../pom/BonnieFHIR/WI/Dashboard"
import * as importMeasureDialog from '../../../../pom/BonnieFHIR/WI/ImportMeasureDialog'

// Can be any measure with Encounters
const measureName = "Cms111testingMeasure"
const measureFileName = "Cms111testingMeasure-v0-0-004-FHIR-4-0-1.zip"

describe("Delete Measure", () => {
  beforeEach("Login", () => {
    bonnieLogin.login()
  })

  afterEach("Log Out", () => {
    bonnieLogin.logout()
  })

  it("Delete Measure", () => {
    bonnieUploadMeasure.UploadMeasureToBonnie(
      measureFileName,
      false
    )

    dashboard.navigateToMeasureDetails(measureName)

    deleteMeasure.DeleteMeasure(measureName)

    helper.visibleWithTimeout(measureDetailsPage.measurePageNavigationBtn)

    helper.visibleWithTimeout(importMeasureDialog.importMeasureDialog)

    cy.get(importMeasureDialog.closeBtn).click()

    helper.notVisibleWithTimeout(importMeasureDialog.importMeasureDialog)
  })

})
