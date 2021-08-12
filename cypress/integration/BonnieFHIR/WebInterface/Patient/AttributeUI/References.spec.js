import * as bonnieLogin from '../../../../../support/Bonnie/BonnieLoginLogout'
import * as bonnieUploadMeasure from '../../../../../support/Bonnie/BonnieFHIR/BonnieUploadMeasure'
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
    cy.log('Reference')
    cy.get(testPatientPage.attributeNameSelect).select('diagnosis.condition')
    cy.get(testPatientPage.attributeTypeSelect).select('Reference')
    cy.get(testPatientPage.attributeReferenceTypeSelect).select('Condition')
    cy.get(testPatientPage.referenceValueSetDirectRefSelect).select('Dead')
    cy.get(testPatientPage.addWidgetBtn).eq(0).click()
    cy.log('Reference - done')

    // Verify the Encounter's data element is collapsed
    cy.get('.patient-criteria .criteria-details').should('be.visible')
    cy.get('.patient-criteria .criteria-details').should('contain.text', 'Encounter: Emergency Department Visit')

    // Verify the Condition's data element is added
    cy.get('.patient-criteria form').should('contain.text', 'Clinical Summary: Condition: Dead')

    // Collapse condition
    testPatientPage.toggleDataElement(1)

    // Expand Encounter
    testPatientPage.toggleDataElement(0)

    //Add Existing Resources
    cy.log('Reference')
    cy.get(testPatientPage.attributeNameSelect).select('diagnosis.condition')
    cy.get(testPatientPage.attributeTypeSelect).select('Reference')
    cy.get(testPatientPage.attributeReferenceTypeSelect).select('Existing Resources')
    cy.get(testPatientPage.existingResourcesDropdown).eq(1).invoke('val').then((val)=>{
      cy.get(testPatientPage.existingResorcesSelect).select(val)
    })
    cy.get(testPatientPage.addWidgetBtn).eq(0).click()

    // Add Procedure
    cy.log('Reference')
    cy.get(testPatientPage.attributeNameSelect).select('diagnosis.condition')
    cy.get(testPatientPage.attributeTypeSelect).select('Reference')
    cy.get(testPatientPage.attributeReferenceTypeSelect).select('Procedure')
    cy.get(testPatientPage.referenceValueSetDirectRefSelect).select('Admit Inpatient')
    cy.get(testPatientPage.addWidgetBtn).eq(0).click()
    cy.log('Reference - done')

    // Verify the Encounter's data element is collapsed
    cy.get('.patient-criteria .criteria-details').should('be.visible')
    cy.get('.patient-criteria .criteria-details').should('contain.text', 'Encounter: Emergency Department Visit')

    // Verify the Condition's data element is added
    cy.get('.patient-criteria form').should('contain.text', 'Clinical Summary: Procedure: Admit Inpatient')

    // Collapse condition
    testPatientPage.toggleDataElement(2)

    // Expand Encounter
    testPatientPage.toggleDataElement(0)

    //Add Existing Resources
    cy.log('Reference')
    cy.get(testPatientPage.attributeNameSelect).select('diagnosis.condition')
    cy.get(testPatientPage.attributeTypeSelect).select('Reference')
    cy.get(testPatientPage.attributeReferenceTypeSelect).select('Existing Resources')
    cy.get(testPatientPage.existingResourcesDropdown).eq(2).invoke('val').then((val)=>{
      cy.get(testPatientPage.existingResorcesSelect).select(val)
    })
    cy.get(testPatientPage.addWidgetBtn).eq(0).click()

    //Update Procedure

    cy.log('Reference')
    cy.get(testPatientPage.attributeNameSelect).select('diagnosis.condition')
    cy.get(testPatientPage.attributeTypeSelect).select('Reference')
    cy.get(testPatientPage.attributeReferenceTypeSelect).select('Procedure')
    cy.get(testPatientPage.referenceValueSetDirectRefSelect).select('active')
    cy.get(testPatientPage.addWidgetBtn).eq(0).click()
    cy.log('Reference - done')

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

    //Verify Procedure attribute is removed from Encounter
    cy.get(testPatientPage.exsistingAttribute).should('not.exist')

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
    cy.log('Reference')
    cy.get(testPatientPage.attributeNameSelect).select('diagnosis.condition')
    cy.get(testPatientPage.attributeTypeSelect).select('Reference')
    cy.get(testPatientPage.attributeReferenceTypeSelect).select('Existing Resources')
    cy.get(testPatientPage.existingResourcesDropdown).eq(1).invoke('val').then((val)=>{
      cy.get(testPatientPage.existingResorcesSelect).select(val)
    })
    cy.get(testPatientPage.addWidgetBtn).eq(0).click()

    // Verify there is a reference to the Procedure resource
    cy.get(testPatientPage.exsistingAttribute).contains("diagnosis.condition: Condition/")

    // Drag and drop Procedure from the left data elements list
    testPatientPage.dragAndDrop('clinical summary', 'Clinical Summary: Procedure: PCI', '9')

    // Collapse Procedure
    testPatientPage.toggleDataElement(2)

    // Expand Encounter
    testPatientPage.toggleDataElement(1)

    //Add Existing Resources for Procedure
    cy.log('Reference')
    cy.get(testPatientPage.attributeNameSelect).select('diagnosis.condition')
    cy.get(testPatientPage.attributeTypeSelect).select('Reference')
    cy.get(testPatientPage.attributeReferenceTypeSelect).select('Existing Resources')
    cy.get(testPatientPage.existingResourcesDropdown).eq(2).invoke('val').then((val)=>{
      cy.get(testPatientPage.existingResorcesSelect).select(val)
    })
    cy.get(testPatientPage.addWidgetBtn).eq(0).click()

    // Verify there is a reference to the Procedure resource
    cy.get(testPatientPage.exsistingAttribute).contains("diagnosis.condition: Procedure/")

    // Click cancel button for patient to proceed back to measure details
    helper.click(testPatientPage.cancelBtn)

    helper.visibleWithTimeout(measureDetailsPage.measurePageNavigationBtn)

  })
})