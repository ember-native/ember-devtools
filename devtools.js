const webdriver = require('selenium-webdriver')
const chrome = require('selenium-webdriver/chrome')
const promise = require('selenium-webdriver/lib/promise')
const chromedriver = require('chromedriver')

// shortcuts
const until = webdriver.until
const By = webdriver.By

/* -----------------------------------------------------------------------------
 * configure
 * -------------------------------------------------------------------------- */

promise.USE_PROMISE_MANAGER = false

/* -----------------------------------------------------------------------------
 * devtools public
 * -------------------------------------------------------------------------- */

const Devtools = module.exports = function (options) {
  this.options = options || {}
  this.service = new chrome.ServiceBuilder(chromedriver.path).build()
  this.driver = chrome.Driver.createSession(new chrome.Options(), this.service)
}

Devtools.prototype.open = function (debuggerUrl, options) {
  return this._resize()
    .then(() => this._navigateToUrl(debuggerUrl))
    .then(() => this._waitUntilPause())
    .then(() => this.options['debug-exception'] ? this._pauseOnException() : null)
    .then(() => this.options['debug-brk'] ? null : this._continueExecution())
    .then(() => this.onOpen ? this.onOpen() : null)
    .catch((e) => {
      console.error(e)
      // webdriver throws errors on already resolved promises upon manual browser
      // quit/close. This is a catch all to avoid killing the entire process.
    })
}

// wrapper around driver.quit to ensure error is caught if close gets called
// multiple times.
Devtools.prototype.close = function () {
  return this.driver.quit()
    .then(() => this.service.stop())
    .catch((e) => null)
}

/* -----------------------------------------------------------------------------
 * devtools private
 * -------------------------------------------------------------------------- */

Devtools.prototype._resize = function () {
  const window = this.driver.manage().window()

  return window.getSize()
    .then((size) => window.setSize(size.width, 450))
}

Devtools.prototype._navigateToUrl = function (debuggerUrl) {
  return this.driver.get(debuggerUrl)
}

Devtools.prototype._waitUntilPause = function () {
  return this.driver.wait(until.elementLocated(By.css('.cm-execution-line')))
}

Devtools.prototype._pauseOnException = function () {
  return this._executeOnPanel('_togglePauseOnExceptions')
}

Devtools.prototype._continueExecution = function () {
  return this._executeOnPanel('_togglePause')
}

Devtools.prototype._executeOnPanel = function (methodName) {
  let script = `const root = window['WebInspector'] || window['Sources'];`
  script += `return root.SourcesPanel.instance().${methodName}();`

  return this.driver.executeScript(script)
}


const devtools = new Devtools({});
devtools.open('devtools://devtools/bundled/inspector.html?ws=localhost:40000&ember=true')