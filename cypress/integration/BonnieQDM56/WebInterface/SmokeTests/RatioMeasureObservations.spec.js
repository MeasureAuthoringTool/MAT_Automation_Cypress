import * as bonnieLogin from '../../../../support/Bonnie/BonnieLoginLogout'
import * as measureDetailsPage from '../../../../pom/BonnieQDM/WI/MeasureDetailsPage'
import * as bonnieUploadMeasure from '../../../../support/Bonnie/BonnieUploadMeasure'
import * as testPatientPage from '../../../../pom/BonnieQDM/WI/TestPatientPage'
import * as deletePatient from '../../../../support/Bonnie/BonnieQDM/DeletePatient'
import * as homePage from '../../../../pom/BonnieQDM/WI/Homepage'

let measureName = ''
let measureFileToUpload = ''

const lastNameSuffix = new Date().getTime()
const distinctLastName = 'President' + lastNameSuffix

describe('Smoke Test: Measure Observations for Ratio Measure Patient', () => {
  beforeEach('Login', () => {
    bonnieLogin.login()
  })
  after('Log Out', () => {
    bonnieLogin.logout()
  })

  it('Verify Measure Observations for Ratio Patient on List and Edit Test Case pages', () => {
    measureName = 'Hospital Harm - Severe Hyperglycemia'
    measureFileToUpload = 'QDM56/CMS871-v3-0-000-QDM-5-6.zip'

    bonnieUploadMeasure.UploadMeasureToBonnie(measureFileToUpload, 'episode')
    measureDetailsPage.navigateToMeasureDetails(measureName)

    // Add Patient to the Episode of care Measure
    cy.get(measureDetailsPage.patientListing).then((patientListing) => {
      const initialPatientCount = parseInt(patientListing.text(), 10)
      cy.log('patient count was:' + initialPatientCount)
      measureDetailsPage.clickAddPatient()
      testPatientPage.enterPatientCharacteristics(distinctLastName)

      // Add Denominator, Numerator and verify Denominator and Numerator Observations are added
      cy.get('[name="IPP"]').clear().type(3)
      cy.get('[name="DENOM"]').clear().type(3)
      cy.get('[class="tab-content expected-value"]').click()
      cy.get('[id="DENOM_OBSERV_0"]').should('exist')
      cy.get('[id="DENOM_OBSERV_1"]').should('exist')
      cy.get('[id="DENOM_OBSERV_2"]').should('exist')
      cy.get('[name="NUMER"]').clear().type(3)
      cy.get('[class="tab-content expected-value"]').click()
      cy.get('[id="NUMER_OBSERV_0"]').should('exist')
      cy.get('[id="NUMER_OBSERV_1"]').should('exist')
      cy.get('[id="NUMER_OBSERV_2"]').should('exist')

      testPatientPage.clickSavePatient()

      // Verify Observations on Test case List Page
      cy.get('.close > .fa').click()
      cy.get('.panel > .panel-body').should('contain.text', 'DENOM OBSERV_1' && 'DENOM OBSERV_2' && 'DENOM OBSERV_3' &&
        'NUMER OBSERV_1' && 'NUMER OBSERV_2' && 'NUMER OBSERV_3')

      // Verify Observations on Edit test case Page
      cy.get('[class="fa fa-pencil"]').click()
      cy.get('[class="tab-pane active"]').should('contain.text', 'DENOM OBSERV_1' && 'DENOM OBSERV_2' && 'DENOM OBSERV_3' &&
        'NUMER OBSERV_1' && 'NUMER OBSERV_2' && 'NUMER OBSERV_3')

      measureDetailsPage.navigateToHomeMeasurePage()
      navigateToMeasureDetails(measureName)
      deletePatient.DeletePatient(distinctLastName)
    })
  })

  function navigateToMeasureDetails (measureName) {
    cy.log('navigateToMeasureDetails')
    cy.get(homePage.measure).contains(measureName).click({ force: true })
    cy.get(measureDetailsPage.measureDetailsTitle).should('contain.text', 'Measure details')
    cy.log('navigateToMeasureDetails - done')
  }
})
