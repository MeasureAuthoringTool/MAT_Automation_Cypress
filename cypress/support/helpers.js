/// <reference types="../support" />
import * as matlogin from '../pom/MAT/WI/login'
import * as matheader from '../pom/MAT/WI/MATheader'
import * as measurelibrary from "../pom/MAT/WI/MeasureLibrary";
import * as createNewMeasure from "../pom/MAT/WI/CreateNewMeasure";
const os = Cypress.platform // values are aix, darwin, freebsd, linux, openbsd, sunos, win32, android
const env = Cypress.env('environment')

var un = Cypress.env('MAT_DEV_USERNAME')
var pw = Cypress.env('MAT_DEV_PASSWORD')
var altUser = Cypress.env('MAT_DEV_ALT_USERNAME')
var UMLS_userName = Cypress.env('MAT_UMLS_USERNAME')
var UMLS_password = Cypress.env('MAT_UMLS_PASSWORD')
var authcode = '123'


let draftMeasure = 'DraftMeasure'

// Cookie management
export const preserveCookies = () => {
  Cypress.Cookies.preserveOnce('JSESSIONID')
}
export const setCookie = (cookie, value) => {
  cy.setCookie(cookie, value)
}
export const setAuthCookie = (value) => {
  cy.setCookie('qpp_auth_token', value)
}
export const setHasAuthCookie = () => {
  cy.setCookie('qpp_has_authorizations', 'true')
}
// Cookie management
export const saveLocalStorage = () => {
  cy.saveLocalStorage()
}
export const restoreLocalStorage = () => {
  cy.restoreLocalStorage()
}
export const storeTokens = () => {
  cy.storeTokens()
}
export const copyScreenshots = () => {
  cy.log('Current OS: ' + os)
  if ((os === 'darwin') || (os === 'linux')) {
    // cy.exec('npm run copyScreenshots', { timeout: 60000 }).its('code').should('eq', 0);
    cy.exec(`cp -a ./cypress/screenshots/. ./screenshots/current/${env}`, { timeout: 60000 }).its('code').should('eq', 0)
  } else if (os === 'win32') {
    cy.exec(`xcopy .\\cypress\\screenshots .\\screenshots\\current\\${env} /E /I /S`, { timeout: 60000 }).its('code').should('eq', 0)
  }
}
// login
// login Generic function
export const loginGeneric = () => {
  cy.log(env)
  switch (env) {
    case 'dev':
      login(un,pw)
      loginUMLS()
      break
    case 'impl':
      loginImpl()
      break
    case 'prod':
      // loginProd(prodNum, org)
      break
    default:
      login()
      break
  }
}
// login
export const login = (username, password) => {
  cy.clearCookies()

  cy.clearLocalStorage()

  cy.window().then((win) => {
    win.sessionStorage.clear()
  })

  cy.visit('/MeasureAuthoringTool/Login.html')

  cy.get(matlogin.username).type(username, { delay: 50 }).should('have.value', username)
  cy.get(matlogin.password).type(password, { delay: 50 })
  cy.get(matlogin.authcode).type(authcode, { delay: 50 })

  cy.get(matlogin.signInButton).click()

  visibleWithTimeout(matheader.progressbar)
  notVisibleWithTimeout(matheader.progressbar)

  cy.log('Login Successful')

}

export const loginCreateVersionedMeasureNotOwnerLogout = () => {

  login(altUser,pw)

  let name = createMajorVersionMeasure()

  logout()

  return name

}


export const loginUMLS = () => {

  cy.get(matheader.UMLS).click()
  cy.get(matheader.UMLSUserName).type(UMLS_userName, { delay: 50 })
  cy.get(matheader.UMLSPassword).type(UMLS_password, { delay: 50 })

  cy.get(matheader.UMLS_signIn).click()

  cy.get(matheader.UMLS_continue).click()

}

