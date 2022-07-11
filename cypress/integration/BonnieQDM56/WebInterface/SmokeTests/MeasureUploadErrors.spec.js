import * as bonnieLogin from '../../../../support/Bonnie/BonnieLoginLogout'
import * as bonnieUploadMeasure from '../../../../support/Bonnie/BonnieUploadMeasure'
import * as homePage from '../../../../pom/BonnieQDM/WI/Homepage'
import * as helper from '../../../../support/helpers'
import * as measureDetailsPage from '../../../../pom/BonnieQDM/WI/MeasureDetailsPage'
import * as deleteMeasure from '../../../../support/Bonnie/BonnieFHIR/DeleteMeasure'
import * as importMeasureDialog from '../../../../pom/BonnieQDM/WI/ImportMeasureDialog'

const measureName = 'Risk-Standardized Inpatient Respiratory Depression Rate Following Elective ' +
  'Primary Total Hip Arthroplasty (THA) And/Or Total Knee Arthroplasty (TKA) eCQM'
const measureFileToUpload = 'QDM56/RSIRDR-eCQM-v1-1-QDM-5-6.zip'
const fhirMeasureFileToUpload = 'FHIR/SBTESTCMS347-v0-0-016-FHIR-4-0-1.zip'
const artifactsFileToUpload = 'QDM56/Export-Artifacts.zip'

describe('Measure Upload Errors', () => {
  beforeEach('Login', () => {
    bonnieLogin.login()
  })

  after('Log Out', () => {
    bonnieLogin.logout()
  })

  it('Handles duplicate measure error', () => {
    const duplicateMeasureFileName = measureFileToUpload
    const duplicateMeasureName = measureName

    bonnieUploadMeasure.UploadMeasureToBonnie(
      duplicateMeasureFileName,
      false
    )
    bonnieUploadMeasure.UploadMeasureToBonnie(
      duplicateMeasureFileName,
      false,
      true
    )

    // Verify error message
    cy.get(homePage.errorDialog).should('be.visible')
    cy.get(importMeasureDialog.errorDialogLine1).should('contain.text', 'A version of this measure is already loaded.')
    cy.get(importMeasureDialog.errorDialogLine2).should('contain.text', 'You have a version of this measure loaded already.  Either update that measure with the update button, or delete that measure and re-upload it.')
    cy.get(importMeasureDialog.errorDialogLine3).should('contain.text', 'If the problem continues, please report the issue on the BONNIE Issue Tracker.')

    // Close error dialog
    cy.get(homePage.errorDialogCloseButton).click()

    helper.visibleWithTimeout(measureDetailsPage.measurePageNavigationBtn)

    deleteMeasure.DeleteMeasure(duplicateMeasureName)

    helper.visibleWithTimeout(measureDetailsPage.measurePageNavigationBtn)

    helper.visibleWithTimeout(importMeasureDialog.importMeasureDialog)

    cy.get(importMeasureDialog.closeBtn).click()

    helper.notVisibleWithTimeout(importMeasureDialog.importMeasureDialog)
  })

  it('Verify error message when FHIR measure is uploaded to Bonnie QDM', () => {
    bonnieUploadMeasure.UploadMeasureToBonnie(fhirMeasureFileToUpload, false)

    // verify the error message
    cy.get(importMeasureDialog.errorDialogLine1).should('contain.text', 'The uploaded zip file is not a valid Measure Authoring Tool (MAT) export of a CQL Based Measure.')
    cy.get(importMeasureDialog.errorDialogLine2).should('contain.text', 'Measure loading process encountered error: Error processing package file: Measure folder found with no hqmf Please re-package and re-export your measure from the MAT.')
    cy.get(importMeasureDialog.errorDialogLine3).should('contain.text', 'If the problem continues, please report the issue on the BONNIE Issue Tracker.')
    cy.get(importMeasureDialog.modalCloseBtn).click()

    helper.notVisibleWithTimeout(homePage.errorDialog)

    helper.visibleWithTimeout(importMeasureDialog.importMeasureDialog)

    cy.get(importMeasureDialog.closeBtn).click()

    helper.notVisibleWithTimeout(importMeasureDialog.importMeasureDialog)
  })

  it('Verify error message when a zip file with multiple measures is uploaded to Bonnie QDM', () => {
    bonnieUploadMeasure.UploadMeasureToBonnie(artifactsFileToUpload, false)

    // verify the error message
    cy.get(importMeasureDialog.errorDialogLine1).should('contain.text', 'The uploaded zip file is not a valid Measure Authoring Tool (MAT) export of a CQL Based Measure.')
    cy.get(importMeasureDialog.errorDialogLine2).should('contain.text', 'Measure loading process encountered error: Error processing package file: Multiple measure folders at top level Please re-package and re-export your measure from the MAT.')
    cy.get(importMeasureDialog.errorDialogLine3).should('contain.text', 'If the problem continues, please report the issue on the BONNIE Issue Tracker.')
    cy.get(importMeasureDialog.modalCloseBtn).click()

    helper.notVisibleWithTimeout(homePage.errorDialog)

    helper.visibleWithTimeout(importMeasureDialog.importMeasureDialog)

    cy.get(importMeasureDialog.closeBtn).click()

    helper.notVisibleWithTimeout(importMeasureDialog.importMeasureDialog)
  })
})
