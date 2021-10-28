//Bonnie Dashboard element definitions

//navigation bar

import * as homePage from '../../BonnieFHIR/WI/Homepage'
import * as measureDetailsPage from '../../BonnieFHIR/WI/MeasureDetailsPage'

export const navigationBar = '[role="navigation"]'
export const signoutBtn = '.nav > :nth-child(5)'
export const measureNameDiv = '.measure-title'
export const uploadBtn = '.dashboard-heading > .measure-col > > .btn'

export const navigateToMeasureDetails = (measureName) => {
  cy.log('navigateToMeasureDetails')
  cy.get(homePage.measure).contains(measureName).click()
  cy.wait(1000)
  cy.get(measureDetailsPage.measureDetailsTitle).should('contain.text', 'Measure details')
  cy.log('navigateToMeasureDetails - done')
}