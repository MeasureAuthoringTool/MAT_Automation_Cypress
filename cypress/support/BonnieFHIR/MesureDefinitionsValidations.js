import * as helper from '../../support/helpers'
import * as measureDetails from '../../pom/BonnieQDM/WI/MeasureDetails'

export const validateDefinition = (control, definition) => {

  //validate measure details page is displayed and visible
  helper.enabledWithTimeout(measureDetails.measureDetailsParentDiv)

  //Find the control and validate that it matches the expected value
  cy.get(control).should('contain', definition)


}