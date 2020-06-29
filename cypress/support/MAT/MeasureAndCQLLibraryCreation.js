import * as oktaLogin from "../oktaLogin";
import * as helper from "../helpers";
import * as measurelibrary from "../../pom/MAT/WI/MeasureLibrary";
import * as createNewMeasure from "../../pom/MAT/WI/CreateNewMeasure";
import * as measureComposer from "../../pom/MAT/WI/MeasureComposer";
import * as cqlLibrary from "../../pom/MAT/WI/CqlLibrary";
import * as createNewCqlLibrary from "../../pom/MAT/WI/CreateNewCQLLibrary";
import * as cqlComposer from "../../pom/MAT/WI/CQLComposer";

let draftMeasure = 'DraftMeasure'

export const loginCreateVersionedMeasureNotOwnerLogout = () => {

    oktaLogin.login('alternative')

    let name = createMajorVersionMeasure()

    helper.logout()

    return name

}

export const loginCreateDraftCqlLibraryNotOwnerLogout = () => {

    oktaLogin.login('alternative')

    let name = createDraftCqlLibrary()

    helper.logout()

    return name

}

//create Proportion QDM Draft Measure

export const createQDMProportionMeasure = () => {

    cy.get(measurelibrary.newMeasureButton).click()
    let measureName = 'QdmProportionMeasure' + Date.now()

    cy.get(createNewMeasure.measureName).type(measureName, { delay: 50 })
    cy.get(createNewMeasure.modelradioQDM).click()
    cy.get(createNewMeasure.cqlLibraryName).type(measureName, { delay: 50 })
    cy.get(createNewMeasure.shortName).type(measureName, { delay: 50 })
    cy.get(createNewMeasure.measureScoringListBox).select('Proportion')
    cy.get(createNewMeasure.patientBasedMeasureListBox).select('Yes')

    cy.get(createNewMeasure.saveAndContinueBtn).click()

    cy.get(createNewMeasure.confirmationContinueBtn).click()

    helper.verifySpinnerAppearsAndDissappears()

    cy.get(measureComposer.cqlWorkspace).click()

    helper.verifySpinnerAppearsAndDissappears()

    helper.waitToContainText(measureComposer.cqlWorkspaceTitleGeneralInformation, 'General Information')

    //Includes

    cy.get(measureComposer.includes).click()

    helper.waitToContainText(measureComposer.cqlWorkspaceTitleIncludes, 'Includes')

    cy.get(measureComposer.searchInputBox).type('global', { delay: 50 })
    cy.get(measureComposer.searchBtn).click()
    cy.get(measureComposer.availableLibrariesRow1checkbox).click()
    cy.get(measureComposer.libraryAliasInputBox).type('Global', { delay: 50 })
    cy.get(measureComposer.saveIncludes).click()

    helper.visibleWithTimeout(measureComposer.warningMessage)

    //Value Sets

    addValueSet('2.16.840.1.113883.3.117.1.7.1.30')
    addValueSet('2.16.840.1.113883.3.117.1.7.1.27')
    addValueSet('2.16.840.1.113883.3.666.5.307')
    addValueSet('2.16.840.1.114222.4.11.837')
    addValueSet('2.16.840.1.113883.3.117.1.7.1.35')
    addValueSet('2.16.840.1.113762.1.4.1029.205')
    addValueSet('2.16.840.1.113762.1.4.1')
    addValueSet('2.16.840.1.113762.1.4.1029.67')
    addValueSet('2.16.840.1.113883.3.117.1.7.1.38')
    addValueSet('2.16.840.1.114222.4.11.3591')
    addValueSet('2.16.840.1.114222.4.11.836')
    addValueSet('2.16.840.1.113883.3.117.1.7.1.26')

    //Codes

    addCode('CODE:/CodeSystem/CPT/Version/2020/Code/99201/Info')

    //Parameter

    cy.get(measureComposer.parameter).click()

    helper.waitToContainText(measureComposer.cqlWorkspaceTitleGlobal2, 'Parameter')

    cy.get(measureComposer.addNewBtn).click()
    cy.get(measureComposer.parameterNameInput).type('test.Parameter', { delay: 50 })
    cy.get(measureComposer.parameterCQLExpressionEditorInput).type('Interval<DateTime>', { delay: 50 })
    cy.get(measureComposer.parameterSaveBtn).click()

    helper.visibleWithTimeout(measureComposer.warningMessage)

    //Definition

    addDefinition('Initial Population', 'AgeInYearsAt(start of "Measurement Period")> 12')
    addDefinition('Denominator', 'true')
    addDefinition('Numerator', 'true')
    addDefinition('Breast Milk Feeding', '["Substance, Administered": "Breast Milk"] Feeding')
    addDefinition('ED Visit', 'Global."ED Encounter"')

    //Function

    cy.get(measureComposer.functionMeasureComposer).click()

    helper.waitToContainText(measureComposer.cqlWorkspaceTitleGlobal2,'Function')

    cy.get(measureComposer.addNewBtn).click()
    cy.get(measureComposer.functionNameInput).type('CalendarDayOfOrDayAfter', { delay: 50 })
    cy.get(measureComposer.addArgument).click()
    helper.enterText(measureComposer.argumentNameInput, 'StartValue')
    cy.get(measureComposer.availableDatatypesListBox).select('DateTime')
    cy.get(measureComposer.addBtn).click()
    cy.get(measureComposer.functionCQLExpressionEditorInput).type('Interval[StartValue, ToDate(StartValue + 2 days))', { delay: 50 })
    cy.get(measureComposer.functionSaveBtn).click()

    helper.visibleWithTimeout(measureComposer.warningMessage)

    //CQL Library Editor

    cy.get(measureComposer.cqlLibraryEditor).click()

    helper.waitToContainText(measureComposer.cqlWorkspaceTitleCQLLibraryEditor,'CQL Library Editor')

    helper.visibleWithTimeout(measureComposer.warningMessage)
    helper.waitToContainText(measureComposer.warningMessage,'You are viewing CQL with no validation errors.')

    cy.wait(2000)

    cy.get(measureComposer.populationWorkspace).click()

    helper.verifySpinnerAppearsAndDissappears()

    cy.get(measureComposer.initialPopulation).click()

    helper.verifySpinnerAppearsAndDissappears()

    cy.get(measureComposer.initialPopulationDefinitionListBox).select('Initial Population')
    cy.get(measureComposer.initialPopulationSaveBtn).click()

    helper.visibleWithTimeout(measureComposer.warningMessage)
    helper.waitToContainText(measureComposer.warningMessage,'Changes to Initial Populations have been successfully saved.')

    cy.get(measureComposer.denominator).click()

    helper.verifySpinnerAppearsAndDissappears()

    cy.get(measureComposer.denominatorDefinitionListBox).select('Denominator')
    cy.get(measureComposer.denominatorSaveBtn).click()

    helper.visibleWithTimeout(measureComposer.warningMessage)
    helper.waitToContainText(measureComposer.warningMessage,'Changes to Denominators have been successfully saved.')

    cy.get(measureComposer.numerator).click()

    helper.verifySpinnerAppearsAndDissappears()

    cy.get(measureComposer.numeratorDefinitionListBox).select('Numerator')
    cy.get(measureComposer.numeratorSaveBtn).click()

    helper.visibleWithTimeout(measureComposer.warningMessage)
    helper.waitToContainText(measureComposer.warningMessage,'Changes to Numerators have been successfully saved.')

    //navigate to Measure Packager
    cy.get(measureComposer.measurePackager).click()

    helper.verifySpinnerAppearsAndDissappears()

    //verifying the the Population Workspace data is viewable in the Populations list in Measure Packager
    cy.get(measureComposer.populationsListItems).its('length').should('equal', 3)

    cy.get(measureComposer.populationsListItems).eq(0).should('contain.text', 'Initial Population 1')
    cy.get(measureComposer.populationsListItems).eq(1).should('contain.text', 'Denominator 1')
    cy.get(measureComposer.populationsListItems).eq(2).should('contain.text', 'Numerator 1')

    //Package Grouping
    cy.get(measureComposer.addAllItemsToGrouping).click()
    cy.get(measureComposer.saveGrouping).click()

    cy.get(measureComposer.measureGroupingTable).should('contain.text', 'Measure Grouping 1')

    //Create Measure Package
    cy.get(measureComposer.createMeasurePackageBtn).click()

    helper.waitToContainText(measureComposer.packageWarningMessage,'Measure packaged successfully. Please access the Measure Library to export the measure.')

    cy.get(measurelibrary.measureLibraryTab).click()

    helper.verifySpinnerAppearsAndDissappears()

    return measureName

}

