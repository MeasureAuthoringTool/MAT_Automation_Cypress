import * as helper from '../../../../../support/helpers'
import * as dataCreation from '../../../../../support/MAT/MeasureAndCQLLibraryCreation'
import * as measurelibrary from '../../../../../pom/MAT/WI/MeasureLibrary'
import * as measureComposer from '../../../../../pom/MAT/WI/MeasureComposer'
import * as gridRowActions from '../../../../../support/MAT/GridRowActions'
import * as login from '../../../../../support/MAT/Login'

let fhirMeasure = ''
let qdmMeasure = ''

describe('Measure Composer: Function Argument Lightbox', () => {

    beforeEach('Login', () => {
      login.matLogin()
    })

    afterEach('Log Out', () => {
      login.matLogout()
    })

    it('QDM Measure: Validate the classes on Function Argument Lightbox', () => {
      qdmMeasure = dataCreation.createDraftMeasure('QdmDraftMeasure','QDM')

      helper.verifySpinnerAppearsAndDissappears()

        helper.enterText(measurelibrary.searchInputBox, qdmMeasure)
        cy.get(measurelibrary.searchBtn).click()

        helper.verifySpinnerAppearsAndDissappears()

        gridRowActions.doubleClickRow(measurelibrary.row1MeasureSearch)

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(measureComposer.cqlWorkspace).click()

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(measureComposer.functionMeasureComposer).click()

        helper.waitToContainText(measureComposer.cqlWorkspaceTitleGlobal2,'Function')

        cy.get(measureComposer.addArgument).click()

        cy.get(measureComposer.availableDatatypesListBox).select('QDM Datatype')

        // Verify sub-classes display on Function Argument drop-down
        cy.get(measureComposer.datatypeObjectListBox).select( 'Immunization, Not Administered')
        .invoke('val').should('deep.equal', 'Immunization, Not Administered')

        cy.get(measureComposer.datatypeObjectListBox).select( 'Substance, Not Recommended')
        .invoke('val').should('deep.equal', 'Substance, Not Recommended')

        cy.get(measureComposer.argumentNameInput).type('Encounter')

        cy.get(measureComposer.addBtn).click()

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(measureComposer.functionNameInput).type('Test')
        cy.get(measureComposer.functionCQLExpressionEditorInput).type('true')
        cy.get(measureComposer.functionSaveBtn).click()

        helper.verifySpinnerAppearsAndDissappears()
        helper.verifySpinnerAppearsAndDissappears()

        helper.waitToContainText(measureComposer.warningMessage,'Function Test successfully saved.')

        cy.get(measureComposer.cqlLibraryEditor).click()

        helper.verifySpinnerAppearsAndDissappears()

        helper.waitToContainText(measureComposer.warningMessage,'You are viewing CQL with no validation errors.')

        cy.get(measurelibrary.measureLibraryTab).click()

        helper.verifySpinnerAppearsAndDissappears()
        helper.verifySpinnerAppearsAndDissappears()

    })

    it('FHIR Measure: Validate the classes on Function Argument Lightbox', () => {
      fhirMeasure = dataCreation.createDraftMeasure('FhirDraftMeasure','FHIR')

        helper.verifySpinnerAppearsAndDissappears()

        helper.enterText(measurelibrary.searchInputBox, fhirMeasure)
        cy.get(measurelibrary.searchBtn).click()

        helper.verifySpinnerAppearsAndDissappears()

        gridRowActions.doubleClickRow(measurelibrary.row1MeasureSearch)

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(measureComposer.cqlWorkspace).click()

        helper.verifySpinnerAppearsAndDissappears()

       cy.get(measureComposer.functionMeasureComposer).click()

        helper.waitToContainText(measureComposer.cqlWorkspaceTitleGlobal2,'Function')

        cy.get(measureComposer.addArgument).click()

        cy.get(measureComposer.availableDatatypesListBox).select('FHIR Datatype')

        // Verify only main-classes display on Function Argument drop-down
        cy.get(measureComposer.datatypeObjectListBox).select( 'AdverseEvent')
        .invoke('val').should('deep.equal', 'AdverseEvent')

        cy.get(measureComposer.datatypeObjectListBox).select( 'AllergyIntolerance')
        .invoke('val').should('deep.equal', 'AllergyIntolerance')

        cy.get(measureComposer.datatypeObjectListBox).select( 'Task')
        .invoke('val').should('deep.equal', 'Task')

        cy.get(measureComposer.argumentNameInput).type('Encounter')

        cy.get(measureComposer.addBtn).click()

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(measureComposer.functionNameInput).type('Test')
        cy.get(measureComposer.functionCQLExpressionEditorInput).type('true')
        cy.get(measureComposer.functionSaveBtn).click()

        helper.verifySpinnerAppearsAndDissappears()
        helper.verifySpinnerAppearsAndDissappears()

        helper.waitToContainText(measureComposer.warningMessage,'Function Test successfully saved.')

        cy.get(measureComposer.cqlLibraryEditor).click()

        helper.verifySpinnerAppearsAndDissappears()

        helper.waitToContainText(measureComposer.warningMessage,'You are viewing CQL with no validation errors.')

        cy.get(measurelibrary.measureLibraryTab).click()

        helper.verifySpinnerAppearsAndDissappears()
        helper.verifySpinnerAppearsAndDissappears()

    })
})

