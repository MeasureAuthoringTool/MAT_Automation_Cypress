import * as helper from '../../../../support/helpers'
import * as measurelibrary from '../../../../pom/MAT/WI/MeasureLibrary'
import * as oktaLogin from '../../../../support/oktaLogin'
import * as measureComposer from "../../../../pom/MAT/WI/MeasureComposer";

let name = ''

describe('Create Version', () => {
    before('Login', () => {

        oktaLogin.login()

    })
    beforeEach('Preserve Cookies', () => {
        helper.preserveCookies()
    })
    after('Log Out', () => {
        helper.logout()
    })
    it('Create Major Version with Successful Package, Proportion Measure', () => {

        name = helper.createQDMProportionMeasure()

        helper.enterText(measurelibrary.searchInputBox,name)
        cy.get(measurelibrary.searchBtn).click()

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(measurelibrary.row1MeasureSearch).click()

        cy.get(measurelibrary.createVersionMeasureSearchBtn).click()

        cy.get(measurelibrary.majorVersionTypeRadio).click()
        cy.get(measurelibrary.packageAndVersion).click()

        helper.verifySpinnerAppearsAndDissappears()

        helper.waitToHaveText(measurelibrary.warningMessage, ' ' + name + ' has been successfully packaged and v1.0.000 has been successfully created.')

    })

    it('Create Major Version with Successful Package, Proportion Measure, Unused Included CQL Library', () => {

        name = helper.createQDMProportionMeasure()

        helper.enterText(measurelibrary.searchInputBox,name)
        cy.get(measurelibrary.searchBtn).click()

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(measurelibrary.row1MeasureSearch).dblclick()

        cy.get(measureComposer.cqlWorkspace).click()

        helper.verifySpinnerAppearsAndDissappears()

        //removing the only definition ref for global CQL Library
        cy.get(measureComposer.definition).click()
        helper.waitToContainText(measureComposer.cqlWorkspaceTitleGlobal2,'Definition')
        cy.get(measureComposer.definitionLeftList).select('ED Visit')
        cy.get(measureComposer.definitionLeftListOptions).eq(2).dblclick()
        helper.verifySpinnerAppearsAndDissappears()
        cy.get(measureComposer.definitionDeleteBtn).click()
        cy.get(measureComposer.deleteConfirmationYes).click()

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(measurelibrary.measureLibraryTab).click()

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(measurelibrary.row1RecentActivity).click()

        cy.get(measurelibrary.createVersionRecentActivityBtn).click()
        cy.get(measurelibrary.majorVersionTypeRadio).click()
        cy.get(measurelibrary.packageAndVersion).click()

        helper.waitToContainText(measurelibrary.warningMessageText,'You have included libraries that are unused. In order to version '+ name +
            ', these must be removed. Select Continue to have the MAT remove these included libraries or Cancel to stop the version process.')

        cy.get(measurelibrary.continueBtn).click()

        helper.verifySpinnerAppearsAndDissappears()

        helper.waitToHaveText(measurelibrary.warningMessage, ' ' + name + ' has been successfully packaged and v1.0.000 has been successfully created.')

    })
})



