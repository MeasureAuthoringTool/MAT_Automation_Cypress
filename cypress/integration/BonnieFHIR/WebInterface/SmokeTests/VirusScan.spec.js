import * as bonnieLogin from '../../../../support/Bonnie/BonnieLoginLogout'
import * as bonnieUploadMeasure from '../../../../support/Bonnie/BonnieUploadMeasure'
import * as homePage from '../../../../pom/BonnieQDM/WI/Homepage'
import * as importMeasureDialog from '../../../../pom/BonnieQDM/WI/ImportMeasureDialog'
import * as helper from '../../../../support/helpers'

describe('Smoke Test: Virus Scan', () => {

  beforeEach('Login', () => {

    bonnieLogin.login()

  })
  afterEach('Log Out', () => {

    bonnieLogin.logout()

  })

  //Not working, needs to updated
  it.skip('Verify successful error message when uploading simulated virus', () => {

    bonnieUploadMeasure.VirusScanUpload()

    // Verify error message
    cy.get(homePage.errorDialog).should('be.visible')
    cy.get(importMeasureDialog.errorDialogLine1).should('contain.text', 'The uploaded file is not a valid Measure Authoring Tool (MAT) export of a FHIR Based Measure.')
    cy.get(importMeasureDialog.errorDialogLine2).should('contain.text', 'Error: V100. Please re-package and re-export your FHIR based measure from the MAT and try again.')
    cy.get(importMeasureDialog.errorDialogLine3).should('contain.text', 'If the problem continues, please report the issue on the BONNIE Issue Tracker.')

    // Close error dialog
    cy.get(homePage.errorDialogCloseButton).click()

    cy.get(importMeasureDialog.closeBtn).click()

    helper.notVisibleWithTimeout(importMeasureDialog.importMeasureDialog)

  })
})