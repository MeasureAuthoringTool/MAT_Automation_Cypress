import * as helper from '../../support/helpers'
import * as importMeasureDialog from '../../pom/BonnieFHIR/WI/ImportMeasureDialog'
import * as dashboard from '../../pom/BonnieFHIR/WI/Dashboard'


export const UploadMeasureToBonnie = (fileToUpload, calculation, vsacLoggedIn) => {
  cy.log('UploadMeasureToBonnie')

  let VsacApiKey = Cypress.env('VSAC_API_KEY')
  cy.log(VsacApiKey)

  cy.wait(1500)
  helper.visibleWithTimeout(dashboard.uploadBtn)
  helper.enabledWithTimeout(dashboard.uploadBtn)
  cy.get(dashboard.uploadBtn).click()


  if (calculation) {
    changeMeasureCalculation(calculation)
  }

  helper.visibleWithTimeout(importMeasureDialog.importMeasureDialog)
  helper.visibleWithTimeout(importMeasureDialog.importLoadBtn)
  helper.visibleWithTimeout(importMeasureDialog.fileImportInput)

  //upload the file to the modal
  helper.enabledWithTimeout(importMeasureDialog.fileImportInput)
  cy.get(importMeasureDialog.fileImportInput).attachFile(fileToUpload)

  helper.visibleWithTimeout(importMeasureDialog.importLoadBtn)

  if (vsacLoggedIn === undefined) {

    //wait for VSAC api key field to display for the user, and enter api key
    helper.visibleWithTimeout(importMeasureDialog.vsacApiKeyTextBox)
    helper.enabledWithTimeout(importMeasureDialog.vsacApiKeyTextBox)
    helper.enterText(importMeasureDialog.vsacApiKeyTextBox, VsacApiKey)

  }

  //click load button to import the measure
  helper.enabled(importMeasureDialog.importLoadBtn)
  helper.click(importMeasureDialog.importLoadBtn)

  cy.log('UploadMeasureToBonnie - done')
}

function changeMeasureCalculation (calculation) {
  const radio = calculation === 'episode' ? importMeasureDialog.episodeOfCareCalculation : importMeasureDialog.patientCalculation
  cy.get(radio).check({ force: true })
}