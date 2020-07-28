import * as helper from '../../../../support/helpers'
import * as dataCreation from '../../../../support/MAT/MeasureAndCQLLibraryCreation'
import * as measurelibrary from '../../../../pom/MAT/WI/MeasureLibrary'
import * as oktaLogin from '../../../../support/oktaLogin'

let measureName = ''
let firstPackagedMeasure = ''
let secondPackagedMeasure = ''

describe('FHIR Measure: Export', () => {
    before('Login', () => {
        oktaLogin.login()

        measureName = dataCreation.createFhirCohortMeasure()

    })
    beforeEach('Preserve Cookies', () => {
        helper.preserveCookies()
    })
    after('Log Out', () => {
        helper.logout()
    })

    it('Regular User: Validate the Export UI for FHIR Measure', () => {

        helper.verifySpinnerAppearsAndDissappears()

        helper.enabledWithTimeout(measurelibrary.searchInputBox)
        helper.enterText(measurelibrary.searchInputBox,measureName)
        cy.get(measurelibrary.searchBtn).click()

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(measurelibrary.row1MeasureSearch).click()
       
        cy.get(measurelibrary.exportMeasureSearchBtn).click()

        // Export page
        cy.get('h1').should('contain.text', 'My Measures > Export')

        cy.get(measurelibrary.measureLink).should('contain.text', measureName)

        cy.get(measurelibrary.exportOptionList).should('contain.text', 'XML')
        cy.get(measurelibrary.exportOptionList).should('contain.text', 'JSON')
        cy.get(measurelibrary.exportOptionList).should('contain.text', 'Human Readable')
        cy.get(measurelibrary.exportOptionList).should('contain.text', 'All')

        cy.get(measurelibrary.cancelExportBtn).click()

        helper.verifySpinnerAppearsAndDissappears()

    })

    it('Validate the measure link navigation on Export UI', () => {

        helper.verifySpinnerAppearsAndDissappears()

        helper.enabledWithTimeout(measurelibrary.searchInputBox)
        helper.enterText(measurelibrary.searchInputBox,measureName)
        cy.get(measurelibrary.searchBtn).click()

        helper.verifySpinnerAppearsAndDissappears()

        cy.get(measurelibrary.row1MeasureSearch).click()
       
        cy.get(measurelibrary.exportMeasureSearchBtn).click()

        // Export page
        cy.get('h1').should('contain.text', 'My Measures > Export')

        cy.get(measurelibrary.measureLink).click()

        helper.verifySpinnerAppearsAndDissappears()

        cy.get('h1').should('contain.text', measureName + ' Draft v0.0.001 (FHIR / CQL)')

        cy.get(measurelibrary.measureLibraryTab).click()

        helper.verifySpinnerAppearsAndDissappears()

    })

})


// describe('FHIR Measure: Multiple Export', () => {
//     before('Login', () => {
//         oktaLogin.login()        

//     })
//     beforeEach('Preserve Cookies', () => {
//         helper.preserveCookies()
//     })
//     after('Log Out', () => {
//         helper.logout()
//     })

//     it('FHIR Measure: Select 2 packaged measures and export', () => {

//         firstPackagedMeasure = dataCreation.createFhirCohortMeasure()
//         secondPackagedMeasure = dataCreation.createFhirCohortMeasure()

//     })

//     it('FHIR Measure: Select 1 packaged measure and 1 non-packaged measure then export', () => {


//     })

//     it('FHIR Measure: Validate the Export button disabled for non-packaged measure', () => {


//     })

// })
