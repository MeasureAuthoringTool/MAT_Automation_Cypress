// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)
const fs = require('fs-extra')
const path = require('path')

function getConfigurationByFile (file) {
  const pathToConfigFile = path.resolve('./cypress/', 'config', `${file}.json`)

  return fs.readJson(pathToConfigFile)
}

// module.exports = (on, config) => {
//   // `on` is used to hook into various events Cypress emits
//   // `config` is the resolved Cypress config
//   // accept a configFile value or use development by default
//   const file = config.env.configFile || 'qa'

//   return getConfigurationByFile(file)
// }

const browserify = require('@cypress/browserify-preprocessor')
const getCompareSnapshotsPlugin = require('cypress-visual-regression/dist/plugin');
module.exports = (on, config) => {
  const options = {
    browserifyOptions: {
      extensions: ['.js', '.ts'],
      plugin: [
        ['tsify']
      ]
    }
  }
  on('task', {
    queryDb: query => {
      return queryTestDb(query, config)
    },
  })
  on('file:preprocessor', browserify(options))
  const file = config.env.configFile || 'qa'
  getCompareSnapshotsPlugin(on);
  return getConfigurationByFile(file)
}

const mysql = require('mysql')

function queryTestDb(query, config) {
  // creates a new mysql connection using credentials from cypress.json env's

  const db = {
    host: config.env.db_host,
    user: config.env.DEV_DB_USER,
    password: config.env.DEV_DB_PASSWORD,
    database: config.env.db_database
  }

  const connection = mysql.createConnection(db)
  // start connection to db
  connection.connect()
  // exec query + disconnect to db as a Promise
  return new Promise((resolve, reject) => {
    connection.query(query, (error, results) => {
      if (error) reject(error)
      else {
        connection.end()
        // console.log(results)
        return resolve(results)
      }
    })
  })
}

//usage for cy.task queryDb, to use data returned outside of the .then you can write the data to file and then use it later
//or just do what you need inside the chain
// let query = 'SELECT * FROM MAT_dev_sbx.MEASURE where DESCRIPTION = "QdmProportionMeasure1590606843360";'
// let array = {}
// cy.task('queryDb', query)
//     .then(results => {
//       expect(results).to.have.lengthOf(1)
//
//       //const cywrap = cy.wrap(results[0]);
//       array = results
//
//
//       cy.writeFile('measure', array[0])
//
//     })