export const logout = () => {

  visibleWithTimeout(matheader.userprofile)

  cy.get(matheader.userprofile).click()

  visibleWithTimeout(matheader.signout)

  cy.get(matheader.signout).click()

  visibleWithTimeout(matlogin.username)
  visibleWithTimeout(matlogin.password)

  cy.clearCookies()

  cy.clearLocalStorage()

  cy.window().then((win) => {
    win.sessionStorage.clear()
  })
}

//Create Draft Measure

export const createDraftMeasure = (measure) => {

  let name = ''

  if (measure === undefined) {
    name = draftMeasure + Date.now()
  }
  else {
    name = measure + Date.now()
  }

  //creating new measure
  cy.get(measurelibrary.newMeasureButton).click()

  cy.get(createNewMeasure.measureName).type(name, { delay: 50 })
  cy.get(createNewMeasure.modelradioQDM).click()
  cy.get(createNewMeasure.cqlLibraryName).type(name, { delay: 50 })
  cy.get(createNewMeasure.shortName).type(name, { delay: 50 })

  cy.get(createNewMeasure.measureScoringListBox).select('Proportion')
  cy.get(createNewMeasure.patientBasedMeasureListBox).select('Yes')

  cy.get(createNewMeasure.saveAndContinueBtn).click()
  cy.get(createNewMeasure.confirmationContinueBtn).click()

  visibleWithTimeout(matheader.progressbar)
  notVisibleWithTimeout(matheader.progressbar)

  cy.get(measurelibrary.measureLibraryTab).click()

  visibleWithTimeout(matheader.progressbar)
  notVisibleWithTimeout(matheader.progressbar)

  return name
}


export const createMajorVersionMeasure = (measure) => {

  let name = ''

  if (measure === undefined) {
    name = createDraftMeasure('MajorVersion')
  } else {
    name = measure
  }

  cy.get(measurelibrary.searchInputBox).type(name, { delay: 50 })
  cy.get(measurelibrary.searchBtn).click()

  visibleWithTimeout(matheader.progressbar)
  notVisibleWithTimeout(matheader.progressbar)

  cy.get(measurelibrary.row1MeasureSearch).click()

  cy.get(measurelibrary.createVersionMeasureSearchBtn).click()

  cy.get(measurelibrary.majorVersionTypeRadio).click()
  cy.get(measurelibrary.packageAndVersion).click()
  cy.get(measurelibrary.continueBtn).click()

  visibleWithTimeout(matheader.progressbar)
  notVisibleWithTimeout(matheader.progressbar)

  cy.get(measurelibrary.searchInputBox).clear()

  return name
}

