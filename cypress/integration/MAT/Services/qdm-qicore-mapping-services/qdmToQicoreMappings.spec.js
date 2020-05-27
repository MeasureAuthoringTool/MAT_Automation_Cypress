const url = Cypress.env('qdmToQicoreMappinngsUrl')



describe('qdmToQicoreMappinngs qdmToQicoreMappings', () => {

    it('GET Success', () => {
        cy.request({
            url: url + '/qdmToQicoreMappings',
            method: 'GET'
        }).then((response) => {
            expect(response.status).to.eql(200)
        })
    })
})
