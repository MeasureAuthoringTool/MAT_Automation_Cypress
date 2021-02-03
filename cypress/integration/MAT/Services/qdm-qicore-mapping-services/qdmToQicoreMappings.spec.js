const url = Cypress.env('qdmToQicoreMappinngsUrl')

describe('qdmToQicoreMappinngs qdmToQicoreMappings', () => {

  it.skip('GET Success', () => {
    cy.request({
      url: url + '/qdmToQicoreMappings',
      method: 'GET'
    }).then((response) => {
      expect(response.status).to.eql(200)
    })
  })
})