// general
export const get = (element) => {
  cy.get(element)
}
export const navigateToURL = (url) => {
  cy.visit(url)
  // cy.visit(url,  { timeout: 30000 })  //use this if for capping the timeout of page navigation
}
export const click = (element) => {
  cy.get(element).click()
}
export const clickForce = (element) => {
  cy.get(element).click({ force: true })
}
export const clickPosition = (element, position) => {
  cy.get(element).click(position)
}
export const clickDirection = (element, direction) => {
  cy.get(element).click(direction)
}
export const haveText = (element, text) => {
  cy.get(element).should('have.text', text)
}
export const notHaveText = (element, text) => {
  cy.get(element).should('not.have.text', text)
}
export const waitToHaveText = (element, text, timeout) => {
  cy.get(element, { timeout: timeout }).should('have.text', text)
}
export const waitToContainText = (element, text, timeout) => {
  cy.get(element, { timeout: timeout }).should('contain', text)
}
export const waitToNotContainText = (element, text, timeout) => {
  cy.get(element, { timeout: timeout }).should('not.contain', text)
}
export const exists = (element) => {
  cy.get(element).should('exist')
}
export const notExists = (element) => {
  cy.get(element).should('not.exist')
}
export const visible = (element) => {
  cy.get(element).should('be.visible')
}
export const visibleClick = (element) => {
  cy.get(element).should('be.visible').click()
}
export const notVisible = (element) => {
  cy.get(element).should('not.be.visible')
}
export const visibleContain = (element, text) => {
  cy.get(element).should('be.visible').should('contain', text)
}
export const existsWithTimeout = (element, timeout) => {
  let time
  // If we don't pass in a time, set timeout to 60 sec.
  if (timeout === undefined) {
    time = 60000
  } else { // If we do pass in a time, then set timeout to that time.
    time = timeout
  }
  cy.get(element, { timeout: time }).should('exist')
}
export const notExistsWithTimeout = (element, timeout) => {
  let time
  // If we don't pass in a time, set timeout to 60 sec.
  if (timeout === undefined) {
    time = 60000
  } else { // If we do pass in a time, then set timeout to that time.
    time = timeout
  }
  cy.get(element, { timeout: time }).should('not.exist')
}
export const visibleWithTimeout = (element, timeout) => {
  let time
  if (timeout === undefined) {
    time = 60000
  } else {
    time = timeout
  }
  cy.get(element, { timeout: time }).should('be.visible')
}
export const notVisibleWithTimeout = (element, timeout) => {
  let time
  if (timeout === undefined) {
    time = 90000
  } else {
    time = timeout
  }
  cy.get(element, { timeout: time }).should('not.be.visible')
}
export const notNull = (element) => {
  cy.get(element).should('not.be.null')
}
export const notUndefined = (element) => {
  cy.get(element).should('not.be.undefined')
}
export const haveAttribute = (element, attribute, value) => {
  cy.get(element).should('have.attr', attribute, value)
}
export const notHaveAttribute = (element, attribute) => {
  cy.get(element).should('not.have.attr', attribute)
}
export const haveClass = (element, classValue) => {
  cy.get(element).should('have.class', classValue)
}
export const haveNoClass = (element, classValue) => {
  cy.get(element).should('not.have.class', classValue)
}
export const containClass = (element, classValue) => {
  cy.get(element).should('contain.class', classValue)
}
export const notContainClass = (element, classValue) => {
  cy.get(element).should('not.contain.class', classValue)
}
export const urlIncludes = (text) => {
  cy.url().should('include', text)
}
export const urlNotIncludes = (text) => {
  cy.url().should('not.include', text)
}
export const elementContains = (element, text) => {
  cy.get(element).should('contain', text)
}
export const elementNotContains = (element, text) => {
  cy.get(element).should('not.contain', text)
}
export const sleep = (milliseconds) => {
  cy.wait(milliseconds)
}
export const shouldContainClick = (element, text) => {
  cy.get(element).should('contain', text).click()
}
export const rowIsChecked = (element, row) => {
  cy.get(element).eq(row).should('be.checked')
}
export const rowIsNotChecked = (element, row) => {
  cy.get(element).eq(row).should('not.be.checked')
}
export const isChecked = (element) => {
  cy.get(element).should('be.checked')
}
export const isNotChecked = (element) => {
  cy.get(element).should('not.be.checked')
}
export const check = (element) => {
  cy.get(element).check({ force: true })
}
export const pageContains = (text) => {
  cy.contains(text)
}
export const pageNotContains = (text) => {
  cy.get('body').should('not.contain', text)
}
export const clear = (element) => {
  cy.get(element).clear()
}
export const selectDropdownOption = (element, option, value) => {
  cy.get(element).select(option).should('have.value', value)
}
export const selectListOption = (element, option) => {
  cy.get(element).select(option)
}
export const getDropdown = (element) => {
  cy.get(element).should('be.visible').click()
}
export const getDropdownInputOption = (element, text) => {
  cy.get(element).type(text)
}
export const getDropdownOption = (element, label) => {
  cy.get(element).contains(label).click({ force: true })
}
export const clickDropdownOption = (element, text) => {
  cy.get(element).contains(text).click({ force: true })
}
export const log = (val) => {
  cy.log(val)
}
export const takeScreenshot = (screenshotName) => {
  cy.screenshot(screenshotName, { capture: 'viewport' })
}
export const takeScreenshotFullPage = (screenshotName) => {
  cy.screenshot(screenshotName, { capture: 'fullPage' })
}
export const takeScreenshotRunner = (screenshotName) => {
  cy.screenshot(screenshotName, { capture: 'runner' })
}
export const stopRun = () => {
  Cypress.runner.stop()
}
export const disabled = (el) => {
  cy.get(el).should('be.disabled')
}
export const enabled = (el) => {
  cy.get(el).should('be.enabled')
}
export const selectRadio = (el) => {
  cy.get(el).check({ force: true })
  cy.get(el).should('be.checked')
}
export const enterText = (el, text) => {
  cy.get(el).clear().type(text, { delay: 50 })
}
export const enterTextBlur = (el, text) => {
  cy.get(el).clear().type(text, { delay: 50 }).focus().blur()
}
export const enterTextConfirm = (el, text) => {
  cy.get(el).clear().type(text, { delay: 50 }).should('have.value', text)
}
export const enterTextNoClear = (el, text) => {
  cy.get(el).type(text, { delay: 50 })
}
export const enterTextDropdown = (element, row, text) => {
  cy.get(element).eq(row).type(text, { delay: 50 }).focus().blur()
}
export const enterTextEnter = (el, text) => {
  cy.get(el).clear().type(text, { delay: 50 }).type('{enter}')
}
export const clickStatus = () => {
  cy.get('.status__text').click()
}
export const backspace = (element) => {
  cy.get(element).type('{backspace}')
}
export const focus = (element) => {
  cy.get(element).focus()
}
// api
export const server = () => {
  cy.server()
}
export const route = (endpoint, alias) => {
  cy.route(endpoint).as(alias)
}
export const waitForApiCall = (alias) => {
  cy.wait(alias)
}
export const waitForApiCall2 = (alias, timeout) => {
  cy.wait(alias, { requestTimeout: timeout })
}
export const scrollIntoView = (element) => {
  cy.get(element).scrollIntoView().should('be.visible')
}
export const scrollIntoViewContains = (element, text) => {
  cy.get(element).scrollIntoView().should('be.visible').should('contain', text)
}
export const scroll500 = () => {
  cy.scrollTo(0, 500)
}
export const scrollToTop = () => {
  cy.scrollTo('top')
}
export const scrollToGeneric = (position) => {
  cy.scrollTo(position)
}
export const scrollGeneric = (element, direction) => {
  cy.get(element).scrollTo(direction)
}
export const refreshPage = () => {
  cy.reload(true)
}
export const refreshPageNormal = () => {
  cy.reload()
}
export const goBack = () => {
  cy.go('back')
}
export const goForward = () => {
  cy.go('forward')
}
export const tab = () => {
  cy.tab()
}
export const uploadFile = (fileName, element) => {
  cy.uploadFile(fileName, element)
}
export const uploadMultipleFiles = (files, element, type) => {
  cy.uploadMultipleFiles(files, element, type)
}
export const logoutAPI = (authToken) => {
  cy.logout(authToken)
}
export const checkLoadTime = (time) => {
  const loadTime = time || 5
  cy.window().then((win) => {
    // let time = (win.performance.timing.loadEventEnd - win.performance.timing.navigationStart) / 1000;
    const time = (win.performance.timing.domContentLoadedEventEnd - win.performance.timing.navigationStart) / 1000
    cy.log(time)
    // verify the load is less than 2 seconds
    expect(time).to.be.lessThan(loadTime)
  })
}
export const createFile = (file, text) => {
  cy.writeFile(file, text)
}
export const appendToFile = (file, text) => {
  cy.writeFile(file, '\n', { flag: 'a+' })
  cy.writeFile(file, text, { flag: 'a+' })
}
export const deleteScreenshots = () => {
  cy.log('Current OS: ' + os)
  if ((os === 'darwin') || (os === 'linux')) {
    cy.exec('npm run cypress:delete:screenshots', { timeout: 60000, failOnNonZeroExit: false })
  } else if (os === 'win32') {
    cy.exec('npm run cypress:delete:screenshots:windows', { timeout: 60000, failOnNonZeroExit: false })
  }
}
export const getElementTextValue = (element, inputValue) => {
  cy.get(element).invoke('text')
    .then(value => {
      cy.log(value)
      expect(value).to.eql(inputValue)
    })
}
export const getElementInputValue = (element, inputValue) => {
  cy.get(element).invoke('val')
    .then(value => {
      cy.log(value)
      expect(value).to.eql(inputValue)
    })
}
export const elementInputValueBlank = (element) => {
  cy.get(element).invoke('val')
    .then(value => {
      cy.log(value)
      expect(value).to.eql('')
    })
}
export const elementContains2 = (element, text) => {
  cy.get(element).contains(text)
}
export const dragNdrop = (element1, element2) => {
  cy.get(element1)
    .trigger('mousedown', { which: 1 })
  cy.get(element2)
    .trigger('mousemove')
    .trigger('mouseup', { froce: true })
}
export const dragNdrop2 = (element) => {
  cy.get(element)
    .trigger('mousedown', { which: 1, pageX: 600, pageY: 100 })
    .trigger('mousemove', { which: 1, pageX: 600, pageY: 600 })
    .trigger('mouseup')
}
export const dragNdrop3 = (element1, element2) => {
  cy.get(element1)
    .trigger('dragstart')
  cy.get(element2)
    .trigger('drop')
}
export const hover = (element) => {
  cy.get(element).trigger('mouseenter')
}
export const hasLength = (element, length) => {
  cy.get(element).should('have.length', length)
}
export const hasLengthGreaterThanEqualTo = (element, length) => {
  cy.get(element).should('have.length.gte', length)
}
export const hasLengthGreaterThanEqualTo2 = (table, length) => {
  cy.get(table).find('tr').its('length').should('be.gte', length)
}
export const rowContains = (element, row, text) => {
  cy.get(element).should('exist')
  cy.get(element).eq(row).should('contain', text)
}
export const rowNotContains = (element, row, text) => {
  cy.get(element).should('exist')
  cy.get(element).eq(row).should('not.contain', text)
}
export const cellNotNullUndefined = (element, row) => {
  cy.get(element).should('exist')
  cy.get(element).eq(row).should('not.be.null')
  cy.get(element).eq(row).should('not.be.undefined')
}
export const rowContainClass = (element, row, classValue) => {
  cy.get(element).should('exist')
  cy.get(element).eq(row).should('contain.class', classValue)
}
export const rowHaveClass = (element, row, classValue) => {
  cy.get(element).should('exist')
  cy.get(element).eq(row).should('have.class', classValue)
}
export const clickRow = (element, row) => {
  cy.get(element).eq(row).click()
}
export const clickRowDirection = (element, row, direction) => {
  cy.get(element).eq(row).click(direction)
}
export const paginationLength = (element, length) => {
  cy.get(element).should(`have.length.lte`, length)
}
export const clickLastRow = (element) => {
  cy.get(element).last().click()
}
export const clickFirstRow = (element) => {
  cy.get(element).first().click()
}
export const lastRowContains = (element, text) => {
  cy.get(element).should('exist')
  cy.get(element).last().should('contain', text)
}
export const lastRowNotContains = (element, text) => {
  cy.get(element).should('exist')
  cy.get(element).last().should('not.contain', text)
}
export const firstRowContains = (element, text) => {
  cy.get(element).should('exist')
  cy.get(element).first().should('contain', text)
}
export const firstRowNotContains = (element, text) => {
  cy.get(element).should('exist')
  cy.get(element).first().should('not.contain', text)
}
export const checkFileDownloaded = (filename) => {
  cy.exec(`node ./utils/js/waitForFileToExistLocally.js "${downloadFolder}${filename}"`, { timeout: 60000 }).its('code').should('eq', 0)
}
export const deleteDownloadedFile = (filename) => {
  cy.exec(`node ./utils/js/deleteFile.js "${downloadFolder}${filename}"`, { timeout: 60000 }).its('code').should('eq', 0)
}
export const deleteFileGeneric = (filename) => {
  cy.exec(`rm ${filename}`, { timeout: 60000 }).its('code').should('eq', 0)
}
export const waitForElementEnabled = (element, timeout) => {
  cy.get(element, { timeout: timeout }).should('be.enabled')
}

