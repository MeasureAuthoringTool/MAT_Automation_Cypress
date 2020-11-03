import * as helper from '../../support/helpers'
import * as importMeasureDialog from '../../pom/BonnieFHIR/WI/ImportMeasureDialog'
import * as dashboard from '../../pom/BonnieFHIR/WI/Dashboard'

export const UploadMeasureToBonnie = (fileToUpload, calculation) => {
  cy.log('UploadMeasureToBonnie')

  let VsacApiKey = Cypress.env('VSAC_API_KEY')
  cy.log(VsacApiKey)

  helper.enabledWithTimeout(dashboard.uploadBtn)
  cy.get(dashboard.uploadBtn).click()

  if (calculation) {
    changeMeasureCalculation(calculation)
  }

  //upload the file to the modal
  helper.visibleWithTimeout(importMeasureDialog.importMeasureDialog)

  helper.enabledWithTimeout(importMeasureDialog.fileImportInput)
  cy.get(importMeasureDialog.fileImportInput).attachFile(fileToUpload)

  //wait for VSAC api key field to display for the user, and enter api key
  helper.visibleWithTimeout(importMeasureDialog.vsacApiKeyTextBox)
  helper.enabledWithTimeout(importMeasureDialog.vsacApiKeyTextBox)
  helper.enterText(importMeasureDialog.vsacApiKeyTextBox, '57d1a36d-c0f0-4f51-a1c0-4ae38e51806d')

  //click load button to import the measure
  helper.enabled(importMeasureDialog.importLoadBtn)
  helper.click(importMeasureDialog.importLoadBtn)

  cy.log('UploadMeasureToBonnie - done')
}

function changeMeasureCalculation (calculation) {
  const radio = calculation === 'episode' ? importMeasureDialog.episodeOfCareCalculation : importMeasureDialog.patientCalculation
  cy.get(radio).check({ force: true })
}
