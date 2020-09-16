import * as bonnieLogin from '../../../../support/BonnieFHIR/BonnieLoginLogout'
import * as bonnieUploadMeasire from '../../../../support/BonnieFHIR/BonnieUploadMeasure'
import * as deleteMeasure from '../../../../support/BonnieFHIR/DeleteMeasure'
import * as measureDetails from '../../../../pom/BonnieFHIR/WI/MeasureDetails'
import * as measureDefinitionsValidations from '../../../../support/BonnieFHIR/MesureDefinitionsValidations'

const proportionMeasureWithPatients = "CMS130v7_ProportionPatient_v6_0_Artifacts.zip"
const proportionMeasureWithoutPatients = ""
const ratioMeasure = ""
const continuousVariableMeasure = ""
const cohortMeasure = ""
const measureWithMultipleGroupings = ""
const measureWithStratifications = ""
let VsacApiKey = Cypress.env('VSAC_API_KEY')

//NAme of measure as it should appear on bonnie dashboard.
//NOTE: This will need to be changed if the above filenames are changed
const proportionMeasureWithPatientsMeasureName = "2020 Medication Reconciliation Post-Discharge 1.0"
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

        //Upload file to Bonnie
        bonnieUploadMeasire.UploadMeasureToBonnie(proportionMeasureWithPatients)

        //Validate the measure's Initial Population
        var initialPopulationCql = "define \"Initial Population\":" +
        " Global.\"CalendarAgeInYearsAt\" ( FHIRHelpers.ToDate ( Patient.birthDate ), start of \"Measurement Period\" ) in Interval[50, 75] " +
        "and exists AdultOutpatientEncounters.\"Qualifying Encounters\""

        measureDefinitionsValidations.validateDefinition(measureDetails)


        //TODO: Delete measure afterwards

    })
/*
    it('Upload Proportion Measure that is NOT Patient Based into Bonnie FHIR using exported zip file', () => {

        //Upload file to Bonnie
        bonnieUploadMeasire.UploadMeasureToBonnie(fileToUpload)

    })

    it('Upload Ratio Measure into Bonnie FHIR using exported zip file', () => {

        //Upload file to Bonnie
        bonnieUploadMeasire.UploadMeasureToBonnie(fileToUpload)

    })

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