import * as helper from '../../support/helpers'
import * as measureDetails from '../../pom/BonnieQDM/WI/MeasureDetails'
import * as testPatientPage from '../../pom/BonnieFHIR/WI/TestPatientPage'

export const DeletePatientFromMeasure = (PatientName) => {

  //Ensure the measure details page has loaded
  helper.verifySpinnerAppearsAndDissappears()
  helper.visibleWithTimeout(measureDetails.measureDetailsParentDiv)

  //Click the arrow next to the patient to be deleted, in this case the second patient listed
  cy.get(testPatientPage.measureDetailsPatientExpandArrowBtn).eq(1).trigger('click')

  //Click the red circle "Inverse Danger" button
  cy.get(testPatientPage.patientinverseDangerButton).eq(2).trigger('click')

  //Click Delete Button
  cy.get(testPatientPage.patientdeleteButton).eq(1).trigger('click')

}
