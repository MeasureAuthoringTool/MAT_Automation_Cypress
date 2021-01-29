const url = Cypress.env('qdmToQicoreMappinngsUrl')

describe('qdmToQicoreMappinngs dataTypes', () => {

  it('GET Success', () => {
    cy.request({
      url: url + '/dataTypes',
      method: 'GET'
    }).then((response) => {
      expect(response.status).to.eql(200)
    })
  })
})
