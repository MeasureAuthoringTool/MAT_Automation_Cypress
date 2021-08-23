import * as testPatientPage from '../../../../pom/BonnieFHIR/WI/TestPatientPage'
import * as bonnieLogin from '../../../../support/Bonnie/BonnieLoginLogout'
import * as helper from '../../../../support/helpers'
import * as importMeasureDialog from '../../../../pom/BonnieFHIR/WI/ImportMeasureDialog'
import * as dashboard from '../../../../pom/BonnieFHIR/WI/Dashboard'
import * as bonnieUploadMeasure from '../../../../support/Bonnie/BonnieUploadMeasure'
import * as homePage from '../../../../pom/BonnieFHIR/WI/Homepage'
import * as measureDetailsPage from '../../../../pom/BonnieFHIR/WI/MeasureDetailsPage'

const measureName = 'FHIRmeasureCMS347'
const measureFileToUpload = 'FHIR/FHIRmeasureCMS347-v0-0-003-FHIR-4-0-1.zip'

describe('Dashboard: Admin: Groups', () => {
  beforeEach('Login', () => {
    bonnieLogin.login()
  })
  afterEach('Log Out', () => {
    bonnieLogin.logout()
  })

  it('Switch Groups', () => {
    // Create New Group
    cy.get(testPatientPage.adminTab).click()
    cy.wait(1000)
    cy.get(testPatientPage.groupsTab).click()
    cy.get(testPatientPage.newGroupTab).click({ force: true })
    cy.get(testPatientPage.nameDialogBox).type('TestGroup')
    cy.get(testPatientPage.saveNewGroup).click()
    cy.wait(1000)
    cy.get(testPatientPage.closeDialogBox).click()
    cy.log('New Group Created')

    // Add test user to the group
    cy.reload()
    cy.get(testPatientPage.editGroup).click()
    cy.wait(1000)
    cy.get(testPatientPage.addUserEmailToGroup).type('matdevuser1@protonmail.com')
    cy.get(testPatientPage.addUserBtn).click()
    cy.get(testPatientPage.saveGroupBtn).click()
    cy.get(testPatientPage.suucessDialogBox).click()
    cy.log(' User added to the group ')

    // Switch to the new group
    cy.reload()
    cy.get(testPatientPage.groupsDropdown).click()
    cy.get(testPatientPage.switchGroup).click()
    helper.visibleWithTimeout(importMeasureDialog.importMeasureDialog)
    cy.clearCookie('_bonnie_session')
    helper.visibleWithTimeout(importMeasureDialog.closeBtn)
    cy.get(importMeasureDialog.closeBtn).click()
    helper.visibleWithTimeout(dashboard.uploadBtn)
    helper.enabledWithTimeout(dashboard.uploadBtn)
    bonnieUploadMeasure.UploadMeasureToBonnie(measureFileToUpload)
    navigateToMeasureDetails(measureName)
  })
})

function navigateToMeasureDetails (measureName) {
  cy.log('navigateToMeasureDetails')
  cy.get(homePage.measure).contains(measureName).click()
  // cy.wait(1000)
  cy.get(measureDetailsPage.measureDetailsTitle).should('contain.text', 'Measure details')
  cy.log('navigateToMeasureDetails - done')
}
