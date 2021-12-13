// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

/**
 * @type {Cypress.PluginConfig}
 */
const { GetSession } = require('../../session')

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)
const fs = require('fs-extra')
const path = require('path')
const unzipper = require('unzipper')
const Diff = require('diff')

function getConfigurationByFile (file) {
  const pathToConfigFile = path.resolve('./cypress/', 'config', `${file}.json`)
  return fs.readJson(pathToConfigFile)
}
const browserify = require('@cypress/browserify-preprocessor')
const getCompareSnapshotsPlugin = require('cypress-visual-regression/dist/plugin')
module.exports = (on, config) => {
  const file = config.env.configFile || 'qa'
  const options = {
    browserifyOptions: {
      extensions: ['.js', '.ts'],
      plugin: [
        ['tsify']
      ],
      downloadDirectory: ['/downloads']
    }
  }
  on('task', {
    unzipFile: zipFileAndPath => {
      unzipFile(zipFileAndPath.zipFile, zipFileAndPath.path)
      return null
    }
  })
  on('task', {
    getDiffs: filesAndPaths => {
      return getDiffs(filesAndPaths.file1, filesAndPaths.file2, filesAndPaths.path1, filesAndPaths.path2)
    }
  })
  on('task', {
    queryDb: query => {
      return queryTestDb(query, config)
    }
  })
  on('task', {
    bonnieDeleteMeasuresAndPatients: MongoConfiguration => {
      getConfigurationByFile(file).then((envConfig) =>
        bonnieDeleteMeasuresAndPatients(envConfig, MongoConfiguration.mongoGroupId, MongoConfiguration.mongoURL,
          MongoConfiguration.sslCert)
      )
      return null
    }
  })
  on('task', {
    bonnieDeleteGroups: MongoConfiguration => {
      getConfigurationByFile(file).then((envConfig) =>
        bonnieDeleteGroups(envConfig, MongoConfiguration.groupName, MongoConfiguration.mongoURL,
          MongoConfiguration.sslCert)
      )
      return null
    }
  })
  on('task', {
    getSession ({ username, password, url }) {
      return new Promise(async resolve => {
        resolve(await GetSession(username, password, url))
      })
    }
  })
  on('task', {
    log(message) {
      console.log(message)

      return null
    },
    table(message) {
      console.table(message)

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
const portScanner = require('portscanner')

// Delete measures and Patients for a given groupId
function bonnieDeleteMeasuresAndPatients (config, groupId, mongoURL, sslCert) {
  const ca = [fs.readFileSync(sslCert)]

  // Connection URL
  const url = mongoURL
  // Database Name
  const dbName = config.env.mongo_db

  MongoClient.connect(url, { sslCA: ca }, (err, client) => {
    if (err) {
      console.log(`MONGO CONNECTION ERROR: ${err}`)
      throw err
    } else {
      console.log('Connected successfully to MongoDB')

      const db = client.db(dbName)
      const { ObjectId } = require('mongodb')

      // Delete patients based on group ID
      db.collection('cqm_patients').removeMany({ group_id: ObjectId(groupId) }, (err, item) => {
        if (err) {
          console.log(err)
        }
        console.log('Patients deleted: ' + item.deletedCount)
      })

      // Delete Measures based on group ID
      db.collection('cqm_measures').removeMany({ group_id: ObjectId(groupId) }, (err, item) => {
        if (err) {
          console.log(err)
        }
        console.log(item)
        console.log('Measures deleted: ' + item.deletedCount)
        client.close(true, () => {
          console.log('MongoDb connection closed.')
        })
      })
    }
  })
}

//unzip file
function unzipFile (zipFile, path) {

  const zipPath = path + '/' + zipFile
  const readStream = fs.createReadStream(zipPath)

  readStream.pipe(unzipper.Extract({path: `${path}`}))

}

//covert file to string value
function getDiffs (file1, file2, path1, path2) {

  let filePath = path1 + '/' + file1

  let buffer = fs.readFileSync(filePath)

  const fileContent1 = buffer.toString()

  filePath = path2 + '/' + file2

  let filepath2 = path.join(__dirname, '../'+ filePath);

  buffer = fs.readFileSync(filepath2)

  const fileContent2 = buffer.toString()

  const diffs = Diff.diffWords(fileContent1, fileContent2)

  return diffs
}



// Delete groups for a given userID
function bonnieDeleteGroups (config, groupName, mongoURL, sslCert) {
  const ca = [fs.readFileSync(sslCert)]

  // Connection URL
  const url = mongoURL
  // Database Name
  const dbName = config.env.mongo_db

  MongoClient.connect(url, { sslCA: ca }, (err, client) => {
    if (err) {
      console.log(`MONGO CONNECTION ERROR: ${err}`)
      throw err
    } else {
      console.log('Connected successfully to MongoDB')

      const db = client.db(dbName)
      const { ObjectId } = require('mongodb')

      // Delete Groups based on name
      db.collection('groups').removeMany({name: groupName}, (err, item) => {
        if (err) {
          console.log(err)
        }
        console.log(item)
        console.log('Groups deleted: ' + item.deletedCount)
        client.close(true, () => {
          console.log('MongoDb connection closed.')
        })
      })
    }
  })
}

// MySQL connection stuff
const mysql = require('mysql')
const { resolve } = require('@cypress/webpack-preprocessor/stubbable-require')
const { ObjectId } = require('mongodb')

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
    console.log('Found the following records')
    console.log(docs)
    callback(docs)
  })
}



// usage for cy.task queryDb, to use data returned outside of the .then you can write the data to file and then use it later
// or just do what you need inside the chain
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
