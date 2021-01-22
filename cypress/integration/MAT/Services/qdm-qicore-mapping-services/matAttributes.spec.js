const url = Cypress.env('qdmToQicoreMappinngsUrl')

describe('qdmToQicoreMappinngs matAttributes', () => {

  it('GET Success', () => {
    cy.request({
      url: url + '/matAttributes',
      method: 'GET'
    }).then((response) => {
      expect(response.status).to.eql(200)
    })
  })
})
