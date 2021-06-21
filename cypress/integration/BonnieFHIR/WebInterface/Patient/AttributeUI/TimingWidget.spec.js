import * as helper from '../../../../../support/helpers'
import * as bonnieLogin from '../../../../../support/Bonnie/BonnieFHIR/BonnieLoginLogout'
import * as measureDetailsPage from '../../../../../pom/BonnieFHIR/WI/MeasureDetailsPage'
import * as testPatientPage from '../../../../../pom/BonnieFHIR/WI/TestPatientPage'
import * as bonnieUploadMeasure from '../../../../../support/Bonnie/BonnieFHIR/BonnieUploadMeasure'

const measureName = 'HEDISBCS2020'
const measureFileToUpload = 'HEDISBCS2020-v0-0-010-FHIR-4-0-1.zip'

const lastNameSuffix = new Date().getTime()
const distinctLastName = 'President' + lastNameSuffix
const year = new Date().getFullYear() -1
const date = new Date().getMonthFormatted().toString() + '/' + new Date().getDayFormatted().toString() + '/'
  + year.toString()

describe('Attribute UI: timing: Timing', () => {

  before('Login', () => {

    bonnieLogin.login()
    bonnieUploadMeasure.UploadMeasureToBonnie(measureFileToUpload, false)
    measureDetailsPage.navigateToMeasureDetails(measureName)

  })
  after('Log Out', () => {

    bonnieLogin.logout()

  })

  it('Verify the Timing Widget', () => {

    cy.get(measureDetailsPage.patientListing).then((patientListing) => {
      const initialPatientCount = parseInt(patientListing.text(), 10)
      cy.log('patient count was:' + initialPatientCount)

      measureDetailsPage.clickAddPatient()
      testPatientPage.enterPatientCharacteristics(distinctLastName)

      //add Observation Element
      testPatientPage.dragAndDrop('request response', 'DeviceUseStatement: Frailty Device', 25)

      //verify adding SampledData
      timingWidget()

      testPatientPage.clickSavePatient()

      //Click the arrow Btn to show the patient actions
      helper.click(testPatientPage.measureDetailsPatientArrowBtn)

      //Click the Edit button For the patient
      helper.click(testPatientPage.measureDetailsPatientEditBtn)

      //open the patient history criteria, this will only work with one patient history criteria in the list, otherwise you will need to index
      cy.get(testPatientPage.criteriaArrowToggle).click()

      //verify Value Timing attribute is still viewable on the Request Response in Patient History
      cy.get(testPatientPage.exsistingAttribute).invoke('text').then((text) => {
        expect(text).to.include('timing: event : ' + date + ' 8:00 AM | ' +
          'repeat.bounds : 1.1 - 100.123 s | repeat.count : 11 | repeat.countMax : 22 | repeat.duration : 33.33 | ' +
          'repeat.durationMax : 44.44 | repeat.durationUnit : wk | repeat.frequency : 55 | repeat.frequencyMax : 66 | ' +
          'repeat.period : 77.77 | repeat.periodMax : 88.88 | repeat.periodUnit : d | repeat.dayOfWeek : wed | ' +
          'repeat.timeOfDay : 8:00 AM | repeat.when : WAKE | repeat.offset : 99 | code: [GTSAbbreviation: WK]')
      })

      cy.get(testPatientPage.cancelBtn).click()

      helper.visibleWithTimeout(measureDetailsPage.measurePageNavigationBtn)
    })
  })

  function timingWidget () {
    cy.log('Timing Add and Verify Attribute is added correctly')

    cy.get(testPatientPage.attributeNameSelect).select('timing')
    cy.get(testPatientPage.attributeTypeSelect).select('Timing')

    cy.get(testPatientPage.dateCheckboxGeneric).eq(1).click()

    cy.get(testPatientPage.boundsDropdown).select('Range')
    cy.get(testPatientPage.lowValueField).type('1.1')
    cy.get(testPatientPage.highValueField).type('100.123')
    cy.get(testPatientPage.unitsInputbox).type('s')

    cy.get(testPatientPage.countInputbox).type('11')
    cy.get(testPatientPage.countmaxInputbox).type('22')
    cy.get(testPatientPage.durationInputbox).type('33.33')
    cy.get(testPatientPage.durationmaxInputbox).type('44.44')

    cy.get(testPatientPage.durationUnitSelect).select('UnitsOfTime')
    cy.get(testPatientPage.valueSetCodeSelect).select('wk - week')

    cy.get(testPatientPage.frequencyInputbox).type('55')
    cy.get(testPatientPage.frequencymaxInputbox).type('66')
    cy.get(testPatientPage.periodInputbox).type('77.77')
    cy.get(testPatientPage.periodmaxInputbox).type('88.88')

    cy.get(testPatientPage.periodUnitSelect).select('UnitsOfTime')
    cy.get(testPatientPage.valueSetCodeSelect).select('d - day')

    cy.get(testPatientPage.dayofweekSelect).select('DaysOfWeek')
    cy.get(testPatientPage.valueSetCodeSelect).select('wed - Wednesday')

    cy.get(testPatientPage.timeCheckboxGeneric).click()

    cy.get(testPatientPage.whenSelect).select('EventTiming')
    cy.get(testPatientPage.valueSetCodeSelect).select('WAKE - WAKE')

    cy.get(testPatientPage.offsetInputbox).type('99')

    cy.get(testPatientPage.valueSetDirectRefSelect).select('TimingAbbreviation')
    cy.get(testPatientPage.valueSetCodeSelect).select('WK - weekly')

    cy.get(testPatientPage.addWidgetBtn).eq(0).click()

    cy.get(testPatientPage.exsistingAttribute).invoke('text').then((text) => {
      expect(text).to.include('timing: event : ' + date + ' 8:00 AM | ' +
        'repeat.bounds : 1.1 - 100.123 s | repeat.count : 11 | repeat.countMax : 22 | repeat.duration : 33.33 | ' +
        'repeat.durationMax : 44.44 | repeat.durationUnit : wk | repeat.frequency : 55 | repeat.frequencyMax : 66 | ' +
        'repeat.period : 77.77 | repeat.periodMax : 88.88 | repeat.periodUnit : d | repeat.dayOfWeek : wed | ' +
        'repeat.timeOfDay : 8:00 AM | repeat.when : WAKE | repeat.offset : 99 | code: [GTSAbbreviation: WK]')
    })

    cy.log('Timing - done')
  }

})
