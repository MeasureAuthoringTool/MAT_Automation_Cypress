let oktaUrl =  Cypress.env('oktaUrl')
let clientId = ''
let redirectUri = Cypress.env('redirectUri')
let code_challenge = 'wzkYNXpezVxQZToG0qmyKl7I-7w8DsAJR3M-ZhsLMew'
let code_verifier = 'a56073885b81556118c5b33124af557c2b463fe27b2'
let username = ''
let password = ''

if (Cypress.env('environment') === 'dev')
{
    username = Cypress.env('DEV_USERNAME')
    password = Cypress.env('DEV_PASSWORD')
    clientId = Cypress.env('DEV_CLIENTID')

} else if (Cypress.env('environment') === 'matdev')
{
    username = Cypress.env('MAT_DEV_USERNAME')
    password = Cypress.env('MAT_DEV_PASSWORD')
    clientId = Cypress.env('MAT_DEV_CLIENTID')
}

//creating the authn request
const request = {
    method: 'POST',
    url: oktaUrl + '/api/v1/authn',
    body: {
        username: username,
        password: password,
        options: {
            warnBeforePasswordExpired: 'true',
            multiOptionalFactorEnroll: 'false'
        }
    },
    failOnStatusCode: false
}

export const Login = () => {

    //getting the session Token from executing the authn request
    cy.request(request).then(response => {
        const sessionToken = response.body.sessionToken

        //Getting the Code value with authorization request
            cy.request({
                method: 'GET',
                url:
                    oktaUrl + '/oauth2/v1/authorize?client_id=' + clientId + '&code_challenge=' + code_challenge + '&code_challenge_method=S256&display=page' +
                    '&nonce=uxiJab6ycJdNkEZkwbtqnSC1MRuIFCXQATQZSWiBjWdSuuBdbIDCN9EafOYiPaHs&redirect_uri=' + redirectUri + '&response_mode=fragment&response_type=code' +
                    '&sessionToken=' + sessionToken + '&state=uQJCnnawAWj9QyaHkVMesAaVXEkWcZMpVfDrQJqdUUPLnuIUprrlN5kRicCI4gaR&scope=openid%20email',
                form: true,
                followRedirect: false,
                failOnStatusCode: false

        }).then(respWithToken => {

            const url = respWithToken.redirectedToUrl

            //grabbing the code value from the redirect URL returned from the authorization 302
            const code = url
                .substring(url.indexOf('code'))
                .split('=')[1]
                .split('&')[0]
            cy.wrap(code).as('code')

                //creating the token request
                const tokenRequest = {
                    method: 'POST',
                    headers:{
                        'accept' : 'application/json',
                        'Content-Type' : 'application/x-www-form-urlencoded'
                    },
                    url: oktaUrl + '/oauth2/v1/token',
                    form: true,
                    body: {
                        grant_type: 'authorization_code',
                        client_id: clientId,
                        redirect_uri: redirectUri,
                        code: code,
                        code_verifier: code_verifier
                    },
                    redirect: true,
                    failOnStatusCode: false
                }
             //executing the token request
            cy.request(tokenRequest).then(response => {
                const accessToken = response.body.accessToken
                cy.log('This is your access token = ' + accessToken)
            })

            //need to add seeding the local storage with the Access and ID tokens

            //Then we need to visit the main site and see if it all works

        })
    })
}




