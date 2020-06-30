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

        helper.enabledWithTimeout(dashboard.uploadBtn)

        cy.get(dashboard.uploadBtn).click()

        helper.visibleWithTimeout(importMeasureDialog.importMeasureDialog)

        cy.get(importMeasureDialog.closeBtn).click()

        helper.notVisibleWithTimeout(importMeasureDialog.importMeasureDialog)
    })

})