import * as bonnieLogin from '../../../../support/Bonnie/BonnieLoginLogout'
import * as bonnieUploadMeasure from '../../../../support/Bonnie/BonnieUploadMeasure'
import * as dashboard from '../../../../pom/BonnieQDM/WI/Dashboard'
import * as deleteMeasure from '../../../../support/Bonnie/BonnieFHIR/DeleteMeasure'
import * as helper from '../../../../support/helpers'
import * as measureDetailsPage from '../../../../pom/BonnieQDM/WI/MeasureDetailsPage'
import * as importMeasureDialog from '../../../../pom/BonnieQDM/WI/ImportMeasureDialog'

const measureName = 'CreateQDMContinuousVariableMeasure1633625918533'
const measureFileName = 'QDM56/QDMContinuousVariableMeasu-v0-0-001-QDM-5-6 .zip'

describe('Delete Measure', () => {
  beforeEach('Login', () => {
    bonnieLogin.login()
  })

  afterEach('Log Out', () => {
    bonnieLogin.logout()
  })

  it('Delete Measure', () => {
    bonnieUploadMeasure.UploadMeasureToBonnie(
      measureFileName,
      false
    )

    dashboard.navigateToMeasureDetails(measureName)

    deleteMeasure.DeleteMeasure(measureName)

    helper.visibleWithTimeout(measureDetailsPage.measurePageNavigationBtn)

    helper.visibleWithTimeout(importMeasureDialog.importMeasureDialog)

    cy.get(importMeasureDialog.closeBtn).click()

    helper.notVisibleWithTimeout(importMeasureDialog.importMeasureDialog)
  })
})
