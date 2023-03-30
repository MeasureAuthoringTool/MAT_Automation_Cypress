import * as helper from '../../../../../support/helpers'
import * as measurelibrary from '../../../../../pom/MAT/WI/MeasureLibrary'
import * as createNewMeasure from '../../../../../pom/MAT/WI/CreateNewMeasure'
import * as measureDetails from '../../../../../pom/MAT/WI/MeasureDetails'
import * as login from '../../../../../support/MAT/Login'
import { selectModelRadioBtn } from '../../../../../pom/MAT/WI/CreateNewMeasure'

let measureName = ''
let today = new Date()
let dd = today.getDayFormatted()
let mm = today.getMonthFormatted()
let yyyy = today.getFullYear()

describe('Measure Composer: Measure Details: Save Data', () => {
  beforeEach('Login', () => {
    login.matLogin()
  })
  afterEach('Log Out', () => {
    login.matLogout()
  })
  it('Verify all Measure Details data is saved correctly', () => {

    cy.get(measurelibrary.newMeasureButton).click()

    measureName = 'createProportionMeasure' + Date.now()

    cy.get(createNewMeasure.measureName).type(measureName, { delay: 50 })
    cy.get(createNewMeasure.selectModelRadioBtn).eq(1).click()
    cy.get(createNewMeasure.cqlLibraryName).type(measureName, { delay: 50 })
    cy.get(createNewMeasure.shortName).type(measureName, { delay: 50 })

    cy.get(createNewMeasure.measureScoringListBox).select('Ratio')
    cy.get(createNewMeasure.patientBasedMeasureListBox).select('Yes')

    cy.get(createNewMeasure.saveAndContinueBtn).click()
    cy.get(createNewMeasure.confirmationContinueBtn).click()

    helper.verifySpinnerAppearsAndDissappears()

    //Data Entry

    //General Measure Information

    let newName = 'NewNAME' + Date.now()

    helper.enterText(measureDetails.measureNameInput, newName)
    helper.enterText(measureDetails.eCQMAbbreviatedTitleInput, newName)
    cy.get(measureDetails.measureScoringListbox).select('Proportion')
    cy.get(measureDetails.patientBasedMeasureListbox).select('No')

    cy.get(measureDetails.endorsedByNQFListBox).select('Yes')
    helper.enterText(measureDetails.nQFIDInput, '123')

    cy.get(measureDetails.measurementPeriodCheckbox).click()

    let fromDate = mm + '/' + dd + '/' + yyyy
    yyyy = yyyy + 1
    let toDate = mm + '/' + dd + '/' + yyyy

    helper.enterText(measureDetails.measurementPeriodFromInputBox, fromDate)
    helper.enterText(measureDetails.measurementPeriodToInputBox, toDate)

    cy.get(measureDetails.saveBtn).click()
    cy.get(measureDetails.yesConfirmDialogBox).click()

    helper.visibleWithTimeout(measureDetails.warningMessage)

    //Measure Steward / Developer

    cy.get(measureDetails.measureStewardDeveloper).click()

    cy.get(measureDetails.measureStewardListBox).select('SemanticBits')
    cy.get(measureDetails.row1CheckBox).click()

    cy.get(measureDetails.saveBtn).click()

    helper.visibleWithTimeout(measureDetails.warningMessage)

    //Description

    let description = 'description'

    cy.get(measureDetails.description).click()

    helper.enterText(measureDetails.textAreaInput, description)

    cy.get(measureDetails.saveBtn).click()

    helper.visibleWithTimeout(measureDetails.warningMessage)

    //Copyright

    let copyright = 'copyright'

    cy.get(measureDetails.copyright).click()

    helper.enterText(measureDetails.textAreaInput, copyright)

    cy.get(measureDetails.saveBtn).click()

    helper.visibleWithTimeout(measureDetails.warningMessage)

    //Disclaimer

    let disclaimer = 'disclaimer'

    cy.get(measureDetails.disclaimer).click()

    helper.enterText(measureDetails.textAreaInput, disclaimer)

    cy.get(measureDetails.saveBtn).click()

    helper.visibleWithTimeout(measureDetails.warningMessage)

    //Measure Type

    cy.get(measureDetails.measureType).click()

    cy.get(measureDetails.row1CheckBox).click()

    cy.get(measureDetails.saveBtn).click()

    helper.visibleWithTimeout(measureDetails.warningMessage)

    //Stratification

    let stratification = 'stratification'

    cy.get(measureDetails.stratification).click()

    helper.enterText(measureDetails.textAreaInput, stratification)

    cy.get(measureDetails.saveBtn).click()

    helper.visibleWithTimeout(measureDetails.warningMessage)

    //Risk Adjustment

    let riskAdjustment = 'riskAdjustment'

    cy.get(measureDetails.riskAdjustment).click()

    helper.enterText(measureDetails.textAreaInput, riskAdjustment)

    cy.get(measureDetails.saveBtn).click()

    helper.visibleWithTimeout(measureDetails.warningMessage)

    //Rate Aggregation

    let rateAggregation = 'rateAggregation'

    cy.get(measureDetails.rateAggregation).click()

    helper.enterText(measureDetails.textAreaInput, rateAggregation)

    cy.get(measureDetails.saveBtn).click()

    helper.visibleWithTimeout(measureDetails.warningMessage)

    //Rationale

    let rationale = 'rationale'

    cy.get(measureDetails.rationale).click()

    helper.enterText(measureDetails.textAreaInput, rationale)

    cy.get(measureDetails.saveBtn).click()

    helper.visibleWithTimeout(measureDetails.warningMessage)

    //Clinical Recommendation

    let clinicalRecommendation = 'clinicalRecommendation'

    cy.get(measureDetails.clinicalRecommendation).click()

    helper.enterText(measureDetails.textAreaInput, clinicalRecommendation)

    cy.get(measureDetails.saveBtn).click()

    helper.visibleWithTimeout(measureDetails.warningMessage)

    //Improvement Notation

    let improvementNotation = 'improvementNotation'

    cy.get(measureDetails.improvementNotation).click()

    helper.enterText(measureDetails.textAreaInput, improvementNotation)

    cy.get(measureDetails.saveBtn).click()

    helper.visibleWithTimeout(measureDetails.warningMessage)

    //References

    let references = 'references'

    cy.get(measureDetails.references).click()

    helper.enterText(measureDetails.textAreaInput, references)

    cy.get(measureDetails.saveBtn).click()

    helper.visibleWithTimeout(measureDetails.warningMessage)

    //Definition

    let definition = 'definition'

    cy.get(measureDetails.definition).click()

    helper.enterText(measureDetails.textAreaInput, definition)

    cy.get(measureDetails.saveBtn).click()

    helper.visibleWithTimeout(measureDetails.warningMessage)

    //Guidance

    let guidance = 'guidance'

    cy.get(measureDetails.guidance).click()

    helper.enterText(measureDetails.textAreaInput, guidance)

    cy.get(measureDetails.saveBtn).click()

    helper.visibleWithTimeout(measureDetails.warningMessage)

    //Transmission Format

    let transmissionFormat = 'transmissionFormat'

    cy.get(measureDetails.transmissionFormat).click()

    helper.enterText(measureDetails.textAreaInput, transmissionFormat)

    cy.get(measureDetails.saveBtn).click()

    helper.visibleWithTimeout(measureDetails.warningMessage)

    //Populations

    cy.get(measureDetails.populations).click()

    //Initial Population
    let initialPopulation = 'initialPopulation'

    cy.get(measureDetails.initialPopulation).click()

    helper.enterText(measureDetails.textAreaInput, initialPopulation)

    cy.get(measureDetails.saveBtn).click()

    helper.visibleWithTimeout(measureDetails.warningMessage)

    //Denominator
    let denominator = 'denominator'

    cy.get(measureDetails.denominator).click()

    helper.enterText(measureDetails.textAreaInput, denominator)

    cy.get(measureDetails.saveBtn).click()

    helper.visibleWithTimeout(measureDetails.warningMessage)

    //Denominator Exclusions
    let denominatorExclusions = 'denominatorExclusions'

    cy.get(measureDetails.denominatorExclusions).click()

    helper.enterText(measureDetails.textAreaInput, denominatorExclusions)

    cy.get(measureDetails.saveBtn).click()

    helper.visibleWithTimeout(measureDetails.warningMessage)

    //Numerator
    let numerator = 'numerator'

    cy.get(measureDetails.numerator).click()

    helper.enterText(measureDetails.textAreaInput, numerator)

    cy.get(measureDetails.saveBtn).click()

    helper.visibleWithTimeout(measureDetails.warningMessage)

    //Numerator Exclusions
    let numeratorExclusions = 'numeratorExclusions'

    cy.get(measureDetails.numeratorExclusions).click()

    helper.enterText(measureDetails.textAreaInput, numeratorExclusions)

    cy.get(measureDetails.saveBtn).click()

    helper.visibleWithTimeout(measureDetails.warningMessage)

    //Denominator Exceptions
    let denominatorExceptions = 'denominatorExceptions'

    cy.get(measureDetails.denominatorExceptions).click()

    helper.enterText(measureDetails.textAreaInput, denominatorExceptions)

    cy.get(measureDetails.saveBtn).click()

    helper.visibleWithTimeout(measureDetails.warningMessage)

    //Supplemental Data Elements
    let supplementalDataElements = 'supplementalDataElements'

    cy.get(measureDetails.supplementalDataElements).click()

    helper.enterText(measureDetails.textAreaInput, supplementalDataElements)

    cy.get(measureDetails.saveBtn).click()

    helper.visibleWithTimeout(measureDetails.warningMessage)

    //Measure Set
    let measureSet = 'measureSet'

    cy.get(measureDetails.measureSet).click()

    helper.enterText(measureDetails.textAreaInput, measureSet)

    cy.get(measureDetails.saveBtn).click()

    helper.visibleWithTimeout(measureDetails.warningMessage)

    //Exit MAT, Login and reopen Measure

    cy.get(measurelibrary.measureLibraryTab).click()

    helper.verifySpinnerAppearsAndDissappears()

    login.matLogout()
    login.matLogin()

    cy.get(measurelibrary.row1RecentActivity).dblclick()

    helper.verifySpinnerAppearsAndDissappears()

    //verification

    //General Measure Information

    cy.get(measureDetails.measureNameInput).should('have.value', newName)
    cy.get(measureDetails.eCQMAbbreviatedTitleInput).should('have.value', newName)
    cy.get(measureDetails.measureScoringListbox).should('have.value', 'Proportion')
    cy.get(measureDetails.patientBasedMeasureListbox).should('have.value', 'No')
    //cy.get(measureDetails.eCQMIdentifierTextBox).should('have.value', eCQMIdentifierTextBoxValue)
    cy.get(measureDetails.endorsedByNQFListBox).should('have.value', 'true')
    cy.get(measureDetails.nQFIDInput).should('have.value', '123')
    cy.get(measureDetails.measurementPeriodFromInputBox).should('have.value', fromDate)
    cy.get(measureDetails.measurementPeriodToInputBox).should('have.value', toDate)

    //Measure Steward / Developer

    cy.get(measureDetails.measureStewardDeveloper).click()

    cy.get(measureDetails.measureStewardListBox).should('have.value', '207')
    helper.isChecked(measureDetails.row1CheckBox)

    //Description

    cy.get(measureDetails.description).click()

    cy.get(measureDetails.textAreaInput).should('have.value', description)

    //Copyright

    cy.get(measureDetails.copyright).click()

    cy.get(measureDetails.textAreaInput).should('have.value', copyright)

    //Disclaimer

    cy.get(measureDetails.disclaimer).click()

    cy.get(measureDetails.textAreaInput).should('have.value', disclaimer)

    //Measure Type

    cy.get(measureDetails.measureType).click()

    helper.isChecked(measureDetails.row1CheckBox)

    //Stratification

    cy.get(measureDetails.stratification).click()

    cy.get(measureDetails.textAreaInput).should('have.value', stratification)

    //Risk Adjustment

    cy.get(measureDetails.riskAdjustment).click()

    cy.get(measureDetails.textAreaInput).should('have.value', riskAdjustment)

    //Rate Aggregation

    cy.get(measureDetails.rateAggregation).click()

    cy.get(measureDetails.textAreaInput).should('have.value', rateAggregation)

    //Rationale

    cy.get(measureDetails.rationale).click()

    cy.get(measureDetails.textAreaInput).should('have.value', rationale)

    //Clinical Recommendation

    cy.get(measureDetails.clinicalRecommendation).click()

    cy.get(measureDetails.textAreaInput).should('have.value', clinicalRecommendation)

    //Improvement Notation

    cy.get(measureDetails.improvementNotation).click()

    cy.get(measureDetails.textAreaInput).should('have.value', improvementNotation)

    //References

    cy.get(measureDetails.references).click()

    cy.get(measureDetails.textAreaInput).should('have.value', '')

    cy.get(measureDetails.referenceDescriptionRow).should('have.text', references)

    //Definition

    cy.get(measureDetails.definition).click()

    cy.get(measureDetails.textAreaInput).should('have.value', definition)

    //Guidance

    cy.get(measureDetails.guidance).click()

    cy.get(measureDetails.textAreaInput).should('have.value', guidance)

    //Transmission Format

    cy.get(measureDetails.transmissionFormat).click()

    cy.get(measureDetails.textAreaInput).should('have.value', transmissionFormat)

    //Populations

    cy.get(measureDetails.populations).click()

    //Initial Population

    cy.get(measureDetails.initialPopulation).click()

    cy.get(measureDetails.textAreaInput).should('have.value', initialPopulation)

    //Denominator

    cy.get(measureDetails.denominator).click()

    cy.get(measureDetails.textAreaInput).should('have.value', denominator)

    //Denominator Exclusions

    cy.get(measureDetails.denominatorExclusions).click()

    cy.get(measureDetails.textAreaInput).should('have.value', denominatorExclusions)

    //Numerator

    cy.get(measureDetails.numerator).click()

    cy.get(measureDetails.textAreaInput).should('have.value', numerator)

    //Numerator Exclusions

    cy.get(measureDetails.numeratorExclusions).click()

    cy.get(measureDetails.textAreaInput).should('have.value', numeratorExclusions)

    //Denominator Exceptions

    cy.get(measureDetails.denominatorExceptions).click()

    cy.get(measureDetails.textAreaInput).should('have.value', denominatorExceptions)

    //Supplemental Data Elements

    cy.get(measureDetails.supplementalDataElements).click()

    cy.get(measureDetails.textAreaInput).should('have.value', supplementalDataElements)

    //Measure Set

    cy.get(measureDetails.measureSet).click()

    cy.get(measureDetails.textAreaInput).should('have.value', measureSet)

  })

})
