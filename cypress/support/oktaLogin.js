// import * as helper from './helpers'
// import * as measurelibrary from '../pom/MAT/WI/MeasureLibrary'
//
// const oktaUrl = Cypress.env('oktaUrl')
// const redirectUri = Cypress.env('redirectUri')
//
// let clientId = ''
// let username = ''
// let password = ''
// let alt_password = ''
// let name = ''
// let email = ''
// let alt_username = ''
// let alt_name = ''
// let alt_email = ''
// let mul_username = undefined
// let mul_name = undefined
// let mul_email = undefined
//
// const missingEnvironmentVariables = []
// let environment = ''
//
// if (!Cypress.env('environment')) {
//   throw new Error('Cannot find env variables: environment')
// } else {
//   environment = Cypress.env('environment').toUpperCase() + '_'
//   loadEnvironment()
// }
//
// function getEnv (nameIn, required = true) {
//   const name = environment + nameIn
//   const variable = Cypress.env(name)
//
//   if (required && !variable) {
//     missingEnvironmentVariables.push('CYPRESS_' + name)
//   }
//
//   return variable
// }
//
// function loadEnvironment () {
//   username = getEnv('USERNAME')
//   password = getEnv('PASSWORD')
//   clientId = getEnv('CLIENTID')
//   name = getEnv('NAME')
//   email = getEnv('EMAIL')
//
//   alt_username = getEnv('ALT_USERNAME')
//   alt_password = getEnv('ALT_PASSWORD')
//   alt_name = getEnv('ALT_NAME')
//   alt_email = getEnv('ALT_EMAIL')
//   mul_username = getEnv('MUL_USERNAME', false)
//   mul_name = getEnv('MUL_NAME', false)
//   mul_email = getEnv('MUL_EMAIL', false)
//
//   if (missingEnvironmentVariables.length > 0) {
//     const missing = missingEnvironmentVariables.join(', ')
//     throw new Error('Cannot find env variables: ' + missing)
//   }
// }
//
// export const login = (user) => {
//
//   if (user === undefined) {
//     cy.clearCookies()
//
//     cy.clearLocalStorage()
//
//     cy.window().then((win) => {
//       win.sessionStorage.clear()
//     })
//     oktaLogin()
//     helper.visibleWithTimeout(measurelibrary.row1MeasureSearch)
//     helper.loginUMLS()
//   } else if (user === 'alternative') {
//     cy.clearCookies()
//
//     cy.clearLocalStorage()
//
//     cy.window().then((win) => {
//       win.sessionStorage.clear()
//     })
//     oktaLogin(alt_username, alt_password, alt_name, alt_email)
//     helper.visibleWithTimeout(measurelibrary.row1MeasureSearch)
//     helper.loginUMLS()
//   } else if (user === 'multiple') {
//     cy.clearCookies()
//
//     cy.clearLocalStorage()
//
//     cy.window().then((win) => {
//       win.sessionStorage.clear()
//     })
//     oktaLogin(mul_username, mul_name, mul_email)
//   }
// }
//
// export const loginWithoutUMLS = (user) => {
//
//   if (user === undefined) {
//     cy.clearCookies()
//
//     cy.clearLocalStorage()
//
//     cy.window().then((win) => {
//       win.sessionStorage.clear()
//     })
//     oktaLogin()
//     helper.visibleWithTimeout(measurelibrary.row1MeasureSearch)
//   }
// }
//
// export const oktaLogin = (un, pw, storage_name, storage_email) => {
//
//   if (un === undefined) {
//     un = username
//   }
//   if (pw === undefined) {
//     pw = password
//   }
//   if (storage_name === undefined) {
//     storage_name = name
//   }
//   if (storage_email === undefined) {
//     storage_email = email
//   }
//
//   // creating the authn request
//   const request = {
//     method: 'POST',
//     url: oktaUrl + '/api/v1/authn',
//     body: {
//       username: un,
//       password: pw,
//       options: {
//         warnBeforePasswordExpired: 'true',
//         multiOptionalFactorEnroll: 'false'
//       }
//     },
//     failOnStatusCode: false
//   }
//
//   // getting the session Token from executing the authn request
//   cy.request(request).then(response => {
//     const sessionToken = response.body.sessionToken
//
//     // Getting the Code value with authorization request
//     cy.request({
//       method: 'GET',
//       url:
//         oktaUrl + '/oauth2/v1/authorize?client_id=' + clientId +
//         '&nonce=uxiJab6ycJdNkEZkwbtqnSC1MRuIFCXQATQZSWiBjWdSuuBdbIDCN9EafOYiPaHs' +
//         '&redirect_uri=' + redirectUri +
//         '&response_type=token id_token' +
//         '&sessionToken=' + sessionToken +
//         '&state=uQJCnnawAWj9QyaHkVMesAaVXEkWcZMpVfDrQJqdUUPLnuIUprrlN5kRicCI4gaR' +
//         '&scope=openid%20email%20profile',
//       form: true,
//       followRedirect: false,
//       failOnStatusCode: false
//
//     }).then(respWithToken => {
//       const url = respWithToken.redirectedToUrl
//
//       // grabbing the token values from the redirect URL returned from the authorization 302
//       const idToken = url
//         .substring(url.indexOf('id_token'))
//         .split('=')[1]
//         .split('&')[0]
//
//       const accessToken = url
//         .substring(url.indexOf('access_token'))
//         .split('=')[1]
//         .split('&')[0]
//
//       // To avoid token expiration, we create a new timestamp every time
//       const oneDayFromNow = Date.now() + 1000 * 60 * 60 * 24
//
//       // seeding the local storage with the Access and ID tokens
//       localStorage.setItem(
//         'okta-token-storage',
//         `{"accessToken":{"accessToken":"${accessToken}","expiresAt":${oneDayFromNow},"tokenType":"Bearer","scopes":["openid","email","profile"],"authorizeUrl":"https://dev-120913.okta.com/oauth2/v1/authorize","userinfoUrl":"https://dev-120913.okta.com/oauth2/v1/userinfo"},
//           "idToken":{"idToken":"${idToken}","claims":{"sub":"00u47i0j8NJCwyEen4x6","name":"${storage_name}","email":"${storage_email}","ver":1,"iss":"https://dev-120913.okta.com","aud":"0oa47t6l9KwCVD1cZ4x6","iat":1589906406,"exp":${oneDayFromNow},"jti":"ID.41b7-NnMsrocqWw7xf3wDBDnCcPPT63OLVbOLRBEV3M","amr":["pwd"],"idp":"00o47i0fx75plScfV4x6","nonce":"YJl2npsJl6ygF7v2Rwa1fzkONEwSxko0EGWcq7vIVN0MxyqlTFSVLYDvAfaa5WYJ","preferred_username":"${un}","auth_time":1589906404,"at_hash":"XyeRvH5cN_nprrfDZS0PJw"},"expiresAt":${oneDayFromNow},"scopes":["openid","email","profile"],"authorizeUrl":"https://dev-120913.okta.com/oauth2/v1/authorize","issuer":"https://dev-120913.okta.com","clientId":"0oa47t6l9KwCVD1cZ4x6"}}`
//       )
//
//       localStorage.setItem(
//         'okta-cache-storage',
//         `{"https://dev-120913.okta.com/.well-known/openid-configuration":{"expiresAt":${oneDayFromNow},"response":{"issuer":"https://dev-120913.okta.com","authorization_endpoint":"https://dev-120913.okta.com/oauth2/v1/authorize","token_endpoint":"https://dev-120913.okta.com/oauth2/v1/token","userinfo_endpoint":"https://dev-120913.okta.com/oauth2/v1/userinfo","registration_endpoint":"https://dev-120913.okta.com/oauth2/v1/clients","jwks_uri":"https://dev-120913.okta.com/oauth2/v1/keys","response_types_supported":["code","id_token","code id_token","code token","id_token token","code id_token token"],"response_modes_supported":["query","fragment","form_post","okta_post_message"],"grant_types_supported":["authorization_code","implicit","refresh_token","password"],"subject_types_supported":["public"],"id_token_signing_alg_values_supported":["RS256"],"scopes_supported":["openid","email","profile","address","phone","offline_access","groups"],"token_endpoint_auth_methods_supported":["client_secret_basic","client_secret_post","client_secret_jwt","private_key_jwt","none"],"claims_supported":["iss","ver","sub","aud","iat","exp","jti","auth_time","amr","idp","nonce","name","nickname","preferred_username","given_name","middle_name","family_name","email","email_verified","profile","zoneinfo","locale","address","phone_number","picture","website","gender","birthdate","updated_at","at_hash","c_hash"],"code_challenge_methods_supported":["S256"],"introspection_endpoint":"https://dev-120913.okta.com/oauth2/v1/introspect","introspection_endpoint_auth_methods_supported":["client_secret_basic","client_secret_post","client_secret_jwt","private_key_jwt","none"],"revocation_endpoint":"https://dev-120913.okta.com/oauth2/v1/revoke","revocation_endpoint_auth_methods_supported":["client_secret_basic","client_secret_post","client_secret_jwt","private_key_jwt","none"],"end_session_endpoint":"https://dev-120913.okta.com/oauth2/v1/logout","request_parameter_supported":true,"request_object_signing_alg_values_supported":["HS256","HS384","HS512","RS256","RS384","RS512","ES256","ES384","ES512"]}},"https://dev-120913.okta.com/oauth2/v1/keys":{"expiresAt":${oneDayFromNow},"response":{"keys":[{"kty":"RSA","alg":"RS256","kid":"2na0PmxCPaKaBTR2q6Q2VLPta2K3ZlujScFFrPWUzGk","use":"sig","e":"AQAB","n":"kDDz4FpCfrDuMIEYcK85nplkyQ_XKlkBTs2k8UBv-GfnodKuoWe3Ri1qkIi_deKD3YLMPlE4Cyw6ep_0fb0rjZoRBnfOUCLdZsegorGNIQCnx2-FG-yzB9mx2ZhFnvHa9zNRJoV9jSFm8s7VzWIKfzcjQV6UHDqY1F6Lo7dP-7lfrgrejDDlHU-fQcdL9tpf-dM1L_6d-oOk_j2POSY6DC51dFrBx_wUW99HUgTbpzT3wpTTdqaIBJWEveaiNIOlJfJloq6jFFaFnhzqIavypuvq3l-2t2tiq8LL2TudnxaRJ5ymvYIF2wwNnffjGMUnKXY2irqI450NXUaObV-_XQ"},{"kty":"RSA","alg":"RS256","kid":"8WyllAGZ9KZ8tZQeFhX35Wm6C_RnBiDUPwdM9L0qsEQ","use":"sig","e":"AQAB","n":"4rRx7icRZ47_DA85syhoW8ucGr5cVmzM81u7tRR2VPjrKxCflw3ijaGARXQBwTjtesb6VfTvmnYfyoc9dezWUx7SokeSTYtzH7jU8gHiHcsvTuyONMVXVvxGgmGtoMIRHBa-jiXDnSNPBd60a7vDPBrkB-cKY1UQxaMHy9_wY6ctouoDz4FzLD0jrA73b-HDTWcfFACSYxzwjKVlbEMR401vVkO4GQesARu_-aJ1Rq7kvQfO3yQhywhyNu87mwNQLzQwu4VU23yyK1mqDfsUH5vdfVysO7_wHaFoeHCU1c6ur-qAh7HlTNMkJAvAgiRu7mED_tBT0-JSnz0F3-g3Tw"}]}}}`
//       )
//
//       // Then we need to visit the main site and see if it all works
//       cy.visit('/MeasureAuthoringTool/Mat.html', {
//         method: 'POST',
//         body: { loginPost: accessToken }
//       })
//
//       helper.verifySpinnerAppearsAndDissappears()
//
//       cy.log('Login Successful')
//
//       helper.verifySpinnerAppearsAndDissappears()
//
//     })
//   })
// }
