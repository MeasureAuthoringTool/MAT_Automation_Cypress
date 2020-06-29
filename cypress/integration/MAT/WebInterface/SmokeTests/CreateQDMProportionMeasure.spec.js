import * as helper from '../../../../support/helpers'
import * as dataCreation from '../../../../support/MAT/MeasureAndCQLLibraryCreation'
import * as measurelibrary from '../../../../pom/MAT/WI/MeasureLibrary'
import * as createNewMeasure from '../../../../pom/MAT/WI/CreateNewMeasure'
import * as measureComposer from '../../../../pom/MAT/WI/MeasureComposer'
import * as oktaLogin from '../../../../support/oktaLogin'


describe('QDM Proportion Measure', () => {
    before('Login', () => {
        oktaLogin.login()
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

        dataCreation.addValueSet('2.16.840.1.113883.3.117.1.7.1.30')
        dataCreation.addValueSet('2.16.840.1.113883.3.117.1.7.1.27')
        dataCreation.addValueSet('2.16.840.1.113883.3.666.5.307')
        dataCreation.addValueSet('2.16.840.1.114222.4.11.837')
        dataCreation.addValueSet('2.16.840.1.113883.3.117.1.7.1.35')
        dataCreation.addValueSet('2.16.840.1.113762.1.4.1029.205')
        dataCreation.addValueSet('2.16.840.1.113762.1.4.1')
        dataCreation.addValueSet('2.16.840.1.113762.1.4.1029.67')
        dataCreation.addValueSet('2.16.840.1.113883.3.117.1.7.1.38')
        dataCreation.addValueSet('2.16.840.1.114222.4.11.3591')
        dataCreation.addValueSet('2.16.840.1.114222.4.11.836')
        dataCreation.addValueSet('2.16.840.1.113883.3.117.1.7.1.26')

        //Codes

        dataCreation.addCode('CODE:/CodeSystem/CPT/Version/2020/Code/99201/Info')

        //Parameter

        cy.get(measureComposer.parameter).click()

        helper.waitToContainText(measureComposer.cqlWorkspaceTitleGlobal2, 'Parameter')

        cy.get(measureComposer.addNewBtn).click()
        cy.get(measureComposer.parameterNameInput).type('test.Parameter', { delay: 50 })
        cy.get(measureComposer.parameterCQLExpressionEditorInput).type('Interval<DateTime>', { delay: 50 })
        cy.get(measureComposer.parameterSaveBtn).click()

        helper.visibleWithTimeout(measureComposer.warningMessage)

        //Definition

        dataCreation.addDefinition('Initial Population', 'AgeInYearsAt(start of "Measurement Period")> 12')
        dataCreation.addDefinition('Denominator', 'true')
        dataCreation.addDefinition('Numerator', 'true')
        dataCreation.addDefinition('Breast Milk Feeding', '["Substance, Administered": "Breast Milk"] Feeding')
        dataCreation.addDefinition('ED Visit', 'Global."ED Encounter"')
        
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

    })
})