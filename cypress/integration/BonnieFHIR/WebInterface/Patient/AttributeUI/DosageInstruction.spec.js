import * as helper from '../../../../../support/helpers'
import * as bonnieLogin from '../../../../../support/Bonnie/BonnieLoginLogout'
import * as measureDetailsPage from '../../../../../pom/BonnieFHIR/WI/MeasureDetailsPage'
import * as testPatientPage from '../../../../../pom/BonnieFHIR/WI/TestPatientPage'
import * as bonnieUploadMeasure from '../../../../../support/Bonnie/BonnieUploadMeasure'

const measureName = 'Anti-depressant Medication ManagementFHIR'
const measureFileToUpload = 'FHIR/CMS128FHIR-v0-0-003-FHIR-4-0-1.zip'

const lastNameSuffix = new Date().getTime()
const distinctLastName = 'President' + lastNameSuffix

describe('Attribute UI: dosageInstruction: Dosage', () => {

  beforeEach('Login', () => {

    bonnieLogin.login()
    bonnieUploadMeasure.UploadMeasureToBonnie(measureFileToUpload, false)
    measureDetailsPage.navigateToMeasureDetails(measureName)

  })
  afterEach('Log Out', () => {

    bonnieLogin.logout()

  })

  it('Verify the entry and data retention for dosageInstruction: Dosage attribute', () => {

    cy.get(measureDetailsPage.patientListing).then((patientListing) => {
      const initialPatientCount = parseInt(patientListing.text(), 10)
      cy.log('patient count was:' + initialPatientCount)

      measureDetailsPage.clickAddPatient()
      testPatientPage.enterPatientCharacteristics(distinctLastName)


      //add Observation Element
      testPatientPage.dragAndDrop('medications', 'MedicationDispense: Antidepressant Medication', 17)

      //verify adding SampledData
      dosageInstructionDosageAttribute()

      testPatientPage.clickSavePatient()

      //Click the arrow Btn to show the patient actions
      helper.click(testPatientPage.measureDetailsPatientArrowBtn)

      //Click the Edit button For the patient
      helper.click(testPatientPage.measureDetailsPatientEditBtn)

      //open the patient history criteria, this will only work with one patient history criteria in the list, otherwise you will need to index
      cy.get(testPatientPage.criteriaArrowToggle).click()

      //verify attribute is still viewable in Patient History
      cy.get(testPatientPage.exsistingAttribute).invoke('text').then((text) => {
        expect(text).to.include('dosageInstruction: sequence: 900 | text: string | additionalInstruction: ' +
          '[SNOMEDCT: 311504000] | patientInstruction: string | asNeeded: true | site: [ICD10CM: F33.0] | route: ' +
          '[RXNORM: 104837] | method: [SNOMEDCT: 32485007] | doseAndRate.type: [DoseAndRateType: ordered] | ' +
          'doseAndRate.dose: 1.1 - 5.5 G | doseAndRate.rate: 2.0 \'t\' | maxDosePerPeriod: 5.5 \'g\' : 6.6 \'l\' | ' +
          'maxDosePerAdministration: 7.7 \'m\' | maxDosePerLifetime: 8.8 \'d\'')
      })

      cy.get(testPatientPage.cancelBtn).click()

      helper.visibleWithTimeout(measureDetailsPage.measurePageNavigationBtn)
    })
  })
})

function dosageInstructionDosageAttribute () {
  cy.log('dosageInstruction Dosage, Add and Verify Attribute is added correctly')

  cy.get(testPatientPage.attributeNameSelect).select('dosageInstruction')

  cy.get(testPatientPage.sequenceInputbox).type('900')
  cy.get(testPatientPage.textInputbox).type('string')

  cy.get(testPatientPage.valueSetDirectRefSelectGlobal).eq(0).select('SNOMEDCTAdditionalDosageInstructions')
  cy.get(testPatientPage.additionalInstructionSelect).eq(2).select('311504000 - With or after food')

  cy.get(testPatientPage.patientInstructionInputbox).type('string')

  cy.get(testPatientPage.asNeededSelect).select('Boolean')
  cy.get(testPatientPage.booleanSelect).select('True')

  cy.get(testPatientPage.valueSetDirectRefSelectGlobal).eq(1).select('Major Depression')
  cy.get(testPatientPage.siteSelect).eq(2).select('F33.0 - Major depressive disorder, recurrent, mild')

  cy.get(testPatientPage.valueSetDirectRefSelectGlobal).eq(2).select('Antidepressant Medication')
  cy.get(testPatientPage.routeSelect).eq(2).select('104837 - isocarboxazid 10 MG Oral Tablet')

  cy.get(testPatientPage.valueSetDirectRefSelectGlobal).eq(3).select('Encounter Inpatient')
  cy.get(testPatientPage.methodSelect).eq(2).select('32485007 - Hospital admission (procedure)')

  cy.get(testPatientPage.valueSetDirectRefSelectGlobal).eq(4).select('DoseAndRateType')
  cy.get(testPatientPage.typeSelect).eq(2).select('ordered - Ordered')

  cy.get(testPatientPage.doseSelect).select('Range')

  cy.get(testPatientPage.rangeLowValueInputbox).type('1.1')
  cy.get(testPatientPage.rangeHighValueInputbox).type('5.5')
  cy.get(testPatientPage.rangeUnitsInputbox).type('G')

  cy.get(testPatientPage.rateSelect).select('SimpleQuantity')
  cy.get(testPatientPage.rateInputBox).eq(0).type('2')
  cy.get(testPatientPage.rateInputBox).eq(1).type('t')

  cy.get(testPatientPage.maxDosePerPeriodValueInputBox).eq(0).type('5.5')
  cy.get(testPatientPage.maxDosePerPeriodUnitInputBox).eq(0).type('g')
  cy.get(testPatientPage.maxDosePerPeriodValueInputBox).eq(1).type('6.6')
  cy.get(testPatientPage.maxDosePerPeriodUnitInputBox).eq(1).type('l')

  cy.get(testPatientPage.maxDosePerAdministrationValueInputBox).type('7.7')
  cy.get(testPatientPage.maxDosePerAdministrationUnitInputBox).type('m')

  cy.get(testPatientPage.maxDosePerLifetimeValueInputBox).type('8.8')
  cy.get(testPatientPage.maxDosePerLifetimeUnitInputBox).type('d')

  cy.get(testPatientPage.addWidgetBtn).eq(0).click()

  cy.get(testPatientPage.exsistingAttribute).invoke('text').then((text) => {
    expect(text).to.include('dosageInstruction: sequence: 900 | text: string | additionalInstruction: ' +
      '[SNOMEDCT: 311504000] | patientInstruction: string | asNeeded: true | site: [ICD10CM: F33.0] | route: ' +
      '[RXNORM: 104837] | method: [SNOMEDCT: 32485007] | doseAndRate.type: [DoseAndRateType: ordered] | ' +
      'doseAndRate.dose: 1.1 - 5.5 G | doseAndRate.rate: 2 \'t\' | maxDosePerPeriod: 5.5 \'g\' : 6.6 \'l\' | ' +
      'maxDosePerAdministration: 7.7 \'m\' | maxDosePerLifetime: 8.8 \'d\'')
  })

  cy.log('dosageInstruction Dosage - done')
}
