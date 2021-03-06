import * as helper from '../../../../../support/helpers'
import * as measurelibrary from '../../../../../pom/MAT/WI/MeasureLibrary'
import * as cqlLibrary from '../../../../../pom/MAT/WI/CqlLibrary'
import * as cqlComposer from '../../../../../pom/MAT/WI/CQLComposer'
import * as dataCreation from '../../../../../support/MAT/MeasureAndCQLLibraryCreation'
import * as gridRowActions from '../../../../../support/MAT/GridRowActions'
import * as login from '../../../../../support/MAT/Login'

let qdmCqlLibrary = ''
let fhirCqlLibrary = ''

describe('CQL Composer: CQL Library Workspace: Definition', () => {
  before('Login, data creation', () => {
    login.matLogin()

    qdmCqlLibrary = dataCreation.createDraftCqlLibrary('QdmCqlLibrary', 'QDM')
    fhirCqlLibrary = dataCreation.createDraftCqlLibrary('FhirCqlLibrary', 'FHIR')

    helper.verifySpinnerAppearsAndDissappears()

    login.matLogout()
  })
  beforeEach('Login', () => {
    login.matLogin()

    cy.get(measurelibrary.cqlLibraryTab).click()

    helper.verifySpinnerAppearsAndDissappears()

    helper.visibleWithTimeout(cqlLibrary.row1CqlLibrarySearch)
  })
  afterEach('Log Out', () => {
    login.matLogout()
  })
  it('Enabled/Disabled QDM CQL Library Owner', () => {
    helper.verifySpinnerAppearsAndDissappears()

    helper.enabledWithTimeout(cqlLibrary.searchInputBox)
    helper.enterText(cqlLibrary.searchInputBox, qdmCqlLibrary)
    cy.get(cqlLibrary.searchBtn).click()

    helper.verifySpinnerAppearsAndDissappears()

    gridRowActions.doubleClickRow(cqlLibrary.row1CqlLibrarySearch)

    helper.verifySpinnerAppearsAndDissappears()

    cy.get(cqlComposer.definition).click()

    helper.waitToContainText(cqlComposer.cqlWorkspaceTitleGlobal2, 'Definition')

    helper.enabled(cqlComposer.addNewBtn)
    helper.enabled(cqlComposer.definitionInformationBtn)
    helper.enabled(cqlComposer.definitionInsertBtn)
    helper.enabled(cqlComposer.definitionExpressionBuilderBtn)
    helper.enabled(cqlComposer.definitionSaveBtn)
    helper.enabled(cqlComposer.definitionEraseBtn)
    helper.disabled(cqlComposer.definitionDeleteBtn)

    cy.get(measurelibrary.cqlLibraryTab).click()

    helper.verifySpinnerAppearsAndDissappears()

  })

  it('Enabled/Disabled FHIR CQL Library Owner', () => {
    helper.verifySpinnerAppearsAndDissappears()

    helper.enabledWithTimeout(cqlLibrary.searchInputBox)
    helper.enterText(cqlLibrary.searchInputBox, fhirCqlLibrary)
    cy.get(cqlLibrary.searchBtn).click()

    helper.verifySpinnerAppearsAndDissappears()

    gridRowActions.doubleClickRow(cqlLibrary.row1CqlLibrarySearch)

    helper.verifySpinnerAppearsAndDissappears()

    cy.get(cqlComposer.definition).click()

    helper.waitToContainText(cqlComposer.cqlWorkspaceTitleGlobal2, 'Definition')

    helper.enabled(cqlComposer.addNewBtn)
    helper.enabled(cqlComposer.definitionInformationBtn)
    helper.enabled(cqlComposer.definitionInsertBtn)
    helper.disabled(cqlComposer.definitionExpressionBuilderBtn)
    helper.enabled(cqlComposer.definitionSaveBtn)
    helper.enabled(cqlComposer.definitionEraseBtn)
    helper.disabled(cqlComposer.definitionDeleteBtn)

    cy.get(measurelibrary.cqlLibraryTab).click()

    helper.verifySpinnerAppearsAndDissappears()

  })

  it('QDM Insert Attribute Data population', () => {
    helper.verifySpinnerAppearsAndDissappears()

    helper.enabledWithTimeout(cqlLibrary.searchInputBox)
    helper.enterText(cqlLibrary.searchInputBox, qdmCqlLibrary)
    cy.get(cqlLibrary.searchBtn).click()

    helper.verifySpinnerAppearsAndDissappears()

    gridRowActions.doubleClickRow(cqlLibrary.row1CqlLibrarySearch)

    helper.verifySpinnerAppearsAndDissappears()

    cy.get(cqlComposer.definition).click()

    helper.waitToContainText(cqlComposer.cqlWorkspaceTitleGlobal2, 'Definition')

    cy.get(cqlComposer.definitionInsertBtn).click()
    cy.get(cqlComposer.itemTypeListBox).select('Attributes')

    //verifying a unique datatype and attribute based on model type QDM, this ensures the correct data has been populated
    cy.get(cqlComposer.attributesListBox).select('activeDatetime').should('have.value', 'activeDatetime')
    cy.get(cqlComposer.attributesDataTypeListBox).select('Assessment, Not Ordered').should('have.value', 'Assessment, Not Ordered')

    cy.get(cqlComposer.cancelBtn).click()

    cy.get(measurelibrary.cqlLibraryTab).click()

    helper.verifySpinnerAppearsAndDissappears()

  })

  it('FHIR Insert Attribute Data population', () => {
    helper.verifySpinnerAppearsAndDissappears()

    helper.enabledWithTimeout(cqlLibrary.searchInputBox)
    helper.enterText(cqlLibrary.searchInputBox, fhirCqlLibrary)
    cy.get(cqlLibrary.searchBtn).click()

    helper.verifySpinnerAppearsAndDissappears()

    gridRowActions.doubleClickRow(cqlLibrary.row1CqlLibrarySearch)

    helper.verifySpinnerAppearsAndDissappears()

    cy.get(cqlComposer.definition).click()

    helper.waitToContainText(cqlComposer.cqlWorkspaceTitleGlobal2, 'Definition')

    cy.get(cqlComposer.definitionInsertBtn).click()
    cy.get(cqlComposer.itemTypeListBox).select('Attributes')

    //verifying a unique datatype and attribute based on model type QDM, this ensures the correct data has been populated
    cy.get(cqlComposer.attributesDataTypeListBox).select('Condition').should('have.value', 'Condition')
    cy.get(cqlComposer.attributesListBox).select('recorder').should('have.value', 'recorder')

    cy.get(cqlComposer.cancelBtn).click()

    cy.get(measurelibrary.cqlLibraryTab).click()

    helper.verifySpinnerAppearsAndDissappears()

  })

  it('FHIR Library: Validate the Attribute drop down is disabled', () => {
    helper.verifySpinnerAppearsAndDissappears()

    helper.enabledWithTimeout(cqlLibrary.searchInputBox)
    helper.enterText(cqlLibrary.searchInputBox, fhirCqlLibrary)
    cy.get(cqlLibrary.searchBtn).click()

    helper.verifySpinnerAppearsAndDissappears()

    gridRowActions.doubleClickRow(cqlLibrary.row1CqlLibrarySearch)

    helper.verifySpinnerAppearsAndDissappears()

    cy.get(cqlComposer.definition).click()

    helper.waitToContainText(cqlComposer.cqlWorkspaceTitleGlobal2, 'Definition')

    cy.get(cqlComposer.definitionNameInput).type('Id')

    cy.get(cqlComposer.definitionInsertBtn).click()

    cy.get(cqlComposer.itemTypeListBox).select('Attributes')

    cy.get(cqlComposer.attributesListBox).should('be.disabled')

    cy.get(cqlComposer.attributesDataTypeListBox).select('Communication')
    cy.get(cqlComposer.attributesListBox).should('be.enabled').select('topic')

    cy.get(cqlComposer.insertDialogInsertBtn).click()

    cy.get(cqlComposer.definitionSaveBtn).click()

    helper.verifySpinnerAppearsAndDissappears()

    cy.get(cqlComposer.definitionLeftList).eq(0).should('have.text', 'Id')

    cy.get(measurelibrary.measureLibraryTab).click()

    helper.verifySpinnerAppearsAndDissappears()

  })
})
