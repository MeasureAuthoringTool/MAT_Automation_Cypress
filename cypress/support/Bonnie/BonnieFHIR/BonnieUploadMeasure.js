import * as helper from '../../helpers'
import * as importMeasureDialog from '../../../pom/BonnieFHIR/WI/ImportMeasureDialog'
import * as dashboard from '../../../pom/BonnieFHIR/WI/Dashboard'
import * as measureDetailsPage from '../../../pom/BonnieFHIR/WI/MeasureDetailsPage'

export const UploadMeasureToBonnie = (fileToUpload, calculation, vsacLoggedIn, includeSDE) => {
  cy.log('UploadMeasureToBonnie')
  cy.log('UploadMeasureToBonnie measure file ' + fileToUpload)

  let VsacApiKey = Cypress.env('VSAC_API_KEY')
  cy.log(VsacApiKey)

  cy.wait(1500)
  helper.visibleWithTimeout(dashboard.uploadBtn)
  helper.enabledWithTimeout(dashboard.uploadBtn)

  //setup for grabbing the VSAC call profile_names
  cy.server({ method: 'GET' })
  cy.route('/vsac_util/profile_names').as('vsac')

  cy.get(dashboard.uploadBtn).click()

  //waiting for VSAC call return 200
  cy.wait('@vsac').its('status').should('eq', 200)

  if (calculation) {
    changeMeasureCalculation(calculation)
  }

  helper.visibleWithTimeout(importMeasureDialog.importMeasureDialog)
  helper.visibleWithTimeout(importMeasureDialog.importLoadBtn)
  //helper.visibleWithTimeout(importMeasureDialog.fileImportInput)

  //upload the file to the modal
  //helper.enabledWithTimeout(importMeasureDialog.fileImportInput)
  cy.get(importMeasureDialog.fileImportInput).attachFile(fileToUpload)

  if (vsacLoggedIn === true) {

    helper.visibleWithTimeout(importMeasureDialog.vsacLogOut)

  } else if (vsacLoggedIn === undefined || vsacLoggedIn === false) {

    //wait for VSAC api key field to display for the user, and enter api key
    helper.visibleWithTimeout(importMeasureDialog.vsacApiKeyTextBox)
    helper.enabledWithTimeout(importMeasureDialog.vsacApiKeyTextBox)
    helper.enterText(importMeasureDialog.vsacApiKeyTextBox, VsacApiKey)
  }

  if (includeSDE === true) {
    helper.click(importMeasureDialog.includeSDECheckbox)
    cy.get(importMeasureDialog.includeSDECheckbox).should('be.checked')
  }


  //click load button to import the measure
  helper.visibleWithTimeout(importMeasureDialog.importLoadBtn)
  helper.enabled(importMeasureDialog.importLoadBtn)
  helper.click(importMeasureDialog.importLoadBtn)

  cy.wait(2000)
  cy.log('UploadMeasureToBonnie - done')
}

export const UpdateMeasure = (fileToUpload) => {
  cy.log('UpdateMeasure')
  cy.log('UpdateMeasure measure file ' + fileToUpload)
  measureDetailsPage.clickUpdateMeasure()

  helper.visibleWithTimeout(importMeasureDialog.importMeasureDialog)
  helper.visibleWithTimeout(importMeasureDialog.importLoadBtn)
  //helper.visibleWithTimeout(importMeasureDialog.fileImportInput)

  //upload the file to the modal
  //helper.enabledWithTimeout(importMeasureDialog.fileImportInput)
  cy.get(importMeasureDialog.fileImportInput).attachFile(fileToUpload)

  //click load button to import the measure
  helper.visibleWithTimeout(importMeasureDialog.importLoadBtn)
  helper.enabled(importMeasureDialog.importLoadBtn)
  helper.click(importMeasureDialog.importLoadBtn)

  cy.wait(2000)
  cy.log('UpdateMeasure - done')
}

function changeMeasureCalculation (calculation) {
  const radio = calculation === 'episode' ? importMeasureDialog.episodeOfCareCalculation : importMeasureDialog.patientCalculation
  cy.get(radio).check({ force: true })
}
