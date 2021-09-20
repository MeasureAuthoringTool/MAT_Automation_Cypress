import * as login from '../../../../support/MAT/Login'
import * as loginUI from '../../../../pom/MAT/WI/Login'

//508 TEST examples using axe plugin

describe('508', () => {
  beforeEach('Login', () => {
    login.login508()

    cy.injectAxe()
  })
  afterEach('Log Out', () => {
    //login.matLogout()
  })
  it('508 test check for all', () => {

    cy.checkA11y()

  })
  it('specify values in options', () => {
    cy.checkA11y( null,{
      runOnly: {
        type: 'tag',
        values: ['wcag21aa', 'wcag2aa']
      } //['wcag21aa', 'wcag2aa', 'best-practice', 'section508']
    })
  })
  it('Has no detectable a11y violations on load (filtering to only include critical impact violations)', () => {
    // Test on initial load, only report and assert for critical impact items
    cy.checkA11y(null, {
      includedImpacts: ['critical', 'serious']
    })
  })
  it('Only logs a11y violations while allowing the test to pass', () => {
    // Do not fail the test when there are accessibility failures
    cy.checkA11y(null, null, null, {skipFailures: true})

  })
  it('508 test check for one element or section', () => {
    cy.checkA11y(loginUI.signInButton)
    cy.checkA11y('.auth-footer')
  })
  it('Logs violations to the terminal', () => {
    cy.checkA11y(null, null, terminalLog)
  })

})

function terminalLog(violations) {
  cy.task(
    'log',
    `${violations.length} accessibility violation${
      violations.length === 1 ? '' : 's'
    } ${violations.length === 1 ? 'was' : 'were'} detected`
  )
  // pluck specific keys to keep the table readable
  const violationData = violations.map(
    ({ id, impact, description, nodes }) => ({
      id,
      impact,
      description,
      nodes: nodes.length
    })
  )

  cy.task('table', violationData)
}
