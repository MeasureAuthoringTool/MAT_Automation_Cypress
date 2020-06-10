/// <reference types="../support" />
import * as matheader from '../pom/MAT/WI/MATheader'
import * as measurelibrary from "../pom/MAT/WI/MeasureLibrary"
import * as createNewMeasure from "../pom/MAT/WI/CreateNewMeasure"
import * as measureComposer from "../pom/MAT/WI/MeasureComposer"
import * as cqlLibrary from "../pom/MAT/WI/CqlLibrary"
import * as createNewCqlLibrary from "../pom/MAT/WI/CreateNewCQLLibrary"
import * as cqlComposer from "../pom/MAT/WI/CQLComposer"
import * as oktaLogin from "./oktaLogin"
const os = Cypress.platform // values are aix, darwin, freebsd, linux, openbsd, sunos, win32, android

let UMLS_userName = Cypress.env('MAT_UMLS_USERNAME')
let UMLS_password = Cypress.env('MAT_UMLS_PASSWORD')

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


export const loginCreateVersionedMeasureNotOwnerLogout = () => {

  oktaLogin.login('alternative')

  let name = createMajorVersionMeasure()

  logout()

  return name

}

export const loginCreateDraftCqlLibraryNotOwnerLogout = () => {

  oktaLogin.login('alternative')

  let name = createDraftCqlLibrary()

  logout()

  return name

}


export const loginUMLS = () => {

  cy.get(matheader.UMLS).click()

  visibleWithTimeout(matheader.UMLSUserName)
  visibleWithTimeout(matheader.UMLSPassword)

  cy.wait(1500)

  enterText(matheader.UMLSUserName, UMLS_userName)
  enterText(matheader.UMLSPassword, UMLS_password)

  cy.get(matheader.UMLS_signIn).click()

  cy.get(matheader.UMLS_continue).click()

}

export const logout = () => {

  visibleWithTimeout(matheader.userprofile)

  cy.get(matheader.userprofile).click()

  visibleWithTimeout(matheader.signout)

  cy.get(matheader.signout).click()

  cy.clearCookies()

  cy.clearLocalStorage()

  cy.window().then((win) => {
    win.sessionStorage.clear()
  })
}

export const logoutUserwithMultipleMAT = () => {

  visibleWithTimeout(matheader.userprofile)

  cy.get(matheader.userprofile).click()

  visibleWithTimeout(matheader.signoutMultipleMAT)

  cy.get(matheader.signoutMultipleMAT).click()

  cy.clearCookies()

  cy.clearLocalStorage()

  cy.window().then((win) => {
    win.sessionStorage.clear()
  })
}

//create Proportion QDM Draft Measure