describe('Measure Composer: CQLWorkspace: Create Function', () => {

  beforeEach('Login', () => {
    login.matLogin()
  })

  afterEach('Log Out', () => {
    login.matLogout()
  })

  it('FHIR Measure: Validate creation of Function without Argument', () => {
    fhirMeasure = dataCreation.createDraftMeasure('FhirDraftMeasure','FHIR')

    helper.verifySpinnerAppearsAndDissappears()

    helper.enterText(measurelibrary.searchInputBox, fhirMeasure)
    cy.get(measurelibrary.searchBtn).click()

    helper.verifySpinnerAppearsAndDissappears()

    gridRowActions.doubleClickRow(measurelibrary.row1MeasureSearch)

    helper.verifySpinnerAppearsAndDissappears()

    cy.get(measureComposer.cqlWorkspace).click()

    helper.verifySpinnerAppearsAndDissappears()

    cy.get(measureComposer.functionMeasureComposer).click()

    helper.waitToContainText(measureComposer.cqlWorkspaceTitleGlobal2,'Function')

    cy.get(measureComposer.functionNameInput).type('Test')
    cy.get(measureComposer.functionCQLExpressionEditorInput).type('true')
    cy.get(measureComposer.functionSaveBtn).click()

    helper.verifySpinnerAppearsAndDissappears()
    helper.verifySpinnerAppearsAndDissappears()

    helper.waitToContainText(measureComposer.warningMessage,'Function Test successfully saved.')

    cy.get(measureComposer.cqlLibraryEditor).click()

    helper.verifySpinnerAppearsAndDissappears()

    helper.waitToContainText(measureComposer.warningMessage,'You are viewing CQL with no validation errors.')

    cy.get(measurelibrary.measureLibraryTab).click()

    helper.verifySpinnerAppearsAndDissappears()
    helper.verifySpinnerAppearsAndDissappears()

  })
})

describe('Measure Composer: Function Insert Attribute Lightbox', () => {

  beforeEach('Login', () => {
    login.matLogin()
  })

  afterEach('Log Out', () => {
    login.matLogout()
  })

  it('QDM Measure: Validate the classes on Function Insert Attribute Lightbox', () => {
    qdmMeasure = dataCreation.createDraftMeasure('QdmDraftMeasure', 'QDM')

    helper.verifySpinnerAppearsAndDissappears()

    helper.enterText(measurelibrary.searchInputBox, qdmMeasure)
    cy.get(measurelibrary.searchBtn).click()

    helper.verifySpinnerAppearsAndDissappears()

    gridRowActions.doubleClickRow(measurelibrary.row1MeasureSearch)

    helper.verifySpinnerAppearsAndDissappears()

    cy.get(measureComposer.cqlWorkspace).click()

    helper.verifySpinnerAppearsAndDissappears()

    cy.get(measureComposer.functionMeasureComposer).click()

    helper.waitToContainText(measureComposer.cqlWorkspaceTitleGlobal2, 'Function')

    cy.get(measureComposer.insertBtn).click()

    cy.get(measureComposer.selectItemType).select('Attributes')

    // Verify sub-classes display on Function Insert Attribute drop-down
    cy.get(measureComposer.selectAttributesDataType).select('Immunization, Not Administered')
      .invoke('val').should('deep.equal', 'Immunization, Not Administered')

    cy.get(measureComposer.selectAttributesDataType).select('Substance, Not Recommended')
      .invoke('val').should('deep.equal', 'Substance, Not Recommended')

    cy.get(measureComposer.selectAttributesDataType).select('Care Goal')

    cy.get(measureComposer.attributeCancelBtn).click()

    helper.verifySpinnerAppearsAndDissappears()

    cy.get(measurelibrary.measureLibraryTab).click()

    helper.verifySpinnerAppearsAndDissappears()
    helper.verifySpinnerAppearsAndDissappears()

  })

  it('FHIR Measure: Validate the classes on Function Insert Attribute Lightbox', () => {
    fhirMeasure = dataCreation.createDraftMeasure('FhirDraftMeasure', 'FHIR')

    helper.verifySpinnerAppearsAndDissappears()

    helper.verifySpinnerAppearsAndDissappears()

    helper.enterText(measurelibrary.searchInputBox, fhirMeasure)

    cy.get(measurelibrary.searchBtn).click()

    helper.verifySpinnerAppearsAndDissappears()

    gridRowActions.doubleClickRow(measurelibrary.row1MeasureSearch)

    helper.verifySpinnerAppearsAndDissappears()

    cy.get(measureComposer.cqlWorkspace).click()

    helper.verifySpinnerAppearsAndDissappears()

    cy.get(measureComposer.functionMeasureComposer).click()

    helper.waitToContainText(measureComposer.cqlWorkspaceTitleGlobal2, 'Function')

    cy.get(measureComposer.insertBtn).click()

    cy.get(measureComposer.selectItemType).select('Attributes')

    // Verify sub-classes display on Function Insert Attribute drop-down
    cy.get(measureComposer.selectAttributesDataType).select('AdverseEvent.SuspectEntity')
      .invoke('val').should('deep.equal', 'AdverseEvent.SuspectEntity')

    cy.get(measureComposer.selectAttributesDataType).select('CareTeam.Participant')
      .invoke('val').should('deep.equal', 'CareTeam.Participant')

    cy.get(measureComposer.selectAttributesDataType).select('Encounter.Diagnosis')
      .invoke('val').should('deep.equal', 'Encounter.Diagnosis')

    cy.get(measureComposer.selectAttributesDataType).select('Encounter.Diagnosis')

    cy.get(measureComposer.attributeCancelBtn).click()

    helper.verifySpinnerAppearsAndDissappears()

    cy.get(measurelibrary.measureLibraryTab).click()

    helper.verifySpinnerAppearsAndDissappears()
    helper.verifySpinnerAppearsAndDissappears()

  })
})
