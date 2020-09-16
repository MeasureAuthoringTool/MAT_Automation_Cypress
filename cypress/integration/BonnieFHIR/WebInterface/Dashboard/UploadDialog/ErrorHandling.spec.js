import * as helper from '../../../../../support/helpers'
import * as bonnieLogin from '../../../../../support/BonnieFHIR/BonnieLoginLogout'
import * as dashboard from '../../../../../pom/BonnieFHIR/WI/Dashboard'
import * as importMeasureDialog from '../../../../../pom/BonnieFHIR/WI/ImportMeasureDialog'

let VsacApiKey = Cypress.env('VSAC_API_KEY')


describe('Dashboard: Upload Dialog: Error handling', () => {
    before('Login', () => {

        bonnieLogin.login()

    })
    after('Log Out', () => {

        bonnieLogin.logout()

    })

    it('Missing FHIR Version from Measure Library CQL(package json in the zip file)', () => {

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

        helper.visibleWithTimeout(importMeasureDialog.errorDialog)

        //verify the error message
        cy.get(importMeasureDialog.modalBody).contains('The measure could not be loaded.')
        cy.get(importMeasureDialog.modalBody).contains('Bonnie has encountered an error while trying to load the measure.')
        cy.get(importMeasureDialog.modalBody).contains('If the problem continues, please report the issue on the BONNIE Issue Tracker.')

        cy.get(importMeasureDialog.modalCloseBtn).click()

        helper.notVisibleWithTimeout(importMeasureDialog.modalBody)

        cy.get(importMeasureDialog.measureNameDiv).should('not.contain','MissingFHIRDeclarationCQL')

    })

})