import * as dataCreation from '../../../../support/MAT/MeasureAndCQLLibraryCreation'
import * as login from '../../../../support/MAT/Login'

//Smoke test for QDM Proportion Measure. Create Draft measure and Package

describe('QDM Proportion Measure, create draft Measure and package', () => {
  beforeEach('Login', () => {
    login.matLogin()
  })
  afterEach('Log Out', () => {
    login.matLogout()
  })
  it('Proportion QDM, creation, Population Workspace, Measure Packager', () => {

    let measure = dataCreation.createQDMProportionMeasure()
    cy.log('QDM Proportion Measure ' + measure + ' created and packaged successfully')

  })
})