export const copyFileGeneric = (source, destination) => {
  cy.log('Current OS: ' + os)
  if ((os === 'darwin') || (os === 'linux')) {
    cy.exec(`cp -a ./${source} ./cypress/fixtures/${destination}`, { timeout: 60000 }).its('code').should('eq', 0)
  } else if (os === 'win32') {
    cy.exec(`xcopy .\\${source} .\\cypress\\fixtures\\${destination} /E /I /S`, { timeout: 60000 }).its('code').should('eq', 0)
  }
}
export const getFileName = (fileType) => {
  const currdate = Cypress.moment().format('YYYYMMDD')
  return `${fileType}_${currdate}`
}
export const checkColor = (element, r, g, b) => {
  cy.get(element).should('have.css', 'color').and('equal', `rgb(${r}, ${g}, ${b})`)
}
export const bitsSpinner = 'bits-spinner'
export const spinnerVisible = () => {
  visibleWithTimeout(bitsSpinner, 60000)
}
export const spinnerNotVisible = () => {
  notVisibleWithTimeout(bitsSpinner, 60000)
}
export const spinnerExists = () => {
  existsWithTimeout(bitsSpinner, 60000)
}
export const spinnerNotExists = () => {
  notExistsWithTimeout(bitsSpinner, 60000)
}
export const verifySpinnerAppearsAndDissappears = () => {
  spinnerExists()
  spinnerVisible()
  spinnerNotExists()
  spinnerNotVisible()
}
export const verifySpinnerExists = () => {
  spinnerExists()
  spinnerVisible()
}
export const verifySpinnerNotExists = () => {
  spinnerNotExists()
  spinnerNotVisible()
}
export const containClick = (text) => {
  cy.contains(text).click({ force: true })
}
export const changeTargetToSelf = (element) => {
  // cy.get(element).invoke('attr', 'target', '_self').should('have.attr', 'target', '_self')
  cy.get(element).invoke('removeAttr', 'target')
}
export const createVirusTestFile = (fileType) => {
  const fixture = 'tmp'
  const eicar = 'X5O!P%@AP[4\\PZX54(P^)7CC)7}$EICAR-STANDARD-ANTIVIRUS-TEST-FILE!$H+H*'
  if (fileType === 'text') {
    cy.writeFile(`${fixture}/file_virus.txt`, eicar, 'ascii')
    copyFileGeneric(`${fixture}/file_virus.txt`, 'tmp')
  } else if (fileType === 'comtext') {
    cy.writeFile(`${fixture}/file_virus.com.txt`, eicar, 'ascii')
    copyFileGeneric(`${fixture}/file_virus.com.txt`, 'tmp')
  }
}
let username
let password
function getLoginCreds () {
  if (env === 'dev') {
    username = un
    password = pw
  } else if (env === 'impl') {
    username = unIMPL1
    password = pwIMPL1
  } else if (env === 'prod') {
    username = unProd1
    password = pwProd1
  }
}
let user
export const loginSilent = () => {
  getLoginCreds()
  cy.request({
    url: `/api/auth/authn`,
    method: 'POST',
    body: {
      username: username,
      password: password
    },
    headers: {
      Accept: 'application/vnd.qpp.cms.gov.v1+json',
      'Content-Type': 'application/json',
      Cookie: 'ACA=z3DUR2WH3Y'
    }
  })
    .its('body')
    .then((res) => {
      user = res.auth.text
      cy.log(user)
      setHasAuthCookie()
    })
  sleep(1000)
}
