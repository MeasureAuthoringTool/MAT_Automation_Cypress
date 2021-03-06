import * as helper from '../../../../../support/helpers'
import * as measurelibrary from '../../../../../pom/MAT/WI/MeasureLibrary'
import * as measureDetails from '../../../../../pom/MAT/WI/MeasureDetails'
import * as dataCreation from '../../../../../support/MAT/MeasureAndCQLLibraryCreation'
import * as gridRowActions from '../../../../../support/MAT/GridRowActions'
import * as login from '../../../../../support/MAT/Login'

let fhirMeasure = ''

describe('Measure Composer: Measure Details: General Measure Information', () => {
  before('Data Setup', () => {
    login.matLogin()
    fhirMeasure = dataCreation.createDraftMeasure('FhirDraftMeasure', 'FHIR')
    login.matLogout()
  })
  beforeEach('Login', () => {
    login.matLogin()
  })
  afterEach('Log Out', () => {
    login.matLogout()
  })

  it('FHIR Measure: Validate the Population Basis field', () => {

    helper.enterText(measurelibrary.searchInputBox, fhirMeasure)
    cy.get(measurelibrary.searchBtn).click()

    helper.verifySpinnerAppearsAndDissappears()

    gridRowActions.doubleClickRow(measurelibrary.row1MeasureSearch)

    helper.verifySpinnerAppearsAndDissappears()

    //verify default population basis
    cy.get(measureDetails.populationBasisListbox).should('have.value', 'Boolean')

    //total values on population basis
    cy.get(measureDetails.populationBasisListbox)
      .find('option')
      .then(option => {
        const valueCount = Cypress.$(option).length
        expect(option).to.have.length(42)
      })

    //change population basis and different types
    cy.get(measureDetails.populationBasisListbox).select('AdverseEvent').should('have.value', 'AdverseEvent')
    cy.get(measureDetails.populationBasisListbox).select('AllergyIntolerance').should('have.value', 'AllergyIntolerance')
    cy.get(measureDetails.populationBasisListbox).select('CarePlan').should('have.value', 'CarePlan')
    cy.get(measureDetails.populationBasisListbox).select('Claim').should('have.value', 'Claim')
    cy.get(measureDetails.populationBasisListbox).select('Communication').should('have.value', 'Communication')
    cy.get(measureDetails.populationBasisListbox).select('Condition').should('have.value', 'Condition')
    cy.get(measureDetails.populationBasisListbox).select('Device').should('have.value', 'Device')
    cy.get(measureDetails.populationBasisListbox).select('DeviceRequest').should('have.value', 'DeviceRequest')
    cy.get(measureDetails.populationBasisListbox).select('Encounter').should('have.value', 'Encounter')
    cy.get(measureDetails.populationBasisListbox).select('Goal').should('have.value', 'Goal')
    cy.get(measureDetails.populationBasisListbox).select('Immunization').should('have.value', 'Immunization')
    cy.get(measureDetails.populationBasisListbox).select('ImmunizationRecommendation').should('have.value', 'ImmunizationRecommendation')
    cy.get(measureDetails.populationBasisListbox).select('NutritionOrder').should('have.value', 'NutritionOrder')
    cy.get(measureDetails.populationBasisListbox).select('Organization').should('have.value', 'Organization')
    cy.get(measureDetails.populationBasisListbox).select('Practitioner').should('have.value', 'Practitioner')
    cy.get(measureDetails.populationBasisListbox).select('Procedure').should('have.value', 'Procedure')
    cy.get(measureDetails.populationBasisListbox).select('RelatedPerson').should('have.value', 'RelatedPerson')
    cy.get(measureDetails.populationBasisListbox).select('Specimen').should('have.value', 'Specimen')
    cy.get(measureDetails.populationBasisListbox).select('Substance').should('have.value', 'Substance')

    cy.get(measureDetails.saveBtn).click()

    cy.get(measurelibrary.measureLibraryTab).click()

    helper.verifySpinnerAppearsAndDissappears()
  })

})
