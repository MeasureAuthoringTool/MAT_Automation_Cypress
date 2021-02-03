const url = Cypress.env('qdmToQicoreMappinngsUrl')

describe('qdmToQicoreMappinngs matAttributes', () => {

  it.skip('GET Success', () => {
    cy.request({
      url: url + '/matAttributes',
      method: 'GET'
    }).then((response) => {
      expect(response.status).to.eql(200)
    })
  })
})
