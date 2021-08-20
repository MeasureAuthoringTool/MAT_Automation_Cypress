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

    measureName = 'Appropriate Treatment for Patients with Stage I (T1c) through III HER2 Positive Breast Cancer'
    measureFileToUpload = 'QDM55/AppropriateTxHER2PositiveBrCa-v1-3-QDM-5-5.zip'

    bonnieUploadMeasure.UploadMeasureToBonnie(measureFileToUpload, false)
    measureDetailsPage.navigateToMeasureDetails(measureName)

  })

  it('Verify successful upload Proportion Episode of Care Measure', () => {

    measureName = 'Venous Thromboembolism Prophylaxis'
    measureFileToUpload = 'QDM55/CMS108-v10-2-QDM-5-5.zip'

    bonnieUploadMeasure.UploadMeasureToBonnie(measureFileToUpload, 'episode')
    measureDetailsPage.navigateToMeasureDetails(measureName)

  })

})
