// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

const compareSnapshotCommand = require('cypress-visual-regression/dist/command')

compareSnapshotCommand()

Cypress.Commands.add('uploadFile', (fileName, selector) => {
  return cy.get(selector).then((subject) => {
    return cy
      .fixture(fileName, 'base64')
      .then(Cypress.Blob.base64StringToBlob)
      .then((blob) => {
        const el = subject[0]
        const testFile = new File([blob], fileName) // eslint-disable-line no-undef
        const dataTransfer = new DataTransfer() // eslint-disable-line no-undef
        dataTransfer.items.add(testFile)
        el.files = dataTransfer.files
        // return subject; //removed for chrome 73
        return cy.wrap(subject).trigger('change', { force: true }) // updated for chrome 73
      })
  })
})
Cypress.Commands.add('uploadMultipleFiles', (fileUrlOrUrls, selector, type = '') => {
  const fileUrls = Array.isArray(fileUrlOrUrls)
    ? fileUrlOrUrls
    : [fileUrlOrUrls]

  const files = []

  Promise.all(
    fileUrls.map(fileUrl => {
      const nameSegments = fileUrl.split('/')
      const name = nameSegments[nameSegments.length - 1]
      return cy
        .fixture(fileUrl, 'base64')
        .then(Cypress.Blob.base64StringToBlob)
        .then(blob => {
          const file = new File([blob], name, { type }) // eslint-disable-line no-undef
          files.push(file)
        })
    })
  ).then(() => {
    //console.log('files:', files)
    const event = { dataTransfer: { files } }
    return cy.get(selector).trigger('drop', event)
  })
})

Cypress.Commands.add('addOperationalTrackLoad', (user, file, modelId) => {
    const testUsername = users.chooseUser(user).username
    const testPassword = users.chooseUser(user).password
    // Login and save token
    cy.request({
        url: 'api/v1/user/login',
        method: 'POST',
        body: {
            username: testUsername,
            password: testPassword
        },
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    }).then((response) => {
        // cy.log(response.body.data.user.token)
        token = response.body.data.user.token
        cy.fixture(file).then((ot) => {
            cy.request({
                url: `/api/v1/apm/model/${modelId}/operational_track`,
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                auth: {
                    bearer: token
                },
                body: ot
            }).then((response) => {
                cy.log(response)
                expect(response.status).to.eql(201)
            })
        })
    })
})
