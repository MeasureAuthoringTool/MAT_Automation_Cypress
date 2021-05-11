import * as helper from './../helpers'
import * as measurelibrary from '../../pom/MAT/WI/MeasureLibrary'
import * as loginUI from '../../pom/MAT/WI/Login'
import * as matheader from '../../pom/MAT/WI/MATheader'

let username = ''
let password = ''
let alt_password = ''
let alt_username = ''
let mul_username = undefined

const missingEnvironmentVariables = []
let environment = ''

if (!Cypress.env('environment')) {
  throw new Error('Cannot find env variables: environment')
} else {
  environment = Cypress.env('environment').toUpperCase() + '_'
  loadEnvironment()
}

function getEnv (nameIn, required = true) {
  const name = environment + nameIn
  const variable = Cypress.env(name)

  if (required && !variable) {
    missingEnvironmentVariables.push('CYPRESS_' + name)
  }

  return variable
}

function loadEnvironment () {
  username = getEnv('USERNAME')
  password = getEnv('PASSWORD')

  alt_username = getEnv('ALT_USERNAME')
  alt_password = getEnv('ALT_PASSWORD')

  mul_username = getEnv('MUL_USERNAME', false)

  if (missingEnvironmentVariables.length > 0) {
    const missing = missingEnvironmentVariables.join(', ')
    throw new Error('Cannot find env variables: ' + missing)
  }
}

export const matLogin = (user) => {

  if (user === undefined) {
    cy.clearCookies({ domain: null })
    cy.clearLocalStorage()

    cy.window().then((win) => {
      win.sessionStorage.clear()
    })
    login()
    helper.visibleWithTimeout(measurelibrary.row1MeasureSearch)
    helper.loginUMLS()
  } else if (user === 'alternative') {
    cy.clearCookies()

    cy.clearLocalStorage()

    cy.window().then((win) => {
      win.sessionStorage.clear()
    })
    login(alt_username, alt_password)
    helper.visibleWithTimeout(measurelibrary.row1MeasureSearch)
    helper.loginUMLS()
  } else if (user === 'multiple') {
    cy.clearCookies()

    cy.clearLocalStorage()

    cy.window().then((win) => {
      win.sessionStorage.clear()
    })
    login(mul_username)
  }
}

export const loginWithoutUMLS = (user) => {

  if (user === undefined) {
    cy.clearCookies()

    cy.clearLocalStorage()

    cy.window().then((win) => {
      win.sessionStorage.clear()
    })
    login()
    helper.visibleWithTimeout(measurelibrary.row1MeasureSearch)
  }
}

export const login = (un, pw) => {

  cy.visit('/MeasureAuthoringTool/Login.html', { onBeforeLoad: (win) => { win.sessionStorage.clear() } })

  if (un === undefined) {
    un = username
  }
  if (pw === undefined) {
    pw = password
  }

  helper.visibleWithTimeout(loginUI.usernameInput, 200000)
  cy.get(loginUI.usernameInput).type(un)
  cy.get(loginUI.passwordInput).type(pw)

  cy.get(loginUI.termsConditionsCheckbox).click()
  cy.get(loginUI.signInButton).click()

  cy.log('Login Successful')
}

export const matLogout = () => {
  helper.visibleWithTimeout(matheader.userprofile)

  cy.get(matheader.userprofile).click({ force: true })

  helper.visibleWithTimeout(matheader.signout)

  cy.get(matheader.signout).click({ force: true })

  //helper.visibleWithTimeout(loginUI.usernameInput, 100000)
  cy.url().should('include', '/Login.html')

  cy.clearCookies()

  cy.clearLocalStorage()

  cy.window().then((win) => {
    win.sessionStorage.clear()
  })
}