export const createQDMProportionMeasure = () => {

  cy.get(measurelibrary.newMeasureButton).click()
  let measureName = 'QdmProportionMeasure' + Date.now()

  cy.get(createNewMeasure.measureName).type(measureName, { delay: 50 })
  cy.get(createNewMeasure.modelradioQDM).click()
  cy.get(createNewMeasure.cqlLibraryName).type(measureName, { delay: 50 })
  cy.get(createNewMeasure.shortName).type(measureName, { delay: 50 })
  cy.get(createNewMeasure.measureScoringListBox).select('Proportion')
  cy.get(createNewMeasure.patientBasedMeasureListBox).select('Yes')

  cy.get(createNewMeasure.saveAndContinueBtn).click()

  cy.get(createNewMeasure.confirmationContinueBtn).click()

  verifySpinnerAppearsAndDissappears()

  cy.get(measureComposer.cqlWorkspace).click()

  verifySpinnerAppearsAndDissappears()

  waitToContainText(measureComposer.cqlWorkspaceTitleGeneralInformation, 'General Information')

  //Includes

  cy.get(measureComposer.includes).click()

  waitToContainText(measureComposer.cqlWorkspaceTitleIncludes, 'Includes')

  cy.get(measureComposer.searchInputBox).type('global', { delay: 50 })
  cy.get(measureComposer.searchBtn).click()
  cy.get(measureComposer.availableLibrariesRow1checkbox).click()
  cy.get(measureComposer.libraryAliasInputBox).type('Global', { delay: 50 })
  cy.get(measureComposer.saveIncludes).click()

  visibleWithTimeout(measureComposer.warningMessage)

  //Value Sets

  addValueSet('2.16.840.1.113883.3.117.1.7.1.30')
  addValueSet('2.16.840.1.113883.3.117.1.7.1.27')
  addValueSet('2.16.840.1.113883.3.666.5.307')
  addValueSet('2.16.840.1.114222.4.11.837')
  addValueSet('2.16.840.1.113883.3.117.1.7.1.35')
  addValueSet('2.16.840.1.113762.1.4.1029.205')
  addValueSet('2.16.840.1.113762.1.4.1')
  addValueSet('2.16.840.1.113762.1.4.1029.67')
  addValueSet('2.16.840.1.113883.3.117.1.7.1.38')
  addValueSet('2.16.840.1.114222.4.11.3591')
  addValueSet('2.16.840.1.114222.4.11.836')
  addValueSet('2.16.840.1.113883.3.117.1.7.1.26')

  //Codes

  addCode('CODE:/CodeSystem/CPT/Version/2020/Code/99201/Info')

  //Parameter

  cy.get(measureComposer.parameter).click()

  waitToContainText(measureComposer.cqlWorkspaceTitleGlobal2, 'Parameter')

  cy.get(measureComposer.addNewBtn).click()
  cy.get(measureComposer.parameterNameInput).type('test.Parameter', { delay: 50 })
  cy.get(measureComposer.parameterCQLExpressionEditorInput).type('Interval<DateTime>', { delay: 50 })
  cy.get(measureComposer.parameterSaveBtn).click()

  visibleWithTimeout(measureComposer.warningMessage)

  //Definition

  addDefinition('Initial Population', 'AgeInYearsAt(start of "Measurement Period")> 12')
  addDefinition('Denominator', 'true')
  addDefinition('Numerator', 'true')
  addDefinition('Breast Milk Feeding', '["Substance, Administered": "Breast Milk"] Feeding')
  addDefinition('ED Visit', 'Global."ED Encounter"')

  //Function

  cy.get(measureComposer.functionMeasureComposer).click()

  waitToContainText(measureComposer.cqlWorkspaceTitleGlobal2,'Function')

  cy.get(measureComposer.addNewBtn).click()
  cy.get(measureComposer.functionNameInput).type('CalendarDayOfOrDayAfter', { delay: 50 })
  cy.get(measureComposer.addArgument).click()
  enterText(measureComposer.argumentNameInput, 'StartValue')
  cy.get(measureComposer.availableDatatypesListBox).select('DateTime')
  cy.get(measureComposer.addBtn).click()
  cy.get(measureComposer.functionCQLExpressionEditorInput).type('Interval[StartValue, ToDate(StartValue + 2 days))', { delay: 50 })
  cy.get(measureComposer.functionSaveBtn).click()

  visibleWithTimeout(measureComposer.warningMessage)

  //CQL Library Editor

  cy.get(measureComposer.cqlLibraryEditor).click()

  waitToContainText(measureComposer.cqlWorkspaceTitleCQLLibraryEditor,'CQL Library Editor')

  visibleWithTimeout(measureComposer.warningMessage)
  waitToContainText(measureComposer.warningMessage,'You are viewing CQL with no validation errors.')

  cy.wait(2000)

  cy.get(measureComposer.populationWorkspace).click()

  verifySpinnerAppearsAndDissappears()

  cy.get(measureComposer.initialPopulation).click()

  verifySpinnerAppearsAndDissappears()

  cy.get(measureComposer.initialPopulationDefinitionListBox).select('Initial Population')
  cy.get(measureComposer.initialPopulationSaveBtn).click()

  visibleWithTimeout(measureComposer.warningMessage)
  waitToContainText(measureComposer.warningMessage,'Changes to Initial Populations have been successfully saved.')

  cy.get(measureComposer.denominator).click()

  verifySpinnerAppearsAndDissappears()

  cy.get(measureComposer.denominatorDefinitionListBox).select('Denominator')
  cy.get(measureComposer.denominatorSaveBtn).click()

  visibleWithTimeout(measureComposer.warningMessage)
  waitToContainText(measureComposer.warningMessage,'Changes to Denominators have been successfully saved.')

  cy.get(measureComposer.numerator).click()

  verifySpinnerAppearsAndDissappears()

  cy.get(measureComposer.numeratorDefinitionListBox).select('Numerator')
  cy.get(measureComposer.numeratorSaveBtn).click()

  visibleWithTimeout(measureComposer.warningMessage)
  waitToContainText(measureComposer.warningMessage,'Changes to Numerators have been successfully saved.')

  //navigate to Measure Packager
  cy.get(measureComposer.measurePackager).click()

  verifySpinnerAppearsAndDissappears()

  //verifying the the Population Workspace data is viewable in the Populations list in Measure Packager
  cy.get(measureComposer.populationsListItems).its('length').should('equal', 3)

  cy.get(measureComposer.populationsListItems).eq(0).should('contain.text', 'Initial Population 1')
  cy.get(measureComposer.populationsListItems).eq(1).should('contain.text', 'Denominator 1')
  cy.get(measureComposer.populationsListItems).eq(2).should('contain.text', 'Numerator 1')

  //Package Grouping
  cy.get(measureComposer.addAllItemsToGrouping).click()
  cy.get(measureComposer.saveGrouping).click()

  cy.get(measureComposer.measureGroupingTable).should('contain.text', 'Measure Grouping 1')

  //Create Measure Package
  cy.get(measureComposer.createMeasurePackageBtn).click()

  waitToContainText(measureComposer.packageWarningMessage,'Measure packaged successfully. Please access the Measure Library to export the measure.')

  cy.get(measurelibrary.measureLibraryTab).click()

  verifySpinnerAppearsAndDissappears()

  return measureName

}