//Create Draft Measure

export const createDraftMeasure = (measure, model) => {

    let name = ''

    if (measure === undefined) {
        name = draftMeasure + Date.now()
    }
    else {
        name = measure + Date.now()
    }

    //creating new measure
    helper.enabledWithTimeout(measurelibrary.newMeasureButton)
    cy.get(measurelibrary.newMeasureButton).click()

    cy.get(createNewMeasure.measureName).type(name, { delay: 50 })

    if (model === 'QDM' || model === undefined) {
        cy.get(createNewMeasure.modelradioQDM).click()
    }
    else {
        cy.get(createNewMeasure.modelradioFHIR).click()
    }

    cy.get(createNewMeasure.cqlLibraryName).type(name, { delay: 50 })
    cy.get(createNewMeasure.shortName).type(name, { delay: 50 })

    cy.get(createNewMeasure.measureScoringListBox).select('Proportion')
    cy.get(createNewMeasure.patientBasedMeasureListBox).select('Yes')

    cy.get(createNewMeasure.saveAndContinueBtn).click()
    cy.get(createNewMeasure.confirmationContinueBtn).click()

    helper.verifySpinnerAppearsAndDissappears()

    cy.get(measurelibrary.measureLibraryTab).click()

    helper.verifySpinnerAppearsAndDissappears()

    return name
}

