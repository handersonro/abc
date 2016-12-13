exports.config = {

  allScriptsTimeout: 900000,
  //directConnect: true,
  //
  specs: [
    './e2e-tests/*.js'
  ],

  capabilities: {
    //'browserName': 'phantomjs',
    //'phantomjs.binary.path': require('phantomjs-prebuilt').path
    'browserName': 'chrome',
    //'browserName': 'firefox',
    //firefox_binary: 'C:/Program Files/Nightly/firefox.exe'
    'chromeOptions': {'args': ['--disable-extensions']}
  },

  // multiCapabilities: [
  //   {
  //       browserName: 'chrome',
  //       'chromeOptions': {'args': ['--disable-extensions']},
  //       specs: ['./e2e-tests/UNO-E2E.js']
  //   },
  //   {
  //       browserName: 'chrome',
  //       'chromeOptions': {'args': ['--disable-extensions']},
  //       specs: ['./e2e-tests/UNO-E2E0.js']
  //   }
// ],

/*
multiCapabilities: [
  {
    'browserName': 'chrome'
    //seleniumAddress: 'http://172.24.128.158:4444/wd/hub'
  },
  {
    'browserName': 'firefox'
    //seleniumAddress: 'http://172.24.128.158:4444/wd/hub'
  },
  //{'browserName': 'phantomjs'}
],
*/


  //baseUrl: 'http://172.24.34.216:9011/',
  //baseUrl: 'http://localhost:9011/',
  //baseUrl: 'http://172.24.129.192:9080/autenticacao/',

  //seleniumAddress: 'http://172.24.129.233:32770/wd/hub', //<- fabio
  //seleniumAddress:'http://172.24.35.56:4444/wd/hub',
  seleniumAddress:'http://127.0.0.1:4444/wd/hub',
  //seleniumAddress:'http://172.24.34.243:4444/wd/hub', //<- local
  //seleniumAddress: 'http://172.24.128.158:4444/wd/hub',
  //directConnect: true,

  framework: 'jasmine',

  onPrepare: function() {
    var Jasmine2HtmlReporter = require('protractor-jasmine2-html-reporter');
    var SpecReporter = require('jasmine-spec-reporter');
    // add jasmine spec reporter

    jasmine.getEnv().addReporter(
        new SpecReporter({
            displayStacktrace: 'all'
        })
    );

    jasmine.getEnv().addReporter(
      new Jasmine2HtmlReporter({
        savePath: './e2e/html-reporter/',
        takeScreenshots: true,
        //takeScreenshotsOnlyOnFailures: true,
        screenshotsFolder: 'images',
        consolidateAll: true,
        filePrefix: 'RelatorioTesteFuncionalAutomatizado'
      })
    );
 },

  plugins: [
  ],

  //webdriverManagerUpdate: true,

  jasmineNodeOpts: {
    defaultTimeoutInterval: 900000
}

};
