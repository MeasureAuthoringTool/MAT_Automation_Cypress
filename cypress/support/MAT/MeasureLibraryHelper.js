import * as helper from '../helpers'
import * as gridRowActions from './GridRowActions'
import * as measureLibrary from '../../pom/MAT/WI/MeasureLibrary'
import * as measureComposer from '../../pom/MAT/WI/MeasureComposer'

export function deleteMeasure (measureName) {

  helper.enabledWithTimeout(measureLibrary.searchInputBox)
  helper.enterText(measureLibrary.searchInputBox, measureName)
  cy.get(measureLibrary.searchBtn).click()

  helper.verifySpinnerAppearsAndDissappears()
  helper.visibleWithTimeout(measureLibrary.row1MeasureSearch)

  cy.get('#MeasureSearchCellTable > :nth-child(3)').each(element => {
    if (cy.wrap(element).contains(measureName)) {
      gridRowActions.doubleClickRow(element)
    } else {
      cy.log(measureName + ' is not available')
    }
  })

  //cy.get('.active > a').click()
  cy.wait(500)
  helper.enabledWithTimeout(measureComposer.deleteMeasureBtn)
  cy.get(measureComposer.deleteMeasureBtn).click()
  helper.enabledWithTimeout(measureComposer.deleteConfirmationInputBox)
  cy.get(measureComposer.deleteConfirmationInputBox).click()
  cy.get(measureComposer.deleteConfirmationInputBox).clear()
  cy.wait(500)
  helper.enterText(measureComposer.deleteConfirmationInputBox, 'DELETE')
  helper.enabledWithTimeout(measureComposer.deleteLibraryForeverBtn)
  cy.get(measureComposer.deleteLibraryForeverBtn).click()

}

export function convertMeasureToFHIRAndVerify(qdmCqlLibraryName) {
  // Select the versioned measure and convert it to FHIR
  cy.get(measureLibrary.convertToFhirMeasureSearchBtn).click()

  helper.verifySpinnerAppearsAndDissappears()
  helper.verifySpinnerAppearsAndDissappears()
  helper.verifySpinnerAppearsAndDissappears()

  // assert if new draft FHIR measure is created
  helper.visibleWithTimeout(measureLibrary.row2MeasureSearch)
  cy.get(measureLibrary.row2MeasureSearchName).should('contain.text', qdmCqlLibraryName + 'FHIR')
  cy.get(measureLibrary.row2MeasureSearch).should('contain.text', 'FHIR / CQL')
  cy.get(measureLibrary.row2MeasureSearch).should('contain.text', 'Draft v0.0.000')
}