export const createDraftCqlLibrary = (library, model) => {

    let name = ''

    if (library === undefined) {
        name = 'DraftCqllibrary' + Date.now()
    }
    else {
        name = library + Date.now()
    }

    cy.get(measurelibrary.cqlLibraryTab).then(tab => {
        let value = tab.attr('class')

        if (value.toString() === 'gwt-TabBarItem'){
            cy.get(measurelibrary.cqlLibraryTab).click()
            helper.verifySpinnerAppearsAndDissappears()
        }

    })
    helper.verifySpinnerAppearsAndDissappears()
    helper.verifySpinnerAppearsAndDissappears()
    helper.enabledWithTimeout(cqlLibrary.newLibraryBtn)
    cy.get(cqlLibrary.newLibraryBtn).click()

    cy.get(createNewCqlLibrary.cqlLibraryName).type(name, { delay: 50 })

    if (model === 'QDM' || model === undefined) {
        cy.get(createNewCqlLibrary.modelQDMRadio).click()
    }
    else {
        cy.get(createNewCqlLibrary.modelFHIRRadio).click()
    }

    cy.get(createNewCqlLibrary.saveAndContinueBtn).click()

    cy.get(cqlComposer.confirmationContinueBtn).click()

    helper.verifySpinnerAppearsAndDissappears()

    cy.get(measurelibrary.cqlLibraryTab).click()

    helper.verifySpinnerAppearsAndDissappears()

    return name
}


export const createMajorVersionMeasure = (measure) => {

    let name = ''

    if (measure === undefined) {
        name = createDraftMeasure('MajorVersion')
    } else {
        name = measure
    }

    cy.get(measurelibrary.searchInputBox).type(name, { delay: 50 })
    cy.get(measurelibrary.searchBtn).click()

    helper.verifySpinnerAppearsAndDissappears()
    helper.verifySpinnerAppearsAndDissappears()

    helper.enabledWithTimeout(measurelibrary.searchInputBox)
    helper.visibleWithTimeout(measurelibrary.row1MeasureSearch)

    cy.get(measurelibrary.row1MeasureSearch).click()

    cy.get(measurelibrary.createVersionMeasureSearchBtn).click()

    cy.get(measurelibrary.majorVersionTypeRadio).click()
    cy.get(measurelibrary.packageAndVersion).click()
    cy.get(measurelibrary.continueBtn).click()

    helper.verifySpinnerAppearsAndDissappears()

    cy.get(measurelibrary.searchInputBox).clear()

    return name
}

export const addValueSet = (OID) => {
    cy.get(measureComposer.valueSets).click()

    helper.waitToContainText(measureComposer.cqlWorkspaceTitleGlobal,'Value Sets')

    cy.get(measureComposer.OIDInput).type(OID, { delay: 50 })
    cy.get(measureComposer.retrieveOIDBtn).click()
    cy.get(measureComposer.applyBtn).click()

    helper.visibleWithTimeout(measureComposer.warningMessage)
}

export const addCode = (codeUrl) => {
    cy.get(measureComposer.codes).click()

    helper.waitToContainText(measureComposer.cqlWorkspaceTitleGlobal,'Codes')

    cy.get(measureComposer.codeUrlInput).type(codeUrl, { delay: 50 })
    cy.get(measureComposer.retrieveBtn).click()
    cy.get(measureComposer.applyBtn).click()

    helper.visibleWithTimeout(measureComposer.warningMessage)
}

export const addDefinition = (definitionName, CQL) => {
    cy.get(measureComposer.definition).click()

    helper.waitToContainText(measureComposer.cqlWorkspaceTitleGlobal2,'Definition')

    cy.get(measureComposer.addNewBtn).click()
    cy.get(measureComposer.definitionNameInput).type(definitionName, { delay: 50 })
    cy.get(measureComposer.definitionCQLExpressionEditorInput).type(CQL, { delay: 50 })
    cy.get(measureComposer.definitionSaveBtn).click()

    helper.visibleWithTimeout(measureComposer.warningMessage)
}