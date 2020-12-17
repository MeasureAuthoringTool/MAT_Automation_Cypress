import * as helper from '../../../../support/helpers'
import * as bonnieLogin from '../../../../support/BonnieFHIR/BonnieLoginLogout'
import * as measureDetailsPage from '../../../../pom/BonnieFHIR/WI/MeasureDetailsPage'
import * as deletePatient from '../../../../support/BonnieFHIR/DeletePatient'
import * as deleteMeasure from '../../../../support/BonnieFHIR/DeleteMeasure'
import * as testPatientPage from '../../../../pom/BonnieFHIR/WI/TestPatientPage'
import * as bonnieUploadMeasure from '../../../../support/BonnieFHIR/BonnieUploadMeasure'
import * as dashboard from '../../../../pom/BonnieFHIR/WI/Dashboard'

const continuousVariableMeasureName = 'Cms111testingMeasure'
const continuousVariableMeasureFileToUpload = 'Cms111testingMeasurev603-Artifacts.zip'

const cohortMeasureName = 'EXM529'
const cohortMeasureFileToUpload = 'EXM529v603-Artifacts.zip'

const proportionMultiGroupMeasureName = 'SBTESTCMS347'
const proportionMultiGroupMeasureFileToUpload = 'SBTESTCMS347v603-Artifacts.zip'

const lastNameSuffix = new Date().getTime()
const distinctLastName = 'President' + lastNameSuffix

describe('Measure Upload', () => {

  before('Login', () => {

    bonnieLogin.login()

  })
  after('Log Out', () => {

    bonnieLogin.logout()

  })

  it('Continuous Variable Measure: Successful Upload', () => {

    bonnieUploadMeasure.UploadMeasureToBonnie(continuousVariableMeasureFileToUpload,false)

    cy.get(measureDetailsPage.patientListing).then((patientListing) => {
      const initialPatientCount = parseInt(patientListing.text())
      cy.log('patient count was:' + initialPatientCount)

      dashboard.navigateToMeasureDetails(continuousVariableMeasureName)

      measureDetailsPage.clickAddPatient()
      testPatientPage.enterPatientCharacteristics(distinctLastName)

      testPatientPage.clickSavePatient()

      helper.visibleWithTimeout(measureDetailsPage.measurePageNavigationBtn)

      deletePatient.DeletePatient(distinctLastName)
      deletePatient.VerifyPatientRemoved(initialPatientCount)
    })
    helper.visibleWithTimeout(measureDetailsPage.measurePageNavigationBtn)

    deleteMeasure.DeleteMeasure(continuousVariableMeasureName)

    helper.visibleWithTimeout(measureDetailsPage.measurePageNavigationBtn)

  })

  it('Cohort Measure: Successful Upload', () => {

    bonnieUploadMeasure.UploadMeasureToBonnie(cohortMeasureFileToUpload,false, true)

    cy.get(measureDetailsPage.patientListing).then((patientListing) => {
      const initialPatientCount = parseInt(patientListing.text())
      cy.log('patient count was:' + initialPatientCount)

      dashboard.navigateToMeasureDetails(cohortMeasureName)

      measureDetailsPage.clickAddPatient()
      testPatientPage.enterPatientCharacteristics(distinctLastName)

      testPatientPage.clickSavePatient()

      helper.visibleWithTimeout(measureDetailsPage.measurePageNavigationBtn)

      deletePatient.DeletePatient(distinctLastName)
      deletePatient.VerifyPatientRemoved(initialPatientCount)
    })
    helper.visibleWithTimeout(measureDetailsPage.measurePageNavigationBtn)

    deleteMeasure.DeleteMeasure(cohortMeasureName)

    helper.visibleWithTimeout(measureDetailsPage.measurePageNavigationBtn)
  })

  it('Multi-Group Proportion Measure: Successful Upload', () => {
    helper.visibleWithTimeout(measureDetailsPage.measurePageNavigationBtn)

    bonnieUploadMeasure.UploadMeasureToBonnie(proportionMultiGroupMeasureFileToUpload,false, true)

    cy.get(measureDetailsPage.patientListing).then((patientListing) => {
      const initialPatientCount = parseInt(patientListing.text())
      cy.log('patient count was:' + initialPatientCount)

      dashboard.navigateToMeasureDetails(proportionMultiGroupMeasureName)

      measureDetailsPage.clickAddPatient()
      testPatientPage.enterPatientCharacteristics(distinctLastName)

      testPatientPage.clickSavePatient()

      helper.visibleWithTimeout(measureDetailsPage.measurePageNavigationBtn)

      deletePatient.DeletePatient(distinctLastName)
      deletePatient.VerifyPatientRemoved(initialPatientCount)
    })
    helper.visibleWithTimeout(measureDetailsPage.measurePageNavigationBtn)

    deleteMeasure.DeleteMeasure(proportionMultiGroupMeasureName)

    helper.visibleWithTimeout(measureDetailsPage.measurePageNavigationBtn)
  })
})

