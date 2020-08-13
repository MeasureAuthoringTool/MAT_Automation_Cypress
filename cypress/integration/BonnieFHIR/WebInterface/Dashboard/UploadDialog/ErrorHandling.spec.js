import * as helper from '../../../../../support/helpers'
import * as bonnieLogin from '../../../../../support/BonnieFHIR/BonnieLoginLogout'
import * as dashboard from '../../../../../pom/BonnieFHIR/WI/Dashboard'
import * as importMeasureDialog from '../../../../../pom/BonnieFHIR/WI/ImportMeasureDialog'



describe('Dashboard: Upload Dialog: Error handling', () => {
    before('Login', () => {

        bonnieLogin.login()

    })
    after('Log Out', () => {

        bonnieLogin.logout()

    })

    it('Missing FHIR Version from Measure Library CQL(package json in the zip file)', () => {

        let VSAC_user = Cypress.env('MAT_UMLS_USERNAME')
        let VSAC_pass = Cypress.env('MAT_UMLS_PASSWORD')

        helper.enabledWithTimeout(dashboard.uploadBtn)
        cy.get(dashboard.uploadBtn).click()

        //upload the file to the modal
        helper.visibleWithTimeout(importMeasureDialog.importMeasureDialog)
        const fileToUpload = "MissingFhirVersionfromMeasureCqlLibrary.zip"
        helper.enabledWithTimeout(importMeasureDialog.fileImportInput)
        cy.get(importMeasureDialog.fileImportInput).attachFile(fileToUpload)

        //wait for VSAC username field to display for the user, and enter username
        helper.visibleWithTimeout(importMeasureDialog.vsacUserField)
        helper.enabledWithTimeout(importMeasureDialog.vsacUserField)
        helper.enterText(importMeasureDialog.vsacUserField, VSAC_user)

        //enter password
        helper.enterText(importMeasureDialog.vsacPasswordField, VSAC_pass)

        //click load button to import the measure
        helper.enabled(importMeasureDialog.importLoadBtn)
        helper.click(importMeasureDialog.importLoadBtn)

        //In Progress

    })

})