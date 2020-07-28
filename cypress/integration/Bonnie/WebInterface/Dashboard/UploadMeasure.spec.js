import * as helper from '../../../../support/helpers'
import * as bonnieLogin from '../../../../support/Bonnie/BonnieLoginLogout'
import * as dashboard from '../../../../pom/Bonnie/WI/Dashboard'
import * as importMeasureDialog from '../../../../pom/Bonnie/WI/ImportMeasureDialog'



describe('Dashboard Upload Dialog', () => {
    before('Login', () => {

        bonnieLogin.login()

    })
    after('Log Out', () => {

        bonnieLogin.logout()

    })

    it('Upload Dialog is displayed', () => {
        let VSAC_user = Cypress.env('MAT_UMLS_USERNAME')
        let VSAC_pass = Cypress.env('MAT_UMLS_PASSWORD')

        helper.enabledWithTimeout(dashboard.uploadBtn)
        cy.get(dashboard.uploadBtn).click()

        //upload the file to the modal
        helper.visibleWithTimeout(importMeasureDialog.importMeasureDialog)
        const fileToUpload = "createQdmProportionMeasure159551_v6_0_Artifacts.zip"
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

        //Split the file name at the underscore, as the measure name cuts out the underscore values
        let measureName = fileToUpload.split('_')[0]

        //assert the measure was uploaded and displays on the list of measures
        cy.get(importMeasureDialog.measureNameDiv).should('contain',measureName)

        //click the measured to delete it
        cy.get(importMeasureDialog.measureNameDiv).contains(measureName).click()

        //click the cog wheel for the measure details
        cy.get(importMeasureDialog.measureDetailsParentDiv).children(importMeasureDialog.measureDetailsCogWheel).click()

        //click the "inverse danger" button
        cy.get(importMeasureDialog.inverseDangerButton).click()

        //click the delete button to delete the measure
        cy.get(importMeasureDialog.deleteMeasureButton).click()

        //wait for home page to display again
        helper.enabledWithTimeout(dashboard.uploadBtn)

        //assert the measure was deleted
        cy.get(importMeasureDialog.measureNameDiv).should('not.contain', measureName)


    })

})