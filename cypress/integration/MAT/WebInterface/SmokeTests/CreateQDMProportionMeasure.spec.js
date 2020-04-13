import * as helper from '../../../../support/helpers'
import * as measurelibrary from '../../../../pom/MAT/WI/MeasureLibrary'
import * as createNewMeasure from '../../../../pom/MAT/WI/CreateNewMeasure'
import * as measureComposer from '../../../../pom/MAT/WI/MeasureComposer'
import * as matheader from "../../../../pom/MAT/WI/MATheader";


describe('QDM Proportion Measure', () => {
    before('Login', () => {
        helper.loginGeneric()
    })
    beforeEach('Preserve Cookies', () => {
        helper.preserveCookies()
    })
    after('Log Out', () => {
        helper.logout()
    })
    it('Proportion QDM, creation, Population Workspace, Measure Packager', () => {

        cy.get(measurelibrary.newMeasureButton).click()
        let measureName = 'createQdmProportionMeasure' + Date.now()

        cy.get(createNewMeasure.measureName).type(measureName, { delay: 50 })
        cy.get(createNewMeasure.modelradioQDM).click()
        cy.get(createNewMeasure.cqlLibraryName).type(measureName, { delay: 50 })
        cy.get(createNewMeasure.shortName).type(measureName, { delay: 50 })
        cy.get(createNewMeasure.measureScoringListBox).select('Proportion')
        cy.get(createNewMeasure.patientBasedMeasureListBox).select('Yes')

        cy.get(createNewMeasure.saveAndContinueBtn).click()

        cy.get(createNewMeasure.confirmationContinueBtn).click()

        helper.visibleWithTimeout(matheader.progressbar)
        helper.notVisibleWithTimeout(matheader.progressbar)

        cy.get(measureComposer.cqlWorkspace).click()

        helper.visibleWithTimeout(matheader.progressbar)
        helper.notVisibleWithTimeout(matheader.progressbar)

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

        helper.addValueSet('2.16.840.1.113883.3.117.1.7.1.30')
        helper.addValueSet('2.16.840.1.113883.3.117.1.7.1.27')
        helper.addValueSet('2.16.840.1.113883.3.666.5.307')
        helper.addValueSet('2.16.840.1.114222.4.11.837')
        helper.addValueSet('2.16.840.1.113883.3.117.1.7.1.35')
        helper.addValueSet('2.16.840.1.113762.1.4.1029.205')
        helper.addValueSet('2.16.840.1.113762.1.4.1')
        helper.addValueSet('2.16.840.1.113762.1.4.1029.67')
        helper.addValueSet('2.16.840.1.113883.3.117.1.7.1.38')
        helper.addValueSet('2.16.840.1.114222.4.11.3591')
        helper.addValueSet('2.16.840.1.114222.4.11.836')
        helper.addValueSet('2.16.840.1.113883.3.117.1.7.1.26')

        //Codes

        helper.addCode('CODE:/CodeSystem/CPT/Version/2020/Code/99201/Info')

        //Parameter

        cy.get(measureComposer.parameter).click()

        helper.waitToContainText(measureComposer.cqlWorkspaceTitleGlobal2, 'Parameter')

        cy.get(measureComposer.addNewBtn).click()
        cy.get(measureComposer.parameterNameInput).type('test.Parameter', { delay: 50 })
        cy.get(measureComposer.parameterCQLExpressionEditorInput).type('Interval<DateTime>', { delay: 50 })
        cy.get(measureComposer.parameterSaveBtn).click()

        helper.visibleWithTimeout(measureComposer.warningMessage)

        //Definition

        helper.addDefinition('Initial Population', 'AgeInYearsAt(start of "Measurement Period")> 12')
        helper.addDefinition('Denominator', 'true')
        helper.addDefinition('Numerator', 'true')
        helper.addDefinition('Breast Milk Feeding', '["Substance, Administered": "Breast Milk"] Feeding')
        
        //Function

        cy.get(measureComposer.functionMeasureComposer).click()

        helper.waitToContainText(measureComposer.cqlWorkspaceTitleGlobal2,'Function')

        cy.get(measureComposer.addNewBtn).click()
        cy.get(measureComposer.functionNameInput).type('CalendarDayOfOrDayAfter', { delay: 50 })
        cy.get(measureComposer.addArgument).click()
        cy.get(measureComposer.argumentNameInput).type('StartValue', { delay: 50 })
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

        helper.visibleWithTimeout(matheader.progressbar)
        helper.notVisibleWithTimeout(matheader.progressbar)

        cy.get(measureComposer.initialPopulation).click()

        helper.visibleWithTimeout(matheader.progressbar)
        helper.notVisibleWithTimeout(matheader.progressbar)

        cy.get(measureComposer.initialPopulationDefinitionListBox).select('Initial Population')
        cy.get(measureComposer.initialPopulationSaveBtn).click()

        helper.visibleWithTimeout(measureComposer.warningMessage)
        helper.waitToContainText(measureComposer.warningMessage,'Changes to Initial Populations have been successfully saved.')

        cy.get(measureComposer.denominator).click()

        helper.visibleWithTimeout(matheader.progressbar)
        helper.notVisibleWithTimeout(matheader.progressbar)

        cy.get(measureComposer.denominatorDefinitionListBox).select('Denominator')
        cy.get(measureComposer.denominatorSaveBtn).click()

        helper.visibleWithTimeout(measureComposer.warningMessage)
        helper.waitToContainText(measureComposer.warningMessage,'Changes to Denominators have been successfully saved.')

        cy.get(measureComposer.numerator).click()

        helper.visibleWithTimeout(matheader.progressbar)
        helper.notVisibleWithTimeout(matheader.progressbar)

        cy.get(measureComposer.numeratorDefinitionListBox).select('Numerator')
        cy.get(measureComposer.numeratorSaveBtn).click()

        helper.visibleWithTimeout(measureComposer.warningMessage)
        helper.waitToContainText(measureComposer.warningMessage,'Changes to Numerators have been successfully saved.')

        //navigate to Measure Packager
        cy.get(measureComposer.measurePackager).click()

        helper.visibleWithTimeout(matheader.progressbar)
        helper.notVisibleWithTimeout(matheader.progressbar)

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
        
        helper.visibleWithTimeout(matheader.progressbar)
        helper.notVisibleWithTimeout(matheader.progressbar)

    })
})