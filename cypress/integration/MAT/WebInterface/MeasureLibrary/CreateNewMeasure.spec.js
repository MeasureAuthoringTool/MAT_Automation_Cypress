import * as helper from '../../../../support/helpers'
import * as measurelibrary from '../../../../pom/MAT/WI/MeasureLibrary'
import * as measureDetails from '../../../../pom/MAT/WI/MeasureDetails'
import * as measureComposer from '../../../../pom/MAT/WI/MeasureComposer'
import * as createNewMeasure from '../../../../pom/MAT/WI/CreateNewMeasure'
import * as login from '../../../../support/MAT/Login'
import { selectModelRadioBtn } from '../../../../pom/MAT/WI/CreateNewMeasure'

let name = ''

describe('Measure Library: Create New Measure: Generate CMS ID', () => {
  beforeEach('Login', () => {
    login.matLogin()
  })
  afterEach('Log Out', () => {
    login.matLogout()
  })
  it('QDM Measure: Generate CMS ID Only', () => {

    name = 'DraftMeasure' + Date.now()

    // creating new measure
    helper.enabledWithTimeout(measurelibrary.newMeasureButton)
    cy.get(measurelibrary.newMeasureButton).click()

    cy.get(createNewMeasure.measureName).type(name, { delay: 50 })

    cy.get(createNewMeasure.selectModelRadioBtn).eq(1).click()

    cy.get(createNewMeasure.generateCMSIDcheckbox).click()

    helper.enabledWithTimeout(createNewMeasure.matchCQLLibraryNameCheckbox)

    helper.enabledWithTimeout(createNewMeasure.cqlLibraryName)
    cy.get(createNewMeasure.cqlLibraryName).type(name)

    cy.get(createNewMeasure.shortName).type(name, { delay: 50 })
    cy.get(createNewMeasure.measureScoringListBox).select('Proportion')
    cy.get(createNewMeasure.patientBasedMeasureListBox).select('Yes')

    cy.get(createNewMeasure.saveAndContinueBtn).click()

    helper.verifySpinnerAppearsAndDissappears()
    helper.verifySpinnerAppearsAndDissappears()

    helper.visibleWithTimeout(createNewMeasure.confirmationContinueBtn)
    cy.get(createNewMeasure.confirmationContinueBtn).click()

    cy.get(measureDetails.generateIdentifierBtn).should('be.disabled')
    cy.get(measureDetails.eCQMIdentifierTextBox).invoke('val')
      .then(value => {
        expect(value.length).to.eql(4)
      })

    cy.get(measureComposer.cqlWorkspace).click()

    helper.verifySpinnerAppearsAndDissappears()

    cy.get(measureComposer.cqlLibraryNameInput).should('contain.value', name)

    cy.get(measurelibrary.measureLibraryTab).click()

    helper.verifySpinnerAppearsAndDissappears()

  })
  it('FHIR Measure: Generate CMS ID Only', () => {

    name = 'DraftMeasure' + Date.now()

    // creating new measure
    helper.enabledWithTimeout(measurelibrary.newMeasureButton)
    cy.get(measurelibrary.newMeasureButton).click()

    cy.get(createNewMeasure.measureName).type(name, { delay: 50 })

    cy.get(createNewMeasure.selectModelRadioBtn).eq(0).click()

    cy.get(createNewMeasure.generateCMSIDcheckbox).click()

    helper.enabledWithTimeout(createNewMeasure.matchCQLLibraryNameCheckbox)

    helper.enabledWithTimeout(createNewMeasure.cqlLibraryName)
    cy.get(createNewMeasure.cqlLibraryName).type(name)

    cy.get(createNewMeasure.shortName).type(name, { delay: 50 })
    cy.get(createNewMeasure.measureScoringListBox).select('Proportion')
    cy.get(createNewMeasure.patientBasedMeasureListBox).select('Yes')

    cy.get(createNewMeasure.saveAndContinueBtn).click()

    helper.verifySpinnerAppearsAndDissappears()
    helper.verifySpinnerAppearsAndDissappears()

    helper.visibleWithTimeout(createNewMeasure.confirmationContinueBtn)
    cy.get(createNewMeasure.confirmationContinueBtn).click()

    cy.get(measureDetails.generateIdentifierBtn).should('be.disabled')
    cy.get(measureDetails.eCQMIdentifierTextBox).invoke('val')
      .then(value => {
        expect(value.length).to.eql(8)
      })

    cy.get(measureComposer.cqlWorkspace).click()

    helper.verifySpinnerAppearsAndDissappears()

    cy.get(measureComposer.cqlLibraryNameInput).should('contain.value', name)

    cy.get(measurelibrary.measureLibraryTab).click()

    helper.verifySpinnerAppearsAndDissappears()

  })

  it('QDM Measure: Generate CMS ID and CQL Library name', () => {

    name = 'DraftMeasure' + Date.now()

    // creating new measure
    helper.enabledWithTimeout(measurelibrary.newMeasureButton)
    cy.get(measurelibrary.newMeasureButton).click()

    cy.get(createNewMeasure.measureName).type(name, { delay: 50 })

    cy.get(createNewMeasure.selectModelRadioBtn).eq(1).click()

    helper.disabledWithTimeout(createNewMeasure.matchCQLLibraryNameCheckbox)

    cy.get(createNewMeasure.generateCMSIDcheckbox).click()

    helper.enabledWithTimeout(createNewMeasure.cqlLibraryName)
    cy.get(createNewMeasure.cqlLibraryName).type(name)

    cy.get(createNewMeasure.matchCQLLibraryNameCheckbox).click()

    helper.disabledWithTimeout(createNewMeasure.cqlLibraryName)

    cy.get(createNewMeasure.shortName).type(name, { delay: 50 })
    cy.get(createNewMeasure.measureScoringListBox).select('Proportion')
    cy.get(createNewMeasure.patientBasedMeasureListBox).select('Yes')

    cy.get(createNewMeasure.saveAndContinueBtn).click()

    helper.verifySpinnerAppearsAndDissappears()
    helper.verifySpinnerAppearsAndDissappears()

    helper.visibleWithTimeout(createNewMeasure.confirmationContinueBtn)
    cy.get(createNewMeasure.confirmationContinueBtn).click()

    cy.get(measureDetails.generateIdentifierBtn).should('be.disabled')
    cy.get(measureDetails.eCQMIdentifierTextBox).invoke('val')
      .then(value => {
        expect(value.length).to.eql(4)
      })

    cy.get(measureComposer.cqlWorkspace).click()

    helper.verifySpinnerAppearsAndDissappears()

    cy.get(measureComposer.cqlLibraryNameInput).should('contain.value', 'CMS')
    cy.get(measureComposer.cqlLibraryNameInput).invoke('val')
      .then(value => {
        expect(value.length).to.eql(7)
      })

    cy.get(measurelibrary.measureLibraryTab).click()

    helper.verifySpinnerAppearsAndDissappears()

  })

  it('FHIR Measure: Generate CMS ID and CQL Library name', () => {

    name = 'DraftMeasure' + Date.now()

    // creating new measure
    helper.enabledWithTimeout(measurelibrary.newMeasureButton)
    cy.get(measurelibrary.newMeasureButton).click()

    cy.get(createNewMeasure.measureName).type(name, { delay: 50 })

    cy.get(createNewMeasure.selectModelRadioBtn).eq(0).click()

    helper.disabledWithTimeout(createNewMeasure.matchCQLLibraryNameCheckbox)

    cy.get(createNewMeasure.generateCMSIDcheckbox).click()

    helper.enabledWithTimeout(createNewMeasure.cqlLibraryName)
    cy.get(createNewMeasure.cqlLibraryName).type(name)

    cy.get(createNewMeasure.matchCQLLibraryNameCheckbox).click()

    helper.disabledWithTimeout(createNewMeasure.cqlLibraryName)

    cy.get(createNewMeasure.shortName).type(name, { delay: 50 })
    cy.get(createNewMeasure.measureScoringListBox).select('Proportion')
    cy.get(createNewMeasure.patientBasedMeasureListBox).select('Yes')

    cy.get(createNewMeasure.saveAndContinueBtn).click()

    helper.verifySpinnerAppearsAndDissappears()
    helper.verifySpinnerAppearsAndDissappears()

    helper.visibleWithTimeout(createNewMeasure.confirmationContinueBtn)
    cy.get(createNewMeasure.confirmationContinueBtn).click()

    cy.get(measureDetails.generateIdentifierBtn).should('be.disabled')
    cy.get(measureDetails.eCQMIdentifierTextBox).invoke('val')
      .then(value => {
        expect(value.length).to.eql(8)
      })

    cy.get(measureComposer.cqlWorkspace).click()

    helper.verifySpinnerAppearsAndDissappears()

    cy.get(measureComposer.cqlLibraryNameInput).should('contain.value', 'CMS')
    cy.get(measureComposer.cqlLibraryNameInput).should('contain.value', 'FHIR')
    cy.get(measureComposer.cqlLibraryNameInput).invoke('val')
      .then(value => {
        expect(value.length).to.eql(11)
      })

    cy.get(measurelibrary.measureLibraryTab).click()

    helper.verifySpinnerAppearsAndDissappears()

  })
})