//Create Draft Measure

export const createDraftMeasure = (measure, model) => {

  let name = ''

  if (measure === undefined) {
    name = draftMeasure + Date.now()
  }
  else {
    name = measure + Date.now()
  }

  //creating new measure
  enabledWithTimeout(measurelibrary.newMeasureButton)
  cy.get(measurelibrary.newMeasureButton).click()

  cy.get(createNewMeasure.measureName).type(name, { delay: 50 })

  if (model === 'QDM' || model === undefined) {
    cy.get(createNewMeasure.modelradioQDM).click()
  }
  else {
    cy.get(createNewMeasure.modelradioFHIR).click()
  }

  cy.get(createNewMeasure.cqlLibraryName).type(name, { delay: 50 })
  cy.get(createNewMeasure.shortName).type(name, { delay: 50 })

  cy.get(createNewMeasure.measureScoringListBox).select('Proportion')
  cy.get(createNewMeasure.patientBasedMeasureListBox).select('Yes')

  cy.get(createNewMeasure.saveAndContinueBtn).click()
  cy.get(createNewMeasure.confirmationContinueBtn).click()

verifySpinnerAppearsAndDissappears()

  cy.get(measurelibrary.measureLibraryTab).click()

verifySpinnerAppearsAndDissappears()

  return name
}

export const createDraftCqlLibrary = (library, model) => {

  let name = ''

  if (library === undefined) {
    name = 'draftCqllibrary' + Date.now()
  }
  else {
    name = library + Date.now()
  }

  cy.get(measurelibrary.cqlLibraryTab).then(tab => {
    let value = tab.attr('class')

    if (value.toString() === 'gwt-TabBarItem'){
      cy.get(measurelibrary.cqlLibraryTab).click()
    verifySpinnerAppearsAndDissappears()
    }

  })

  cy.get(cqlLibrary.newLibraryBtn).click()

  cy.get(createNewCqlLibrary.cqlLibraryName).type(name, { delay: 50 })

  if (model === 'QDM' || model === undefined) {
    cy.get(createNewCqlLibrary.modelQDMRadio).click()
  }
  else {
    cy.get(createNewCqlLibrary.modelFHIRRadio).click()
  }

  cy.get(createNewCqlLibrary.saveAndContinueBtn).click()

  cy.get(cqlComposer.confirmationContinueBtn).click()

verifySpinnerAppearsAndDissappears()

  cy.get(measurelibrary.cqlLibraryTab).click()

verifySpinnerAppearsAndDissappears()

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

verifySpinnerAppearsAndDissappears()

  visibleWithTimeout(measurelibrary.row1MeasureSearch)

  cy.wait(2000)

  cy.get(measurelibrary.row1MeasureSearch).click()

  cy.get(measurelibrary.createVersionMeasureSearchBtn).click()

  cy.get(measurelibrary.majorVersionTypeRadio).click()
  cy.get(measurelibrary.packageAndVersion).click()
  cy.get(measurelibrary.continueBtn).click()

verifySpinnerAppearsAndDissappears()

  cy.get(measurelibrary.searchInputBox).clear()

  return name
}

