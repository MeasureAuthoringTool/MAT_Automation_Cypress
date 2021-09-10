import * as bonnieLogin from '../../../../support/Bonnie/BonnieLoginLogout'
import * as measureDetailsPage from '../../../../pom/BonnieFHIR/WI/MeasureDetailsPage'
import * as bonnieUploadMeasure from '../../../../support/Bonnie/BonnieUploadMeasure'
import * as testPatientPage from '../../../../pom/BonnieFHIR/WI/TestPatientPage'

const lastNameSuffix = new Date().getTime()
const distinctLastName = 'President' + lastNameSuffix
let measureName = ''
let measureFileToUpload = ''

describe('Smoke Test: Measure Upload', () => {

  beforeEach('Login', () => {

    bonnieLogin.login()

  })
  afterEach('Log Out', () => {

    bonnieLogin.logout()

  })

  it('Verify successful upload Proportion Patient Based Measure', () => {

    measureName = 'AIS_HEDIS_MY2020_MY2021'
    measureFileToUpload = 'QDM55/AIS-v2-0-QDM-5-5.zip'

    bonnieUploadMeasure.UploadMeasureToBonnie(measureFileToUpload, false)
    measureDetailsPage.navigateToMeasureDetails(measureName)

    cy.log('Measure upload successful')
    cy.pause()
    measureDetailsPage.clickAddPatient()
    testPatientPage.enterPatientCharacteristics(distinctLastName)
cy.pause()
  })

  it('Verify successful upload Proportion Episode of Care Measure', () => {

    measureName = 'Venous Thromboembolism Prophylaxis'
    measureFileToUpload = 'QDM55/CMS108-v10-2-QDM-5-5.zip'

    bonnieUploadMeasure.UploadMeasureToBonnie(measureFileToUpload, 'episode')
    measureDetailsPage.navigateToMeasureDetails(measureName)

  })

})
