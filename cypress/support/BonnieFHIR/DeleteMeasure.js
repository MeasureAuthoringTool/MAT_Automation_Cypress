import * as helper from '../../support/helpers'
import * as dashboard from '../../pom/BonnieQDM/WI/Dashboard'
import * as measureDetails from '../../pom/BonnieQDM/WI/MeasureDetails'

export const DeleteMeasureFromBonnie = (measureName) => {

  //Ensure the measure details page has loaded
  helper.verifySpinnerAppearsAndDissappears()
  helper.visibleWithTimeout(measureDetails.measureDetailsParentDiv)

  //Click the Cog Wheel on the Measure Details Title
  cy.get(measureDetails.measureDetailsParentDiv).children(measureDetails.measureDetailsCogWheel).click()

  //Click the red circle "Inverse Danger" button
  helper.verifySpinnerAppearsAndDissappears()
  //helper.click(measureDetails.inverseDangerButton, multiple: true)
  cy.get(measureDetails.inverseDangerButton).first().click()

  //Click Delete Button
  helper.verifySpinnerAppearsAndDissappears()
  helper.click(measureDetails.deleteMeasureButton)

  //Validate that the measure was in fact deleted and does not show on the dashboard
  cy.get(dashboard.measureNameDiv).contains(measureName).should('not.exist')



}