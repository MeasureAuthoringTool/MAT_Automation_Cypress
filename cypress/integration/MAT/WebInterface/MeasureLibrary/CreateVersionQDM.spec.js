import * as helper from '../../../../support/helpers'
import * as measurelibrary from '../../../../pom/MAT/WI/MeasureLibrary'
import * as oktaLogin from '../../../../support/oktaLogin'
import * as measureComposer from '../../../../pom/MAT/WI/MeasureComposer'
import * as dataCreation from '../../../../support/MAT/MeasureAndCQLLibraryCreation'
import * as gridRowActions from '../../../../support/MAT/GridRowActions'

let name = ''
let name2 = ''

describe('Measure Library: Create Version', () => {
  beforeEach('Login', () => {
    oktaLogin.login()
  })
  afterEach('Log Out', () => {
    helper.logout()
  })

  it('Create Major Version with Successful Package, Proportion Measure', () => {

    name = dataCreation.createQDMProportionMeasure()

    helper.verifySpinnerAppearsAndDissappears()

    helper.enabledWithTimeout(measurelibrary.searchInputBox)
    helper.enterText(measurelibrary.searchInputBox, name)
    cy.get(measurelibrary.searchBtn).click()

    helper.verifySpinnerAppearsAndDissappears()

    gridRowActions.selectRow(measurelibrary.row1MeasureSearch)

    cy.get(measurelibrary.createVersionMeasureSearchBtn).click()

    cy.get(measurelibrary.majorVersionTypeRadio).click()
    cy.get(measurelibrary.packageAndVersion).click()

    helper.verifySpinnerAppearsAndDissappears()

    helper.waitToHaveText(measurelibrary.warningMessage, ' ' + name + ' has been successfully packaged and v1.0.000 has been successfully created.')

  })

  it('Create Major Version with Successful Package, Proportion Measure, Unused Included CQL Library', () => {

    name2 = dataCreation.createQDMProportionMeasure()

    helper.verifySpinnerAppearsAndDissappears()

    helper.enabledWithTimeout(measurelibrary.searchInputBox)
    helper.enterText(measurelibrary.searchInputBox, name2)
    cy.get(measurelibrary.searchBtn).click()

    helper.verifySpinnerAppearsAndDissappears()

    gridRowActions.doubleClickRow(measurelibrary.row1MeasureSearch)

    cy.get(measureComposer.cqlWorkspace).click()

    helper.verifySpinnerAppearsAndDissappears()

    //removing the only definition ref for global CQL Library
    cy.get(measureComposer.definition).click()
    helper.waitToContainText(measureComposer.cqlWorkspaceTitleGlobal2, 'Definition')
    cy.get(measureComposer.definitionLeftList).select('ED Visit')
    cy.get(measureComposer.definitionLeftListOptions).eq(2).dblclick()
    helper.verifySpinnerAppearsAndDissappears()
    helper.verifySpinnerAppearsAndDissappears()
    cy.get(measureComposer.definitionDeleteBtn).click()
    cy.get(measureComposer.deleteConfirmationYes).click()

    helper.verifySpinnerAppearsAndDissappears()

    cy.get(measurelibrary.measureLibraryTab).click()

    helper.verifySpinnerAppearsAndDissappears()

    helper.visibleWithTimeout(measurelibrary.row1RecentActivity)
    gridRowActions.selectRow(measurelibrary.row1RecentActivity)

    cy.get(measurelibrary.createVersionRecentActivityBtn).click()
    cy.get(measurelibrary.majorVersionTypeRadio).click()
    cy.get(measurelibrary.packageAndVersion).click()

    helper.verifySpinnerAppearsAndDissappears()
    helper.verifySpinnerAppearsAndDissappears()

    helper.waitToContainText(measurelibrary.warningMessageText, 'You have included libraries that are unused. In order to version ' + name2 + ', these must be removed. Select Continue to have the MAT remove these included libraries or Cancel to stop the version process.')

    cy.get(measurelibrary.continueBtn).click()

    helper.verifySpinnerAppearsAndDissappears()

    helper.waitToHaveText(measurelibrary.warningMessage, ' ' + name2 + ' has been successfully packaged and v1.0.000 has been successfully created.')

  })
})



