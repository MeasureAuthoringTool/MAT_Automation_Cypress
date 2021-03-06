import * as helper from '../../helpers'
import * as importMeasureDialog from '../../../pom/BonnieFHIR/WI/ImportMeasureDialog'
import * as dashboard from '../../../pom/BonnieFHIR/WI/Dashboard'

export const UploadMeasureToBonnie = (fileToUpload) => {

  let VsacApiKey = Cypress.env('VSAC_API_KEY')

  helper.enabledWithTimeout(dashboard.uploadBtn)
  cy.get(dashboard.uploadBtn).click()

  //upload the file to the modal
  helper.visibleWithTimeout(importMeasureDialog.importMeasureDialog)

  helper.enabledWithTimeout(importMeasureDialog.fileImportInput)
  cy.get(importMeasureDialog.fileImportInput).attachFile(fileToUpload)

  //wait for VSAC api key field to display for the user, and enter username
  helper.visibleWithTimeout(importMeasureDialog.vsacApiKeyTextBox)
  helper.enabledWithTimeout(importMeasureDialog.vsacApiKeyTextBox)
  helper.enterText(importMeasureDialog.vsacApiKeyTextBox, VsacApiKey)

  //click load button to import the measure
  helper.enabled(importMeasureDialog.importLoadBtn)
  helper.click(importMeasureDialog.importLoadBtn)

}
