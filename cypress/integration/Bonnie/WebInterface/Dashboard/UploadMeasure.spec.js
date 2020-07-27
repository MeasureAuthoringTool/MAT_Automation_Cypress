import * as helper from '../../../../support/helpers'
import * as bonnieLogin from '../../../../support/Bonnie/BonnieLoginLogout'
import * as dashboard from '../../../../pom/Bonnie/WI/Dashboard'
import * as importMeasureDialog from '../../../../pom/Bonnie/WI/ImportMeasureDialog'
import 'cypress-file-upload'


describe('Dashboard Upload Dialog', () => {
    before('Login', () => {

        bonnieLogin.login()

    })
    after('Log Out', () => {

        bonnieLogin.logout()

    })

    it('Upload Dialog is displayed', () => {

        helper.enabledWithTimeout(dashboard.uploadBtn)

        cy.get(dashboard.uploadBtn).click()

        helper.visibleWithTimeout(importMeasureDialog.importMeasureDialog)

        //upload the file to the modal
        //cy.uploadFile('createQdmProportionMeasure159551_v6_0_Artifacts.zip', importMeasureDialog.importMeasureDialog.fileImportInput)
        const fileToUpload = "createQdmProportionMeasure159551_v6_0_Artifacts.zip"
        cy.get(importMeasureDialog.fileImportInput).attachFile(fileToUpload)

        //wait for VSAC username field to display for the user
        //helper.visibleWithTimeout(importMeasureDialog.vsacUserField)
        helper.enterText(importMeasureDialog.vsacUserField, importMeasureDialog.vsacUser)
        helper.enterText(importMeasureDialog.vsacPasswordField, importMeasureDialog.vsacPassword)

        //cy.get(importMeasureDialog.closeBtn).click()
        let loadBtn = cy.get(importMeasureDialog.importLoadBtn)
        helper.enabled(loadBtn)
        helper.click(loadBtn)

        //helper.notVisibleWithTimeout(importMeasureDialog.importMeasureDialog)


    })

})