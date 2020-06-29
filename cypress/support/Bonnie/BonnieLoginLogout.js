import * as helper from "../helpers"
import * as signInpage from "../../pom/Bonnie/WI/Sign_in"
import * as dashboard from "../../pom/Bonnie/WI/Dashboard"

let bonnieURL = Cypress.env('bonnieBaseUrl')
let username = ''
let password = ''


if (Cypress.env('environment') === 'dev') {

    username = Cypress.env('BONNIE_DEV_USERNAME')
    password = Cypress.env('BONNIE_DEV_PASSWORD')
}

export const login = () => {

    cy.visit(bonnieURL + '/users/sign_in')

    helper.enabledWithTimeout(signInpage.passwordInputBox)

    helper.enterText(signInpage.usernameInputBox, username)
    helper.enterText(signInpage.passwordInputBox, password)

    cy.get(signInpage.loginBtn).click()

    helper.visibleWithTimeout(dashboard.navigationBar)

    cy.log('Login Successful')
}

export const logout = () => {

    helper.visibleWithTimeout(dashboard.signoutBtn)

    cy.get(dashboard.signoutBtn).click()

    helper.visibleWithTimeout(signInpage.usernameInputBox)

    cy.log('Logout Successful')

}

