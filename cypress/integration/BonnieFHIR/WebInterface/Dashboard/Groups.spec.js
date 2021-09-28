import * as testPatientPage from '../../../../pom/BonnieFHIR/WI/TestPatientPage'
import * as bonnieLogin from '../../../../support/Bonnie/BonnieLoginLogout'
import * as helper from '../../../../support/helpers'
import * as importMeasureDialog from '../../../../pom/BonnieFHIR/WI/ImportMeasureDialog'
import * as dashboard from '../../../../pom/BonnieFHIR/WI/Dashboard'
import * as bonnieUploadMeasure from '../../../../support/Bonnie/BonnieUploadMeasure'
import * as homePage from '../../../../pom/Bonnie/WI/Homepage'
import * as measureDetailsPage from '../../../../pom/BonnieFHIR/WI/MeasureDetailsPage'


const measureName = 'FHIRmeasureCMS347'
const measureFileToUpload = 'FHIR/FHIRmeasureCMS347-v0-0-003-FHIR-4-0-1.zip'
const groupName = 'TestGroup'
const mongoURL = Cypress.env('DEVmongoURL')
const sslCert = Cypress.env('MONGO_SSLCERT')
const userEmail = Cypress.env('DEV_EMAIL')

describe('Dashboard: Admin: Groups', () => {
  beforeEach('Login', () => {
    bonnieLogin.login()
  })
  afterEach('Log Out', () => {
    bonnieLogin.logout()

    // remove Test Group
    cy.task('bonnieDeleteGroups', {groupName: groupName, mongoURL: mongoURL, sslCert: sslCert})
      .then(results => {
        cy.log('bonnieDeleteGroups Task finished')
      })
  })
  it('Create New Group, Add user to Group, switch to that Group', () => {

    //Create Group
    cy.get(testPatientPage.adminTab).click()

    helper.visibleWithTimeout(testPatientPage.groupsTab)
    cy.get(testPatientPage.groupsTab).click()
    cy.get(testPatientPage.newGroupTab).click({ force: true })
    cy.get(testPatientPage.nameDialogBox).type(groupName)
    cy.get(testPatientPage.saveNewGroup).click()

    helper.visibleWithTimeout(testPatientPage.groupsTab)
    cy.get(testPatientPage.closeDialogBox).click()
    cy.log('New Group Created sucessfully')

    // Add test user to the group
    cy.reload()

    clickEditForGroup(groupName)

    helper.visibleWithTimeout(testPatientPage.addUserEmailToGroup)
    helper.enterText(testPatientPage.addUserEmailToGroup, userEmail, { delay: 50 })
    cy.get(testPatientPage.addUserBtn).click()
    cy.get(testPatientPage.saveGroupBtn).click()
    cy.get(testPatientPage.suucessDialogBox).click()
    cy.log(' User added to the group ')

    // Switch to the new group
    cy.reload()

    helper.visibleWithTimeout(testPatientPage.groupsDropdown)
    cy.get(testPatientPage.groupsDropdown).click()
    cy.get(testPatientPage.switchGroup).click()
    helper.visibleWithTimeout(importMeasureDialog.importMeasureDialog)
    helper.visibleWithTimeout(importMeasureDialog.closeBtn)
    cy.get(importMeasureDialog.closeBtn).click()

    cy.get(homePage.accountText).contains(groupName)

    //Upload Measure to Group
    helper.visibleWithTimeout(dashboard.uploadBtn)
    helper.enabledWithTimeout(dashboard.uploadBtn)

    bonnieUploadMeasure.UploadMeasureToBonnie(measureFileToUpload)
    measureDetailsPage.navigateToMeasureDetails(measureName)

  })
})

function clickEditForGroup(groupName) {
  cy.get('.group-name').contains(groupName).siblings().eq(2).click()
}
