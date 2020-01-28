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
  on('file:preprocessor', browserify(options))
  const file = config.env.configFile || 'qa'
  getCompareSnapshotsPlugin(on);
  return getConfigurationByFile(file)
}
