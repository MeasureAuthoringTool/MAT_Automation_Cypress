describe('OrchestrationMeasure', () => {

  it.skip('Validation Success', () => {
    cy.request({
      url: '/mat-fhir-services/orchestration/measure',
      method: 'PUT',
      qs: {
        id: '2ca880a16f7ca554016f86d356400768',
        conversionType: 'VALIDATION',
        xmlSource: 'MEASURE'
      }
    }).then((response) => {
      expect(response.status).to.eql(200)
    })
  })

  it.skip('Validation Not Found', () => {
    cy.request({
      url: '/mat-fhir-services/orchestration/measure',
      method: 'PUT',
      failOnStatusCode: false,
      qs: {
        id: '111',
        conversionType: 'VALIDATION',
        xmlSource: 'MEASURE'
      }
    }).then((response) => {
      expect(response.status).to.eql(404)
      expect(response.body.error).to.eql('Not Found')
      expect(response.body.message).to.contains('Cannot find MAT Measure with measureId')
    })
  })

  it.skip('Validation Not Found NULL ID', () => {
    cy.request({
      url: '/mat-fhir-services/orchestration/measure',
      method: 'PUT',
      failOnStatusCode: false,
      qs: {
        id: null,
        conversionType: 'VALIDATION',
        xmlSource: 'MEASURE'
      }
    }).then((response) => {
      expect(response.status).to.eql(404)
    })
  })
})
