import * as bonnieLogin from '../../../../support/BonnieQDM/BonnieLoginLogout'
import * as bonnieUploadMeasire from '../../../../support/BonnieQDM/BonnieUploadMeasure'
import * as deleteMeasure from '../../../../support/BonnieQDM/DeleteMeasure'

const fileToUpload = 'MRP_v5_7_Artifacts.zip'

//NAme of measure as it should appear on bonnie dashboard.
//NOTE: This will need to be changed if the above fileToUpload is changed
const measureName = '2020 Medication Reconciliation Post-Discharge 1.0'

describe('Dashboard: Upload Dialog: Error handling', () => {
  before('Login', () => {

    bonnieLogin.login()

  })
  after('Delete measure and Log Out', () => {
    deleteMeasure.DeleteMeasureFromBonnie(measureName)
    bonnieLogin.logout()

  })

  it('Upload QDM file into Bonnie QDM using exported zip file', () => {

    //Upload file to Bonnie
    bonnieUploadMeasire.UploadMeasureToBonnie(fileToUpload)

  })

})
