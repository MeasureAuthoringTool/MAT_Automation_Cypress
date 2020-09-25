import * as bonnieLogin from '../../../../support/BonnieFHIR/BonnieLoginLogout'
import * as bonnieUploadMeasire from '../../../../support/BonnieFHIR/BonnieUploadMeasure'
import * as deleteMeasure from '../../../../support/BonnieFHIR/DeleteMeasure'
import * as measureDetails from '../../../../pom/BonnieFHIR/WI/MeasureDetails'
import * as measureDefinitionsValidations from '../../../../support/BonnieFHIR/MesureDefinitionsValidations'
import * as dashboard from '../../../../pom/BonnieFHIR/WI/Dashboard'
import * as helper from '../../../../support/helpers'
import { colonoscopyPerformedCQL } from '../../../../pom/BonnieFHIR/WI/MeasureDetails'

const proportionMeasureWithPatients = "CMS130v7_ProportionPatient_v6_0_Artifacts.zip"
const proportionMeasureWithoutPatients = ""
const ratioMeasure = ""
const continuousVariableMeasure = ""
const cohortMeasure = ""
const measureWithMultipleGroupings = ""
const measureWithStratifications = ""


//NAme of measure as it should appear on bonnie dashboard.
//NOTE: This will need to be changed if the above filenames are changed
const proportionMeasureWithPatientsMeasureName = "CMS130v7"
const proportionMeasureWithoutPatientsMeasureName = ""
const ratioMeasureMeasureName = ""
const continuousVariableMeasureMeasureName = ""
const cohortMeasureMeasureName = ""
const measureWithMultipleGroupingsMeasureName = ""
const measureWithStratificationsMeasureName = ""

