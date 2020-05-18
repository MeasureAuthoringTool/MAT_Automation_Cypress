import * as helper from '../../../../support/helpers'
import * as oktaLogin from '../../../../support/OKTA_LOGIN'
import * as measurelibrary from '../../../../pom/MAT/WI/MeasureLibrary'
import * as createNewMeasure from '../../../../pom/MAT/WI/CreateNewMeasure'
import * as measureComposer from '../../../../pom/MAT/WI/MeasureComposer'


describe('OKTA Test', () => {
    before('Login', () => {

        //helper.loginGeneric()


        oktaLogin.Login()



    })
    beforeEach('Preserve Cookies', () => {
        helper.preserveCookies()
    })
    after('Log Out', () => {
        //helper.logout()
    })
    it('TEST', () => {

        cy.pause()


    })
})