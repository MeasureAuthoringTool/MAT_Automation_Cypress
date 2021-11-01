import * as helper from '../../../../support/helpers'
import * as measureDetailsPage from '../../../../pom/BonnieQDM/WI/MeasureDetailsPage'
import * as bonnieUploadMeasure from '../../../../support/Bonnie/BonnieUploadMeasure'
import * as dashboard from '../../../../pom/BonnieQDM/WI/Dashboard'
import * as testPatientPage from '../../../../pom/BonnieQDM/WI/TestPatientPage'
import * as bonnieLogin from '../../../../support/Bonnie/BonnieLoginLogout'
import * as deletePatient from '../../../../support/Bonnie/BonnieQDM/DeletePatient'
import * as deleteMeasure from '../../../../support/Bonnie/BonnieFHIR/DeleteMeasure'
import * as importMeasureDialog from '../../../../pom/BonnieQDM/WI/ImportMeasureDialog'

const proportionMeasureName = 'Risk-Standardized Inpatient Respiratory Depression Rate Following Elective ' +
  'Primary Total Hip Arthroplasty (THA) And/Or Total Knee Arthroplasty (TKA) eCQM'
const proportionMeasureFileToUpload = 'QDM56/RSIRDR-eCQM-v1-1-QDM-5-6.zip'

const cohortMeasureName = 'YA TEST Cohort'
const cohortMeasureFileToUpload = 'QDM56/YA TEST Cohort-v0-0-002-QDM-5-6.zip'

const continuousVariableMeasureName = 'CreateQDMContinuousVariableMeasure1633625918533'
const continuousVariableMeasureFileToUpload = 'QDM56/QDMContinuousVariableMeasu-v0-0-001-QDM-5-6 .zip'

const ratioMeasureName = 'QDMRatioPatientBased1634840588136'
const ratioMeasureFileToUpload = 'QDM56/QDMRatioPatientBased163484058813-v0-0-001-QDM-5-6.zip'

const measureWithMultiplePopulationsMeasureName = 'Appropriate Treatment for Upper Respiratory Infection (URI)'
const measureWithMultiplePopulationsFileToUpload = 'QDM56/CMS154-v10-0-002-QDM-5-6.zip'

const lastNameSuffix = new Date().getTime()
const distinctLastName = 'President' + lastNameSuffix

