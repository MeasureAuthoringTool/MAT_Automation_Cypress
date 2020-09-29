import * as helper from '../../support/helpers'
import * as dashboard from '../../pom/BonnieQDM/WI/Dashboard'
import * as measureDetails from '../../pom/BonnieQDM/WI/MeasureDetails'

export const DeleteMeasureFromBonnie = (measureName) => {

  //Find the correct measure name and click the link
  cy.get(dashboard.measureNameDiv).contains(measureName).click()

  //Ensure the measure details page has loaded
  helper.verifySpinnerAppearsAndDissappears()
  helper.visibleWithTimeout(measureDetails.measureDetailsParentDiv)

  //Click the Cog Wheel on the Measure Details Title
  cy.get(measureDetails.measureDetailsParentDiv).children(measureDetails.measureDetailsCogWheel).click()

  //Click the red circle "Inverse Danger" button
  helper.click(measureDetails.inverseDangerButton)

  //Click Delete Button
  helper.click(measureDetails.deleteMeasureButton)

  //Validate that the measure was in fact deleted and does not show on the dashboard
  cy.get(dashboard.measureNameDiv).contains(measureName).should('not.exist')



}