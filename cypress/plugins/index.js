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
const getCompareSnapshotsPlugin = require('cypress-visual-regression/dist/plugin')
module.exports = (on, config) => {
  const file = config.env.configFile || 'qa'
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
  on('task', {
    bonnieFHIRDeleteMeasuresAndPatients: sshTunnelandUserId => {
      console.log(sshTunnelandUserId)
      getConfigurationByFile(file).then((envConfig) =>
        bonnieFHIRDeleteMeasuresAndPatients(sshTunnelandUserId.sshTunnel, envConfig, sshTunnelandUserId.mongoUserId)
      )
      return null
    }
  })
  on('file:preprocessor', browserify(options))
  getCompareSnapshotsPlugin(on)
  return getConfigurationByFile(file)
}

const MongoClient = require('mongodb').MongoClient
const assert = require('assert')
const tunnel = require('tunnel-ssh')

function bonnieFHIRDeleteMeasuresAndPatients (sshTunnel, config, userId) {
  const sshTunnelConfig = {
    agent: process.env.SSH_AUTH_SOCK,
    username: sshTunnel.username,
    privateKey: require('fs').readFileSync(sshTunnel.privateKey),
    host: sshTunnel.host,
    port: sshTunnel.port,
    dstHost: sshTunnel.dstHost,
    dstPort: sshTunnel.dstPort,
    localHost: sshTunnel.localHost,
    localPort: sshTunnel.localPort
  }
  console.log(sshTunnelConfig)
  // tunnel -- See https://github.com/agebrock/tunnel-ssh#readme
  tunnel(sshTunnelConfig, (error, server) => {
    if (error) {
      console.log("SSH connection error: ", error)
    }
    // Connection URL
    const url = 'mongodb://' + sshTunnelConfig.localHost + ':' + sshTunnelConfig.localPort
    // Database Name
    const dbName = config.env.mongo_db
    // Use connect method to connect to the server
    MongoClient.connect(url, { useUnifiedTopology: true},function (err, client) {
      assert.equal(null, err)

      console.log("Connected successfully to server")

      const db = client.db(dbName)
      const {ObjectId} = require('mongodb')

      //Delete patients based on User ID
      db.collection('cqm_patients').removeMany({user_id: ObjectId(userId)}, (err, item) => {
        if (err) {
          console.log(err)
        }
        console.log(item)
      })

      //Delete Measures based on User ID
      db.collection('cqm_measures').removeMany({user_id: ObjectId(userId)}, (err, item) => {
        if (err) {
          console.log(err)
        }
        console.log(item)

        client.close()
        server.close(client)
        setImmediate(function(){server.emit('close')})
      })
    })
  })
}

function queryMongo (query, config) {

  const sshTunnelConfig = {
    agent: process.env.SSH_AUTH_SOCK,
    username: '',
    privateKey: require('fs').readFileSync(''),
    host: '',
    port: 22,
    dstHost: 'localhost',
    dstPort: 27017,
    localHost: '127.0.0.1',
    localPort: 50001
  }
  // tunnel to dev -- See https://github.com/agebrock/tunnel-ssh#readme
  tunnel(sshTunnelConfig, (error, server) => {
    if (error) {
      console.log("SSH connection error: ", error)
    }
    // Connection URL
    const url = 'mongodb://' + sshTunnelConfig.localHost + ':' + sshTunnelConfig.localPort
    // Database Name
    const dbName = config.env.mongo_db
    // Use connect method to connect to the server
    MongoClient.connect(url, { useUnifiedTopology: true},function (err, client) {
      assert.equal(null, err)
      console.log("Connected successfully to server")

      const db = client.db(dbName)

      findDocuments(db, 'cqm_measures', query, function () {
        client.close()
      })

    })
  })
}

const mysql = require('mysql')

function queryTestDb (query, config) {
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

const findDocuments = function (db, collection, query, callback) {
  // Find some documents

  db.collection(collection).find(query).toArray(function (err, docs) {
    assert.equal(err, null)
    console.log("Found the following records")
    console.log(docs)
    callback(docs)
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