describe('Different Measure Types Upload', () => {
  beforeEach('Login', () => {
    bonnieLogin.login()
  })

  afterEach('Log Out', () => {
    bonnieLogin.logout()
  })

  it('Proportion Measure: Successful Upload', () => {
    bonnieUploadMeasure.UploadMeasureToBonnie(proportionMeasureFileToUpload, false)

    // First navigate to measure, then count the patients within the measure
    dashboard.navigateToMeasureDetails(proportionMeasureName)

    cy.get(measureDetailsPage.patientListing).then((patientListing) => {
      const initialPatientCount = parseInt(patientListing.text(), 10)
      cy.log('patient count was:' + initialPatientCount)

      measureDetailsPage.clickAddPatient()
      testPatientPage.enterPatientCharacteristics(distinctLastName)

      testPatientPage.clickSavePatient()
      helper.visibleWithTimeout(measureDetailsPage.measurePageNavigationBtn)

      deletePatient.DeletePatient(distinctLastName)
      deletePatient.VerifyPatientRemoved(initialPatientCount)

      helper.visibleWithTimeout(measureDetailsPage.measurePageNavigationBtn)
    })
  })

  it('Cohort Measure: Successful Upload', () => {
    bonnieUploadMeasure.UploadMeasureToBonnie(cohortMeasureFileToUpload, false)

    dashboard.navigateToMeasureDetails(cohortMeasureName)

    cy.get(measureDetailsPage.patientListing).then((patientListing) => {
      const initialPatientCount = parseInt(patientListing.text(), 10)
      cy.log('patient count was:' + initialPatientCount)

      measureDetailsPage.clickAddPatient()
      testPatientPage.enterPatientCharacteristics(distinctLastName)

      testPatientPage.clickSavePatient()
      helper.visibleWithTimeout(measureDetailsPage.measurePageNavigationBtn)

      deletePatient.DeletePatient(distinctLastName)
      deletePatient.VerifyPatientRemoved(initialPatientCount)

      helper.visibleWithTimeout(measureDetailsPage.measurePageNavigationBtn)
    })
  })

  it('Continuous Variable Measure: Successful Upload', () => {
    bonnieUploadMeasure.UploadMeasureToBonnie(continuousVariableMeasureFileToUpload, false)

    dashboard.navigateToMeasureDetails(continuousVariableMeasureName)

    cy.get(measureDetailsPage.patientListing).then((patientListing) => {
      const initialPatientCount = parseInt(patientListing.text(), 10)
      cy.log('patient count was:' + initialPatientCount)

      measureDetailsPage.clickAddPatient()
      testPatientPage.enterPatientCharacteristics(distinctLastName)

      testPatientPage.clickSavePatient()

      helper.visibleWithTimeout(measureDetailsPage.measurePageNavigationBtn)

      deletePatient.DeletePatient(distinctLastName)
      deletePatient.VerifyPatientRemoved(initialPatientCount)
    })
    helper.visibleWithTimeout(measureDetailsPage.measurePageNavigationBtn)
  })

  it('Ratio Measure: Successful Upload', () => {
    bonnieUploadMeasure.UploadMeasureToBonnie(ratioMeasureFileToUpload, false)

    dashboard.navigateToMeasureDetails(ratioMeasureName)

    cy.get(measureDetailsPage.patientListing).then((patientListing) => {
      const initialPatientCount = parseInt(patientListing.text(), 10)
      cy.log('patient count was:' + initialPatientCount)

      measureDetailsPage.clickAddPatient()
      testPatientPage.enterPatientCharacteristics(distinctLastName)

      testPatientPage.clickSavePatient()
      helper.visibleWithTimeout(measureDetailsPage.measurePageNavigationBtn)

      deletePatient.DeletePatient(distinctLastName)
      deletePatient.VerifyPatientRemoved(initialPatientCount)

      helper.visibleWithTimeout(measureDetailsPage.measurePageNavigationBtn)
    })
  })

  it('can update an existing measure', () => {
    // Can be any measure
    const measureFileName = continuousVariableMeasureFileToUpload
    const measureName = continuousVariableMeasureName

    bonnieUploadMeasure.UploadMeasureToBonnie(
      measureFileName,
      false
    )

    dashboard.navigateToMeasureDetails(measureName)

    bonnieUploadMeasure.UpdateMeasure(measureFileName)

    helper.visibleWithTimeout(measureDetailsPage.measurePageNavigationBtn)

    deleteMeasure.DeleteMeasure(measureName)

    helper.visibleWithTimeout(measureDetailsPage.measurePageNavigationBtn)

    helper.visibleWithTimeout(importMeasureDialog.importMeasureDialog)

    cy.get(importMeasureDialog.closeBtn).click()

    helper.notVisibleWithTimeout(importMeasureDialog.importMeasureDialog)
  })

  it('Uploads a measure with multiple populations and stratifications', () => {
    bonnieUploadMeasure.UploadMeasureToBonnie(measureWithMultiplePopulationsFileToUpload, false)

    dashboard.navigateToMeasureDetails(measureWithMultiplePopulationsMeasureName)

    cy.get(measureDetailsPage.patientListing).then((patientListing) => {
      const initialPatientCount = parseInt(patientListing.text(), 10)
      cy.log('patient count was:' + initialPatientCount)

      measureDetailsPage.clickAddPatient()
      testPatientPage.enterPatientCharacteristics(distinctLastName)

      // Verify populations are present
      cy.get('div.patient-builder div.expected-values li > a').should(
        'contain.text',
        'Population Criteria Section'
      )
      cy.get('div.patient-builder div.expected-values li > a').should(
        'contain.text',
        'PopSet1 Stratification 1'
      )
      cy.get('div.patient-builder div.expected-values li > a').should(
        'contain.text',
        'PopSet1 Stratification 2'
      )
      cy.get('div.patient-builder div.expected-values li > a').should(
        'contain.text',
        'PopSet1 Stratification 3'
      )

      // ---  Population Criteria Section ---
      // Check Population Criteria Section (it is active by default)
      cy.log('Population Criteria Section')
      cy.get('.expected-values ul > li:first > a').should(
        'contain.text',
        'Population Criteria Section'
      )
      checkPopulations()
      cy.log('Population Criteria Section - done')

      //  --- PopSet1 Stratification 1 ---
      cy.log('Popset1 Stratification1')
      cy.get('.expected-values ul > li:nth-child(2) > a')
        .contains('PopSet1 Stratification 1')
        .click()
      checkPopulationsAndStratification()
      cy.log('Popset1 Stratification1 - done')

      //  --- PopSet2 Stratification2 ---
      cy.log('Popset1 Stratification2')
      cy.get('.expected-values ul > li:nth-child(3) > a')
        .contains('PopSet1 Stratification 2')
        .click()
      checkPopulationsAndStratification()
      cy.log('Popset1 Stratification2 - done')

      //  --- PopSet3 Stratification 2 ---
      cy.log('Popset1 Stratification3')
      cy.get('.expected-values ul > li:nth-child(4) > a')
        .contains('PopSet1 Stratification 3')
        .click()
      checkPopulationsAndStratification()
      cy.log('Popset1 Stratification3 - done')

      testPatientPage.clickSavePatient()

      helper.visibleWithTimeout(measureDetailsPage.measurePageNavigationBtn)
    })
  })

  function checkPopulations () {
    cy.get('div.active input[name=IPP][type=checkbox]').should(
      'not.be.checked'
    )
    cy.get('div.active input[name=DENOM][type=checkbox]').should(
      'not.be.checked'
    )
    cy.get('div.active input[name=DENEX][type=checkbox]').should(
      'not.be.checked'
    )
    cy.get('div.active input[name=NUMER][type=checkbox]').should(
      'not.be.checked'
    )
    cy.get('div.active input[name=DENEX][type=checkbox]').check({
      force: true
    })
    cy.get('div.active input[name=IPP][type=checkbox]').should('be.checked')
    cy.get('div.active input[name=DENOM][type=checkbox]').should(
      'be.checked'
    )
  }

  function checkPopulationsAndStratification () {
    cy.get('div.active input[name=STRAT][type=checkbox]').should(
      'not.be.checked'
    )
    cy.get('div.active input[name=IPP][type=checkbox]').should(
      'not.be.checked'
    )
    cy.get('div.active input[name=DENOM][type=checkbox]').should(
      'not.be.checked'
    )
    cy.get('div.active input[name=DENEX][type=checkbox]').should(
      'not.be.checked'
    )
    cy.get('div.active input[name=NUMER][type=checkbox]').should(
      'not.be.checked'
    )
    cy.get('div.active input[name=DENEX][type=checkbox]').check({
      force: true
    })
    cy.get('div.active input[name=STRAT][type=checkbox]').should('be.checked')
    cy.get('div.active input[name=IPP][type=checkbox]').should('be.checked')
    cy.get('div.active input[name=DENOM][type=checkbox]').should('be.checked')
  }
})
