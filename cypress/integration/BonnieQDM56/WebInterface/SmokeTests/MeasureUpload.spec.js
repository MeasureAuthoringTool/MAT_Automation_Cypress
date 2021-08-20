import * as bonnieLogin from '../../../../support/Bonnie/BonnieLoginLogout'
import * as measureDetailsPage from '../../../../pom/BonnieFHIR/WI/MeasureDetailsPage'
import * as bonnieUploadMeasure from '../../../../support/Bonnie/BonnieUploadMeasure'

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

    measureName = 'Risk-Standardized Inpatient Respiratory Depression Rate Following Elective ' +
      'Primary Total Hip Arthroplasty (THA) And/Or Total Knee Arthroplasty (TKA) eCQM'
    measureFileToUpload = 'QDM56/RSIRDR-eCQM-v1-1-QDM-5-6.zip'

    bonnieUploadMeasure.UploadMeasureToBonnie(measureFileToUpload, false)
    measureDetailsPage.navigateToMeasureDetails(measureName)

  })

  it('Verify successful upload Proportion Episode of Care Measure', () => {

    measureName = 'Elective Delivery'
    measureFileToUpload = 'QDM56/ePC-01-Elective Delivery-v10-1-001-QDM-5-6.zip'

    bonnieUploadMeasure.UploadMeasureToBonnie(measureFileToUpload, 'episode')
    measureDetailsPage.navigateToMeasureDetails(measureName)

  })

})
