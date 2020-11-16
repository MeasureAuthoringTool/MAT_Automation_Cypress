import * as helper from '../../../../../support/helpers'
import * as bonnieLogin from '../../../../../support/BonnieFHIR/BonnieLoginLogout'
import * as importMeasureDialog from '../../../../../pom/BonnieFHIR/WI/ImportMeasureDialog'
import * as bonnieUploadMeasure from '../../../../../support/BonnieFHIR/BonnieUploadMeasure'



describe('Dashboard: Upload Dialog: Error handling', () => {
    before('Login', () => {

        bonnieLogin.login()

    })
    after('Log Out', () => {

        bonnieLogin.logout()

    })
    it('QDM Measure Package: Verify unable to upload package', () => {

        bonnieUploadMeasure.UploadMeasureToBonnie('CMS105_v5_8_Artifacts.zip',false)

        helper.visibleWithTimeout(importMeasureDialog.errorDialog)

        //verify the error message

        cy.get(importMeasureDialog.errorDialog).invoke('text').then((text) => {
            expect(text).to.include('The uploaded measure bundle does not contain the proper FHIR JSON file.' +
              'Please re-package and re-export your FHIR based measure from the MAT and try again.')
            expect(text).to.include('If the problem continues, please report the issue on the BONNIE Issue Tracker.')
        })

        cy.get(importMeasureDialog.modalCloseBtn).click()

        helper.notVisibleWithTimeout(importMeasureDialog.errorDialog)

        cy.get(importMeasureDialog.measureNameDiv).should('not.contain','CMS105_v5_8_Artifacts')

    })
})