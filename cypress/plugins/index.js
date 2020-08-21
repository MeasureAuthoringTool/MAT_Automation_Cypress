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
    queryMongo: query => {
      getConfigurationByFile(file).then((envConfig) =>
        queryMongo(query, envConfig)
      )
      return null;
    }
  });
  on('file:preprocessor', browserify(options))
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

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const tunnel = require('tunnel-ssh');

function queryMongo(query, config) {
  console.log(config.env.ssh_key)
  const sshTunnelConfig = {
    agent: process.env.SSH_AUTH_SOCK,
    username: 'centos',
    privateKey: require('fs').readFileSync(config.env.ssh_key),
    host: config.env.ssh_host,
    port: 22,
    dstHost: 'localhost',
    dstPort: 27017,
    localHost: '127.0.0.1',
    localPort: 50001
  }
  // tunnel to dev
  tunnel(sshTunnelConfig, (error, server) => {
    if (error) {
      console.log("SSH connection error: ", error);
    }
    // Connection URL
    const url = 'mongodb://localhost:50001';
    // Database Name
    const dbName = config.env.mongo_db;
    // Use connect method to connect to the server
    MongoClient.connect(url, function (err, client) {
      assert.equal(null, err);
      console.log("Connected successfully to server");

      const db = client.db(dbName);
      findDocuments(db, 'cqm_measures', query, function() {
        client.close();
      });
    });
  });
}

const findDocuments = function (db, collection, query, callback) {
  // Find some documents
  db.collection(collection).find(query).toArray(function (err, docs) {
    assert.equal(err, null);
    console.log("Found the following records");
    console.log(docs)
    callback(docs);
  });
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