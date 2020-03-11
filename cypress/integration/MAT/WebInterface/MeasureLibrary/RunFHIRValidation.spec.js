import * as helper from '../../../../support/helpers'
import * as measurelibrary from '../../../../pom/MAT/WI/MeasureLibrary'
import * as matheader from "../../../../pom/MAT/WI/MATheader";
import * as createNewMeasure from "../../../../pom/MAT/WI/CreateNewMeasure";
import * as measureComposer from "../../../../pom/MAT/WI/MeasureComposer";
import * as cqlLibrary from "../../../../pom/MAT/WI/CqlLibrary";


let measureName = ''
let draftMeasure = ''
let versionMeasureNotOwner = ''
let versionMeasure = ''



describe('Run FHIR Validation', () => {
    before('Login', () => {

        //versionMeasureNotOwner = helper.loginCreateVersionedMeasureNotOwnerLogout()

        helper.loginGeneric()

        //populating search table
        // cy.get(measurelibrary.filterByMyMeasureChkBox).click()
        // cy.get(measurelibrary.searchBtn).click()
        //
        // helper.visibleWithTimeout(matheader.progressbar)
        // helper.notVisibleWithTimeout(matheader.progressbar)

        //creating new draft measure
        //draftMeasure = helper.createDraftMeasure()

        //creating new versioned measure
        //versionMeasure = helper.createMajorVersionMeasure()

    })
    beforeEach('Preserve Cookies', () => {
        helper.preserveCookies()
    })
    after('Log Out', () => {
        //helper.logout()
    })


    it('test', () => {



        helper.enterText(measurelibrary.searchInputBox, 'MajorVersion1583243372024')
        cy.get(measurelibrary.searchBtn).click()

        helper.visibleWithTimeout(matheader.progressbar)
        helper.notVisibleWithTimeout(matheader.progressbar)

        cy.get(measurelibrary.row1MeasureSearch).click()

        cy.get(measurelibrary.runFhirValidationMeasureSearchBtn).click()

cy.wait(2000)

        cy.get(measurelibrary.row1MeasureSearch).dblclick()

    })

})

