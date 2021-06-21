import * as bonnieLogin from '../../../../support/Bonnie/BonnieFHIR/BonnieLoginLogout'
import * as measureDetailsPage from '../../../../pom/BonnieFHIR/WI/MeasureDetailsPage'
import * as testPatientPage from '../../../../pom/BonnieFHIR/WI/TestPatientPage'
import * as bonnieUploadMeasure from '../../../../support/Bonnie/BonnieFHIR/BonnieUploadMeasure'

const measureName = 'TESTMEASURESDE001'
const measureFileToUpload = 'TESTMEASURESDE001-v0-0-001-FHIR-4-0-1.zip'

const lastNameSuffix = new Date().getTime()
const distinctLastName = 'President' + lastNameSuffix

const expectedRedColor = 'rgb(166, 59, 18)'
const expectedGreenColor = 'rgb(32, 116, 76)'
const expectedBlueColor = 'rgb(0, 78, 130)'

describe('Execution: Supplemental Data Elements', () => {

  before('Login', () => {

    bonnieLogin.login()
    bonnieUploadMeasure.UploadMeasureToBonnie(measureFileToUpload, false, false, true)
    measureDetailsPage.navigateToMeasureDetails(measureName)

  })
  after('Log Out', () => {

    bonnieLogin.logout()

  })

  it('Verify simple Execution and coverage ', () => {

    measureDetailsPage.clickAddPatient()
    testPatientPage.enterPatientCharacteristics(distinctLastName)

    cy.get(testPatientPage.calcResultSDEPayer).should('have.css', 'color', expectedRedColor)

    testPatientPage.dragAndDrop('financial support', 'Financial Support: Coverage: Payer', 0)

    cy.get(testPatientPage.calcResultSDEEthnicity).should('have.css', 'color', expectedGreenColor)
    cy.get(testPatientPage.calcResultSDEPayer).should('have.css', 'color', expectedGreenColor)
    cy.get(testPatientPage.calcResultSDERace).should('have.css', 'color', expectedGreenColor)
    cy.get(testPatientPage.calcResultSDESex).should('have.css', 'color', expectedGreenColor)

    testPatientPage.clickSavePatient()

    cy.get(measureDetailsPage.coverageNumber).invoke('val')
      .then(value => {
        expect(value).to.eql('87')
      })

    cy.get(measureDetailsPage.coverageResultSDEEthnicity).should('have.css', 'color', expectedBlueColor)
    cy.get(measureDetailsPage.coverageResultSDEPayer).should('have.css', 'color', expectedBlueColor)
    cy.get(measureDetailsPage.coverageResultSDERace).should('have.css', 'color', expectedBlueColor)
    cy.get(measureDetailsPage.coverageResultSDESex).should('have.css', 'color', expectedBlueColor)

  })
})
