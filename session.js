const { chromium } = require('playwright');

async function launchChromium() {
  return await chromium.launch({
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--ignore-certificate-errors',
      '--unsafely-treat-insecure-origin-as-secure=https://localhost:4200/',
      '--disable-notifications'
    ]
  })
}

async function loginToBonnie (page) {
  if (!page) {
    throw new Error('page is missing')
  }
  await page.waitForSelector(`.btn-login`)
  return await page.click(`.btn-login`)
}

async function loginToBonnieOkta (page, username, password) {
  if (!username || !password) {
    throw new Error('Username or Password missing for login')
  }
  await page.waitForSelector(`#okta-signin-username`)
  await page.fill(`#okta-signin-username`, username)
  await page.fill(`#okta-signin-password`, password)
  await page.click('#tandc')
  return await page.click(`#okta-signin-submit`)
}

async function getLocalStorageData(page) {
  return await page.evaluate(() => {
    return Object.keys(localStorage).reduce(
      (items, curr) => ({
        ...items,
        [curr]: localStorage.getItem(curr)
      }),
      {}
    )
  });
}

async function getSessionStorageData(page) {
  return page.evaluate(() => {
    return Object.keys(sessionStorage).reduce(
      (items, curr) => ({
        ...items,
        [curr]: sessionStorage.getItem(curr)
      }),
      {}
    )
  })
}


module.exports = {
  GetSession: async function (username, password, url) {
    const browser = await launchChromium()
    const context = await browser.newContext()
    const page = await context.newPage()
    await page.goto(url)
    await loginToBonnie(page)
    await loginToBonnieOkta(page, username, password)
    await page.waitForNavigation({
      waitUntil: `networkidle`,
      timeout: 200000
    })
    const cookies = await context.cookies()
    const lsd = await getLocalStorageData(page)
    const ssd = await getSessionStorageData(page)
    browser.close()
    return {
      cookies, lsd, ssd
    }
  }
}

