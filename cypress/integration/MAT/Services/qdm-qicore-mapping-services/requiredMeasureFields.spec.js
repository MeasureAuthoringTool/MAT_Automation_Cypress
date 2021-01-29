const url = Cypress.env('qdmToQicoreMappinngsUrl')

describe('qdmToQicoreMappinngs requiredMeasureFields', () => {

  it('GET Success', () => {
    cy.request({
      url: url + '/requiredMeasureFields',
      method: 'GET'
    }).then((response) => {
      expect(response.status).to.eql(200)
    })
  })
})
