describe('filtered', () => {

    it('Validation Success', () => {
        cy.request({
            url: '/qdm-qicore-mapping-services/filtered',
            method: 'GET'
        }).then((response) => {
            expect(response.status).to.eql(200)
        })
    })
})

describe('find', () => {

    it('Validation Success', () => {
        cy.request({
            url: '/qdm-qicore-mapping-services/find',
            method: 'GET'
        }).then((response) => {
            expect(response.status).to.eql(200)
        })
    })
})