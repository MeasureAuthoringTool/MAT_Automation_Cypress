import * as helper from '../../support/helpers'
import * as measureDetails from '../../pom/BonnieQDM/WI/MeasureDetails'

export const validateDefinition = (control, definition) => {

   //Find the control and validate that it matches the expected value
  cy.get(control).should('contain', definition)



}