export const addValueSet = (OID) => {
  cy.get(measureComposer.valueSets).click()

  waitToContainText(measureComposer.cqlWorkspaceTitleGlobal,'Value Sets')

  cy.get(measureComposer.OIDInput).type(OID, { delay: 50 })
  cy.get(measureComposer.retrieveOIDBtn).click()
  cy.get(measureComposer.applyBtn).click()

  visibleWithTimeout(measureComposer.warningMessage)
}

export const addCode = (codeUrl) => {
  cy.get(measureComposer.codes).click()

  waitToContainText(measureComposer.cqlWorkspaceTitleGlobal,'Codes')

  cy.get(measureComposer.codeUrlInput).type(codeUrl, { delay: 50 })
  cy.get(measureComposer.retrieveBtn).click()
  cy.get(measureComposer.applyBtn).click()

  visibleWithTimeout(measureComposer.warningMessage)
}

export const addDefinition = (definitionName, CQL) => {
  cy.get(measureComposer.definition).click()

  waitToContainText(measureComposer.cqlWorkspaceTitleGlobal2,'Definition')

  cy.get(measureComposer.addNewBtn).click()
  cy.get(measureComposer.definitionNameInput).type(definitionName, { delay: 50 })
  cy.get(measureComposer.definitionCQLExpressionEditorInput).type(CQL, { delay: 50 })
  cy.get(measureComposer.definitionSaveBtn).click()

  visibleWithTimeout(measureComposer.warningMessage)
}


export const getClassAttr = () => {
  return cy.get(measurelibrary.cqlLibraryTab).then(tab => {
    let rect = tab.attr('class')
    return rect
  })
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
    time = 400000
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
export const enabledWithTimeout = (element, timeout) => {
  let time
  if (timeout === undefined) {
    time = 60000
  } else {
    time = timeout
  }
  cy.get(element, { timeout: time }).should('be.enabled')
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

export const spinnerVisible = () => {
  visibleWithTimeout(matheader.spinner, 60000)
}
export const spinnerNotVisible = () => {

  // waitToHaveText(matheader.spinnerShadow,'Loading Please Wait...')
  // waitToHaveText(matheader.spinnerShadow,'...')

  notVisibleWithTimeout(matheader.spinner, 60000)
  notVisibleWithTimeout(matheader.spinnerWrapper, 60000)
  notVisibleWithTimeout(matheader.spinnerShadow, 60000)
  notVisibleWithTimeout(matheader.spinnerModal, 60000)
  notVisibleWithTimeout(matheader.spinner, 60000)
}
export const spinnerExists = () => {
  existsWithTimeout(matheader.spinner, 60000)
}
export const spinnerNotExists = () => {
  notExistsWithTimeout(matheader.spinner, 60000)
  //notExistsWithTimeout(matheader.spinnerWrapper, 60000)
  notExistsWithTimeout(matheader.spinnerShadow, 60000)
  notExistsWithTimeout(matheader.spinnerModal, 60000)
}
export const verifySpinnerAppearsAndDissappears = () => {

  spinnerNotVisible()

  cy.wait(1500)
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

Date.prototype.getMonthFormatted = function() {
  var month = this.getMonth() + 1;
  return month < 10 ? '0' + month : '' + month; // ('' + month) for string result
}

Date.prototype.getDayFormatted = function() {
  var day = this.getDate();
  return day < 10 ? '0' + day : '' + day; // ('' + month) for string result
}
