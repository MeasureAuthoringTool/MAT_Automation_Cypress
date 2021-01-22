import * as helper from '../../../../support/helpers'
import * as dataCreation from '../../../../support/MAT/MeasureAndCQLLibraryCreation'
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

    let measure = dataCreation.createQDMProportionMeasure()
    cy.log('QDM Proportion Measure ' + measure + ' created and packaged successfully')

  })
})
