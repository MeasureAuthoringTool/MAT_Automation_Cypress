import * as bonnieLogin from '../../../../../support/Bonnie/BonnieLoginLogout'
import * as bonnieUploadMeasure from '../../../../../support/Bonnie/BonnieUploadMeasure'
import * as dashboard from '../../../../../pom/BonnieFHIR/WI/Dashboard'
import * as measureDetailsPage from '../../../../../pom/BonnieFHIR/WI/MeasureDetailsPage'
import * as testPatientPage from '../../../../../pom/BonnieFHIR/WI/TestPatientPage'
import * as helper from '../../../../../support/helpers'

// Can be any measure with Encounters
const measureNamewithEncounter = "Cms111testingMeasure"
const measureFileNamewithEncounter = "FHIR/Cms111testingMeasure-v0-0-004-FHIR-4-0-1.zip"

const lastNameSuffix = new Date().getTime()
const distinctLastName = "President" + lastNameSuffix

const measureNameWithConditionandProcedure = "SBTESTCMS347"
const measureFileNameWithConditionandProcedure = "FHIR/SBTESTCMS347-v0-0-008-FHIR-4-0-1 (1).zip"

describe("Measure with references", () => {
  beforeEach("Login", () => {
    bonnieLogin.login()
  })

  afterEach("Log Out", () => {
    bonnieLogin.logout()
  })

  it("can add Existing Resource with condition Reference to Encounter", () => {
    bonnieUploadMeasure.UploadMeasureToBonnie(
      measureFileNamewithEncounter,
      false
    )

    dashboard.navigateToMeasureDetails(measureNamewithEncounter)

    measureDetailsPage.clickAddPatient()
    testPatientPage.enterPatientCharacteristics(distinctLastName)

    // Drag and drop Encounter from the left data elements list
    testPatientPage.dragAndDrop('management', 'Management: Encounter: Emergency Department Visit', '3')

    // Add Condition
    cy.log('Add Condition')
    cy.get(testPatientPage.attributeNameSelect).select('diagnosis')
    cy.get(testPatientPage.diagnosisCondition).select('Condition')
    cy.get(testPatientPage.referenceValueSetDirectRefSelect).select('Dead')
    cy.get(testPatientPage.addWidgetBtn).eq(0).click()
    // Collapse condition
    testPatientPage.toggleDataElement(1)

    // Expand Encounter
    testPatientPage.toggleDataElement(0)
    cy.log('Condition added successfully')

    // Verify the Encounter's data element is collapsed
    cy.get('.patient-criteria .criteria-details').should('be.visible')
    cy.get('.patient-criteria .criteria-details').should('contain.text', 'Encounter: Emergency Department Visit')

    // Verify the Condition's data element is added
    cy.get('.patient-criteria form').should('contain.text', 'diagnosis: condition: Condition/dead')

    //Add Existing Resources to Condition
    cy.log('Add Existing Resource to condition')
    cy.get(testPatientPage.attributeNameSelect).select('diagnosis')
    cy.get(testPatientPage.attributeReferenceTypeSelect).select('Existing Resources')
    cy.get(testPatientPage.existingResourcesDropdown).eq(1).invoke('val').then((val)=>{
      cy.get(testPatientPage.existingResorcesSelect).eq(0).select(val)
    })
    cy.get(testPatientPage.addWidgetBtn).eq(0).click()
    cy.log('Existing Resource added to condition successfully')

    // Add Procedure
    cy.log('Add procedure')
    cy.get(testPatientPage.attributeNameSelect).select('diagnosis')
    cy.get(testPatientPage.diagnosisCondition).select('Procedure')
    cy.get(testPatientPage.referenceValueSetDirectRefSelect).select('Admit Inpatient')
    cy.get(testPatientPage.addWidgetBtn).eq(0).click()
    cy.log('Procedure added successfully')

    // Collapse Procedure
    testPatientPage.toggleDataElement(2)

    // Expand Encounter
    testPatientPage.toggleDataElement(0)

    // Verify the Encounter's data element is collapsed
    cy.get('.patient-criteria .criteria-details').should('be.visible')
    cy.get('.patient-criteria .criteria-details').should('contain.text', 'Encounter: Emergency Department Visit')

    // Verify the Procedure's data element is added
    cy.get('.existing-values > :nth-child(3)').should('contain.text', 'diagnosis: condition: Procedure/admit-inpatient')

    //Add Existing Resources to Procedure
    cy.log('Add Existing resource to Procedure')
    cy.get(testPatientPage.attributeNameSelect).select('diagnosis')
    cy.get(testPatientPage.attributeReferenceTypeSelect).select('Existing Resources')
    cy.get(testPatientPage.existingResourcesDropdown).eq(2).invoke('val').then((val)=>{
      cy.get(testPatientPage.existingResorcesSelect).eq(0).select(val)
    })
    cy.get(testPatientPage.addWidgetBtn).eq(0).click()
    cy.log('Existing Resource added to Procedure successfully')

    //Update Procedure

    cy.log('Update Procedure')
    cy.get(testPatientPage.attributeNameSelect).select('diagnosis')
    cy.get(testPatientPage.attributeReferenceTypeSelect).select('Procedure')
    cy.get(testPatientPage.referenceValueSetDirectRefSelect).select('active')
    cy.get(testPatientPage.addWidgetBtn).eq(0).click()
    cy.log('Procedure Updated Successfully')

    // Verify the Encounter's data element is collapsed
    cy.get('.patient-criteria .criteria-details').should('be.visible')
    cy.get('.patient-criteria .criteria-details').should('contain.text', 'Encounter: Emergency Department Visit')

    // Collapse Procedure
    testPatientPage.toggleDataElement(3)

    // Expand Encounter
    testPatientPage.toggleDataElement(0)

    // Expand Procedure and Delete
    testPatientPage.toggleDataElement(3)
    helper.click(testPatientPage.patientinverseDangerButton)
    helper.click(testPatientPage.attributeDeleteButton)
    cy.log('Procedure deleted successfully')

    // Click cancel button for patient to proceed back to measure details
    helper.click(testPatientPage.cancelBtn)

    helper.visibleWithTimeout(measureDetailsPage.measurePageNavigationBtn)

  })

  it("can add Existing Resource with condition reference to Encounter by adding condition from Elements ", () => {
    bonnieUploadMeasure.UploadMeasureToBonnie(
      measureFileNameWithConditionandProcedure,
      false
    )

    dashboard.navigateToMeasureDetails(measureNameWithConditionandProcedure)

    measureDetailsPage.clickAddPatient()
    testPatientPage.enterPatientCharacteristics(distinctLastName)

    // Drag and drop Condition from the left data elements list
     testPatientPage.dragAndDrop('clinical summary', 'Clinical Summary: Condition: Myocardial Infarction', '4')

    // Drag and drop Encounter from the left data elements list
    testPatientPage.dragAndDrop('management', 'Management: Encounter: Office Visit', '28')

    //Add Existing Resources for Condition
    cy.log('Add Existing resource to Condition')
    cy.get(testPatientPage.attributeNameSelect).select('diagnosis')
    cy.get(testPatientPage.attributeReferenceTypeSelect).select('Existing Resources')
    cy.get(testPatientPage.existingResourcesDropdown).eq(1).invoke('val').then((val)=>{
      cy.get(testPatientPage.existingResorcesSelect).eq(0).select(val)
    })
    cy.get(testPatientPage.addWidgetBtn).eq(0).click()

    // Verify there is a reference to the Procedure resource
    cy.get(testPatientPage.exsistingAttribute).contains("diagnosis: condition: Condition/myocardial-infarction")
    cy.log('Existing Resource added to Condition successfully')

    // Drag and drop Procedure from the left data elements list
    testPatientPage.dragAndDrop('clinical summary', 'Clinical Summary: Procedure: PCI', '9')

    // Collapse Procedure
    testPatientPage.toggleDataElement(2)

    // Expand Encounter
    testPatientPage.toggleDataElement(1)

    //Add Existing Resources for Procedure
    cy.log('Add Existing resource to Procedure')
    cy.get(testPatientPage.attributeNameSelect).select('diagnosis')
    //cy.get(testPatientPage.attributeTypeSelect).select('Reference')
    cy.get(testPatientPage.attributeReferenceTypeSelect).select('Existing Resources')
    cy.get(testPatientPage.existingResourcesDropdown).eq(2).invoke('val').then((val)=>{
      cy.get(testPatientPage.existingResorcesSelect).eq(0).select(val)
    })
    cy.get(testPatientPage.addWidgetBtn).eq(0).click()

    // Verify there is a reference to the Procedure resource
    cy.get(testPatientPage.exsistingAttribute).contains("diagnosis: condition: Procedure/")
    cy.log('Existing Resource added to Procedure successfully')
    // Click cancel button for patient to proceed back to measure details
    helper.click(testPatientPage.cancelBtn)

    helper.visibleWithTimeout(measureDetailsPage.measurePageNavigationBtn)

  })
})