describe('Upload Measures to Bonnie FHIR and validate Definitions on Measure Details', () => {
    before('Login', () => {

        bonnieLogin.login()

    })
    after('Log Out', () => {

        bonnieLogin.logout()

    })

    it('Upload Proportion Measure that is Patient Based into Bonnie FHIR using exported zip file', () => {

        //The following strings are the expected cql values to be shown for validation post upload
        let initialPopulationCqlExpected = 'define "Initial Population":\n  Global."CalendarAgeInYearsAt" ( FHIRHelpers.ToDate ( Patient.birthDate ), start of "Measurement Period" ) in Interval[50, 75]\n    and exists AdultOutpatientEncounters."Qualifying Encounters"'
        let denominatorExpected = 'define "Denominator":\n  true'
        let denominatorExclusionExpected = 'define "Denominator Exclusion":\n  Hospice."Has Hospice"\n    or exists "Malignant Neoplasm Ever"\n    or exists "Total Colectomy Performed"'
        let numeratorExpected = 'define "Numerator":\n  exists "Colonoscopy Performed"\n    or exists "Fecal Occult Blood Test Performed"\n    or exists "Flexible Sigmoidoscopy Performed"\n    or exists "Fecal Immunochemical Test DNA"\n    or exists "CT Colonography Performed"'
        let FSPexpected = 'define "Flexible Sigmoidoscopy Performed":\n  [Procedure: "Flexible Sigmoidoscopy"] FlexibleSigmoidoscopy\n    where FlexibleSigmoidoscopy.status = \'completed\'\n      and Global."Normalize Interval" ( FlexibleSigmoidoscopy.performed ) ends 5 years or less on or before \n      end of "Measurement Period"'
        let CTexpected = 'define "CT Colonography Performed":\n  [Procedure: "CT Colonography"] Colonography\n    where Colonography.status = \'completed\'\n      and Global."Normalize Interval" ( Colonography.performed ) ends 5 years or less on or before \n      end of "Measurement Period"'
        let totalCTexpected = 'define "Total Colectomy Performed":\n  [Procedure: "Total Colectomy"] Colectomy\n    where Colectomy.status = \'completed\'\n      and Global."Normalize Interval" ( Colectomy.performed ) starts on or before \n      end of "Measurement Period"'
        let neoplamsExpected = 'define "Malignant Neoplasm Ever":\n  [Condition: "Malignant Neoplasm of Colon"] ColorectalCancer\n    where Global."Normalize Interval" ( ColorectalCancer.onset ) starts on or before \n    end of "Measurement Period"'
        let fecalBloodExpected = 'define "Fecal Occult Blood Test Performed":\n  [Observation: "Fecal Occult Blood Test (FOBT)"] FecalOccultResult\n    where FecalOccultResult.status in { \'final\', \'amended\', \'corrected\', \'preliminary\' }\n      and FecalOccultResult.value is not null\n      and Global."Normalize Interval" ( FecalOccultResult.effective ) during day of "Measurement Period"'
        let fecalDNAExpected = 'define "Fecal Immunochemical Test DNA":\n  [Observation: "FIT DNA"] FitDNA\n    where FitDNA.status in { \'final\', \'amended\', \'corrected\', \'preliminary\' }\n      and FitDNA.value is not null\n      and Global."Normalize Interval" ( FitDNA.effective ) occurs 3 years or less on or before day of \n      end of "Measurement Period"'
        let CPexpected = 'define "Colonoscopy Performed":\n  [Procedure: "Colonoscopy"] Colonoscopy\n    where Colonoscopy.status = \'completed\'\n      and Global."Normalize Interval" ( Colonoscopy.performed ) ends 10 years or less on or before \n      end of "Measurement Period"'
        let hasHospiceExpected = 'define "Has Hospice":\n  exists (\n      [Encounter: "Encounter Inpatient"] DischargeHospice\n        where DischargeHospice.status = \'finished\'\n          and (\n            DischargeHospice.hospitalization.dischargeDisposition ~ "Discharge to home for hospice care (procedure)"\n              or DischargeHospice.hospitalization.dischargeDisposition ~ "Discharge to healthcare facility for hospice care (procedure)"\n          )\n          and DischargeHospice.period ends during "Measurement Period"\n    )\n      or exists (\n        [ServiceRequest: "Hospice care ambulatory"] HospiceOrder\n          where HospiceOrder.intent = \'order\'\n              and HospiceOrder.authoredOn in "Measurement Period"\n      )\n      or exists (\n        [Procedure: "Hospice care ambulatory"] HospicePerformed\n          where HospicePerformed.status = \'completed\'\n            and Global."Normalize Interval"(HospicePerformed.performed) overlaps "Measurement Period"\n      )'
        let qualifyingEncountersExpected = 'define "Qualifying Encounters":\n  (\n      [Encounter: "Office Visit"]\n        union [Encounter: "Annual Wellness Visit"]\n        union [Encounter: "Preventive Care Services - Established Office Visit, 18 and Up"]\n        union [Encounter: "Preventive Care Services-Initial Office Visit, 18 and Up"]\n        union [Encounter: "Home Healthcare Services"]\n    ) ValidEncounter\n      where ValidEncounter.period during "Measurement Period"\n        and ValidEncounter.status  = \'finished\''


        //Upload file to Bonnie
        bonnieUploadMeasire.UploadMeasureToBonnie(proportionMeasureWithPatients)

        //Validate measure was uploaded and click on the measure to go to measure details
        helper.verifySpinnerAppearsAndDissappears()

        //Get all measures on the user's page and iterate over each one. and click the correct one.
        cy.get(dashboard.measureNameDiv).each(function($el) {
            if ($el.text().includes(proportionMeasureWithPatientsMeasureName)) {
              cy.wrap($el).click()
            }
        })

        //Ensure the measure details page has loaded
        helper.verifySpinnerAppearsAndDissappears()
        helper.visibleWithTimeout(measureDetails.measureDetailsParentDiv)

        //Validate the Initial Population Definition
        cy.get(measureDetails.initialPopulationCQL).invoke('text').then((text) => {
          expect(text).to.include(initialPopulationCqlExpected)
        })

        //Validate the Denominator
        cy.get(measureDetails.denominatorCQL).invoke('text').then((text) => {
          expect(text).to.include(denominatorExpected)
        })

        //Validate Denominator Exclusion
        cy.get(measureDetails.denominatorExclusionCQL).invoke('text').then((text) => {
            expect(text).to.include(denominatorExclusionExpected)
        })

        //Validate Numerator
        cy.get(measureDetails.numerator).invoke('text').then((text) => {
            expect(text).to.include(numeratorExpected)
        })

        //Validate Definitions
        //Start with flexible sigmo performed definition
        cy.get(measureDetails.flexibleSigmoidoscopyPerformedCQL).invoke('text').then((text) => {
            expect(text).to.include(FSPexpected)
        })

        //Validate CT definition
        cy.get(measureDetails.ctColonographyPerformedCQL).invoke('text').then((text) => {
            expect(text).to.include(CTexpected)
        })

        //Validate Total CT Performed
        cy.get(measureDetails.totalColectomyPerformedCQL).invoke('text').then((text) => {
            expect(text).to.include(totalCTexpected)
        })

        //Validate neoplasm
        cy.get(measureDetails.malignantNeoplasmEverCQL).invoke('text').then((text) => {
            expect(text).to.include(neoplamsExpected)
        })

        //Validate fecal blood test
        cy.get(measureDetails.fecalOccultBloodTestPerformedCQL).invoke('text').then((text) => {
            expect(text).to.include(fecalBloodExpected)
        })

        //Validate Fecal DNA
        cy.get(measureDetails.fecalImmunochemicalTestDNACQL).invoke('text').then((text) => {
            expect(text).to.include(fecalDNAExpected)
        })

        //Validate Colonoscopy performed
        cy.get(measureDetails.colonoscopyPerformedCQL).invoke('text').then((text) => {
            expect(text).to.include(CPexpected)
        })

        //Valdiate has hospice
        cy.get(measureDetails.hasHospiceCQL).invoke('text').then((text) => {
            expect(text).to.include(hasHospiceExpected)
        })

        //validate qualifying encounters
        cy.get(measureDetails.qualifyingEncountersCQL).invoke('text').then((text) => {
            expect(text).to.include(qualifyingEncountersExpected)
        })

        //Delete Measure once validated
        deleteMeasure.DeleteMeasureFromBonnie(proportionMeasureWithPatientsMeasureName)

    })

    it('Upload Proportion Measure that is NOT Patient Based into Bonnie FHIR using exported zip file', () => {

        //The following strings are the expected cql values to be shown for validation post upload
        let initialPopulationCqlExpected = 'define "Initial Population":\n  Global."CalendarAgeInYearsAt" ( FHIRHelpers.ToDate ( Patient.birthDate ), start of "Measurement Period" ) in Interval[50, 75]\n    and exists AdultOutpatientEncounters."Qualifying Encounters"'
        let denominatorExpected = 'define "Denominator":\n  true'
        let denominatorExclusionExpected = 'define "Denominator Exclusion":\n  Hospice."Has Hospice"\n    or exists "Malignant Neoplasm Ever"\n    or exists "Total Colectomy Performed"'
        let numeratorExpected = 'define "Numerator":\n  exists "Colonoscopy Performed"\n    or exists "Fecal Occult Blood Test Performed"\n    or exists "Flexible Sigmoidoscopy Performed"\n    or exists "Fecal Immunochemical Test DNA"\n    or exists "CT Colonography Performed"'
        let FSPexpected = 'define "Flexible Sigmoidoscopy Performed":\n  [Procedure: "Flexible Sigmoidoscopy"] FlexibleSigmoidoscopy\n    where FlexibleSigmoidoscopy.status = \'completed\'\n      and Global."Normalize Interval" ( FlexibleSigmoidoscopy.performed ) ends 5 years or less on or before \n      end of "Measurement Period"'
        let CTexpected = 'define "CT Colonography Performed":\n  [Procedure: "CT Colonography"] Colonography\n    where Colonography.status = \'completed\'\n      and Global."Normalize Interval" ( Colonography.performed ) ends 5 years or less on or before \n      end of "Measurement Period"'
        let totalCTexpected = 'define "Total Colectomy Performed":\n  [Procedure: "Total Colectomy"] Colectomy\n    where Colectomy.status = \'completed\'\n      and Global."Normalize Interval" ( Colectomy.performed ) starts on or before \n      end of "Measurement Period"'
        let neoplamsExpected = 'define "Malignant Neoplasm Ever":\n  [Condition: "Malignant Neoplasm of Colon"] ColorectalCancer\n    where Global."Normalize Interval" ( ColorectalCancer.onset ) starts on or before \n    end of "Measurement Period"'
        let fecalBloodExpected = 'define "Fecal Occult Blood Test Performed":\n  [Observation: "Fecal Occult Blood Test (FOBT)"] FecalOccultResult\n    where FecalOccultResult.status in { \'final\', \'amended\', \'corrected\', \'preliminary\' }\n      and FecalOccultResult.value is not null\n      and Global."Normalize Interval" ( FecalOccultResult.effective ) during day of "Measurement Period"'
        let fecalDNAExpected = 'define "Fecal Immunochemical Test DNA":\n  [Observation: "FIT DNA"] FitDNA\n    where FitDNA.status in { \'final\', \'amended\', \'corrected\', \'preliminary\' }\n      and FitDNA.value is not null\n      and Global."Normalize Interval" ( FitDNA.effective ) occurs 3 years or less on or before day of \n      end of "Measurement Period"'
        let CPexpected = 'define "Colonoscopy Performed":\n  [Procedure: "Colonoscopy"] Colonoscopy\n    where Colonoscopy.status = \'completed\'\n      and Global."Normalize Interval" ( Colonoscopy.performed ) ends 10 years or less on or before \n      end of "Measurement Period"'
        let hasHospiceExpected = 'define "Has Hospice":\n  exists (\n      [Encounter: "Encounter Inpatient"] DischargeHospice\n        where DischargeHospice.status = \'finished\'\n          and (\n            DischargeHospice.hospitalization.dischargeDisposition ~ "Discharge to home for hospice care (procedure)"\n              or DischargeHospice.hospitalization.dischargeDisposition ~ "Discharge to healthcare facility for hospice care (procedure)"\n          )\n          and DischargeHospice.period ends during "Measurement Period"\n    )\n      or exists (\n        [ServiceRequest: "Hospice care ambulatory"] HospiceOrder\n          where HospiceOrder.intent = \'order\'\n              and HospiceOrder.authoredOn in "Measurement Period"\n      )\n      or exists (\n        [Procedure: "Hospice care ambulatory"] HospicePerformed\n          where HospicePerformed.status = \'completed\'\n            and Global."Normalize Interval"(HospicePerformed.performed) overlaps "Measurement Period"\n      )'
        let qualifyingEncountersExpected = 'define "Qualifying Encounters":\n  (\n      [Encounter: "Office Visit"]\n        union [Encounter: "Annual Wellness Visit"]\n        union [Encounter: "Preventive Care Services - Established Office Visit, 18 and Up"]\n        union [Encounter: "Preventive Care Services-Initial Office Visit, 18 and Up"]\n        union [Encounter: "Home Healthcare Services"]\n    ) ValidEncounter\n      where ValidEncounter.period during "Measurement Period"\n        and ValidEncounter.status  = \'finished\''


        //Upload file to Bonnie
        bonnieUploadMeasire.UploadMeasureToBonnie(proportionMeasureWithPatients)

        //Validate measure was uploaded and click on the measure to go to measure details
        helper.verifySpinnerAppearsAndDissappears()

        //Get all measures on the user's page and iterate over each one. and click the correct one.
        cy.get(dashboard.measureNameDiv).each(function($el) {
            if ($el.text().includes(proportionMeasureWithPatientsMeasureName)) {
                cy.wrap($el).click()
            }
        })

        //Ensure the measure details page has loaded
        helper.verifySpinnerAppearsAndDissappears()
        helper.visibleWithTimeout(measureDetails.measureDetailsParentDiv)

        //Validate the Initial Population Definition
        cy.get(measureDetails.initialPopulationCQL).invoke('text').then((text) => {
            expect(text).to.include(initialPopulationCqlExpected)
        })

        //Validate the Denominator
        cy.get(measureDetails.denominatorCQL).invoke('text').then((text) => {
            expect(text).to.include(denominatorExpected)
        })

        //Validate Denominator Exclusion
        cy.get(measureDetails.denominatorExclusionCQL).invoke('text').then((text) => {
            expect(text).to.include(denominatorExclusionExpected)
        })

        //Validate Numerator
        cy.get(measureDetails.numerator).invoke('text').then((text) => {
            expect(text).to.include(numeratorExpected)
        })

        //Validate Definitions
        //Start with flexible sigmo performed definition
        cy.get(measureDetails.flexibleSigmoidoscopyPerformedCQL).invoke('text').then((text) => {
            expect(text).to.include(FSPexpected)
        })

        //Validate CT definition
        cy.get(measureDetails.ctColonographyPerformedCQL).invoke('text').then((text) => {
            expect(text).to.include(CTexpected)
        })

        //Validate Total CT Performed
        cy.get(measureDetails.totalColectomyPerformedCQL).invoke('text').then((text) => {
            expect(text).to.include(totalCTexpected)
        })

        //Validate neoplasm
        cy.get(measureDetails.malignantNeoplasmEverCQL).invoke('text').then((text) => {
            expect(text).to.include(neoplamsExpected)
        })

        //Validate fecal blood test
        cy.get(measureDetails.fecalOccultBloodTestPerformedCQL).invoke('text').then((text) => {
            expect(text).to.include(fecalBloodExpected)
        })

        //Validate Fecal DNA
        cy.get(measureDetails.fecalImmunochemicalTestDNACQL).invoke('text').then((text) => {
            expect(text).to.include(fecalDNAExpected)
        })

        //Validate Colonoscopy performed
        cy.get(measureDetails.colonoscopyPerformedCQL).invoke('text').then((text) => {
            expect(text).to.include(CPexpected)
        })

        //Valdiate has hospice
        cy.get(measureDetails.hasHospiceCQL).invoke('text').then((text) => {
            expect(text).to.include(hasHospiceExpected)
        })

        //validate qualifying encounters
        cy.get(measureDetails.qualifyingEncountersCQL).invoke('text').then((text) => {
            expect(text).to.include(qualifyingEncountersExpected)
        })

        //Delete Measure once validated
        deleteMeasure.DeleteMeasureFromBonnie(proportionMeasureWithPatientsMeasureName)

    })

    it('Upload Ratio Measure into Bonnie FHIR using exported zip file', () => {

        //The following strings are the expected cql values to be shown for validation post upload
        let initialPopulationCqlExpected = 'define "Initial Population":\n  Global."CalendarAgeInYearsAt" ( FHIRHelpers.ToDate ( Patient.birthDate ), start of "Measurement Period" ) in Interval[50, 75]\n    and exists AdultOutpatientEncounters."Qualifying Encounters"'
        let denominatorExpected = 'define "Denominator":\n  true'
        let denominatorExclusionExpected = 'define "Denominator Exclusion":\n  Hospice."Has Hospice"\n    or exists "Malignant Neoplasm Ever"\n    or exists "Total Colectomy Performed"'
        let numeratorExpected = 'define "Numerator":\n  exists "Colonoscopy Performed"\n    or exists "Fecal Occult Blood Test Performed"\n    or exists "Flexible Sigmoidoscopy Performed"\n    or exists "Fecal Immunochemical Test DNA"\n    or exists "CT Colonography Performed"'
        let FSPexpected = 'define "Flexible Sigmoidoscopy Performed":\n  [Procedure: "Flexible Sigmoidoscopy"] FlexibleSigmoidoscopy\n    where FlexibleSigmoidoscopy.status = \'completed\'\n      and Global."Normalize Interval" ( FlexibleSigmoidoscopy.performed ) ends 5 years or less on or before \n      end of "Measurement Period"'
        let CTexpected = 'define "CT Colonography Performed":\n  [Procedure: "CT Colonography"] Colonography\n    where Colonography.status = \'completed\'\n      and Global."Normalize Interval" ( Colonography.performed ) ends 5 years or less on or before \n      end of "Measurement Period"'
        let totalCTexpected = 'define "Total Colectomy Performed":\n  [Procedure: "Total Colectomy"] Colectomy\n    where Colectomy.status = \'completed\'\n      and Global."Normalize Interval" ( Colectomy.performed ) starts on or before \n      end of "Measurement Period"'
        let neoplamsExpected = 'define "Malignant Neoplasm Ever":\n  [Condition: "Malignant Neoplasm of Colon"] ColorectalCancer\n    where Global."Normalize Interval" ( ColorectalCancer.onset ) starts on or before \n    end of "Measurement Period"'
        let fecalBloodExpected = 'define "Fecal Occult Blood Test Performed":\n  [Observation: "Fecal Occult Blood Test (FOBT)"] FecalOccultResult\n    where FecalOccultResult.status in { \'final\', \'amended\', \'corrected\', \'preliminary\' }\n      and FecalOccultResult.value is not null\n      and Global."Normalize Interval" ( FecalOccultResult.effective ) during day of "Measurement Period"'
        let fecalDNAExpected = 'define "Fecal Immunochemical Test DNA":\n  [Observation: "FIT DNA"] FitDNA\n    where FitDNA.status in { \'final\', \'amended\', \'corrected\', \'preliminary\' }\n      and FitDNA.value is not null\n      and Global."Normalize Interval" ( FitDNA.effective ) occurs 3 years or less on or before day of \n      end of "Measurement Period"'
        let CPexpected = 'define "Colonoscopy Performed":\n  [Procedure: "Colonoscopy"] Colonoscopy\n    where Colonoscopy.status = \'completed\'\n      and Global."Normalize Interval" ( Colonoscopy.performed ) ends 10 years or less on or before \n      end of "Measurement Period"'
        let hasHospiceExpected = 'define "Has Hospice":\n  exists (\n      [Encounter: "Encounter Inpatient"] DischargeHospice\n        where DischargeHospice.status = \'finished\'\n          and (\n            DischargeHospice.hospitalization.dischargeDisposition ~ "Discharge to home for hospice care (procedure)"\n              or DischargeHospice.hospitalization.dischargeDisposition ~ "Discharge to healthcare facility for hospice care (procedure)"\n          )\n          and DischargeHospice.period ends during "Measurement Period"\n    )\n      or exists (\n        [ServiceRequest: "Hospice care ambulatory"] HospiceOrder\n          where HospiceOrder.intent = \'order\'\n              and HospiceOrder.authoredOn in "Measurement Period"\n      )\n      or exists (\n        [Procedure: "Hospice care ambulatory"] HospicePerformed\n          where HospicePerformed.status = \'completed\'\n            and Global."Normalize Interval"(HospicePerformed.performed) overlaps "Measurement Period"\n      )'
        let qualifyingEncountersExpected = 'define "Qualifying Encounters":\n  (\n      [Encounter: "Office Visit"]\n        union [Encounter: "Annual Wellness Visit"]\n        union [Encounter: "Preventive Care Services - Established Office Visit, 18 and Up"]\n        union [Encounter: "Preventive Care Services-Initial Office Visit, 18 and Up"]\n        union [Encounter: "Home Healthcare Services"]\n    ) ValidEncounter\n      where ValidEncounter.period during "Measurement Period"\n        and ValidEncounter.status  = \'finished\''


        //Upload file to Bonnie
        bonnieUploadMeasire.UploadMeasureToBonnie(proportionMeasureWithPatients)

        //Validate measure was uploaded and click on the measure to go to measure details
        helper.verifySpinnerAppearsAndDissappears()

        //Get all measures on the user's page and iterate over each one. and click the correct one.
        cy.get(dashboard.measureNameDiv).each(function($el) {
            if ($el.text().includes(proportionMeasureWithPatientsMeasureName)) {
                cy.wrap($el).click()
            }
        })

        //Ensure the measure details page has loaded
        helper.verifySpinnerAppearsAndDissappears()
        helper.visibleWithTimeout(measureDetails.measureDetailsParentDiv)

        //Validate the Initial Population Definition
        cy.get(measureDetails.initialPopulationCQL).invoke('text').then((text) => {
            expect(text).to.include(initialPopulationCqlExpected)
        })

        //Validate the Denominator
        cy.get(measureDetails.denominatorCQL).invoke('text').then((text) => {
            expect(text).to.include(denominatorExpected)
        })

        //Validate Denominator Exclusion
        cy.get(measureDetails.denominatorExclusionCQL).invoke('text').then((text) => {
            expect(text).to.include(denominatorExclusionExpected)
        })

        //Validate Numerator
        cy.get(measureDetails.numerator).invoke('text').then((text) => {
            expect(text).to.include(numeratorExpected)
        })

        //Validate Definitions
        //Start with flexible sigmo performed definition
        cy.get(measureDetails.flexibleSigmoidoscopyPerformedCQL).invoke('text').then((text) => {
            expect(text).to.include(FSPexpected)
        })

        //Validate CT definition
        cy.get(measureDetails.ctColonographyPerformedCQL).invoke('text').then((text) => {
            expect(text).to.include(CTexpected)
        })

        //Validate Total CT Performed
        cy.get(measureDetails.totalColectomyPerformedCQL).invoke('text').then((text) => {
            expect(text).to.include(totalCTexpected)
        })

        //Validate neoplasm
        cy.get(measureDetails.malignantNeoplasmEverCQL).invoke('text').then((text) => {
            expect(text).to.include(neoplamsExpected)
        })

        //Validate fecal blood test
        cy.get(measureDetails.fecalOccultBloodTestPerformedCQL).invoke('text').then((text) => {
            expect(text).to.include(fecalBloodExpected)
        })

        //Validate Fecal DNA
        cy.get(measureDetails.fecalImmunochemicalTestDNACQL).invoke('text').then((text) => {
            expect(text).to.include(fecalDNAExpected)
        })

        //Validate Colonoscopy performed
        cy.get(measureDetails.colonoscopyPerformedCQL).invoke('text').then((text) => {
            expect(text).to.include(CPexpected)
        })

        //Valdiate has hospice
        cy.get(measureDetails.hasHospiceCQL).invoke('text').then((text) => {
            expect(text).to.include(hasHospiceExpected)
        })

        //validate qualifying encounters
        cy.get(measureDetails.qualifyingEncountersCQL).invoke('text').then((text) => {
            expect(text).to.include(qualifyingEncountersExpected)
        })

        //Delete Measure once validated
        deleteMeasure.DeleteMeasureFromBonnie(proportionMeasureWithPatientsMeasureName)

    })
/*
    it('Upload Continuous Variable Measure into Bonnie FHIR using exported zip file', () => {

        //Upload file to Bonnie
        bonnieUploadMeasire.UploadMeasureToBonnie(fileToUpload)

    })

    it('Upload Cohort Measure into Bonnie FHIR using exported zip file', () => {

        //Upload file to Bonnie
        bonnieUploadMeasire.UploadMeasureToBonnie(fileToUpload)

    })

    it('Upload Measure with Multiple Groupings into Bonnie FHIR using exported zip file', () => {

        //Upload file to Bonnie
        bonnieUploadMeasire.UploadMeasureToBonnie(fileToUpload)

    })

    it('Upload Measure with Stratifications into Bonnie FHIR using exported zip file', () => {

        //Upload file to Bonnie
        bonnieUploadMeasire.UploadMeasureToBonnie(fileToUpload)

    })
*/
})