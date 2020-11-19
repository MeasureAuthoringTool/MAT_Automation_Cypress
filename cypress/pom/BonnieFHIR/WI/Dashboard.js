//Bonnie Dashboard element definitions

//navigation bar
import * as homePage from './Homepage'
import * as measureDetailsPage from './MeasureDetailsPage'

export const navigationBar = '[role="navigation"]'
export const signOutBtn = 'a[href$=sign_out]'
export const measureNameDiv = 'div.measure-title'
export const uploadBtn = 'button[data-call-method="importMeasure"]'

export const navigateToMeasureDetails = (measureName) => {
  cy.log('navigateToMeasureDetails')
  cy.get(homePage.measure).contains(measureName).click()
  // cy.wait(1000)
  cy.get(measureDetailsPage.measureDetailsTitle).should('contain.text', 'Measure details')
  cy.log('navigateToMeasureDetails - done')
}