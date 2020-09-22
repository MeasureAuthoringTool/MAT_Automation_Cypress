import * as helper from '../../../../support/helpers'
import * as bonnieLogin from '../../../../support/BonnieFHIR/BonnieLoginLogout'
import * as dashboard from '../../../../pom/BonnieFHIR/WI/Dashboard'
import * as importMeasureDialog from '../../../../pom/BonnieFHIR/WI/ImportMeasureDialog'

let VsacApiKey = Cypress.env('VSAC_API_KEY')


describe('Patient: Create New Patient', () => {
    before('Login', () => {

        bonnieLogin.login()

    })
    after('Log Out', () => {

        //bonnieLogin.logout()

    })

    it('Successful Patient creation: Basic Information Only', () => {

        helper.enabledWithTimeout(dashboard.uploadBtn)
        cy.get(dashboard.uploadBtn).click()

        //upload the file to the modal
        helper.visibleWithTimeout(importMeasureDialog.importMeasureDialog)
        const fileToUpload = "MissingFHIRDeclarationCQL.zip"
        helper.enabledWithTimeout(importMeasureDialog.fileImportInput)

        cy.get(importMeasureDialog.fileImportInput).attachFile(fileToUpload)

        //wait for VSAC Key field to display for the user, and enter Key
        helper.visibleWithTimeout(importMeasureDialog.vsacApiKeyTextBox)
        helper.enabledWithTimeout(importMeasureDialog.vsacApiKeyTextBox)
        helper.enterText(importMeasureDialog.vsacApiKeyTextBox, VsacApiKey)

        //click load button to import the measure
        helper.enabled(importMeasureDialog.importLoadBtn)
        helper.click(importMeasureDialog.importLoadBtn)

    })

})