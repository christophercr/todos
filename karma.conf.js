"use strict";

// Karma configuration
// reference: http://karma-runner.github.io/0.13/config/configuration-file.html
module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (e.g. files, exclude)
    basePath: "",

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: [
      "jasmine"
    ],

    // list of files to exclude
    exclude: [],

    // list of files / patterns to load in the browser
    files: [
      'node_modules/angular/angular.js',
      'node_modules/angular-mocks/angular-mocks.js',
      {
        pattern: 'src/scripts/*.js'
      },
      {
        pattern: 'src/scripts/**/*.js'
      },
      'src/**/*spec.js'
    ],

    // list of paths mappings
    // can be used to map paths served by the Karma web server to /base/ content
    // knowing that /base corresponds to the project root folder (i.e., where this config file is located)
    proxies: {},

    // test coverage
    coverageReporter: {
     dir: "reports/coverage",
     reporters: [
       {type: "text-summary"},
       {type: "json"},
       {type: "html"},
       {type: "lcov"} // format supported by Sonar
     ]
    },

    // test results reporter to use
    // possible values: "dots", "progress", "spec", "junit", "mocha", "coverage" (others if you import reporters)
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    // https://www.npmjs.com/package/karma-junit-reporter
    // https://www.npmjs.com/package/karma-spec-reporter
    reporters: [
      "mocha",
      "progress",
      "coverage",
      "junit"
    ],

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: [
      "Chrome"
      //"Firefox",
      //"IE",
    ],

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    //Timeout settings
    browserNoActivityTimeout: 30000,
    browserDisconnectTolerance: 1,
    browserDisconnectTimeout: 30000,

    // JUnit reporter configuration
    junitReporter: {
      outputDir: 'reports/coverage/',
      outputFile: 'tests-unit/unit.xml',
      suite: 'unit'
    }

    // How many browsers should be started simultaneously
    //concurrency: Infinity,
  });
};
