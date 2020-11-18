import * as measureDetailsPage from '../../pom/BonnieFHIR/WI/MeasureDetailsPage'
import * as homePage from '../../pom/BonnieFHIR/WI/Homepage'

export const DeleteMeasure = (measureName) => {
  cy.log('deleteMeasure')
  measureDetailsPage.navigateToHomeMeasurePage()

  cy.log('navigateToMeasureDetails')
  cy.get(homePage.measure).contains(measureName).click()
  cy.get(measureDetailsPage.measureDetailsTitle).should('contain.text', 'Measure details')
  cy.log('navigateToMeasureDetails - done')

  measureDetailsPage.clickDeleteMeasure()
  cy.log('deleteMeasure - done')
}
