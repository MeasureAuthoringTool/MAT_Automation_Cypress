const url = Cypress.env('qdmToQicoreMappinngsUrl')



describe('qdmToQicoreMappinngs resourceDefinition', () => {

    it('GET Success', () => {
        cy.request({
            url: url + '/resourceDefinition',
            method: 'GET'
        }).then((response) => {
            expect(response.status).to.eql(200)
        })
    })
})
