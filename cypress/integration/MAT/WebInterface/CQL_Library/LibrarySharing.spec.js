import * as helper from '../../../../support/helpers'
import * as dataCreation from '../../../../support/MAT/MeasureAndCQLLibraryCreation'
import * as cqlLibrary from '../../../../pom/MAT/WI/CqlLibrary'
import * as oktaLogin from '../../../../support/oktaLogin'

let fhirCqlLibrary = ''
let qdmCqlLibrary = ''

describe('Sharing Measure with other measure developer', () => {
    before('Login', () => {
        oktaLogin.login()

        qdmCqlLibrary = dataCreation.createDraftCqlLibrary('QdmLibrary', 'QDM')
        fhirCqlLibrary = dataCreation.createDraftCqlLibrary('FhirLibrary', 'FHIR')

        helper.verifySpinnerAppearsAndDissappears()

    })
    beforeEach('Preserve Cookies', () => {
        helper.preserveCookies()
    })
    after('Log Out', () => {
        helper.logout()
    })
    it('Share the QDM Library', () => {

        helper.verifySpinnerAppearsAndDissappears()

        helper.enabledWithTimeout(cqlLibrary.searchInputBox)
        helper.enterText(cqlLibrary.searchInputBox, qdmCqlLibrary)
        cy.get(cqlLibrary.searchBtn).click();

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(cqlLibrary.row1CqlLibraryName).click()

        cy.get(cqlLibrary.shareCqllibrariesBtn).click()

        helper.verifySpinnerAppearsAndDissappears()

        cy.get('h1').should('contain.text', 'My CQL Libraries > CQL Library Sharing')

        cy.get(cqlLibrary.shareWithSecondUserCheckBox).check()

        cy.get(cqlLibrary.shareSaveAndContinueBtn).click()

        cy.get(cqlLibrary.shareWarningMessage).should('contain.text', qdmCqlLibrary + ' sharing status has been successfully updated')
   
    })

    it('Share the FHIR Measure', () => {

        helper.verifySpinnerAppearsAndDissappears()

        helper.enabledWithTimeout(cqlLibrary.searchInputBox)
        helper.enterText(cqlLibrary.searchInputBox, fhirCqlLibrary)
        cy.get(cqlLibrary.searchBtn).click();

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(cqlLibrary.row1CqlLibraryName).click()

        cy.get(cqlLibrary.shareCqllibrariesBtn).click()

        helper.verifySpinnerAppearsAndDissappears()

        cy.get('h1').should('contain.text', 'My CQL Libraries > CQL Library Sharing')

        cy.get(cqlLibrary.shareWithSecondUserCheckBox).click()

        cy.get(cqlLibrary.shareSaveAndContinueBtn).click()

        cy.get(cqlLibrary.shareWarningMessage).should('contain.text', fhirCqlLibrary + ' sharing status has been successfully updated')
    })
})